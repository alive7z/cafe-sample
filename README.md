# Your Restaurant — Freelance Website Demo

A customisable restaurant and café website demo for freelance client presentations built with React, Vite, Tailwind CSS, and Framer Motion.

## Run locally

```sh
npm install
npm run dev
```

## Production build

```sh
npm run build
npm run preview
```

The production output is in `dist/`.

## Experience

- Native scrolling, subtle section reveals, and reduced-motion support.
- Responsive photography with lazy loading; the hero image loads first.
- Coffee and kitchen menu filters with keyboard-accessible item dialogs.
- Mobile navigation with Escape dismissal and managed keyboard focus.
- A horizontally scrollable gallery and a lazy-loaded location map.

Menu content and images live in `src/lib/images.js`. Café details live in
`src/lib/site.js`. Contact details, address, hours, and prices are sample content.
The newsletter form saves an email only in the current browser; connect a mailing
service before using it for real subscriptions. Photography, fonts, and the map
require an internet connection. Images have a local visual fallback on failure.

The original Three.js components remain in `src/three/` for reference, but are
excluded from the active page and production bundle to reduce startup and GPU work.
