import Reveal from './ui/Reveal'
import SmartImage from './ui/SmartImage'
import { IMAGES } from '../lib/images'

export default function SignatureCoffee() {
  return (
    <section id="signature" className="signature-section relative overflow-hidden border-y border-cream/10">
      <div className="grid lg:grid-cols-2">
        <SmartImage src={IMAGES.signature} alt="The daily ritual of freshly brewed specialty coffee" className="h-[340px] lg:h-full lg:min-h-[520px]" />
        <div className="flex items-center bg-[#20221c] px-6 py-16 sm:px-12 lg:px-20">
          <Reveal y={20}>
            <p className="eyebrow mb-7">The signature pour</p>
            <h2 className="font-display text-5xl font-light leading-[1.05] tracking-tightest sm:text-6xl">Crafted.<br />Poured.<br /><em className="text-ember">Perfected.</em></h2>
            <p className="mt-7 max-w-[40ch] text-sm leading-[1.9] text-cream/65">Eighteen grams in, thirty-six out. A steady hand, a warm cup, and a few seconds of patience — the difference between a coffee and a moment.</p>
            <p className="mt-8 border-t border-cream/15 pt-5 text-[10px] uppercase tracking-[0.2em] text-ember">Small batches. Every single day.</p>
          </Reveal>
        </div>
      </div>
    </section>
  )
}
