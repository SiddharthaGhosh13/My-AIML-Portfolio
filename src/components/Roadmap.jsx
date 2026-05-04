import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useScrollAnimation, staggerContainer, staggerItem } from '../hooks/useScrollAnimation'
import { roadmapPhases } from '../data/roadmap'

const ring = {
  amber: 'border-accent-primary/45 text-accent-primary shadow-glowamber',
  cyan: 'border-accent-secondary/45 text-accent-secondary shadow-glowcyan',
}

function PhaseCard({ phase }) {
  const Icon = phase.Icon
  const ringClass = ring[phase.color]

  return (
    <div className="relative flex min-h-[280px] w-[min(100%,320px)] shrink-0 snap-start flex-col rounded-2xl border border-border bg-bg-card p-6 shadow-card md:min-h-[300px] md:w-[300px] lg:w-[320px]">
      <div
        className={`mb-5 inline-flex h-12 w-12 items-center justify-center rounded-xl border bg-bg-secondary ${ringClass}`}
        aria-hidden
      >
        <Icon className="h-5 w-5" />
      </div>
      <p className="font-label text-[10px] uppercase tracking-[0.22em] text-text-muted">{phase.phase}</p>
      <h3 className="mt-2 font-display text-lg font-semibold text-text-primary">{phase.title}</h3>
      <p className="mt-2 font-label text-[11px] uppercase tracking-wider text-accent-secondary">{phase.months}</p>
      <p className="mt-4 flex-1 font-body text-sm leading-relaxed text-text-secondary">{phase.description}</p>
    </div>
  )
}

export default function Roadmap() {
  const { ref, inView, variants } = useScrollAnimation()
  const [openIndex, setOpenIndex] = useState(0)

  return (
    <section
      id="roadmap"
      ref={ref}
      className="relative border-b border-border py-20 md:py-28"
      aria-labelledby="roadmap-heading"
    >
      <div className="mx-auto max-w-content px-5 md:px-8">
        <motion.div initial="hidden" animate={inView ? 'visible' : 'hidden'} variants={variants} className="mb-10 md:mb-14">
          <p className="font-label text-[13px] uppercase tracking-[0.24em] text-accent-secondary">
            Roadmap
          </p>
        </motion.div>

        <motion.div
          className="hide-scrollbar hidden gap-6 overflow-x-auto pb-4 pt-2 md:flex md:snap-x md:snap-mandatory"
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
          variants={staggerContainer}
          aria-label="ML roadmap phases — scroll horizontally"
        >
          {roadmapPhases.map((phase) => (
            <motion.div key={phase.id} variants={staggerItem}>
              <PhaseCard phase={phase} />
            </motion.div>
          ))}
        </motion.div>

        <div className="space-y-3 md:hidden" role="list">
          {roadmapPhases.map((phase, idx) => {
            const Icon = phase.Icon
            const open = openIndex === idx
            const ringClass = ring[phase.color]

            return (
              <div
                key={phase.id}
                className="overflow-hidden rounded-2xl border border-border bg-bg-card shadow-card"
                role="listitem"
              >
                <button
                  type="button"
                  className="cursor-target flex w-full items-center gap-4 px-4 py-4 text-left transition hover:bg-bg-secondary/80"
                  aria-expanded={open}
                  aria-controls={`roadmap-panel-${phase.id}`}
                  id={`roadmap-trigger-${phase.id}`}
                  onClick={() => setOpenIndex(open ? -1 : idx)}
                >
                  <span
                    className={`inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-lg border bg-bg-secondary ${ringClass}`}
                    aria-hidden
                  >
                    <Icon className="h-4 w-4" />
                  </span>
                  <span className="flex-1">
                    <span className="block font-label text-[10px] uppercase tracking-[0.2em] text-text-muted">
                      {phase.phase}
                    </span>
                    <span className="mt-1 block font-display text-base font-semibold text-text-primary">{phase.title}</span>
                    <span className="mt-1 block font-label text-[10px] uppercase tracking-wider text-accent-secondary">
                      {phase.months}
                    </span>
                  </span>
                  <span className="font-label text-lg text-text-muted" aria-hidden>
                    {open ? '−' : '+'}
                  </span>
                </button>
                <AnimatePresence initial={false}>
                  {open && (
                    <motion.div
                      id={`roadmap-panel-${phase.id}`}
                      role="region"
                      aria-labelledby={`roadmap-trigger-${phase.id}`}
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                      className="border-t border-border"
                    >
                      <p className="px-4 py-4 font-body text-sm leading-relaxed text-text-secondary">{phase.description}</p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
