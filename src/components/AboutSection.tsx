'use client'

import { useEffect, useRef, useState } from 'react'

export function AboutSection() {
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
      { threshold: 0.15 },
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  return (
    <section
      ref={ref}
      className="px-5 py-24 sm:py-32"
      aria-label="About RapScout"
    >
      <div className="mx-auto max-w-2xl">
        {/* Section label */}
        <p
          className={`mb-6 font-display text-[11px] font-bold tracking-[0.3em] text-signal uppercase transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] ${
            visible ? 'translate-y-0 opacity-100' : 'translate-y-3 opacity-0'
          }`}
          style={{ transitionDelay: '0ms' }}
        >
          About
        </p>

        {/* Heading */}
        <h2
          className={`mb-8 font-display text-4xl font-black leading-none tracking-tight text-ink sm:text-5xl md:text-6xl transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] ${
            visible ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'
          }`}
          style={{ transitionDelay: '80ms' }}
        >
          Scouting
          <br />
          the next wave.
        </h2>

        {/* Divider */}
        <div
          className={`mb-8 h-px w-12 bg-signal transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] ${
            visible ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'
          }`}
          style={{ transitionDelay: '140ms' }}
          aria-hidden
        />

        {/* Body */}
        <div
          className={`space-y-5 transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] ${
            visible ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'
          }`}
          style={{ transitionDelay: '200ms' }}
        >
          <p className="text-base leading-relaxed text-dim sm:text-lg">
            RapScout is a platform dedicated to discovering and championing emerging
            talent across the UK rap scene. From unsigned artists breaking through on
            council estates to bedroom producers crafting the next underground hit, we
            find the voices you need on your radar before anyone else does.
          </p>
          <p className="text-base leading-relaxed text-dim sm:text-lg">
            Through our scouts, studio sessions, and editorial coverage, we connect
            artists with audiences and give the next generation of UK rap a stage.
          </p>
        </div>
      </div>
    </section>
  )
}
