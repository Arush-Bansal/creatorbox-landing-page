import type { Metadata } from 'next'
import { Geist, Geist_Mono } from 'next/font/google'

import './globals.css'

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
})

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
})

export const metadata: Metadata = {
  title: 'CreatorBox | The Creative AI\'s missing piece',
  description:
    'Download CreatorBox for Windows, macOS, and Linux. A desktop workspace where your agent plans, edits, and previews creative projects on your machine.',
  openGraph: {
    title: 'CreatorBox | The Creative AI\'s missing piece',
    description:
      'Desktop agentic editor for creatives. Download for Windows, macOS, and Linux.',
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className={`${geistSans.variable} ${geistMono.variable} h-full`}>
      <body className="min-h-full antialiased">{children}</body>
    </html>
  )
}
