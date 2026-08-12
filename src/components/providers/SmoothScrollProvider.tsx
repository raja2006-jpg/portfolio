'use client'

import { useEffect } from 'react'
import Lenis from 'lenis'

export default function SmoothScrollProvider({
  children,
}: {
  children: React.ReactNode
}) {
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    const lenis = new Lenis({
      duration: 1.2,
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      wheelMultiplier: 1,
      touchMultiplier: 2,
    })

    let stopped = false
    let animationFrame = 0
    function raf(time: number) {
      if (stopped) return
      lenis.raf(time)
      animationFrame = requestAnimationFrame(raf)
    }

    animationFrame = requestAnimationFrame(raf)

    return () => {
      stopped = true
      cancelAnimationFrame(animationFrame)
      lenis.destroy()
    }
  }, [])

  return <>{children}</>
}
