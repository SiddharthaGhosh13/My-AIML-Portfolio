import { motion } from 'framer-motion'
import { FaGithub } from 'react-icons/fa'
import { FaArrowUpRightFromSquare } from 'react-icons/fa6'

const statusStyles = {
  development: 'border-accent-primary/40 bg-accent-primary/10 text-accent-primary',
  complete: 'border-accent-secondary/35 bg-accent-secondary/10 text-accent-secondary',
  ongoing: 'border-text-muted/60 bg-bg-secondary text-text-secondary',
}

export default function ProjectCard({ project }) {
  const featured = Boolean(project.featured)

  return (
    <motion.article
      layout
      whileHover={{ y: -8 }}
      transition={{ type: 'spring', stiffness: 320, damping: 26 }}
      className={`group relative flex h-full flex-col overflow-hidden rounded-2xl border border-border bg-bg-card shadow-card transition-shadow duration-300 hover:border-accent-primary/35 hover:shadow-glowamber ${
        featured ? 'ring-1 ring-accent-primary/25' : ''
      }`}
      aria-label={`Project: ${project.title}`}
    >
      <div className={`relative overflow-hidden ${featured ? 'min-h-[220px] lg:min-h-[280px]' : 'min-h-[160px]'}`}>
        <img
          src={project.image}
          alt={project.imageAlt}
          loading="lazy"
          decoding="async"
          className="h-full w-full object-cover opacity-90 transition duration-500 group-hover:scale-[1.03] group-hover:opacity-100"
        />
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-bg-card via-bg-card/40 to-transparent" />
        <div className="absolute left-4 top-4 flex flex-wrap gap-2">
          <span
            className={`rounded-full border px-3 py-1 font-label text-[10px] uppercase tracking-wider ${statusStyles[project.statusVariant]}`}
          >
            {project.status}
          </span>
          {project.founderBadge && (
            <span className="rounded-full border border-accent-primary/60 bg-bg-primary/70 px-3 py-1 font-label text-[10px] uppercase tracking-wider text-accent-primary shadow-glowamber backdrop-blur-sm">
              Founder&apos;s Project
            </span>
          )}
        </div>
      </div>

      <div className={`flex flex-1 flex-col gap-4 ${featured ? 'p-7 lg:p-9' : 'p-6'}`}>
        <div className="flex flex-wrap gap-2">
          {project.categories.map((c) => (
            <span
              key={c}
              className="rounded-md border border-border bg-bg-secondary px-2 py-1 font-label text-[10px] uppercase tracking-wide text-text-muted"
            >
              {c}
            </span>
          ))}
        </div>

        <div className="space-y-2">
          <h3
            className={`font-display font-semibold tracking-tight text-text-primary ${
              featured ? 'text-2xl lg:text-3xl' : 'text-xl'
            }`}
          >
            {project.title}
          </h3>
          <p className="font-body text-sm leading-relaxed text-text-secondary md:text-base">{project.description}</p>
        </div>

        {project.features && (
          <ul className="space-y-2 border-l border-accent-secondary/25 pl-4 font-body text-sm text-text-secondary">
            {project.features.map((f) => (
              <li key={f}>{f}</li>
            ))}
          </ul>
        )}

        {project.impact && (
          <p className="rounded-lg border border-border bg-bg-secondary/80 p-3 font-label text-[11px] leading-relaxed text-text-secondary">
            <span className="text-accent-secondary">impact:</span> {project.impact}
          </p>
        )}

        <div className="flex flex-wrap gap-2">
          {project.techStack.map((t) => (
            <span
              key={t}
              className="rounded-full border border-border px-2 py-1 font-label text-[10px] uppercase tracking-wide text-text-muted"
            >
              {t}
            </span>
          ))}
        </div>

        {project.metrics && (
          <div className="flex flex-wrap gap-2">
            {project.metrics.map((m) => (
              <span
                key={m}
                className="rounded-md bg-accent-primary/10 px-3 py-1 font-label text-[11px] text-accent-primary"
              >
                {m}
              </span>
            ))}
          </div>
        )}

        <div className="mt-auto flex flex-wrap gap-3 pt-2">
          {project.links.map((link) => {
            const external = link.external
            const Icon = link.label === 'GitHub' ? FaGithub : FaArrowUpRightFromSquare
            return (
              <a
                key={link.label}
                href={link.href}
                {...(external ? { target: '_blank', rel: 'noreferrer' } : {})}
                className="cursor-target inline-flex items-center gap-2 rounded-lg border border-border px-4 py-2 font-label text-[11px] uppercase tracking-wider text-text-primary transition hover:border-accent-secondary/50 hover:text-accent-secondary focus-visible:ring-2 focus-visible:ring-accent-secondary"
                aria-label={`${link.label} for ${project.title}`}
              >
                <Icon className="h-3.5 w-3.5" aria-hidden />
                {link.label}
              </a>
            )
          })}
        </div>
      </div>
    </motion.article>
  )
}
