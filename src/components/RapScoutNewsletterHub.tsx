import * as React from 'react'
import { useState, type CSSProperties } from 'react'
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import { Send } from 'lucide-react'

import { Input } from '@/components/ui/input'
import { SocialStrip } from '@/components/SocialStrip'
import { SOCIAL_STRIP_VARIANT } from '@/config/socialStripVariant'
import { cn } from '@/lib/utils'

/**
 * Set VITE_NEWSLETTER_ENDPOINT for live signups. POST JSON { "email": "..." }.
 * Adjust fetch in submit handler for Formspree / Mailchimp if needed.
 */
const ENDPOINT = import.meta.env.VITE_NEWSLETTER_ENDPOINT

function isValidEmail(value: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value.trim())
}

/* —— ShimmerButton (from 21st.dev, tuned to RapScout signal red) —— */

interface ShimmerButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  shimmerColor?: string
  shimmerSize?: string
  borderRadius?: string
  shimmerDuration?: string
  background?: string
}

const ShimmerButton = React.forwardRef<HTMLButtonElement, ShimmerButtonProps>(
  (
    {
      shimmerColor = 'rgba(255, 255, 255, 0.35)',
      shimmerSize = '0.05em',
      shimmerDuration = '3s',
      borderRadius = '10px',
      background = 'rgb(196, 30, 36)',
      className,
      children,
      disabled,
      ...props
    },
    ref,
  ) => {
    const reduceMotion = useReducedMotion()
    const showShimmer = !disabled && !reduceMotion

    return (
      <button
        style={
          {
            '--spread': '90deg',
            '--shimmer-color': shimmerColor,
            '--radius': borderRadius,
            '--speed': shimmerDuration,
            '--cut': shimmerSize,
            '--bg': background,
          } as CSSProperties
        }
        className={cn(
          'group relative z-0 flex cursor-pointer items-center justify-center overflow-hidden whitespace-nowrap border border-ink/15 px-8 text-ink [background:var(--bg)] [border-radius:var(--radius)]',
          'transform-gpu transition-transform duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] active:translate-y-px',
          disabled && 'pointer-events-none opacity-40',
          className,
        )}
        ref={ref}
        disabled={disabled}
        {...props}
      >
        <style>{`
          @keyframes rs-shimmer-slide {
            to { transform: translate(calc(100cqw - 100%), 0); }
          }
          @keyframes rs-spin-around {
            0% { transform: translateZ(0) rotate(0); }
            15%, 35% { transform: translateZ(0) rotate(90deg); }
            65%, 85% { transform: translateZ(0) rotate(270deg); }
            100% { transform: translateZ(0) rotate(360deg); }
          }
        `}</style>
        <div
          className={cn(
            '-z-30 blur-[2px]',
            'absolute inset-0 overflow-visible [container-type:size]',
            !showShimmer && 'hidden',
          )}
        >
          <div className="absolute inset-0 h-[100cqh] [aspect-ratio:1] animate-[rs-shimmer-slide_var(--speed)_ease-in-out_infinite_alternate] [border-radius:0] [mask:none]">
            <div className="absolute -inset-full w-auto rotate-0 animate-[rs-spin-around_calc(var(--speed)*2)_linear_infinite] [background:conic-gradient(from_calc(270deg-(var(--spread)*0.5)),transparent_0,var(--shimmer-color)_var(--spread),transparent_var(--spread))] [translate:0_0]" />
          </div>
        </div>
        <span className="relative z-10 flex items-center gap-2 font-display text-lg font-black tracking-wide uppercase">
          {children}
        </span>
        <div
          className={cn(
            'pointer-events-none absolute inset-0 rounded-[10px] shadow-[inset_0_-8px_10px_rgba(255,255,255,0.12)] transition-[box-shadow] duration-300',
            'group-hover:shadow-[inset_0_-6px_10px_rgba(255,255,255,0.2)]',
            'group-active:shadow-[inset_0_-10px_10px_rgba(255,255,255,0.18)]',
          )}
        />
        <div className="absolute -z-20 [background:var(--bg)] [border-radius:var(--radius)] [inset:var(--cut)]" />
      </button>
    )
  },
)
ShimmerButton.displayName = 'ShimmerButton'

/* —— TextShimmer (brand-tinted: ink ↔ signal, not generic neon) —— */

interface TextShimmerProps {
  children: string
  className?: string
  duration?: number
  spread?: number
}

function TextShimmer({ children, className, duration = 2.8, spread = 2 }: TextShimmerProps) {
  const reduceMotion = useReducedMotion()
  const dynamicSpread = React.useMemo(
    () => children.length * spread,
    [children, spread],
  )

  if (reduceMotion) {
    return (
      <h2
        className={cn(
          'font-display text-[clamp(2rem,8vw,3.75rem)] font-black tracking-tight text-ink uppercase',
          className,
        )}
      >
        {children}
      </h2>
    )
  }

  return (
    <motion.h2
      className={cn(
        'relative inline-block bg-[length:250%_100%,auto] bg-clip-text font-display text-[clamp(2rem,8vw,3.75rem)] font-black tracking-tight text-transparent uppercase',
        '[--base-color:#ffffff] [--base-gradient-color:#c41e24]',
        '[--bg:linear-gradient(90deg,#0000_calc(50%-var(--spread)),var(--base-gradient-color),#0000_calc(50%+var(--spread)))] [background-repeat:no-repeat,padding-box]',
        className,
      )}
      initial={{ backgroundPosition: '100% center' }}
      animate={{ backgroundPosition: '0% center' }}
      transition={{ repeat: Infinity, duration, ease: 'linear' }}
      style={
        {
          '--spread': `${dynamicSpread}px`,
          backgroundImage:
            'var(--bg), linear-gradient(var(--base-color), var(--base-color))',
        } as CSSProperties
      }
    >
      {children}
    </motion.h2>
  )
}

