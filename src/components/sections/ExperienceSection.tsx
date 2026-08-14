'use client'

import { motion } from 'framer-motion'
import { BookOpen, BriefcaseBusiness, GraduationCap } from 'lucide-react'
import { education, experience } from '@/lib/data'
import ScrollStack, { ScrollStackItem } from '../shared/ScrollStack'

const timeline = [
  ...experience.map((item) => ({ ...item, icon: BriefcaseBusiness })),
  ...education.map((item) => ({ period: item.period, title: item.qualification, organisation: item.institution, description: `${item.subject} · ${item.location}`, tags: ['Education', 'Computer Science'], icon: GraduationCap })),
]

export default function ExperienceSection() {
  return (
    <section id="education" className="soft-mesh relative overflow-hidden px-4 py-24 sm:px-6 sm:py-32">
      <div className="relative mx-auto max-w-6xl">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="mb-16 text-center sm:mb-24">
          <span className="section-kicker border border-[#4caf50]/15 bg-[#4caf50]/10 text-[#388e3c]">Academic journey</span>
          <h2 className="mt-6 font-display text-5xl leading-[.9] tracking-[-.05em] text-[#171717] sm:text-7xl">Education <span className="text-[#49b34e]">&amp;</span> focus</h2>
        </motion.div>

        {/* Mobile view - ScrollStack animation */}
        <div className="md:hidden">
          <ScrollStack
            className="education-scroll-stack"
            itemDistance={100}
            itemScale={0.03}
            itemStackDistance={30}
            stackPosition="20%"
            scaleEndPosition="10%"
            baseScale={0.85}
            rotationAmount={0}
            blurAmount={0}
            useWindowScroll={true}
          >
            {timeline.map((entry) => {
              const Icon = entry.icon
              return (
                <ScrollStackItem key={`${entry.title}-${entry.period}`} itemClassName="education-stack-item">
                  <div className="flex items-start justify-between gap-3 mb-4">
                    <span className="inline-flex rounded-lg bg-[#49b34e] px-3 py-1.5 text-[10px] font-black uppercase tracking-[0.18em] text-white shadow-lg shadow-[#49b34e]/20">
                      {entry.period}
                    </span>
                    <span className="grid size-9 place-items-center rounded-xl border border-[#49b34e]/15 bg-[#4caf50]/10 text-[#388e3c] shadow-sm shrink-0">
                      <Icon size={16} />
                    </span>
                  </div>

                  <h3 className="text-lg font-black tracking-[-.045em] text-[#1c1c1c]">{entry.title}</h3>
                  <p className="mt-2 font-bold text-[#359640] text-sm">{entry.organisation}</p>
                  <p className="mt-3 text-xs font-medium leading-relaxed text-[#526473]">{entry.description}</p>

                  <div className="mt-4 flex flex-wrap gap-2">
                    {entry.tags.map((tag) => (
                      <span key={tag} className="rounded-full bg-[#4caf50]/10 px-2 py-1 text-[9px] font-bold text-[#388e3c]">
                        {tag}
                      </span>
                    ))}
                  </div>
                </ScrollStackItem>
              )
            })}
          </ScrollStack>
        </div>

        {/* Desktop view - alternating timeline layout */}
        <div className="relative mx-auto hidden max-w-5xl md:block">
          <div aria-hidden="true" className="absolute bottom-12 left-1/2 top-2 hidden w-px -translate-x-1/2 bg-[#4caf50]/25 md:block" />
          <div className="space-y-12 md:space-y-20">
            {timeline.map((entry, index) => {
              const Icon = entry.icon
              const onLeft = index % 2 === 0
              return <motion.article key={`${entry.title}-${entry.period}`} initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: '-60px' }} transition={{ duration: .55 }} className="relative grid items-center gap-5 md:grid-cols-[1fr_72px_1fr]">
                <div className={onLeft ? 'md:col-start-1' : 'md:col-start-3'}>
                  <div className="rounded-[1.65rem] border border-white bg-white/70 p-7 shadow-[0_20px_45px_rgba(21,45,38,.06)] backdrop-blur sm:p-9">
                    <span className="inline-flex rounded-xl bg-[#49b34e] px-4 py-2 text-[11px] font-black text-white shadow-lg shadow-[#49b34e]/20">{entry.period}</span>
                    <h3 className="mt-6 text-2xl font-black tracking-[-.045em] text-[#1c1c1c] sm:text-3xl">{entry.title}</h3>
                    <p className="mt-3 font-bold text-[#359640]">{entry.organisation}</p>
                    <p className="mt-5 text-sm font-medium leading-relaxed text-[#526473]">{entry.description}</p>
                    <div className="mt-5 flex flex-wrap gap-2">{entry.tags.map((tag) => <span className="rounded-full bg-[#4caf50]/10 px-3 py-1 text-[10px] font-bold text-[#388e3c]" key={tag}>{tag}</span>)}</div>
                  </div>
                </div>
                <div className="relative hidden place-items-center md:col-start-2 md:grid"><span className="grid size-14 place-items-center rounded-2xl border border-white bg-white text-[#388e3c] shadow-lg shadow-[#388e3c]/10"><Icon size={22} /></span></div>
              </motion.article>
            })}
          </div>
        </div>

        <div className="mx-auto mt-16 flex max-w-xl items-center justify-center gap-3 rounded-2xl border border-[#4caf50]/15 bg-white/55 p-4 text-center text-sm font-semibold text-[#526473]"><BookOpen size={18} className="shrink-0 text-[#388e3c]" /> Always learning through hands-on projects and focused study.</div>
      </div>
    </section>
  )
}













