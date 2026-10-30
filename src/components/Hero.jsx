import { ArrowDown, ArrowUpRight, Coffee } from 'lucide-react'
import SmartImage from './ui/SmartImage'
import { IMAGES } from '../lib/images'

export default function Hero() {
  return (
    <section id="home" className="hero relative overflow-hidden">
      <div className="container-x relative grid gap-12 pb-12 pt-32 lg:grid-cols-[1.05fr_1fr] lg:items-stretch lg:gap-16 lg:pb-20 lg:pt-40">
        <div className="hero-copy relative z-10 min-w-0">
          <p className="eyebrow mb-8 flex items-center gap-3"><span className="h-px w-8 bg-ember" /> A little ritual. A better day.</p>
          <h1 className="text-balance font-display text-[clamp(3.5rem,7.5vw,7.5rem)] font-light leading-[0.98] tracking-tightest">Good coffee.<br />Good company.<br /><em className="text-ember">Take your time.</em></h1>
          <p className="mt-8 max-w-[38ch] text-[15px] leading-[1.85] text-espresso/65">Small-batch coffee, honest food, and a favourite corner waiting for you. Welcome to Your Restaurant.</p>
          <div className="mt-9 flex flex-wrap gap-3">
            <a href="#menu" className="btn btn-solid group">Explore the menu <ArrowUpRight size={17} className="transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" /></a>
            <a href="#location" className="btn btn-ghost">Find your way here</a>
          </div>
        </div>
        <div className="hero-photo relative mx-auto w-full max-w-[650px] lg:col-start-2 lg:row-start-1 lg:min-h-0">
          <SmartImage src={IMAGES.heroCupFallback} alt="A freshly made iced coffee, ready for a slow morning" priority className="aspect-[4/4.5] w-full rounded-t-[45%] rounded-b-[12px] lg:absolute lg:inset-0 lg:h-full lg:aspect-auto" imgClassName="hero-image" />
          <div className="absolute -bottom-4 right-3 max-w-[230px] rounded-sm border border-espresso/15 bg-[#fff9f0] px-6 py-5 shadow-lg shadow-espresso/10 sm:-right-4"><p className="text-[9px] uppercase tracking-[0.24em] text-ember">Made your way</p><p className="mt-2 font-display text-xl font-light italic">Made with care.<br />Enjoyed without a hurry.</p></div>
          <span className="absolute -top-7 left-6 hidden text-[9px] uppercase tracking-[0.3em] text-espresso/70 lg:block">Your daily dose of slow</span>
        </div>
        <div className="flex items-center gap-4 border-t border-espresso/10 pt-6 lg:col-start-1 lg:row-start-2"><Coffee size={22} strokeWidth={1} className="text-ember" /><p className="text-[11px] leading-relaxed tracking-wide text-espresso/70">Specialty coffee. Neighbourhood soul.<br /><span className="text-espresso/75">Bandra West, Mumbai · Est. 2014</span></p></div>
      </div>
      <div className="container-x flex items-center justify-between border-t border-espresso/10 py-5 text-[9px] uppercase tracking-[0.22em] text-espresso/70"><span>Coffee · Kitchen · Conversation</span><a href="#about" className="flex items-center gap-3">A little more about us <ArrowDown size={13} /></a></div>
    </section>
  )
}
