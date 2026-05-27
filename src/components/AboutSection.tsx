'use client'

import { useEffect, useRef, useState } from 'react'

const UK_REGIONS = [
  'Midlands',
  'North',
  'Manchester',
  'Birmingham',
  'Wales',
  'Liverpool',
  'Sheffield',
  'Nottingham',
] as const

const GLOBAL_REGIONS = ['Ireland', 'France', 'United States'] as const

/**
 * About — broadcast dossier layout.
 *
 * Mobile: single-column linear reveal, staggered fade-up.
 * Desktop: asymmetric two-column grid — display heading + vertical metadata rail
 *          on the left, numbered editorial paragraphs on the right.
 *          Mirrors the hero side rail and TX timecode visual language.
 */
export function AboutSection() {
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
      { threshold: 0.1 },
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  const base = 'transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)]'
  const hidden = 'translate-y-4 opacity-0'
  const shown = 'translate-y-0 opacity-100'

  return (
    <section
      ref={ref}
      id="about"
      className="px-5 py-24 sm:py-32"
      aria-labelledby="about-heading"
    >
      <div className="mx-auto max-w-5xl">
        {/* ── Section header row ── */}
        <div
          className={`mb-8 flex items-center justify-between ${base} ${visible ? shown : hidden}`}
          style={{ transitionDelay: '0ms' }}
        >
          <p className="font-display text-[11px] font-bold tracking-[0.3em] text-signal uppercase">
            About
          </p>
          <span
            className="font-mono text-[9px] tracking-widest text-ink/20 tabular-nums"
            aria-hidden
          >
            TX.02
          </span>
        </div>

        <div
          className={`mb-12 h-px w-12 bg-signal ${base} ${visible ? shown : hidden}`}
          style={{ transitionDelay: '60ms' }}
          aria-hidden
        />

        {/* ── Main editorial grid ── */}
        <div className="grid gap-10 lg:grid-cols-[2fr_3fr] lg:gap-20">
          {/* Left — display heading + vertical metadata rail */}
          <div>
            <h2
              id="about-heading"
              className={`font-display text-5xl font-black leading-[0.9] tracking-tight text-ink sm:text-6xl lg:text-7xl ${base} ${visible ? shown : hidden}`}
              style={{ transitionDelay: '120ms' }}
            >
              Scouting
              <br />
              the next
              <br />
              wave.
            </h2>

            <div
              className={`mt-10 hidden items-center gap-4 lg:flex ${base} ${visible ? shown : hidden}`}
              style={{ transitionDelay: '200ms' }}
              aria-hidden
            >
              <div className="h-px w-6 bg-ink/15" />
              <span
                className="font-display text-[8px] font-bold tracking-[0.22em] text-ink/25 uppercase"
                style={{ writingMode: 'vertical-rl', transform: 'rotate(180deg)' }}
              >
                Est.&nbsp;2025&nbsp;&nbsp;/&nbsp;&nbsp;UK&nbsp;&nbsp;/&nbsp;&nbsp;Talent&nbsp;Discovery
              </span>
              <div className="h-px w-6 bg-ink/15" />
            </div>
          </div>

          {/* Right — numbered editorial paragraphs */}
          <div>
            {/* 01 — Platform */}
            <article
              className={`border-t border-ink/10 py-7 ${base} ${visible ? shown : hidden}`}
              style={{ transitionDelay: '160ms' }}
            >
              <span
                className="mb-4 block font-display text-xs font-bold tabular-nums text-signal"
                aria-hidden
              >
                01
              </span>
              <h3 className="sr-only">Discovering emerging rap talent</h3>
              <p className="text-base leading-relaxed text-dim sm:text-lg">
                Rap Scout is a platform dedicated to discovering and elevating emerging rap
                talent across the UK and beyond.
              </p>
            </article>

            {/* 02 — Regional shift */}
            <article
              className={`border-t border-ink/10 py-7 ${base} ${visible ? shown : hidden}`}
              style={{ transitionDelay: '220ms' }}
            >
              <span
                className="mb-4 block font-display text-xs font-bold tabular-nums text-signal"
                aria-hidden
              >
                02
              </span>
              <h3 className="sr-only">UK rap beyond London</h3>
              <p className="mb-5 text-base leading-relaxed text-dim sm:text-lg">
                In recent years, we&apos;ve seen a shift in where influential music is coming
                from, with scenes in the Midlands, the North, and other regions outside of
                London producing some of the most exciting artists in the country. From
                Detroit-inspired sounds being redefined in Manchester and Birmingham, to
                distinctive movements building in Wales, Liverpool, Sheffield, and Nottingham,
                the landscape has changed. We exist to reflect that change, and to make sure
                talent from every corner is seen and heard.
              </p>
              <div className="flex flex-wrap gap-2" aria-label="UK regions covered">
                {UK_REGIONS.map((region) => (
                  <span
                    key={region}
                    className="border border-ink/15 px-2.5 py-1 font-display text-[9px] font-bold tracking-[0.18em] text-ink/35 uppercase"
                  >
                    {region}
                  </span>
                ))}
              </div>
            </article>

            {/* 03 — A&R focus */}
            <article
              className={`border-t border-ink/10 py-7 ${base} ${visible ? shown : hidden}`}
              style={{ transitionDelay: '280ms' }}
            >
              <span
                className="mb-4 block font-display text-xs font-bold tabular-nums text-signal"
                aria-hidden
              >
                03
              </span>
              <h3 className="sr-only">A&amp;R approach and early artist backing</h3>
              <p className="text-base leading-relaxed text-dim sm:text-lg">
                Our focus isn&apos;t on what&apos;s already established. We&apos;re not here to
                follow consensus or highlight artists who have already broken through. Rap Scout
                is built around instinct, taste, and long-term vision, putting our A&amp;R
                approach at the centre of everything we do. We back artists early, make informed
                calls, and stand by what we believe is next.
              </p>
            </article>

            {/* 04 — Global scope */}
            <article
              className={`border-t border-ink/10 py-7 ${base} ${visible ? shown : hidden}`}
              style={{ transitionDelay: '340ms' }}
            >
              <span
                className="mb-4 block font-display text-xs font-bold tabular-nums text-signal"
                aria-hidden
              >
                04
              </span>
              <h3 className="sr-only">Global emerging rap talent</h3>
              <p className="mb-5 text-base leading-relaxed text-dim sm:text-lg">
                While our foundation is in the UK, our scope is global. Emerging talent is no
                longer confined by geography, and we&apos;re seeing artists develop and break out
                across Ireland, France, and the United States. Rap Scout is positioned to identify
                and support that talent wherever it appears.
              </p>
              <div className="flex flex-wrap gap-2" aria-label="International regions covered">
                {GLOBAL_REGIONS.map((region) => (
                  <span
                    key={region}
                    className="border border-ink/15 px-2.5 py-1 font-display text-[9px] font-bold tracking-[0.18em] text-ink/35 uppercase"
                  >
                    {region}
                  </span>
                ))}
              </div>
            </article>
          </div>
        </div>

        {/* ── Closing statement — broadcast pull-quote ── */}
        <blockquote
          className={`mt-12 border-t border-ink/10 pt-10 ${base} ${visible ? shown : hidden}`}
          style={{ transitionDelay: '400ms' }}
        >
          <p className="border-l-2 border-signal pl-6 font-display text-3xl font-black leading-tight tracking-tight text-ink sm:text-4xl md:text-5xl">
            This is about discovery.
          </p>
        </blockquote>
      </div>
    </section>
  )
}
