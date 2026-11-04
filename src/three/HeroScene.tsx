
import { useRef } from 'react'
import { Canvas, useThree } from '@react-three/fiber'
import { useReducedMotion } from 'framer-motion'

import {
  GlassOrb,
  Lights,
  Orbiters,
  Particles,
  Ring,
  Rig,
} from './FloatingObjects'

import { isLow, useInView } from '../lib/util'

// ----------------------------------------
// HERO 3D LAYOUT
// ----------------------------------------

interface LayoutProps {
  low: boolean
  still: boolean
}

function Layout({ low, still }: LayoutProps) {
  const { size } = useThree()

  const wide = size.width > 900

  return (
    <group
      position={[
        wide ? 2.4 : 0,
        wide ? 0 : 1.2,
        0,
      ]}
      scale={wide ? 1 : 0.72}
    >
      <Rig still={still}>
        {/* Central glass orb */}
        <GlassOrb low={low} />

        {/* Animated orbital rings */}
        <Ring
          r={2.2}
          tilt={1.25}
          speed={0.5}
        />

        <Ring
          r={2.55}
          tilt={-0.5}
          speed={-0.35}
          color="#7c5cff"
          z={0.4}
        />

        <Ring
          r={3.0}
          tilt={0.2}
          speed={0.2}
          color="#2f6bff"
          z={-0.6}
        />

        {/* Floating technology objects */}
        <Orbiters still={still} />
      </Rig>
    </group>
  )
}

// ----------------------------------------
// MAIN HERO SCENE
// ----------------------------------------

export default function HeroScene() {
  const wrapper = useRef<HTMLDivElement>(null)

  // Render only when hero is visible
  const visible = useInView(wrapper, '0px')

  // Detect device performance
  const low = isLow()

  // Respect operating-system motion preference
  const reducedMotion = useReducedMotion()
  const still = reducedMotion ?? false

  // --------------------------------------
  // RENDER PERFORMANCE
  // --------------------------------------

  const dpr: [number, number] = low
    ? [1, 1]
    : [1, 1.5]

  const frameMode = !visible
    ? 'never'
    : still
      ? 'demand'
      : 'always'

  return (
    <div
      ref={wrapper}
      className="h-full w-full"
      aria-label="Interactive 3D technology animation"
    >
      <Canvas
        frameloop={frameMode}
        dpr={dpr}
        camera={{
          position: [0, 0, 8.5],
          fov: 40,
          near: 0.1,
          far: 100,
        }}
        gl={{
          antialias: !low,
          powerPreference: 'high-performance',
          alpha: true,
        }}
      >
        {/* Scene lighting */}
        <Lights />

        {/* Main 3D composition */}
        <Layout
          low={low}
          still={still}
        />

        {/* Background particle field */}
        <Particles
          count={low ? 300 : 1000}
          radius={9}
        />
      </Canvas>
    </div>
  )
}
