import { HeroSection } from '@/components/HeroSection'
import { AboutSection } from '@/components/AboutSection'
import { RapScoutNewsletterHub } from '@/components/RapScoutNewsletterHub'
import { NewsletterStickyBar } from '@/components/newsletter/NewsletterStickyBar'
import { SubmissionsSection } from '@/components/SubmissionsSection'
import { Footer } from '@/components/Footer'
import { siteFeatures } from '@/config/siteFeatures'

export default function Home() {
  return (
    <div className="flex min-h-dvh flex-col bg-canvas text-ink">
      {siteFeatures.newsletter ? <NewsletterStickyBar /> : null}
      <main>
        <HeroSection />

        {/* Thin full-width divider between hero and content */}
        <div className="h-px w-full bg-ink/10" aria-hidden />

        <AboutSection />

        {siteFeatures.newsletter ? <RapScoutNewsletterHub /> : null}

        <SubmissionsSection />
      </main>

      <Footer />
    </div>
  )
}
