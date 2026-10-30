import { useState } from 'react'
import { Clock, MapPin, Navigation, Mail } from 'lucide-react'
import Reveal from './ui/Reveal'
import SplitText from './ui/SplitText'
import { SITE } from '../lib/site'

const ADDRESS = SITE.address
const EMAIL = SITE.email
const MAP_EMBED = SITE.mapEmbed
const DIRECTIONS = SITE.directions

const HOURS = SITE.hours

export default function Location() {
  const [mapActive, setMapActive] = useState(false)
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
            className="font-display text-[11vw] font-light leading-[0.98] tracking-tightest text-espresso sm:text-[7vw] lg:text-[4.4rem]"
          />
        </div>

        <div className="grid gap-10 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-5">
            <p className="mb-6 text-xs leading-relaxed text-espresso/70">A sample café in Bandra West. Address, hours, and contact details are illustrative.</p>
            <Reveal y={30} blur={8}>
              <div className="flex items-start gap-4 border-b border-espresso/10 pb-7">
                <MapPin size={19} className="mt-1 shrink-0 text-ember" />
                <div>
                  <p className="text-[11px] uppercase tracking-[0.2em] text-espresso/70">Address</p>
                  <p className="mt-2 font-display text-xl font-light leading-snug text-espresso">
                    {ADDRESS}
                  </p>
                </div>
              </div>
            </Reveal>

            <Reveal y={30} blur={8} delay={0.06}>
              <div className="flex items-start gap-4 border-b border-espresso/10 py-7">
                <Clock size={19} className="mt-1 shrink-0 text-ember" />
                <div className="flex-1">
                  <p className="text-[11px] uppercase tracking-[0.2em] text-espresso/70">Opening Hours</p>
                  <div className="mt-3 space-y-2">
                    {HOURS.map((row) => (
                      <div key={row.d} className="flex items-baseline justify-between gap-4 text-[14px]">
                        <span className="text-espresso/70">{row.d}</span>
                        <span className="text-espresso/85">{row.h}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </Reveal>

            <Reveal y={30} blur={8} delay={0.12}>
              <div className="flex items-start gap-4 border-b border-espresso/10 py-7">
                <Mail size={19} className="mt-1 shrink-0 text-ember" />
                <div>
                  <p className="text-[11px] uppercase tracking-[0.2em] text-espresso/70">Get in touch</p>
                  <a
                    href={`mailto:${SITE.email}`}
                    className="mt-2 block font-display text-xl font-light text-espresso transition-colors hover:text-ember"
                  >
                    {EMAIL}
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
                <a href={`mailto:${SITE.email}`} className="btn btn-ghost">
                  Email us
                </a>
              </div>
            </Reveal>
          </div>

          <Reveal y={40} blur={0} className="lg:col-span-7">
            <div className="relative h-[340px] overflow-hidden rounded-[24px] border border-espresso/10 sm:h-[440px] lg:h-full lg:min-h-[520px]">
              <iframe
                id="cafe-map"
                tabIndex={mapActive ? 0 : -1}
                inert={mapActive ? undefined : ''}
                title="Café location"
                src={MAP_EMBED}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className={`h-full w-full saturate-[0.65] ${mapActive ? '' : 'pointer-events-none'}`} onKeyDown={event => { if (event.key === 'Escape') setMapActive(false) }}
                style={{ border: 0 }}
              />
              {!mapActive && <div className="absolute inset-0 flex items-center justify-center bg-cream/20">
                <button onClick={() => setMapActive(true)} aria-controls="cafe-map" aria-expanded={false} className="btn btn-solid shadow-lg">Explore map <MapPin size={15} /></button>
              </div>}
              {mapActive && <button onClick={() => setMapActive(false)} aria-controls="cafe-map" aria-expanded={true} className="absolute right-4 top-4 rounded-full border border-espresso/20 bg-cream px-5 py-3 text-xs font-medium text-espresso shadow-md">Stop exploring map</button>}
              <div className="pointer-events-none absolute inset-0 rounded-[24px] ring-1 ring-inset ring-espresso/10" />
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  )
}
