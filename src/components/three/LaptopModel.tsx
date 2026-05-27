'use client'

import { useFrame } from '@react-three/fiber'
import { useMemo, useRef } from 'react'
import * as THREE from 'three'

import { smoothstep } from '@/lib/utils'

type LaptopModelProps = {
  progress: number
}

const GOLD = new THREE.Color('#f5c518')
const CYAN = new THREE.Color('#5ee7ff')

export function LaptopModel({ progress }: LaptopModelProps) {
  const root = useRef<THREE.Group>(null)
  const monolith = useRef<THREE.Group>(null)
  const layers = useRef<THREE.Group>(null)
  const seam = useRef<THREE.Mesh>(null)

  const chassisMat = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        color: '#11131a',
        metalness: 0.92,
        roughness: 0.22,
      }),
    [],
  )

  const glassMat = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        color: '#102030',
        emissive: CYAN,
        emissiveIntensity: 0.05,
        metalness: 0.25,
        roughness: 0.3,
        transparent: true,
        opacity: 0.5,
      }),
    [],
  )

  const paneMat = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        color: '#141722',
        emissive: GOLD,
        emissiveIntensity: 0.045,
        metalness: 0.4,
        roughness: 0.38,
        transparent: true,
        opacity: 0.58,
      }),
    [],
  )

  useFrame((state) => {
    const t = state.clock.elapsedTime
    const floatY = Math.sin(t * 0.9) * 0.12
    const floatX = Math.cos(t * 0.7) * 0.06

    if (root.current) {
      root.current.position.x = 2.35 - progress * 0.45
      root.current.position.y = -0.58 + floatY * 0.55 - progress * 0.26
      root.current.position.z = -0.95
      root.current.rotation.y = -0.42 + floatX * 0.6 + progress * 0.2
    }

    const monolithTurn = smoothstep(0.08, 0.42, progress)
    if (monolith.current) {
      monolith.current.rotation.y = -0.4 + t * 0.12 + monolithTurn * 0.45
      monolith.current.rotation.x = Math.sin(t * 0.35) * 0.04
    }

    const layerSpread = smoothstep(0.2, 0.62, progress)
    if (layers.current) {
      layers.current.children.forEach((child, i) => {
        const direction = i % 2 === 0 ? 1 : -1
        const yBase = (i - 2) * 0.24
        child.position.x = direction * layerSpread * 0.52
        child.position.y = yBase + Math.sin(t * 0.8 + i) * 0.02
        child.position.z = direction * layerSpread * 0.08
        child.rotation.y = direction * layerSpread * 0.2
      })
    }

    if (seam.current) {
      const seamMat = seam.current.material as THREE.MeshStandardMaterial
      seamMat.opacity = 0.35 + smoothstep(0.3, 0.72, progress) * 0.35
      seam.current.scale.y = 0.95 + smoothstep(0.3, 0.72, progress) * 0.25
    }
  })

  const foldBack = smoothstep(0.72, 0.88, progress)

  return (
    <group ref={root} position={[2.35, -0.58, -0.95]} scale={0.84 - foldBack * 0.05}>
      <group ref={monolith}>
        {/* Main box volume */}
        <mesh material={chassisMat} castShadow receiveShadow>
          <boxGeometry args={[1.55, 1.25, 1.05]} />
        </mesh>
        <mesh material={glassMat} scale={[1.04, 1.04, 1.04]}>
          <boxGeometry args={[1.55, 1.25, 1.05]} />
        </mesh>

        {/* Floating slabs */}
        <group ref={layers}>
          {new Array(5).fill(0).map((_, i) => (
            <mesh key={i} material={paneMat}>
              <boxGeometry args={[1.95, 0.14, 0.28]} />
            </mesh>
          ))}
        </group>

        {/* Glowing center seam */}
        <mesh ref={seam} position={[0, 0, 0.53]}>
          <boxGeometry args={[1.2, 0.95, 0.03]} />
          <meshStandardMaterial
            color="#f5c518"
            emissive="#f5c518"
            emissiveIntensity={0.7}
            transparent
            opacity={0.45}
          />
        </mesh>
      </group>

      {/* Gold rim lights */}
      <pointLight position={[1.5, 1.2, 1]} intensity={2.2} color={GOLD} distance={6} />
      <pointLight position={[-1.8, 0.5, 1.2]} intensity={1.4} color={CYAN} distance={5} />
    </group>
  )
}
