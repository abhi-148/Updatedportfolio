
import { useMemo, useRef, type ReactNode } from 'react'
import { useFrame } from '@react-three/fiber'
import {
  Float,
  Edges,
  Environment,
  Lightformer,
  MeshDistortMaterial,
} from '@react-three/drei'
import * as THREE from 'three'
import { usePointer } from '../lib/util'

// ----------------------------------------
// LIGHTING SYSTEM
// ----------------------------------------

export const Lights = () => (
  <>
    <ambientLight intensity={0.35} />

    <pointLight
      position={[5, 4, 5]}
      intensity={60}
      color="#22e4ff"
    />

    <pointLight
      position={[-5, -3, 3]}
      intensity={50}
      color="#7c5cff"
    />

    <Environment resolution={64}>
      <Lightformer
        form="rect"
        intensity={3}
        color="#22e4ff"
        position={[0, 5, -5]}
        scale={[10, 3, 1]}
      />

      <Lightformer
        form="ring"
        intensity={4}
        color="#7c5cff"
        position={[-5, 0, 2]}
        scale={4}
      />

      <Lightformer
        form="rect"
        intensity={2}
        color="#2f6bff"
        position={[5, -2, 3]}
        scale={[4, 6, 1]}
      />
    </Environment>
  </>
)

// ----------------------------------------
// POINTER REACTIVE 3D RIG
// ----------------------------------------

interface RigProps {
  children: ReactNode
  spin?: number
  tilt?: number
  still?: boolean
}

export function Rig({
  children,
  spin = 0.12,
  tilt = 0.35,
  still = false,
}: RigProps) {
  const group = useRef<THREE.Group>(null!)
  const pointer = usePointer()

  useFrame((_, delta) => {
    if (still || !group.current) return

    const dt = Math.min(delta, 0.05)

    group.current.rotation.y += dt * spin

    group.current.rotation.x = THREE.MathUtils.damp(
      group.current.rotation.x,
      -pointer.current.y * tilt,
      3,
      dt
    )

    group.current.position.x = THREE.MathUtils.damp(
      group.current.position.x,
      pointer.current.x * 0.25,
      3,
      dt
    )
  })

  return <group ref={group}>{children}</group>
}

// ----------------------------------------
// PREMIUM GLASS ORB
// ----------------------------------------

export function GlassOrb({ low }: { low: boolean }) {
  const core = useRef<THREE.Mesh>(null!)

  useFrame((_, delta) => {
    if (!core.current) return

    const dt = Math.min(delta, 0.05)

    core.current.rotation.y += dt * 0.4
    core.current.rotation.x += dt * 0.2
  })

  const segments = low ? 32 : 64

  return (
    <group>
      {/* Outer glass shell */}
      <mesh>
        <sphereGeometry args={[1.5, segments, segments]} />

        {low ? (
          <meshStandardMaterial
            color="#0b1a3d"
            metalness={0.9}
            roughness={0.15}
            envMapIntensity={1.5}
          />
        ) : (
          <meshPhysicalMaterial
            color="#9fd8ff"
            transmission={1}
            thickness={1.2}
            roughness={0.04}
            ior={1.35}
            envMapIntensity={1.6}
            clearcoat={1}
            attenuationColor="#2f6bff"
            attenuationDistance={2}
          />
        )}
      </mesh>

      {/* Animated energy core */}
      <mesh ref={core} scale={0.62}>
        <icosahedronGeometry args={[1, low ? 2 : 4]} />

        <MeshDistortMaterial
          color="#22e4ff"
          emissive="#1a5cff"
          emissiveIntensity={1.4}
          distort={0.45}
          speed={2}
          roughness={0.2}
        />
      </mesh>

      {/* Outer wireframe */}
      <mesh scale={0.97}>
        <icosahedronGeometry args={[1.5, 1]} />

        <meshBasicMaterial
          color="#22e4ff"
          wireframe
          transparent
          opacity={0.12}
        />
      </mesh>
    </group>
  )
}

// ----------------------------------------
// ANIMATED ORBIT RING
// ----------------------------------------

interface RingProps {
  r: number
  tilt: number
  speed: number
  color?: string
  z?: number
}

export function Ring({
  r,
  tilt,
  speed,
  color = '#22e4ff',
  z = 0,
}: RingProps) {
  const group = useRef<THREE.Group>(null!)

  useFrame((_, delta) => {
    if (!group.current) return

    group.current.rotation.z +=
      Math.min(delta, 0.05) * speed
  })

  return (
    <group rotation={[tilt, 0, z]}>
      <group ref={group}>
        <mesh>
          <torusGeometry args={[r, 0.01, 12, 128]} />

          <meshBasicMaterial
            color={color}
            transparent
            opacity={0.55}
          />
        </mesh>

        {/* Orbiting light */}
        <mesh position={[r, 0, 0]}>
          <sphereGeometry args={[0.06, 12, 12]} />

          <meshBasicMaterial color="#ffffff" />
        </mesh>
      </group>
    </group>
  )
}

