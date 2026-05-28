import {
  getGithubRepo,
  getReleasesLatestUrl,
  pickAssetForPlatform,
  PLATFORM_LABELS,
  type DownloadPlatform,
  type GitHubRelease,
  type PlatformDownload,
} from '@/lib/github-releases'
import {
  fetchLatestReleaseWithMeta,
  type ReleaseFetchError,
} from '@/lib/release-asset-fetch'

export type PlatformReleaseInfo = PlatformDownload & {
  assetId: number | null
  fileName: string | null
  githubAssetUrl: string | null
}

export type ReleaseDownloads = {
  version: string | null
  tagName: string | null
  publishedAt: string | null
  releasePageUrl: string
  platforms: Record<DownloadPlatform, PlatformReleaseInfo>
  hasDirectAssets: boolean
  fetchError: ReleaseFetchError | null
}

function stripVersionPrefix(tagName: string): string {
  return tagName.replace(/^v/i, '')
}

function buildPlatformDownloads(
  release: GitHubRelease | null,
): Record<DownloadPlatform, PlatformReleaseInfo> {
  const platforms: DownloadPlatform[] = ['windows', 'mac', 'linux']

  return platforms.reduce(
    (acc, platform) => {
      const asset = release ? pickAssetForPlatform(release.assets, platform) : null
      acc[platform] = {
        ...PLATFORM_LABELS[platform],
        href: `/download/${platform}`,
        assetId: asset?.id ?? null,
        fileName: asset?.name ?? null,
        githubAssetUrl: asset?.browser_download_url ?? null,
      }
      return acc
    },
    {} as Record<DownloadPlatform, PlatformReleaseInfo>,
  )
}

export async function getReleaseDownloads(): Promise<ReleaseDownloads> {
  const repo = getGithubRepo()
  const releasePageUrl = getReleasesLatestUrl(repo)
  const { release, error } = await fetchLatestReleaseWithMeta()
  const platforms = buildPlatformDownloads(release)

  const hasDirectAssets = (['windows', 'mac', 'linux'] as DownloadPlatform[]).every(
    (platform) => platforms[platform].assetId !== null,
  )

  return {
    version: release ? stripVersionPrefix(release.tag_name) : null,
    tagName: release?.tag_name ?? null,
    publishedAt: release?.published_at ?? null,
    releasePageUrl,
    platforms,
    hasDirectAssets,
    fetchError: error,
  }
}

export function getPlatformAsset(
  release: ReleaseDownloads,
  platform: DownloadPlatform,
): PlatformReleaseInfo {
  return release.platforms[platform]
}
