import { useCallback, useRef } from 'react'
import { ArrowLeft, ArrowRight } from 'lucide-react'
import Reveal from './ui/Reveal'
import SplitText from './ui/SplitText'
import SmartImage from './ui/SmartImage'
import { GALLERY } from '../lib/images'

export default function Gallery() {
  const scroller = useRef(null)

  const nudge = useCallback((dir) => {
    const el = scroller.current
    if (!el) return
    const amount = el.clientWidth * 0.7
    el.scrollBy({ left: dir * amount, behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'instant' : 'smooth' })
  }, [])

  return (
    <section id="gallery" className="relative py-28 sm:py-36 lg:py-44">
      <div className="container-x mb-12 flex flex-col gap-8 sm:flex-row sm:items-end sm:justify-between lg:mb-16">
        <div>
          <Reveal y={20} blur={6}>
            <p className="eyebrow mb-6 flex items-center gap-3">
              <span className="h-px w-10 bg-ember/60" /> Gallery
            </p>
          </Reveal>
          <SplitText
            as="h2"
            text={['Moments, in still.']}
            className="font-display text-[11vw] font-light leading-[0.98] tracking-tightest text-cream sm:text-[7vw] lg:text-[4.4rem]"
          />
        </div>

        <div className="hidden gap-3 sm:flex">
          <button
            onClick={() => nudge(-1)}
            aria-label="Previous"
            className="grid h-12 w-12 place-items-center rounded-full border border-cream/15 text-cream transition-all duration-500 hover:border-ember hover:bg-ember hover:text-ink"
          >
            <ArrowLeft size={17} />
          </button>
          <button
            onClick={() => nudge(1)}
            aria-label="Next"
            className="grid h-12 w-12 place-items-center rounded-full border border-cream/15 text-cream transition-all duration-500 hover:border-ember hover:bg-ember hover:text-ink"
          >
            <ArrowRight size={17} />
          </button>
        </div>
      </div>

      <div className="relative">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-y-0 left-0 z-10 w-16 bg-gradient-to-r from-ink to-transparent lg:w-28"
        />
        <div
          aria-hidden
          className="pointer-events-none absolute inset-y-0 right-0 z-10 w-16 bg-gradient-to-l from-ink to-transparent lg:w-28"
        />

        <div
          ref={scroller}
          tabIndex={0}
          role="region"
          aria-label="Café photo gallery, scroll horizontally to explore"
          className="no-scrollbar flex snap-x snap-mandatory gap-5 overflow-x-auto scroll-smooth px-6 pb-4 sm:px-8 lg:px-14"
        >
          {GALLERY.map((g, i) => (
            <Reveal
              key={g.label}
              delay={(i % 3) * 0.06}
              y={30}
              blur={0}
              amount={0.1}
              className="shrink-0 snap-start"
            >
              <figure className="group relative h-[46vh] w-[78vw] overflow-hidden rounded-[24px] border border-cream/10 sm:h-[54vh] sm:w-[440px] lg:w-[520px]">
                <SmartImage
                  src={g.img}
                  alt={g.label}
                  tone="#1c1410"
                  hoverScale={1.1}
                  className="h-full w-full"
                />
                <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-ink/70 to-transparent" />
                <figcaption className="absolute bottom-6 left-6 font-display text-xl font-light text-cream">
                  {g.label}
                  <span className="mt-1 block text-[10px] uppercase tracking-[0.22em] text-ember/90">
                    0{i + 1} / 0{GALLERY.length}
                  </span>
                </figcaption>
              </figure>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
