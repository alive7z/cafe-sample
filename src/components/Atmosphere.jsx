import Reveal from './ui/Reveal'
import SplitText from './ui/SplitText'
import SmartImage from './ui/SmartImage'
import { ATMOSPHERE } from '../lib/images'

export default function Atmosphere() {
  return (
    <section id="atmosphere" className="relative py-28 sm:py-36 lg:py-44">
      <div className="container-x">
        <div className="mb-14 flex flex-col gap-6 lg:mb-20 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <Reveal y={20} blur={6}>
              <p className="eyebrow mb-6 flex items-center gap-3">
                <span className="h-px w-10 bg-ember/60" /> The Atmosphere
              </p>
            </Reveal>
            <SplitText
              as="h2"
              text={['Warm light,', 'slow hours.']}
              className="font-display text-[11vw] font-light leading-[0.98] tracking-tightest text-espresso sm:text-[7vw] lg:text-[4.4rem]"
            />
          </div>
          <Reveal delay={0.1} y={24} blur={6}>
            <p className="max-w-[36ch] text-[15px] font-light leading-relaxed text-espresso/70">
              A room built for lingering — deep wood, low light, and the hum of good
              conversation from open till close.
            </p>
          </Reveal>
        </div>

        <div className="grid auto-rows-[200px] grid-cols-1 gap-4 sm:grid-cols-2 sm:auto-rows-[230px] lg:auto-rows-[250px] lg:grid-cols-12">
          {ATMOSPHERE.map((item, i) => (
            <Reveal
              key={item.key}
              delay={(i % 3) * 0.08}
              y={40}
              blur={0}
              amount={0.1}
              className={
                item.span +
                (item.key === 'coffee' ? ' sm:col-span-2' : '') +
                (item.key === 'interior' ? ' sm:col-span-1' : '')
              }
            >
              <figure className="group relative h-full w-full overflow-hidden rounded-[20px] border border-espresso/10">
                <SmartImage
                  src={item.img}
                  alt={item.caption}
                  tone={item.tone}
                  parallax={18}
                  hoverScale={1.06}
                  className="h-full w-full"
                />
                <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-espresso/75 via-espresso/5 to-transparent opacity-90" />
                <figcaption className="absolute bottom-5 left-5 flex items-center gap-3">
                  <span className="h-px w-6 bg-cream/70" />
                  <span className="text-[11px] uppercase tracking-[0.2em] text-cream/95">
                    {item.caption}
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
