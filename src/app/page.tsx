import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import HeroSection from '@/components/sections/HeroSection'
import SkillsRope from '@/components/sections/SkillsRope'
import AboutSection from '@/components/sections/AboutSection'
import ProjectsSection from '@/components/sections/ProjectsSection'
import ExperienceSection from '@/components/sections/ExperienceSection'
import ContactSection from '@/components/sections/ContactSection'

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
