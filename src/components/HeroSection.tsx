import Image from 'next/image'

import { HeroVideoBackground } from '@/components/HeroVideoBackground'
import { HeroMobileDock } from '@/components/hero/HeroMobileDock'
import { HeroViewfinder } from '@/components/hero/HeroViewfinder'
import { NewsletterCta } from '@/components/newsletter/NewsletterCta'
import { SocialStrip } from '@/components/SocialStrip'
import { siteFeatures } from '@/config/siteFeatures'
import { SOCIAL_STRIP_VARIANT } from '@/config/socialStripVariant'

/**
 * Hero — broadcast editorial over cinematic video.
 *
 * Mobile: centred cover stack in HeroMobileDock (logo, tagline, socials).
 * Desktop: asymmetric lower-third with side metadata rail.
 */
export function HeroSection() {
  return (
    <section
      className="relative flex min-h-dvh flex-col overflow-hidden"
      aria-label="RapScout"
    >
      <HeroVideoBackground />
      <HeroViewfinder />

      {/* ── Mobile portrait layout ── */}
      <HeroMobileDock />

      {/* ── Desktop layout ── */}
      <div className="relative hidden min-h-dvh flex-col md:flex">
        {/* Side metadata rail */}
        <div
          className="pointer-events-none absolute left-7 top-1/2 z-20 -translate-y-1/2 flex-col items-center gap-3 flex"
          aria-hidden
        >
          <div className="h-12 w-px bg-ink/20" />
          <span
            className="font-display text-[8px] font-bold tracking-[0.22em] text-ink/30 uppercase"
            style={{ writingMode: 'vertical-rl', transform: 'rotate(180deg)' }}
          >
            Est.&nbsp;2025&nbsp;&nbsp;/&nbsp;&nbsp;UK&nbsp;&nbsp;/&nbsp;&nbsp;Transmission&nbsp;01
          </span>
          <div className="h-12 w-px bg-ink/20" />
        </div>

        <div
          className="pointer-events-none absolute bottom-8 right-10 z-20"
          aria-hidden
        >
          <span className="font-mono text-[9px] tracking-widest text-ink/25 tabular-nums">
            00:01:43:12
          </span>
        </div>

        <div
          className="pointer-events-none absolute bottom-28 right-8 z-20 flex"
          aria-hidden
        >
          <ScrollIndicator />
        </div>

        <div className="flex-1" aria-hidden />

        <div className="relative z-20 animate-fade-up pl-24 pr-16 pb-2">
          <h1>
            <Image
              src="/rapscout-logo.transparent.png"
              alt="RapScout"
              width={1024}
              height={1024}
              priority
              className="h-auto w-[min(100%,260px)] object-contain object-left drop-shadow-[0_4px_32px_rgba(0,0,0,0.7)]"
            />
          </h1>
        </div>

        <div className="hero-slate pointer-events-none relative z-20 animate-fade-up animate-delay-1">
          <div className="flex flex-wrap items-center justify-between gap-x-4 gap-y-2 py-3 pl-24 pr-10">
            <p className="font-display text-[11px] font-bold tracking-[0.22em] text-ink/65 uppercase">
              Scouting the next wave of UK&nbsp;rap
            </p>
            <div className="pointer-events-auto flex flex-wrap items-center justify-end gap-3 sm:gap-4">
              {siteFeatures.newsletter ? (
                <NewsletterCta variant="hero-pill" />
              ) : null}
              <SocialStrip variant={SOCIAL_STRIP_VARIANT} />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

function ScrollIndicator() {
  return (
    <div className="flex flex-col items-center gap-2">
      <span className="font-display text-[9px] font-bold tracking-[0.2em] text-ink/35 uppercase">
        Scroll
      </span>
      <div className="relative h-8 w-px overflow-hidden bg-ink/10">
        <div
          className="absolute top-0 h-1/2 w-full bg-signal"
          style={{
            animation: 'scroll-line 1.8s cubic-bezier(0.16,1,0.3,1) infinite',
          }}
        />
      </div>
    </div>
  )
}
