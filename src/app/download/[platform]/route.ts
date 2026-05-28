import { NextResponse } from 'next/server'

import { getPlatformAsset, getReleaseDownloads } from '@/lib/get-release-downloads'
import { getGithubToken, resolveReleaseAssetDownloadUrl } from '@/lib/github-api'
import {
  getReleasesLatestUrl,
  type DownloadPlatform,
} from '@/lib/github-releases'

export const dynamic = 'force-dynamic'

const PLATFORMS = new Set<DownloadPlatform>(['windows', 'mac', 'linux'])

type RouteContext = {
  params: Promise<{ platform: string }>
}

function downloadUnavailableResponse(
  platform: DownloadPlatform,
  reason: 'missing_token' | 'no_release' | 'no_asset' | 'asset_redirect_failed',
): NextResponse {
  const messages: Record<typeof reason, string> = {
    missing_token:
      'Downloads are not configured: add GITHUB_TOKEN to this site on Vercel (read access to the private creatorbox repo), then redeploy.',
    no_release:
      'No GitHub release was found yet. Publish a tag (for example v0.0.3) and wait for the Release workflow to finish.',
    no_asset: `The latest release has no installer for ${platform} yet.`,
    asset_redirect_failed:
      'Could not start the download. Check GITHUB_TOKEN on Vercel and try again.',
  }

  return new NextResponse(messages[reason], {
    status: 503,
    headers: { 'Content-Type': 'text/plain; charset=utf-8' },
  })
}

export async function GET(_request: Request, context: RouteContext) {
  const { platform: platformParam } = await context.params

  if (!PLATFORMS.has(platformParam as DownloadPlatform)) {
    return NextResponse.redirect(getReleasesLatestUrl(), 302)
  }

  const platform = platformParam as DownloadPlatform

  if (!getGithubToken()) {
    return downloadUnavailableResponse(platform, 'missing_token')
  }

  const release = await getReleaseDownloads()

  if (release.fetchError === 'not_found' || !release.tagName) {
    return downloadUnavailableResponse(platform, 'no_release')
  }

  const platformInfo = getPlatformAsset(release, platform)

  if (!platformInfo.assetId) {
    return downloadUnavailableResponse(platform, 'no_asset')
  }

  const signedUrl = await resolveReleaseAssetDownloadUrl(platformInfo.assetId)
  if (!signedUrl) {
    return downloadUnavailableResponse(platform, 'asset_redirect_failed')
  }

  const fileName = platformInfo.fileName ?? `CreatorBox-${platform}`
  return NextResponse.redirect(signedUrl, 302)
}
