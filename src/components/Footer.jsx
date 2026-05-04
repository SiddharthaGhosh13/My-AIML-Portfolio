import { siteMeta } from '../data/site'

export default function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer className="border-t border-border bg-bg-secondary/40 py-10" role="contentinfo">
      <div className="mx-auto flex max-w-content flex-col gap-6 px-5 md:flex-row md:items-center md:justify-between md:px-8">
        <div>
          <p className="font-display text-sm font-semibold text-text-primary">{siteMeta.name}</p>
          <p className="mt-1 font-label text-[11px] uppercase tracking-[0.18em] text-text-muted">
            NLP · LLMs · Founder — {siteMeta.location}
          </p>
        </div>
        <p className="font-body text-sm text-text-secondary">
          © {year} · Crafting in Progress ·{' '}
          <span className="text-accent-primary">The Vision to fuel future With AI.</span>
        </p>
      </div>
    </footer>
  )
}
