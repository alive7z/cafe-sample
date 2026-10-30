import { motion, useReducedMotion } from 'framer-motion'

export default function Reveal({ children, as = 'div', delay = 0, y = 20, once = true, amount = 0.15, className }) {
  const reduce = useReducedMotion()
  const MotionTag = motion[as] || motion.div
  return <MotionTag className={className} initial={reduce ? false : { opacity: 0, y: Math.min(y, 20) }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once, amount }} transition={{ duration: 0.5, delay: Math.min(delay, 0.15), ease: [0.22, 1, 0.36, 1] }}>{children}</MotionTag>
}