// ----------------------------------------
// FLOATING PARTICLE SYSTEM
// ----------------------------------------

interface ParticlesProps {
  count?: number
  radius?: number
}

export function Particles({
  count = 1200,
  radius = 9,
}: ParticlesProps) {
  const points = useRef<THREE.Points>(null!)

  const positions = useMemo(() => {
    const array = new Float32Array(count * 3)

    for (let i = 0; i < count; i++) {
      const r = 2.5 + Math.random() * radius
      const theta = Math.random() * Math.PI * 2
      const phi = Math.acos(2 * Math.random() - 1)

      const x =
        r * Math.sin(phi) * Math.cos(theta)

      const y =
        r * Math.sin(phi) * Math.sin(theta) * 0.7

      const z =
        r * Math.cos(phi)

      array.set([x, y, z], i * 3)
    }

    return array
  }, [count, radius])

  useFrame((_, delta) => {
    if (!points.current) return

    points.current.rotation.y +=
      Math.min(delta, 0.05) * 0.015
  })

  return (
    <points ref={points}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          args={[positions, 3]}
        />
      </bufferGeometry>

      <pointsMaterial
        size={0.025}
        color="#9fe9ff"
        transparent
        opacity={0.7}
        depthWrite={false}
        blending={THREE.AdditiveBlending}
        sizeAttenuation
      />
    </points>
  )
}

// ----------------------------------------
// GLASS MATERIAL
// ----------------------------------------

interface GlassProps {
  color?: string
  edge?: string
}

const Glass = ({
  color = '#22e4ff',
  edge = '#22e4ff',
}: GlassProps) => (
  <>
    <meshStandardMaterial
      color={color}
      metalness={0.7}
      roughness={0.2}
      emissive={color}
      emissiveIntensity={0.25}
      transparent
      opacity={0.85}
    />

    <Edges color={edge} threshold={20} />
  </>
)

// ----------------------------------------
// REACT ATOM
// ----------------------------------------

export function ReactAtom() {
  return (
    <group>
      {[0, 60, 120].map((angle) => (
        <mesh
          key={angle}
          rotation={[
            0,
            0,
            THREE.MathUtils.degToRad(angle),
          ]}
          scale={[1, 0.38, 1]}
        >
          <torusGeometry args={[0.6, 0.025, 12, 64]} />

          <meshStandardMaterial
            color="#22e4ff"
            emissive="#22e4ff"
            emissiveIntensity={1.2}
          />
        </mesh>
      ))}

      <mesh>
        <sphereGeometry args={[0.12, 20, 20]} />

        <meshStandardMaterial
          color="#ffffff"
          emissive="#22e4ff"
          emissiveIntensity={2}
        />
      </mesh>
    </group>
  )
}

// ----------------------------------------
// NODE HEXAGON
// ----------------------------------------

export function NodeHex() {
  return (
    <group rotation={[Math.PI / 2.4, 0, 0]}>
      <mesh>
        <cylinderGeometry args={[0.55, 0.55, 0.16, 6]} />
        <Glass color="#2f6bff" />
      </mesh>

      <mesh position={[0, 0.1, 0]}>
        <cylinderGeometry args={[0.28, 0.28, 0.1, 6]} />

        <meshStandardMaterial
          color="#ffffff"
          emissive="#22e4ff"
          emissiveIntensity={1.2}
        />
      </mesh>
    </group>
  )
}

// ----------------------------------------
// DATABASE STACK
// ----------------------------------------

export function DbStack() {
  return (
    <group>
      {[-0.3, 0, 0.3].map((y, index) => (
        <mesh key={index} position={[0, y, 0]}>
          <cylinderGeometry args={[0.46, 0.46, 0.22, 32]} />

          <Glass
            color={index === 1 ? '#7c5cff' : '#2f6bff'}
            edge="#9fe9ff"
          />
        </mesh>
      ))}
    </group>
  )
}

// ----------------------------------------
// CODE BRACKETS
// ----------------------------------------

export function Brackets() {
  const bar = (
    rotation: number,
    x: number,
    y: number,
    length = 0.55
  ) => (
    <mesh
      position={[x, y, 0]}
      rotation={[0, 0, rotation]}
    >
      <boxGeometry args={[0.1, length, 0.1]} />

      <meshStandardMaterial
        color="#22e4ff"
        emissive="#22e4ff"
        emissiveIntensity={1}
      />
    </mesh>
  )

  return (
    <group>
      {bar(0.75, -0.62, 0.2)}
      {bar(-0.75, -0.62, -0.2)}
      {bar(-0.75, 0.62, 0.2)}
      {bar(0.75, 0.62, -0.2)}

      <mesh rotation={[0, 0, 0.3]}>
        <boxGeometry args={[0.08, 0.9, 0.08]} />

        <meshStandardMaterial
          color="#7c5cff"
          emissive="#7c5cff"
          emissiveIntensity={1.2}
        />
      </mesh>
    </group>
  )
}

