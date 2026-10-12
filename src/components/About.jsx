import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import Reveal from './ui/Reveal'
import SplitText from './ui/SplitText'
import SmartImage from './ui/SmartImage'
import { IMAGES } from '../lib/images'

const STATS = [
  { k: '12', l: 'Single origins on rotation' },
  { k: '48h', l: 'Fermented house sourdough' },
  { k: '2014', l: 'Serving the neighbourhood' },
]

export default function About() {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] })
  const y1 = useTransform(scrollYProgress, [0, 1], [60, -60])
  const y2 = useTransform(scrollYProgress, [0, 1], [110, -110])

  return (
    <section id="about" ref={ref} className="relative py-28 sm:py-36 lg:py-44">
      <div className="container-x">
        <div className="mb-16 grid gap-10 lg:mb-24 lg:grid-cols-12 lg:items-end">
          <div className="lg:col-span-8">
            <Reveal y={24} blur={6}>
              <p className="eyebrow mb-6 flex items-center gap-3">
                <span className="h-px w-10 bg-ember/60" /> Our Philosophy
              </p>
            </Reveal>
            <SplitText
              as="h2"
              text={['Coffee made for moments', 'worth remembering.']}
              className="max-w-[18ch] font-display text-[10.5vw] font-light leading-[0.98] tracking-tightest text-cream sm:text-[7vw] lg:text-[4.6rem]"
            />
          </div>
          <div className="lg:col-span-4">
            <Reveal delay={0.15} y={30} blur={8}>
              <p className="text-pretty text-[15px] font-light leading-relaxed text-cream/60">
                We roast in small batches, pull shots by hand, and plate food the way we’d
                want to eat it. No shortcuts, no noise — just a warm room and things done
                properly.
              </p>
            </Reveal>
          </div>
        </div>

        <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-20">
          <div className="relative">
            <motion.div style={{ y: y1 }} className="relative">
              <div className="group overflow-hidden rounded-[22px]">
                <SmartImage
                  src={IMAGES.aboutMain}
                  alt="Inside the café"
                  tone="#241a14"
                  parallax={30}
                  hoverScale={1.1}
                  className="aspect-[4/5] w-full rounded-[22px]"
                />
              </div>
            </motion.div>

            <motion.div
              style={{ y: y2 }}
              className="absolute -bottom-10 -right-4 w-[46%] max-w-[260px] sm:-right-8"
            >
              <div className="overflow-hidden rounded-[18px] border border-cream/10 shadow-2xl shadow-black/60">
                <SmartImage
                  src={IMAGES.aboutDetail}
                  alt="Barista at work"
                  tone="#1c1410"
                  className="aspect-square w-full rounded-[18px]"
                />
              </div>
            </motion.div>

            <div className="absolute -top-6 left-6 hidden -rotate-90 origin-left text-[10px] uppercase tracking-widest2 text-cream/30 xl:block">
              Est. 2014 — Roastery
            </div>
          </div>

          <div className="lg:pl-6">
            <Reveal y={30} blur={8}>
              <p className="text-[15px] font-light leading-[1.9] text-cream/70">
                NÒIR began as a single espresso machine tucked into a corner of the old
                quarter. A decade later the spirit hasn’t changed: we still weigh every
                dose, taste every batch, and treat the room like our own living room.
              </p>
            </Reveal>
            <Reveal delay={0.1} y={30} blur={8}>
              <p className="mt-5 text-[15px] font-light leading-[1.9] text-cream/55">
                Come for the coffee, stay for the kitchen. The playlist stays low, the
                light stays warm, and the door is always open a little longer than the
                sign suggests.
              </p>
            </Reveal>

            <div className="mt-12 grid grid-cols-3 gap-6 border-t border-cream/10 pt-8">
              {STATS.map((s, i) => (
                <Reveal key={s.k} delay={0.1 + i * 0.08} y={24} blur={6}>
                  <p className="font-display text-3xl font-light text-cream sm:text-4xl">{s.k}</p>
                  <p className="mt-2 text-[11px] leading-snug tracking-wide text-cream/45">{s.l}</p>
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
