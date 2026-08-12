'use client'

import { motion } from 'framer-motion'
import { useRef, useCallback } from 'react'
import { cn } from '@/lib/utils'

interface BentoCardProps {
  children: React.ReactNode
  className?: string
  style?: React.CSSProperties
  glowColor?: string
}

export default function BentoCard({
  children,
  className,
  style,
  glowColor = 'rgba(16, 185, 129, 0.12)',
}: BentoCardProps) {
  const cardRef = useRef<HTMLDivElement>(null)
  const glowRef = useRef<HTMLDivElement>(null)

  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current || !glowRef.current) return
    const rect = cardRef.current.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top
    glowRef.current.style.background = `radial-gradient(600px circle at ${x}px ${y}px, ${glowColor}, transparent 40%)`
    glowRef.current.style.opacity = '1'
  }, [glowColor])

  const handleMouseLeave = useCallback(() => {
    if (!glowRef.current) return
    glowRef.current.style.opacity = '0'
  }, [])

  return (
    <motion.div
      ref={cardRef}
      className={cn(
        'relative rounded-2xl border border-zinc-800 bg-zinc-950/50 overflow-hidden group',
        'transition-colors duration-300 hover:border-zinc-700',
        className
      )}
      style={style}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      initial={{ opacity: 0, y: 20, scale: 0.96 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.5, ease: [0.34, 1.56, 0.64, 1] }}
    >
      {/* Spotlight glow */}
      <div
        ref={glowRef}
        className="absolute inset-0 pointer-events-none z-10 opacity-0 transition-opacity duration-300 rounded-2xl"
      />
      {/* Grid dots */}
      <div className="grid-dots" />
      {/* Content */}
      <div className="relative z-20 h-full">
        {children}
      </div>
    </motion.div>
  )
}
