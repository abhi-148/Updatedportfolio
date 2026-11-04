
import { useState } from 'react'
import {
  AnimatePresence,
  motion,
  useReducedMotion,
} from 'framer-motion'

import { skills } from '../data/portfolio'
import {
  Heading,
  Section,
  Tilt,
  TechIcon,
} from './ui'

export default function Skills3D() {
  const categories = Object.keys(skills)

  const [activeCategory, setActiveCategory] = useState(
    categories[0] ?? ''
  )

  const reducedMotion = useReducedMotion()

  const activeSkills = activeCategory
    ? skills[activeCategory] ?? []
    : []

  return (
    <Section id="skills">

      <Heading
        kicker="02 — Technology Stack"
        title="Tools I Build With"
        sub="Technologies and tools I use to develop modern, responsive and scalable web applications."
      />

      {/* Category Tabs */}
      <div
        role="tablist"
        aria-label="Technology categories"
        className="mb-10 flex flex-wrap gap-2"
      >
        {categories.map((category) => {
          const isActive = activeCategory === category

          return (
            <button
              key={category}
              id={`skill-tab-${category}`}
              type="button"
              role="tab"
              aria-selected={isActive}
              aria-controls="skills-panel"
              tabIndex={isActive ? 0 : -1}
              onClick={() => setActiveCategory(category)}
              className={`relative overflow-hidden rounded-full border px-5 py-2.5 text-xs font-medium transition-all duration-300 sm:text-sm ${
                isActive
                  ? 'border-neon/50 bg-neon/10 text-neon shadow-[0_0_25px_-8px_#22e4ff]'
                  : 'border-white/10 bg-white/[.02] text-white/55 hover:border-white/30 hover:text-white/90'
              }`}
            >
              {isActive && (
                <motion.span
                  layoutId="skill-category-indicator"
                  className="absolute inset-0 rounded-full border border-neon/20 bg-neon/[.04]"
                  transition={{
                    type: 'spring',
                    stiffness: 350,
                    damping: 30,
                  }}
                />
              )}

              <span className="relative z-10">
                {category}
              </span>
            </button>
          )
        })}
      </div>

      {/* Skills Grid */}
      <AnimatePresence mode="wait">
        <motion.div
          key={activeCategory}
          id="skills-panel"
          role="tabpanel"
          aria-labelledby={`skill-tab-${activeCategory}`}
          initial={
            reducedMotion
              ? { opacity: 0 }
              : { opacity: 0, y: 15 }
          }
          animate={{
            opacity: 1,
            y: 0,
          }}
          exit={{
            opacity: 0,
            y: reducedMotion ? 0 : -10,
          }}
          transition={{
            duration: reducedMotion ? 0.15 : 0.3,
          }}
          className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4"
          style={{ perspective: 1000 }}
        >

          {activeSkills.map((skill, index) => (
            <motion.div
              key={skill.n}
              initial={
                reducedMotion
                  ? { opacity: 0 }
                  : {
                      opacity: 0,
                      y: 30,
                      rotateX: -20,
                    }
              }
              animate={{
                opacity: 1,
                y: 0,
                rotateX: 0,
              }}
              transition={{
                delay: reducedMotion ? 0 : index * 0.06,
                duration: reducedMotion ? 0.15 : 0.6,
                ease: [0.22, 1, 0.36, 1],
              }}
            >

              {/* Floating Card */}
              <div
                className="h-full"
                style={{
                  animation: reducedMotion
                    ? 'none'
                    : 'float 5s ease-in-out infinite',
                  animationDelay: `${index * 0.35}s`,
                }}
              >

                <Tilt
                  max={12}
                  className="group relative flex aspect-square flex-col items-center justify-center gap-4 overflow-hidden rounded-2xl border border-white/[.08] bg-white/[.025] p-4 transition-colors duration-300 hover:border-neon/35 hover:bg-neon/[.035] sm:gap-5 sm:p-6"
                >

                  {/* Hover Glow */}
                  <div className="pointer-events-none absolute inset-0 rounded-2xl bg-[radial-gradient(circle_at_50%_30%,rgba(34,228,255,.10),transparent_65%)] opacity-0 transition-opacity duration-500 group-hover:opacity-100" />

                  {/* Top Accent */}
                  <div className="absolute left-1/2 top-0 h-px w-0 -translate-x-1/2 bg-gradient-to-r from-transparent via-neon to-transparent transition-all duration-500 group-hover:w-3/4" />

                  {/* Technology Icon */}
                  <div className="relative z-10 transition-transform duration-300 group-hover:scale-110">
                    <TechIcon
                      k={skill.i}
                      n={skill.n}
                      size={46}
                    />
                  </div>

                  {/* Technology Name */}
                  <span className="relative z-10 text-center text-xs font-medium text-white/70 transition-colors duration-300 group-hover:text-neon sm:text-sm">
                    {skill.n}
                  </span>

                  {/* Bottom Decoration */}
                  <span className="absolute bottom-4 h-1 w-5 rounded-full bg-white/10 transition-all duration-300 group-hover:w-10 group-hover:bg-neon/60" />

                </Tilt>
              </div>

            </motion.div>
          ))}

          {activeSkills.length === 0 && (
            <div className="col-span-full rounded-2xl border border-white/10 bg-white/[.02] p-10 text-center">
              <p className="text-sm text-white/50">
                No technologies added in this category yet.
              </p>
            </div>
          )}

        </motion.div>
      </AnimatePresence>

      {/* Bottom Note */}
      <div className="mt-10 flex items-center justify-center gap-2 text-center">
        <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-neon" />

        <p className="font-mono text-[9px] uppercase tracking-[0.2em] text-white/30 sm:text-[10px]">
          Continuously Learning & Exploring New Technologies
        </p>
      </div>

    </Section>
  )
}
