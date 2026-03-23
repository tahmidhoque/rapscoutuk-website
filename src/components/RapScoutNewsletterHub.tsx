import * as React from 'react'
import { useState } from 'react'

import { Input } from '@/components/ui/input'
import { SocialStrip } from '@/components/SocialStrip'
import { SOCIAL_STRIP_VARIANT } from '@/config/socialStripVariant'
import { cn } from '@/lib/utils'
import {
  stripMailchimpHtml,
  subscribeMailchimpJsonp,
} from '@/lib/mailchimpSubscribe'

const MAILCHIMP_DC = import.meta.env.VITE_MAILCHIMP_DC?.trim()
const MAILCHIMP_U = import.meta.env.VITE_MAILCHIMP_U?.trim()
const MAILCHIMP_AUDIENCE_ID = import.meta.env.VITE_MAILCHIMP_AUDIENCE_ID?.trim()
const MAILCHIMP_F_ID = import.meta.env.VITE_MAILCHIMP_F_ID?.trim()

const mailchimpConfigured = Boolean(
  MAILCHIMP_DC && MAILCHIMP_U && MAILCHIMP_AUDIENCE_ID,
)

const GENERIC_ENDPOINT = import.meta.env.VITE_NEWSLETTER_ENDPOINT?.trim()

const signupConfigured = mailchimpConfigured || Boolean(GENERIC_ENDPOINT)

function isValidEmail(value: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value.trim())
}

export function RapScoutNewsletterHub() {
  const [email, setEmail] = useState('')
  const [touched, setTouched] = useState(false)
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>(
    'idle',
  )
  const [errorMessage, setErrorMessage] = useState('')

  const trimmed = email.trim()
  const showError = touched && trimmed.length > 0 && !isValidEmail(trimmed)
  const canSubmit =
    signupConfigured && isValidEmail(trimmed) && status !== 'loading'

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setTouched(true)
    if (!signupConfigured) return
    if (!isValidEmail(trimmed)) return

    setStatus('loading')
    setErrorMessage('')
    try {
      if (mailchimpConfigured) {
        const data = await subscribeMailchimpJsonp(trimmed, {
          dc: MAILCHIMP_DC!,
          u: MAILCHIMP_U!,
          audienceId: MAILCHIMP_AUDIENCE_ID!,
          fId: MAILCHIMP_F_ID || undefined,
        })
        if (data.result !== 'success') {
          setStatus('error')
          setErrorMessage(
            stripMailchimpHtml(data.msg) ||
              'Could not add this email. Please try again.',
          )
          return
        }
      } else {
        const res = await fetch(GENERIC_ENDPOINT!, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ email: trimmed }),
        })
        if (!res.ok) throw new Error(`Request failed: ${res.status}`)
      }
      setStatus('success')
      setEmail('')
      setTouched(false)
    } catch {
      setStatus('error')
      setErrorMessage('Something went wrong. Try again in a moment.')
    }
  }

  return (
    <section
      className="flex flex-1 flex-col items-center justify-center px-5 py-16"
      aria-label="RapScout mailing list"
    >
      <div className="flex w-full max-w-md flex-col items-center gap-10">
        <img
          src="/rapscout-logo.png"
          alt="RapScout"
          width={1024}
          height={1024}
          className="h-auto w-[min(100%,220px)] object-contain md:w-[min(100%,280px)]"
          decoding="async"
          fetchPriority="high"
        />

        <SocialStrip variant={SOCIAL_STRIP_VARIANT} />

        {status !== 'success' ? (
          <form
            onSubmit={handleSubmit}
            className="w-full space-y-4"
            aria-busy={status === 'loading'}
          >
            {!signupConfigured ? (
              <p className="sr-only">
                Newsletter signup is not configured. Use the social links above.
              </p>
            ) : null}

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
                  disabled={!signupConfigured || status === 'loading'}
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