// ----------------------------------------
// FLOATING ORBIT OBJECTS
// ----------------------------------------

export function Orbiters({
  still = false,
}: {
  still?: boolean
}) {
  const group = useRef<THREE.Group>(null!)

  useFrame((_, delta) => {
    if (still || !group.current) return

    group.current.rotation.y +=
      Math.min(delta, 0.05) * 0.22
  })

  const items: [
    ReactNode,
    [number, number, number],
    number
  ][] = [
    [<ReactAtom />, [3.3, 0.9, 0], 0.9],
    [<NodeHex />, [-1.2, 1.6, 3.1], 0.9],
    [<DbStack />, [-3.2, -0.6, -0.8], 0.85],
    [<Brackets />, [1.4, -1.5, -3], 0.9],
  ]

  return (
    <group ref={group}>
      {items.map(([object, position, scale], index) => (
        <Float
          key={index}
          speed={1.6}
          rotationIntensity={0.7}
          floatIntensity={1.2}
        >
          <group position={position} scale={scale}>
            {object}
          </group>
        </Float>
      ))}
    </group>
  )
}

// ----------------------------------------
// 3D ACHIEVEMENT TROPHY
// ----------------------------------------

export function Trophy() {
  const points = useMemo(() => {
    const profile: [number, number][] = [
      [0.001, 0],
      [0.62, 0],
      [0.62, 0.12],
      [0.2, 0.24],
      [0.14, 0.9],
      [0.5, 1.12],
      [0.9, 2.0],
      [0.84, 2.08],
      [0.74, 2.0],
      [0.1, 1.25],
      [0.001, 1.25],
    ]

    return profile.map(
      ([x, y]) => new THREE.Vector2(x, y)
    )
  }, [])

  return (
    <group position={[0, -1.1, 0]} scale={1.05}>
      {/* Trophy cup */}
      <mesh>
        <latheGeometry args={[points, 48]} />

        <meshStandardMaterial
          color="#8fc4ff"
          metalness={1}
          roughness={0.12}
          emissive="#2f6bff"
          emissiveIntensity={0.25}
          envMapIntensity={1.8}
          side={THREE.DoubleSide}
        />
      </mesh>

      {/* Trophy handles */}
      {[-1, 1].map((side) => (
        <mesh
          key={side}
          position={[side * 0.95, 1.55, 0]}
          rotation={[
            0,
            0,
            side > 0 ? -0.3 : 0.3 + Math.PI,
          ]}
        >
          <torusGeometry args={[0.32, 0.055, 12, 32, Math.PI]} />

          <meshStandardMaterial
            color="#8fc4ff"
            metalness={1}
            roughness={0.12}
            emissive="#2f6bff"
            emissiveIntensity={0.25}
            side={THREE.DoubleSide}
          />
        </mesh>
      ))}

      {/* Trophy base */}
      <mesh position={[0, -0.14, 0]}>
        <boxGeometry args={[1.5, 0.28, 1.5]} />

        <meshStandardMaterial
          color="#0b1a3d"
          metalness={0.8}
          roughness={0.25}
        />

        <Edges color="#22e4ff" />
      </mesh>

      {/* Top crystal */}
      <mesh position={[0, 2.5, 0]}>
        <octahedronGeometry args={[0.22]} />

        <meshStandardMaterial
          color="#ffffff"
          emissive="#22e4ff"
          emissiveIntensity={2}
        />
      </mesh>
    </group>
  )
}

// ----------------------------------------
// ANIMATED TECHNOLOGY CORE
// ----------------------------------------

export function TechCore({ low }: { low: boolean }) {
  const wireframe = useRef<THREE.Mesh>(null!)

  useFrame((_, delta) => {
    if (!wireframe.current) return

    wireframe.current.rotation.y -=
      Math.min(delta, 0.05) * 0.3
  })

  return (
    <group>
      {/* Outer rotating wireframe */}
      <mesh ref={wireframe}>
        <icosahedronGeometry args={[1.7, 1]} />

        <meshBasicMaterial
          color="#22e4ff"
          wireframe
          transparent
          opacity={0.35}
        />
      </mesh>

      {/* Inner crystal */}
      <mesh>
        <octahedronGeometry args={[0.85, 0]} />

        <meshStandardMaterial
          color="#2f6bff"
          metalness={0.8}
          roughness={0.15}
          emissive="#2f6bff"
          emissiveIntensity={0.6}
        />

        <Edges color="#9fe9ff" />
      </mesh>

      {/* Orbiting rings */}
      <Ring
        r={2.3}
        tilt={1.2}
        speed={0.6}
      />

      <Ring
        r={2.7}
        tilt={-0.6}
        speed={-0.4}
        color="#7c5cff"
        z={0.5}
      />

      {/* Performance-friendly particles */}
      {!low && (
        <Particles
          count={300}
          radius={3}
        />
      )}
    </group>
  )
}
