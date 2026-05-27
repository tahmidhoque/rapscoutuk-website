import { newsletterCopy } from '@/config/newsletterCopy'
import { cn } from '@/lib/utils'

const href = '#newsletter'

type NewsletterCtaVariant = 'hero-pill' | 'hero-link' | 'sticky-action'

type NewsletterCtaProps = {
  variant: NewsletterCtaVariant
  className?: string
}

/**
 * In-page anchor to the newsletter section — shared copy and styling.
 */
export function NewsletterCta({ variant, className }: NewsletterCtaProps) {
  if (variant === 'hero-link') {
    return (
      <a
        href={href}
        className={cn(
          'focus-signal group inline-flex items-center gap-2 font-display text-[10px] font-bold tracking-[0.2em] text-ink/80 uppercase transition-colors duration-200 hover:text-signal',
          className,
        )}
      >
        <BroadcastDot />
        {newsletterCopy.cta}
        <span
          className="text-ink/35 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:text-signal/80"
          aria-hidden
        >
          →
        </span>
      </a>
    )
  }

  if (variant === 'sticky-action') {
    return (
      <a
        href={href}
        className={cn(
          'focus-signal inline-flex items-center gap-2 rounded-md border border-ink/15 bg-signal px-4 py-2 font-display text-[11px] font-bold tracking-[0.14em] text-ink uppercase transition-opacity duration-200 hover:opacity-90',
          className,
        )}
      >
        {newsletterCopy.submit}
        <span aria-hidden>→</span>
      </a>
    )
  }

  return (
    <a
      href={href}
      className={cn(
        'focus-signal group inline-flex shrink-0 items-center gap-2.5 rounded-full border border-ink/15 bg-ink/5 px-4 py-2 font-display text-[10px] font-bold tracking-[0.18em] text-ink/85 uppercase backdrop-blur-sm transition-colors duration-200 hover:border-signal/40 hover:bg-ink/10 hover:text-ink',
        className,
      )}
    >
      <BroadcastDot />
      {newsletterCopy.cta}
    </a>
  )
}

function BroadcastDot() {
  return (
    <span className="relative flex h-2 w-2 shrink-0" aria-hidden>
      <span className="absolute inset-0 animate-ping rounded-full bg-signal opacity-40" />
      <span className="relative h-2 w-2 rounded-full bg-signal" />
    </span>
  )
}
