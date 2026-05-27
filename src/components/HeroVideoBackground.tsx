'use client'

import { useCallback, useEffect, useRef, useState, useSyncExternalStore } from 'react'

import { heroMediaQueries, heroVideo } from '@/config/heroVideo'

function subscribeReducedMotion(onStoreChange: () => void) {
  const mq = window.matchMedia('(prefers-reduced-motion: reduce)')
  mq.addEventListener('change', onStoreChange)
  return () => mq.removeEventListener('change', onStoreChange)
}

function getReducedMotion() {
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches
}

function subscribeSaveData(onStoreChange: () => void) {
  const connection = (
    navigator as Navigator & { connection?: EventTarget & { saveData?: boolean } }
  ).connection
  if (!connection || !('addEventListener' in connection)) {
    return () => undefined
  }
  connection.addEventListener('change', onStoreChange)
  return () => connection.removeEventListener('change', onStoreChange)
}

function getSaveData() {
  const connection = (
    navigator as Navigator & { connection?: { saveData?: boolean } }
  ).connection
  return Boolean(connection?.saveData)
}

function scheduleIdle(callback: () => void): () => void {
  if (typeof window.requestIdleCallback === 'function') {
    const id = window.requestIdleCallback(callback, { timeout: 2000 })
    return () => window.cancelIdleCallback(id)
  }
  const id = window.setTimeout(callback, 400)
  return () => window.clearTimeout(id)
}

export function HeroVideoBackground() {
  const videoRef = useRef<HTMLVideoElement>(null)
  const [videoReady, setVideoReady] = useState(false)
  const reducedMotion = useSyncExternalStore(subscribeReducedMotion, getReducedMotion, () => false)
  const saveData = useSyncExternalStore(subscribeSaveData, getSaveData, () => false)
  const shouldPlayVideo = !reducedMotion && !saveData

  const onCanPlay = useCallback(() => {
    setVideoReady(true)
    const video = videoRef.current
    if (!video) return
    void video.play().catch(() => {
      /* Autoplay blocked — poster remains visible */
    })
  }, [])

  useEffect(() => {
    if (!shouldPlayVideo) return

    const cancelIdle = scheduleIdle(() => {
      const video = videoRef.current
      if (!video) return
      video.load()
    })

    return cancelIdle
  }, [shouldPlayVideo])

  return (
    <div className="pointer-events-none absolute inset-0 z-0 overflow-hidden" aria-hidden>
      {/* LCP poster — always painted first */}
      <picture className="absolute inset-0">
        <source
          media={heroMediaQueries.landscape}
          srcSet={heroVideo.landscape.poster.avif}
          type="image/avif"
        />
        <source
          media={heroMediaQueries.portrait}
          srcSet={heroVideo.portrait.poster.avif}
          type="image/avif"
        />
        <source
          media={heroMediaQueries.landscape}
          srcSet={heroVideo.landscape.poster.jpg}
          type="image/jpeg"
        />
        <source
          media={heroMediaQueries.portrait}
          srcSet={heroVideo.portrait.poster.jpg}
          type="image/jpeg"
        />
        <img
          src={heroVideo.portrait.poster.jpg}
          alt=""
          fetchPriority="high"
          decoding="async"
          className="h-full w-full object-cover"
        />
      </picture>

      {shouldPlayVideo ? (
        <video
          ref={videoRef}
          className={`hero-video-fade absolute inset-0 h-full w-full object-cover ${videoReady ? 'hero-video-fade--ready' : ''}`}
          autoPlay
          muted
          loop
          playsInline
          preload="none"
          onCanPlay={onCanPlay}
        >
          <source
            src={heroVideo.portrait.webm}
            type="video/webm"
            media={heroMediaQueries.portrait}
          />
          <source
            src={heroVideo.portrait.mp4}
            type="video/mp4"
            media={heroMediaQueries.portrait}
          />
          <source
            src={heroVideo.landscape.webm}
            type="video/webm"
            media={heroMediaQueries.landscape}
          />
          <source
            src={heroVideo.landscape.mp4}
            type="video/mp4"
            media={heroMediaQueries.landscape}
          />
        </video>
      ) : null}

      <div className="hero-vignette absolute inset-0" />
      {/* Left-side gradient — desktop only, for side rail + title legibility */}
      <div className="hero-vignette-side absolute inset-0 hidden md:block" />
      <div className="hero-grain absolute inset-0" />
    </div>
  )
}
