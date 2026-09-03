/* eslint-disable react/no-unknown-property */
'use client'

import {
  Suspense,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react'

import {
  Canvas,
  extend,
  useFrame,
  ThreeElement,
} from '@react-three/fiber'

import {
  Environment,
  Lightformer,
  useGLTF,
  useTexture,
} from '@react-three/drei'

import {
  BallCollider,
  CuboidCollider,
  Physics,
  RigidBody,
  useRopeJoint,
  useSphericalJoint,
} from '@react-three/rapier'

import {
  MeshLineGeometry,
  MeshLineMaterial,
} from 'meshline'

import * as THREE from 'three'

import styles from './Lanyard.module.css'
import { Vector2 } from 'three'

extend({
  MeshLineGeometry,
  MeshLineMaterial,
})

// Declare custom JSX elements for TypeScript
declare module '@react-three/fiber' {
  interface ThreeElements {
    meshLineGeometry: ThreeElement<typeof MeshLineGeometry>
    meshLineMaterial: ThreeElement<typeof MeshLineMaterial> & {
      useMap?: number
    }
  }
}

const CARD_MODEL = '/lanyard/card.glb'
const DEFAULT_LANYARD = '/lanyard/lanyard.png'
const BLANK_PIXEL =
  'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNk+M9QDwADhgGAWjR9awAAAABJRU5ErkJggg=='

const FRONT_UV_RECT = { x: 0, y: 0, w: 0.5, h: 0.755 }
const BACK_UV_RECT = { x: 0.5, y: 0, w: 0.5, h: 0.757 }

export interface LanyardProps {
  position?: [number, number, number]
  gravity?: [number, number, number]
  fov?: number
  transparent?: boolean
  frontImage?: string | null
  backImage?: string | null
  imageFit?: 'cover' | 'contain'
  lanyardImage?: string | null
  lanyardWidth?: number
}

interface BandProps {
  maxSpeed?: number
  minSpeed?: number
  isMobile?: boolean
  frontImage?: string | null
  backImage?: string | null
  imageFit?: 'cover' | 'contain'
  lanyardImage?: string | null
  lanyardWidth?: number
}

export default function Lanyard({
  position = [0, 0, 30],
  gravity = [0, -40, 0],
  fov = 24,
  transparent = true,
  frontImage = null,
  backImage = null,
  imageFit = 'cover',
  lanyardImage = null,
  lanyardWidth = 7,
}: LanyardProps) {
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const update = () => {
      setIsMobile(window.innerWidth < 768)
    }

    update()
    window.addEventListener('resize', update)
    return () => {
      window.removeEventListener('resize', update)
    }
  }, [])

  return (
    <div className={styles.wrapper}>
      <Canvas
        camera={{
          position,
          fov,
        }}
        dpr={isMobile ? 1 : [1, 1.2]}
        gl={{
          alpha: transparent,
          antialias: !isMobile,
          powerPreference: 'high-performance',
          depth: true,
          stencil: false,
        }}
        onCreated={({ gl }) => {
          gl.setClearColor(0x000000, 0)
        }}
      >
        <ambientLight intensity={Math.PI} />

        <Suspense fallback={null}>
          <Physics
            gravity={gravity}
            timeStep={isMobile ? 1 / 20 : 1 / 55}
          >
            <Band
              isMobile={isMobile}
              frontImage={frontImage}
              backImage={backImage}
              imageFit={imageFit}
              lanyardImage={lanyardImage}
              lanyardWidth={lanyardWidth}
            />
          </Physics>

          <Environment blur={0.75}>
            <Lightformer
              intensity={2}
              color="white"
              position={[0, -1, 5]}
              rotation={[0, 0, Math.PI / 3]}
              scale={[100, 0.1, 1]}
            />
            <Lightformer
              intensity={3}
              color="white"
              position={[-1, -1, 1]}
              rotation={[0, 0, Math.PI / 3]}
              scale={[100, 0.1, 1]}
            />
            <Lightformer
              intensity={3}
              color="white"
              position={[1, 1, 1]}
              rotation={[0, 0, Math.PI / 3]}
              scale={[100, 0.1, 1]}
            />
            <Lightformer
              intensity={10}
              color="white"
              position={[-10, 0, 14]}
              rotation={[0, Math.PI / 2, Math.PI / 3]}
              scale={[100, 10, 1]}
            />
          </Environment>
        </Suspense>
      </Canvas>
    </div>
  )
}

