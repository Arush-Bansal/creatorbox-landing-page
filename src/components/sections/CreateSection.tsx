'use client'

import { motion } from 'motion/react'
import { Clapperboard, Film, Layers, Mic } from 'lucide-react'

import { SectionShell } from './SectionShell'

const FEATURES = [
  {
    icon: Clapperboard,
    title: 'Portrait reels',
    body: 'Record takes in-app; FFmpeg crops to mirrored 9:16 WebM in the background.',
  },
  {
    icon: Film,
    title: 'Managed FFmpeg',
    body: 'Install from Plugins — video, audio, and compositing without global PATH hacks.',
  },
  {
    icon: Layers,
    title: 'Motion scenes',
    body: 'Code-driven scenes in your workspace; render overlays and composite with FFmpeg.',
  },
  {
    icon: Mic,
    title: 'Integrations',
    body: 'Fal.ai, ElevenLabs, Google Gemini, and Anthropic — keys in your OS vault.',
  },
] as const

export function CreateSection() {
  return (
    <SectionShell id="create" className="min-h-[80vh]">
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.55 }}
      >
        <p className="text-sm font-medium uppercase tracking-widest text-primary">Create</p>
        <h2 className="mt-4 max-w-2xl text-3xl font-semibold tracking-tight sm:text-4xl">
          Built for video and motion — on your laptop.
        </h2>
      </motion.div>
      <ul className="mt-12 grid gap-6 sm:grid-cols-2">
        {FEATURES.map((item, i) => (
          <motion.li
            key={item.title}
            initial={{ opacity: 0, x: i % 2 === 0 ? -16 : 16 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.45, delay: i * 0.06 }}
            className="flex gap-4 rounded-2xl glass-card p-6"
          >
            <item.icon className="size-7 shrink-0 text-primary" aria-hidden />
            <div>
              <h3 className="font-semibold">{item.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{item.body}</p>
            </div>
          </motion.li>
        ))}
      </ul>
    </SectionShell>
  )
}
