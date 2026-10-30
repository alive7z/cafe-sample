import { useState } from 'react'
import { ArrowUpRight, Mail } from 'lucide-react'
import { SITE } from '../lib/site'
import { scrollToId } from '../hooks/useLenis'

const NAV = [
  { label: 'Home', id: '#home' },
  { label: 'About', id: '#about' },
  { label: 'Menu', id: '#menu' },
  { label: 'Gallery', id: '#gallery' },
  { label: 'Location', id: '#location' },
]

export default function Footer() {
  const [message, setMessage] = useState('')
  const savePreference = (event) => {
    event.preventDefault()
    const email = new FormData(event.currentTarget).get('email')
    try {
      localStorage.setItem('restaurant-demo-newsletter-email', email)
      setMessage('Email saved on this device. This sample does not send newsletters.')
      event.currentTarget.reset()
    } catch {
      setMessage('Your browser could not save your email. Please try again with storage enabled.')
    }
  }
  return (
    <footer className="relative border-t border-cream/10 pt-16">
      <div className="container-x">
        <div className="grid gap-12 pb-14 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <button
              onClick={() => scrollToId('#home')}
              className="flex items-baseline gap-[2px] font-display text-[26px] font-light tracking-tight text-cream"
            >
              Your Restaurant
              <span className="mb-[4px] h-[5px] w-[5px] rounded-full bg-ember" />
            </button>
            <p className="mt-6 max-w-[34ch] text-[14px] font-light leading-relaxed text-cream/50">
              A cinematic café experience. Handcrafted coffee, good food, and moments
              worth remembering.
            </p>
            <a href={`mailto:${SITE.email}`} className="mt-7 inline-flex items-center gap-3 text-sm text-ember hover:text-cream"><Mail size={16} /> Say hello <ArrowUpRight size={14} /></a>
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
              Seasonal roasts and quiet openings. Try the signup below — this sample saves your email on this device only.
            </p>
            <form
              onSubmit={savePreference}
              className="mt-5 flex items-center gap-3 border-b border-cream/15 pb-3 focus-within:border-ember/60 transition-colors duration-500"
            >
              <input
                aria-label="Email address"
                name="email"
                autoComplete="email"
                type="email"
                required
                placeholder="your@email.com"
                className="w-full bg-transparent text-[14px] text-cream placeholder:text-cream/30 focus:outline-none"
              />
              <button
                type="submit"
                className="shrink-0 text-[11px] uppercase tracking-[0.2em] text-ember transition-colors hover:text-white"
              >
                Save
              </button>
            </form>
            <p role="status" className="mt-3 text-xs leading-relaxed text-ember">{message}</p>
          </div>
        </div>

        <div className="hairline" />
        <div className="flex flex-col items-center justify-between gap-3 py-7 text-[11px] tracking-wide text-cream/35 sm:flex-row">
          <p>© {new Date().getFullYear()} Your Restaurant. All rights reserved.</p>
          <p>Crafted with care, served with warmth.</p>
        </div>
      </div>
    </footer>
  )
}
