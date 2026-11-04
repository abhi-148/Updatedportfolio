
import {
  type ReactNode,
  type PointerEvent,
} from 'react'

import {
  motion,
  useMotionValue,
  useSpring,
  useTransform,
  useReducedMotion,
} from 'framer-motion'

import icons from '../data/icons.json'

// ========================================
// SECTION WRAPPER
// ========================================

interface SectionProps {
  id: string
  children: ReactNode
  className?: string
}

export const Section = ({
  id,
  children,
  className = '',
}: SectionProps) => (
  <section
    id={id}
    className={`relative px-5 py-24 sm:px-8 md:py-36 ${className}`}
  >
    <div className="mx-auto w-full max-w-6xl">
      {children}
    </div>
  </section>
)

// ========================================
// REVEAL ANIMATION
// ========================================

interface RevealProps {
  children: ReactNode
  delay?: number
  className?: string
  y?: number
}

export const Reveal = ({
  children,
  delay = 0,
  className = '',
  y = 40,
}: RevealProps) => {
  const reducedMotion = useReducedMotion()

  return (
    <motion.div
      className={className}
      initial={
        reducedMotion
          ? { opacity: 0 }
          : {
              opacity: 0,
              y,
              filter: 'blur(8px)',
            }
      }
      whileInView={{
        opacity: 1,
        y: 0,
        filter: 'blur(0px)',
      }}
      viewport={{
        once: true,
        margin: '-80px',
      }}
      transition={{
        duration: reducedMotion ? 0.2 : 0.9,
        delay: reducedMotion ? 0 : delay,
        ease: [0.22, 1, 0.36, 1],
      }}
    >
      {children}
    </motion.div>
  )
}

// ========================================
// SECTION HEADING
// ========================================

interface HeadingProps {
  kicker: string
  title: string
  sub?: string
}

export const Heading = ({
  kicker,
  title,
  sub,
}: HeadingProps) => (
  <Reveal className="mb-14 max-w-3xl md:mb-20">
    <p className="mb-4 flex items-center gap-3 font-mono text-[10px] uppercase tracking-[0.25em] text-neon sm:text-xs sm:tracking-[0.3em]">
      <span className="h-px w-10 bg-neon/60" />
      {kicker}
    </p>

    <h2 className="font-display text-4xl font-semibold leading-[1.05] tracking-tight sm:text-5xl md:text-6xl">
      <span className="text-grad">
        {title}
      </span>
    </h2>

    {sub && (
      <p className="mt-5 max-w-2xl text-base leading-relaxed text-white/55 sm:text-lg">
        {sub}
      </p>
    )}
  </Reveal>
)

// ========================================
// 3D TILT CARD
// ========================================

interface TiltProps {
  children: ReactNode
  className?: string
  max?: number
}

export function Tilt({
  children,
  className = '',
  max = 8,
}: TiltProps) {
  const x = useMotionValue(0)
  const y = useMotionValue(0)

  const reducedMotion = useReducedMotion()

  const rotateX = useSpring(
    useTransform(y, [-0.5, 0.5], [max, -max]),
    {
      stiffness: 180,
      damping: 18,
    }
  )

  const rotateY = useSpring(
    useTransform(x, [-0.5, 0.5], [-max, max]),
    {
      stiffness: 180,
      damping: 18,
    }
  )

  const handlePointerMove = (
    event: PointerEvent<HTMLDivElement>
  ) => {
    if (
      reducedMotion ||
      event.pointerType === 'touch'
    ) {
      return
    }

    const element = event.currentTarget
    const rect = element.getBoundingClientRect()

    if (!rect.width || !rect.height) return

    const px = (event.clientX - rect.left) / rect.width
    const py = (event.clientY - rect.top) / rect.height

    x.set(px - 0.5)
    y.set(py - 0.5)

    element.style.setProperty(
      '--mx',
      `${px * 100}%`
    )

    element.style.setProperty(
      '--my',
      `${py * 100}%`
    )
  }

  const handlePointerLeave = (
    event: PointerEvent<HTMLDivElement>
  ) => {
    x.set(0)
    y.set(0)

    event.currentTarget.style.setProperty(
      '--mx',
      '50%'
    )

    event.currentTarget.style.setProperty(
      '--my',
      '0%'
    )
  }

  return (
    <motion.div
      className={`glass ${className}`}
      style={{
        rotateX: reducedMotion ? 0 : rotateX,
        rotateY: reducedMotion ? 0 : rotateY,
        transformPerspective: 900,
        transformStyle: 'preserve-3d',
      }}
      onPointerMove={handlePointerMove}
      onPointerLeave={handlePointerLeave}
    >
      {children}
    </motion.div>
  )
}

// ========================================
// TECHNOLOGY ICON
// ========================================

type IconData = {
  p: string
  h: string
}

interface TechIconProps {
  k: string
  n: string
  size?: number
}

export function TechIcon({
  k,
  n,
  size = 40,
}: TechIconProps) {
  const iconData = (
    icons as Record<string, IconData | null | undefined>
  )[k]

  // --------------------------------------
  // FALLBACK ICON
  // --------------------------------------

  if (
    !iconData ||
    typeof iconData.p !== 'string' ||
    typeof iconData.h !== 'string' ||
    !iconData.p.trim()
  ) {
    return (
      <span
        className="flex shrink-0 items-center justify-center rounded-xl border border-neon/20 bg-neon/10 font-mono text-sm font-semibold text-neon"
        style={{
          width: size,
          height: size,
        }}
        role="img"
        aria-label={n}
      >
        {n.slice(0, 2).toUpperCase()}
      </span>
    )
  }

  // --------------------------------------
  // ICON COLOR
  // --------------------------------------

  const hex = iconData.h.replace('#', '')

  const validHex = /^[0-9a-fA-F]{6}$/.test(hex)

  const color = validHex
    ? `#${hex}`
    : '#22e4ff'

  const [r, g, b] = validHex
    ? [0, 2, 4].map((index) =>
        parseInt(hex.slice(index, index + 2), 16)
      )
    : [34, 228, 255]

  const brightness =
    0.299 * r +
    0.587 * g +
    0.114 * b

  const iconColor = brightness < 70
    ? '#eaf2ff'
    : color

  // --------------------------------------
  // SVG ICON
  // --------------------------------------

  return (
    <svg
      viewBox="0 0 24 24"
      width={size}
      height={size}
      role="img"
      aria-label={n}
      focusable="false"
      className="shrink-0 transition-transform duration-300 hover:scale-110"
      style={{
        filter: `drop-shadow(0 0 12px ${iconColor}66)`,
      }}
    >
      <path
        d={iconData.p}
        fill={iconColor}
      />
    </svg>
  )
}
