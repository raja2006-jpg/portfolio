'use client'

import { useRef, type CSSProperties } from 'react'
import dynamic from 'next/dynamic'
import { motion } from 'framer-motion'
import {
  BriefcaseBusiness,
  Code2,
  FileText,
  Github,
  Instagram,
  Linkedin,
} from 'lucide-react'
import { personal, social } from '@/lib/data'
import ImageTrail from './ImageTrail'
import TiltedCard from '@/components/shared/TiltedCard'
import type { LanyardProps } from './Lanyard'

const Lanyard = dynamic<LanyardProps>(
  () => import('./Lanyard').then((module) => module.default),
  {
    ssr: false,
    loading: () => (
      <div
        aria-hidden="true"
        style={{
          width: '100%',
          height: '100%',
          background: 'transparent',
        }}
      />
    ),
  },
)

const HERO_TRAIL_IMAGES = [
  '/hero-card-1.png',
  '/hero-card-2.png',
  '/hero-card-3.png',
  '/hero-card-4.png',
  '/hero-card-5.png',
]

function GlowBlob({
  color,
  size,
  style,
  delay = 0,
}: {
  color: string
  size: number
  style?: CSSProperties
  delay?: number
}) {
  return (
    <motion.div
      aria-hidden="true"
      animate={{
        scale: [1, 1.15, 1],
        opacity: [0.55, 0.85, 0.55],
      }}
      transition={{
        duration: 8 + delay,
        repeat: Infinity,
        ease: 'easeInOut',
        delay,
      }}
      style={{
        position: 'absolute',
        width: size,
        height: size,
        borderRadius: '50%',
        background: color,
        filter: `blur(${Math.round(size * 0.5)}px)`,
        pointerEvents: 'none',
        ...style,
      }}
    />
  )
}

