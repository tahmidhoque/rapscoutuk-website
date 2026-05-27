import type { CSSProperties } from 'react'

import { cn } from '@/lib/utils'

type SectionHeaderProps = {
  label: string
  txCode: string
  className?: string
  align?: 'left' | 'center'
  /** Optional reveal animation classes (client sections). */
  animateClass?: string
  style?: CSSProperties
}

/**
 * Broadcast section masthead — label + TX code + signal rule.
 * Shared across About, Newsletter, Submissions for visual uniformity.
 */
export function SectionHeader({
  label,
  txCode,
  className,
  align = 'left',
  animateClass,
  style,
}: SectionHeaderProps) {
  const centred = align === 'center'

  return (
    <header className={cn(centred && 'text-center', className)}>
      <div
        className={cn(
          'mb-6 flex items-center sm:mb-7',
          centred ? 'justify-center gap-6' : 'justify-between',
          animateClass,
        )}
        style={style}
      >
        <p className="font-display text-[11px] font-bold tracking-[0.3em] text-signal uppercase">
          {label}
        </p>
        <span
          className="font-mono text-[9px] tracking-widest text-ink/20 tabular-nums"
          aria-hidden
        >
          {txCode}
        </span>
      </div>
      <div
        className={cn(
          'mb-8 h-px w-12 bg-signal sm:mb-10',
          centred && 'mx-auto',
          animateClass,
        )}
        style={style}
        aria-hidden
      />
    </header>
  )
}

/** Consistent horizontal padding + vertical rhythm (tighter on mobile). */
export const sectionShellClass =
  'px-5 pt-14 pb-12 sm:pt-20 sm:pb-16 lg:pt-28 lg:pb-24'

/** Reduced top padding when following another content section. */
export const sectionShellFollowClass =
  'px-5 pt-10 pb-14 sm:pt-14 sm:pb-20 lg:pt-24 lg:pb-28'
