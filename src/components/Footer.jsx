import { Instagram, Facebook, Twitter } from 'lucide-react'
import { scrollToId } from '../hooks/useLenis'

const NAV = [
  { label: 'Home', id: '#home' },
  { label: 'About', id: '#about' },
  { label: 'Menu', id: '#menu' },
  { label: 'Gallery', id: '#gallery' },
  { label: 'Location', id: '#location' },
]

export default function Footer() {
  return (
    <footer className="relative border-t border-cream/10 pt-16">
      <div className="container-x">
        <div className="grid gap-12 pb-14 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <button
              onClick={() => scrollToId('#home')}
              className="flex items-baseline gap-[2px] font-display text-[26px] font-light tracking-tight text-cream"
            >
              NÒIR
              <span className="mb-[4px] h-[5px] w-[5px] rounded-full bg-ember" />
            </button>
            <p className="mt-6 max-w-[34ch] text-[14px] font-light leading-relaxed text-cream/50">
              A cinematic café experience. Handcrafted coffee, good food, and moments
              worth remembering.
            </p>
            <div className="mt-8 flex gap-3">
              {[Instagram, Facebook, Twitter].map((Icon, i) => (
                <a
                  key={i}
                  href="#"
                  className="grid h-10 w-10 place-items-center rounded-full border border-cream/15 text-cream/70 transition-all duration-500 hover:border-ember hover:text-ember"
                  aria-label="Social link"
                >
                  <Icon size={16} />
                </a>
              ))}
            </div>
          </div>

          <div className="lg:col-span-3">
            <p className="text-[11px] uppercase tracking-[0.2em] text-cream/40">Explore</p>
            <ul className="mt-5 space-y-3">
              {NAV.map((n) => (
                <li key={n.id}>
                  <button
                    onClick={() => scrollToId(n.id)}
                    className="text-[14px] font-light text-cream/65 transition-colors duration-500 hover:text-white"
                  >
                    {n.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          <div className="lg:col-span-4">
            <p className="text-[11px] uppercase tracking-[0.2em] text-cream/40">Stay in the loop</p>
            <p className="mt-5 text-[14px] font-light leading-relaxed text-cream/55">
              Seasonal roasts and quiet openings — occasionally, never often.
            </p>
            <form
              onSubmit={(e) => e.preventDefault()}
              className="mt-5 flex items-center gap-3 border-b border-cream/15 pb-3 focus-within:border-ember/60 transition-colors duration-500"
            >
              <input
                type="email"
                required
                placeholder="your@email.com"
                className="w-full bg-transparent text-[14px] text-cream placeholder:text-cream/30 focus:outline-none"
              />
              <button
                type="submit"
                className="shrink-0 text-[11px] uppercase tracking-[0.2em] text-ember transition-colors hover:text-white"
              >
                Join
              </button>
            </form>
          </div>
        </div>

        <div className="hairline" />
        <div className="flex flex-col items-center justify-between gap-3 py-7 text-[11px] tracking-wide text-cream/35 sm:flex-row">
          <p>© {new Date().getFullYear()} NÒIR Café. All rights reserved.</p>
          <p>Crafted with care, served with warmth.</p>
        </div>
      </div>
    </footer>
  )
}
