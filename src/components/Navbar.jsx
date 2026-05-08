import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { RiCloseLine, RiMenu3Line } from 'react-icons/ri'
import { navLinks, siteMeta } from '../data/site'

export default function Navbar({ activeId }) {
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const closeMobileMenu = () => setMobileOpen(false)

  return (
    <motion.header
      className={`fixed left-0 right-0 top-0 z-[150] transition-colors duration-300 ${
        scrolled ? 'border-b border-border bg-bg-secondary/75 backdrop-blur-md' : 'border-b border-transparent bg-bg-secondary/55 backdrop-blur-md'
      }`}
      initial={{ y: -24, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.45, delay: 1.55, ease: [0.22, 1, 0.36, 1] }}
    >
      <nav
        className="mx-auto flex w-full max-w-6xl items-center justify-between gap-4 px-4 py-4 md:gap-6 md:px-6 lg:px-8"
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

        <ul className="hidden flex-wrap items-center justify-end gap-1 text-[11px] font-label uppercase tracking-[0.14em] text-text-secondary md:flex md:gap-2 md:text-xs">
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
        <button
          type="button"
          className="cursor-target inline-flex h-11 w-11 items-center justify-center rounded-lg border border-border bg-bg-card text-text-primary transition hover:border-accent-secondary/40 hover:text-accent-secondary md:hidden"
          onClick={() => setMobileOpen((prev) => !prev)}
          aria-expanded={mobileOpen}
          aria-controls="mobile-nav-menu"
          aria-label={mobileOpen ? 'Close navigation menu' : 'Open navigation menu'}
        >
          {mobileOpen ? <RiCloseLine className="h-6 w-6" aria-hidden /> : <RiMenu3Line className="h-6 w-6" aria-hidden />}
        </button>
      </nav>
      <AnimatePresence initial={false}>
        {mobileOpen && (
          <motion.div
            id="mobile-nav-menu"
            className="overflow-hidden border-t border-border bg-bg-secondary/90 backdrop-blur-md md:hidden"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
          >
            <ul className="mx-auto flex w-full max-w-6xl flex-col px-4 py-3 md:px-6 lg:px-8">
              {navLinks.map((link) => {
                const active = activeId === link.id
                return (
                  <li key={link.id}>
                    <a
                      href={`#${link.id}`}
                      onClick={closeMobileMenu}
                      className={`cursor-target flex min-h-11 w-full items-center rounded-md px-2 py-2 font-label text-xs uppercase tracking-[0.14em] transition-colors ${
                        active ? 'text-accent-primary' : 'text-text-secondary hover:text-text-primary'
                      }`}
                      aria-current={active ? 'page' : undefined}
                      aria-label={`Navigate to ${link.label} section`}
                    >
                      {link.label}
                    </a>
                  </li>
                )
              })}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  )
}