export default function HeroSection() {
  const sectionRef = useRef<HTMLElement>(null)

  const goTo = (id: string) => {
    document.querySelector(id)?.scrollIntoView({
      behavior: 'smooth',
      block: 'start',
    })
  }

  const container = {
    hidden: {},
    show: {
      transition: {
        staggerChildren: 0.12,
        delayChildren: 0.15,
      },
    },
  }

  const fadeUp = {
    hidden: {
      opacity: 0,
      y: 30,
    },
    show: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.7,
        ease: [0.22, 1, 0.36, 1],
      },
    },
  }

  return (
    <section id="hero" ref={sectionRef} className="hero-section">
      <div aria-hidden="true" className="hero-vignette" />

      <div aria-hidden="true" className="hero-ambient">
        <GlowBlob
          color="rgba(100,150,255,0.15)"
          size={850}
          style={{ top: '-10%', left: '-8%' }}
        />
        <GlowBlob
          color="rgba(255,255,255,0.4)"
          size={780}
          style={{ top: '5%', right: '-12%' }}
          delay={2.5}
        />
        <GlowBlob
          color="rgba(100,150,255,0.12)"
          size={700}
          style={{ bottom: '-15%', left: '30%' }}
          delay={4}
        />
        <div className="hero-dot-grid" />
      </div>

      <div className="hero-trail-overlay" aria-hidden="true">
        <ImageTrail items={HERO_TRAIL_IMAGES} variant={1} triggerRef={sectionRef} />
      </div>

      {/* LANYARD */}
      <div className="hero-lanyard-stage">
        <Lanyard
          position={[0, 0, 30]}
          gravity={[0, -60, 0]}
          fov={19}
          transparent
          frontImage={personal.avatar}
          backImage={personal.avatar}
          imageFit="cover"
          lanyardWidth={1}
        />
      </div>

      <div className="mobile-hero-card" aria-label="Profile preview">
        <TiltedCard
          imageSrc={personal.avatar}
          altText={`${personal.name} profile`}
          captionText={personal.name}
          containerHeight="290px"
          containerWidth="250px"
          imageHeight="260px"
          imageWidth="220px"
          scaleOnHover={1.08}
          rotateAmplitude={10}
          showMobileWarning={false}
          showTooltip={false}
        />
      </div>

      {/* CONTENT */}
      <div className="hero-content-wrap">
        <motion.div
          variants={container}
          initial="hidden"
          animate="show"
          className="hero-content"
        >
          <motion.div variants={fadeUp} className="availability-wrap">
            <span className="availability">Available for work</span>
          </motion.div>

          <motion.p variants={fadeUp} className="hero-intro">
            Hi, I&apos;m
          </motion.p>

          <motion.h1 variants={fadeUp} className="hero-name">
            {personal.name}
          </motion.h1>

          <motion.p variants={fadeUp} className="hero-role">
            FULL STACK DEVELOPER &amp; AI BUILDER
          </motion.p>

          <motion.p variants={fadeUp} className="hero-bio">
            Building modern web applications with precision, performance, and a
            touch of pixel-perfect design.
          </motion.p>

          <motion.div variants={fadeUp} className="hero-cta">
            <PrimaryBtn label="Get to Know Me" onClick={() => goTo('#about')} />
            <SecondaryBtn label="View My Work" onClick={() => goTo('#projects')} />
          </motion.div>

          <motion.div variants={fadeUp} className="hero-pill-wrap">
            <div className="hero-pill">
              <PillItem
                icon={<FileText size={28} />}
                label="Resume"
                href={personal.resumeUrl}
                borderRight
              />
              <PillItem
                icon={<Code2 size={28} />}
                label="Skills"
                onClick={() => goTo('#skills')}
                borderRight
              />
              <PillItem
                icon={<BriefcaseBusiness size={28} />}
                label="Work"
                onClick={() => goTo('#projects')}
              />
            </div>
          </motion.div>

          <div className="mobile-socials">
            <SocialIcon
              href={social.linkedin || 'https://www.linkedin.com/in/rajasiddharth007/'}
              label="LinkedIn"
              color="#0077b5"
              icon={<Linkedin size={20} />}
              size={48}
            />
            <SocialIcon
              href={social.github}
              label="GitHub"
              color="#000000"
              icon={<Github size={20} />}
              size={48}
            />
            <SocialIcon
              href="https://instagram.com/siddharth_raja_07"
              label="Instagram"
              color="#e1306c"
              icon={<Instagram size={20} />}
              size={48}
            />
          </div>
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{
          delay: 1,
          duration: 0.7,
          ease: [0.22, 1, 0.36, 1],
        }}
        className="social-sidebar"
      >
        <SocialIcon
          href={social.linkedin || 'https://linkedin.com'}
          label="LinkedIn"
          color="#0a66c2"
          icon={<Linkedin size={20} />}
        />
        <SocialIcon
          href={social.github}
          label="GitHub"
          color="#000000"
          icon={<Github size={20} />}
        />
        <SocialIcon
          href="https://instagram.com"
          label="Instagram"
          color="#e1306c"
          icon={<Instagram size={20} />}
        />
        <div className="social-line" />
      </motion.div>

      <style>{`
        .hero-section {
          position: relative;
          min-height: 100vh;
          width: 100%;
          overflow: hidden;
          background: #f0f4f3;
        }

        .hero-vignette {
          position: absolute;
          inset: 0;
          z-index: 0;
          pointer-events: none;
          box-shadow: inset 0 0 160px rgba(100,160,250,0.18);
        }

        .hero-ambient {
          position: absolute;
          inset: 0;
          z-index: 0;
          overflow: hidden;
          pointer-events: none;
        }

        .hero-dot-grid {
          position: absolute;
          inset: 0;
          background-image: radial-gradient(rgba(0,0,0,0.015) 1px, transparent 1px);
          background-size: 30px 30px;
        }

        .hero-trail-overlay {
          position: absolute;
          inset: 0;
          width: 100%;
          height: 100%;
          z-index: 9;
          pointer-events: none;
        }

        .hero-trail-overlay .content {
          position: absolute;
          inset: 0;
          width: 100%;
          height: 100%;
          pointer-events: none;
        }

        .hero-lanyard-stage {
          position: absolute;
          top: 0;
          right: 0;
          width: 58%;
          height: 100vh;
          z-index: 10;
          pointer-events: auto;
          background: transparent !important;
        }

        .hero-lanyard-stage > div {
          width: 100%;
          height: 100%;
          background: transparent !important;
        }

        .hero-lanyard-stage canvas {
          width: 100% !important;
          height: 100% !important;
          background: transparent !important;
        }

        .mobile-hero-card {
          position: absolute;
          top: 16vh;
          left: 50%;
          transform: translateX(-50%);
          z-index: 15;
          display: none;
          pointer-events: none;
        }

        .hero-content-wrap {
          position: relative;
          z-index: 20;
          width: 100%;
          min-height: 100vh;
          max-width: 1280px;
          margin: 0 auto;
          padding: 80px 24px 40px 128px;
          display: flex;
          align-items: center;
          pointer-events: none;
        }

        .hero-content {
          width: 52%;
          max-width: 680px;
          display: flex;
          flex-direction: column;
          align-items: flex-start;
          text-align: left;
          pointer-events: auto;
        }

        .availability-wrap {
          margin-bottom: 1.5rem;
        }

        .availability {
          display: inline-flex;
          align-items: center;
          padding: 0.375rem 1rem;
          border-radius: 999px;
          border: 1px solid rgba(56,142,60,0.2);
          background: rgba(56,142,60,0.06);
          font-size: 0.75rem;
          line-height: 1rem;
          font-weight: 700;
          letter-spacing: 0.08em;
          text-transform: uppercase;
          color: #2e7d32;
        }

        .hero-intro {
          margin: 0 0 0.5rem;
          font-size: 2.1rem;
          font-weight: 700;
          font-style: italic;
          color: #6b7280;
        }

        .hero-name {
          margin: 0 0 1rem;
          font-size: clamp(3.5rem, 7vw, 6.3rem);
          line-height: 0.92;
          font-weight: 900;
          letter-spacing: -0.045em;
          color: #43a047;
        }

        .hero-role {
          margin: 0 0 1rem;
          font-size: 1.65rem;
          font-weight: 800;
          font-style: italic;
          text-transform: uppercase;
          letter-spacing: -0.04em;
          color: #4b5563;
        }

        .hero-bio {
          max-width: 570px;
          margin: 0 0 1.5rem;
          font-size: 1.05rem;
          line-height: 1.625;
          font-weight: 500;
          color: #4a5568;
        }

        .hero-cta {
          display: flex;
          gap: 1rem;
          margin-bottom: 1.5rem;
          flex-wrap: wrap;
        }

        .hero-pill-wrap {
          width: 100%;
          max-width: 32rem;
        }

        .hero-pill {
          display: flex;
          width: 100%;
          border-radius: 20px;
          border: 1px solid rgba(101,100,100,0.26);
          background: rgba(235,242,238,0.3);
          backdrop-filter: blur(10px);
          -webkit-backdrop-filter: blur(10px);
          overflow: hidden;
          box-shadow:
            0 4px 20px rgba(91,90,90,0.1),
            inset 0 1px 0 rgba(201,199,199,0.41);
        }

        .mobile-socials {
          display: none;
          align-items: center;
          justify-content: center;
          gap: 2rem;
          padding-top: 1rem;
        }

        .social-sidebar {
          position: absolute;
          left: 32px;
          top: 50%;
          transform: translateY(-50%);
          z-index: 30;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 24px;
        }

        .social-line {
          width: 1px;
          height: 80px;
          margin-top: 4px;
          background: linear-gradient(to bottom, rgba(0,0,0,0.15), transparent);
        }

        @media (min-width: 1280px) {
          .hero-lanyard-stage {
            width: 56%;
          }

          .hero-content-wrap {
            padding-left: 132px;
          }

          .social-sidebar {
            left: 48px;
          }
        }

        @media (max-width: 1023px) {
          .hero-trail-overlay,
          .hero-lanyard-stage {
            width: 100%;
            height: 100vh;
          }

          .hero-lanyard-stage {
            display: none;
          }

          .mobile-hero-card {
            display: flex;
            justify-content: center;
            align-items: center;
          }

          .hero-content-wrap {
            min-height: 100vh;
            padding: 68vh 24px 48px;
            justify-content: center;
          }

          .hero-content {
            width: 100%;
            max-width: 680px;
            align-items: center;
            text-align: center;
          }

          .hero-cta {
            justify-content: center;
          }

          .social-sidebar {
            display: none;
          }

          .mobile-socials {
            display: flex;
          }
        }

        @media (max-width: 639px) {
          .hero-content-wrap {
            padding-top: 62vh;
          }

          .hero-name {
            font-size: clamp(2.7rem, 12vw, 4rem);
            text-align: center;
          }

          .hero-role {
            font-size: 1rem;
          }

          .hero-bio {
            font-size: 0.92rem;
          }

          .hero-cta {
            width: 100%;
            justify-content: center;
          }

          .hero-cta > button {
            width: 100%;
          }

          .hero-pill-wrap,
          .hero-pill {
            max-width: 100%;
          }
        }
      `}</style>
    </section>
  )
}

