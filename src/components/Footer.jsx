import { siteMeta } from '../data/site'

export default function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer className="border-t border-border bg-bg-secondary/40 px-4 py-10 md:px-6 lg:px-8" role="contentinfo">
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-6 text-center md:flex-row md:items-center md:justify-between md:text-left">
        <div className="space-y-1">
          <p className="font-display text-xs font-semibold text-text-primary md:text-sm">{siteMeta.name}</p>
          <p className="font-label text-[10px] uppercase tracking-[0.16em] text-text-muted md:text-[11px] md:tracking-[0.18em]">
            NLP · LLMs · Founder — {siteMeta.location}
          </p>
        </div>
        <p className="font-body text-xs text-text-secondary md:text-sm">
          © {year} · Crafting in Progress ·{' '}
          <span className="text-accent-primary">The Vision to fuel future With AI.</span>
        </p>
      </div>
    </footer>
  )
}
