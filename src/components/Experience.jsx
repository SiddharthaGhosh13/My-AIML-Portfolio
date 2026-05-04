import { motion } from 'framer-motion'
import { useScrollAnimation, staggerContainer, staggerItem } from '../hooks/useScrollAnimation'
import { experienceItems } from '../data/experience'

export default function Experience() {
  const { ref, inView, variants } = useScrollAnimation()

  return (
    <section
      id="experience"
      ref={ref}
      className="relative border-b border-border bg-bg-secondary/25 py-20 md:py-28"
      aria-labelledby="experience-heading"
    >
      <div className="mx-auto max-w-content px-5 md:px-8">
        <motion.div initial="hidden" animate={inView ? 'visible' : 'hidden'} variants={variants} className="mb-12">
          <p className="font-label text-[13px] uppercase tracking-[0.24em] text-accent-primary">
            Experience
          </p>
        </motion.div>

        <motion.ol
          className="relative space-y-8 border-l border-border pl-8 md:pl-12"
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
          variants={staggerContainer}
          aria-label="Experience timeline"
        >
          <span
            className="pointer-events-none absolute left-[-5px] top-3 h-full w-[9px] bg-gradient-to-b from-accent-primary/35 via-accent-secondary/25 to-transparent blur-[2px]"
            aria-hidden
          />
          {experienceItems.map((item) => (
            <motion.li key={item.id} variants={staggerItem} className="relative">
              <span
                className="absolute left-[-29px] top-2 flex h-4 w-4 items-center justify-center rounded-full border border-accent-primary bg-bg-primary md:left-[-33px]"
                aria-hidden
              >
                <span className="h-2 w-2 rounded-full bg-accent-primary shadow-glowamber" />
              </span>
              <div className="rounded-2xl border border-border bg-bg-card p-6 shadow-card transition hover:border-accent-secondary/35 hover:shadow-glowcyan">
                <div className="flex flex-wrap items-baseline justify-between gap-3">
                  <div>
                    <h3 className="font-display text-lg font-semibold text-text-primary">{item.role}</h3>
                    <p className="mt-1 font-label text-xs uppercase tracking-[0.18em] text-accent-secondary">{item.org}</p>
                  </div>
                  <p className="font-label text-[11px] uppercase tracking-wider text-text-muted">{item.period}</p>
                </div>
                <p className="mt-4 font-body text-sm leading-relaxed text-text-secondary md:text-base">{item.description}</p>
              </div>
            </motion.li>
          ))}
        </motion.ol>
      </div>
    </section>
  )
}
