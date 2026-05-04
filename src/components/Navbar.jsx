import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { navLinks, siteMeta } from '../data/site'

export default function Navbar({ activeId }) {
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <motion.header
      className={`fixed left-0 right-0 top-0 z-[150] transition-colors duration-300 ${
        scrolled ? 'border-b border-border bg-bg-secondary/75 backdrop-blur-md' : 'border-b border-transparent bg-transparent'
      }`}
      initial={{ y: -24, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.45, delay: 1.55, ease: [0.22, 1, 0.36, 1] }}
    >
      <nav
        className="mx-auto flex max-w-content items-center justify-between gap-6 px-5 py-4 md:px-8"
        aria-label="Primary"
      >
        <a
          href="#hero"
          className="cursor-target group flex items-center gap-2 font-display text-sm font-semibold tracking-tight text-text-primary md:text-base"
          aria-label={`${siteMeta.name}, back to top`}
        >
          <span className="inline-flex h-8 w-8 items-center justify-center rounded-lg border border-border bg-bg-card text-xs text-accent-primary shadow-sm">
            SG
          </span>
          <span className="hidden sm:inline">{siteMeta.name.split(' ')[0]}</span>
        </a>

        <ul className="flex flex-wrap items-center justify-end gap-1 text-[11px] font-label uppercase tracking-[0.14em] text-text-secondary md:gap-2 md:text-xs">
          {navLinks.map((link) => {
            const active = activeId === link.id
            return (
              <li key={link.id}>
                <a
                  href={`#${link.id}`}
                  className={`cursor-target relative rounded-md px-2 py-2 transition-colors hover:text-text-primary md:px-3 ${
                    active ? 'text-accent-primary' : ''
                  }`}
                  aria-current={active ? 'page' : undefined}
                  aria-label={`Navigate to ${link.label} section`}
                >
                  {link.label}
                  {active && (
                    <motion.span
                      layoutId="nav-underline"
                      className="absolute bottom-1 left-3 right-3 h-[2px] rounded-full bg-accent-primary shadow-glowamber"
                      transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                    />
                  )}
                </a>
              </li>
            )
          })}
        </ul>
      </nav>
    </motion.header>
  )
}
