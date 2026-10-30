import { ArrowRight } from 'lucide-react'
import Reveal from './ui/Reveal'
import SplitText from './ui/SplitText'
import { scrollToId } from '../hooks/useLenis'

export default function FinalCTA() {
  return (
    <section className="relative overflow-hidden py-32 sm:py-40 lg:py-52">
      <div aria-hidden className="glow-brown pointer-events-none absolute inset-0" />
      <div
        aria-hidden
        className="animate-float-slow pointer-events-none absolute left-1/2 top-1/2 h-[62vmin] w-[62vmin] -translate-x-1/2 -translate-y-1/2 rounded-full opacity-[0.5] blur-[60px]"
        style={{ background: 'radial-gradient(circle, rgba(192,138,94,.4), rgba(11,11,11,0) 68%)' }}
      />

      <div className="container-x relative z-10 flex flex-col items-center text-center">
        <Reveal y={20} blur={6}>
          <p className="eyebrow mb-8">Until Next Time</p>
        </Reveal>

        <SplitText
          as="h2"
          text={['Coffee tastes better', 'when the moment', 'feels right.']}
          stagger={0.08}
          className="max-w-[20ch] font-display text-[11vw] font-light leading-[0.98] tracking-tightest text-espresso sm:text-[7.5vw] lg:text-[5rem]"
        />

        <Reveal delay={0.3} y={26} blur={8}>
          <div className="mt-12 flex flex-col items-center gap-4 sm:flex-row">
            <button onClick={() => scrollToId('#location')} className="btn btn-solid group w-full sm:w-auto">
              Visit Us
              <ArrowRight size={15} className="transition-transform duration-500 group-hover:translate-x-1" />
            </button>
            <button onClick={() => scrollToId('#menu')} className="btn btn-ghost w-full sm:w-auto">
              View Menu
            </button>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
