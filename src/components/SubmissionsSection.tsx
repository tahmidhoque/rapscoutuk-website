'use client'

import { useEffect, useRef, useState } from 'react'

import { SectionHeader, sectionShellFollowClass } from '@/components/SectionHeader'
import { SOCIAL_LINKS } from '@/config/links'
import { siteFeatures } from '@/config/siteFeatures'
import { transmissionCodes } from '@/config/transmission'
import { cn } from '@/lib/utils'

const INSTAGRAM_HANDLE = `@${new URL(SOCIAL_LINKS.instagram).pathname.replace(/^\//, '').replace(/\/$/, '')}`

const guidelines = [
  {
    label: 'Links only',
    detail: 'Send YouTube or SoundCloud links — no attachments.',
  },
  {
    label: 'Include your socials',
    detail: 'Add links to your active social media profiles.',
  },
  {
    label: 'Keep it concise',
    detail: 'Make sure your best work is easy to access.',
  },
]

export function SubmissionsSection() {
  const ref = useRef<HTMLElement>(null)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true)
          observer.disconnect()
        }
      },
      { threshold: 0.12 },
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  const base =
    'transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)]'
  const hidden = 'translate-y-4 opacity-0'
  const shown = 'translate-y-0 opacity-100'

  return (
    <section
      ref={ref}
      id="submissions"
      className={cn(
        sectionShellFollowClass,
        siteFeatures.newsletter && '!pt-0',
      )}
      aria-label="Music submissions"
    >
      <div
        className={cn(
          'mx-auto',
          siteFeatures.newsletter
            ? 'max-w-5xl border-t border-ink/10 pt-10 sm:pt-14'
            : 'max-w-2xl',
        )}
      >
        <div className={siteFeatures.newsletter ? 'max-w-2xl' : undefined}>
        <SectionHeader
          label="Submissions"
          txCode={transmissionCodes.submissions}
          animateClass={`${base} ${visible ? shown : hidden}`}
          style={{ transitionDelay: '0ms' }}
        />

        <h2
          className={`mb-8 font-display text-4xl font-black leading-none tracking-tight text-ink sm:text-5xl md:text-6xl ${base} ${visible ? shown : hidden}`}
          style={{ transitionDelay: '80ms' }}
        >
          Submit your
          <br />
          music.
        </h2>

        {/* Intro copy */}
        <div
          className={`mb-10 space-y-5 ${base} ${visible ? shown : hidden}`}
          style={{ transitionDelay: '200ms' }}
        >
          <p className="text-base leading-relaxed text-dim sm:text-lg">
            We&apos;re always on the lookout for exceptional new talent, and over the years
            some of the best music we&apos;ve discovered has come directly from artists
            themselves.
          </p>
          <p className="text-base leading-relaxed text-dim sm:text-lg">
            If you&apos;d like to be considered, reach out on Instagram with your links
            and we&apos;ll take a look.
          </p>
        </div>

        {/* Guidelines */}
        <ol
          className={`mb-10 space-y-0 ${base} ${visible ? shown : hidden}`}
          style={{ transitionDelay: '260ms' }}
          aria-label="Submission guidelines"
        >
          {guidelines.map(({ label, detail }, i) => (
            <li key={label} className="flex gap-5 border-t border-ink/10 py-5 last:border-b">
              <span
                className="mt-0.5 font-display text-xs font-bold tabular-nums text-signal"
                aria-hidden
              >
                0{i + 1}
              </span>
              <div>
                <p className="font-display text-sm font-bold text-ink">{label}</p>
                <p className="mt-1 text-sm leading-relaxed text-dim">{detail}</p>
              </div>
            </li>
          ))}
        </ol>

        {/* CTA */}
        <div
          className={`${base} ${visible ? shown : hidden}`}
          style={{ transitionDelay: '340ms' }}
        >
          <a
            href={SOCIAL_LINKS.instagram}
            target="_blank"
            rel="noopener noreferrer"
            className="focus-signal inline-flex items-center gap-2 font-display text-sm font-bold tracking-wide text-signal uppercase underline-offset-4 transition-opacity duration-200 hover:opacity-70"
          >
            {INSTAGRAM_HANDLE}
            <span className="sr-only"> (opens in a new tab)</span>
            <svg
              viewBox="0 0 16 16"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              className="h-4 w-4"
              aria-hidden
            >
              <path
                d="M3 8h10M9 4l4 4-4 4"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </a>
          <p className="mt-4 text-xs text-dim">
            Send a DM with your best links. Due to volume, not every message gets a
            reply — but everything is reviewed and appreciated.
          </p>
        </div>
        </div>
      </div>
    </section>
  )
}
