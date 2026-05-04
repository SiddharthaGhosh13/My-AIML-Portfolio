import { motion } from 'framer-motion'
import { useScrollAnimation, staggerContainer, staggerItem } from '../hooks/useScrollAnimation'
import { projects } from '../data/projects'
import ProjectCard from './Projects/ProjectCard'

export default function Projects() {
  const { ref, inView, variants } = useScrollAnimation()

  return (
    <section
      id="projects"
      ref={ref}
      className="relative border-b border-border bg-bg-secondary/30 py-20 md:py-28"
      aria-labelledby="projects-heading"
    >
      <div className="mx-auto max-w-content px-5 md:px-8">
        <motion.div initial="hidden" animate={inView ? 'visible' : 'hidden'} variants={variants} className="mb-14">
          <p className="font-label text-[13px] uppercase tracking-[0.24em] text-accent-primary">
            Projects
          </p>
        </motion.div>

        <motion.div
          className="grid gap-6 lg:grid-cols-12 lg:gap-8"
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
          variants={staggerContainer}
        >
          {projects.map((project) => (
            <motion.div
              key={project.id}
              variants={staggerItem}
              className={project.featured ? 'lg:col-span-12' : 'lg:col-span-6'}
            >
              <ProjectCard project={project} />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
