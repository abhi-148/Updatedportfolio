
import Lenis from 'lenis'

let lenis: Lenis | null = null

// ----------------------------------------
// LENIS INSTANCE
// ----------------------------------------

export const setLenis = (instance: Lenis | null) => {
  lenis = instance
}

// ----------------------------------------
// SCROLL TO SECTION
// ----------------------------------------

export const go = (id: string) => {
  if (typeof document === 'undefined') return

  const element = document.getElementById(id)

  if (!element) {
    console.warn(`Scroll target not found: #${id}`)
    return
  }

  const prefersReducedMotion =
    window.matchMedia('(prefers-reduced-motion: reduce)').matches

  // Reduced motion or unavailable Lenis
  if (prefersReducedMotion || !lenis) {
    element.scrollIntoView({
      behavior: prefersReducedMotion ? 'instant' : 'smooth',
      block: 'start',
    })

    return
  }

  // Lenis smooth scrolling
  lenis.scrollTo(element, {
    offset: 0,
    duration: 1.4,
    easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    force: true,
  })
}
