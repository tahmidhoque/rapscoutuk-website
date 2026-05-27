'use client'

import * as React from 'react'
import { useEffect, useRef, useState } from 'react'

import { SectionHeader, sectionShellFollowClass } from '@/components/SectionHeader'
import { transmissionCodes } from '@/config/transmission'
import { Input } from '@/components/ui/input'
import { isValidEmail } from '@/lib/emailValidation'
import { cn } from '@/lib/utils'

const perks = [
  {
    label: 'Early signals',
    detail: 'Artists and scenes we’re watching before they break wider.',
  },
  {
    label: 'Curated drops',
    detail: 'Occasional dispatches — no spam, no filler.',
  },
] as const

/**
 * Newsletter — broadcast signup, visually continuous with About.
 *
 * Sits immediately after the About pull-quote (no full-width divider) so
 * “discovery” narrative flows straight into staying on the list.
 */
export function RapScoutNewsletterHub() {
  const [email, setEmail] = useState('')
  const [touched, setTouched] = useState(false)
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>(
    'idle',
  )
  const [errorMessage, setErrorMessage] = useState('')

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

  const trimmed = email.trim()
  const showError = touched && trimmed.length > 0 && !isValidEmail(trimmed)
  const canSubmit = isValidEmail(trimmed) && status !== 'loading'

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setTouched(true)
    if (!isValidEmail(trimmed)) return

    setStatus('loading')
    setErrorMessage('')
    try {
      const res = await fetch('/api/subscribe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: trimmed }),
      })

      if (res.ok) {
        setStatus('success')
        setEmail('')
        setTouched(false)
        return
      }

      let message = 'Something went wrong. Try again in a moment.'
      try {
        const data: unknown = await res.json()
        if (
          data &&
          typeof data === 'object' &&
          'error' in data &&
          typeof (data as { error: unknown }).error === 'string' &&
          (data as { error: string }).error.trim()
        ) {
          message = (data as { error: string }).error.trim()
        }
      } catch {
        /* use default message */
      }
      setStatus('error')
      setErrorMessage(message)
    } catch {
      setStatus('error')
      setErrorMessage('Something went wrong. Try again in a moment.')
    }
  }

  const base =
    'transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)]'
  const hidden = 'translate-y-4 opacity-0'
  const shown = 'translate-y-0 opacity-100'

  return (
    <section
      ref={ref}
      id="newsletter"
      className={`${sectionShellFollowClass} !pt-0`}
      aria-labelledby="newsletter-heading"
    >
      <div className="mx-auto max-w-5xl border-t border-ink/10 pt-10 sm:pt-14">
        <SectionHeader
          label="Newsletter"
          txCode={transmissionCodes.newsletter}
          animateClass={`${base} ${visible ? shown : hidden}`}
          style={{ transitionDelay: '0ms' }}
        />

        <div className="grid gap-10 lg:grid-cols-[2fr_3fr] lg:gap-20">
          {/* Left — display heading + value props */}
          <div>
            <h2
              id="newsletter-heading"
              className={`font-display text-4xl font-black leading-[0.95] tracking-tight text-ink sm:text-5xl lg:text-6xl ${base} ${visible ? shown : hidden}`}
              style={{ transitionDelay: '80ms' }}
            >
              Stay on
              <br />
              the signal.
            </h2>

            <p
              className={`mt-6 max-w-sm text-base leading-relaxed text-dim sm:text-lg ${base} ${visible ? shown : hidden}`}
              style={{ transitionDelay: '140ms' }}
            >
              Join the list for what we&apos;re scouting — artists, scenes, and
              moments worth your attention.
            </p>

            <ul
              className={`mt-8 space-y-0 ${base} ${visible ? shown : hidden}`}
              style={{ transitionDelay: '200ms' }}
              aria-label="What you receive"
            >
              {perks.map(({ label, detail }, i) => (
                <li
                  key={label}
                  className="flex gap-5 border-t border-ink/10 py-5 last:border-b"
                >
                  <span
                    className="mt-0.5 font-display text-xs font-bold tabular-nums text-signal"
                    aria-hidden
                  >
                    0{i + 1}
                  </span>
                  <div>
                    <p className="font-display text-sm font-bold text-ink">
                      {label}
                    </p>
                    <p className="mt-1 text-sm leading-relaxed text-dim">
                      {detail}
                    </p>
                  </div>
                </li>
              ))}
            </ul>
          </div>

          {/* Right — signup panel */}
          <div
            className={`border-t border-ink/10 pt-8 lg:border-t-0 lg:border-l lg:border-ink/10 lg:pl-12 lg:pt-2 ${base} ${visible ? shown : hidden}`}
            style={{ transitionDelay: '260ms' }}
          >
            {status !== 'success' ? (
              <form
                onSubmit={handleSubmit}
                className="space-y-5"
                aria-busy={status === 'loading'}
              >
                <div>
                  <label
                    htmlFor="hub-email"
                    className="mb-3 block font-display text-[11px] font-bold tracking-[0.22em] text-ink/50 uppercase"
                  >
                    Email address
                  </label>
                  <Input
                    id="hub-email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    placeholder="you@example.com"
                    value={email}
                    onChange={(e) => {
                      setEmail(e.target.value)
                      if (status === 'error') setStatus('idle')
                    }}
                    onBlur={() => setTouched(true)}
                    disabled={status === 'loading'}
                    aria-invalid={showError}
                    aria-describedby={
                      showError ? 'hub-email-err' : 'hub-email-hint'
                    }
                  />
                  {showError ? (
                    <p
                      id="hub-email-err"
                      role="alert"
                      className="mt-2 text-sm text-signal"
                    >
                      Enter a valid email address.
                    </p>
                  ) : (
                    <p id="hub-email-hint" className="mt-2 text-xs text-dim">
                      One field. No noise.
                    </p>
                  )}
                </div>

                <button
                  type="submit"
                  disabled={!canSubmit}
                  className={cn(
                    'focus-signal inline-flex h-14 w-full items-center justify-center rounded-lg border border-ink/15 bg-signal px-6 font-display text-sm font-bold tracking-wide text-ink uppercase sm:w-auto sm:min-w-[12rem]',
                    'disabled:pointer-events-none disabled:opacity-40',
                  )}
                >
                  {status === 'loading' ? 'Joining…' : 'Join the list'}
                </button>

                {status === 'error' ? (
                  <p role="alert" className="text-sm text-signal">
                    {errorMessage}
                  </p>
                ) : null}

                <p className="text-xs leading-relaxed text-dim">
                  Unsubscribe any time. We only email when there&apos;s something
                  worth sending.
                </p>
              </form>
            ) : (
              <div className="space-y-6 border-l-2 border-signal pl-6">
                <p className="font-display text-2xl font-black leading-tight tracking-tight text-ink sm:text-3xl">
                  You&apos;re on the list.
                </p>
                <p className="text-sm leading-relaxed text-dim">
                  Watch your inbox — we&apos;ll be in touch when the next
                  transmission goes out.
                </p>
                <button
                  type="button"
                  onClick={() => setStatus('idle')}
                  className="focus-signal font-display text-sm font-bold tracking-wide text-signal uppercase underline-offset-4 transition-opacity duration-200 hover:opacity-70"
                >
                  Add another email
                </button>
              </div>
            )}

            <p
              className={`mt-10 border-t border-ink/10 pt-6 text-sm text-dim ${base} ${visible ? shown : hidden}`}
              style={{ transitionDelay: '320ms' }}
            >
              Submitting music?{' '}
              <a
                href="#submissions"
                className="focus-signal font-display font-bold tracking-wide text-signal uppercase underline-offset-4 transition-opacity duration-200 hover:opacity-70"
              >
                Go to submissions
              </a>
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
