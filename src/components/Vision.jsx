import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { visionPhases, siteMeta } from '../data/site'

function PhaseCounter({ target, inView }) {
  const [display, setDisplay] = useState(0)

  useEffect(() => {
    if (!inView) return undefined
    let frame
    const start = performance.now()
    const duration = 950

    const tick = (now) => {
      const p = Math.min(1, (now - start) / duration)
      setDisplay(Math.round(p * target))
      if (p < 1) frame = requestAnimationFrame(tick)
    }

    frame = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(frame)
  }, [inView, target])

  return (
    <span className="font-display text-5xl tabular-nums text-accent-primary md:text-7xl">
      {String(display).padStart(2, '0')}
    </span>
  )
}

export default function Vision() {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.2 })

  return (
    <section
      id="vision"
      ref={ref}
      className="grain relative overflow-hidden border-b border-border bg-[radial-gradient(ellipse_at_top,_rgba(0,212,255,0.08),transparent_55%),radial-gradient(ellipse_at_bottom,_rgba(240,165,0,0.07),transparent_50%),#05070a] py-24 md:py-32"
      aria-labelledby="vision-heading"
    >
      <div className="pointer-events-none absolute inset-0 opacity-[0.07]">
        <div
          className="absolute inset-0 bg-grid-pattern bg-grid-size"
          style={{ maskImage: 'radial-gradient(ellipse at center, black 25%, transparent 70%)' }}
          aria-hidden
        />
      </div>

      <div className="relative z-[2] mx-auto max-w-content px-5 md:px-8">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
          className="mx-auto max-w-3xl text-center"
        >
          <p className="font-label text-[13px] uppercase tracking-[0.3em] text-accent-secondary">
            Vision
          </p>
          <h2 id="vision-heading" className="mt-4 font-display text-4xl font-semibold tracking-tight text-text-primary md:text-6xl">
            Beyond the Code
          </h2>
          <p className="mt-6 font-body text-lg leading-relaxed text-text-secondary md:text-xl">{siteMeta.visionStatement}</p>
        </motion.div>

        <div className="mt-16 grid gap-6 md:grid-cols-3 md:gap-8">
          {visionPhases.map((phase, idx) => {
            const target = idx + 1
            return (
              <motion.article
                key={phase.id}
                initial={{ opacity: 0, y: 36, scale: 0.97 }}
                animate={inView ? { opacity: 1, y: 0, scale: 1 } : {}}
                transition={{ duration: 0.55, delay: 0.15 + idx * 0.12, ease: [0.22, 1, 0.36, 1] }}
                className="relative overflow-hidden rounded-2xl border border-border bg-bg-card/80 p-8 shadow-card backdrop-blur-md"
              >
                <div className="pointer-events-none absolute -right-10 -top-10 h-40 w-40 rounded-full bg-accent-primary/10 blur-3xl" />
                <div className="pointer-events-none absolute -bottom-16 left-6 h-36 w-36 rounded-full bg-accent-secondary/10 blur-3xl" />

                <div className="relative flex items-start justify-between gap-4">
                  <PhaseCounter target={target} inView={inView} />
                  <span className="font-label text-[10px] uppercase tracking-[0.24em] text-text-muted">
                    phase.{String(target).padStart(2, '0')}
                  </span>
                </div>
                <h3 className="relative mt-8 font-display text-xl font-semibold text-text-primary md:text-2xl">
                  {phase.title}
                </h3>
                <p className="relative mt-4 font-body text-sm leading-relaxed text-text-secondary md:text-base">{phase.body}</p>
              </motion.article>
            )
          })}
        </div>
      </div>
    </section>
  )
}
