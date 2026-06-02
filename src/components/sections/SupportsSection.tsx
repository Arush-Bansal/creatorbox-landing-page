'use client'

import { useState } from 'react'
import { motion } from 'motion/react'

import {
  SUPPORTED_INTEGRATION_COUNT,
  SUPPORTED_INTEGRATIONS,
} from '@/lib/supported-integrations'
import { cn } from '@/lib/utils'

import { SectionShell } from './SectionShell'

function SupportLogo({ name, logoUrl }: { name: string; logoUrl: string }) {
  const [failed, setFailed] = useState(false)

  if (failed) {
    return (
      <span
        className="flex size-16 items-center justify-center rounded-xl border border-white/10 bg-background/60 text-xl font-semibold text-primary sm:size-[4.5rem]"
        aria-hidden
      >
        {name.charAt(0)}
      </span>
    )
  }

  return (
    <div className="flex size-16 shrink-0 items-center justify-center overflow-hidden rounded-xl border border-white/10 bg-background/40 p-2.5 sm:size-[4.5rem]">
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
  name,
  logoUrl,
  className,
}: {
  name: string
  logoUrl: string
  className?: string
}) {
  return (
    <li
      className={cn(
        'flex w-[8.25rem] shrink-0 flex-col items-center gap-3 rounded-2xl glass-card px-3 py-4 sm:w-[9.5rem] sm:px-4',
        className,
      )}
    >
      <SupportLogo name={name} logoUrl={logoUrl} />
      <p className="text-center text-sm font-semibold leading-tight">{name}</p>
    </li>
  )
}

const MARQUEE_ITEMS = [...SUPPORTED_INTEGRATIONS, ...SUPPORTED_INTEGRATIONS]

export function SupportsSection() {
  return (
    <SectionShell id="supports" className="min-h-0 overflow-hidden py-20 sm:py-28">
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
          FFmpeg, Remotion, Anthropic, Fal.ai, ElevenLabs, Gemini, and Firecrawl: the same brands
          you configure in CreatorBox.
        </p>
      </motion.div>

      {/* Infinite marquee: pauses on hover / touch focus */}
      <div
        className="integration-marquee relative -mx-4 mt-10 motion-reduce:hidden sm:-mx-6"
        role="region"
        aria-label={`${SUPPORTED_INTEGRATION_COUNT} supported tools and integrations`}
      >
        <div
          className="pointer-events-none absolute inset-y-0 left-0 z-10 w-12 bg-gradient-to-r from-background via-background/90 to-transparent sm:w-24"
          aria-hidden
        />
        <div
          className="pointer-events-none absolute inset-y-0 right-0 z-10 w-12 bg-gradient-to-l from-background via-background/90 to-transparent sm:w-24"
          aria-hidden
        />

        <div className="overflow-hidden px-1">
          <ul className="integration-marquee-track flex w-max gap-3 sm:gap-4">
            {MARQUEE_ITEMS.map((item, index) => (
              <SupportCard
                key={`${item.id}-${index}`}
                name={item.name}
                logoUrl={item.logoUrl}
              />
            ))}
          </ul>
        </div>
      </div>

      {/* Static grid when reduced motion is preferred */}
      <ul
        className="mt-10 hidden grid-cols-2 gap-3 motion-reduce:grid sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-7"
        aria-label={`${SUPPORTED_INTEGRATION_COUNT} supported tools and integrations`}
      >
        {SUPPORTED_INTEGRATIONS.map((item) => (
          <SupportCard key={item.id} name={item.name} logoUrl={item.logoUrl} />
        ))}
      </ul>
    </SectionShell>
  )
}
