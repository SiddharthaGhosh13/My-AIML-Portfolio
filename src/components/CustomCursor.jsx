import { useEffect, useState } from 'react'
import { motion, useMotionValue, useSpring } from 'framer-motion'

export default function CustomCursor() {
  const [enabled, setEnabled] = useState(false)
  const [hovered, setHovered] = useState(false)

  const x = useMotionValue(0)
  const y = useMotionValue(0)
  const sx = useSpring(x, { stiffness: 520, damping: 38, mass: 0.35 })
  const sy = useSpring(y, { stiffness: 520, damping: 38, mass: 0.35 })

  useEffect(() => {
    const mq = window.matchMedia('(min-width: 768px)')
    const apply = () => setEnabled(mq.matches)
    apply()
    mq.addEventListener('change', apply)
    return () => mq.removeEventListener('change', apply)
  }, [])

  useEffect(() => {
    if (!enabled) return undefined

    const onMove = (e) => {
      x.set(e.clientX)
      y.set(e.clientY)
      const el = document.elementFromPoint(e.clientX, e.clientY)
      const interactive = el?.closest(
        'a, button, [role="button"], input, textarea, select, summary, [data-cursor-hover]'
      )
      setHovered(Boolean(interactive))
    }

    window.addEventListener('mousemove', onMove, { passive: true })
    return () => window.removeEventListener('mousemove', onMove)
  }, [enabled, x, y])

  if (!enabled) return null

  return (
    <motion.div
      aria-hidden
      className="pointer-events-none fixed left-0 top-0 z-[300]"
      style={{ x: sx, y: sy }}
    >
      <motion.div
        className="-translate-x-1/2 -translate-y-1/2 rounded-full border border-accent-primary bg-accent-primary/15"
        animate={{
          width: hovered ? 44 : 14,
          height: hovered ? 44 : 14,
          opacity: hovered ? 0.95 : 0.65,
        }}
        transition={{ type: 'spring', stiffness: 400, damping: 28 }}
      />
    </motion.div>
  )
}
