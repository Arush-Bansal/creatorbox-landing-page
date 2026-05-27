'use client'

import { motion } from 'motion/react'

import { DownloadButtons } from '@/components/download/DownloadButtons'

export function HeroSection() {
  return (
    <section className="relative z-10 flex min-h-screen flex-col justify-center px-4 pb-20 pt-28 sm:px-6">
      <div className="mx-auto w-full max-w-6xl">
        <div className="max-w-3xl rounded-3xl bg-background/28 p-4 backdrop-blur-[2px] sm:p-6">
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-4 text-sm font-medium uppercase tracking-[0.2em] text-primary"
        >
          Desktop · Windows · macOS · Linux
        </motion.p>
        <motion.h1
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.05 }}
          className="max-w-4xl text-4xl font-semibold leading-[1.08] tracking-tight sm:text-5xl md:text-6xl lg:text-7xl"
        >
          The Creative AI&apos;s{' '}
          <span className="text-gradient-gold">missing piece</span>
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, delay: 0.12 }}
          className="mt-6 max-w-2xl text-lg leading-relaxed text-muted-foreground sm:text-xl"
        >
          A desktop workspace where your agent plans, edits, and previews — video, design, and
          assets stay on your machine. Fewer tabs. One laptop app.
        </motion.p>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, delay: 0.2 }}
          className="mt-10 max-w-3xl"
        >
          <DownloadButtons />
        </motion.div>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.45 }}
          className="mt-16 text-sm text-muted-foreground"
        >
          Scroll to explore the workspace
        </motion.p>
        </div>
      </div>
    </section>
  )
}
