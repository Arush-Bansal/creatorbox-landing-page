'use client'

import dynamic from 'next/dynamic'

import { useScrollProgress } from '@/components/providers/ScrollProgressProvider'

const LaptopScene = dynamic(
  () => import('./LaptopScene').then((m) => m.LaptopScene),
  { ssr: false },
)

export function LaptopExperience() {
  const { reducedMotion } = useScrollProgress()

  if (reducedMotion) {
    return (
      <div className="pointer-events-none fixed inset-0 z-0 nebula-static-bg" aria-hidden>
        <div className="absolute inset-0 bg-background/40" />
      </div>
    )
  }

  return <LaptopScene />
}
