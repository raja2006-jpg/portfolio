'use client'

import { useEffect, useRef, useState } from 'react'

export default function CustomCursor() {
  const dotRef = useRef<HTMLDivElement>(null)
  const ringRef = useRef<HTMLDivElement>(null)
  const [isVisible, setIsVisible] = useState(false)
  const [isHovering, setIsHovering] = useState(false)

  useEffect(() => {
    // Only show on non-touch devices
    if (window.matchMedia('(pointer: coarse)').matches) return

    document.body.classList.add('cursor-enhanced')
    setIsVisible(true)

    let dotX = 0, dotY = 0
    let ringX = 0, ringY = 0
    let animId: number

    const moveDot = (e: MouseEvent) => {
      dotX = e.clientX
      dotY = e.clientY
    }

    const lerp = (a: number, b: number, n: number) => (1 - n) * a + n * b

    const animate = () => {
      if (dotRef.current) {
        dotRef.current.style.transform = `translate(${dotX - 3}px, ${dotY - 3}px)`
      }
      ringX = lerp(ringX, dotX, 0.12)
      ringY = lerp(ringY, dotY, 0.12)
      if (ringRef.current) {
        ringRef.current.style.transform = `translate(${ringX - 18}px, ${ringY - 18}px)`
      }
      animId = requestAnimationFrame(animate)
    }

    animId = requestAnimationFrame(animate)
    window.addEventListener('mousemove', moveDot)

    const handleEnter = () => setIsHovering(true)
    const handleLeave = () => setIsHovering(false)

    const interactives = document.querySelectorAll(
      'a, button, [data-cursor-hover]'
    )
    interactives.forEach((el) => {
      el.addEventListener('mouseenter', handleEnter)
      el.addEventListener('mouseleave', handleLeave)
    })

    return () => {
      cancelAnimationFrame(animId)
      document.body.classList.remove('cursor-enhanced')
      window.removeEventListener('mousemove', moveDot)
      interactives.forEach((el) => {
        el.removeEventListener('mouseenter', handleEnter)
        el.removeEventListener('mouseleave', handleLeave)
      })
    }
  }, [])

  if (!isVisible) return null

  return (
    <>
      <div
        ref={dotRef}
        className="custom-cursor-dot"
        style={{
          transform: isHovering ? 'translate(-3px, -3px) scale(1.5)' : undefined,
        }}
      />
      <div
        ref={ringRef}
        className="custom-cursor-ring"
        style={{
          width: isHovering ? '52px' : '36px',
          height: isHovering ? '52px' : '36px',
          borderColor: isHovering
            ? 'rgba(16, 185, 129, 0.8)'
            : 'rgba(16, 185, 129, 0.4)',
        }}
      />
    </>
  )
}
