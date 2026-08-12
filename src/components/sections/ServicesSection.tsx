'use client'

import { motion } from 'framer-motion'
import { ArrowUpRight, Code2, PanelsTopLeft, Sparkles } from 'lucide-react'
import { services } from '@/lib/data'

const icons = [Code2, PanelsTopLeft, Sparkles]

export default function ServicesSection() {
  return (
    <section id="services" className="relative overflow-hidden bg-[#101018] px-6 py-24 text-white sm:py-32">
      <div aria-hidden="true" className="absolute -right-[10%] top-[5%] size-[38vw] rounded-full bg-cyan-400/[.08] blur-[120px]" />
      <div className="relative mx-auto max-w-7xl">
        <motion.div initial={{ opacity: 0, y: 18 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: '-80px' }} className="grid gap-6 lg:grid-cols-2 lg:items-end">
          <div><span className="section-kicker border border-cyan-300/20 bg-cyan-300/10 text-cyan-100">/ How I can help</span><h2 className="mt-5 font-display text-5xl leading-[.9] tracking-[-.04em] sm:text-7xl">Clear work,<br />thoughtfully made.</h2></div>
          <p className="max-w-lg text-sm leading-relaxed text-zinc-400 sm:text-base lg:justify-self-end">For a new idea, a sharper marketing site, or an interface that needs more attention to detail, I bring a practical build-first approach.</p>
        </motion.div>
        <div className="mt-14 grid gap-4 lg:mt-20 lg:grid-cols-3">
          {services.map((service, index) => {
            const Icon = icons[index]
            return <motion.article key={service.number} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: index * .08 }} className="group relative overflow-hidden rounded-3xl border border-white/10 bg-white/[.035] p-7 transition hover:-translate-y-1 hover:border-violet-300/35 hover:bg-white/[.06]">
              <div className="absolute -right-10 -top-10 size-32 rounded-full bg-violet-400/10 blur-2xl transition group-hover:bg-violet-400/20" />
              <div className="relative flex items-center justify-between"><span className="text-[11px] font-black tracking-[.18em] text-violet-200">{service.number}</span><Icon size={20} className="text-cyan-200" /></div>
              <h3 className="relative mt-16 text-2xl font-black tracking-tight">{service.title}</h3>
              <p className="relative mt-4 text-sm leading-relaxed text-zinc-400">{service.description}</p>
              <span className="relative mt-8 inline-flex items-center gap-1 text-xs font-bold text-white/60 transition group-hover:text-white">Let’s talk <ArrowUpRight size={14} /></span>
            </motion.article>
          })}
        </div>
      </div>
    </section>
  )
}
