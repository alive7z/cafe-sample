import { ArrowUpRight } from 'lucide-react'
import Reveal from './ui/Reveal'
import SplitText from './ui/SplitText'
import SmartImage from './ui/SmartImage'
import TiltCard from './ui/TiltCard'
import { MENU } from '../lib/images'

export default function FeaturedMenu() {
  return (
    <section id="menu" className="relative py-28 sm:py-36 lg:py-44">
      <div className="container-x">
        <div className="mb-14 flex flex-col gap-8 lg:mb-20 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <Reveal y={20} blur={6}>
              <p className="eyebrow mb-6 flex items-center gap-3">
                <span className="h-px w-10 bg-ember/60" /> Featured Menu
              </p>
            </Reveal>
            <SplitText
              as="h2"
              text={['A short menu,', 'done beautifully.']}
              className="font-display text-[11vw] font-light leading-[0.98] tracking-tightest text-cream sm:text-[7vw] lg:text-[4.4rem]"
            />
          </div>
          <Reveal delay={0.1} y={24} blur={6}>
            <p className="max-w-[38ch] text-[15px] font-light leading-relaxed text-cream/55">
              Six things we’d order ourselves — from the espresso bar to the stone oven.
              Everything made to order, nothing rushed.
            </p>
          </Reveal>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {MENU.map((item, i) => (
            <Reveal key={item.name} delay={(i % 3) * 0.08} y={40} blur={0} amount={0.15}>
              <TiltCard intensity={9} className="h-full rounded-[22px]">
                <article className="group relative flex h-full flex-col overflow-hidden rounded-[22px] border border-cream/10 bg-white/[0.025] backdrop-blur-[3px] transition-colors duration-700 hover:border-ember/40">
                  <div className="relative overflow-hidden">
                    <SmartImage
                      src={item.img}
                      alt={item.name}
                      tone={item.tone}
                      hoverScale={1.12}
                      className="aspect-[4/3] w-full"
                    />
                    <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-ink/80 via-transparent to-transparent" />
                    <span className="absolute left-4 top-4 rounded-full border border-cream/15 bg-ink/40 px-3 py-1 text-[10px] uppercase tracking-[0.18em] text-cream/70 backdrop-blur-md">
                      {item.tag}
                    </span>
                  </div>

                  <div
                    className="flex flex-1 flex-col p-6"
                    style={{ transform: 'translateZ(34px)' }}
                  >
                    <div className="flex items-start justify-between gap-4">
                      <h3 className="font-display text-2xl font-light text-cream">{item.name}</h3>
                      <span className="mt-1 shrink-0 font-display text-xl font-light text-ember">
                        {item.price}
                      </span>
                    </div>
                    <p className="mt-3 flex-1 text-[13.5px] font-light leading-relaxed text-cream/50">
                      {item.description}
                    </p>

                    <button className="group/btn mt-6 inline-flex w-fit items-center gap-2 text-[11px] uppercase tracking-[0.2em] text-cream/70 transition-colors duration-500 hover:text-white">
                      View
                      <span className="grid h-7 w-7 place-items-center rounded-full border border-cream/20 transition-all duration-500 group-hover/btn:border-ember group-hover/btn:bg-ember group-hover/btn:text-ink">
                        <ArrowUpRight size={13} />
                      </span>
                    </button>
                  </div>
                </article>
              </TiltCard>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
