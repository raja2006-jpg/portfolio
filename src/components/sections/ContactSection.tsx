'use client'

import { FormEvent, useState } from 'react'
import { motion } from 'framer-motion'
import { Github, MapPin, Send, Sparkles } from 'lucide-react'
import { personal, social } from '@/lib/data'

export default function ContactSection() {
  const [sent, setSent] = useState(false)
  const submit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setSent(true)
  }

  return (
    <section id="contact" className="surface-light relative overflow-hidden px-6 py-20 sm:py-24 lg:py-28">
      <div aria-hidden="true" className="absolute inset-0 pointer-events-none"><div className="absolute -left-[5%] -top-[10%] size-[40vw] rounded-full bg-[#e0f2f1] blur-[120px]" /><div className="absolute -bottom-[10%] -right-[5%] size-[40vw] rounded-full bg-[#c8e6c9] blur-[120px]" /></div>
      <div className="relative mx-auto max-w-7xl">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="mb-12 text-center sm:mb-16">
          <span className="section-kicker border border-[#4caf50]/15 bg-[#4caf50]/10 text-[#388e3c]">Get in touch</span>
          <h2 className="mt-5 font-display text-5xl leading-[.9] tracking-[-.04em] text-[#1a1a1a] sm:text-7xl">Let&apos;s <span className="text-[#4caf50]">connect.</span></h2>
          <p className="mx-auto mt-4 max-w-2xl text-sm font-medium text-[#546e7a] sm:text-base">Have a project, an opportunity, or an idea worth discussing? Send a note and continue the conversation on GitHub.</p>
        </motion.div>
        <div className="grid gap-6 lg:grid-cols-2 lg:gap-8">
          <motion.aside initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} className="rounded-3xl border border-white/80 bg-white/60 p-7 shadow-xl shadow-black/[.03] backdrop-blur sm:p-10">
            <h3 className="text-2xl font-black tracking-tight text-[#1a1a1a]">Contact Raja</h3>
            <p className="mt-3 max-w-md text-sm leading-relaxed text-[#546e7a]">The best current way to reach out is through Raja&apos;s public GitHub profile.</p>
            <a href={social.github} target="_blank" rel="noreferrer" className="mt-7 flex items-center gap-4 rounded-2xl border border-black/5 bg-[#f0f4f3] p-4 transition hover:-translate-y-0.5 hover:border-[#4caf50]/20"><span className="grid size-10 place-items-center rounded-xl bg-[#4caf50]/10 text-[#388e3c]"><Github size={19} /></span><span><span className="block text-[10px] font-black uppercase tracking-[.15em] text-[#546e7a]">GitHub</span><span className="mt-1 block text-sm font-bold text-[#1a1a1a]">@raja2006-jpg</span></span></a>
            <div className="mt-4 flex items-center gap-4 rounded-2xl border border-black/5 bg-[#f0f4f3] p-4"><span className="grid size-10 place-items-center rounded-xl bg-[#4caf50]/10 text-[#388e3c]"><MapPin size={19} /></span><span><span className="block text-[10px] font-black uppercase tracking-[.15em] text-[#546e7a]">Location</span><span className="mt-1 block text-sm font-bold text-[#1a1a1a]">{personal.location}</span></span></div>
            <div className="mt-7 flex items-center gap-2 text-xs font-semibold text-[#546e7a]"><Sparkles size={14} className="text-[#4caf50]" /> Open to thoughtful collaboration.</div>
          </motion.aside>
          <motion.form initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} onSubmit={submit} className="rounded-3xl border border-white/80 bg-white/60 p-7 shadow-xl shadow-black/[.03] backdrop-blur sm:p-10">
            <label className="block text-[11px] font-black uppercase tracking-[.14em] text-[#37474f]" htmlFor="name">Name</label><input id="name" required placeholder="Your name" className="mt-2 w-full rounded-xl border border-black/10 bg-white px-4 py-3 text-sm text-[#1a1a1a] outline-none transition placeholder:text-zinc-400 focus:border-[#4caf50]" />
            <label className="mt-5 block text-[11px] font-black uppercase tracking-[.14em] text-[#37474f]" htmlFor="email">Email address</label><input id="email" type="email" required placeholder="you@example.com" className="mt-2 w-full rounded-xl border border-black/10 bg-white px-4 py-3 text-sm text-[#1a1a1a] outline-none transition placeholder:text-zinc-400 focus:border-[#4caf50]" />
            <label className="mt-5 block text-[11px] font-black uppercase tracking-[.14em] text-[#37474f]" htmlFor="message">Message</label><textarea id="message" required rows={4} placeholder="Tell me a little about your idea..." className="mt-2 w-full resize-none rounded-xl border border-black/10 bg-white px-4 py-3 text-sm text-[#1a1a1a] outline-none transition placeholder:text-zinc-400 focus:border-[#4caf50]" />
            <button className="mt-6 inline-flex items-center gap-2 rounded-xl bg-[#388e3c] px-5 py-3 text-sm font-black text-white shadow-lg shadow-[#388e3c]/15 transition hover:bg-[#2e7d32]" type="submit"><Send size={15} /> Send message</button>
            {sent && <p role="status" className="mt-4 text-sm font-bold text-[#388e3c]">Thanks—your note is ready. Please continue via GitHub while a contact endpoint is configured.</p>}
          </motion.form>
        </div>
      </div>
    </section>
  )
}
