import { useRef, useState } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'

const easing = [0.22, 1, 0.36, 1]

/**
 * Lazy image with a warm gradient placeholder and fade-in-on-load.
 * - Static variant renders a plain, sharp image (no transforms at rest).
 * - Parallax variant uses a taller element window + translation (no scaling),
 *   so movement never upscales the source and stays crisp.
 * - hoverScale (default 1) composes a subtle zoom via Framer Motion.
 */
export default function SmartImage(props) {
  return props.parallax ? <ParallaxSmartImage {...props} /> : <StaticSmartImage {...props} />
}

function useImageLoad() {
  const [loaded, setLoaded] = useState(false)
  const [failed, setFailed] = useState(false)
  return {
    loaded,
    failed,
    onLoad: () => setLoaded(true),
    onError: () => setFailed(true),
  }
}

function Gradient() {
  return (
    <div
      aria-hidden
      className="absolute inset-0 opacity-70"
      style={{
        background: `radial-gradient(120% 100% at 30% 0%, rgba(192,138,94,.28), rgba(11,11,11,.15) 55%, rgba(11,11,11,.6))`,
      }}
    />
  )
}

function StaticSmartImage({
  src,
  alt = '',
  tone = '#241a14',
  className = '',
  imgClassName = '',
  priority = false,
  hoverScale = 1,
}) {
  const { loaded, failed, onLoad, onError } = useImageLoad()
  const hasHover = hoverScale !== 1

  return (
    <div className={`relative overflow-hidden ${className}`} style={{ backgroundColor: tone }}>
      <Gradient />
      <motion.img
        src={src}
        alt={alt}
        loading={priority ? 'eager' : 'lazy'}
        decoding="async"
        draggable={false}
        onLoad={onLoad}
        onError={onError}
        initial={{ opacity: 0 }}
        animate={{ opacity: loaded && !failed ? 1 : 0 }}
        whileHover={hasHover ? { scale: hoverScale } : undefined}
        transition={{ duration: 1.1, ease: easing }}
        className={`h-full w-full object-cover ${hasHover ? 'will-change-transform' : ''} ${imgClassName}`}
      />
    </div>
  )
}

function ParallaxSmartImage({
  src,
  alt = '',
  tone = '#241a14',
  className = '',
  imgClassName = '',
  priority = false,
  parallax = 20,
  hoverScale = 1,
}) {
  const wrapRef = useRef(null)
  const { loaded, failed, onLoad, onError } = useImageLoad()
  const hasHover = hoverScale !== 1

  const { scrollYProgress } = useScroll({
    target: wrapRef,
    offset: ['start end', 'end start'],
  })
  const y = useTransform(scrollYProgress, [0, 1], [parallax, -parallax])

  return (
    <div ref={wrapRef} className={`relative overflow-hidden ${className}`} style={{ backgroundColor: tone }}>
      <Gradient />
      <motion.img
        src={src}
        alt={alt}
        loading={priority ? 'eager' : 'lazy'}
        decoding="async"
        draggable={false}
        onLoad={onLoad}
        onError={onError}
        style={{ y }}
        initial={{ opacity: 0 }}
        animate={{ opacity: loaded && !failed ? 1 : 0 }}
        whileHover={hasHover ? { scale: hoverScale } : undefined}
        transition={{ duration: 1.1, ease: easing }}
        className={`absolute inset-x-0 -top-[18%] h-[136%] w-full object-cover will-change-transform ${imgClassName}`}
      />
    </div>
  )
}