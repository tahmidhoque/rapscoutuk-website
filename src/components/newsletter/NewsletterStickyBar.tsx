'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useEffect, useState } from 'react'

import { NewsletterCta } from '@/components/newsletter/NewsletterCta'
import { cn } from '@/lib/utils'

const HERO_SECTION_LABEL = 'RapScout'

/**
 * Compact top bar — appears once the user has scrolled past most of the hero.
 */
export function NewsletterStickyBar() {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const hero = document.querySelector<HTMLElement>(
      `section[aria-label="${HERO_SECTION_LABEL}"]`,
    )
    if (!hero) return

    const sentinel = document.createElement('div')
    sentinel.setAttribute('aria-hidden', 'true')
    sentinel.className = 'pointer-events-none absolute left-0 right-0 top-[88%] h-px w-full'
    hero.appendChild(sentinel)

    const observer = new IntersectionObserver(
      ([entry]) => setVisible(!entry.isIntersecting),
      { threshold: 0 },
    )
    observer.observe(sentinel)

    return () => {
      observer.disconnect()
      sentinel.remove()
    }
  }, [])

  return (
    <div
      className={cn(
        'pointer-events-none fixed inset-x-0 top-0 z-50 border-b border-ink/10 bg-canvas/92 backdrop-blur-md transition-[transform,opacity] duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]',
        visible
          ? 'pointer-events-auto translate-y-0 opacity-100'
          : '-translate-y-full opacity-0',
      )}
      role="region"
      aria-label="Newsletter"
      aria-hidden={!visible}
    >
      <div className="mx-auto flex max-w-5xl items-center justify-between gap-4 px-5 py-2 sm:px-6">
        <Link
          href="/"
          className="focus-signal shrink-0 transition-opacity duration-200 hover:opacity-80"
        >
          <Image
            src="/rapscout-logo.transparent.png"
            alt="RapScout"
            width={1024}
            height={1024}
            className="h-7 w-auto object-contain object-left sm:h-8"
          />
        </Link>
        <NewsletterCta variant="sticky-action" />
      </div>
    </div>
  )
}
