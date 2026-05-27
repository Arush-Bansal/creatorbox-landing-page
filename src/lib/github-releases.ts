/** Dummy GitHub Releases config — swap owner/repo when the repo is public. */
export const GITHUB_REPO = 'creatorbox/creatorbox'

export const RELEASES_LATEST_URL = `https://github.com/${GITHUB_REPO}/releases/latest`

export type DownloadPlatform = 'windows' | 'mac' | 'linux'

export const PLATFORM_DOWNLOADS: Record<
  DownloadPlatform,
  { label: string; sublabel: string; href: string; fileHint: string }
> = {
  windows: {
    label: 'Windows',
    sublabel: 'Installer (.exe)',
    href: RELEASES_LATEST_URL,
    fileHint: 'CreatorBox-Setup-*.exe',
  },
  mac: {
    label: 'macOS',
    sublabel: 'Disk image (.dmg)',
    href: RELEASES_LATEST_URL,
    fileHint: 'CreatorBox-*.dmg',
  },
  linux: {
    label: 'Linux',
    sublabel: 'AppImage',
    href: RELEASES_LATEST_URL,
    fileHint: 'CreatorBox-*.AppImage',
  },
}

export const APP_VERSION = '0.1.0'
