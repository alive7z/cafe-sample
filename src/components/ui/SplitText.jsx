import { motion } from 'framer-motion'

const container = (stagger, delay) => ({
  hidden: {},
  show: {
    transition: { staggerChildren: stagger, delayChildren: delay },
  },
})

const word = {
  hidden: { y: '110%', opacity: 0 },
  show: {
    y: '0%',
    opacity: 1,
    transition: { duration: 1, ease: [0.22, 1, 0.36, 1] },
  },
}

/**
 * Editorial word-by-word reveal. `text` may be a string or an array of lines.
 */
export default function SplitText({
  text,
  className = '',
  wordClassName = '',
  as: Tag = 'h2',
  stagger = 0.06,
  delay = 0,
  once = true,
}) {
  const lines = Array.isArray(text) ? text : [text]
  const MotionTag = motion[Tag] || motion.h2

  return (
    <MotionTag
      className={className}
      variants={container(stagger, delay)}
      initial="hidden"
      whileInView="show"
      viewport={{ once, amount: 0.4 }}
    >
      {lines.map((line, li) => (
        <span key={li} className="block overflow-hidden pb-[0.12em]">
          {line.split(' ').map((w, wi) => (
            <span key={wi} className="inline-block overflow-hidden align-bottom">
              <motion.span
                variants={word}
                className={`inline-block will-change-transform ${wordClassName}`}
              >
                {w}
                {wi < line.split(' ').length - 1 ? '\u00A0' : ''}
              </motion.span>
            </span>
          ))}
        </span>
      ))}
    </MotionTag>
  )
}
