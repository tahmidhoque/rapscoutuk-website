'use client'

import * as React from 'react'
import { useEffect, useRef, useState } from 'react'

import { Input } from '@/components/ui/input'
import { isValidEmail } from '@/lib/emailValidation'
import { cn } from '@/lib/utils'

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
      { threshold: 0.2 },
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

  return (
    <section
      ref={ref}
      className="px-5 py-24 sm:py-32"
      aria-label="RapScout mailing list"
    >
      <div
        className={`mx-auto flex w-full max-w-md flex-col items-center gap-8 text-center transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] ${
          visible ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'
        }`}
      >
        {/* Section label */}
        <p className="font-display text-[11px] font-bold tracking-[0.3em] text-signal uppercase">
          Newsletter
        </p>

        <h2 className="font-display text-3xl font-black leading-tight tracking-tight text-ink sm:text-4xl">
          Stay ahead
          <br />
          of the scene.
        </h2>

        {status !== 'success' ? (
          <form
            onSubmit={handleSubmit}
            className="w-full space-y-4"
            aria-busy={status === 'loading'}
          >
            <div className="flex flex-col gap-4 sm:flex-row sm:items-stretch">
              <div className="min-w-0 flex-1">
                <label htmlFor="hub-email" className="sr-only">
                  Email address
                </label>
                <Input
                  id="hub-email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  placeholder="your.email@example.com"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value)
                    if (status === 'error') setStatus('idle')
                  }}
                  onBlur={() => setTouched(true)}
                  disabled={status === 'loading'}
                  aria-invalid={showError}
                  aria-describedby={showError ? 'hub-email-err' : undefined}
                />
                {showError ? (
                  <p
                    id="hub-email-err"
                    role="alert"
                    className="mt-2 text-center text-sm text-signal sm:text-left"
                  >
                    Enter a valid email address.
                  </p>
                ) : null}
              </div>
              <button
                type="submit"
                disabled={!canSubmit}
                className={cn(
                  'h-14 min-w-[10rem] shrink-0 rounded-lg border border-ink/15 bg-signal px-6 font-display text-sm font-bold tracking-wide text-ink uppercase',
                  'disabled:pointer-events-none disabled:opacity-40',
                )}
              >
                {status === 'loading' ? 'Joining…' : 'Join the list'}
              </button>
            </div>

            {status === 'error' ? (
              <p role="alert" className="text-center text-sm text-signal">
                {errorMessage}
              </p>
            ) : null}

            <p className="text-center text-xs text-dim">
              You can unsubscribe at any time.
            </p>
          </form>
        ) : (
          <div className="w-full space-y-6 text-center">
            <p className="font-display text-lg font-bold text-ink">
              You&apos;re on the list.
            </p>
            <button
              type="button"
              onClick={() => setStatus('idle')}
              className="focus-signal font-display text-sm font-bold tracking-wide text-signal uppercase underline-offset-4 hover:opacity-80"
            >
              Add another email
            </button>
          </div>
        )}
      </div>
    </section>
  )
}
