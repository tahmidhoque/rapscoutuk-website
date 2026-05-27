import { siteFeatures } from '@/config/siteFeatures'

/** TX codes mirror hero “Transmission 01” → editorial section order. */
export const transmissionCodes = {
  hero: 'Transmission 01',
  about: 'TX.02',
  newsletter: 'TX.03',
  submissions: siteFeatures.newsletter ? 'TX.04' : 'TX.03',
} as const
