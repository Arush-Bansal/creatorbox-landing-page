import { NextResponse } from 'next/server'

import {
  fetchLatestReleaseRaw,
  fetchReleaseAssetBytes,
  fetchReleaseAssetText,
} from '@/lib/release-asset-fetch'
import type { DownloadPlatform } from '@/lib/github-releases'

export const dynamic = 'force-dynamic'

const UPDATE_MANIFESTS = new Set(['latest.yml', 'latest-mac.yml', 'latest-linux.yml'])

const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, '') ?? 'https://creatorbox.arushnerdsout.com'

type RouteContext = {
  params: Promise<{ file: string }>
}

function platformForInstaller(fileName: string): DownloadPlatform | null {
  const lower = fileName.toLowerCase()
  if (lower.endsWith('.exe')) return 'windows'
  if (lower.endsWith('.appimage') || lower.endsWith('.deb')) return 'linux'
  if (lower.endsWith('.dmg') || lower.endsWith('.zip')) return 'mac'
  return null
}

function rewriteManifestUrls(yaml: string): string {
  return yaml.replace(/^(\s*url:\s*)(\S+)\s*$/gm, (line, prefix, value) => {
    const fileName = value.includes('/') ? value.split('/').pop()! : value
    const platform = platformForInstaller(fileName)
    if (!platform) return line
    return `${prefix}${SITE_URL}/download/${platform}`
  })
}

export async function GET(_request: Request, context: RouteContext) {
  const { file } = await context.params
  const release = await fetchLatestReleaseRaw()

  if (!release) {
    return new NextResponse('No release found', { status: 404 })
  }

  const asset = release.assets.find((entry) => entry.name === file)
  if (!asset) {
    return new NextResponse('Asset not found', { status: 404 })
  }

  if (UPDATE_MANIFESTS.has(file)) {
    const yaml = await fetchReleaseAssetText(asset.id)
    if (!yaml) {
      return new NextResponse('Failed to load update manifest', { status: 502 })
    }
    return new NextResponse(rewriteManifestUrls(yaml), {
      headers: {
        'Content-Type': 'text/yaml; charset=utf-8',
        'Cache-Control': 'public, max-age=300',
      },
    })
  }

  const platform = platformForInstaller(file)
  if (platform) {
    return NextResponse.redirect(`${SITE_URL}/download/${platform}`, 302)
  }

  const bytes = await fetchReleaseAssetBytes(asset.id)
  if (!bytes) {
    return new NextResponse('Failed to load asset', { status: 502 })
  }

  return new NextResponse(bytes, {
    headers: {
      'Cache-Control': 'public, max-age=300',
    },
  })
}
