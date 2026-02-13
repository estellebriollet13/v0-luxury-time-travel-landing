import { Navbar } from "@/components/navbar"
import { HeroSection } from "@/components/hero-section"
import { DestinationsSection } from "@/components/destinations-section"
import { ExperienceSection } from "@/components/experience-section"
import { AboutSection } from "@/components/about-section"
import { Footer } from "@/components/footer"
import { ChatbotWidget } from "@/components/chatbot-widget"

export default function HomePage() {
  return (
    <main className="min-h-screen">
      <Navbar />
      <HeroSection />
      <DestinationsSection />
      <ExperienceSection />
      <AboutSection />
      <Footer />
      <ChatbotWidget />
    </main>
  )
}
