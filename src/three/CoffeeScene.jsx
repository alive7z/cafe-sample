import { Suspense, useEffect, useRef } from 'react'
import { Canvas, useThree } from '@react-three/fiber'
import {
  ContactShadows,
  Environment,
  Lightformer,
  AdaptiveDpr,
  AdaptiveEvents,
} from '@react-three/drei'
import CoffeeCup from './CoffeeCup'

/* Opaque footprint of the cup assembly in world units */
const OBJECT_W = 3.0
const OBJECT_H = 1.62

/**
 * Scales the cup so it never exceeds the design `baseScale` on large screens,
 * then shrinks it to stay inside the visible viewport on smaller / narrower
 * screens — responsive to both width and height.
 */
function CupRig({ baseScale = 1, children, maxW = 0.74, maxH = 0.55 }) {
  const { width, height } = useThree((s) => s.viewport)
  const fitW = (width * maxW) / OBJECT_W
  const fitH = (height * maxH) / OBJECT_H
  const s = Math.max(0.18, Math.min(baseScale, fitW, fitH))
  return <group scale={s}>{children}</group>
}

export default function CoffeeScene({
  tier = 'high',
  scrollProgress,
  position = [0, 0, 0],
  scale = 1,
  pointer = true,
  pointerAmount = 0.5,
  spin = 0,
  steam = true,
  camera = { position: [0, 0, 5.5], fov: 35 },
  active = true,
  className = '',
}) {
  const high = tier === 'high'
  const pointerRef = useRef({ x: 0, y: 0 })

  useEffect(() => {
    if (!pointer) return undefined
    const onMove = (e) => {
      pointerRef.current.x = (e.clientX / window.innerWidth) * 2 - 1
      pointerRef.current.y = (e.clientY / window.innerHeight) * 2 - 1
    }
    window.addEventListener('pointermove', onMove, { passive: true })
    return () => window.removeEventListener('pointermove', onMove)
  }, [pointer])

  return (
    <Canvas
      className={className}
      frameloop={active ? 'always' : 'never'}
      dpr={high ? [1, 2] : 1}
      shadows={high}
      gl={{
        alpha: true,
        antialias: high,
        powerPreference: 'high-performance',
        preserveDrawingBuffer: false,
      }}
      camera={camera}
      style={{ pointerEvents: 'none' }}
    >
      <Suspense fallback={null}>
        <ambientLight intensity={0.55} color="#F1E3D2" />
        <directionalLight
          castShadow={high}
          position={[4.5, 7.5, 4]}
          intensity={2.3}
          color="#FFF1DF"
          shadow-mapSize-width={1024}
          shadow-mapSize-height={1024}
          shadow-bias={-0.0004}
        >
          <orthographicCamera attach="shadow-camera" args={[-4, 4, 4, -4, 0.1, 20]} />
        </directionalLight>

        <pointLight
          position={[-4, 1.4, -2.2]}
          color="#C08A5E"
          intensity={high ? 46 : 34}
          distance={18}
          decay={2}
        />
        <pointLight
          position={[3.5, -1.5, 2.5]}
          color="#6F4E37"
          intensity={high ? 18 : 12}
          distance={14}
          decay={2}
        />

        <CupRig baseScale={scale}>
          <group position={position}>
            <CoffeeCup
              scrollProgress={scrollProgress}
              pointerRef={pointerRef}
              pointer={pointer}
              pointerAmount={pointerAmount}
              spin={spin}
              steam={steam && high}
            />
            {high && (
              <ContactShadows
                position={[0, -0.16, 0]}
                opacity={0.5}
                scale={7}
                blur={3}
                far={3}
                resolution={256}
                frames={1}
                color="#000000"
              />
            )}
          </group>
        </CupRig>

        <Environment resolution={high ? 256 : 128}>
          <Lightformer
            form="rect"
            intensity={2.4}
            color="#C08A5E"
            position={[4, 3, 3]}
            scale={[5, 5, 1]}
            target={[0, 0, 0]}
          />
          <Lightformer
            form="rect"
            intensity={1.4}
            color="#F5EFE6"
            position={[-4, 2, 2]}
            scale={[4, 4, 1]}
            target={[0, 0, 0]}
          />
          <Lightformer
            form="circle"
            intensity={1.1}
            color="#6F4E37"
            position={[0, -3, 2]}
            scale={[6, 6, 1]}
            target={[0, 0, 0]}
          />
        </Environment>
      </Suspense>

      <AdaptiveDpr pixelated />
      <AdaptiveEvents />
    </Canvas>
  )
}
