import { useEffect, useRef, useState } from 'react'
import { Menu, X, ArrowUpRight } from 'lucide-react'

const LINKS = [
  { label: 'Our story', id: '#about' },
  { label: 'The menu', id: '#menu' },
  { label: 'The space', id: '#atmosphere' },
  { label: 'Gallery', id: '#gallery' },
]

export default function Navbar() {
  const [solid, setSolid] = useState(() => typeof window !== 'undefined' && window.scrollY > 40)
  const [open, setOpen] = useState(false)
  const toggle = useRef(null)
  const panel = useRef(null)

  useEffect(() => {
    const onScroll = () => setSolid(window.scrollY > 40)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    if (!open) return
    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    panel.current.querySelector('a')?.focus()
    const close = () => { setOpen(false); toggle.current?.focus() }
    const onKey = (event) => {
      if (event.key === 'Escape') close()
      if (event.key === 'Tab') {
        const links = [toggle.current, ...panel.current.querySelectorAll('a')]
        const first = links[0]
        const last = links[links.length - 1]
        if (event.shiftKey && document.activeElement === first) { event.preventDefault(); last.focus() }
        else if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first.focus() }
      }
    }
    const wide = window.matchMedia('(min-width: 768px)')
    const onResize = () => { if (wide.matches) close() }
    window.addEventListener('keydown', onKey)
    wide.addEventListener('change', onResize)
    return () => {
      document.body.style.overflow = previousOverflow
      window.removeEventListener('keydown', onKey)
      wide.removeEventListener('change', onResize)
    }
  }, [open])

  return (
    <header className={`fixed inset-x-0 top-0 z-50 border-b transition-colors duration-300 ${solid || open ? 'border-cream/10 bg-ink/95' : 'border-transparent bg-ink/80'}`}>
      <nav aria-label="Main navigation" className="container-x flex h-20 items-center justify-between gap-6">
        <a href="#home" onClick={() => setOpen(false)} aria-label="Your Restaurant home" className="flex flex-col"><span className="font-display text-[22px] leading-none tracking-[-0.05em]">Your Restaurant<span className="text-ember">.</span></span><span className="mt-1.5 text-[8px] uppercase tracking-[0.35em] text-cream/50">Coffee & kitchen</span></a>
        <div className="hidden items-center gap-8 md:flex">{LINKS.map(link => <a className="nav-link text-[11px] uppercase tracking-[0.14em] text-cream/65 hover:text-cream" key={link.id} href={link.id}>{link.label}</a>)}</div>
        <a href="#location" className="btn btn-ghost hidden !px-5 !py-3 !text-[10px] md:inline-flex">Come on over <ArrowUpRight size={14} /></a>
        <button ref={toggle} onClick={() => setOpen(value => !value)} className="grid h-11 w-11 place-items-center rounded-full border border-cream/20 md:hidden" aria-label={open ? 'Close navigation' : 'Open navigation'} aria-expanded={open} aria-controls="mobile-navigation">{open ? <X size={20} /> : <Menu size={20} />}</button>
      </nav>
      <nav id="mobile-navigation" ref={panel} aria-label="Mobile navigation" hidden={!open} className="border-t border-cream/10 bg-ink px-6 pb-8 pt-4 md:hidden">
        {[...LINKS, { label: 'Visit us', id: '#location' }].map(link => <a href={link.id} key={link.id} onClick={() => setOpen(false)} className="block border-b border-cream/10 py-4 font-display text-2xl">{link.label}</a>)}
      </nav>
    </header>
  )
}
