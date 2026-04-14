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

const SITE_URL = 'https://www.rapscout.co.uk'
const OG_IMAGE = `${SITE_URL}/rapscout-logo.png`

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: 'RapScout — UK Rap Talent',
    template: '%s | RapScout',
  },
  description:
    'RapScout discovers and champions emerging talent across the UK rap scene. Scouts, studio sessions, and the artists you need on your radar before anyone else.',
  keywords: [
    'UK rap',
    'UK hip hop',
    'rap talent scouting',
    'emerging UK artists',
    'rap discovery',
    'underground rap UK',
    'new UK rappers',
    'rap sessions',
    'UK music',
  ],
  icons: [{ rel: 'icon', url: '/rapscout-logo.png', type: 'image/png' }],
  openGraph: {
    type: 'website',
    url: SITE_URL,
    siteName: 'RapScout',
    locale: 'en_GB',
    title: 'RapScout — UK Rap Talent',
    description:
      'RapScout discovers and champions emerging talent across the UK rap scene. Scouts, studio sessions, and the artists you need on your radar before anyone else.',
    images: [
      {
        url: OG_IMAGE,
        width: 1024,
        height: 1024,
        alt: 'RapScout',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'RapScout — UK Rap Talent',
    description:
      'RapScout discovers and champions emerging talent across the UK rap scene.',
    images: [OG_IMAGE],
  },
  alternates: {
    canonical: SITE_URL,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
}

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: 'RapScout',
  url: SITE_URL,
  logo: OG_IMAGE,
  description:
    'RapScout discovers and champions emerging talent across the UK rap scene.',
  sameAs: [
    'https://www.youtube.com/@rapscouts',
    'https://www.instagram.com/rapscouts',
    'https://www.tiktok.com/@rapscoutuk',
  ],
}

export default function RootLayout({
  children,
}: Readonly<{
  children: ReactNode
}>) {
  return (
    <html lang="en-GB" className={`${chivo.variable} ${ibmPlexSans.variable}`}>
      <body>
        {children}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </body>
    </html>
  )
}
