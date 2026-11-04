import { useEffect, useState } from 'react'
import { AnimatePresence, MotionConfig, useReducedMotion } from 'framer-motion'
import Lenis from 'lenis'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { setLenis } from './lib/scroll'
import Loader from './components/Loader'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import About from './components/About'
import Skills3D from './components/Skills3D'
import Experience from './components/Experience'
import Projects from './components/Projects'
import Achievements from './components/Achievements'
import Resume from './components/Resume'
import Contact from './components/Contact'
import Footer from './components/Footer'
gsap.registerPlugin(ScrollTrigger)

export default function App() {
  const [ready, setReady] = useState(false), rm = useReducedMotion()
  useEffect(() => { document.body.style.overflow = ready ? '' : 'hidden'; if (ready) setTimeout(() => ScrollTrigger.refresh(), 200) }, [ready])
  useEffect(() => {
    if (rm) return
    const l = new Lenis({ lerp: 0.09 }); setLenis(l); l.on('scroll', ScrollTrigger.update)
    const f = (t: number) => l.raf(t * 1000); gsap.ticker.add(f); gsap.ticker.lagSmoothing(0)
    return () => { gsap.ticker.remove(f); l.destroy(); setLenis(null) }
  }, [rm])
  return (<MotionConfig reducedMotion="user">
    <AnimatePresence>{!ready && <Loader onDone={() => setReady(true)} />}</AnimatePresence>
    <div className="pointer-events-none fixed inset-0 -z-10 bg-[radial-gradient(ellipse_60%_40%_at_80%_0%,rgba(47,107,255,.12),transparent),radial-gradient(ellipse_50%_40%_at_0%_60%,rgba(124,92,255,.09),transparent)]" aria-hidden />
    <Navbar />
    <main><Hero ready={ready} /><About /><Skills3D /><Experience /><Projects /><Achievements /><Resume /><Contact /></main>
    <Footer />
  </MotionConfig>)
}
