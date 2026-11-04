
import { lazy, Suspense, useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import {
  ArrowRight,
  Download,
  Send,
  Sparkles,
} from 'lucide-react'

import { go } from '../lib/scroll'
import { hasWebGL, RESUME, useResume } from '../lib/util'

const HeroScene = lazy(() => import('../three/HeroScene'))

gsap.registerPlugin(ScrollTrigger)

const ease = [0.22, 1, 0.36, 1] as const

const word = {
  hide: { y: '110%' },
  show: (i: number) => ({
    y: 0,
    transition: {
      duration: 1.1,
      ease,
      delay: 0.1 + i * 0.12,
    },
  }),
}

const fade = (delay: number) => ({
  initial: { opacity: 0, y: 30 },
  transition: {
    duration: 1,
    ease,
    delay,
  },
})

type HeroProps = {
  ready: boolean
}

export default function Hero({ ready }: HeroProps) {
  const ref = useRef<HTMLElement>(null)
  const resume = useResume()

  useEffect(() => {
    const element = ref.current
    if (!element) return

    const ctx = gsap.context(() => {
      gsap.to('.hero-content', {
        yPercent: -14,
        opacity: 0,
        ease: 'none',
        scrollTrigger: {
          trigger: element,
          start: 'top top',
          end: 'bottom 20%',
          scrub: true,
        },
      })

      gsap.to('.hero-scene', {
        scale: 1.2,
        opacity: 0.2,
        ease: 'none',
        scrollTrigger: {
          trigger: element,
          start: 'top top',
          end: 'bottom top',
          scrub: true,
        },
      })
    }, element)

    return () => ctx.revert()
  }, [])

  const animationState = ready ? 'show' : 'hide'

  const visible = ready
    ? { opacity: 1, y: 0 }
    : undefined

  const Line = ({
    children,
    index,
    className = '',
  }: {
    children: string
    index: number
    className?: string
  }) => (
    <span className="block overflow-hidden pb-[0.12em]">
      <motion.span
        className={`block ${className}`}
        variants={word}
        custom={index}
        initial="hide"
        animate={animationState}
      >
        {children}
      </motion.span>
    </span>
  )

  return (
    <section
      id="home"
      ref={ref}
      className="relative h-[100svh] min-h-[660px] overflow-hidden"
    >
      {/* 3D Background */}
      <div
        className="hero-scene absolute inset-0"
        aria-hidden="true"
      >
        {hasWebGL() ? (
          <Suspense fallback={null}>
            <HeroScene />
          </Suspense>
        ) : (
          <div className="float absolute right-[8%] top-1/2 h-[420px] w-[420px] -translate-y-1/2 rounded-full bg-[radial-gradient(circle_at_35%_30%,#22e4ff66,#2f6bff33_45%,transparent_70%)] blur-sm" />
        )}
      </div>

      {/* Background Overlays */}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_20%_50%,rgba(5,5,5,.78),transparent_65%)]" />

      <div className="pointer-events-none absolute inset-0 bg-gradient-to-r from-ink/40 via-transparent to-transparent" />

      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-ink to-transparent" />

      {/* Main Content */}
      <div className="hero-content pointer-events-none relative z-10 mx-auto flex h-full max-w-6xl flex-col justify-center px-5 pb-20 pt-24 sm:px-8">

        {/* Availability Label */}
        <motion.p
          {...fade(0.1)}
          animate={visible}
          className="mb-6 flex items-center gap-3 font-mono text-[10px] uppercase tracking-[0.22em] text-neon sm:text-xs sm:tracking-[0.3em]"
        >
          <span className="relative flex h-2 w-2">
            <span className="absolute h-full w-full animate-ping rounded-full bg-neon/70" />
            <span className="h-2 w-2 rounded-full bg-neon" />
          </span>

          MERN Stack Developer | Full Stack Developer
        </motion.p>

        {/* Main Heading */}
        <h1
          className="font-display text-[clamp(2.8rem,8.2vw,7rem)] font-semibold leading-[0.98] tracking-[-0.045em]"
          aria-label="Hi, I'm Abhishek Kumar"
        >
          <Line
            index={0}
            className="font-normal text-white/75"
          >
            Hi, I'm
          </Line>

          <Line
            index={1}
            className="text-grad"
          >
            Abhishek
          </Line>

          <Line
            index={2}
            className="text-grad"
          >
            Kumar
          </Line>
        </h1>

        {/* Professional Introduction */}
        <motion.div
          {...fade(0.75)}
          animate={visible}
          className="mt-7 max-w-xl"
        >
          <p className="text-lg leading-relaxed text-white/70 sm:text-xl">
            I build modern, scalable web applications
            with <span className="text-neon">React</span>,
            {' '}<span className="text-neon">Node.js</span>
            {' '}and the power of the MERN stack.
          </p>

          <p className="mt-3 text-sm leading-relaxed text-white/40 sm:text-base">
            Turning ideas into functional digital experiences
            through clean code, creativity and continuous learning.
          </p>
        </motion.div>

        {/* Tech Highlights */}
        <motion.div
          {...fade(0.85)}
          animate={visible}
          className="mt-6 flex flex-wrap items-center gap-2"
        >
          {['React.js', 'Node.js', 'Express.js', 'MongoDB', 'JavaScript'].map(
            (tech) => (
              <span
                key={tech}
                className="rounded-full border border-white/10 bg-white/[.04] px-3 py-1.5 font-mono text-[10px] text-white/55 transition-colors hover:border-neon/40 hover:text-neon sm:text-xs"
              >
                {tech}
              </span>
            )
          )}
        </motion.div>

        {/* CTA Buttons */}
        <motion.div
          {...fade(1)}
          animate={visible}
          className="pointer-events-auto mt-9 flex flex-wrap gap-3"
        >
          <button
            type="button"
            className="btn btn-primary group"
            onClick={() => go('projects')}
          >
            Explore My Work
            <ArrowRight
              size={18}
              className="transition-transform group-hover:translate-x-1"
            />
          </button>

          {resume ? (
            <a
              className="btn btn-ghost group"
              href={RESUME}
              download
            >
              Download Resume
              <Download
                size={17}
                className="transition-transform group-hover:translate-y-0.5"
              />
            </a>
          ) : (
            <button
              type="button"
              className="btn btn-ghost"
              onClick={() => go('resume')}
            >
              Download Resume
              <Download size={17} />
            </button>
          )}

          <button
            type="button"
            className="btn btn-ghost group"
            onClick={() => go('contact')}
          >
            Let's Connect
            <Send
              size={17}
              className="transition-transform group-hover:translate-x-1"
            />
          </button>
        </motion.div>

        {/* Small Signature */}
        <motion.p
          {...fade(1.2)}
          animate={visible}
          className="mt-8 flex items-center gap-2 font-mono text-[10px] uppercase tracking-widest text-white/30"
        >
          <Sparkles size={13} className="text-neon/60" />
          Code · Create · Innovate
        </motion.p>

      </div>

      {/* Scroll Indicator */}
      <motion.button
        {...fade(1.4)}
        animate={visible}
        type="button"
        onClick={() => go('about')}
        aria-label="Scroll to About section"
        className="absolute bottom-8 left-1/2 z-20 flex -translate-x-1/2 flex-col items-center gap-2 font-mono text-[10px] uppercase tracking-[0.3em] text-white/40 transition-colors hover:text-neon"
      >
        <span className="flex h-10 w-6 justify-center rounded-full border border-white/25 pt-2">
          <span
            className="h-2 w-[3px] rounded bg-neon"
            style={{
              animation: 'wheel 1.8s ease-out infinite',
            }}
          />
        </span>

        Scroll
      </motion.button>
    </section>
  )
}
