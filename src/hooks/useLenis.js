// Keep anchor navigation native: no perpetual animation loop or wheel interception.
export function scrollToId(id) {
  const el = document.querySelector(id)
  if (!el) return
  el.scrollIntoView({
    behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'instant' : 'smooth',
    block: 'start',
  })
}
