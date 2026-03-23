import { useState, type ComponentType } from 'react'

import { cn } from '@/lib/utils'

import { SOCIAL_LINKS } from '../config/links'
import type { SocialStripVariant } from '../config/socialStripVariant'

function IconYouTube({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path d="M23.5 6.2a3 3 0 0 0-2.1-2.1C19.5 3.5 12 3.5 12 3.5s-7.5 0-9.4.6A3 3 0 0 0 .5 6.2 31.5 31.5 0 0 0 0 12a31.5 31.5 0 0 0 .5 5.8 3 3 0 0 0 2.1 2.1c1.9.6 9.4.6 9.4.6s7.5 0 9.4-.6a3 3 0 0 0 2.1-2.1 31.5 31.5 0 0 0 .5-5.8 31.5 31.5 0 0 0-.5-5.8ZM9.75 15.57V8.43L15.5 12l-5.75 3.57Z" />
    </svg>
  )
}

function IconInstagram({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 1 0 0 12.324 6.162 6.162 0 0 0 0-12.324zM12 16a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm6.406-11.845a1.44 1.44 0 1 1-2.88 0 1.44 1.44 0 0 1 2.88 0z" />
    </svg>
  )
}

/** TikTok wordmark/glyph (Simple Icons geometry, single-colour for `currentColor`) */
function IconTikTok({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.15 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07z" />
    </svg>
  )
}

export type SocialItem = {
  href: string
  label: string
  shortName: string
  Icon: ComponentType<{ className?: string }>
}

const baseItems: SocialItem[] = [
  {
    href: SOCIAL_LINKS.youtube,
    label: 'RapScout on YouTube',
    shortName: 'YouTube',
    Icon: IconYouTube,
  },
  {
    href: SOCIAL_LINKS.instagram,
    label: 'RapScout on Instagram',
    shortName: 'Instagram',
    Icon: IconInstagram,
  },
  {
    href: SOCIAL_LINKS.tiktok,
    label: 'RapScout on TikTok',
    shortName: 'TikTok',
    Icon: IconTikTok,
  },
]

/** Linktree order: Instagram → TikTok → YouTube */
const linktreeOrder: SocialItem[] = [baseItems[1], baseItems[2], baseItems[0]]

function rowForVariant(variant: SocialStripVariant): SocialItem[] {
  if (variant === 'default') return baseItems
  return linktreeOrder
}

/** 21st.dev–inspired docked tray: grouped bar, hover lift, tooltip, underline nub */
function DockedTrayRow({
  items,
  className,
}: {
  items: SocialItem[]
  className?: string
}) {
  const [hovered, setHovered] = useState<number | null>(null)

  return (
    <div
      className={cn(
        'relative flex items-center gap-0.5 rounded-2xl border border-ink/10 bg-canvas px-1.5 py-1.5 shadow-[inset_0_1px_0_rgba(255,255,255,0.06)]',
        className,
      )}
    >
      <div
        className="pointer-events-none absolute inset-0 rounded-2xl bg-gradient-to-b from-ink/[0.05] to-transparent"
        aria-hidden
      />
      <ul className="relative z-[1] flex items-center gap-0.5">
        {items.map((social, index) => {
          const { href, label, shortName, Icon } = social
          const active = hovered === index
          return (
            <li key={href}>
              <a
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                className="group relative flex size-10 items-center justify-center rounded-xl transition-colors duration-200"
                onMouseEnter={() => setHovered(index)}
                onMouseLeave={() => setHovered(null)}
                onFocus={() => setHovered(index)}
                onBlur={() => setHovered(null)}
                aria-label={label}
              >
                <span
                  className={cn(
                    'absolute inset-1 scale-90 rounded-lg bg-ink/10 opacity-0 transition-all duration-300 ease-out',
                    active && 'scale-100 opacity-100',
                  )}
                  aria-hidden
                />
                <span
                  className={cn(
                    'relative z-10 transition-all duration-300 ease-out',
                    active ? 'scale-110 text-ink' : 'text-dim',
                  )}
                >
                  <Icon className="size-[18px]" />
                </span>
                <span
                  className={cn(
                    'absolute bottom-1.5 left-1/2 h-0.5 -translate-x-1/2 rounded-full bg-ink transition-all duration-300 ease-out',
                    active ? 'w-3 opacity-100' : 'w-0 opacity-0',
                  )}
                  aria-hidden
                />
                <span
                  className={cn(
                    'pointer-events-none absolute -top-10 left-1/2 z-20 -translate-x-1/2 rounded-lg bg-ink px-2.5 py-1 font-display text-[11px] font-semibold whitespace-nowrap text-canvas transition-all duration-300 ease-out',
                    active ? 'translate-y-0 opacity-100' : 'translate-y-1 opacity-0',
                  )}
                  aria-hidden
                >
                  {shortName}
                  <span
                    className="absolute -bottom-1 left-1/2 size-2 -translate-x-1/2 rotate-45 bg-ink"
                    aria-hidden
                  />
                </span>
              </a>
            </li>
          )
        })}
      </ul>
    </div>
  )
}

