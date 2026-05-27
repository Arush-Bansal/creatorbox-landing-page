'use client'

import Image from 'next/image'
import Link from 'next/link'

import { cn } from '@/lib/utils'

const NAV = [
  { href: '#work', label: 'Work' },
  { href: '#create', label: 'Create' },
  { href: '#trust', label: 'Trust' },
  { href: '#download', label: 'Download' },
] as const

export function SiteHeader() {
  return (
    <header className="fixed top-0 z-50 w-full border-b border-white/5 bg-background/30 backdrop-blur-xl">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 sm:px-6">
        <Link href="#" className="flex items-center gap-2.5">
          <Image src="/brand/creatorbox-logo.svg" alt="" width={32} height={32} aria-hidden />
          <span className="font-semibold tracking-tight">CreatorBox</span>
        </Link>
        <nav className="hidden items-center gap-6 text-sm text-muted-foreground md:flex" aria-label="Primary">
          {NAV.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="transition-colors hover:text-foreground"
            >
              {item.label}
            </a>
          ))}
        </nav>
        <a
          href="#download"
          className={cn(
            'rounded-full bg-primary px-4 py-2 text-sm font-semibold text-[hsl(240_10%_6%)]',
            'shadow-[0_0_24px_hsl(48_96%_53%/0.4)] transition hover:shadow-[0_0_36px_hsl(48_96%_53%/0.55)]',
          )}
        >
          Download
        </a>
      </div>
    </header>
  )
}
