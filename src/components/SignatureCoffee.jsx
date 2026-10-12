import { lazy, Suspense, useEffect, useRef, useState } from 'react'
import { motion, useInView, useScroll, useTransform } from 'framer-motion'
import Reveal from './ui/Reveal'
import SmartImage from './ui/SmartImage'
import useDeviceTier from '../hooks/useDeviceTier'
import { IMAGES } from '../lib/images'

const CoffeeScene = lazy(() => import('../three/CoffeeScene'))

export default function SignatureCoffee() {
  const ref = useRef(null)
  const tier = useDeviceTier()
  const inView = useInView(ref, { margin: '200px' })
  const [mounted, setMounted] = useState(false)
  useEffect(() => {
    if (inView && !mounted) setMounted(true)
  }, [inView, mounted])

  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] })
  const textY = useTransform(scrollYProgress, [0, 0.5, 1], [80, 0, -60])
  const glowScale = useTransform(scrollYProgress, [0, 0.5, 1], [0.8, 1.15, 0.9])

  const words = ['Crafted.', 'Poured.', 'Perfected.']

  return (
    <section id="signature" ref={ref} className="relative min-h-[100svh] overflow-hidden py-28 sm:py-36">
      <motion.div
        aria-hidden
        style={{ scale: glowScale }}
        className="glow-brown pointer-events-none absolute inset-0"
      />

      <div className="absolute inset-0">
        {tier !== 'static' && mounted ? (
          <Suspense fallback={null}>
            <CoffeeScene
              tier={tier}
              scrollProgress={scrollYProgress}
              position={[0, -0.72, 0]}
              scale={1.28}
              active={inView}
              pointerAmount={0.28}
              spin={0.16}
              steam
              camera={{ position: [0, 0, 5.8], fov: 34 }}
            />
          </Suspense>
        ) : (
          <div className="absolute inset-0 opacity-20">
            <SmartImage src={IMAGES.signature} alt="" tone="#160f0a" className="h-full w-full" />
          </div>
        )}
      </div>

      <div className="container-x relative z-10 flex min-h-[70svh] flex-col items-center justify-center text-center">
        <Reveal y={20} blur={6}>
          <p className="eyebrow mb-10 text-white">The Signature Pour</p>
        </Reveal>

        <motion.div style={{ y: textY }} className="space-y-1">
          {words.map((w, i) => (
            <div key={w} className="overflow-hidden">
              <motion.h2
                initial={{ y: '110%', opacity: 0 }}
                whileInView={{ y: '0%', opacity: 1 }}
                viewport={{ once: true, amount: 0.6 }}
                transition={{ duration: 1.1, delay: i * 0.18, ease: [0.22, 1, 0.36, 1] }}
                className="font-display text-[16vw] font-light leading-[0.9] tracking-tightest text-cream sm:text-[11vw] lg:text-[7.5rem]"
              >
                {w}
              </motion.h2>
            </div>
          ))}
        </motion.div>
      </div>

      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 bottom-0 h-56 bg-gradient-to-t from-ink via-ink/70 to-transparent"
      />

      <div className="absolute inset-x-0 bottom-[7svh] z-10 px-6 sm:bottom-[9svh]">
        <Reveal delay={0.5} y={24} blur={8}>
          <p className="mx-auto max-w-[46ch] text-center text-pretty text-[15px] font-light leading-relaxed text-cream/65">
            Eighteen grams in, thirty-six out. A steady hand, a warm cup, and a
            few seconds of patience — the difference between a coffee and a moment.
          </p>
        </Reveal>
      </div>
    </section>
  )
}
