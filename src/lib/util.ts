
import {
  useEffect,
  useRef,
  useState,
  type RefObject,
} from 'react'

// ----------------------------------------
// WEBGL SUPPORT
// ----------------------------------------

export const hasWebGL = (): boolean => {
  if (typeof window === 'undefined') return false

  try {
    const canvas = document.createElement('canvas')

    return !!(
      window.WebGLRenderingContext &&
      (
        canvas.getContext('webgl2') ||
        canvas.getContext('webgl')
      )
    )
  } catch {
    return false
  }
}

// ----------------------------------------
// DEVICE PERFORMANCE CHECK
// ----------------------------------------

export const isLow = (): boolean => {
  if (typeof window === 'undefined') return false

  const isMobile = window.matchMedia(
    '(max-width: 768px)'
  ).matches

  const cpuCores = navigator.hardwareConcurrency || 8

  const prefersReducedMotion = window.matchMedia(
    '(prefers-reduced-motion: reduce)'
  ).matches

  return isMobile || cpuCores <= 4 || prefersReducedMotion
}

// ----------------------------------------
// INTERSECTION OBSERVER HOOK
// ----------------------------------------

export function useInView(
  ref: RefObject<Element | null>,
  margin = '100px'
) {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const element = ref.current

    if (!element) return

    if (!('IntersectionObserver' in window)) {
      setVisible(true)
      return
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        setVisible(entry.isIntersecting)
      },
      {
        rootMargin: margin,
        threshold: 0,
      }
    )

    observer.observe(element)

    return () => observer.disconnect()
  }, [ref, margin])

  return visible
}

// ----------------------------------------
// POINTER POSITION HOOK
// ----------------------------------------

export function usePointer() {
  const pointer = useRef({
    x: 0,
    y: 0,
  })

  useEffect(() => {
    const handlePointerMove = (event: PointerEvent) => {
      pointer.current.x =
        (event.clientX / window.innerWidth) * 2 - 1

      pointer.current.y =
        -((event.clientY / window.innerHeight) * 2 - 1)
    }

    window.addEventListener(
      'pointermove',
      handlePointerMove,
      { passive: true }
    )

    return () => {
      window.removeEventListener(
        'pointermove',
        handlePointerMove
      )
    }
  }, [])

  return pointer
}

// ----------------------------------------
// RESUME CONFIGURATION
// ----------------------------------------

export const RESUME = '/Abhishek_Kumar_Resume.pdf'

// ----------------------------------------
// RESUME AVAILABILITY HOOK
// ----------------------------------------

export function useResume() {
  const [available, setAvailable] = useState<boolean | null>(null)

  useEffect(() => {
    let active = true
    const controller = new AbortController()

    const checkResume = async () => {
      try {
        const response = await fetch(RESUME, {
          method: 'HEAD',
          signal: controller.signal,
        })

        const contentType =
          response.headers.get('content-type') || ''

        const isPdf =
          /pdf|octet-stream/i.test(contentType)

        if (active) {
          setAvailable(response.ok && isPdf)
        }
      } catch {
        if (active) {
          setAvailable(false)
        }
      }
    }

    checkResume()

    return () => {
      active = false
      controller.abort()
    }
  }, [])

  return available
}
