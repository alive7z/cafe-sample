import { useMemo, useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'

const HEIGHT = 1.52
const R_BOTTOM = 0.5
const R_TOP = 0.9
const WALL = 0.065

const outerR = (t) => R_BOTTOM + (R_TOP - R_BOTTOM) * Math.pow(Math.max(t, 0), 0.82)

function buildCupProfile() {
  const pts = []
  const segs = 30

  pts.push(new THREE.Vector2(0, 0.02))
  pts.push(new THREE.Vector2(R_BOTTOM - WALL, 0.02))
  pts.push(new THREE.Vector2(R_BOTTOM, 0.07))

  for (let i = 0; i <= segs; i++) {
    const t = i / segs
    const y = 0.07 + t * (HEIGHT - 0.07)
    pts.push(new THREE.Vector2(outerR(y / HEIGHT), y))
  }

  pts.push(new THREE.Vector2(R_TOP + 0.018, HEIGHT + 0.008))
  pts.push(new THREE.Vector2(R_TOP - WALL * 0.5, HEIGHT + 0.022))
  pts.push(new THREE.Vector2(R_TOP - WALL, HEIGHT))

  for (let i = segs; i >= 0; i--) {
    const t = i / segs
    const y = 0.16 + t * (HEIGHT - 0.16)
    pts.push(new THREE.Vector2(Math.max(outerR(y / HEIGHT) - WALL, 0.03), y))
  }

  pts.push(new THREE.Vector2(0, 0.16))
  return pts
}

function buildSaucerProfile() {
  const p = [
    [0.0, -0.055],
    [0.55, -0.055],
    [1.05, -0.03],
    [1.32, 0.0],
    [1.46, 0.05],
    [1.48, 0.078],
    [1.42, 0.09],
    [1.28, 0.03],
    [1.0, 0.0],
    [0.5, -0.005],
    [0.0, -0.005],
  ]
  return p.map(([x, y]) => new THREE.Vector2(x, y))
}

export default function CoffeeCup({
  pointer = true,
  pointerRef,
  pointerAmount = 0.5,
  spin = 0,
  float = true,
  scrollProgress,
  floatAmp = 0.06,
  floatSpeed = 0.55,
  steam = true,
}) {
  const root = useRef()
  const rotator = useRef()
  const steamMat = useRef()
  const steamUniforms = useMemo(() => ({ uTime: { value: 0 } }), [])

  const cupGeo = useMemo(() => new THREE.LatheGeometry(buildCupProfile(), 96), [])
  const saucerGeo = useMemo(() => new THREE.LatheGeometry(buildSaucerProfile(), 96), [])
  const coffeeGeo = useMemo(() => new THREE.CircleGeometry(0.795, 72), [])
  const cremaGeo = useMemo(() => new THREE.TorusGeometry(0.792, 0.011, 12, 96), [])

  const baseY = 0

  useFrame((state, delta) => {
    const t = state.clock.elapsedTime
    const p = scrollProgress ? scrollProgress.get() : 0
    const d = Math.min(1, delta * 3)

    if (root.current) {
      const fy = float ? Math.sin(t * floatSpeed) * floatAmp : 0
      root.current.position.y = baseY + fy
      root.current.position.z = -p * 2.6
      root.current.scale.setScalar(1 - p * 0.14)
    }

    if (rotator.current) {
      const pv = pointer && pointerRef ? pointerRef.current : { x: 0, y: 0 }
      const px = pv.x
      const py = pv.y
      const targetY = px * pointerAmount + p * Math.PI * 1.35 + t * spin
      const targetX = -py * (pointerAmount * 0.42) + p * 0.16
      rotator.current.rotation.y += (targetY - rotator.current.rotation.y) * d
      rotator.current.rotation.x += (targetX - rotator.current.rotation.x) * d
    }

    if (steamMat.current) {
      steamMat.current.uniforms.uTime.value = t
    }
  })

  return (
    <group ref={root}>
      <group ref={rotator}>
        <mesh geometry={cupGeo} castShadow receiveShadow>
          <meshPhysicalMaterial
            color="#F3ECE1"
            roughness={0.42}
            metalness={0}
            clearcoat={0.7}
            clearcoatRoughness={0.32}
            side={THREE.DoubleSide}
            envMapIntensity={0.9}
          />
        </mesh>

        <mesh geometry={saucerGeo} position={[0, -0.02, 0]} receiveShadow castShadow>
          <meshPhysicalMaterial
            color="#EFE7DA"
            roughness={0.45}
            metalness={0}
            clearcoat={0.5}
            clearcoatRoughness={0.35}
            envMapIntensity={0.8}
          />
        </mesh>

        <mesh position={[1.02, 0.74, 0]} castShadow>
          <torusGeometry args={[0.245, 0.052, 20, 64]} />
          <meshPhysicalMaterial
            color="#F3ECE1"
            roughness={0.42}
            metalness={0}
            clearcoat={0.7}
            clearcoatRoughness={0.32}
            envMapIntensity={0.9}
          />
        </mesh>

        <mesh geometry={coffeeGeo} position={[0, HEIGHT - 0.24, 0]} rotation={[-Math.PI / 2, 0, 0]}>
          <meshPhysicalMaterial
            color="#1B0F07"
            roughness={0.14}
            metalness={0.0}
            clearcoat={1}
            clearcoatRoughness={0.08}
            reflectivity={0.6}
            envMapIntensity={1.6}
          />
        </mesh>
        <mesh geometry={cremaGeo} position={[0, HEIGHT - 0.235, 0]} rotation={[-Math.PI / 2, 0, 0]}>
          <meshStandardMaterial color="#5A351C" roughness={0.5} metalness={0} />
        </mesh>
      </group>

      {steam && (
        <mesh position={[0, HEIGHT + 0.85, 0.02]} renderOrder={2}>
          <planeGeometry args={[1.15, 2.0, 1, 1]} />
          <shaderMaterial
            ref={steamMat}
            uniforms={steamUniforms}
            transparent
            depthWrite={false}
            side={THREE.DoubleSide}
            vertexShader={`
              varying vec2 vUv;
              void main() {
                vUv = uv;
                gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
              }
            `}
            fragmentShader={`
              uniform float uTime;
              varying vec2 vUv;
              float hash(vec2 p){ return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }
              float noise(vec2 p){
                vec2 i = floor(p); vec2 f = fract(p);
                f = f * f * (3.0 - 2.0 * f);
                float a = hash(i);
                float b = hash(i + vec2(1.0, 0.0));
                float c = hash(i + vec2(0.0, 1.0));
                float d = hash(i + vec2(1.0, 1.0));
                return mix(mix(a, b, f.x), mix(c, d, f.x), f.y);
              }
              float fbm(vec2 p){
                float v = 0.0; float amp = 0.5;
                for (int i = 0; i < 5; i++){ v += amp * noise(p); p *= 2.02; amp *= 0.5; }
                return v;
              }
              void main(){
                vec2 uv = vUv;
                float t = uTime * 0.11;
                vec2 q = vec2(uv.x * 2.4, uv.y * 1.7 - t);
                float n = fbm(q + fbm(q * 1.4 + t) * 0.7);
                float bottomFade = smoothstep(0.0, 0.28, uv.y);
                float topFade = 1.0 - smoothstep(0.42, 1.0, uv.y);
                float edgeFade = smoothstep(0.0, 0.34, uv.x) * smoothstep(1.0, 0.66, uv.x);
                float alpha = smoothstep(0.34, 0.92, n) * bottomFade * topFade * edgeFade;
                alpha *= 0.42;
                vec3 col = vec3(0.99, 0.95, 0.9);
                gl_FragColor = vec4(col, alpha);
              }
            `}
          />
        </mesh>
      )}
    </group>
  )
}
