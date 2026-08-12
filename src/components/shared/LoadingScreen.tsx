'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { useState, useEffect } from 'react'
import { personal } from '@/lib/data'

export default function LoadingScreen() {
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 1200)
    return () => clearTimeout(timer)
  }, [])

  return (
    <AnimatePresence mode="wait">
      {isLoading && (
        <motion.div
          key="loading"
          className="fixed inset-0 z-[9999] bg-zinc-950 flex items-center justify-center"
          initial={{ opacity: 1 }}
          exit={{
            opacity: 0,
            scale: 1.05,
            transition: { duration: 0.6, ease: [0.76, 0, 0.24, 1] },
          }}
        >
          {/* Center content */}
          <div className="relative flex flex-col items-center gap-6">
            {/* Initials */}
            <motion.div
              className="relative"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.5, ease: [0.34, 1.56, 0.64, 1] }}
            >
              <div className="w-20 h-20 rounded-2xl bg-[#4caf50]/10 border border-[#4caf50]/30 flex items-center justify-center relative overflow-hidden">
                {/* Shimmer */}
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-transparent via-[#4caf50]/10 to-transparent"
                  animate={{ x: ['-100%', '200%'] }}
                  transition={{ duration: 1.5, repeat: Infinity, ease: 'linear' }}
                />
                <span className="text-2xl font-bold text-gradient relative z-10">
                  {personal.initials}
                </span>
              </div>
              {/* Glow ring */}
              <div className="absolute inset-0 rounded-2xl bg-[#4caf50]/5 blur-xl" />
            </motion.div>

            {/* Loading bar */}
            <div className="w-32 h-[2px] bg-zinc-800 rounded-full overflow-hidden">
              <motion.div
                className="h-full bg-gradient-to-r from-[#388e3c] to-[#81c784] rounded-full"
                initial={{ width: '0%' }}
                animate={{ width: '100%' }}
                transition={{ duration: 1.0, ease: 'easeInOut' }}
              />
            </div>

            {/* Name */}
            <motion.p
              className="text-xs font-mono text-zinc-500 tracking-widest uppercase"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.4 }}
            >
              {personal.name}
            </motion.p>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
