/** Hero video and poster paths (encoded via scripts/encode-hero.sh). */

export const HERO_BREAKPOINT = 768

export const heroVideo = {
  portrait: {
    webm: '/hero/portrait-hero.webm',
    mp4: '/hero/portrait-hero.mp4',
    poster: {
      avif: '/hero/portrait-poster.avif',
      jpg: '/hero/portrait-poster.jpg',
    },
  },
  landscape: {
    webm: '/hero/landscape-hero.webm',
    mp4: '/hero/landscape-hero.mp4',
    poster: {
      avif: '/hero/landscape-poster.avif',
      jpg: '/hero/landscape-poster.jpg',
    },
  },
} as const

export const heroMediaQueries = {
  portrait: `(max-width: ${HERO_BREAKPOINT - 1}px)`,
  landscape: `(min-width: ${HERO_BREAKPOINT}px)`,
} as const
