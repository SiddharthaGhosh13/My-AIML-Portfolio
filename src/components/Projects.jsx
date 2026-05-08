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
      className="relative border-b border-border bg-bg-secondary/30 px-4 py-16 md:px-6 md:py-24 lg:px-8"
      aria-labelledby="projects-heading"
    >
      <div className="mx-auto w-full max-w-6xl">
        <motion.div initial="hidden" animate={inView ? 'visible' : 'hidden'} variants={variants} className="mb-14">
          <p className="font-label text-[13px] uppercase tracking-[0.24em] text-accent-primary">
            Projects
          </p>
        </motion.div>

        <motion.div
          className="grid grid-cols-1 gap-6 lg:grid-cols-2 lg:gap-8"
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
          variants={staggerContainer}
        >
          {projects.map((project) => (
            <motion.div
              key={project.id}
              variants={staggerItem}
              className={project.featured ? 'col-span-1 lg:col-span-2' : 'col-span-1'}
            >
              <ProjectCard project={project} />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
