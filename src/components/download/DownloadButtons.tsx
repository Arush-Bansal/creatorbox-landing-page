'use client'

import { motion } from 'motion/react'
import { Apple, Download, Monitor } from 'lucide-react'

import {
  APP_VERSION,
  PLATFORM_DOWNLOADS,
  RELEASES_LATEST_URL,
  type DownloadPlatform,
} from '@/lib/github-releases'
import { cn } from '@/lib/utils'

const PLATFORM_ICONS: Record<DownloadPlatform, typeof Monitor> = {
  windows: Monitor,
  mac: Apple,
  linux: Download,
}

type DownloadButtonsProps = {
  className?: string
  showAllReleases?: boolean
  compact?: boolean
}

export function DownloadButtons({
  className,
  showAllReleases = true,
  compact = false,
}: DownloadButtonsProps) {
  const platforms = Object.entries(PLATFORM_DOWNLOADS) as [
    DownloadPlatform,
    (typeof PLATFORM_DOWNLOADS)[DownloadPlatform],
  ][]

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
          const isPrimary = key === 'windows'

          return (
            <motion.a
              key={key}
              href={platform.href}
              target="_blank"
              rel="noopener noreferrer"
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
          <a
            href={RELEASES_LATEST_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="underline decoration-primary/40 underline-offset-4 transition-colors hover:text-primary"
          >
            All releases on GitHub
          </a>
          <span className="mx-2 text-border">·</span>
          <span>v{APP_VERSION}</span>
        </p>
      ) : null}
    </div>
  )
}
