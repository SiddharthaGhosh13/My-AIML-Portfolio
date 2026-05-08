import { useState } from 'react'
import emailjs from '@emailjs/browser'
import { motion } from 'framer-motion'
import { FaGithub, FaLinkedin } from 'react-icons/fa'
import { HiOutlineMail } from 'react-icons/hi'
import { useScrollAnimation, staggerContainer, staggerItem } from '../hooks/useScrollAnimation'
import { siteMeta } from '../data/site'

/*
 * EmailJS (https://www.emailjs.com/) — template variables: {{from_name}}, {{reply_to}}, {{message}}
 * Credentials configured per project owner request. Rotate keys from the EmailJS dashboard if this repo is public.
 */

//Update Credentials
const SERVICE_ID = 'service_t2qj5l7'
const TEMPLATE_ID = 'template_55x7d7h'
const PUBLIC_KEY = 'I8Nomv9Y10EEPdxOw'

export default function Contact() {
  const { ref, inView, variants } = useScrollAnimation()
  const [status, setStatus] = useState('idle')
  const [error, setError] = useState('')

  const handleSubmit = async (e) => {
    e.preventDefault()
    setStatus('sending')
    setError('')

    const form = e.target
    const fromName = form.from_name.value.trim()
    const replyTo = form.reply_to.value.trim()
    const message = form.message.value.trim()

    if (!fromName || !replyTo || !message) {
      setStatus('idle')
      setError('Please fill in every field.')
      return
    }

    try {
      await emailjs.send(
        SERVICE_ID,
        TEMPLATE_ID,
        {
          from_name: fromName,
          reply_to: replyTo,
          message,
          sent_at: new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' }),
        },
        { publicKey: PUBLIC_KEY }
      )
      setStatus('success')
      form.reset()
    } catch (err) {
      console.error(err)
      setStatus('error')
      setError('Something went wrong sending your message. Try email directly.')
    }
  }

  return (
    <section
      id="contact"
      ref={ref}
      className="relative px-4 py-16 md:px-6 md:py-24 lg:px-8"
      aria-labelledby="contact-heading"
    >
      <div className="mx-auto w-full max-w-6xl">
        <motion.div initial="hidden" animate={inView ? 'visible' : 'hidden'} variants={variants} className="mb-12">
          <p className="font-label text-[13px] uppercase tracking-[0.24em] text-accent-secondary">
            Contact
          </p>
          <h2 id="contact-heading" className="mt-3 font-display text-2xl font-semibold text-text-primary md:text-5xl">
            Let&apos;s Build Something Real!
          </h2>
          <p className="mt-4 max-w-2xl font-body text-base text-text-secondary md:text-lg">{siteMeta.contactSubtitle}</p>
          <p className="mt-4 inline-flex flex-wrap gap-x-3 gap-y-2 rounded-lg border border-border bg-bg-card px-4 py-3 font-label text-[11px] uppercase tracking-[0.14em] text-text-muted">
            <span className="text-accent-primary">Currently open to:</span>
            <span>AI/ML Internships</span>
            <span className="text-text-muted">·</span>
            <span>NLP Research Roles</span>
            <span className="text-text-muted">·</span>
            <span>Technical Collaborations</span>
          </p>
        </motion.div>

        <motion.div
          className="grid gap-8 lg:grid-cols-2 lg:gap-10"
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
          variants={staggerContainer}
        >
          <motion.div variants={staggerItem}>
            <form
              onSubmit={handleSubmit}
              className="w-full space-y-5 rounded-2xl border border-border bg-bg-card p-4 shadow-card md:p-8"
              noValidate
              aria-describedby={error ? 'contact-error' : undefined}
            >
              <div className="space-y-2">
                <label htmlFor="from_name" className="font-label text-[11px] uppercase tracking-wider text-text-muted">
                  Name
                </label>
                <input
                  id="from_name"
                  name="from_name"
                  type="text"
                  autoComplete="name"
                  required
                  className="w-full rounded-lg border border-border bg-bg-secondary px-4 py-3 font-body text-sm text-text-primary placeholder:text-text-muted focus:border-accent-secondary focus:outline-none focus:ring-2 focus:ring-accent-secondary/40"
                  aria-required
                />
              </div>
              <div className="space-y-2">
                <label htmlFor="reply_to" className="font-label text-[11px] uppercase tracking-wider text-text-muted">
                  Email
                </label>
                <input
                  id="reply_to"
                  name="reply_to"
                  type="email"
                  autoComplete="email"
                  required
                  className="w-full rounded-lg border border-border bg-bg-secondary px-4 py-3 font-body text-sm text-text-primary placeholder:text-text-muted focus:border-accent-secondary focus:outline-none focus:ring-2 focus:ring-accent-secondary/40"
                  aria-required
                />
              </div>
              <div className="space-y-2">
                <label htmlFor="message" className="font-label text-[11px] uppercase tracking-wider text-text-muted">
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows={5}
                  required
                  className="w-full resize-y rounded-lg border border-border bg-bg-secondary px-4 py-3 font-body text-sm text-text-primary placeholder:text-text-muted focus:border-accent-secondary focus:outline-none focus:ring-2 focus:ring-accent-secondary/40"
                  aria-required
                />
              </div>

              {error && (
                <p id="contact-error" role="alert" className="font-body text-sm text-red-400">
                  {error}
                </p>
              )}
              {status === 'success' && (
                <p className="font-body text-sm text-accent-secondary" role="status">
                  Message Sent Succesfully. I&apos;ll Get back to You Shortly!
                </p>
              )}

              <button
                type="submit"
                disabled={status === 'sending'}
                className="cursor-target inline-flex w-full items-center justify-center rounded-lg bg-accent-primary px-6 py-3 font-label text-xs font-semibold uppercase tracking-wider text-bg-primary shadow-glowamber transition hover:bg-accent-primary/90 disabled:cursor-not-allowed disabled:opacity-60 md:w-auto"
                aria-label="Send message via EmailJS"
              >
                {status === 'sending' ? 'Sending…' : 'Send Message'}
              </button>
            </form>
          </motion.div>

          <motion.div variants={staggerItem} className="space-y-4 md:space-y-6">
            <div className="rounded-2xl border border-border bg-bg-secondary/80 p-6">
              <p className="font-label text-[11px] uppercase tracking-[0.18em] text-text-muted">Direct</p>
              <a
                href={`mailto:${siteMeta.email}`}
                className="mt-3 flex min-h-11 items-center gap-3 text-sm font-body text-text-primary transition hover:text-accent-primary"
                aria-label={`Email ${siteMeta.email}`}
              >
                <HiOutlineMail className="h-5 w-5 text-accent-secondary" aria-hidden />
                {siteMeta.email}
              </a>
            </div>

            <div className="rounded-2xl border border-border bg-bg-secondary/80 p-6">
              <p className="font-label text-[11px] uppercase tracking-[0.18em] text-text-muted">Profiles</p>
              <div className="mt-4 flex flex-col gap-3 sm:flex-row">
                <a
                  href={siteMeta.github}
                  target="_blank"
                  rel="noreferrer"
                  className="cursor-target inline-flex h-12 w-12 items-center justify-center rounded-xl border border-border bg-bg-card text-text-secondary transition hover:border-accent-primary/45 hover:text-accent-primary"
                  aria-label="GitHub"
                >
                  <FaGithub className="h-5 w-5" aria-hidden />
                </a>
                <a
                  href={siteMeta.linkedin}
                  target="_blank"
                  rel="noreferrer"
                  className="cursor-target inline-flex h-12 w-12 items-center justify-center rounded-xl border border-border bg-bg-card text-text-secondary transition hover:border-accent-secondary/45 hover:text-accent-secondary"
                  aria-label="LinkedIn"
                >
                  <FaLinkedin className="h-5 w-5" aria-hidden />
                </a>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
