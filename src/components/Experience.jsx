import { motion } from 'framer-motion'
import { useScrollAnimation, staggerContainer, staggerItem } from '../hooks/useScrollAnimation'
import { experienceItems } from '../data/experience'

export default function Experience() {
  const { ref, inView, variants } = useScrollAnimation()

  return (
    <section
      id="experience"
      ref={ref}
      className="relative overflow-hidden border-b border-border bg-bg-secondary/25 px-4 py-16 md:px-6 md:py-24 lg:px-8"
      aria-labelledby="experience-heading"
    >
      <div className="mx-auto w-full max-w-6xl">
        <motion.div initial="hidden" animate={inView ? 'visible' : 'hidden'} variants={variants} className="mb-12">
          <p className="font-label text-[13px] uppercase tracking-[0.24em] text-accent-primary">
            Experience
          </p>
        </motion.div>

        <motion.ol
          className="relative space-y-6 border-l border-border pl-5 md:space-y-8 md:pl-10"
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
                className="absolute left-[-22px] top-2 flex h-4 w-4 items-center justify-center rounded-full border border-accent-primary bg-bg-primary md:left-[-26px]"
                aria-hidden
              >
                <span className="h-2 w-2 rounded-full bg-accent-primary shadow-glowamber" />
              </span>
              <div className="rounded-2xl border border-border bg-bg-card p-4 shadow-card transition hover:border-accent-secondary/35 hover:shadow-glowcyan md:p-6">
                <div className="flex flex-col gap-3 md:flex-row md:flex-wrap md:items-baseline md:justify-between">
                  <p className="font-label text-[10px] uppercase tracking-wider text-text-muted md:order-2 md:text-[11px]">{item.period}</p>
                  <div>
                    <h3 className="break-words font-display text-base font-semibold text-text-primary md:text-lg">{item.role}</h3>
                    <p className="mt-1 break-words font-label text-[11px] uppercase tracking-[0.16em] text-accent-secondary md:text-xs">
                      {item.org}
                    </p>
                  </div>
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
