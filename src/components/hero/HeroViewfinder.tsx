/**
 * Camera viewfinder overlay — hairline inset border with L-shaped corner tick marks.
 * References film-slate / broadcast-monitor crop aesthetics.
 * Purely decorative, pointer-events-none, aria-hidden.
 */
export function HeroViewfinder() {
  return (
    <div
      className="pointer-events-none absolute inset-2 z-20 md:inset-5"
      aria-hidden
    >
      <div className="hero-frame absolute inset-0 opacity-60 md:opacity-100" />

      <div className="absolute left-0 top-0 h-3.5 w-3.5 border-l border-t border-ink/25 md:h-5 md:w-5 md:border-ink/35" />
      <div className="absolute right-0 top-0 h-3.5 w-3.5 border-r border-t border-ink/25 md:h-5 md:w-5 md:border-ink/35" />
      <div className="absolute bottom-0 left-0 h-3.5 w-3.5 border-b border-l border-ink/25 md:h-5 md:w-5 md:border-ink/35" />
      <div className="absolute bottom-0 right-0 h-3.5 w-3.5 border-b border-r border-ink/25 md:h-5 md:w-5 md:border-ink/35" />
    </div>
  )
}
