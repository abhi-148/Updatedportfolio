
import { motion } from 'framer-motion'
import {
  Download,
  FileText,
  ArrowUpRight,
  BriefcaseBusiness,
  GraduationCap,
  Code2,
  Sparkles,
} from 'lucide-react'

import { RESUME, useResume } from '../lib/util'
import { Reveal, Section } from './ui'

const highlights = [
  {
    icon: BriefcaseBusiness,
    label: 'Professional Experience',
    value: 'Full-Time + Internships',
  },
  {
    icon: Code2,
    label: 'Technical Stack',
    value: 'MERN Stack Development',
  },
  {
    icon: GraduationCap,
    label: 'Education',
    value: 'B.Tech Computer Science',
  },
]

export default function Resume() {
  const available = useResume()

  return (
    <Section id="resume">
      <Reveal>
        <div className="group relative overflow-hidden rounded-3xl border border-white/10 bg-white/[.025] px-6 py-16 text-center shadow-2xl sm:px-12 sm:py-20">

          {/* Background Effects */}
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_50%_0%,rgba(47,107,255,.22),transparent_65%)]" />

          <div className="pointer-events-none absolute -right-20 -top-20 h-64 w-64 rounded-full bg-neon/[.06] blur-[90px] transition-opacity duration-500 group-hover:bg-neon/10" />

          <div className="pointer-events-none absolute -bottom-24 -left-20 h-64 w-64 rounded-full bg-iris/[.08] blur-[90px]" />

          <div className="relative mx-auto max-w-3xl">

            {/* Icon */}
            <motion.div
              whileHover={{ rotate: 5, scale: 1.05 }}
              className="mx-auto mb-7 flex h-20 w-20 items-center justify-center rounded-2xl border border-neon/20 bg-neon/10 text-neon shadow-[0_0_35px_rgba(34,228,255,0.1)]"
            >
              <FileText size={38} strokeWidth={1.5} />
            </motion.div>

            {/* Label */}
            <div className="mb-5 flex items-center justify-center gap-2">
              <Sparkles size={14} className="text-neon" />

              <span className="font-mono text-[10px] uppercase tracking-[0.25em] text-neon">
                My Professional Profile
              </span>
            </div>

            {/* Heading */}
            <h2 className="font-display text-3xl font-semibold leading-tight text-grad sm:text-5xl">
              Want to Know More About My Work?
            </h2>

            <p className="mx-auto mt-5 max-w-xl text-sm leading-7 text-white/55 sm:text-base">
              Explore my professional experience, technical skills,
              education, projects and achievements in my latest resume.
            </p>

            {/* Highlights */}
            <div className="mt-10 grid gap-3 text-left sm:grid-cols-3">
              {highlights.map(({ icon: Icon, label, value }) => (
                <div
                  key={label}
                  className="rounded-2xl border border-white/[.08] bg-white/[.035] p-4 transition-all duration-300 hover:border-neon/25 hover:bg-neon/[.04]"
                >
                  <Icon size={19} className="mb-3 text-neon" />

                  <p className="text-xs font-medium text-white/80">
                    {label}
                  </p>

                  <p className="mt-1 text-[10px] leading-relaxed text-white/40">
                    {value}
                  </p>
                </div>
              ))}
            </div>

            {/* Download CTA */}
            <div className="mt-10">
              {available ? (
                <div className="flex flex-col items-center gap-4">

                  <a
                    href={RESUME}
                    download="Abhishek_Kumar_Resume.pdf"
                    className="btn btn-primary group/button"
                  >
                    <Download
                      size={18}
                      className="transition-transform group-hover/button:translate-y-0.5"
                    />

                    Download My Resume

                    <ArrowUpRight
                      size={17}
                      className="transition-transform group-hover/button:translate-x-1 group-hover/button:-translate-y-1"
                    />
                  </a>

                  <div className="flex items-center gap-2 font-mono text-[10px] uppercase tracking-widest text-emerald-400/80">
                    <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
                    Resume Available · PDF
                  </div>

                </div>
              ) : (
                <div className="flex flex-col items-center gap-4">

                  <span
                    className="btn btn-ghost cursor-not-allowed opacity-60"
                    aria-disabled="true"
                  >
                    Resume Coming Soon
                    <Download size={18} />
                  </span>

                  <p className="max-w-sm font-mono text-[10px] leading-relaxed text-white/35">
                    Add your resume PDF at
                    {' '}public/Abhishek_Kumar_Resume.pdf
                    {' '}to enable downloading.
                  </p>

                </div>
              )}
            </div>

          </div>
        </div>
      </Reveal>
    </Section>
  )
}
