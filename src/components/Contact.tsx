
import { useState, type FormEvent } from 'react'
import {
  Github,
  Linkedin,
  Mail,
  Phone,
  Send,
  CheckCircle2,
  AlertCircle,
  ArrowUpRight,
  Code2,
} from 'lucide-react'

import { P } from '../data/portfolio'
import { Reveal, Section } from './ui'

const ENDPOINT = import.meta.env.VITE_FORM_ENDPOINT as string | undefined

type FormData = {
  name: string
  email: string
  subject: string
  message: string
}

type FormErrors = Partial<Record<keyof FormData, string>>

const initialForm: FormData = {
  name: '',
  email: '',
  subject: '',
  message: '',
}

const validate = (form: FormData): FormErrors => {
  const errors: FormErrors = {}

  if (form.name.trim().length < 2) {
    errors.name = 'Please enter your full name.'
  }

  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email.trim())) {
    errors.email = 'Please enter a valid email address.'
  }

  if (form.subject.trim().length < 3) {
    errors.subject = 'Please enter a subject.'
  }

  if (form.message.trim().length < 10) {
    errors.message = 'Message must contain at least 10 characters.'
  }

  return errors
}

type Status = 'idle' | 'sending' | 'sent' | 'mailto' | 'error'

export default function Contact() {
  const [form, setForm] = useState<FormData>(initialForm)
  const [errors, setErrors] = useState<FormErrors>({})
  const [status, setStatus] = useState<Status>('idle')

  const updateField = (key: keyof FormData, value: string) => {
    setForm((prev) => ({ ...prev, [key]: value }))

    if (errors[key]) {
      setErrors((prev) => ({ ...prev, [key]: undefined }))
    }

    if (status !== 'idle') {
      setStatus('idle')
    }
  }

  const submit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    const validationErrors = validate(form)
    setErrors(validationErrors)

    if (Object.keys(validationErrors).length > 0) return

    // Fallback: Open visitor's email application
    if (!ENDPOINT) {
      const subject = encodeURIComponent(form.subject)

      const body = encodeURIComponent(
        `${form.message}\n\nRegards,\n${form.name}\n${form.email}`
      )

      window.location.href =
        `mailto:${P.links.email}?subject=${subject}&body=${body}`

      setStatus('mailto')
      return
    }

    // Submit through configured form endpoint
    setStatus('sending')

    try {
      const response = await fetch(ENDPOINT, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        body: JSON.stringify(form),
      })

      if (!response.ok) {
        throw new Error('Message submission failed.')
      }

      setStatus('sent')
      setForm(initialForm)
      setErrors({})
    } catch {
      setStatus('error')
    }
  }

  const fieldClass =
    'w-full rounded-xl border border-white/10 bg-white/[.04] px-4 py-3 text-white placeholder:text-white/25 outline-none transition duration-300 focus:border-neon/60 focus:bg-neon/[.04]'

  const renderField = (
    key: keyof FormData,
    label: string,
    placeholder: string,
    type = 'text'
  ) => (
    <div>
      <label
        htmlFor={key}
        className="mb-2 block text-sm font-medium text-white/65"
      >
        {label}
      </label>

      {key === 'message' ? (
        <textarea
          id={key}
          rows={5}
          value={form[key]}
          placeholder={placeholder}
          onChange={(event) => updateField(key, event.target.value)}
          aria-invalid={!!errors[key]}
          aria-describedby={errors[key] ? `${key}-error` : undefined}
          className={`${fieldClass} resize-none`}
        />
      ) : (
        <input
          id={key}
          type={type}
          value={form[key]}
          placeholder={placeholder}
          onChange={(event) => updateField(key, event.target.value)}
          aria-invalid={!!errors[key]}
          aria-describedby={errors[key] ? `${key}-error` : undefined}
          className={fieldClass}
        />
      )}

      {errors[key] && (
        <p
          id={`${key}-error`}
          role="alert"
          className="mt-1.5 text-xs text-red-400"
        >
          {errors[key]}
        </p>
      )}
    </div>
  )

  const contactLinks = [
    {
      icon: Mail,
      label: P.links.email,
      href: `mailto:${P.links.email}`,
    },
    {
      icon: Phone,
      label: P.links.phone,
      href: P.links.tel,
    },
    {
      icon: Linkedin,
      label: 'Connect on LinkedIn',
      href: P.links.linkedin,
    },
    {
      icon: Github,
      label: 'Explore my GitHub',
      href: P.links.github,
    },
  ]

  return (
    <Section id="contact">
      <div className="grid gap-12 md:grid-cols-[1fr_1.15fr] md:gap-16">

        {/* Contact Introduction */}
        <Reveal>
          <p className="mb-5 flex items-center gap-3 font-mono text-xs uppercase tracking-[0.3em] text-neon">
            <span className="h-px w-10 bg-neon/60" />
            06 — Get In Touch
          </p>

          <h2 className="font-display text-4xl font-semibold leading-[1.05] sm:text-5xl md:text-6xl">
            <span className="text-grad">
              Let's Build Something Amazing Together.
            </span>
          </h2>

          <p className="mt-6 max-w-lg text-base leading-relaxed text-white/55">
            Have a project idea, collaboration opportunity, or a
            developer role in mind? I'd love to connect, exchange
            ideas, and explore how we can build something impactful.
          </p>

          {/* Professional Availability */}
          <div className="mt-8 flex items-start gap-4 rounded-2xl border border-neon/20 bg-neon/[.05] p-4">
            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-neon/10 text-neon">
              <Code2 size={22} />
            </div>

            <div>
              <h3 className="font-semibold text-white">
                Open to Developer Opportunities
              </h3>

              <p className="mt-1 text-sm leading-relaxed text-white/50">
                MERN Stack Developer · Full Stack Developer ·
                Software Engineer
              </p>
            </div>
          </div>

          {/* Social and Contact Links */}
          <ul className="mt-8 space-y-3">
            {contactLinks.map(({ icon: Icon, label, href }) => {
              const external = href.startsWith('http')

              return (
                <li key={label}>
                  <a
                    href={href}
                    target={external ? '_blank' : undefined}
                    rel={external ? 'noopener noreferrer' : undefined}
                    className="group flex items-center gap-4 rounded-2xl border border-white/10 bg-white/[.03] p-4 transition-all duration-300 hover:-translate-y-0.5 hover:border-neon/40 hover:bg-neon/[.05]"
                  >
                    <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-neon/10 text-neon transition-transform duration-300 group-hover:scale-110">
                      <Icon size={20} />
                    </span>

                    <span className="min-w-0 flex-1 break-all text-sm text-white/70 transition-colors group-hover:text-white">
                      {label}
                    </span>

                    <ArrowUpRight
                      size={17}
                      className="shrink-0 text-white/25 transition-all group-hover:-translate-y-1 group-hover:translate-x-1 group-hover:text-neon"
                    />
                  </a>
                </li>
              )
            })}
          </ul>
        </Reveal>

        {/* Contact Form */}
        <Reveal delay={0.12}>
          <form
            onSubmit={submit}
            noValidate
            className="glass space-y-5 rounded-2xl p-6 sm:p-9"
          >
            <div>
              <p className="font-mono text-xs uppercase tracking-[0.2em] text-neon">
                Send a Message
              </p>

              <h3 className="mt-2 font-display text-2xl font-semibold text-white">
                Let's Talk!
              </h3>

              <p className="mt-2 text-sm text-white/45">
                Fill in the details and I'll get back to you.
              </p>
            </div>

            <div className="grid gap-5 sm:grid-cols-2">
              {renderField(
                'name',
                'Your Name',
                'Enter your name'
              )}

              {renderField(
                'email',
                'Email Address',
                'you@example.com',
                'email'
              )}
            </div>

            {renderField(
              'subject',
              'Subject',
              'Job opportunity / Project / Collaboration'
            )}

            {renderField(
              'message',
              'Your Message',
              'Tell me about your opportunity or project...'
            )}

            <button
              type="submit"
              disabled={status === 'sending'}
              className="btn btn-primary flex w-full items-center justify-center gap-3 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {status === 'sending' ? (
                <>
                  Sending Message...
                  <span className="h-4 w-4 animate-spin rounded-full border-2 border-white/30 border-t-white" />
                </>
              ) : (
                <>
                  Send Message
                  <Send size={17} />
                </>
              )}
            </button>

            {/* Form Feedback */}
            <div aria-live="polite" className="min-h-6">

              {status === 'sent' && (
                <p className="flex items-start gap-2 text-sm text-emerald-400">
                  <CheckCircle2 size={18} className="shrink-0" />
                  Message submitted successfully. Thank you for reaching out!
                </p>
              )}

              {status === 'mailto' && (
                <p className="flex items-start gap-2 text-sm text-neon">
                  <CheckCircle2 size={18} className="shrink-0" />
                  Your email application is opening with the message
                  pre-filled. Press Send there to deliver it.
                </p>
              )}

              {status === 'error' && (
                <p className="flex items-start gap-2 text-sm text-red-400">
                  <AlertCircle size={18} className="shrink-0" />
                  Unable to submit right now. Please email me directly
                  at {P.links.email}.
                </p>
              )}

            </div>

            <p className="text-center text-xs text-white/30">
              Thank you for visiting my portfolio.
            </p>

          </form>
        </Reveal>

      </div>
    </Section>
  )
}
