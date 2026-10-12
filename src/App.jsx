import { MotionConfig, motion, useScroll, useSpring } from 'framer-motion'
import useLenis from './hooks/useLenis'
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
  useLenis()
  const { scrollYProgress } = useScroll()
  const progress = useSpring(scrollYProgress, { stiffness: 120, damping: 30, mass: 0.3 })

  return (
    <MotionConfig reducedMotion="user">
      <div className="relative min-h-screen bg-ink">
        <motion.div
          aria-hidden
          style={{ scaleX: progress }}
          className="fixed inset-x-0 top-0 z-[60] h-[2px] origin-left bg-gradient-to-r from-coffee via-ember to-cream/70"
        />

        <Navbar />

        <main>
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
