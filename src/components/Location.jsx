import { Clock, MapPin, Navigation, Phone } from 'lucide-react'
import Reveal from './ui/Reveal'
import SplitText from './ui/SplitText'
import { SITE } from '../lib/site'

const ADDRESS = SITE.address
const PHONE = SITE.phoneDisplay
const MAP_EMBED = SITE.mapEmbed
const DIRECTIONS = SITE.directions

const HOURS = SITE.hours

export default function Location() {
  return (
    <section id="location" className="relative py-28 sm:py-36 lg:py-44">
      <div className="container-x">
        <div className="mb-14 max-w-[24ch] lg:mb-20">
          <Reveal y={20} blur={6}>
            <p className="eyebrow mb-6 flex items-center gap-3">
              <span className="h-px w-10 bg-ember/60" /> Find Us
            </p>
          </Reveal>
          <SplitText
            as="h2"
            text={['Find your', 'favourite corner.']}
            className="font-display text-[11vw] font-light leading-[0.98] tracking-tightest text-cream sm:text-[7vw] lg:text-[4.4rem]"
          />
        </div>

        <div className="grid gap-10 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-5">
            <Reveal y={30} blur={8}>
              <div className="flex items-start gap-4 border-b border-cream/10 pb-7">
                <MapPin size={19} className="mt-1 shrink-0 text-ember" />
                <div>
                  <p className="text-[11px] uppercase tracking-[0.2em] text-cream/40">Address</p>
                  <p className="mt-2 font-display text-xl font-light leading-snug text-cream">
                    {ADDRESS}
                  </p>
                </div>
              </div>
            </Reveal>

            <Reveal y={30} blur={8} delay={0.06}>
              <div className="flex items-start gap-4 border-b border-cream/10 py-7">
                <Clock size={19} className="mt-1 shrink-0 text-ember" />
                <div className="flex-1">
                  <p className="text-[11px] uppercase tracking-[0.2em] text-cream/40">Opening Hours</p>
                  <div className="mt-3 space-y-2">
                    {HOURS.map((row) => (
                      <div key={row.d} className="flex items-baseline justify-between gap-4 text-[14px]">
                        <span className="text-cream/60">{row.d}</span>
                        <span className="text-cream/85">{row.h}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </Reveal>

            <Reveal y={30} blur={8} delay={0.12}>
              <div className="flex items-start gap-4 border-b border-cream/10 py-7">
                <Phone size={19} className="mt-1 shrink-0 text-ember" />
                <div>
                  <p className="text-[11px] uppercase tracking-[0.2em] text-cream/40">Reservations</p>
                  <a
                    href={SITE.phoneHref}
                    className="mt-2 block font-display text-xl font-light text-cream transition-colors hover:text-ember"
                  >
                    {PHONE}
                  </a>
                </div>
              </div>
            </Reveal>

            <Reveal y={30} blur={8} delay={0.18}>
              <div className="mt-9 flex flex-col gap-4 sm:flex-row">
                <a
                  href={DIRECTIONS}
                  target="_blank"
                  rel="noreferrer"
                  className="btn btn-solid group"
                >
                  Get Directions
                  <Navigation size={15} className="transition-transform duration-500 group-hover:translate-x-1" />
                </a>
                <a href={SITE.phoneHref} className="btn btn-ghost">
                  Call
                </a>
              </div>
            </Reveal>
          </div>

          <Reveal y={40} blur={0} className="lg:col-span-7">
            <div className="relative h-[340px] overflow-hidden rounded-[24px] border border-cream/10 sm:h-[440px] lg:h-full lg:min-h-[520px]">
              <iframe
                title="Café location"
                src={MAP_EMBED}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="h-full w-full grayscale-[0.85] contrast-[1.05] [filter:invert(0.92)_hue-rotate(180deg)_grayscale(0.3)_brightness(0.9)]"
                style={{ border: 0 }}
              />
              <div className="pointer-events-none absolute inset-0 rounded-[24px] ring-1 ring-inset ring-cream/10" />
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  )
}
