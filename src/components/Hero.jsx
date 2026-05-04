import { lazy, Suspense, useMemo, useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { FaGithub, FaLinkedin } from 'react-icons/fa'
import { HiOutlineMail } from 'react-icons/hi'
import { siteMeta } from '../data/site'

const ParticlesLayer = lazy(() => import('./HeroParticles'))

const roles = ['AI/ML Engineer', 'NLP & LLM Specialist', 'Founder']

function TypewriterRole() {
  const [roleIndex, setRoleIndex] = useState(0)
  const [text, setText] = useState('')
  const full = roles[roleIndex]

  useEffect(() => {
    let i = 0
    let intervalId
    const timeoutId = window.setTimeout(() => {
      setText('')
      intervalId = window.setInterval(() => {
        i += 1
        setText(full.slice(0, i))
        if (i >= full.length) window.clearInterval(intervalId)
      }, 42)
    }, 0)
    return () => {
      window.clearTimeout(timeoutId)
      if (intervalId) window.clearInterval(intervalId)
    }
  }, [full])

  useEffect(() => {
    const pause = setTimeout(() => {
      setRoleIndex((idx) => (idx + 1) % roles.length)
    }, 2800)
    return () => clearTimeout(pause)
  }, [roleIndex])

  return (
    <span className="font-label text-accent-secondary" aria-live="polite">
      {text}
      <span className="ml-0.5 inline-block h-[1.1em] w-2 translate-y-0.5 bg-accent-primary animate-pulse" />
    </span>
  )
}

export default function Hero() {
  const particleOptions = useMemo(
    () => ({
      fullScreen: { enable: false },
      background: { color: { value: 'transparent' } },
      fpsLimit: 60,
      detectRetina: true,
      particles: {
        number: { value: 52 },
        color: { value: ['#F0A500', '#00D4FF', '#8B949E'] },
        opacity: { value: { min: 0.12, max: 0.42 } },
        size: { value: { min: 1, max: 2.5 } },
        move: {
          enable: true,
          speed: 0.35,
          direction: 'none',
          random: true,
          straight: false,
          outModes: { default: 'out' },
        },
        links: {
          enable: true,
          distance: 118,
          color: '#21262D',
          opacity: 0.35,
          width: 1,
        },
      },
      interactivity: {
        events: {
          onHover: { enable: true, mode: 'grab' },
          onClick: { enable: false },
        },
        modes: {
          grab: { distance: 120, links: { opacity: 0.45 } },
        },
      },
    }),
    []
  )

  const container = {
    hidden: {},
    visible: {
      transition: { staggerChildren: 0.14, delayChildren: 1.65 },
    },
  }

  const item = {
    hidden: { opacity: 0, y: 28 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] } },
  }

  return (
    <section
      id="hero"
      className="relative flex min-h-[100svh] items-center justify-center overflow-hidden border-b border-border"
      aria-labelledby="hero-heading"
    >
      <div className="mesh-hero absolute inset-0" aria-hidden />
      <Suspense fallback={null}>
        <ParticlesLayer options={particleOptions} />
      </Suspense>
      <div
        className="pointer-events-none absolute inset-0 bg-grid-pattern bg-grid-size opacity-[0.15]"
        style={{ maskImage: 'radial-gradient(ellipse at center, black 30%, transparent 70%)' }}
        aria-hidden
      />

      <motion.div
        className="relative z-10 mx-auto flex max-w-content flex-col items-start gap-8 px-5 pb-24 pt-28 md:px-8 md:pt-32"
        variants={container}
        initial="hidden"
        animate="visible"
      >
        <motion.p
          variants={item}
          className="font-label text-[11px] uppercase tracking-[0.28em] text-text-muted before:mr-2 before:inline-block before:h-px before:w-8 before:translate-y-[-3px] before:bg-accent-primary before:content-['']"
        >
          Welcome to My Portfolio! 
        </motion.p>

        <motion.div variants={item} className="space-y-4">
          <h1
            id="hero-heading"
            className="font-display text-4xl font-semibold leading-tight tracking-tight text-text-primary md:text-6xl lg:text-7xl"
          >
            {siteMeta.name}
          </h1>
          <p className="max-w-2xl font-body text-lg text-text-secondary md:text-xl">
            <span className="block font-display text-sm text-text-muted md:text-base">{siteMeta.title}</span>
            <span className="mt-3 block min-h-[2rem] md:min-h-[2.25rem]">
              <TypewriterRole />
            </span>
          </p>
          <p className="max-w-2xl border-l-2 border-accent-primary/40 pl-5 font-body text-base italic text-text-primary/90 md:text-lg">
            “{siteMeta.tagline}”
          </p>
        </motion.div>

        <motion.div variants={item} className="flex flex-wrap gap-3">
          <a
            href="#projects"
            className="cursor-target inline-flex items-center justify-center rounded-lg bg-accent-primary px-6 py-3 font-label text-xs font-semibold uppercase tracking-wider text-bg-primary shadow-glowamber transition hover:bg-accent-primary/90 focus-visible:ring-2 focus-visible:ring-accent-secondary"
            aria-label="View featured projects"
          >
            View Projects
          </a>
          <a
            href="#contact"
            className="cursor-target inline-flex items-center justify-center rounded-lg border border-border bg-bg-card px-6 py-3 font-label text-xs font-semibold uppercase tracking-wider text-text-primary transition hover:border-accent-secondary/50 hover:text-accent-secondary"
            aria-label="Go to contact section"
          >
            Let&apos;s Connect
          </a>
        </motion.div>

        <motion.div variants={item} className="flex items-center gap-4 text-text-secondary">
          <a
            href={siteMeta.github}
            target="_blank"
            rel="noreferrer"
            className="cursor-target rounded-lg border border-border bg-bg-secondary p-3 transition hover:border-accent-primary/40 hover:text-accent-primary"
            aria-label="GitHub profile"
          >
            <FaGithub className="h-5 w-5" aria-hidden />
          </a>
          <a
            href={siteMeta.linkedin}
            target="_blank"
            rel="noreferrer"
            className="cursor-target rounded-lg border border-border bg-bg-secondary p-3 transition hover:border-accent-secondary/40 hover:text-accent-secondary"
            aria-label="LinkedIn profile"
          >
            <FaLinkedin className="h-5 w-5" aria-hidden />
          </a>
          <a
            href={`mailto:${siteMeta.email}`}
            className="cursor-target rounded-lg border border-border bg-bg-secondary p-3 transition hover:border-accent-primary/40 hover:text-accent-primary"
            aria-label={`Email ${siteMeta.email}`}
          >
            <HiOutlineMail className="h-5 w-5" aria-hidden />
          </a>
        </motion.div>

        <motion.p
          variants={item}
          className="font-label text-[10px] text-text-muted md:text-[11px]"
          aria-hidden
        >
          <span className="text-accent-secondary">&gt;</span> Initialising Portfolio..
          <span className="ml-2 inline-block h-2 w-6 bg-accent-primary/40 align-middle" />
        </motion.p>
      </motion.div>
    </section>
  )
}
