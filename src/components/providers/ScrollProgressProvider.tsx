'use client'

import Lenis from 'lenis'
import { createContext, useContext, useEffect, useState, type ReactNode } from 'react'

type ScrollProgressContextValue = {
  progress: number
  reducedMotion: boolean
}

const ScrollProgressContext = createContext<ScrollProgressContextValue>({
  progress: 0,
  reducedMotion: false,
})

export function useScrollProgress() {
  return useContext(ScrollProgressContext)
}

export function ScrollProgressProvider({ children }: { children: ReactNode }) {
  const [progress, setProgress] = useState(0)
  const [reducedMotion, setReducedMotion] = useState(false)

  useEffect(() => {
    const media = window.matchMedia('(prefers-reduced-motion: reduce)')
    const updateMotion = () => setReducedMotion(media.matches)
    updateMotion()
    media.addEventListener('change', updateMotion)

    const updateProgress = () => {
      const max = document.documentElement.scrollHeight - window.innerHeight
      setProgress(max > 0 ? window.scrollY / max : 0)
    }

    updateProgress()

    if (media.matches) {
      window.addEventListener('scroll', updateProgress, { passive: true })
      window.addEventListener('resize', updateProgress)
      return () => {
        media.removeEventListener('change', updateMotion)
        window.removeEventListener('scroll', updateProgress)
        window.removeEventListener('resize', updateProgress)
      }
    }

    const lenis = new Lenis({
      duration: 1.1,
      smoothWheel: true,
    })

    lenis.on('scroll', updateProgress)
    window.addEventListener('resize', updateProgress)

    let frame = 0
    const raf = (time: number) => {
      lenis.raf(time)
      frame = requestAnimationFrame(raf)
    }
    frame = requestAnimationFrame(raf)

    return () => {
      media.removeEventListener('change', updateMotion)
      cancelAnimationFrame(frame)
      lenis.destroy()
      window.removeEventListener('resize', updateProgress)
    }
  }, [])

  return (
    <ScrollProgressContext.Provider value={{ progress, reducedMotion }}>
      {children}
    </ScrollProgressContext.Provider>
  )
}
