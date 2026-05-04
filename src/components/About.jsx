import { motion } from 'framer-motion'
import { useScrollAnimation, staggerContainer, staggerItem } from '../hooks/useScrollAnimation'
import { siteMeta } from '../data/site'
import profilePlaceholder from '../assets/profile-placeholder.svg'

export default function About() {
  const { ref, inView } = useScrollAnimation()

  return (
    <section
      id="about"
      ref={ref}
      className="relative border-b border-border bg-bg-secondary/40 py-20 md:py-28"
      aria-labelledby="about-heading"
    >

      <motion.div
        className="mx-auto grid max-w-content gap-12 px-5 md:grid-cols-[minmax(0,320px)_1fr] md:items-start md:gap-16 md:px-8"
        initial="hidden"
        animate={inView ? 'visible' : 'hidden'}
        variants={staggerContainer}
      >
        <motion.div variants={staggerItem} className="relative mx-auto w-full max-w-sm md:mx-0">
          <div className="absolute -inset-3 rounded-2xl bg-gradient-to-br from-accent-primary/20 via-transparent to-accent-secondary/15 blur-xl" aria-hidden />
          <img
            src= "src/assets/Profile.jpg"
            alt="Siddhartha Ghosh - Profile Picture"
            width={320}
            height={320}
            loading="lazy"
            decoding="async"
            className="relative z-[1] w-full rounded-2xl border border-border object-cover shadow-card"
          />
          <p className="mt-3 font-label text-[11px] uppercase tracking-wider text-text-muted">
            - Siddhartha Ghosh, Founder & CEO
          </p>
        </motion.div>

        <motion.div variants={staggerItem} className="space-y-6">
          <p className="font-label text-[11px] uppercase tracking-[0.24em] text-accent-primary">
            About Me
          </p>
          <p className="max-w-2xl font-body text-base leading-relaxed text-text-secondary md:text-lg">{siteMeta.shortBio}</p>
          <dl className="grid gap-4 border-l border-border pl-5 font-label text-sm text-text-secondary md:grid-cols-2">
            <div>
              <dt className="text-text-muted">Location</dt>
              <dd className="text-text-primary">{siteMeta.location}</dd>
            </div>
            <div>
              <dt className="text-text-muted">Focus</dt>
              <dd className="text-text-primary">NLP · LLMs · Product</dd>
            </div>
          </dl>
        </motion.div>
      </motion.div>
    </section>
  )
}
