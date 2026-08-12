'use client'

import { useCallback, useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { Github, Menu, X } from 'lucide-react'
import { cn } from '@/lib/utils'
import { personal, social } from '@/lib/data'
import ScrollProgress from '@/components/shared/ScrollProgress'

const navLinks = [
  { label: 'Hero', href: '#hero' },
  { label: 'Project', href: '#projects' },
  { label: 'About', href: '#about' },
]

const sections = ['hero', 'skills', 'projects', 'education', 'about', 'contact']

export default function Navbar() {
  const [activeSection, setActiveSection] = useState('hero')
  const [isScrolled, setIsScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 24)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    const observers = sections.flatMap((id) => {
      const element = document.getElementById(id)
      if (!element) return []
      const observer = new IntersectionObserver(([entry]) => entry.isIntersecting && setActiveSection(id), { rootMargin: '-42% 0px -48% 0px' })
      observer.observe(element)
      return [observer]
    })
    return () => observers.forEach((observer) => observer.disconnect())
  }, [])

  const navigate = useCallback((event: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    event.preventDefault()
    setMobileOpen(false)
    document.querySelector(href)?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }, [])

  return (
    <>
      <ScrollProgress />
      <motion.header className={cn('fixed inset-x-0 top-0 z-50 px-5 sm:px-8', isScrolled ? 'pt-2' : 'pt-5')} initial={{ y: -36, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ duration: .65, delay: .25, ease: [0.22, 1, .36, 1] }}>
        <div className="mx-auto max-w-[1400px]">
          <div className={cn('flex items-center justify-between border border-transparent px-1 py-2.5 transition-all duration-500', isScrolled ? 'rounded-2xl border-white/50 bg-[rgba(255,255,255,0.8)] px-4 shadow-lg shadow-black/5 backdrop-blur-xl' : 'bg-transparent')}>
            <a href="#hero" onClick={(event) => navigate(event, '#hero')} className="group flex shrink-0 items-center rounded-xl py-1">
              <span className="text-lg font-black tracking-[-.09em] text-zinc-900 sm:text-xl gap-2  will-change-transform width-full">RAJA<span className="text-[#388e3c]">SIDDHARTH</span></span>
            </a>
            <nav className="hidden items-center gap-0.5 lg:flex" aria-label="Main navigation">
              {navLinks.map((link) => {
                const active = activeSection === link.href.slice(1)
                return <a key={link.href} href={link.href} onClick={(event) => navigate(event, link.href)} className={cn('relative rounded-xl px-4 py-2 text-[11px] font-black uppercase tracking-[.13em] transition-colors', active ? 'text-zinc-900' : 'text-zinc-500 hover:text-zinc-900')}>
                  {active && <motion.span layoutId="nav-active" className="absolute inset-0 rounded-2xl border border-black/5 bg-white shadow-sm backdrop-blur" transition={{ type: 'spring', stiffness: 360, damping: 30 }} />}
                  <span className="relative z-10">{link.label}</span>
                </a>
              })}
            </nav>
            <div className="hidden items-center gap-2 sm:flex">
              {personal.openToWork && <span className="hidden items-center gap-1.5 rounded-full border border-[#388e3c]/20 bg-[#388e3c]/10 px-2.5 py-1 text-[10px] font-bold uppercase tracking-[.08em] text-[#2e7d32] xl:flex"><span className="size-1.5 rounded-full bg-[#388e3c] animate-pulse-dot" style={{ boxShadow: '0 0 6px rgba(56,142,60,0.5)' }} /> Available</span>}
              <a href={social.github} target="_blank" rel="noreferrer" aria-label="Open Raja's GitHub profile" className="grid size-8 place-items-center rounded-lg border border-black/5 text-zinc-500 transition hover:border-black/15 hover:bg-black/5 hover:text-zinc-900"><Github size={15} /></a>
            </div>
            <button className="grid size-9 place-items-center rounded-lg text-zinc-500 transition hover:bg-black/5 hover:text-zinc-900 lg:hidden" onClick={() => setMobileOpen((open) => !open)} aria-expanded={mobileOpen} aria-label="Toggle navigation">{mobileOpen ? <X size={18} /> : <Menu size={18} />}</button>
          </div>
          <AnimatePresence>
            {mobileOpen && <motion.nav aria-label="Mobile navigation" initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} transition={{ duration: .2 }} className="mt-2 overflow-hidden rounded-2xl border border-black/10 bg-[rgba(255,255,255,0.95)] p-2 shadow-2xl backdrop-blur-xl lg:hidden">
              {navLinks.map((link, index) => <motion.a key={link.href} href={link.href} onClick={(event) => navigate(event, link.href)} initial={{ opacity: 0, x: -8 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: index * .035 }} className={cn('block rounded-xl px-4 py-3 text-sm font-semibold transition-colors', activeSection === link.href.slice(1) ? 'bg-[#388e3c]/10 text-[#2e7d32]' : 'text-zinc-500 hover:bg-black/5 hover:text-zinc-900')}>{link.label}</motion.a>)}
            </motion.nav>}
          </AnimatePresence>
        </div>
      </motion.header>
    </>
  )
}
