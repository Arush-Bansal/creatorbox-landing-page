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

export async function GET(_request: Request, context: RouteContext) {
  const { platform: platformParam } = await context.params

  if (!PLATFORMS.has(platformParam as DownloadPlatform)) {
    return NextResponse.redirect(getReleasesLatestUrl(), 302)
  }

  const platform = platformParam as DownloadPlatform
  const release = await getReleaseDownloads()
  const platformInfo = getPlatformAsset(release, platform)

  if (platformInfo.assetId && getGithubToken()) {
    const signedUrl = await resolveReleaseAssetDownloadUrl(platformInfo.assetId)
    if (signedUrl) {
      return NextResponse.redirect(signedUrl, 302)
    }
  }

  if (platformInfo.githubAssetUrl) {
    return NextResponse.redirect(platformInfo.githubAssetUrl, 302)
  }

  return NextResponse.redirect(release.releasePageUrl, 302)
}
