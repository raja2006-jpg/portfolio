'use client'

import { motion } from 'framer-motion'
import { BadgeCheck, ExternalLink } from 'lucide-react'
import { certifications } from '@/lib/data'

export default function CertificationsSection() {
  return (
    <section id="certifications" className="surface-light relative overflow-hidden px-6 py-24 sm:py-32">
      <div aria-hidden="true" className="absolute -left-[15%] top-1/3 size-[38vw] rounded-full bg-amber-200/45 blur-[120px]" />
      <div className="relative mx-auto grid max-w-7xl gap-12 lg:grid-cols-[.9fr_1.1fr] lg:items-center">
        <motion.div initial={{ opacity: 0, y: 18 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: '-80px' }}>
          <span className="section-kicker border border-amber-500/15 bg-amber-400/15 text-amber-800">/ Certifications</span>
          <h2 className="mt-5 max-w-md font-display text-5xl leading-[.9] tracking-[-.04em] sm:text-7xl">Evidence of the journey.</h2>
          <p className="mt-6 max-w-md text-sm leading-relaxed text-[#656574] sm:text-base">This archive is designed to grow with verified achievements, credential links, and continuing education.</p>
        </motion.div>
        <div className="space-y-3">
          {certifications.map((certification, index) => (
            <motion.article key={certification.title} initial={{ opacity: 0, x: 18 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: index * .08 }} className="rounded-3xl border border-[#202033]/10 bg-white/65 p-6 shadow-xl shadow-[#202033]/[.035] backdrop-blur">
              <div className="flex gap-4"><span className="grid size-11 shrink-0 place-items-center rounded-2xl bg-amber-200/55 text-amber-900"><BadgeCheck size={19} /></span><div><div className="flex flex-col gap-1 sm:flex-row sm:items-center sm:justify-between"><h3 className="font-black tracking-tight text-[#262637]">{certification.title}</h3><span className="text-[10px] font-black uppercase tracking-[.15em] text-amber-700">{certification.date}</span></div><p className="mt-1 text-xs font-bold text-violet-700">{certification.issuer}</p><p className="mt-4 text-sm leading-relaxed text-[#656574]">{certification.detail}</p><span className="mt-4 inline-flex items-center gap-1 text-xs font-bold text-[#4d4ec9]">Credential links will appear here <ExternalLink size={13} /></span></div></div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  )
}
