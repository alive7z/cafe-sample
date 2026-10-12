import { useRef } from 'react'
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion'

export default function TiltCard({ children, className = '', intensity = 10, glare = true }) {
  const ref = useRef(null)
  const px = useMotionValue(0)
  const py = useMotionValue(0)

  const sx = useSpring(px, { stiffness: 140, damping: 18, mass: 0.4 })
  const sy = useSpring(py, { stiffness: 140, damping: 18, mass: 0.4 })

  const rotateY = useTransform(sx, [-0.5, 0.5], [-intensity, intensity])
  const rotateX = useTransform(sy, [-0.5, 0.5], [intensity, -intensity])

  const glareX = useTransform(sx, [-0.5, 0.5], ['0%', '100%'])
  const glareY = useTransform(sy, [-0.5, 0.5], ['0%', '100%'])
  const glareOpacity = useMotionValue(0)
  const glareOpacitySpring = useSpring(glareOpacity, { stiffness: 120, damping: 20 })
  const glareBg = useTransform(
    [glareX, glareY],
    ([x, y]) => `radial-gradient(240px circle at ${x} ${y}, rgba(255,255,255,.10), transparent 60%)`,
  )

  const fine = typeof window !== 'undefined' && window.matchMedia('(pointer: fine)').matches

  const handleMove = (e) => {
    if (!fine || !ref.current) return
    const r = ref.current.getBoundingClientRect()
    px.set((e.clientX - r.left) / r.width - 0.5)
    py.set((e.clientY - r.top) / r.height - 0.5)
  }

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMove}
      onMouseEnter={() => glareOpacity.set(1)}
      onMouseLeave={() => {
        glareOpacity.set(0)
        px.set(0)
        py.set(0)
      }}
      style={{ rotateX, rotateY, transformPerspective: 1000 }}
      className={`relative [transform-style:preserve-3d] ${className}`}
    >
      {children}
      {glare && fine && (
        <motion.div
          aria-hidden
          style={{
            opacity: glareOpacitySpring,
            background: glareBg,
          }}
          className="pointer-events-none absolute inset-0 z-20 rounded-[inherit]"
        />
      )}
    </motion.div>
  )
}
