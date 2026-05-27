'use client'

import { motion } from 'motion/react'

import { SectionShell } from './SectionShell'

export function ProblemSection() {
  return (
    <SectionShell className="min-h-[70vh] flex flex-col justify-center">
      <motion.div
        initial={{ opacity: 0, y: 32 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-80px' }}
        transition={{ duration: 0.6 }}
        className="max-w-3xl"
      >
        <p className="text-sm font-medium uppercase tracking-widest text-primary">Why CreatorBox</p>
        <h2 className="mt-4 text-3xl font-semibold tracking-tight sm:text-4xl">
          The agent is the workflow — not a chat box on export presets.
        </h2>
        <p className="mt-6 text-lg leading-relaxed text-muted-foreground">
          Most AI tools for creators bolt conversation onto templates. CreatorBox is editor-first:
          draft a brief, iterate on assets, preview reels and design files inline, and let the
          harness handle branching plans when a step fails. Creative work is loops — hooks,
          thumbnails, re-exports — not one prompt and done.
        </p>
        <p className="mt-4 text-base text-muted-foreground">
          Shipping those loops in a desktop app keeps latency, file size, and privacy on your
          machine. The win is fewer context switches, not more tokens.
        </p>
      </motion.div>
    </SectionShell>
  )
}