export function SocialStrip({
  className,
  variant = 'linktree',
}: {
  className?: string
  variant?: SocialStripVariant
}) {
  const row = rowForVariant(variant)

  if (variant === 'dockedTray') {
    return (
      <nav
        className={cn('flex justify-center', className)}
        aria-label="RapScout on social media"
      >
        <DockedTrayRow items={row} />
      </nav>
    )
  }

  if (variant === 'outline') {
    return (
      <nav
        className={cn(
          'flex flex-wrap items-center justify-center gap-3 sm:gap-4',
          className,
        )}
        aria-label="RapScout on social media"
      >
        <ul className="flex flex-wrap items-center justify-center gap-3 sm:gap-4">
          {row.map(({ href, label, Icon }) => (
            <li key={href}>
              <a
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={label}
                className="focus-signal flex h-11 w-11 items-center justify-center rounded-lg border border-ink/20 bg-transparent text-dim transition-[transform,colors] duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] hover:-translate-y-0.5 hover:border-signal/60 hover:bg-signal/10 hover:text-ink sm:h-12 sm:w-12"
              >
                <Icon className="h-5 w-5 sm:h-[22px] sm:w-[22px]" />
              </a>
            </li>
          ))}
        </ul>
      </nav>
    )
  }

  if (variant === 'signalRing') {
    return (
      <nav
        className={cn(
          'flex flex-wrap items-center justify-center gap-3 sm:gap-5',
          className,
        )}
        aria-label="RapScout on social media"
      >
        <ul className="flex flex-wrap items-center justify-center gap-3 sm:gap-5">
          {row.map(({ href, label, Icon }) => (
            <li key={href}>
              <a
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={label}
                className="focus-signal flex h-12 w-12 items-center justify-center rounded-full border-2 border-signal/45 text-ink transition-[transform,box-shadow,background-color] duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] hover:-translate-y-0.5 hover:border-signal hover:bg-signal/15 hover:shadow-[0_0_24px_rgba(196,30,36,0.25)] sm:h-14 sm:w-14"
              >
                <Icon className="h-6 w-6" />
              </a>
            </li>
          ))}
        </ul>
      </nav>
    )
  }

  return (
    <nav
      className={cn(
        variant === 'linktree' &&
          'flex flex-wrap items-center justify-center gap-2 sm:gap-12 md:gap-16',
        variant === 'default' &&
          'animate-fade-up animate-delay-2 flex flex-wrap items-center gap-3 border-t border-dim/40 pt-8',
        className,
      )}
      aria-label="RapScout on social media"
    >
      {variant === 'default' && (
        <span className="font-display w-full text-xs font-bold tracking-[0.2em] text-dim uppercase sm:w-auto sm:pe-4">
          Watch
        </span>
      )}
      <ul
        className={cn(
          'flex flex-wrap items-center',
          variant === 'linktree'
            ? 'justify-center gap-2 sm:gap-12 md:gap-16'
            : 'gap-3',
        )}
      >
        {row.map(({ href, label, Icon }) => (
          <li key={href}>
            <a
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={label}
              className={cn(
                'focus-signal flex items-center justify-center text-ink transition-[transform,color,opacity] duration-300 ease-[cubic-bezier(0.16,1,0.3,1)]',
                variant === 'linktree' &&
                  'min-h-11 min-w-11 rounded-full hover:-translate-y-0.5 hover:text-signal sm:min-h-12 sm:min-w-12',
                variant === 'default' &&
                  'group h-14 w-14 rounded-full border border-ink/25 hover:-translate-y-0.5 hover:border-signal hover:text-signal',
              )}
            >
              <Icon
                className={cn(
                  variant === 'linktree' ? 'h-7 w-7 sm:h-8 sm:w-8' : 'h-6 w-6',
                )}
              />
            </a>
          </li>
        ))}
      </ul>
    </nav>
  )
}
