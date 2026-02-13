import { Navbar } from "@/components/navbar"
import { HeroSection } from "@/components/hero-section"
import { AboutSection } from "@/components/about-section"
import { DestinationsSection } from "@/components/destinations-section"
import { ExperienceSection } from "@/components/experience-section"
import { Footer } from "@/components/footer"
import { ChatbotWidget } from "@/components/chatbot-widget"

export default function HomePage() {
  return (
    <main className="min-h-screen">
      <Navbar />
      <HeroSection />
      <AboutSection />
      <DestinationsSection />
      <ExperienceSection />
      <Footer />
      <ChatbotWidget />
    </main>
  )
}
