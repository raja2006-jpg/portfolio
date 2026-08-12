import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowLeft, Github, MapPin } from 'lucide-react'
import { education, experience, personal, projects, skills } from '@/lib/data'

export const metadata: Metadata = { title: `Resume | ${personal.name}`, description: `Resume snapshot for ${personal.name}.` }

export default function ResumePage() {
  return (
    <main className="min-h-screen bg-[#f5f4ef] px-5 py-8 text-[#202033] sm:px-10 sm:py-12 print:p-0">
      <article className="mx-auto max-w-4xl rounded-[2rem] bg-white p-7 shadow-2xl shadow-[#202033]/10 sm:p-12 print:max-w-none print:rounded-none print:shadow-none">
        <Link href="/" className="mb-10 inline-flex items-center gap-2 text-xs font-black text-violet-700 print:hidden"><ArrowLeft size={14} /> Back to portfolio</Link>
        <header className="border-b border-[#202033]/10 pb-8"><p className="text-[11px] font-black uppercase tracking-[.2em] text-violet-700">Resume snapshot</p><h1 className="mt-2 font-display text-5xl tracking-[-.04em] sm:text-7xl">{personal.name}</h1><p className="mt-3 text-lg font-semibold text-[#616170]">{personal.role}</p><div className="mt-5 flex flex-wrap gap-x-5 gap-y-2 text-sm text-[#616170]"><span className="inline-flex items-center gap-1.5"><MapPin size={14} /> {personal.location}</span><a className="inline-flex items-center gap-1.5 hover:text-violet-700" href="https://github.com/raja2006-jpg"><Github size={14} /> github.com/raja2006-jpg</a></div></header>
        <section className="mt-9"><h2 className="text-xs font-black uppercase tracking-[.18em] text-violet-700">Profile</h2><p className="mt-3 max-w-3xl text-sm leading-relaxed text-[#555564]">{personal.bio} {personal.bioLong.join(' ')}</p></section>
        <section className="mt-9"><h2 className="text-xs font-black uppercase tracking-[.18em] text-violet-700">Experience</h2><div className="mt-4 space-y-5">{experience.map((item) => <article key={item.title}><p className="text-xs font-bold text-[#747482]">{item.period}</p><h3 className="mt-1 font-bold">{item.title} · <span className="font-medium text-[#616170]">{item.organisation}</span></h3><p className="mt-1 text-sm leading-relaxed text-[#555564]">{item.description}</p></article>)}</div></section>
        <section className="mt-9"><h2 className="text-xs font-black uppercase tracking-[.18em] text-violet-700">Education</h2>{education.map((item) => <article key={item.institution} className="mt-4"><p className="text-xs font-bold text-[#747482]">{item.period}</p><h3 className="mt-1 font-bold">{item.qualification} · <span className="font-medium text-[#616170]">{item.subject}</span></h3><p className="mt-1 text-sm text-[#555564]">{item.institution}, {item.location}</p></article>)}</section>
        <section className="mt-9"><h2 className="text-xs font-black uppercase tracking-[.18em] text-violet-700">Selected projects</h2><div className="mt-4 grid gap-4 sm:grid-cols-2">{projects.map((project) => <article key={project.id}><h3 className="font-bold">{project.name}</h3><p className="mt-1 text-sm leading-relaxed text-[#555564]">{project.description}</p></article>)}</div></section>
        <section className="mt-9"><h2 className="text-xs font-black uppercase tracking-[.18em] text-violet-700">Skills</h2><p className="mt-3 text-sm leading-relaxed text-[#555564]">{skills.join(' · ')}</p></section>
      </article>
    </main>
  )
}
