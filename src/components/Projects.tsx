
import { Github, ExternalLink, Sparkles, Layers3 } from 'lucide-react'

import { projects } from '../data/portfolio'
import { Heading, Reveal, Section, Tilt } from './ui'

const bars = [40, 65, 50, 80, 62, 92, 74]

function Mock({ v }: { v: 'jobs' | 'dash' | 'erp' }) {
  const base = 'rounded bg-white/10'

  return (
    <div
      className="relative overflow-hidden rounded-2xl border border-white/10 bg-[#080c18]/95 p-4 shadow-2xl"
      style={{ transform: 'translateZ(40px)' }}
    >
      {/* Browser Header */}
      <div className="mb-5 flex items-center gap-2 border-b border-white/[.06] pb-3">
        <i className="h-2.5 w-2.5 rounded-full bg-red-400/70" />
        <i className="h-2.5 w-2.5 rounded-full bg-yellow-400/70" />
        <i className="h-2.5 w-2.5 rounded-full bg-green-400/70" />

        <div className={`${base} ml-4 h-2 flex-1 rounded-full`} />

        <span className="font-mono text-[8px] text-white/20">
          PREVIEW
        </span>
      </div>

      {/* Job Portal Mockup */}
      {v === 'jobs' && (
        <div className="space-y-3">
          <div className="mb-4 flex items-center justify-between">
            <div>
              <div className="mb-2 h-3 w-24 rounded bg-neon/60" />
              <div className={`${base} h-2 w-36`} />
            </div>

            <div className="rounded-lg bg-neon/10 px-3 py-2 font-mono text-[8px] text-neon">
              JOB PORTAL
            </div>
          </div>

          <div className="mb-3 flex gap-2">
            <div className="h-7 flex-1 rounded-lg border border-white/10 bg-white/[.04]" />
            <div className="h-7 w-16 rounded-lg bg-electric/40" />
          </div>

          {[0, 1, 2, 3].map((i) => (
            <div
              key={i}
              className="flex items-center gap-3 rounded-xl border border-white/[.06] bg-white/[.035] p-3 transition-colors hover:border-neon/20"
            >
              <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-gradient-to-br from-electric to-neon opacity-80">
                <Layers3 size={16} className="text-ink" />
              </div>

              <div className="flex-1 space-y-2">
                <div className={`${base} h-2 w-3/4`} />
                <div className={`${base} h-1.5 w-1/2 opacity-60`} />
              </div>

              <div className="h-5 w-12 rounded-full border border-neon/30 bg-neon/5" />
            </div>
          ))}
        </div>
      )}

      {/* Analytics Dashboard Mockup */}
      {v === 'dash' && (
        <div>
          <div className="mb-5 flex items-center justify-between">
            <div>
              <div className="mb-2 h-3 w-28 rounded bg-electric/70" />
              <div className={`${base} h-2 w-20`} />
            </div>

            <div className="rounded-lg border border-white/10 px-3 py-2 font-mono text-[8px] text-white/40">
              ANALYTICS
            </div>
          </div>

          <div className="mb-4 grid grid-cols-3 gap-2">
            {[0, 1, 2].map((i) => (
              <div
                key={i}
                className="rounded-xl border border-white/[.06] bg-white/[.04] p-3"
              >
                <div className={`${base} mb-3 h-1.5 w-1/2`} />
                <div className="h-3 w-3/4 rounded bg-neon/50" />
              </div>
            ))}
          </div>

          <div className="rounded-xl border border-white/[.06] bg-white/[.035] p-3">
            <div className="mb-4 flex items-center justify-between">
              <div className={`${base} h-2 w-20`} />
              <div className="h-2 w-10 rounded bg-neon/30" />
            </div>

            <div className="flex h-28 items-end gap-2">
              {bars.map((height, i) => (
                <div
                  key={i}
                  className="flex-1 rounded-t-md bg-gradient-to-t from-electric to-neon"
                  style={{
                    height: `${height}%`,
                    opacity: 0.4 + i * 0.08,
                  }}
                />
              ))}
            </div>
          </div>
        </div>
      )}

      {/* ERP Mockup */}
      {v === 'erp' && (
        <div>
          <div className="mb-4 flex items-center justify-between">
            <div>
              <div className="mb-2 h-3 w-24 rounded bg-iris/70" />
              <div className={`${base} h-2 w-32`} />
            </div>

            <div className="rounded-lg bg-iris/10 px-3 py-2 font-mono text-[8px] text-iris">
              ERP SYSTEM
            </div>
          </div>

          <div className="flex gap-3">
            <div className="w-1/5 space-y-3 rounded-lg border border-white/[.06] bg-white/[.035] p-2">
              {[0, 1, 2, 3, 4].map((i) => (
                <div
                  key={i}
                  className={`h-2 rounded ${
                    i === 1 ? 'bg-iris/60' : 'bg-white/10'
                  }`}
                />
              ))}
            </div>

            <div className="flex-1 space-y-2">
              <div className="grid grid-cols-4 gap-2">
                {[0, 1, 2].map((i) => (
                  <div
                    key={i}
                    className="h-10 rounded-lg border border-white/[.06] bg-white/[.04]"
                  />
                ))}
              </div>

              <div className="space-y-2 rounded-lg border border-white/[.06] bg-white/[.035] p-2">
                {[0, 1, 2, 3, 4].map((i) => (
                  <div
                    key={i}
                    className={`grid grid-cols-4 gap-2 rounded p-2 ${
                      i === 0 ? 'bg-iris/15' : 'bg-white/[.025]'
                    }`}
                  >
                    {[0, 1, 2, 3].map((j) => (
                      <div
                        key={j}
                        className={`${base} h-1.5`}
                      />
                    ))}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default function Projects() {
  return (
    <Section id="projects">
      <Heading
        kicker="04 — Selected Work"
        title="Projects That Define My Journey"
        sub="Personal products and real-world applications built using modern web technologies."
      />

      <div className="space-y-12 md:space-y-20">

        {projects.map((project, index) => (
          <Reveal key={project.id} delay={index * 0.08}>
            <Tilt
              max={4}
              className="group rounded-3xl border border-white/[.07] bg-white/[.015] p-5 transition-all duration-500 hover:border-neon/20 hover:bg-white/[.025] sm:p-8 lg:p-10"
            >
              <div
                className={`grid items-center gap-9 md:grid-cols-2 md:gap-12 ${
                  index % 2
                    ? 'md:[&>*:first-child]:order-2'
                    : ''
                }`}
                style={{ transformStyle: 'preserve-3d' }}
              >

                {/* Project Visual */}
                <div className="relative">

                  <div
                    className={`absolute -inset-8 rounded-full blur-[65px] transition-opacity duration-500 group-hover:opacity-100 ${
                      index === 1
                        ? 'bg-electric/20'
                        : index === 2
                          ? 'bg-iris/20'
                          : 'bg-neon/15'
                    }`}
                  />

                  <div className="relative transition-transform duration-500 group-hover:scale-[1.02]">
                    <Mock v={project.mock} />
                  </div>

                  <div className="absolute -bottom-4 -right-3 rounded-xl border border-white/10 bg-ink/90 px-4 py-2 shadow-xl backdrop-blur-xl">
                    <div className="flex items-center gap-2">
                      <Sparkles size={13} className="text-neon" />

                      <span className="font-mono text-[9px] uppercase tracking-widest text-white/60">
                        Project {project.id}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Project Details */}
                <div className="relative">

                  {/* Meta Information */}
                  <div className="mb-5 flex flex-wrap items-center gap-2 font-mono text-[10px] uppercase tracking-wider">

                    <span className="text-white/35">
                      {project.id}
                    </span>

                    <span className="rounded-full border border-white/10 bg-white/[.03] px-3 py-1 text-white/60">
                      {project.type}
                    </span>

                    {project.status && (
                      <span className="rounded-full border border-neon/20 bg-neon/10 px-3 py-1 text-neon">
                        {project.status}
                      </span>
                    )}

                  </div>

                  {/* Title */}
                  <h3 className="font-display text-2xl font-semibold leading-tight text-white transition-colors duration-300 group-hover:text-neon sm:text-3xl lg:text-4xl">
                    {project.title}
                  </h3>

                  {/* Description */}
                  <p className="mt-4 text-sm leading-7 text-white/55 sm:text-base">
                    {project.desc}
                  </p>

                  {/* Features */}
                  <div className="mb-3 mt-7">
                    <p className="mb-4 flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.2em] text-neon">
                      <span className="h-px w-5 bg-neon/60" />
                      {project.ptsLabel}
                    </p>

                    <ul className="grid gap-x-5 gap-y-3 text-sm text-white/60 sm:grid-cols-2">
                      {project.pts.map((point) => (
                        <li
                          key={point}
                          className="flex items-start gap-2.5 leading-relaxed"
                        >
                          <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-neon shadow-[0_0_8px_#22e4ff]" />
                          {point}
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Technology Stack */}
                  <div className="mt-7">
                    <p className="mb-3 font-mono text-[10px] uppercase tracking-[0.2em] text-white/35">
                      Technologies Used
                    </p>

                    <div className="flex flex-wrap gap-2">
                      {project.stack.map((technology) => (
                        <span
                          key={technology}
                          className="rounded-full border border-white/[.08] bg-white/[.04] px-3 py-1.5 text-[11px] text-white/65 transition-all duration-300 hover:border-neon/30 hover:bg-neon/5 hover:text-neon"
                        >
                          {technology}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Project Links */}
                  {(project.live || project.repo) && (
                    <div className="mt-8 flex flex-wrap gap-3">

                      {project.live && (
                        <a
                          className="btn btn-primary !py-2.5"
                          href={project.live}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          Live Preview
                          <ExternalLink size={16} />
                        </a>
                      )}

                      {project.repo && (
                        <a
                          className="btn btn-ghost !py-2.5"
                          href={project.repo}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          <Github size={16} />
                          Source Code
                        </a>
                      )}

                    </div>
                  )}

                </div>
              </div>
            </Tilt>
          </Reveal>
        ))}

      </div>
    </Section>
  )
}
