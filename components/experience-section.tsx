"use client"

import { useEffect, useRef, useState } from "react"
import { Shield, Gem, Clock, Compass } from "lucide-react"

const features = [
  {
    icon: Shield,
    title: "Securite Absolue",
    description:
      "Nos capsules temporelles sont equipees de boucliers quantiques de derniere generation. Retour garanti a votre epoque d'origine.",
  },
  {
    icon: Gem,
    title: "Luxe Intemporel",
    description:
      "Service de conciergerie temporelle, suites privees dans chaque epoque et gastronomie locale authentique preparee par nos chefs.",
  },
  {
    icon: Clock,
    title: "Precision Temporelle",
    description:
      "Notre technologie de navigation temporelle offre une precision a la seconde pres. Choisissez l'instant exact de votre arrivee.",
  },
  {
    icon: Compass,
    title: "Guides Historiens",
    description:
      "Nos guides sont des historiens de renom, formes aux protocoles temporels. Ils vous accompagnent a chaque instant de votre voyage.",
  },
]

export function ExperienceSection() {
  const [isVisible, setIsVisible] = useState(false)
  const ref = useRef<HTMLElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setIsVisible(true)
      },
      { threshold: 0.1 }
    )
    if (ref.current) observer.observe(ref.current)
    return () => observer.disconnect()
  }, [])

  return (
    <section
      id="experience"
      ref={ref}
      className="relative border-t border-border/40 py-32"
    >
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-0 right-0 h-96 w-96 rounded-full bg-primary/3 blur-3xl" />
      </div>

      <div className="relative mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mb-20 text-center">
          <p className="mb-4 text-[10px] tracking-[0.5em] text-primary uppercase">
            {"L'Experience Chronos"}
          </p>
          <h2 className="font-serif text-4xl tracking-tight text-foreground md:text-5xl lg:text-6xl">
            <span className="text-balance">Le voyage temporel reinvente</span>
          </h2>
          <p className="mx-auto mt-6 max-w-2xl text-base leading-relaxed text-muted-foreground">
            {
              "Nous avons repense chaque aspect du voyage dans le temps pour offrir une experience digne des plus grands explorateurs."
            }
          </p>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {features.map((feature, index) => {
            const Icon = feature.icon
            return (
              <div
                key={feature.title}
                className={`group rounded-2xl border border-border/50 bg-card p-8 transition-all duration-700 hover:border-primary/30 hover:bg-card/80 ${
                  isVisible
                    ? "translate-y-0 opacity-100"
                    : "translate-y-12 opacity-0"
                }`}
                style={{ transitionDelay: `${index * 150}ms` }}
              >
                <div className="mb-6 flex h-12 w-12 items-center justify-center rounded-xl border border-primary/20 bg-primary/5 transition-colors group-hover:bg-primary/10">
                  <Icon className="h-5 w-5 text-primary" />
                </div>
                <h3 className="mb-3 font-serif text-lg text-foreground">
                  {feature.title}
                </h3>
                <p className="text-sm leading-relaxed text-muted-foreground">
                  {feature.description}
                </p>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