function PrimaryBtn({
  label,
  onClick,
}: {
  label: string
  onClick?: () => void
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      onMouseEnter={(event) => {
        const el = event.currentTarget
        el.style.background = '#2e7d32'
        el.style.transform = 'translateY(-2px)'
        el.style.boxShadow = '0 6px 20px rgba(56,142,60,0.4)'
      }}
      onMouseLeave={(event) => {
        const el = event.currentTarget
        el.style.background = '#388e3c'
        el.style.transform = ''
        el.style.boxShadow = '0 4px 14px rgba(56,142,60,0.3)'
      }}
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: '0.4rem',
        padding: '1rem 2rem',
        borderRadius: 16,
        border: 'none',
        background: '#388e3c',
        color: '#fff',
        fontSize: '1rem',
        fontWeight: 700,
        cursor: 'pointer',
        boxShadow: '0 4px 14px rgba(56,142,60,0.3)',
        transition: 'all 0.2s ease',
      }}
    >
      {label}
    </button>
  )
}

function SecondaryBtn({
  label,
  onClick,
}: {
  label: string
  onClick?: () => void
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: '0.4rem',
        padding: '1rem 2rem',
        borderRadius: 16,
        border: '1px solid rgba(0,0,0,0.08)',
        background: 'rgba(255,255,255,0.4)',
        color: '#1f2937',
        fontSize: '1rem',
        fontWeight: 700,
        cursor: 'pointer',
        backdropFilter: 'blur(12px)',
        WebkitBackdropFilter: 'blur(12px)',
        transition: 'all 0.2s ease',
      }}
      onMouseEnter={(event) => {
        event.currentTarget.style.background = 'rgba(255,255,255,0.7)'
        event.currentTarget.style.transform = 'translateY(-2px)'
      }}
      onMouseLeave={(event) => {
        event.currentTarget.style.background = 'rgba(255,255,255,0.4)'
        event.currentTarget.style.transform = ''
      }}
    >
      {label}
    </button>
  )
}

