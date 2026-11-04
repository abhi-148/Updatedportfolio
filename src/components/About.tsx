
import { lazy, Suspense, useEffect, useRef, useState } from 'react'
import { animate } from 'framer-motion'
import { Section, Heading, Reveal } from './ui'
import { useInView } from '../lib/util'

const MiniScene = lazy(() => import('../three/MiniScene'))

// Animated statistics
export function CountUp({ to, dec = 0 }) {
  const ref = useRef(null)
  const vis = useInView(ref, '0px')
  const [v, setV] = useState(0)
  const done = useRef(false)

  useEffect(() => {
    if (vis && !done.current) {
      done.current = true

      const controls = animate(0, to, {
        duration: 1.8,
        ease: 'easeOut',
        onUpdate: setV,
      })

      return () => controls.stop()
    }
  }, [vis, to])

  return <span ref={ref}>{v.toFixed(dec)}</span>
}

// Professional highlights
const stats = [
  [3, 0, 'Professional Roles'],
  [3, 0, 'Hackathon Achievements'],
  [7.21, 2, 'CGPA / 10'],
]

export default function About() {
  return (
    <Section id="about">
      <Heading
        kicker="01 — About Me"
        title="Beyond the Code"
      />

      <div className="grid items-center gap-10 md:grid-cols-2 md:gap-16">

        {/* 3D Visual */}
        <Reveal className="relative mx-auto aspect-square w-full max-w-[460px]">

          <div className="absolute inset-6 rounded-full bg-neon/10 blur-3xl" />

          <Suspense fallback={null}>
            <MiniScene kind="core" />
          </Suspense>

        </Reveal>

        {/* About Content */}
        <div className="space-y-6 text-lg leading-relaxed text-white/65">

          <Reveal>
            <p>
              I'm <span className="text-white font-semibold">
                Abhishek Kumar
              </span>, a{' '}
              <span className="text-white font-semibold">
                Full Stack Developer and MERN Stack Developer
              </span>{' '}
              currently working full-time at Excelsior Technologies.
              I build modern, responsive, and database-driven web
              applications using React.js, Node.js, Express.js,
              MongoDB, and MySQL.
            </p>
          </Reveal>

          <Reveal delay={0.08}>
            <p>
              My development experience covers both{' '}
              <span className="text-white font-semibold">
                frontend and backend engineering
              </span>
              . From creating interactive user interfaces and reusable
              React components to developing RESTful APIs, backend
              logic, and database integrations, I enjoy working across
              the complete application development lifecycle.
            </p>
          </Reveal>

          <Reveal delay={0.16}>
            <p>
              I have hands-on experience with{' '}
              <span className="text-white font-semibold">
                JWT Authentication, Role-Based Access Control (RBAC),
                CRUD operations, API integration, and database management
              </span>
              . I focus on building practical software solutions,
              debugging application issues, and creating reliable
              user experiences.
            </p>
          </Reveal>

          <Reveal delay={0.24}>
            <p>
              I completed my B.Tech in Computer Science and Engineering
              from Parul University. I work with JavaScript, C++, and SQL,
              and use AI-powered development tools such as Claude,
              ChatGPT, and GitHub Copilot to improve coding productivity
              and problem-solving.
            </p>
          </Reveal>

          {/* Developer Focus */}
          <Reveal delay={0.28}>
            <div className="flex flex-wrap gap-2 pt-1">

              {[
                'MERN Stack',
                'Full Stack Development',
                'React.js',
                'Node.js',
                'Express.js',
                'MongoDB',
                'MySQL',
                'REST APIs',
              ].map((skill) => (
                <span
                  key={skill}
                  className="rounded-full border border-white/10 bg-white/5 px-3 py-1.5 text-xs font-medium text-white/75 transition-all duration-300 hover:border-neon/50 hover:bg-neon/10 hover:text-white"
                >
                  {skill}
                </span>
              ))}

            </div>
          </Reveal>

          {/* Animated Stats */}
          <Reveal
            delay={0.32}
            className="grid grid-cols-3 gap-3 pt-4"
          >

            {stats.map(([n, d, l]) => (
              <div
                key={l}
                className="glass rounded-xl p-4 transition-transform duration-300 hover:-translate-y-1 sm:p-5"
              >

                <div className="font-display text-3xl font-semibold text-grad sm:text-4xl">
                  <CountUp to={n} dec={d} />
                </div>

                <div className="mt-2 text-xs leading-relaxed text-white/50">
                  {l}
                </div>

              </div>
            ))}

          </Reveal>

        </div>
      </div>
    </Section>
  )
}
