'use client'

import { ArrowUpRight, Github } from 'lucide-react'
import { motion } from 'framer-motion'
import { personal, social } from '@/lib/data'

export default function Footer() {
  return (
    <footer className="border-t border-white/10 bg-[#101018] px-6 py-9 text-zinc-400">
      <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-5 sm:flex-row">
        <div className="text-center sm:text-left">
          <p className="text-sm font-bold text-white">{personal.name}</p>
          <p className="mt-1 text-[11px] font-medium tracking-wide text-zinc-500">Designed and built with care · © {new Date().getFullYear()}</p>
        </div>
        <div className="flex items-center gap-2">
          <a href={social.github} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 rounded-xl border border-white/10 px-3 py-2 text-xs font-bold transition hover:border-[#81c784]/30 hover:bg-white/5 hover:text-white">
            <Github size={14} /> GitHub <ArrowUpRight size={13} />
          </a>
          <motion.button onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} whileHover={{ y: -2 }} className="rounded-xl border border-white/10 px-3 py-2 text-xs font-bold transition hover:border-[#81c784]/30 hover:bg-white/5 hover:text-white">
            Back to top
          </motion.button>
        </div>
      </div>
    </footer>
  )
}
