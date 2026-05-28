'use client'

import { motion } from 'motion/react'
import { Apple, Download, Monitor } from 'lucide-react'
import { useMemo } from 'react'

import type { ReleaseDownloads } from '@/lib/get-release-downloads'
import {
  PLATFORM_DOWNLOADS,
  type DownloadPlatform,
  type PlatformDownload,
} from '@/lib/github-releases'
import { cn } from '@/lib/utils'

const PLATFORM_ICONS: Record<DownloadPlatform, typeof Monitor> = {
  windows: Monitor,
  mac: Apple,
  linux: Download,
}

function detectPlatform(): DownloadPlatform | null {
  if (typeof navigator === 'undefined') return null
  const ua = navigator.userAgent.toLowerCase()
  const platform = navigator.platform?.toLowerCase() ?? ''

  if (ua.includes('win') || platform.includes('win')) return 'windows'
  if (ua.includes('mac') || platform.includes('mac')) return 'mac'
  if (ua.includes('linux') || platform.includes('linux')) return 'linux'
  return null
}

type DownloadButtonsProps = {
  className?: string
  showAllReleases?: boolean
  compact?: boolean
  release?: ReleaseDownloads
}

export function DownloadButtons({
  className,
  showAllReleases = true,
  compact = false,
  release,
}: DownloadButtonsProps) {
  const detectedPlatform = useMemo(() => detectPlatform(), [])

  const platforms = Object.entries(release?.platforms ?? PLATFORM_DOWNLOADS) as [
    DownloadPlatform,
    PlatformDownload,
  ][]

  const versionLabel = release?.version ?? null
  const showGithubLink = release?.hasDirectAssets ?? false

  return (
    <div className={cn('space-y-4', className)}>
      <div
        className={cn(
          'grid gap-3',
          compact ? 'grid-cols-1 sm:grid-cols-3' : 'grid-cols-1 sm:grid-cols-3',
        )}
      >
        {platforms.map(([key, platform], index) => {
          const Icon = PLATFORM_ICONS[key]
          const isPrimary = detectedPlatform ? key === detectedPlatform : key === 'windows'

          return (
            <motion.a
              key={key}
              href={platform.href}
              download={platform.href.startsWith('/download/')}
              target={platform.href.startsWith('http') ? '_blank' : undefined}
              rel={platform.href.startsWith('http') ? 'noopener noreferrer' : undefined}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.15 + index * 0.08, duration: 0.45 }}
              whileHover={{ scale: 1.03, y: -2 }}
              whileTap={{ scale: 0.98 }}
              className={cn(
                'group flex flex-col items-center gap-2 rounded-2xl border px-5 py-4 text-center transition-shadow',
                isPrimary
                  ? 'border-primary/50 bg-primary text-primary-foreground shadow-[0_0_40px_hsl(48_96%_53%/0.35)] hover:shadow-[0_0_56px_hsl(48_96%_53%/0.5)]'
                  : 'glass-card text-foreground hover:border-white/25 hover:bg-card/60',
              )}
            >
              <Icon className={cn('size-6', isPrimary ? '' : 'text-primary')} aria-hidden />
              <span className="text-base font-semibold">{platform.label}</span>
              <span
                className={cn(
                  'text-xs',
                  isPrimary ? 'text-primary-foreground/80' : 'text-muted-foreground',
                )}
              >
                {platform.sublabel}
              </span>
            </motion.a>
          )
        })}
      </div>

      {showAllReleases ? (
        <p className="text-center text-sm text-muted-foreground">
          {showGithubLink ? (
            <a
              href={release?.releasePageUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="underline decoration-primary/40 underline-offset-4 transition-colors hover:text-primary"
            >
              Release notes on GitHub
            </a>
          ) : null}
          {versionLabel ? (
            <>
              {showGithubLink ? <span className="mx-2 text-border">·</span> : null}
              <span>v{versionLabel}</span>
            </>
          ) : release?.fetchError === 'missing_token' ? (
            <span>Downloads will work once GITHUB_TOKEN is set on Vercel.</span>
          ) : release?.fetchError === 'not_found' ? (
            <span>Waiting for the first GitHub release build…</span>
          ) : null}
        </p>
      ) : null}
    </div>
  )
}
