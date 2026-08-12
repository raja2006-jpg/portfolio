'use client'

import { useEffect, useRef, useState } from 'react'
import { skills } from '@/lib/data'

export default function SkillsRope() {
  const [revealed, setRevealed] = useState(false)
  const ref = useRef<HTMLDivElement>(null)
  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => entry.isIntersecting && setRevealed(true), { rootMargin: '-80px' })
    if (ref.current) observer.observe(ref.current)
    return () => observer.disconnect()
  }, [])
  const items = [...skills, ...skills] 
  return (
    <div ref={ref} className="relative z-10 -my-9 flex h-24 w-full items-center overflow-hidden sm:-my-12 sm:h-32" aria-label="Technical skills">
      <div className={`absolute left-1/2 flex w-[210%] -translate-x-1/2 rotate-[2deg] bg-gradient-to-r from-[#2a0000] via-[#ff2400] to-[#ff7300] py-4 shadow-[0_0_50px_rgba(255,60,0,.45)] transition-all duration-[1400ms] sm:py-6 ${revealed ? 'scale-100 opacity-100 blur-0' : 'rotate-[-4deg] scale-90 opacity-0 blur-sm'}`}>
        <div className="skill-ribbon flex shrink-0 items-center gap-8 whitespace-nowrap pr-8 sm:gap-14 sm:pr-14">
          {items.map((skill, index) => <span key={`${skill}-${index}`} className="font-display text-2xl tracking-tight text-white sm:text-4xl">{skill.toUpperCase()}</span>)}
        </div>
        <div aria-hidden="true" className="skill-ribbon flex shrink-0 items-center gap-8 whitespace-nowrap pr-8 sm:gap-14 sm:pr-14">
          {items.map((skill, index) => <span key={`${skill}-copy-${index}`} className="font-display text-2xl tracking-tight text-white sm:text-4xl">{skill.toUpperCase()}</span>)}
        </div>
      </div>
    </div>
  )
}
