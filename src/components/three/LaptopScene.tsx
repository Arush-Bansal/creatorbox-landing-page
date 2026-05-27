'use client'

import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { Bloom, EffectComposer } from '@react-three/postprocessing'
import { Suspense, useRef } from 'react'
import * as THREE from 'three'

import { useScrollProgress } from '@/components/providers/ScrollProgressProvider'
import { smoothstep } from '@/lib/utils'

import { ParticleField } from './ParticleField'

function CameraRig() {
  const { progress } = useScrollProgress()
  const { camera } = useThree()
  const target = useRef(new THREE.Vector3(0.95, 0.2, -0.5))

  useFrame(() => {
    const pullBack = smoothstep(0.75, 0.95, progress)
    const z = 5.45 + pullBack * 1.4
    const y = 0.95 - progress * 0.24
    camera.position.lerp(new THREE.Vector3(0.2, y, z), 0.08)
    camera.lookAt(target.current)
  })

  return null
}

function SceneContent() {
  const { progress } = useScrollProgress()

  return (
    <>
      <color attach="background" args={['#0c0c0f']} />
      <fog attach="fog" args={['#0c0c0f', 8, 22]} />
      <ambientLight intensity={0.35} />
      <directionalLight position={[4, 6, 5]} intensity={1.2} color="#fff8e8" />
      <directionalLight position={[-5, 2, -3]} intensity={0.75} color="#88e8ff" />
      <directionalLight position={[2, -2, 4]} intensity={0.35} color="#f5c518" />
      <ParticleField progress={progress} />
      <EffectComposer multisampling={0}>
        <Bloom
          intensity={0.9}
          luminanceThreshold={0.28}
          luminanceSmoothing={0.85}
          mipmapBlur
        />
      </EffectComposer>
      <CameraRig />
    </>
  )
}

export function LaptopScene() {
  return (
    <div className="pointer-events-none fixed inset-0 z-0">
      <Canvas
        camera={{ position: [0, 1.05, 5.2], fov: 42, near: 0.1, far: 100 }}
        dpr={[1, 1.75]}
        gl={{ antialias: true, alpha: false, powerPreference: 'high-performance' }}
      >
        <Suspense fallback={null}>
          <SceneContent />
        </Suspense>
      </Canvas>
      <div
        className="absolute inset-0 opacity-[0.62]"
        style={{
          background:
            'radial-gradient(ellipse 85% 55% at 18% -5%, hsl(190 100% 65% / 0.42), transparent 52%), radial-gradient(ellipse 65% 45% at 88% 15%, hsl(40 98% 62% / 0.32), transparent 48%), radial-gradient(ellipse 70% 50% at 50% 100%, hsl(190 100% 65% / 0.14), transparent 50%)',
        }}
        aria-hidden
      />
    </div>
  )
}
