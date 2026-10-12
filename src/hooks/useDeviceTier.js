import { useEffect, useState } from 'react'

function detectWebGL() {
  try {
    const canvas = document.createElement('canvas')
    return !!(
      window.WebGLRenderingContext &&
      (canvas.getContext('webgl') || canvas.getContext('experimental-webgl'))
    )
  } catch {
    return false
  }
}

/**
 * Returns one of: 'high' | 'low' | 'static'
 *  - static: heavy 3D replaced by a lightweight image fallback
 *  - low:    3D on, but reduced dpr / no steam / no contact shadows
 *  - high:   full experience
 */
export default function useDeviceTier() {
  const [tier, setTier] = useState('low')

  useEffect(() => {
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (reduce || !detectWebGL()) {
      setTier('static')
      return
    }

    const coarse = window.matchMedia('(pointer: coarse)').matches
    const cores = navigator.hardwareConcurrency || 8
    const mem = navigator.deviceMemory || 8
    const smallScreen = window.innerWidth < 768

    if (coarse || smallScreen || cores <= 4 || mem <= 4) {
      setTier('low')
    } else {
      setTier('high')
    }
  }, [])

  return tier
}
