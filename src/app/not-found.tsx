'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { Home, ArrowLeft } from 'lucide-react'

export default function NotFound() {
  return (
    <div className="min-h-screen bg-zinc-950 flex flex-col items-center justify-center p-6 relative overflow-hidden select-none">
      {/* Background glow effects */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[60%] h-[40%] bg-violet-500/5 rounded-full blur-[140px] pointer-events-none" />
      <div className="grid-dots opacity-[0.02]" />

      <div className="relative z-10 flex flex-col items-center text-center max-w-md">
        
        {/* Animated Error Code */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8, y: -20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.34, 1.56, 0.64, 1] }}
          className="relative mb-6"
        >
          <h1 className="text-8xl sm:text-9xl font-black text-gradient tracking-tight select-none">
            404
          </h1>
          <div className="absolute -inset-2 bg-violet-500/5 blur-xl rounded-full pointer-events-none" />
        </motion.div>

        {/* Heading */}
        <motion.h2
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1, duration: 0.5 }}
          className="text-2xl font-bold text-white mb-3"
        >
          Page Not Found
        </motion.h2>

        {/* Description */}
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.5 }}
          className="text-zinc-400 text-sm leading-relaxed mb-8"
        >
          The page you are looking for doesn&apos;t exist or has been moved. Use the options below to go back home or find your way.
        </motion.p>

        {/* Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.5 }}
          className="flex flex-col sm:flex-row gap-3 w-full"
        >
          <Link
            href="/"
            className="flex-1 flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-violet-500 text-white font-semibold text-sm hover:bg-violet-400 active:scale-[0.98] transition-all cursor-pointer shadow-lg shadow-violet-500/25"
          >
            <Home size={14} />
            <span>Go to Home</span>
          </Link>
          
          <button
            onClick={() => window.history.back()}
            className="flex-1 flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-zinc-900 border border-zinc-800 text-zinc-300 font-semibold text-sm hover:text-white hover:border-zinc-700 active:scale-[0.98] transition-all cursor-pointer"
          >
            <ArrowLeft size={14} />
            <span>Go Back</span>
          </button>
        </motion.div>

      </div>
    </div>
  )
}
