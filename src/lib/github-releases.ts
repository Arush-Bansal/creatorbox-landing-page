/** GitHub Releases — matches electron-builder artifact names in the desktop app. */
export const DEFAULT_GITHUB_REPO = 'Arush-Bansal/creatorbox'

export function getGithubRepo(): string {
  const fromEnv = process.env.GITHUB_REPO?.trim()
  return fromEnv && fromEnv.includes('/') ? fromEnv : DEFAULT_GITHUB_REPO
}

export function getReleasesLatestUrl(repo = getGithubRepo()): string {
  return `https://github.com/${repo}/releases/latest`
}

export const RELEASES_LATEST_URL = getReleasesLatestUrl()

export type DownloadPlatform = 'windows' | 'mac' | 'linux'

export type PlatformDownload = {
  label: string
  sublabel: string
  href: string
  fileHint: string
}

export const PLATFORM_LABELS: Record<
  DownloadPlatform,
  Pick<PlatformDownload, 'label' | 'sublabel' | 'fileHint'>
> = {
  windows: {
    label: 'Windows',
    sublabel: 'Installer (.exe)',
    fileHint: 'CreatorBox-Setup-*.exe',
  },
  mac: {
    label: 'macOS',
    sublabel: 'Disk image (.dmg)',
    fileHint: 'CreatorBox-*.dmg',
  },
  linux: {
    label: 'Linux',
    sublabel: 'AppImage',
    fileHint: 'CreatorBox-*.AppImage',
  },
}

/** Fallback when release metadata is not loaded yet — still route through our download handler. */
export function buildFallbackDownloads(): Record<DownloadPlatform, PlatformDownload> {
  const platforms: DownloadPlatform[] = ['windows', 'mac', 'linux']
  return platforms.reduce(
    (acc, platform) => {
      acc[platform] = {
        ...PLATFORM_LABELS[platform],
        href: `/download/${platform}`,
      }
      return acc
    },
    {} as Record<DownloadPlatform, PlatformDownload>,
  )
}

export const PLATFORM_DOWNLOADS = buildFallbackDownloads()

export type GitHubReleaseAsset = {
  id: number
  name: string
  browser_download_url: string
}

export type GitHubRelease = {
  tag_name: string
  name: string
  published_at: string
  html_url: string
  draft?: boolean
  prerelease?: boolean
  assets: GitHubReleaseAsset[]
}

const PLATFORM_ASSET_PATTERNS: Record<DownloadPlatform, RegExp[]> = {
  windows: [/CreatorBox-Setup-.*\.exe$/i, /CreatorBox-.*-win-.*\.exe$/i],
  mac: [/CreatorBox-.*\.dmg$/i],
  linux: [/CreatorBox-.*\.AppImage$/i],
}

const ARCH_PRIORITY = ['x64', 'arm64', 'universal'] as const

function archRank(name: string): number {
  const lower = name.toLowerCase()
  for (let i = 0; i < ARCH_PRIORITY.length; i += 1) {
    if (lower.includes(ARCH_PRIORITY[i])) return i
  }
  return ARCH_PRIORITY.length
}

export function pickAssetForPlatform(
  assets: GitHubReleaseAsset[],
  platform: DownloadPlatform,
): GitHubReleaseAsset | null {
  const patterns = PLATFORM_ASSET_PATTERNS[platform]
  const matches = assets.filter((asset) => patterns.some((pattern) => pattern.test(asset.name)))
  if (matches.length === 0) return null

  return [...matches].sort((a, b) => archRank(a.name) - archRank(b.name))[0]
}

export function resolvePlatformDownloads(
  release: GitHubRelease | null,
  repo = getGithubRepo(),
): Record<DownloadPlatform, PlatformDownload> {
  const fallbackHref = getReleasesLatestUrl(repo)
  const platforms: DownloadPlatform[] = ['windows', 'mac', 'linux']

  return platforms.reduce(
    (acc, platform) => {
      const asset = release ? pickAssetForPlatform(release.assets, platform) : null
      acc[platform] = {
        ...PLATFORM_LABELS[platform],
        href: asset?.browser_download_url ?? fallbackHref,
      }
      return acc
    },
    {} as Record<DownloadPlatform, PlatformDownload>,
  )
}