function PillItem({
  icon,
  label,
  href,
  onClick,
  borderRight,
}: {
  icon: React.ReactNode
  label: string
  href?: string
  onClick?: () => void
  borderRight?: boolean
}) {
  const baseStyle: CSSProperties = {
    display: 'inline-flex',
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '0.25rem',
    padding: '0.75rem 0',
    borderRight: borderRight ? '1px solid rgba(0,0,0,0.06)' : undefined,
    background: 'transparent',
    borderTop: 'none',
    borderBottom: 'none',
    borderLeft: 'none',
    color: '#374151',
    fontSize: '0.875rem',
    fontWeight: 700,
    cursor: 'pointer',
    transition: 'color 0.2s ease, background 0.2s ease',
    textDecoration: 'none',
  }

  const hoverIn = (event: React.MouseEvent<HTMLElement>) => {
    event.currentTarget.style.color = '#2e7d32'
    event.currentTarget.style.background = 'rgba(255,255,255,0.4)'
  }

  const hoverOut = (event: React.MouseEvent<HTMLElement>) => {
    event.currentTarget.style.color = '#374151'
    event.currentTarget.style.background = 'transparent'
  }

  const content = (
    <>
      <span style={{ color: '#2e7d32' }}>{icon}</span>
      {label}
    </>
  )

  if (href) {
    return (
      <a
        href={href}
        style={baseStyle}
        onMouseEnter={hoverIn}
        onMouseLeave={hoverOut}
      >
        {content}
      </a>
    )
  }

  return (
    <button
      type="button"
      style={baseStyle}
      onClick={onClick}
      onMouseEnter={hoverIn}
      onMouseLeave={hoverOut}
    >
      {content}
    </button>
  )
}

function SocialIcon({
  href,
  label,
  color,
  icon,
  size = 40,
}: {
  href: string
  label: string
  color: string
  icon: React.ReactNode
  size?: number
}) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noreferrer"
      aria-label={label}
      onMouseEnter={(event) => {
        const el = event.currentTarget
        el.style.transform = 'translateX(4px) scale(1.1)'
        el.style.boxShadow = `0 6px 20px ${color}66`
      }}
      onMouseLeave={(event) => {
        const el = event.currentTarget
        el.style.transform = ''
        el.style.boxShadow = `0 4px 14px ${color}33`
      }}
      style={{
        display: 'grid',
        placeItems: 'center',
        width: size,
        height: size,
        borderRadius: '50%',
        background: color,
        color: '#fff',
        boxShadow: `0 4px 14px ${color}33`,
        textDecoration: 'none',
        transition: 'all 0.25s cubic-bezier(0.22,1,0.36,1)',
      }}
    >
      {icon}
    </a>
  )
}