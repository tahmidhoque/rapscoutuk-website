import type { Metadata } from 'next'
import type { ReactNode } from 'react'
import { Chivo, IBM_Plex_Sans } from 'next/font/google'

import './globals.css'

const chivo = Chivo({
  subsets: ['latin'],
  variable: '--font-chivo',
  weight: ['400', '600', '700', '900'],
  style: ['normal', 'italic'],
  display: 'swap',
})

const ibmPlexSans = IBM_Plex_Sans({
  subsets: ['latin'],
  variable: '--font-ibm',
  weight: ['400', '500', '600'],
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'RapScout — UK rap talent',
  description:
    'RapScout finds new talent across the UK rap scene. Follow for scouts, sessions, and the artists you need on your radar.',
  icons: [{ rel: 'icon', url: '/rapscout-logo.png', type: 'image/png' }],
}

export default function RootLayout({
  children,
}: Readonly<{
  children: ReactNode
}>) {
  return (
    <html lang="en-GB" className={`${chivo.variable} ${ibmPlexSans.variable}`}>
      <body>{children}</body>
    </html>
  )
}
