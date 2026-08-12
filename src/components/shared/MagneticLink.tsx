'use client'

import { motion, useSpring, useMotionValue } from 'framer-motion'
import type { HTMLMotionProps } from 'framer-motion'

type MagneticLinkProps = HTMLMotionProps<'a'> & { strength?: number }

export default function MagneticLink({ children, strength = 0.16, onMouseMove, onMouseLeave, ...props }: MagneticLinkProps) {
  const x = useMotionValue(0)
  const y = useMotionValue(0)
  const springX = useSpring(x, { stiffness: 220, damping: 16, mass: 0.25 })
  const springY = useSpring(y, { stiffness: 220, damping: 16, mass: 0.25 })

  return (
    <motion.a
      {...props}
      style={{ x: springX, y: springY, ...props.style }}
      onMouseMove={(event) => {
        const rect = event.currentTarget.getBoundingClientRect()
        x.set((event.clientX - rect.left - rect.width / 2) * strength)
        y.set((event.clientY - rect.top - rect.height / 2) * strength)
        onMouseMove?.(event)
      }}
      onMouseLeave={(event) => {
        x.set(0)
        y.set(0)
        onMouseLeave?.(event)
      }}
    >
      {children}
    </motion.a>
  )
}
