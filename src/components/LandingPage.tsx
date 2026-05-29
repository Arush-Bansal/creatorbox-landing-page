'use client'

import { LaptopExperience } from '@/components/three/LaptopExperience'
import { ScrollProgressProvider } from '@/components/providers/ScrollProgressProvider'
import { SiteFooter } from '@/components/layout/SiteFooter'
import { SiteHeader } from '@/components/layout/SiteHeader'
import { SupportsSection } from '@/components/sections/SupportsSection'
import { DownloadSection } from '@/components/sections/DownloadSection'
import { HeroSection } from '@/components/sections/HeroSection'
import { ProblemSection } from '@/components/sections/ProblemSection'
import { TrustSection } from '@/components/sections/TrustSection'
import type { ReleaseDownloads } from '@/lib/get-release-downloads'

type LandingPageProps = {
  release: ReleaseDownloads
}

export function LandingPage({ release }: LandingPageProps) {
  return (
    <ScrollProgressProvider>
      <LaptopExperience />
      <SiteHeader />
      <main className="relative z-10">
        <HeroSection release={release} />
        <ProblemSection />
        <SupportsSection />
        <TrustSection />
        <DownloadSection release={release} />
      </main>
      <SiteFooter releasePageUrl={release.releasePageUrl} />
    </ScrollProgressProvider>
  )
}
