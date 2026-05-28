import { LandingPage } from '@/components/LandingPage'
import { getReleaseDownloads } from '@/lib/get-release-downloads'

export const dynamic = 'force-dynamic'

export default async function Home() {
  const release = await getReleaseDownloads()
  return <LandingPage release={release} />
}
