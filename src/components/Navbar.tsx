
import { useEffect, useState } from 'react'
import {
  AnimatePresence,
  motion,
  useScroll,
  useSpring,
} from 'framer-motion'

import { Menu, X, Code2, ArrowUpRight } from 'lucide-react'
import { nav } from '../data/portfolio'
import { go } from '../lib/scroll'

export default function Navbar() {
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [active, setActive] = useState('home')

  const { scrollY, scrollYProgress } = useScroll()

  const progress = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 25,
    restDelta: 0.001,
  })

  // Navbar background on scroll
  useEffect(() => {
    const unsubscribe = scrollY.on('change', (value) => {
      setScrolled(value > 40)
    })

    return () => unsubscribe()
  }, [scrollY])

  // Active section detection
  useEffect(() => {
    const sectionIds = ['home', ...nav]

    const observer = new IntersectionObserver(
      (entries) => {
        const visibleSections = entries
          .filter((entry) => entry.isIntersecting)
          .sort(
            (a, b) =>
              b.intersectionRatio - a.intersectionRatio
          )

        if (visibleSections[0]) {
          setActive(visibleSections[0].target.id)
        }
      },
      {
        rootMargin: '-25% 0px -55% 0px',
        threshold: [0, 0.15, 0.3, 0.5, 0.75],
      }
    )

    sectionIds.forEach((id) => {
      const section = document.getElementById(id)
      if (section) observer.observe(section)
    })

    return () => observer.disconnect()
  }, [])

  // Close menu on Escape
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setOpen(false)
      }
    }

    window.addEventListener('keydown', handleKeyDown)

    return () => {
      window.removeEventListener('keydown', handleKeyDown)
    }
  }, [])

  const jump = (id: string) => {
    setOpen(false)
    go(id)
  }

  return (
    <>
      {/* Scroll Progress */}
      <motion.div
        style={{ scaleX: progress }}
        className="fixed left-0 top-0 z-[70] h-[2px] w-full origin-left bg-gradient-to-r from-electric via-neon to-iris shadow-[0_0_10px_#22e4ff]"
      />

      {/* Navbar */}
      <header className="fixed inset-x-0 top-3 z-50 px-3 sm:px-6">

        <motion.nav
          aria-label="Primary navigation"
          animate={{
            backgroundColor: scrolled
              ? 'rgba(8, 10, 20, 0.88)'
              : 'rgba(255, 255, 255, 0.035)',
          }}
          transition={{ duration: 0.3 }}
          className="glass mx-auto flex max-w-6xl items-center justify-between rounded-full border border-white/10 px-4 py-3 shadow-[0_8px_40px_rgba(0,0,0,0.15)] backdrop-blur-xl sm:px-6"
        >

          {/* Brand */}
          <button
            type="button"
            onClick={() => jump('home')}
            aria-label="TechAbhi home"
            className="group flex items-center gap-2 font-display text-lg font-bold tracking-tight text-white"
          >
            <span className="flex h-8 w-8 items-center justify-center rounded-full border border-neon/20 bg-neon/10 text-neon transition-all duration-300 group-hover:rotate-12 group-hover:shadow-[0_0_15px_rgba(34,228,255,0.25)]">
              <Code2 size={17} />
            </span>

            Tech<span className="text-neon">Abhi</span>
            <span className="text-neon">.</span>
          </button>

          {/* Desktop Navigation */}
          <ul className="hidden items-center gap-1 md:flex">
            {nav.map((item) => {
              const isActive = active === item

              return (
                <li key={item}>
                  <button
                    type="button"
                    onClick={() => jump(item)}
                    aria-current={isActive ? 'location' : undefined}
                    className={`relative rounded-full px-3 py-2 text-[13px] capitalize transition-colors duration-300 ${
                      isActive
                        ? 'text-neon'
                        : 'text-white/55 hover:text-white'
                    }`}
                  >
                    {item}

                    {isActive && (
                      <motion.span
                        layoutId="active-nav"
                        className="absolute inset-0 -z-10 rounded-full border border-neon/20 bg-neon/[.08]"
                        transition={{
                          type: 'spring',
                          stiffness: 350,
                          damping: 30,
                        }}
                      />
                    )}
                  </button>
                </li>
              )
            })}
          </ul>

          {/* Desktop Contact CTA */}
          <button
            type="button"
            onClick={() => jump('contact')}
            className="hidden items-center gap-2 rounded-full bg-gradient-to-r from-electric to-neon px-4 py-2 text-xs font-semibold text-ink transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_0_20px_rgba(34,228,255,0.25)] md:flex"
          >
            Let's Talk
            <ArrowUpRight size={15} />
          </button>

          {/* Mobile Menu Toggle */}
          <button
            type="button"
            className="flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-white/[.04] text-white transition hover:border-neon/40 hover:text-neon md:hidden"
            aria-label={open ? 'Close menu' : 'Open menu'}
            aria-expanded={open}
            aria-controls="mobile-navigation"
            onClick={() => setOpen((previous) => !previous)}
          >
            <AnimatePresence mode="wait" initial={false}>
              <motion.span
                key={open ? 'close' : 'menu'}
                initial={{ opacity: 0, rotate: -45, scale: 0.7 }}
                animate={{ opacity: 1, rotate: 0, scale: 1 }}
                exit={{ opacity: 0, rotate: 45, scale: 0.7 }}
                transition={{ duration: 0.18 }}
              >
                {open ? <X size={21} /> : <Menu size={21} />}
              </motion.span>
            </AnimatePresence>
          </button>

        </motion.nav>

        {/* Mobile Navigation */}
        <AnimatePresence>
          {open && (
            <motion.div
              id="mobile-navigation"
              initial={{ opacity: 0, y: -12, scale: 0.97 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -12, scale: 0.97 }}
              transition={{ duration: 0.22 }}
              className="glass mx-auto mt-2 max-w-6xl overflow-hidden rounded-2xl border border-white/10 p-3 shadow-2xl backdrop-blur-2xl md:hidden"
            >

              <ul className="space-y-1">
                {nav.map((item, index) => {
                  const isActive = active === item

                  return (
                    <motion.li
                      key={item}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{
                        delay: index * 0.035,
                      }}
                    >
                      <button
                        type="button"
                        onClick={() => jump(item)}
                        aria-current={
                          isActive ? 'location' : undefined
                        }
                        className={`flex w-full items-center justify-between rounded-xl px-4 py-3 text-left text-sm capitalize transition-all ${
                          isActive
                            ? 'bg-neon/10 text-neon'
                            : 'text-white/70 hover:bg-white/[.05] hover:text-white'
                        }`}
                      >
                        {item}

                        {isActive && (
                          <span className="h-1.5 w-1.5 rounded-full bg-neon shadow-[0_0_10px_#22e4ff]" />
                        )}
                      </button>
                    </motion.li>
                  )
                })}
              </ul>

              <div className="mt-3 border-t border-white/10 pt-3">
                <button
                  type="button"
                  onClick={() => jump('contact')}
                  className="flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-electric to-neon px-4 py-3 text-sm font-semibold text-ink transition hover:shadow-[0_0_20px_rgba(34,228,255,0.2)]"
                >
                  Let's Connect
                  <ArrowUpRight size={17} />
                </button>
              </div>

            </motion.div>
          )}
        </AnimatePresence>

      </header>
    </>
  )
}
