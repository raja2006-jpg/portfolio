'use client'

import { motion } from 'framer-motion'
import { skillGroups, skills } from '@/lib/data'

export default function SkillsSection() {
  return (
    <section id="skills" className="surface-light relative overflow-hidden px-6 pb-24 pt-36 sm:pb-32 sm:pt-44">
      <div aria-hidden="true" className="absolute right-[-15%] top-0 size-[50vw] rounded-full bg-cyan-200/35 blur-[120px]" />
      <div className="relative mx-auto max-w-7xl">
        <div className="grid gap-10 lg:grid-cols-[.9fr_1.1fr] lg:gap-20">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: '-80px' }}>
            <span className="section-kicker border border-violet-500/15 bg-violet-500/10 text-violet-700">/ Capability map</span>
            <h2 className="mt-5 max-w-md font-display text-5xl leading-[.9] tracking-[-.045em] sm:text-7xl">Tools that turn ideas into interfaces.</h2>
            <p className="mt-6 max-w-md text-base font-medium leading-relaxed text-[#646475]">A growing toolkit shaped by building. I choose what serves the problem and keep the implementation focused.</p>
          </motion.div>
          <div className="grid gap-3 sm:grid-cols-3 lg:pt-5">
            {skillGroups.map((group, index) => (
              <motion.article key={group.label} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: index * .08 }} className="rounded-2xl border border-[#202033]/10 bg-white/55 p-5 shadow-xl shadow-[#202033]/[.03] backdrop-blur-sm">
                <p className="text-[10px] font-black uppercase tracking-[.16em] text-violet-700">{group.label}</p>
                <ul className="mt-5 space-y-3">
                  {group.items.map((skill) => <li key={skill} className="border-b border-[#202033]/8 pb-2 text-sm font-semibold text-[#373747] last:border-0">{skill}</li>)}
                </ul>
              </motion.article>
            ))}
          </div>
        </div>
        <div className="relative mt-16 overflow-hidden rounded-3xl border border-[#202033]/10 bg-[#202033] px-5 py-6 sm:px-8">
          <div className="absolute inset-y-0 left-0 z-10 w-12 bg-gradient-to-r from-[#202033] to-transparent" />
          <div className="absolute inset-y-0 right-0 z-10 w-12 bg-gradient-to-l from-[#202033] to-transparent" />
          <div className="marquee-reverse flex gap-3 whitespace-nowrap">
            {[...skills, ...skills].map((skill, index) => <span key={`${skill}-${index}`} className="rounded-full border border-white/10 bg-white/5 px-4 py-2 text-xs font-bold text-zinc-200">{skill}</span>)}
          </div>
        </div>
      </div>
    </section>
  )
}
