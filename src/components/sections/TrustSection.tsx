'use client'

import { motion } from 'motion/react'
import { HardDrive, KeyRound, Shield } from 'lucide-react'

import { SectionShell } from './SectionShell'

const TRUST = [
  {
    icon: HardDrive,
    title: 'Local-first',
    body: 'Drafts, renders, and workspaces live on your disk — not a sync server in v1.',
  },
  {
    icon: KeyRound,
    title: 'OS keychain',
    body: 'API keys stay in the system vault; the renderer only sees a configured flag.',
  },
  {
    icon: Shield,
    title: 'Workspace boundaries',
    body: 'Agent runs in the main process behind a typed bridge — scoped to your project folder.',
  },
] as const

export function TrustSection() {
  return (
    <SectionShell id="trust" tint="dark">
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.55 }}
      >
        <p className="text-sm font-medium uppercase tracking-widest text-primary">Trust</p>
        <h2 className="mt-4 max-w-2xl text-3xl font-semibold tracking-tight sm:text-4xl">
          Your keys. Your files. Your machine.
        </h2>
      </motion.div>
      <div className="mt-12 grid gap-5 md:grid-cols-3">
        {TRUST.map((item, i) => (
          <motion.div
            key={item.title}
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.07 }}
            className="text-center md:text-left"
          >
            <item.icon className="mx-auto size-9 text-primary md:mx-0" aria-hidden />
            <h3 className="mt-4 font-semibold">{item.title}</h3>
            <p className="mt-2 text-sm text-muted-foreground">{item.body}</p>
          </motion.div>
        ))}
      </div>
    </SectionShell>
  )
}
