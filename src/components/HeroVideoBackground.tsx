'use client'

import { useCallback, useEffect, useRef, useState, useSyncExternalStore } from 'react'

import { heroMediaQueries, heroVideo } from '@/config/heroVideo'

type HeroVariant = keyof typeof heroVideo

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

/** iOS Safari requires muted + inline playback set before play(). */
function primeVideoForAutoplay(video: HTMLVideoElement) {
  video.muted = true
  video.defaultMuted = true
  video.setAttribute('muted', '')
  video.setAttribute('playsinline', '')
  video.setAttribute('webkit-playsinline', '')
  video.playsInline = true
  video.controls = false
}

function HeroVideoPlayer({ variant }: { variant: HeroVariant }) {
  const videoRef = useRef<HTMLVideoElement>(null)
  const [videoReady, setVideoReady] = useState(false)
  const { webm, mp4 } = heroVideo[variant]

  const tryPlay = useCallback(() => {
    const video = videoRef.current
    if (!video) return

    primeVideoForAutoplay(video)

    const playPromise = video.play()
    if (playPromise === undefined) return

    void playPromise
      .then(() => {
        setVideoReady(true)
      })
      .catch(() => {
        /* Autoplay blocked — poster remains visible until unlock gesture */
      })
  }, [])

  const onCanPlay = useCallback(() => {
    tryPlay()
  }, [tryPlay])

  useEffect(() => {
    const video = videoRef.current
    if (!video) return

    primeVideoForAutoplay(video)
    video.load()
    tryPlay()

    const retryEvents = ['loadeddata', 'canplay', 'canplaythrough'] as const
    for (const event of retryEvents) {
      video.addEventListener(event, tryPlay)
    }

    const onVisible = () => {
      if (document.visibilityState === 'visible') tryPlay()
    }
    document.addEventListener('visibilitychange', onVisible)
    window.addEventListener('pageshow', tryPlay)

    const unlock = () => {
      tryPlay()
    }
    document.addEventListener('touchstart', unlock, { once: true, passive: true, capture: true })
    document.addEventListener('click', unlock, { once: true, capture: true })

    return () => {
      for (const event of retryEvents) {
        video.removeEventListener(event, tryPlay)
      }
      document.removeEventListener('visibilitychange', onVisible)
      window.removeEventListener('pageshow', tryPlay)
      document.removeEventListener('touchstart', unlock, { capture: true })
      document.removeEventListener('click', unlock, { capture: true })
    }
  }, [variant, tryPlay])

  return (
    <video
      ref={videoRef}
      className={`hero-video-fade absolute inset-0 h-full w-full object-cover ${videoReady ? 'hero-video-fade--ready' : ''}`}
      autoPlay
      muted
      loop
      playsInline
      preload="auto"
      controls={false}
      disablePictureInPicture
      disableRemotePlayback
      onCanPlay={onCanPlay}
    >
      <source src={webm} type='video/webm; codecs="vp9"' />
      <source src={mp4} type="video/mp4" />
    </video>
  )
}

export function HeroVideoBackground() {
  const reducedMotion = useSyncExternalStore(subscribeReducedMotion, getReducedMotion, () => false)
  const saveData = useSyncExternalStore(subscribeSaveData, getSaveData, () => false)
  const shouldPlayVideo = !reducedMotion && !saveData

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
        <>
          <div className="absolute inset-0 md:hidden">
            <HeroVideoPlayer variant="portrait" />
          </div>
          <div className="absolute inset-0 hidden md:block">
            <HeroVideoPlayer variant="landscape" />
          </div>
        </>
      ) : null}

      <div className="hero-vignette absolute inset-0" />
      {/* Left-side gradient — desktop only, for side rail + title legibility */}
      <div className="hero-vignette-side absolute inset-0 hidden md:block" />
      <div className="hero-grain absolute inset-0" />
    </div>
  )
}
