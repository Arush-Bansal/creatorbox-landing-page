import { NextResponse } from 'next/server'

import { getReleaseDownloads } from '@/lib/get-release-downloads'
import { getGithubToken } from '@/lib/github-api'
import { getGithubRepo } from '@/lib/github-releases'

export const dynamic = 'force-dynamic'

/** Owner diagnostics — does not expose secrets. */
export async function GET() {
  const release = await getReleaseDownloads()

  return NextResponse.json({
    repo: getGithubRepo(),
    tokenConfigured: Boolean(getGithubToken()),
    fetchError: release.fetchError,
    tagName: release.tagName,
    version: release.version,
    hasDirectAssets: release.hasDirectAssets,
    assets: Object.fromEntries(
      (['windows', 'mac', 'linux'] as const).map((platform) => [
        platform,
        release.platforms[platform].fileName,
      ]),
    ),
  })
}
