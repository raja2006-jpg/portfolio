'use client'

import { useState } from 'react'
import Image from 'next/image'
import { AnimatePresence, motion } from 'framer-motion'
import {
  ArrowLeft,
  ArrowRight,
  ArrowUpRight,
  Github,
  Layers3,
} from 'lucide-react'
import { projects } from '@/lib/data'

type Direction = 'left' | 'right' | null
type ScreenshotState = Record<string, number>
type DirectionState = Record<string, Direction>
type HoverZoneState = Record<string, 'left' | 'center' | 'right'>
type TiltState = Record<string, { x: number; y: number }>

export default function ProjectsSection() {
  const [activeImages, setActiveImages] = useState<ScreenshotState>({})
  const [directions, setDirections] = useState<DirectionState>({})
  const [hoverZones, setHoverZones] = useState<HoverZoneState>({})
  const [tilt, setTilt] = useState<TiltState>({})

  const changeScreenshot = (
    projectId: string,
    totalImages: number,
    direction: 'left' | 'right',
  ) => {
    setActiveImages((current) => {
      const currentIndex = current[projectId] ?? 0

      const nextIndex =
        direction === 'right'
          ? (currentIndex + 1) % totalImages
          : (currentIndex - 1 + totalImages) % totalImages

      return {
        ...current,
        [projectId]: nextIndex,
      }
    })

    setDirections((current) => ({
      ...current,
      [projectId]: direction,
    }))
  }

  const handleTilt = (
    event: React.MouseEvent<HTMLDivElement>,
    projectId: string,
  ) => {
    const rect = event.currentTarget.getBoundingClientRect()

    const x = event.clientX - rect.left
    const y = event.clientY - rect.top

    const centerX = rect.width / 2
    const centerY = rect.height / 2

    const rotateY = ((x - centerX) / centerX) * 4
    const rotateX = -((y - centerY) / centerY) * 4

    setTilt((current) => ({
      ...current,
      [projectId]: {
        x: rotateX,
        y: rotateY,
      },
    }))
  }

  const resetTilt = (projectId: string) => {
    setTilt((current) => ({
      ...current,
      [projectId]: {
        x: 0,
        y: 0,
      },
    }))
  }

  const handleMonitorMouseMove = (
    event: React.MouseEvent<HTMLDivElement>,
    projectId: string,
    totalImages: number,
  ) => {
    const rect = event.currentTarget.getBoundingClientRect()

    const x = event.clientX - rect.left
    const percentage = x / rect.width

    let zone: 'left' | 'center' | 'right'

    if (percentage < 0.35) {
      zone = 'left'
    } else if (percentage > 0.65) {
      zone = 'right'
    } else {
      zone = 'center'
    }

    const previousZone = hoverZones[projectId]

    if (zone === 'left' && previousZone !== 'left') {
      changeScreenshot(projectId, totalImages, 'left')
    }

    if (zone === 'right' && previousZone !== 'right') {
      changeScreenshot(projectId, totalImages, 'right')
    }

    setHoverZones((current) => ({
      ...current,
      [projectId]: zone,
    }))

    handleTilt(event, projectId)
  }

  const resetHoverZone = (projectId: string) => {
    setHoverZones((current) => ({
      ...current,
      [projectId]: 'center',
    }))
  }

  return (
    <section
      id="projects"
      className="relative overflow-hidden bg-black px-6 py-24 text-white sm:py-32"
    >
      {/* Background glow */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute left-1/2 top-[8%] h-[500px] w-[700px] -translate-x-1/2 rounded-full bg-[#4caf50]/[0.08] blur-[150px]"
      />

      <div
        aria-hidden="true"
        className="pointer-events-none absolute left-[-200px] top-[35%] h-[400px] w-[400px] rounded-full bg-[#26a69a]/[0.04] blur-[130px]"
      />

      <div
        aria-hidden="true"
        className="pointer-events-none absolute right-[-200px] top-[60%] h-[400px] w-[400px] rounded-full bg-[#81c784]/[0.04] blur-[130px]"
      />

      <div className="relative mx-auto max-w-7xl">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{
            once: true,
            margin: '-100px',
          }}
          transition={{
            duration: 0.7,
            ease: [0.22, 1, 0.36, 1],
          }}
          className="mb-16 text-center sm:mb-20"
        >
          <span className="section-kicker inline-flex border border-[#4caf50]/20 bg-[#4caf50]/10 text-[#81c784]">
            / Featured projects
          </span>

          <h2 className="mt-6 font-display text-5xl leading-[0.88] tracking-[-0.05em] sm:text-6xl lg:text-7xl">
            Digital
            <br />
            <span className="bg-gradient-to-r from-white via-white/60 to-white/10 bg-clip-text text-transparent">
              experiences.
            </span>
          </h2>

          <p className="mx-auto mt-6 max-w-xl text-sm leading-relaxed text-zinc-500 sm:text-base">
            Explore each project through an interactive visual showcase.
            Move your cursor across each display to explore different screens.
          </p>
        </motion.div>

        {/* Projects */}
        <div className="space-y-24 sm:space-y-28 lg:space-y-32">
          {projects.map((project, index) => {
            const imageIndex = activeImages[project.id] ?? 0
            const direction = directions[project.id] ?? 'right'
            const currentImage =
              project.images[imageIndex] ?? project.images[0]
            const currentTilt = tilt[project.id] ?? { x: 0, y: 0 }
            const isReversed = index % 2 === 1

            return (
              <motion.article
                key={project.id}
                initial={{
                  opacity: 0,
                  y: 40,
                }}
                whileInView={{
                  opacity: 1,
                  y: 0,
                }}
                viewport={{
                  once: true,
                  margin: '-100px',
                }}
                transition={{
                  duration: 0.8,
                  ease: [0.22, 1, 0.36, 1],
                }}
                className="relative"
              >
                {/* Project label */}
                <div className="mb-6 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <span className="flex h-7 w-7 items-center justify-center rounded-full border border-white/10 bg-white/[0.03] text-[9px] font-black text-zinc-400">
                      {String(index + 1).padStart(2, '0')}
                    </span>

                    <span className="text-[9px] font-black uppercase tracking-[0.22em] text-zinc-600">
                      {project.type}
                    </span>
                  </div>

                  <span className="hidden text-[9px] font-black tracking-[0.2em] text-zinc-700 sm:block">
                    PROJECT {String(index + 1).padStart(2, '0')}
                  </span>
                </div>

                {/* Project layout */}
                <div
                  className={`grid items-center gap-10 lg:grid-cols-[1fr_0.95fr] lg:gap-14 ${
                    isReversed
                      ? 'lg:grid-cols-[0.95fr_1fr]'
                      : ''
                  }`}
                >
                  {/* Information */}
                  <motion.div
                    className={
                      isReversed ? 'lg:order-2' : 'lg:order-1'
                    }
                    initial={{
                      opacity: 0,
                      x: isReversed ? 24 : -24,
                    }}
                    whileInView={{
                      opacity: 1,
                      x: 0,
                    }}
                    viewport={{
                      once: true,
                    }}
                    transition={{
                      duration: 0.7,
                      delay: 0.1,
                    }}
                  >
                    <p className="text-[9px] font-black uppercase tracking-[0.22em] text-[#81c784]">
                      {String(index + 1).padStart(2, '0')} /{' '}
                      {project.type}
                    </p>

                    <h3 className="mt-3 font-display text-3xl leading-[0.95] tracking-[-0.03em] text-white sm:text-4xl">
                      {project.name}
                    </h3>

                    <p className="mt-5 max-w-md text-sm leading-relaxed text-zinc-400">
                      {project.description}
                    </p>

                    {/* Technologies */}
                    <div className="mt-6 flex flex-wrap gap-2">
                      {project.tech.map((technology) => (
                        <span
                          key={technology}
                          className="rounded-full border border-white/10 bg-white/[0.04] px-3 py-1.5 text-[10px] font-bold text-zinc-400 backdrop-blur-md transition hover:border-[#81c784]/30 hover:text-[#c8e6c9]"
                        >
                          {technology}
                        </span>
                      ))}
                    </div>

                    {/* Buttons */}
                    <div className="mt-7 flex flex-wrap gap-3">
                      <a
                        href={project.liveUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex items-center gap-2 rounded-xl bg-white px-4 py-2.5 text-xs font-black text-black transition duration-300 hover:-translate-y-1 hover:bg-[#c8e6c9]"
                      >
                        View live
                        <ArrowUpRight size={14} />
                      </a>

                      <a
                        href={project.githubUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex items-center gap-2 rounded-xl border border-white/10 bg-white/[0.03] px-4 py-2.5 text-xs font-black text-white transition duration-300 hover:-translate-y-1 hover:border-white/25 hover:bg-white/[0.08]"
                      >
                        <Github size={14} />
                        Source
                      </a>
                    </div>

                    {/* Screenshot dots */}
                    <div className="mt-7">
                      <p className="mb-3 text-[9px] font-black uppercase tracking-[0.2em] text-zinc-700">
                        Screens
                      </p>

                      <div className="flex items-center gap-2">
                        {project.images.map((_, screenshotIndex) => (
                          <button
                            key={screenshotIndex}
                            type="button"
                            aria-label={`Show screenshot ${
                              screenshotIndex + 1
                            }`}
                            onClick={() => {
                              setDirections((current) => ({
                                ...current,
                                [project.id]:
                                  screenshotIndex > imageIndex
                                    ? 'right'
                                    : 'left',
                              }))

                              setActiveImages((current) => ({
                                ...current,
                                [project.id]: screenshotIndex,
                              }))
                            }}
                            className={`h-1.5 rounded-full transition-all duration-500 ${
                              screenshotIndex === imageIndex
                                ? 'w-8 bg-[#81c784]'
                                : 'w-1.5 bg-white/20 hover:bg-white/40'
                            }`}
                          />
                        ))}
                      </div>
                    </div>
                  </motion.div>

                  {/* MacBook-style display */}
                  <motion.div
                    className={
                      isReversed ? 'lg:order-1' : 'lg:order-2'
                    }
                    initial={{
                      opacity: 0,
                      x: isReversed ? -28 : 28,
                      scale: 0.97,
                    }}
                    whileInView={{
                      opacity: 1,
                      x: 0,
                      scale: 1,
                    }}
                    viewport={{
                      once: true,
                    }}
                    transition={{
                      duration: 0.85,
                      ease: [0.22, 1, 0.36, 1],
                    }}
                  >
                    <div className="relative">
                      {/* Glow */}
                      <div
                        aria-hidden="true"
                        className="absolute left-1/2 top-1/2 h-[65%] w-[75%] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#4caf50]/10 blur-[90px]"
                      />

                      {/* Perspective wrapper */}
                      <div
                        className="relative mx-auto w-full max-w-[700px]"
                        style={{ perspective: '2000px' }}
                      >
                        {/* 3D MacBook */}
                        <motion.div
                          style={{
                            transformStyle: 'preserve-3d',
                          }}
                          animate={{
                            rotateX: currentTilt.x,
                            rotateY: currentTilt.y,
                          }}
                          transition={{
                            type: 'spring',
                            stiffness: 180,
                            damping: 20,
                          }}
                        >
                          {/* MacBook display body */}
                          <div className="relative rounded-[24px] border border-white/10 bg-gradient-to-b from-[#1d1d1d] via-[#111] to-[#0a0a0a] p-2 shadow-[0_25px_70px_rgba(0,0,0,0.55)] sm:rounded-[28px] sm:p-[10px]">
                            {/* Camera / notch */}
                            <div className="absolute left-1/2 top-0 z-50 -translate-x-1/2">
                              <div className="flex h-3.5 w-20 items-center justify-center rounded-b-xl bg-[#0a0a0a]">
                                <div className="h-1.5 w-1.5 rounded-full bg-zinc-600" />
                              </div>
                            </div>

                            {/* Screen */}
                            <div
                              className="group/screen relative aspect-[16/10] overflow-hidden rounded-[18px] border border-white/[0.08] bg-black sm:rounded-[22px]"
                              onMouseMove={(event) =>
                                handleMonitorMouseMove(
                                  event,
                                  project.id,
                                  project.images.length,
                                )
                              }
                              onMouseLeave={() => {
                                resetHoverZone(project.id)
                                resetTilt(project.id)
                              }}
                            >
                              <AnimatePresence
                                initial={false}
                                mode="wait"
                              >
                                <motion.div
                                  key={`${project.id}-${imageIndex}`}
                                  initial={{
                                    opacity: 0,
                                    x:
                                      direction === 'left'
                                        ? -45
                                        : 45,
                                    scale: 1.02,
                                  }}
                                  animate={{
                                    opacity: 1,
                                    x: 0,
                                    scale: 1,
                                  }}
                                  exit={{
                                    opacity: 0,
                                    x:
                                      direction === 'left'
                                        ? 45
                                        : -45,
                                    scale: 0.99,
                                  }}
                                  transition={{
                                    duration: 0.38,
                                    ease: [0.22, 1, 0.36, 1],
                                  }}
                                  className="absolute inset-0"
                                >
                                  <Image
                                    src={currentImage}
                                    alt={`${project.name} screenshot ${
                                      imageIndex + 1
                                    }`}
                                    fill
                                    sizes="(max-width: 1024px) 94vw, 700px"
                                    className="object-cover object-top"
                                  />
                                </motion.div>
                              </AnimatePresence>

                              {/* Reflection */}
                              <div className="pointer-events-none absolute inset-0 z-20 bg-gradient-to-br from-white/[0.11] via-transparent via-35% to-transparent" />

                              {/* Glass layer */}
                              <div className="pointer-events-none absolute inset-0 z-20 bg-gradient-to-b from-white/[0.025] via-transparent to-black/10" />

                              {/* Left cue */}
                              <div className="pointer-events-none absolute inset-y-0 left-0 z-30 flex w-[30%] items-center justify-start bg-gradient-to-r from-black/20 to-transparent pl-3 opacity-0 transition duration-300 group-hover/screen:opacity-100 sm:pl-5">
                                <div className="rounded-full border border-white/10 bg-black/40 p-2 text-white/70 backdrop-blur-xl">
                                  <ArrowLeft size={14} />
                                </div>
                              </div>

                              {/* Right cue */}
                              <div className="pointer-events-none absolute inset-y-0 right-0 z-30 flex w-[30%] items-center justify-end bg-gradient-to-l from-black/20 to-transparent pr-3 opacity-0 transition duration-300 group-hover/screen:opacity-100 sm:pr-5">
                                <div className="rounded-full border border-white/10 bg-black/40 p-2 text-white/70 backdrop-blur-xl">
                                  <ArrowRight size={14} />
                                </div>
                              </div>

                              {/* Hint */}
                              <div className="pointer-events-none absolute left-1/2 top-1/2 z-30 -translate-x-1/2 -translate-y-1/2 rounded-full border border-white/10 bg-black/40 px-4 py-2 text-[8px] font-black uppercase tracking-[0.18em] text-white/70 opacity-0 backdrop-blur-xl transition duration-500 group-hover/screen:opacity-100">
                                Move cursor
                              </div>

                              {/* Counter */}
                              <div className="pointer-events-none absolute bottom-3 right-3 z-30 rounded-full border border-white/10 bg-black/45 px-2.5 py-1 text-[8px] font-black tracking-[0.15em] text-white/70 backdrop-blur-xl">
                                {String(imageIndex + 1).padStart(2, '0')}{' '}
                                /{' '}
                                {String(project.images.length).padStart(
                                  2,
                                  '0',
                                )}
                              </div>
                            </div>

                            {/* MacBook lower bezel / chin */}
                            <div className="flex h-5 items-center justify-center sm:h-6">
                              <div className="h-1 w-14 rounded-full bg-white/[0.05]" />
                            </div>
                          </div>

                          {/* MacBook base */}
                          <div className="relative mx-auto mt-1 h-3 w-[92%] rounded-b-[12px] bg-gradient-to-b from-[#252525] to-[#0b0b0b] shadow-[0_12px_25px_rgba(0,0,0,0.45)]">
                            <div className="absolute left-1/2 top-0 h-[2px] w-24 -translate-x-1/2 rounded-b-full bg-white/[0.08]" />
                          </div>
                        </motion.div>
                      </div>

                      {/* Ground glow */}
                      <div
                        aria-hidden="true"
                        className="mx-auto mt-2 h-3 w-40 rounded-full bg-[#4caf50]/10 blur-2xl sm:w-56"
                      />
                    </div>

                    {/* Mobile hint */}
                    <div className="mt-4 flex items-center justify-center gap-2 text-[9px] font-bold uppercase tracking-[0.18em] text-zinc-700 lg:hidden">
                      <ArrowLeft size={11} />
                      Move across screen
                      <ArrowRight size={11} />
                    </div>
                  </motion.div>
                </div>

                {/* Separator */}
                {index !== projects.length - 1 && (
                  <div className="mt-16 h-px bg-gradient-to-r from-transparent via-white/[0.06] to-transparent sm:mt-20" />
                )}
              </motion.article>
            )
          })}
        </div>

        {/* Repository link */}
        <motion.div
          initial={{
            opacity: 0,
            y: 20,
          }}
          whileInView={{
            opacity: 1,
            y: 0,
          }}
          viewport={{
            once: true,
          }}
          transition={{
            duration: 0.6,
          }}
          className="mt-20 text-center sm:mt-24"
        >
          <a
            href="https://github.com/raja2006-jpg?tab=repositories"
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 text-sm font-bold text-zinc-500 transition hover:text-white"
          >
            View the complete repository collection
            <Layers3 size={16} />
          </a>
        </motion.div>

        {/* Bottom line */}
        <div className="mx-auto mt-12 h-px max-w-5xl bg-gradient-to-r from-transparent via-white/10 to-transparent" />
      </div>
    </section>
  )
}