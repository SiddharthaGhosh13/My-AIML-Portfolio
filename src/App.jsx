import { useEffect, useState } from 'react'
import LoadingScreen from './components/LoadingScreen'
import CustomCursor from './components/CustomCursor'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import About from './components/About'
import Skills from './components/Skills'
import Projects from './components/Projects'
import Roadmap from './components/Roadmap'
import Experience from './components/Experience'
import Vision from './components/Vision'
import Contact from './components/Contact'
import Footer from './components/Footer'
import { navLinks } from './data/site'

export default function App() {
  const [loading, setLoading] = useState(true)
  const [activeId, setActiveId] = useState('hero')

  useEffect(() => {
    const timer = window.setTimeout(() => setLoading(false), 1500)
    return () => window.clearTimeout(timer)
  }, [])

  useEffect(() => {
    if (loading) return undefined

    const sections = navLinks
      .map((link) => document.getElementById(link.id))
      .filter((el) => el instanceof HTMLElement)

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && entry.target.id) {
            setActiveId(entry.target.id)
          }
        })
      },
      { threshold: 0.35, rootMargin: '-12% 0px -45% 0px' }
    )

    sections.forEach((section) => observer.observe(section))
    return () => observer.disconnect()
  }, [loading])

  return (
    <>
      <LoadingScreen visible={loading} />
      <a href="#main-content" className="skip-link">
        Skip to content
      </a>

      {!loading && (
        <>
          <CustomCursor />
          <Navbar activeId={activeId} />
        </>
      )}

      {!loading && (
        <main id="main-content" tabIndex={-1}>
          <Hero />
          <About />
          <Skills />
          <Projects />
          <Roadmap />
          <Experience />
          <Vision />
          <Contact />
        </main>
      )}

      {!loading && <Footer />}
    </>
  )
}
