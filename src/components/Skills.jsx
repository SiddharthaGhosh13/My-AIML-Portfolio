import { motion } from 'framer-motion'
import { useScrollAnimation, staggerContainer, staggerItem } from '../hooks/useScrollAnimation'
import { skillCategories } from '../data/skills'

const accentStyles = {
  amber:
    'border-accent-primary/35 bg-[rgba(240,165,0,0.08)] text-text-primary shadow-[0_0_24px_var(--glow-amber)] hover:border-accent-primary/60',
  cyan:
    'border-accent-secondary/35 bg-[rgba(0,212,255,0.06)] text-text-primary shadow-[0_0_22px_var(--glow-cyan)] hover:border-accent-secondary/55',
}

export default function Skills() {
  const { ref, inView, variants } = useScrollAnimation()

  return (
    <section
      id="skills"
      ref={ref}
      className="relative overflow-hidden border-b border-border px-4 py-16 md:px-6 md:py-24 lg:px-8"
      aria-labelledby="skills-heading"
    >
      <div className="mx-auto w-full max-w-6xl">
        <motion.div initial="hidden" animate={inView ? 'visible' : 'hidden'} variants={variants} className="mb-12">
          <p className="font-label text-[13px] uppercase tracking-[0.24em] text-accent-secondary">
            Tech Stack
          </p>
        </motion.div>

        <motion.div
          className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3"
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
          variants={staggerContainer}
        >
          {skillCategories.map((cat) => (
            <motion.div key={cat.id} variants={staggerItem} className="space-y-4 rounded-2xl border border-border bg-bg-card p-4 md:p-5">
              <div className="flex flex-wrap items-baseline gap-3">
                <h3 className="font-display text-base text-text-primary md:text-lg">{cat.title}</h3>
                <span className="font-label text-[10px] uppercase tracking-[0.2em] text-text-muted">
                  class:{cat.id}
                </span>
              </div>
              <div className="flex flex-wrap gap-2 overflow-hidden">
                {cat.skills.map((skill, idx) => (
                  <motion.span
                    key={skill}
                    initial={{ opacity: 0, scale: 0.92, y: 8 }}
                    whileInView={{ opacity: 1, scale: 1, y: 0 }}
                    viewport={{ once: true, margin: '-10% 0px' }}
                    transition={{ delay: idx * 0.02, duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                    className={`cursor-target rounded-full border px-2 py-1 font-label text-xs uppercase tracking-wider transition md:px-3 md:py-2 md:text-sm ${accentStyles[cat.accent]}`}
                  >
                    {skill}
                  </motion.span>
                ))}
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
