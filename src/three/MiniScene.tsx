
import { useEffect, useRef, useState } from 'react'
import { Canvas } from '@react-three/fiber'
import { useReducedMotion } from 'framer-motion'

import {
  Lights,
  Rig,
  TechCore,
  Trophy,
  Particles,
} from './FloatingObjects'

import {
  hasWebGL,
  isLow,
  useInView,
} from '../lib/util'

// ----------------------------------------
// MINI 3D SCENE
// ----------------------------------------

interface MiniSceneProps {
  kind: 'core' | 'trophy'
}

export default function MiniScene({
  kind,
}: MiniSceneProps) {
  const wrapper = useRef<HTMLDivElement>(null)

  // Detect visibility
  const visible = useInView(wrapper, '50px')

  // Device performance
  const low = isLow()

  // Reduced motion accessibility
  const reducedMotion = useReducedMotion()
  const still = reducedMotion ?? false

  // WebGL detection after mounting
  const [webGLSupported, setWebGLSupported] = useState(false)

  useEffect(() => {
    setWebGLSupported(hasWebGL())
  }, [])

  // --------------------------------------
  // RENDER SETTINGS
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
      aria-label={
        kind === 'core'
          ? '3D technology core'
          : '3D achievement trophy'
      }
    >
      {webGLSupported ? (
        <Canvas
          frameloop={frameMode}
          dpr={dpr}
          camera={{
            position: [0, 0, 7],
            fov: 40,
            near: 0.1,
            far: 100,
          }}
          gl={{
            antialias: !low,
            alpha: true,
            powerPreference: low
              ? 'low-power'
              : 'high-performance',
          }}
        >
          {/* Scene lighting */}
          <Lights />

          {/* Main object */}
          <Rig
            spin={0.35}
            still={still}
          >
            {kind === 'core' ? (
              <TechCore low={low} />
            ) : (
              <Trophy />
            )}
          </Rig>

          {/* Trophy particle effects */}
          {kind === 'trophy' && !low && (
            <Particles
              count={150}
              radius={4}
            />
          )}
        </Canvas>
      ) : (
        // WebGL fallback
        <div
          className="
            flex h-full w-full items-center justify-center
            rounded-full
            bg-[radial-gradient(circle,#22e4ff33,transparent_65%)]
          "
          aria-hidden="true"
        >
          <div
            className="
              h-20 w-20 rounded-full
              border border-cyan-400/30
              bg-cyan-400/5
              shadow-[0_0_50px_#22e4ff22]
            "
          />
        </div>
      )}
    </div>
  )
}
