
import { useEffect, useState } from 'react'
import { motion, useReducedMotion } from 'framer-motion'
import { Code2, Sparkles } from 'lucide-react'

type LoaderProps = {
  onDone: () => void
}

const loadingMessages = [
  'INITIALIZING DEVELOPER EXPERIENCE...',
  'LOADING CREATIVE ENVIRONMENT...',
  'PREPARING DIGITAL EXPERIENCES...',
  'ALMOST READY...',
]

export default function Loader({ onDone }: LoaderProps) {
  const [progress, setProgress] = useState(0)
  const [messageIndex, setMessageIndex] = useState(0)

  const reducedMotion = useReducedMotion()

  useEffect(() => {
    const startTime = performance.now()
    const duration = reducedMotion ? 400 : 2300

    let animationFrame = 0
    let completionTimeout = 0

    const tick = (time: number) => {
      const elapsed = time - startTime
      const progressValue = Math.min(1, elapsed / duration)

      const easedProgress =
        1 - Math.pow(1 - progressValue, 3)

      const percentage = Math.round(easedProgress * 100)

      setProgress(percentage)

      const nextMessage =
        percentage < 35 ? 0 :
        percentage < 65 ? 1 :
        percentage < 90 ? 2 : 3

      setMessageIndex(nextMessage)

      if (progressValue < 1) {
        animationFrame = requestAnimationFrame(tick)
      } else {
        completionTimeout = window.setTimeout(onDone, 350)
      }
    }

    animationFrame = requestAnimationFrame(tick)

    return () => {
      cancelAnimationFrame(animationFrame)
      window.clearTimeout(completionTimeout)
    }
  }, [onDone, reducedMotion])

  return (
    <motion.div
      className="fixed inset-0 z-[100] flex flex-col items-center justify-center overflow-hidden bg-ink px-5"
      initial={{ clipPath: 'inset(0 0 0% 0)' }}
      exit={{ clipPath: 'inset(0 0 100% 0)' }}
      transition={{
        duration: reducedMotion ? 0.2 : 1,
        ease: [0.76, 0, 0.24, 1],
      }}
      role="status"
      aria-live="polite"
      aria-label={`Loading portfolio, ${progress}%`}
    >

      {/* Background Effects */}
      <div className="pointer-events-none absolute left-1/2 top-1/2 h-[500px] w-[500px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-electric/[.06] blur-[120px]" />

      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,#050505_75%)]" />

      {/* Logo Animation */}
      <div className="relative mb-10 flex h-36 w-36 items-center justify-center">

        {/* Outer Ring */}
        <div
          className="absolute inset-0 rounded-full border border-neon/25"
          style={{
            animation: reducedMotion
              ? 'none'
              : 'spin 6s linear infinite',
          }}
        >
          <span className="absolute -top-1 left-1/2 h-2 w-2 rounded-full bg-neon shadow-[0_0_14px_#22e4ff]" />
        </div>

        {/* Middle Ring */}
        <div
          className="absolute inset-3 rounded-full border border-iris/40"
          style={{
            animation: reducedMotion
              ? 'none'
              : 'spin 4s linear infinite reverse',
          }}
        >
          <span className="absolute -top-1 left-1/2 h-2 w-2 rounded-full bg-iris shadow-[0_0_14px_#7c5cff]" />
        </div>

        {/* Inner Glow */}
        <div className="absolute inset-7 rounded-full border border-white/10 bg-gradient-to-br from-neon/10 to-iris/10 shadow-[0_0_40px_rgba(34,228,255,0.08)]" />

        {/* Center Icon */}
        <motion.div
          animate={
            reducedMotion
              ? undefined
              : {
                  scale: [1, 1.08, 1],
                }
          }
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
          className="relative z-10 flex h-16 w-16 items-center justify-center rounded-2xl border border-neon/20 bg-ink/80 text-neon shadow-[0_0_30px_rgba(34,228,255,0.15)]"
        >
          <Code2 size={32} strokeWidth={1.5} />
        </motion.div>

        {/* Percentage */}
        <div className="absolute -bottom-7 flex items-center gap-1 font-mono text-xl font-semibold tabular-nums text-grad">
          {progress}
          <span className="text-sm text-neon">%</span>
        </div>
      </div>

      {/* Loading Heading */}
      <div className="mt-8 text-center">

        <div className="mb-4 flex items-center justify-center gap-2">
          <Sparkles size={14} className="text-neon" />

          <p className="font-display text-sm font-semibold tracking-[0.2em] text-white sm:text-base">
            ABHISHEK KUMAR
          </p>

          <Sparkles size={14} className="text-iris" />
        </div>

        <p className="min-h-5 px-2 text-center font-mono text-[9px] tracking-[0.2em] text-white/50 sm:text-[11px] sm:tracking-[0.3em]">
          {loadingMessages[messageIndex]}
        </p>
      </div>

      {/* Progress Bar */}
      <div className="mt-8 h-[3px] w-56 overflow-hidden rounded-full bg-white/10 sm:w-64">
        <motion.div
          className="h-full rounded-full bg-gradient-to-r from-electric via-neon to-iris shadow-[0_0_12px_#22e4ff]"
          style={{
            width: `${progress}%`,
          }}
        />
      </div>

      {/* Footer Label */}
      <p className="absolute bottom-10 font-mono text-[9px] uppercase tracking-[0.3em] text-white/25">
        Code · Create · Innovate
      </p>

    </motion.div>
  )
}
