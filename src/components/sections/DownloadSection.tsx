'use client'

import { motion } from 'motion/react'

import { DownloadButtons } from '@/components/download/DownloadButtons'
import type { ReleaseDownloads } from '@/lib/get-release-downloads'

import { SectionShell } from './SectionShell'

type DownloadSectionProps = {
  release: ReleaseDownloads
}

export function DownloadSection({ release }: DownloadSectionProps) {
  return (
    <SectionShell id="download" className="min-h-[90vh] flex flex-col justify-center pb-32">
      <motion.div
        initial={{ opacity: 0, y: 28 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.55 }}
        className="mx-auto max-w-3xl text-center"
      >
        <h2 className="text-3xl font-semibold tracking-tight sm:text-4xl">
          Download CreatorBox for your laptop
        </h2>
        <p className="mt-4 text-muted-foreground">
          {release.hasDirectAssets
            ? 'Choose your platform below — the installer downloads directly from GitHub Releases.'
            : 'Release builds are published on GitHub. Choose your platform below (links go to the latest release page until the first build is published).'}{' '}
          Requires Claude Code / Anthropic authentication for the Work agent.
        </p>
        <div className="mt-10">
          <DownloadButtons release={release} />
        </div>
        <ul className="mt-12 space-y-2 text-left text-sm text-muted-foreground sm:mx-auto sm:max-w-md">
          <li>Windows 10/11 · macOS 12+ · modern Linux (AppImage)</li>
          <li>Node 20+ runtime bundled with the desktop build</li>
          <li>Optional: Fal, ElevenLabs, Gemini keys in Settings</li>
        </ul>
      </motion.div>
    </SectionShell>
  )
}
