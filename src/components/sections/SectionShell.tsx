import type { ReactNode } from 'react'

import { cn } from '@/lib/utils'

type SectionShellProps = {
  id?: string
  className?: string
  children: ReactNode
  tint?: 'none' | 'dark'
}

export function SectionShell({ id, className, children, tint = 'none' }: SectionShellProps) {
  return (
    <section
      id={id}
      className={cn(
        'relative z-10 mx-auto w-full max-w-6xl px-4 py-24 sm:px-6 sm:py-32',
        tint === 'dark' && 'rounded-3xl glass-card my-8',
        className,
      )}
    >
      {children}
    </section>
  )
}
