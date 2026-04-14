import Image from 'next/image'

import { SocialStrip } from '@/components/SocialStrip'
import { SOCIAL_STRIP_VARIANT } from '@/config/socialStripVariant'

export function HeroSection() {
  return (
    <section
      className="relative flex min-h-dvh flex-col items-center justify-center px-5 py-16"
      aria-label="RapScout"
    >
      <div className="flex w-full max-w-md animate-fade-up flex-col items-center gap-8">
        <Image
          src="/rapscout-logo.png"
          alt="RapScout"
          width={1024}
          height={1024}
          className="h-auto w-[min(100%,220px)] object-contain md:w-[min(100%,280px)]"
          priority
        />

        <div className="animate-fade-up animate-delay-1 text-center">
          <h1 className="font-display text-xs font-bold tracking-[0.25em] text-dim uppercase">
            Scouting the next wave of UK rap
          </h1>
        </div>

        <div className="animate-fade-up animate-delay-2">
          <SocialStrip variant={SOCIAL_STRIP_VARIANT} />
        </div>
      </div>

      {/* Scroll indicator */}
      <div
        className="animate-fade-up animate-delay-3 absolute bottom-8 left-1/2 -translate-x-1/2"
        aria-hidden
      >
        <ScrollIndicator />
      </div>
    </section>
  )
}

function ScrollIndicator() {
  return (
    <div className="flex flex-col items-center gap-2">
      <span className="font-display text-[10px] font-bold tracking-[0.2em] text-dim/50 uppercase">
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
