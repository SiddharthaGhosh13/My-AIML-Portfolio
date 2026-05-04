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
      className="relative border-b border-border py-20 md:py-28"
      aria-labelledby="skills-heading"
    >
      <div className="mx-auto max-w-content px-5 md:px-8">
        <motion.div initial="hidden" animate={inView ? 'visible' : 'hidden'} variants={variants} className="mb-12">
          <p className="font-label text-[13px] uppercase tracking-[0.24em] text-accent-secondary">
            Tech Stack
          </p>
        </motion.div>

        <motion.div
          className="space-y-12"
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
          variants={staggerContainer}
        >
          {skillCategories.map((cat) => (
            <motion.div key={cat.id} variants={staggerItem} className="space-y-4">
              <div className="flex flex-wrap items-baseline gap-3">
                <h3 className="font-display text-lg text-text-primary md:text-xl">{cat.title}</h3>
                <span className="font-label text-[10px] uppercase tracking-[0.2em] text-text-muted">
                  class:{cat.id}
                </span>
              </div>
              <div className="flex flex-wrap gap-2 md:gap-3">
                {cat.skills.map((skill, idx) => (
                  <motion.span
                    key={skill}
                    initial={{ opacity: 0, scale: 0.92, y: 8 }}
                    whileInView={{ opacity: 1, scale: 1, y: 0 }}
                    viewport={{ once: true, margin: '-10% 0px' }}
                    transition={{ delay: idx * 0.02, duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                    className={`cursor-target rounded-full border px-3 py-2 font-label text-[11px] uppercase tracking-wider transition md:px-4 md:text-xs ${accentStyles[cat.accent]}`}
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
