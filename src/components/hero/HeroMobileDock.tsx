import Image from 'next/image'

import { NewsletterCta } from '@/components/newsletter/NewsletterCta'
import { SocialStrip } from '@/components/SocialStrip'
import { siteFeatures } from '@/config/siteFeatures'
import { SOCIAL_STRIP_VARIANT } from '@/config/socialStripVariant'

/**
 * Mobile-only hero footer — magazine cover stack over a single gradient scrim.
 * Logo centred (stacked lockup), tagline + socials below, scroll cue at base.
 */
export function HeroMobileDock() {
  return (
    <div className="pointer-events-none absolute inset-x-0 bottom-0 z-20 md:hidden">
      <div className="hero-mobile-scrim absolute inset-0" aria-hidden />

      <div className="relative flex flex-col items-center gap-5 px-6 pb-[max(1.25rem,env(safe-area-inset-bottom))] pt-16">
        <h1 className="animate-fade-up">
          <Image
            src="/rapscout-logo.transparent.png"
            alt="RapScout"
            width={1024}
            height={1024}
            priority
            className="mx-auto h-auto w-[min(72vw,220px)] object-contain drop-shadow-[0_8px_40px_rgba(0,0,0,0.85)]"
          />
        </h1>

        <p className="animate-fade-up animate-delay-1 max-w-[18rem] text-center font-display text-[10px] font-bold leading-relaxed tracking-[0.2em] text-ink/75 uppercase">
          Scouting the next wave of UK&nbsp;rap
        </p>

        {siteFeatures.newsletter ? (
          <div className="pointer-events-auto animate-fade-up animate-delay-2 flex justify-center">
            <NewsletterCta variant="hero-link" />
          </div>
        ) : null}

        <div
          className={`pointer-events-auto flex justify-center ${siteFeatures.newsletter ? 'animate-fade-up animate-delay-3' : 'animate-fade-up animate-delay-2'}`}
        >
          <SocialStrip variant={SOCIAL_STRIP_VARIANT} />
        </div>

        <div
          className={`pt-1 ${siteFeatures.newsletter ? 'animate-fade-up animate-delay-4' : 'animate-fade-up animate-delay-3'}`}
          aria-hidden
        >
          <MobileScrollCue />
        </div>
      </div>
    </div>
  )
}

function MobileScrollCue() {
  return (
    <div className="flex flex-col items-center gap-1.5">
      <span className="font-display text-[9px] font-bold tracking-[0.22em] text-ink/40 uppercase">
        Scroll
      </span>
      <div className="relative h-7 w-px overflow-hidden bg-ink/15">
        <div
          className="absolute top-0 h-1/2 w-full bg-signal/80"
          style={{
            animation: 'scroll-line 1.8s cubic-bezier(0.16,1,0.3,1) infinite',
          }}
        />
      </div>
    </div>
  )
}
