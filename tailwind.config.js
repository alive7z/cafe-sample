/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        ink: '#0B0B0B',
        espresso: '#3B2416',
        coffee: '#6F4E37',
        cream: '#F5EFE6',
        ember: '#C08A5E',
      },
      fontFamily: {
        display: ['Fraunces', 'Georgia', 'serif'],
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
      letterSpacing: {
        tightest: '-0.045em',
        widest2: '0.35em',
      },
      transitionTimingFunction: {
        cinematic: 'cubic-bezier(0.22, 1, 0.36, 1)',
      },
      screens: {
        xs: '420px',
      },
    },
  },
  plugins: [],
}
