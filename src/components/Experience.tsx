
import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import {
  BriefcaseBusiness,
  Code2,
  Globe,
  ArrowUpRight,
  MapPin,
} from 'lucide-react'

import { experience } from '../data/portfolio'
import { Heading, Reveal, Section } from './ui'

gsap.registerPlugin(ScrollTrigger)

const experienceIcons = [Code2, Globe, BriefcaseBusiness]

export default function Experience() {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const element = ref.current
    if (!element) return

    const ctx = gsap.context(() => {
      gsap.fromTo(
        '.tl-progress',
        { scaleY: 0 },
        {
          scaleY: 1,
          ease: 'none',
          transformOrigin: 'top',
          scrollTrigger: {
            trigger: element,
            start: 'top 65%',
            end: 'bottom 75%',
            scrub: true,
          },
        }
      )
    }, element)

    return () => ctx.revert()
  }, [])

  return (
    <Section id="experience">
      <Heading
        kicker="03 — Professional Journey"
        title="Experience & Career Journey"
      />

      <div
        ref={ref}
        className="relative pl-8 sm:pl-14"
      >
        {/* Timeline Background */}
        <div className="absolute bottom-0 left-[7px] top-2 w-px bg-white/10 sm:left-[15px]">
          <div className="tl-progress h-full w-full origin-top bg-gradient-to-b from-neon via-electric to-iris shadow-[0_0_14px_#22e4ff]" />
        </div>

        {experience.map((item, index) => {
          const Icon =
            experienceIcons[index % experienceIcons.length]

          return (
            <Reveal
              key={item.org}
              delay={index * 0.12}
              className="relative mb-10 last:mb-0"
            >
              {/* Timeline Node */}
              <span className="absolute -left-[33px] top-8 flex h-4 w-4 items-center justify-center rounded-full border-2 border-neon bg-ink shadow-[0_0_18px_#22e4ff] sm:-left-[57px]">
                <span className="h-1.5 w-1.5 rounded-full bg-neon" />
              </span>

              {/* Experience Card */}
              <div className="glass group relative overflow-hidden rounded-2xl p-6 transition-all duration-500 hover:-translate-y-1 hover:border-neon/30 sm:p-8">

                {/* Hover Glow */}
                <div className="pointer-events-none absolute -right-20 -top-20 h-48 w-48 rounded-full bg-neon/[.06] blur-3xl opacity-0 transition-opacity duration-500 group-hover:opacity-100" />

                <div className="relative">

                  {/* Header */}
                  <div className="flex flex-wrap items-start justify-between gap-5">

                    <div className="flex min-w-0 gap-4">
                      <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl border border-neon/20 bg-neon/10 text-neon transition-transform duration-300 group-hover:scale-110">
                        <Icon size={23} />
                      </div>

                      <div>
                        <h3 className="font-display text-xl font-semibold text-white sm:text-2xl">
                          {item.org}
                        </h3>

                        <p className="mt-1 font-medium text-neon">
                          {item.role}
                        </p>
                      </div>
                    </div>

                    <div className="text-left sm:text-right">
                      <p className="font-mono text-xs text-white/55">
                        {item.when}
                      </p>

                      <span className="mt-2 inline-flex items-center gap-1.5 rounded-full border border-white/10 bg-white/[.04] px-3 py-1 font-mono text-[10px] uppercase tracking-wider text-white/60">
                        <MapPin size={11} />
                        {item.mode}
                      </span>
                    </div>

                  </div>

                  {/* Responsibilities */}
                  <div className="mt-7 border-t border-white/[.08] pt-5">
                    <p className="mb-4 font-mono text-[10px] uppercase tracking-[0.2em] text-white/35">
                      Key Responsibilities & Contributions
                    </p>

                    <ul className="space-y-3">
                      {item.pts.map((point) => (
                        <li
                          key={point}
                          className="flex items-start gap-3 text-sm leading-relaxed text-white/60 transition-colors hover:text-white/85"
                        >
                          <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-neon shadow-[0_0_8px_#22e4ff]" />
                          {point}
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Current Role Indicator */}
                  {index === 0 && (
                    <div className="mt-6 flex flex-wrap items-center gap-3">
                      <span className="inline-flex items-center gap-2 rounded-full border border-emerald-400/20 bg-emerald-400/10 px-3 py-1.5 font-mono text-[10px] uppercase tracking-widest text-emerald-400">
                        <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-emerald-400" />
                        Current Position
                      </span>

                      <span className="text-xs text-white/35">
                        Full-Time Experience
                      </span>
                    </div>
                  )}

                </div>
              </div>
            </Reveal>
          )
        })}
      </div>

      {/* Journey Footer */}
      <Reveal delay={0.2}>
        <div className="mt-12 flex items-center gap-3 border-t border-white/10 pt-7">
          <BriefcaseBusiness size={18} className="text-neon" />

          <p className="text-sm text-white/45">
            Continuously learning, building, and growing as a developer.
          </p>

          <ArrowUpRight
            size={16}
            className="ml-auto text-neon"
          />
        </div>
      </Reveal>
    </Section>
  )
}
