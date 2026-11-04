
import { lazy, Suspense } from 'react'
import { Award, Trophy, Medal, Sparkles } from 'lucide-react'

import { achievements } from '../data/portfolio'
import { CountUp } from './About'
import { Heading, Reveal, Section, Tilt } from './ui'

const MiniScene = lazy(() => import('../three/MiniScene'))

const achievementIcons = [Trophy, Medal, Award]

export default function Achievements() {
  return (
    <Section id="achievements">

      {/* Section Heading */}
      <Heading
        kicker="05 — Recognition & Milestones"
        title="Achievements That Define My Journey"
      />

      <div className="grid items-center gap-10 md:grid-cols-[1fr_1.1fr] md:gap-14">

        {/* 3D Trophy Section */}
        <Reveal className="relative mx-auto aspect-square w-full max-w-[420px]">

          <div className="absolute inset-8 rounded-full bg-iris/15 blur-3xl" />

          <div className="absolute inset-16 rounded-full border border-neon/10 animate-pulse" />

          <Suspense fallback={null}>
            <MiniScene kind="trophy" />
          </Suspense>

          <div className="absolute bottom-5 left-1/2 -translate-x-1/2 whitespace-nowrap">
            <div className="flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-xs font-medium text-white/60 backdrop-blur-xl">
              <Sparkles size={14} className="text-neon" />
              Continuous Learning & Growth
            </div>
          </div>

        </Reveal>

        {/* Achievement Cards */}
        <div className="space-y-4">

          {achievements.map((a, i) => {

            const Icon = achievementIcons[i] || Award

            return (
              <Reveal key={a.title} delay={i * 0.12}>

                <Tilt
                  max={5}
                  className="group relative overflow-hidden rounded-2xl border border-white/10 bg-white/[0.035] p-5 transition-all duration-500 hover:border-neon/30 hover:bg-white/[0.06] sm:p-6"
                >

                  {/* Hover Glow */}
                  <div className="pointer-events-none absolute -right-16 -top-16 h-40 w-40 rounded-full bg-neon/10 opacity-0 blur-3xl transition-opacity duration-500 group-hover:opacity-100" />

                  <div className="relative flex items-center gap-5">

                    {/* Achievement Icon / Rank */}
                    <div className="flex h-16 w-20 shrink-0 items-center justify-center rounded-xl border border-white/10 bg-white/5">

                      {a.n ? (
                        <div className="font-display text-3xl font-bold text-grad sm:text-4xl">
                          {a.pre && <span>{a.pre}&nbsp;</span>}
                          <CountUp to={a.n} />
                        </div>
                      ) : (
                        <Icon
                          size={34}
                          strokeWidth={1.6}
                          className="text-neon transition-transform duration-500 group-hover:scale-110 group-hover:rotate-6"
                        />
                      )}

                    </div>

                    {/* Achievement Details */}
                    <div className="min-w-0">

                      <h3 className="font-display text-lg font-semibold text-white transition-colors duration-300 group-hover:text-neon sm:text-xl">
                        {a.title}
                      </h3>

                      <p className="mt-1 text-sm leading-relaxed text-white/50">
                        {a.sub}
                      </p>

                    </div>

                    <div className="ml-auto hidden sm:block">
                      <Award
                        size={20}
                        className="text-white/20 transition-colors group-hover:text-neon"
                      />
                    </div>

                  </div>

                </Tilt>

              </Reveal>
            )
          })}

        </div>

      </div>

      {/* Bottom Message */}
      <Reveal delay={0.3} className="mt-12 text-center">

        <p className="text-sm font-medium tracking-wide text-white/45">
          Every achievement is another step towards building better technology.
        </p>

      </Reveal>

    </Section>
  )
}
