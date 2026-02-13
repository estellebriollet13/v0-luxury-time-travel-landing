"use client"

import { useEffect, useRef, useState } from "react"
import { Shield, Gem, Compass } from "lucide-react"

const pillars = [
  {
    icon: Shield,
    title: "Temporal Safety",
    description:
      "Every journey is meticulously calibrated by our team of chrono-engineers, ensuring absolute safety across every timeline.",
  },
  {
    icon: Gem,
    title: "Unmatched Luxury",
    description:
      "From bespoke period attire to private temporal suites, every detail is crafted for the most discerning travellers.",
  },
  {
    icon: Compass,
    title: "Expert Guides",
    description:
      "Our historians and temporal navigators accompany you through time, providing unparalleled insight into every era.",
  },
]

export function AboutSection() {
  const [isVisible, setIsVisible] = useState(false)
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setIsVisible(true)
      },
      { threshold: 0.2 }
    )
    if (sectionRef.current) observer.observe(sectionRef.current)
    return () => observer.disconnect()
  }, [])

  return (
    <section
      id="about"
      ref={sectionRef}
      className="relative border-t border-border/50 py-32"
    >
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-3xl text-center">
          <p className="text-xs uppercase tracking-[0.4em] text-primary">
            Established 2087
          </p>
          <h2
            className={`mt-4 font-serif text-4xl tracking-tight text-foreground transition-all duration-700 md:text-5xl ${
              isVisible
                ? "translate-y-0 opacity-100"
                : "translate-y-6 opacity-0"
            }`}
          >
            <span className="text-balance">
              The Art of Temporal Exploration
            </span>
          </h2>
          <p
            className={`mt-6 text-lg leading-relaxed text-muted-foreground transition-all delay-200 duration-700 ${
              isVisible
                ? "translate-y-0 opacity-100"
                : "translate-y-6 opacity-0"
            }`}
          >
            For nearly four decades, Chronos Voyages has redefined the meaning
            of luxury travel. We do not merely visit the past or peer into the
            future — we immerse you in the very fabric of time, with the grace
            and exclusivity befitting our distinguished clientele.
          </p>
        </div>

        <div className="mt-20 grid gap-12 md:grid-cols-3">
          {pillars.map((pillar, i) => (
            <div
              key={pillar.title}
              className={`group text-center transition-all duration-700 ${
                isVisible
                  ? "translate-y-0 opacity-100"
                  : "translate-y-8 opacity-0"
              }`}
              style={{ transitionDelay: `${300 + i * 150}ms` }}
            >
              <div className="mx-auto flex h-16 w-16 items-center justify-center border border-border transition-colors group-hover:border-primary">
                <pillar.icon className="h-7 w-7 text-primary" />
              </div>
              <h3 className="mt-6 font-serif text-xl text-foreground">
                {pillar.title}
              </h3>
              <p className="mt-3 leading-relaxed text-muted-foreground">
                {pillar.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
