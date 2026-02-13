"use client"

import { useEffect, useRef, useState } from "react"
import { Shield, Gem, Clock, Compass } from "lucide-react"

const features = [
  {
    icon: Shield,
    title: "Securite Absolue",
    description:
      "Nos capsules temporelles sont protegees par des boucliers quantiques de derniere generation. Trois systemes de secours independants garantissent votre retour -- aucun voyageur n'a jamais ete perdu dans le temps.",
    accent: "Retour garanti a 100%",
  },
  {
    icon: Gem,
    title: "Luxe Intemporel",
    description:
      "Conciergerie temporelle dediee, suites privees amenagees dans chaque epoque, et gastronomie locale authentique revisitee par nos chefs etoiles. Le raffinement voyage avec vous.",
    accent: "Service 5 etoiles chrono",
  },
  {
    icon: Clock,
    title: "Precision Temporelle",
    description:
      "Notre technologie de navigation chrono-quantique offre une precision a la nanoseconde. Choisissez l'instant exact de votre arrivee : le matin de l'inauguration, l'heure doree du coucher de soleil.",
    accent: "Precision nanoseconde",
  },
  {
    icon: Compass,
    title: "Guides Historiens",
    description:
      "Nos guides sont des historiens de renommee internationale, formes aux protocoles temporels pendant trois ans. Ils ne racontent pas l'histoire -- ils vous la font vivre de l'interieur.",
    accent: "Experts certifies Chronos",
  },
]

export function ExperienceSection() {
  const [isVisible, setIsVisible] = useState(false)
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null)
  const ref = useRef<HTMLElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setIsVisible(true)
      },
      { threshold: 0.08 }
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
      {/* Ambient background */}
      <div className="absolute inset-0 overflow-hidden" aria-hidden="true">
        <div className="absolute top-0 right-0 h-96 w-96 rounded-full bg-primary/3 blur-3xl animate-glow-breathe" />
        <div className="absolute bottom-0 left-1/4 h-64 w-64 rounded-full bg-primary/2 blur-3xl animate-glow-breathe" style={{ animationDelay: "2s" }} />
      </div>

      <div className="relative mx-auto max-w-7xl px-6 lg:px-8">
        <div
          className={`mb-20 text-center transition-all duration-1000 ${
            isVisible ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
          }`}
        >
          <p className="mb-4 text-[10px] tracking-[0.5em] text-primary uppercase">
            {"L'Experience Chronos"}
          </p>
          <h2 className="font-serif text-4xl tracking-tight text-foreground md:text-5xl lg:text-6xl">
            <span className="text-balance">Le voyage temporel reinvente</span>
          </h2>
          <p className="mx-auto mt-6 max-w-2xl text-base leading-relaxed text-muted-foreground">
            {"Nous avons repense chaque detail du voyage dans le temps. De la preparation au retour, chaque instant est orchestre pour transcender vos attentes les plus ambitieuses."}
          </p>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {features.map((feature, index) => {
            const Icon = feature.icon
            const isHovered = hoveredIndex === index
            return (
              <div
                key={feature.title}
                className={`group relative overflow-hidden rounded-2xl border border-border/50 bg-card p-8 transition-all duration-700 hover:border-primary/30 ${
                  isVisible
                    ? "translate-y-0 opacity-100"
                    : "translate-y-12 opacity-0"
                }`}
                style={{ transitionDelay: `${index * 150}ms` }}
                onMouseEnter={() => setHoveredIndex(index)}
                onMouseLeave={() => setHoveredIndex(null)}
              >
                {/* Glow effect on hover */}
                <div
                  className={`absolute -inset-px rounded-2xl bg-gradient-to-b from-primary/10 via-transparent to-transparent transition-opacity duration-500 ${
                    isHovered ? "opacity-100" : "opacity-0"
                  }`}
                />

                <div className="relative">
                  {/* Icon container with pulse */}
                  <div className="relative mb-6">
                    <div className={`flex h-12 w-12 items-center justify-center rounded-xl border border-primary/20 bg-primary/5 transition-all duration-500 ${isHovered ? "border-primary/40 bg-primary/10 scale-110" : ""}`}>
                      <Icon className={`h-5 w-5 text-primary transition-transform duration-500 ${isHovered ? "scale-110" : ""}`} />
                    </div>
                    {isHovered && (
                      <div className="absolute -inset-2 animate-pulse-ring rounded-xl bg-primary/10" />
                    )}
                  </div>

                  <h3 className="mb-3 font-serif text-lg text-foreground">
                    {feature.title}
                  </h3>
                  <p className="text-sm leading-relaxed text-muted-foreground">
                    {feature.description}
                  </p>

                  {/* Accent label */}
                  <div
                    className={`mt-5 flex items-center gap-2 transition-all duration-500 ${
                      isHovered
                        ? "translate-y-0 opacity-100"
                        : "translate-y-2 opacity-0"
                    }`}
                  >
                    <div className="h-px w-4 bg-primary/50" />
                    <span className="text-[10px] tracking-[0.2em] text-primary uppercase">
                      {feature.accent}
                    </span>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
