import { motion } from 'framer-motion'

const easing = [0.22, 1, 0.36, 1]

export default function Reveal({
  children,
  as = 'div',
  delay = 0,
  duration = 1,
  y = 48,
  x = 0,
  scale = 1,
  blur = 0,
  once = true,
  amount = 0.25,
  className,
}) {
  const MotionTag = motion[as] || motion.div
  const from = blur > 0 ? { opacity: 0, y, x, scale, filter: `blur(${blur}px)` } : { opacity: 0, y, x, scale }
  const to = blur > 0 ? { opacity: 1, y: 0, x: 0, scale: 1, filter: 'blur(0px)' } : { opacity: 1, y: 0, x: 0, scale: 1 }
  return (
    <MotionTag
      className={className}
      initial={from}
      whileInView={to}
      viewport={{ once, amount }}
      transition={{ duration, delay, ease: easing }}
    >
      {children}
    </MotionTag>
  )
}
