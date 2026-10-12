import { lazy, Suspense, useEffect, useRef, useState } from 'react'
import { motion, useInView, useScroll, useTransform } from 'framer-motion'
import { ArrowRight } from 'lucide-react'
import SplitText from './ui/SplitText'
import SmartImage from './ui/SmartImage'
import useDeviceTier from '../hooks/useDeviceTier'
import { IMAGES } from '../lib/images'
import { SITE } from '../lib/site'
import { scrollToId } from '../hooks/useLenis'

const CoffeeScene = lazy(() => import('../three/CoffeeScene'))

export default function Hero() {
  const ref = useRef(null)
  const tier = useDeviceTier()
  const [ready, setReady] = useState(false)
  const inView = useInView(ref, { margin: '300px' })

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start start', 'end start'],
  })

  const textOpacity = useTransform(scrollYProgress, [0, 0.55], [1, 0])
  const textY = useTransform(scrollYProgress, [0, 0.6], [0, -140])
  const cueOpacity = useTransform(scrollYProgress, [0, 0.12], [1, 0])

  useEffect(() => {
    const id = setTimeout(() => setReady(true), 350)
    return () => clearTimeout(id)
  }, [])

  return (
    <section id="home" ref={ref} className="relative h-[100svh] min-h-[640px] w-full overflow-hidden">
      <div aria-hidden className="glow-brown pointer-events-none absolute inset-0" />
      <div
        aria-hidden
        className="pointer-events-none absolute left-1/2 top-1/2 h-[70vmin] w-[70vmin] -translate-x-1/2 -translate-y-[58%] rounded-full opacity-70 blur-[70px]"
        style={{ background: 'radial-gradient(circle, rgba(192,138,94,.35), rgba(11,11,11,0) 70%)' }}
      />

      <div className="absolute inset-0">
        {tier !== 'static' && ready ? (
          <Suspense
            fallback={
              <div className="absolute inset-0 opacity-40">
                <SmartImage src={IMAGES.heroCupFallback} alt="" tone="#160f0a" className="h-full w-full" parallax={0} />
              </div>
            }
          >
            <CoffeeScene
              tier={tier}
              scrollProgress={scrollYProgress}
              position={[0, -0.72, 0]}
              scale={1.12}
              camera={{ position: [0, 0, 5.5], fov: 35 }}
              active={inView}
              pointerAmount={0.55}
              spin={0.02}
              steam
            />
          </Suspense>
        ) : (
          <div className="absolute inset-0 opacity-[0.28] blur-[2px]">
            <SmartImage src={IMAGES.heroCupFallback} alt="" tone="#160f0a" className="h-full w-full" />
          </div>
        )}
      </div>

      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            'radial-gradient(80% 60% at 50% 45%, rgba(11,11,11,0) 30%, rgba(11,11,11,.55) 72%, rgba(11,11,11,.9) 100%)',
        }}
      />
      <div aria-hidden className="pointer-events-none absolute inset-x-0 bottom-0 h-56 bg-gradient-to-t from-ink via-ink/60 to-transparent" />

      <motion.div
        style={{ opacity: textOpacity, y: textY }}
        className="container-x relative z-10 flex h-full flex-col items-center justify-center text-center"
      >
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.5, ease: [0.22, 1, 0.36, 1] }}
          className="eyebrow mb-7 text-white"
        >
          {SITE.tagline}
        </motion.p>

        <SplitText
          as="h1"
          text={['More Than Coffee.', "It's an Experience."]}
          delay={0.65}
          stagger={0.09}
          className="max-w-[16ch] font-display text-[13vw] font-light leading-[0.95] tracking-tightest text-cream sm:text-[9vw] lg:text-[6.6rem]"
        />

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 1.15, ease: [0.22, 1, 0.36, 1] }}
          className="mt-8 max-w-[52ch] text-pretty text-[15px] font-light leading-relaxed text-cream/70 sm:text-base"
        >
          Handcrafted coffee, honest food, and unhurried moments — served in a room
          designed to make you stay a little longer.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 1.35, ease: [0.22, 1, 0.36, 1] }}
          className="mt-11 flex flex-col items-center gap-4 sm:flex-row"
        >
          <button onClick={() => scrollToId('#menu')} className="btn btn-solid group w-full sm:w-auto">
            Explore Menu
            <ArrowRight size={15} className="transition-transform duration-500 group-hover:translate-x-1" />
          </button>
          <button onClick={() => scrollToId('#location')} className="btn btn-ghost w-full sm:w-auto">
            Visit Us
          </button>
        </motion.div>
      </motion.div>

      <motion.div
        style={{ opacity: cueOpacity }}
        className="absolute inset-x-0 bottom-8 z-10 flex flex-col items-center gap-3"
      >
        <span className="text-[10px] uppercase tracking-widest2 text-cream/40">Scroll</span>
        <span className="relative h-12 w-px overflow-hidden bg-cream/15">
          <motion.span
            className="absolute left-0 top-0 h-5 w-px bg-ember"
            animate={{ y: [-20, 48] }}
            transition={{ duration: 2.4, repeat: Infinity, ease: 'easeInOut' }}
          />
        </span>
      </motion.div>
    </section>
  )
}
