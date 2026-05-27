'use client'

import { motion } from 'motion/react'
import { FolderTree, MessageSquare, PanelRight } from 'lucide-react'

import { SectionShell } from './SectionShell'

const PANES = [
  {
    icon: FolderTree,
    title: 'Explorer',
    body: 'Browse your workspace — files stay on disk under a project folder you own.',
  },
  {
    icon: MessageSquare,
    title: 'Work agent',
    body: 'Stream with your coding agent: plans, tools, checkpoints, and workspace-scoped edits.',
  },
  {
    icon: PanelRight,
    title: 'Preview',
    body: 'Video, audio, images, HTML, Markdown, reels, and more — without leaving the app.',
  },
] as const

export function WorkSection() {
  return (
    <SectionShell id="work" tint="dark" className="min-h-[85vh]">
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-60px' }}
        transition={{ duration: 0.55 }}
      >
        <p className="text-sm font-medium uppercase tracking-widest text-primary">Work</p>
        <h2 className="mt-4 max-w-2xl text-3xl font-semibold tracking-tight sm:text-4xl">
          Three panes. One creative command center.
        </h2>
        <p className="mt-4 max-w-2xl text-muted-foreground">
          Resizable layout: explorer on the left, agent chat in the center, rich preview on the
          right — the same structure you get in the app.
        </p>
      </motion.div>
      <div className="mt-12 grid gap-5 md:grid-cols-3">
        {PANES.map((pane, i) => (
          <motion.div
            key={pane.title}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.08, duration: 0.45 }}
            className="rounded-2xl border border-white/10 bg-background/50 p-6"
          >
            <pane.icon className="size-8 text-primary" aria-hidden />
            <h3 className="mt-4 text-lg font-semibold">{pane.title}</h3>
            <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{pane.body}</p>
          </motion.div>
        ))}
      </div>
    </SectionShell>
  )
}
