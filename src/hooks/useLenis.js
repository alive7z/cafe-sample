import { useEffect } from 'react'
import Lenis from 'lenis'

let lenisInstance = null

export function getLenis() {
  return lenisInstance
}

export default function useLenis() {
  useEffect(() => {
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (reduce) return undefined

    const lenis = new Lenis({
      smoothWheel: true,
      wheelMultiplier: 0.95,
      touchMultiplier: 1.6,
      lerp: 0.08,
    })
    lenisInstance = lenis

    let rafId
    const raf = (time) => {
      lenis.raf(time)
      rafId = requestAnimationFrame(raf)
    }
    rafId = requestAnimationFrame(raf)

    return () => {
      cancelAnimationFrame(rafId)
      lenis.destroy()
      lenisInstance = null
    }
  }, [])
}

export function scrollToId(id) {
  const el = document.querySelector(id)
  if (!el) return
  if (lenisInstance) {
    lenisInstance.scrollTo(el, { offset: -10, duration: 1.4 })
  } else {
    el.scrollIntoView({ behavior: 'smooth' })
  }
}
