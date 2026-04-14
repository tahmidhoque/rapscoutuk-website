import { SocialStrip } from '@/components/SocialStrip'

export function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer className="border-t border-ink/10 px-5 py-10">
      <div className="mx-auto flex max-w-2xl flex-col items-start gap-6 sm:flex-row sm:items-center sm:justify-between">
        <SocialStrip variant="minimal" />
        <p className="font-display text-[11px] font-bold tracking-[0.2em] text-dim/50 uppercase">
          &copy; {year} RapScout
        </p>
      </div>
    </footer>
  )
}
