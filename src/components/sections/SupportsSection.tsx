'use client'

import { useState } from 'react'
import { motion } from 'motion/react'

import {
  SUPPORTED_INTEGRATION_COUNT,
  SUPPORTED_INTEGRATIONS,
  type SupportedIntegration,
} from '@/lib/supported-integrations'
import { cn } from '@/lib/utils'

import { SectionShell } from './SectionShell'

const CATEGORY_LABEL: Record<SupportedIntegration['category'], string> = {
  plugin: 'Managed plugin',
  api: 'API integration',
  research: 'Web research',
}

function SupportLogo({ name, logoUrl }: { name: string; logoUrl: string }) {
  const [failed, setFailed] = useState(false)

  if (failed) {
    return (
      <span
        className="flex size-14 items-center justify-center rounded-xl border border-white/10 bg-background/60 text-lg font-semibold text-primary"
        aria-hidden
      >
        {name.charAt(0)}
      </span>
    )
  }

  return (
    <div className="flex size-14 shrink-0 items-center justify-center overflow-hidden rounded-xl border border-white/10 bg-background/40 p-2">
      {/* eslint-disable-next-line @next/next/no-img-element -- remote brand URLs from CreatorBox app */}
      <img
        src={logoUrl}
        alt=""
        className="max-h-full max-w-full object-contain"
        loading="lazy"
        decoding="async"
        referrerPolicy="no-referrer"
        onError={() => setFailed(true)}
      />
    </div>
  )
}

function SupportCard({
  item,
  index,
}: {
  item: SupportedIntegration
  index: number
}) {
  return (
    <motion.li
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.04, duration: 0.4 }}
      className={cn(
        'flex w-[9.5rem] shrink-0 snap-start flex-col items-center gap-3 rounded-2xl glass-card p-4',
        'sm:w-[10.5rem]',
      )}
    >
      <SupportLogo name={item.name} logoUrl={item.logoUrl} />
      <div className="text-center">
        <p className="text-sm font-semibold leading-tight">{item.name}</p>
        <p className="mt-1 text-[0.65rem] uppercase tracking-wide text-muted-foreground">
          {CATEGORY_LABEL[item.category]}
        </p>
      </div>
    </motion.li>
  )
}

export function SupportsSection() {
  return (
    <SectionShell id="supports" className="min-h-0 py-20 sm:py-28">
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-60px' }}
        transition={{ duration: 0.55 }}
      >
        <p className="text-sm font-medium uppercase tracking-widest text-primary">Integrations</p>
        <h2 className="mt-4 max-w-2xl text-3xl font-semibold tracking-tight sm:text-4xl">
          {SUPPORTED_INTEGRATION_COUNT} tools and APIs, ready in the app
        </h2>
        <p className="mt-4 max-w-2xl text-muted-foreground">
          Managed FFmpeg and Remotion under Plugins, provider keys in Settings, and Firecrawl for
          search and scrape — the same brands you configure in CreatorBox.
        </p>
      </motion.div>

      <div className="relative mt-10">
        <ul
          className="flex min-w-min snap-x snap-mandatory gap-4 overflow-x-auto pb-2 pr-4 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
          aria-label={`${SUPPORTED_INTEGRATION_COUNT} supported tools and integrations`}
        >
          {SUPPORTED_INTEGRATIONS.map((item, index) => (
            <SupportCard key={item.id} item={item} index={index} />
          ))}
        </ul>
        <div
          className="pointer-events-none absolute inset-y-0 right-0 w-12 bg-gradient-to-l from-background to-transparent sm:w-16"
          aria-hidden
        />
      </div>
    </SectionShell>
  )
}
