import { useState } from 'react'

export default function SmartImage({ src, alt = '', tone = '#241a14', className = '', imgClassName = '', priority = false, hoverScale = 1 }) {
  const [failed, setFailed] = useState(false)
  const widths = [480, 800, 1200, 1600]
  const responsive = src.startsWith('https://images.unsplash.com/')
  return (
    <div className={`smart-image relative overflow-hidden ${className}`} style={{ backgroundColor: tone, '--image-hover-scale': Math.min(hoverScale, 1.04) }}>
      {failed ? <div role="img" aria-label={alt || 'Café photograph'} className="flex h-full min-h-32 items-center justify-center bg-gradient-to-br from-oat to-cream p-8 text-center font-display text-lg text-espresso/80">{alt || 'Your Restaurant — a moment to slow down.'}</div> : (
        <img src={src} srcSet={responsive ? widths.map(w => `${src.replace(/w=\d+/, `w=${w}`)} ${w}w`).join(', ') : undefined} sizes="(max-width: 639px) 100vw, (max-width: 1023px) 50vw, 720px" alt={alt} loading={priority ? 'eager' : 'lazy'} fetchpriority={priority ? 'high' : 'auto'} decoding="async" draggable={false} onError={() => setFailed(true)} className={`h-full w-full object-cover ${imgClassName}`} />
      )}
    </div>
  )
}
