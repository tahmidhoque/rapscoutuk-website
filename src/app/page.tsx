import { HeroSection } from '@/components/HeroSection'
import { AboutSection } from '@/components/AboutSection'
import { RapScoutNewsletterHub } from '@/components/RapScoutNewsletterHub'
import { SubmissionsSection } from '@/components/SubmissionsSection'
import { Footer } from '@/components/Footer'

export default function Home() {
  return (
    <div className="flex min-h-dvh flex-col bg-canvas text-ink">
      <main>
        <HeroSection />

        {/* Thin full-width divider between hero and content */}
        <div className="h-px w-full bg-ink/10" aria-hidden />

        <AboutSection />

        <div className="h-px w-full bg-ink/10" aria-hidden />

        <RapScoutNewsletterHub />

        <div className="h-px w-full bg-ink/10" aria-hidden />

        <SubmissionsSection />
      </main>

      <Footer />
    </div>
  )
}
