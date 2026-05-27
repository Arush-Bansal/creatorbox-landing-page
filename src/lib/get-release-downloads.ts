import {
  getGithubRepo,
  getReleasesLatestUrl,
  pickAssetForPlatform,
  PLATFORM_LABELS,
  type DownloadPlatform,
  type GitHubRelease,
  type PlatformDownload,
} from '@/lib/github-releases'
import { fetchLatestReleaseRaw } from '@/lib/release-asset-fetch'

export type PlatformReleaseInfo = PlatformDownload & {
  assetId: number | null
  /** Direct GitHub asset URL (used when no token / public repo). */
  githubAssetUrl: string | null
}

export type ReleaseDownloads = {
  version: string | null
  tagName: string | null
  publishedAt: string | null
  releasePageUrl: string
  platforms: Record<DownloadPlatform, PlatformReleaseInfo>
  hasDirectAssets: boolean
}

function stripVersionPrefix(tagName: string): string {
  return tagName.replace(/^v/i, '')
}

function buildPlatformDownloads(
  release: GitHubRelease | null,
  repo: string,
): Record<DownloadPlatform, PlatformReleaseInfo> {
  const fallbackHref = getReleasesLatestUrl(repo)
  const platforms: DownloadPlatform[] = ['windows', 'mac', 'linux']

  return platforms.reduce(
    (acc, platform) => {
      const asset = release ? pickAssetForPlatform(release.assets, platform) : null
      acc[platform] = {
        ...PLATFORM_LABELS[platform],
        href: asset ? `/download/${platform}` : fallbackHref,
        assetId: asset?.id ?? null,
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
  const release = await fetchLatestReleaseRaw()
  const platforms = buildPlatformDownloads(release, repo)

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
  }
}

export function getPlatformAsset(
  release: ReleaseDownloads,
  platform: DownloadPlatform,
): PlatformReleaseInfo {
  return release.platforms[platform]
}
