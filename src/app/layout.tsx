import type { Metadata } from 'next'
import type { ReactNode } from 'react'
import { Chivo, IBM_Plex_Sans } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'

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

const SITE_URL = 'https://www.rapscout.com'
const OG_IMAGE = `${SITE_URL}/rapscout-logo.png`

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: 'RapScout — UK Rap Talent',
    template: '%s | RapScout',
  },
  description:
    'Rap Scout discovers and elevates emerging rap talent across the UK and beyond — from Manchester and Birmingham to Wales, Liverpool, and Nottingham, with a global scope spanning Ireland, France, and the United States.',
  keywords: [
    'UK rap',
    'UK hip hop',
    'emerging rap talent',
    'rap talent scouting',
    'A&R UK rap',
    'Manchester rap',
    'Birmingham rap',
    'Midlands rap',
    'emerging UK artists',
    'rap discovery',
    'underground rap UK',
    'new UK rappers',
    'UK music',
    'global rap talent',
  ],
  icons: [{ rel: 'icon', url: '/rapscout-logo.png', type: 'image/png' }],
  openGraph: {
    type: 'website',
    url: SITE_URL,
    siteName: 'RapScout',
    locale: 'en_GB',
    title: 'RapScout — UK Rap Talent',
    description:
      'Rap Scout discovers and elevates emerging rap talent across the UK and beyond — scouting artists early with instinct, taste, and long-term vision.',
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
      'Rap Scout discovers and elevates emerging rap talent across the UK and beyond — scouting artists early with instinct, taste, and long-term vision.',
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
    'Rap Scout is a platform dedicated to discovering and elevating emerging rap talent across the UK and beyond.',
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
      <head>
        <link
          rel="preload"
          as="image"
          href="/hero/portrait-poster.avif"
          type="image/avif"
          media="(max-width: 767px)"
        />
        <link
          rel="preload"
          as="image"
          href="/hero/landscape-poster.avif"
          type="image/avif"
          media="(min-width: 768px)"
        />
      </head>
      <body>
        {children}
        <Analytics />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </body>
    </html>
  )
}
