import { useEffect, useRef, useState } from 'react'
import { ArrowUpRight, X } from 'lucide-react'
import Reveal from './ui/Reveal'
import SplitText from './ui/SplitText'
import SmartImage from './ui/SmartImage'
import { MENU } from '../lib/images'

export default function FeaturedMenu() {
  const [category, setCategory] = useState('All')
  const [selected, setSelected] = useState(null)
  const dialog = useRef(null)
  const filtered = MENU.filter(item => category === 'All' || (category === 'Coffee' ? ['Espresso Bar', 'Slow Brewed'].includes(item.tag) : !['Espresso Bar', 'Slow Brewed'].includes(item.tag)))
  useEffect(() => {
    if (selected) dialog.current.showModal()
  }, [selected])
  const closeItem = () => { dialog.current.close(); setSelected(null) }
  const showItem = item => setSelected(item)
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
              className="font-display text-[11vw] font-light leading-[0.98] tracking-tightest text-espresso sm:text-[7vw] lg:text-[4.4rem]"
            />
          </div>
          <Reveal delay={0.1} y={24} blur={6}>
            <p className="max-w-[38ch] text-[15px] font-light leading-relaxed text-espresso/70">
              Six things we’d order ourselves — from the espresso bar to the stone oven.
              Everything made to order, nothing rushed.
            </p>
          </Reveal>
        </div>

        <div className="mb-8 flex gap-2" role="group" aria-label="Filter menu">
          {['All', 'Coffee', 'Kitchen'].map(filter => <button key={filter} aria-pressed={category === filter} onClick={() => setCategory(filter)} className={`menu-filter ${category === filter ? 'is-active' : ''}`}>{filter}</button>)}
        </div>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((item, i) => (
            <Reveal key={item.name} delay={(i % 3) * 0.08} y={40} blur={0} amount={0.15}>
              <div className="h-full">
                <article className="group relative flex h-full flex-col overflow-hidden rounded-[22px] border border-espresso/10 bg-[#fff9f0] shadow-sm shadow-espresso/5 transition-colors duration-700 hover:border-ember/40">
                  <div className="relative overflow-hidden">
                    <SmartImage
                      src={item.img}
                      alt={item.name}
                      tone={item.tone}
                      hoverScale={1.12}
                      className="aspect-[4/3] w-full"
                    />
                    <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-espresso/80 via-transparent to-transparent" />
                    <span className="absolute left-4 top-4 rounded-full border border-espresso/15 bg-[#fff9f0]/95 px-3 py-1 text-[10px] uppercase tracking-[0.18em] text-espresso/80">
                      {item.tag}
                    </span>
                  </div>

                  <div
                    className="flex flex-1 flex-col p-6"
                  >
                    <div className="flex items-start justify-between gap-4">
                      <h3 className="font-display text-2xl font-light text-espresso">{item.name}</h3>
                      <span className="mt-1 shrink-0 font-display text-xl font-light text-ember">
                        {item.price}
                      </span>
                    </div>
                    <p className="mt-3 flex-1 text-[13.5px] font-light leading-relaxed text-espresso/70">
                      {item.description}
                    </p>

                    <button onClick={() => showItem(item)} aria-label={`View ${item.name} details`} className="group/btn mt-6 inline-flex min-h-11 w-fit items-center gap-2 text-[11px] uppercase tracking-[0.2em] text-espresso/70 transition-colors duration-500 hover:text-espresso">
                      View
                      <span className="grid h-7 w-7 place-items-center rounded-full border border-espresso/20 transition-all duration-500 group-hover/btn:border-ember group-hover/btn:bg-ember group-hover/btn:text-cream">
                        <ArrowUpRight size={13} />
                      </span>
                    </button>
                  </div>
                </article>
              </div>
            </Reveal>
          ))}
        </div>
        <p className="mt-7 text-xs leading-relaxed text-espresso/70">Made fresh to order. Please ask our team about allergens and dietary preferences.</p>
      </div>
      <dialog ref={dialog} onClose={() => setSelected(null)} onClick={event => { if (event.target === dialog.current) closeItem() }} className="menu-dialog" aria-labelledby="menu-item-title">
        {selected && <div className="relative overflow-hidden rounded-2xl border border-espresso/15 bg-[#fff9f0] text-espresso">
          <button autoFocus onClick={closeItem} aria-label="Close menu details" className="absolute right-4 top-4 z-10 grid h-11 w-11 place-items-center rounded-full border border-espresso/30 bg-cream/90"><X size={18} /></button>
          <SmartImage src={selected.img} alt={selected.name} className="h-56 w-full" />
          <div className="p-7"><p className="eyebrow mb-3">{selected.tag}</p><div className="flex items-center justify-between gap-4"><h3 id="menu-item-title" className="font-display text-3xl">{selected.name}</h3><span className="text-ember">{selected.price}</span></div><p className="mt-4 text-sm leading-relaxed text-espresso/70">{selected.description}</p><p className="mt-6 border-t border-espresso/10 pt-5 text-xs leading-relaxed text-espresso/70">Freshly prepared in our café. Ask our team about ingredients, allergens, and available customisations.</p><button onClick={() => { closeItem(); document.querySelector('#location')?.scrollIntoView({ behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'instant' : 'smooth' }) }} className="btn btn-solid mt-6">Visit the café <ArrowUpRight size={15} /></button></div>
        </div>}
      </dialog>
    </section>
  )
}
