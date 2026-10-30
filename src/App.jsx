import { MotionConfig } from 'framer-motion'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import About from './components/About'
import FeaturedMenu from './components/FeaturedMenu'
import SignatureCoffee from './components/SignatureCoffee'
import Atmosphere from './components/Atmosphere'
import Gallery from './components/Gallery'
import Location from './components/Location'
import FinalCTA from './components/FinalCTA'
import Footer from './components/Footer'

export default function App() {
  return (
    <MotionConfig reducedMotion="user">
      <div className="relative min-h-screen bg-ink">


        <Navbar />

        <a href="#main" className="skip-link">Skip to content</a>
        <main id="main" tabIndex={-1}>
          <Hero />
          <About />
          <FeaturedMenu />
          <SignatureCoffee />
          <Atmosphere />
          <Gallery />
          <Location />
          <FinalCTA />
        </main>

        <Footer />
      </div>
    </MotionConfig>
  )
}
