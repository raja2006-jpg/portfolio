'use client'

import Image from 'next/image'
import { motion } from 'framer-motion'
import { ArrowUpRight } from 'lucide-react'
import { personal, stats } from '@/lib/data'

export default function AboutSection() {
  return (
    <section
      id="about"
      className="relative overflow-hidden bg-[#101018] px-6 py-24 text-white sm:py-32"
    >
      {/* Background Marquee */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 flex items-center overflow-hidden select-none"
      >
        <div className="marquee-track flex whitespace-nowrap font-display text-[23vw] tracking-[-.04em] text-white/[.025]">
          <span>ABOUT · ABOUT · ABOUT · ABOUT · </span>
          <span>ABOUT · ABOUT · ABOUT · ABOUT · </span>
        </div>
      </div>

      <div className="relative mx-auto max-w-7xl">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.65 }}
          className="mx-auto mb-12 max-w-2xl text-center"
        >
          <span className="section-kicker border border-blue-400/20 bg-blue-400/10 text-blue-300">
            About me
          </span>

          <h2 className="mt-5 font-display text-5xl leading-none tracking-[-.04em] sm:text-7xl">
            A developer who cares about the finish.
          </h2>
        </motion.div>

        <div className="grid items-center gap-12 lg:grid-cols-[.82fr_1.18fr] lg:gap-24">

          {/* Profile Image */}
          <motion.div
            initial={{ opacity: 0, scale: 0.94 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.7 }}
            className="relative mx-auto w-full max-w-sm"
          >
            {/* Glow */}
            <div className="absolute -inset-8 rounded-full bg-blue-500/15 blur-3xl" />

            {/* Card */}
            <div className="group relative aspect-[4/5] overflow-hidden rounded-[2rem] border border-white/10 bg-[#191923] shadow-2xl shadow-black/30">

              {/* Image */}
              <Image
                src={personal.avatar}
                alt={personal.name}
                fill
                sizes="(max-width: 1024px) 320px, 380px"
                className="
                  object-cover
                  grayscale
                  brightness-90
                  scale-100
                  transition-all
                  duration-1000
                  ease-out
                  group-hover:grayscale-0
                  group-hover:brightness-110
                  group-hover:scale-105
                "
              />

              {/* Hover Shine */}
              <div
                className="
                  absolute inset-0 opacity-0
                  bg-gradient-to-tr
                  from-transparent
                  via-white/10
                  to-transparent
                  transition-opacity
                  duration-700
                  group-hover:opacity-100
                "
              />

              {/* Overlay */}
              <div
                className="
                  absolute inset-0
                  bg-gradient-to-t
                  from-[#101018]/70
                  via-transparent
                  to-transparent
                  transition-all
                  duration-1000
                  group-hover:from-[#101018]/30
                "
              />

              {/* Location */}
              <p className="absolute bottom-5 left-5 text-[10px] font-bold uppercase tracking-[.2em] text-white/60">
                {personal.location}
              </p>
            </div>
          </motion.div>

          {/* Content */}
          <motion.div
            initial={{ opacity: 0, x: 24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.65 }}
            className="max-w-2xl text-center lg:text-left"
          >
            <p className="text-xl font-medium leading-relaxed text-zinc-300 sm:text-2xl">
              I enjoy the intersection of{' '}
              <span className="text-white">
                technical clarity
              </span>{' '}
              and{' '}
              <span className="text-blue-300">
                good visual judgement
              </span>
              —where a site is as easy to use as it is memorable.
            </p>

            <div className="mt-7 space-y-4 text-sm leading-relaxed text-zinc-400 sm:text-base">
              {personal.bioLong.map((paragraph) => (
                <p key={paragraph}>
                  {paragraph}
                </p>
              ))}
            </div>

            <a
              href="#projects"
              onClick={(event) => {
                event.preventDefault()
                document
                  .querySelector('#projects')
                  ?.scrollIntoView({
                    behavior: 'smooth',
                  })
              }}
              className="mt-8 inline-flex items-center gap-2 text-sm font-black text-white transition hover:text-blue-300"
            >
              Explore the work
              <ArrowUpRight size={16} />
            </a>

            {/* Stats */}
            <div className="mt-10 grid gap-3 sm:grid-cols-3">
              {stats.map((stat, index) => (
                <div
                  key={stat.label}
                  className="rounded-2xl border border-white/10 bg-white/[.035] p-4 backdrop-blur-sm transition hover:-translate-y-1 hover:bg-white/[.06]"
                >
                  <p
                    className={
                      index === 1
                        ? 'font-display text-3xl text-emerald-300'
                        : 'font-display text-3xl text-blue-300'
                    }
                  >
                    {stat.value}
                  </p>

                  <p className="mt-1 text-[10px] font-bold uppercase tracking-[.12em] text-zinc-500">
                    {stat.detail}
                  </p>
                </div>
              ))}
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  )
}