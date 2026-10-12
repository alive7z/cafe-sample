import { useState } from 'react'
import { motion, useMotionValueEvent, useScroll } from 'framer-motion'
import { Menu, X } from 'lucide-react'
import { scrollToId } from '../hooks/useLenis'

const LINKS = [
  { label: 'Home', id: '#home' },
  { label: 'About', id: '#about' },
  { label: 'Menu', id: '#menu' },
  { label: 'Gallery', id: '#gallery' },
  { label: 'Location', id: '#location' },
]

export default function Navbar() {
  const [solid, setSolid] = useState(false)
  const [open, setOpen] = useState(false)
  const { scrollY } = useScroll()

  useMotionValueEvent(scrollY, 'change', (v) => {
    setSolid(v > 40)
  })

  const go = (id) => {
    setOpen(false)
    scrollToId(id)
  }

  return (
    <>
      <motion.header
        initial={{ y: -30, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 1, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
        className={`fixed inset-x-0 top-0 z-50 transition-all duration-700 ease-cinematic ${
          solid
            ? 'border-b border-cream/10 bg-ink/70 backdrop-blur-xl'
            : 'border-b border-transparent bg-transparent'
        }`}
      >
        <nav className="container-x flex h-[72px] items-center justify-between">
          <button
            onClick={() => go('#home')}
            className="group flex items-baseline gap-[2px] font-display text-[22px] font-light tracking-tight text-cream"
            aria-label="NÒIR home"
          >
            NÒIR
            <span className="mb-[3px] h-[5px] w-[5px] rounded-full bg-ember transition-transform duration-500 group-hover:scale-150" />
          </button>

          <div className="hidden items-center gap-9 md:flex">
            {LINKS.map((l) => (
              <button
                key={l.id}
                onClick={() => go(l.id)}
                className="group relative text-[12px] uppercase tracking-[0.22em] text-cream/70 transition-colors duration-500 hover:text-white"
              >
                {l.label}
                <span className="absolute -bottom-1.5 left-0 h-px w-0 bg-ember transition-all duration-500 ease-cinematic group-hover:w-full" />
              </button>
            ))}
          </div>

          <div className="flex items-center gap-3">
            <button onClick={() => go('#location')} className="btn btn-ghost hidden !py-2.5 !px-6 !text-[11px] sm:inline-flex">
              Visit Us
            </button>
            <button
              onClick={() => setOpen((o) => !o)}
              className="grid h-10 w-10 place-items-center rounded-full border border-cream/15 text-cream md:hidden"
              aria-label="Toggle menu"
            >
              {open ? <X size={18} /> : <Menu size={18} />}
            </button>
          </div>
        </nav>
      </motion.header>

      <motion.div
        initial={false}
        animate={open ? { opacity: 1, pointerEvents: 'auto' } : { opacity: 0, pointerEvents: 'none' }}
        transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        className="fixed inset-0 z-40 bg-ink/95 backdrop-blur-2xl md:hidden"
      >
        <div className="flex h-full flex-col justify-center gap-2 px-8">
          {LINKS.map((l, i) => (
            <motion.button
              key={l.id}
              onClick={() => go(l.id)}
              initial={false}
              animate={open ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
              transition={{ delay: open ? 0.1 + i * 0.06 : 0, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
              className="border-b border-cream/10 py-5 text-left font-display text-4xl font-light text-cream"
            >
              {l.label}
            </motion.button>
          ))}
          <button onClick={() => go('#location')} className="btn btn-solid mt-8 w-fit">
            Visit Us
          </button>
        </div>
      </motion.div>
    </>
  )
}