function Band({
  maxSpeed = 50,
  minSpeed = 0,
  isMobile = false,
  frontImage = null,
  backImage = null,
  imageFit = 'cover',
  lanyardImage = null,
  lanyardWidth = 1,
}: BandProps) {
  const band = useRef<THREE.Mesh>(null)
  const fixed = useRef<any>(null)
  const j1 = useRef<any>(null)
  const j2 = useRef<any>(null)
  const j3 = useRef<any>(null)
  const card = useRef<any>(null)

  const vec = useMemo(() => new THREE.Vector3(), [])
  const ang = useMemo(() => new THREE.Vector3(), [])
  const rot = useMemo(() => new THREE.Vector3(), [])
  const dir = useMemo(() => new THREE.Vector3(), [])

  const { nodes, materials } = useGLTF(CARD_MODEL) as any

  const bandTexture = useTexture(lanyardImage || DEFAULT_LANYARD)
  const frontTexture = useTexture(frontImage || BLANK_PIXEL)
  const backTexture = useTexture(backImage || BLANK_PIXEL)

  const baseMap = materials?.base?.map

  const cardMap = useMemo(() => {
    if (!baseMap) return undefined
    if (!frontImage && !backImage) return baseMap
    if (!baseMap.image) return baseMap

    const image = baseMap.image
    const canvas = document.createElement('canvas')
    canvas.width = image.width
    canvas.height = image.height

    const ctx = canvas.getContext('2d')
    if (!ctx) return baseMap

    ctx.drawImage(image, 0, 0, canvas.width, canvas.height)

    const drawFitted = (source: any, rect: typeof FRONT_UV_RECT) => {
      if (!source || !source.width || !source.height) return

      const x = rect.x * canvas.width
      const y = rect.y * canvas.height
      const width = rect.w * canvas.width
      const height = rect.h * canvas.height

      const scale =
        imageFit === 'contain'
          ? Math.min(width / source.width, height / source.height)
          : Math.max(width / source.width, height / source.height)

      const drawWidth = source.width * scale
      const drawHeight = source.height * scale

      ctx.save()
      ctx.beginPath()
      ctx.rect(x, y, width, height)
      ctx.clip()
      ctx.drawImage(
        source,
        x + (width - drawWidth) / 2,
        y + (height - drawHeight) / 2,
        drawWidth,
        drawHeight,
      )
      ctx.restore()
    }

    if (frontImage && frontTexture.image) {
      drawFitted(frontTexture.image, FRONT_UV_RECT)
    }

    if (backImage && backTexture.image) {
      drawFitted(backTexture.image, BACK_UV_RECT)
    }

    const result = new THREE.CanvasTexture(canvas)
    result.colorSpace = THREE.SRGBColorSpace
    result.flipY = baseMap.flipY
    result.anisotropy = isMobile ? 2 : 4
    result.needsUpdate = true

    return result
  }, [baseMap, frontImage, backImage, frontTexture, backTexture, imageFit])

  const [curve] = useState(
    () =>
      new THREE.CatmullRomCurve3([
        new THREE.Vector3(),
        new THREE.Vector3(),
        new THREE.Vector3(),
        new THREE.Vector3(),
      ]),
  )

  const [dragged, setDragged] = useState<THREE.Vector3 | false>(false)
  const [hovered, setHovered] = useState(false)

  useRopeJoint(fixed, j1, [[0, 0, 0], [0, 0, 0], 1])
  useRopeJoint(j1, j2, [[0, 0, 0], [0, 0, 0], 1])
  useRopeJoint(j2, j3, [[0, 0, 0], [0, 0, 0], 1])
  useSphericalJoint(j3, card, [[0, 0, 0], [0, 1.5, 0]])

  useEffect(() => {
    document.body.style.cursor = hovered
      ? dragged
        ? 'grabbing'
        : 'grab'
      : 'auto'

    return () => {
      document.body.style.cursor = 'auto'
    }
  }, [hovered, dragged])

  useFrame((state, delta) => {
    if (
      !fixed.current ||
      !j1.current ||
      !j2.current ||
      !j3.current ||
      !card.current ||
      !band.current
    ) {
      return
    }

    if (dragged) {
      vec.set(state.pointer.x, state.pointer.y, 0.5).unproject(state.camera)
      dir.copy(vec).sub(state.camera.position).normalize()
      vec.add(dir.multiplyScalar(state.camera.position.length()))

      card.current.wakeUp()
      j1.current.wakeUp()
      j2.current.wakeUp()
      j3.current.wakeUp()

      card.current.setNextKinematicTranslation({
        x: vec.x - dragged.x,
        y: vec.y - dragged.y,
        z: vec.z - dragged.z,
      })
    }

    ;[j1, j2].forEach((ref) => {
      if (!ref.current) return

      if (!ref.current.lerped) {
        ref.current.lerped = new THREE.Vector3().copy(ref.current.translation())
      }

      const distance = Math.max(
        0.1,
        Math.min(1, ref.current.lerped.distanceTo(ref.current.translation())),
      )

      ref.current.lerped.lerp(
        ref.current.translation(),
        delta * (minSpeed + distance * (maxSpeed - minSpeed)),
      )
    })

    curve.points[0].copy(j3.current.translation())
    curve.points[1].copy(j2.current.lerped)
    curve.points[2].copy(j1.current.lerped)
    curve.points[3].copy(fixed.current.translation())

      ; (band.current.geometry as any).setPoints(
        curve.getPoints(isMobile ? 16 : 32),
      )

    ang.copy(card.current.angvel())
    rot.copy(card.current.rotation())

    card.current.setAngvel({
      x: ang.x,
      y: ang.y - rot.y * 0.25,
      z: ang.z,
    })
  })

  curve.curveType = 'chordal'
  bandTexture.wrapS = THREE.RepeatWrapping
  bandTexture.wrapT = THREE.RepeatWrapping

  return (
    <>
      <group position={[0, 4, 0]}>
        <RigidBody ref={fixed} type="fixed" colliders={false} />

        <RigidBody
          ref={j1}
          position={[0.5, 0, 0]}
          type="dynamic"
          canSleep
          colliders={false}
          angularDamping={4}
          linearDamping={4}
        >
          <BallCollider args={[0.1]} />
        </RigidBody>

        <RigidBody
          ref={j2}
          position={[1, 0, 0]}
          type="dynamic"
          canSleep
          colliders={false}
          angularDamping={4}
          linearDamping={4}
        >
          <BallCollider args={[0.1]} />
        </RigidBody>

        <RigidBody
          ref={j3}
          position={[1.5, 0, 0]}
          type="dynamic"
          canSleep
          colliders={false}
          angularDamping={4}
          linearDamping={4}
        >
          <BallCollider args={[0.1]} />
        </RigidBody>

        <RigidBody
          ref={card}
          position={[2, 0, 0]}
          type={dragged ? 'kinematicPosition' : 'dynamic'}
          canSleep={false}
          colliders={false}
          angularDamping={4}
          linearDamping={4}
        >
          <CuboidCollider args={[0.8, 1.125, 0.01]} />

          <group
            scale={2.25}
            position={[0, -1.2, -0.05]}
            onPointerOver={() => setHovered(true)}
            onPointerOut={() => setHovered(false)}
            onPointerDown={(event: any) => {
              event.stopPropagation()
              event.target.setPointerCapture(event.pointerId)

              setDragged(
                new THREE.Vector3()
                  .copy(event.point)
                  .sub(vec.copy(card.current.translation())),
              )
            }}
            onPointerUp={(event: any) => {
              if (event.target.hasPointerCapture?.(event.pointerId)) {
                event.target.releasePointerCapture(event.pointerId)
              }
              setDragged(false)
            }}
          >
            {nodes?.card?.geometry && (
              <mesh geometry={nodes.card.geometry}>
                <meshPhysicalMaterial
                  map={cardMap}
                  map-anisotropy={8}
                  clearcoat={isMobile ? 0 : 1}
                  clearcoatRoughness={0.15}
                  roughness={0.9}
                  metalness={0.8}
                />
              </mesh>
            )}

            {nodes?.clip?.geometry && (
              <mesh
                geometry={nodes.clip.geometry}
                material={materials?.metal}
                material-roughness={0.3}
              />
            )}

            {nodes?.clamp?.geometry && (
              <mesh
                geometry={nodes.clamp.geometry}
                material={materials?.metal}
              />
            )}
          </group>
        </RigidBody>
      </group>

      <mesh ref={band}>
        <meshLineGeometry />
        <meshLineMaterial
          args={[{
            resolution: new Vector2
          }]}
          color="white"
          depthTest={false}
          transparent
          opacity={1}
          resolution={isMobile ? [800, 1200] : [1000, 1000]}
          useMap={1}
          map={bandTexture}
          repeat={[-4, 1]}
          lineWidth={lanyardWidth}
        />
      </mesh>
    </>
  )
}

useGLTF.preload(CARD_MODEL)