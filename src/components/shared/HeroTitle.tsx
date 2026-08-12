'use client'

import { useLayoutEffect, useRef } from 'react'
import gsap from 'gsap'

export default function HeroTitle({ name }: { name: string }) {
  const titleRef = useRef<HTMLHeadingElement>(null)

  useLayoutEffect(() => {
    const context = gsap.context(() => {
      const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
      if (reduceMotion) return
      gsap.fromTo('[data-hero-word]', { yPercent: 115, opacity: 0, rotate: 2 }, {
        yPercent: 0, opacity: 1, rotate: 0, duration: 1.05, stagger: 0.12, delay: 0.25,
        ease: 'power4.out',
      })
    }, titleRef)
    return () => context.revert()
  }, [])

  const words = name.toUpperCase().split(' ')
  return (
    <h1 ref={titleRef} className="font-display text-[clamp(3.5rem,10vw,9.4rem)] leading-[.78] tracking-[-.055em] text-[#1a1a29]" aria-label={name}>
      {words.map((word, index) => (
        <span className="block overflow-hidden" key={word}>
          <span data-hero-word className={index === 1 ? 'text-[#4caf50]' : ''}>{word}</span>
        </span>
      ))}
    </h1>
  )
}
