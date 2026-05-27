'use client'

import { LaptopExperience } from '@/components/three/LaptopExperience'
import { ScrollProgressProvider } from '@/components/providers/ScrollProgressProvider'
import { SiteFooter } from '@/components/layout/SiteFooter'
import { SiteHeader } from '@/components/layout/SiteHeader'
import { CreateSection } from '@/components/sections/CreateSection'
import { DownloadSection } from '@/components/sections/DownloadSection'
import { HeroSection } from '@/components/sections/HeroSection'
import { ProblemSection } from '@/components/sections/ProblemSection'
import { TrustSection } from '@/components/sections/TrustSection'
import { WorkSection } from '@/components/sections/WorkSection'

export function LandingPage() {
  return (
    <ScrollProgressProvider>
      <LaptopExperience />
      <SiteHeader />
      <main className="relative z-10">
        <HeroSection />
        <ProblemSection />
        <WorkSection />
        <CreateSection />
        <TrustSection />
        <DownloadSection />
      </main>
      <SiteFooter />
    </ScrollProgressProvider>
  )
}
