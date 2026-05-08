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
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const media = window.matchMedia('(max-width: 767px)')
    const onChange = (event) => setIsMobile(event.matches)
    setIsMobile(media.matches)
    media.addEventListener('change', onChange)
    return () => media.removeEventListener('change', onChange)
  }, [])

  const particleOptions = useMemo(
    () => ({
      fullScreen: { enable: false },
      background: { color: { value: 'transparent' } },
      fpsLimit: 60,
      detectRetina: true,
      particles: {
        number: { value: isMobile ? 30 : 52 },
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
    [isMobile]
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
      className="relative flex min-h-[100svh] items-center justify-center overflow-hidden border-b border-border px-4 py-16 md:px-6 md:py-24 lg:px-8"
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
        className="relative z-10 mx-auto flex w-full max-w-6xl flex-col items-start gap-8 overflow-hidden px-0 pb-28 pt-28 md:pb-24 md:pt-32"
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
            className="break-words font-display text-4xl font-semibold leading-tight tracking-tight text-text-primary md:text-6xl lg:text-8xl"
          >
            {siteMeta.name}
          </h1>
          <p className="max-w-2xl font-body text-xl text-text-secondary md:text-3xl">
            <span className="block font-display text-sm text-text-muted md:text-base">{siteMeta.title}</span>
            <span className="mt-3 block min-h-[2rem] md:min-h-[2.25rem]">
              <TypewriterRole />
            </span>
          </p>
          <p className="max-w-2xl break-words border-l-2 border-accent-primary/40 pl-5 font-body text-sm italic text-text-primary/90 md:text-base">
            “{siteMeta.tagline}”
          </p>
        </motion.div>

        <motion.div variants={item} className="flex w-full flex-col gap-3 sm:w-auto md:flex-row">
          <a
            href="#projects"
            className="cursor-target inline-flex min-h-11 w-full items-center justify-center rounded-lg bg-accent-primary px-6 py-3 font-label text-xs font-semibold uppercase tracking-wider text-bg-primary shadow-glowamber transition hover:bg-accent-primary/90 focus-visible:ring-2 focus-visible:ring-accent-secondary md:w-auto"
            aria-label="View featured projects"
          >
            View Projects
          </a>
          <a
            href="#contact"
            className="cursor-target inline-flex min-h-11 w-full items-center justify-center rounded-lg border border-border bg-bg-card px-6 py-3 font-label text-xs font-semibold uppercase tracking-wider text-text-primary transition hover:border-accent-secondary/50 hover:text-accent-secondary md:w-auto"
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
            className="cursor-target inline-flex min-h-11 min-w-11 items-center justify-center rounded-lg border border-border bg-bg-secondary p-2.5 transition hover:border-accent-primary/40 hover:text-accent-primary md:p-3"
            aria-label="GitHub profile"
          >
            <FaGithub className="h-4 w-4 md:h-5 md:w-5" aria-hidden />
          </a>
          <a
            href={siteMeta.linkedin}
            target="_blank"
            rel="noreferrer"
            className="cursor-target inline-flex min-h-11 min-w-11 items-center justify-center rounded-lg border border-border bg-bg-secondary p-2.5 transition hover:border-accent-secondary/40 hover:text-accent-secondary md:p-3"
            aria-label="LinkedIn profile"
          >
            <FaLinkedin className="h-4 w-4 md:h-5 md:w-5" aria-hidden />
          </a>
          <a
            href={`mailto:${siteMeta.email}`}
            className="cursor-target inline-flex min-h-11 min-w-11 items-center justify-center rounded-lg border border-border bg-bg-secondary p-2.5 transition hover:border-accent-primary/40 hover:text-accent-primary md:p-3"
            aria-label={`Email ${siteMeta.email}`}
          >
            <HiOutlineMail className="h-4 w-4 md:h-5 md:w-5" aria-hidden />
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