/* —— Main hub —— */

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
    Boolean(ENDPOINT) && isValidEmail(trimmed) && status !== 'loading'

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setTouched(true)
    if (!ENDPOINT) return
    if (!isValidEmail(trimmed)) return

    setStatus('loading')
    setErrorMessage('')
    try {
      const res = await fetch(ENDPOINT, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: trimmed }),
      })
      if (!res.ok) throw new Error(`Request failed: ${res.status}`)
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
      className="relative overflow-hidden bg-canvas px-5 pt-12 pb-16 md:pt-16 md:pb-24"
      aria-label="RapScout mailing list and updates"
    >
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.07]"
        aria-hidden
      >
        <div
          className="absolute inset-0 bg-[linear-gradient(to_right,#c41e24_1px,transparent_1px),linear-gradient(to_bottom,#c41e24_1px,transparent_1px)] bg-[size:4rem_4rem]"
        />
      </div>
      <div
        className="pointer-events-none absolute inset-0 bg-gradient-to-b from-canvas via-transparent to-canvas"
        aria-hidden
      />

      <div className="relative mx-auto max-w-4xl">
        <header className="mb-12 text-center md:mb-16">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
            className="flex justify-center"
          >
            <img
              src="/rapscout-logo.png"
              alt="RapScout"
              width={280}
              height={120}
              className="h-auto w-[min(100%,200px)] object-contain drop-shadow-[0_0_40px_rgba(196,30,36,0.35)] md:w-[min(100%,240px)]"
              decoding="async"
              fetchPriority="high"
            />
          </motion.div>
          <motion.h1
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.06, ease: [0.16, 1, 0.3, 1] }}
            className="font-display mt-6 text-[clamp(1.75rem,5vw,2.5rem)] font-black tracking-tight text-ink"
          >
            Rap Scout
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            className="mx-auto mt-3 max-w-md text-pretty text-[clamp(0.95rem,2.5vw,1.1rem)] leading-relaxed text-dim"
          >
            Always ahead of the curve, finding artists before the hype.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.14, ease: [0.16, 1, 0.3, 1] }}
            className="mt-8 flex justify-center"
          >
            <SocialStrip variant={SOCIAL_STRIP_VARIANT} />
          </motion.div>
        </header>

        <AnimatePresence mode="wait">
          {status !== 'success' ? (
            <motion.div
              key="form"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -16 }}
              transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
              className="space-y-10"
            >
              <div className="space-y-5 text-center">
                <div className="flex flex-col items-center gap-2">
                  <p className="font-display text-xs font-bold tracking-[0.35em] text-signal uppercase">
                    UK rap · talent scouts
                  </p>
                  <TextShimmer duration={3.2} spread={2.5}>
                    STAY IN THE LOOP
                  </TextShimmer>
                </div>
                <p className="mx-auto max-w-2xl text-pretty text-lg text-dim md:text-xl">
                  City runs, studio sessions, and artists we’re filming before they
                  blow—straight to your inbox.
                </p>
              </div>

              {!ENDPOINT && (
                <p
                  className="rounded-lg border border-ink/20 bg-ink/[0.05] px-4 py-3 text-center text-sm text-dim"
                  role="status"
                >
                  List signup is being connected. Tap the icons at the top for
                  now—we’ll enable this field as soon as the list is wired.
                </p>
              )}

              <form
                onSubmit={handleSubmit}
                className="mx-auto max-w-2xl space-y-4"
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
                      disabled={!ENDPOINT || status === 'loading'}
                      aria-invalid={showError}
                      aria-describedby={showError ? 'hub-email-err' : undefined}
                    />
                    <AnimatePresence>
                      {showError && (
                        <motion.p
                          id="hub-email-err"
                          role="alert"
                          initial={{ opacity: 0, y: -6 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -6 }}
                          className="mt-2 text-center text-sm text-signal sm:text-left"
                        >
                          Enter a valid email address.
                        </motion.p>
                      )}
                    </AnimatePresence>
                  </div>
                  <ShimmerButton
                    type="submit"
                    disabled={!canSubmit}
                    className="h-14 min-w-[11rem] sm:shrink-0"
                  >
                    <Send className="h-5 w-5" aria-hidden />
                    {status === 'loading' ? 'Joining…' : 'Join the list'}
                  </ShimmerButton>
                </div>

                <AnimatePresence>
                  {status === 'error' && (
                    <motion.p
                      role="alert"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="text-center text-sm text-signal"
                    >
                      {errorMessage}
                    </motion.p>
                  )}
                </AnimatePresence>

                <p className="text-center text-xs text-dim/90">
                  We respect your privacy. Unsubscribe any time once the list is live.
                </p>
              </form>
            </motion.div>
          ) : (
            <motion.div
              key="success"
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
              className="py-8 text-center"
            >
              <motion.div
                initial={{ opacity: 0, scale: 0.88 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.08, duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
                className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-signal shadow-[inset_0_-8px_16px_rgba(0,0,0,0.2)]"
              >
                <Send className="h-9 w-9 text-ink" aria-hidden />
              </motion.div>
              <h2 className="font-display text-3xl font-black tracking-tight text-ink uppercase md:text-4xl">
                You’re in
              </h2>
              <p className="mx-auto mt-4 max-w-md text-dim md:text-lg">
                Watch your inbox for confirmations and the next scout drop.
              </p>
              <button
                type="button"
                onClick={() => setStatus('idle')}
                className="focus-signal mt-10 font-display text-sm font-bold tracking-wide text-signal uppercase underline-offset-4 transition-opacity hover:opacity-80"
              >
                Add another email
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  )
}
