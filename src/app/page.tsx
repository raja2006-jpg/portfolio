import dynamic from 'next/dynamic'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import HeroSection from '@/components/sections/HeroSection'
import SkillsRope from '@/components/sections/SkillsRope'

// Lazy-load below-fold sections so they don't block the initial render
const ProjectsSection = dynamic(() => import('@/components/sections/ProjectsSection'), { ssr: true })
const ExperienceSection = dynamic(() => import('@/components/sections/ExperienceSection'), { ssr: true })
const AboutSection = dynamic(() => import('@/components/sections/AboutSection'), { ssr: true })
const ContactSection = dynamic(() => import('@/components/sections/ContactSection'), { ssr: true })

export default function Home() {
  return (
    <div className="min-h-screen overflow-clip bg-black">
      <Navbar />
      <main>
        <HeroSection />
        <SkillsRope />
        <ProjectsSection />
        <ExperienceSection />
        <AboutSection />
        <ContactSection />
      </main>
      <Footer />
    </div>
  )
}
