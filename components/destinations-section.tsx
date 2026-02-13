"use client"

import { useEffect, useRef, useState } from "react"
import Image from "next/image"
import { ArrowRight, Calendar, MapPin } from "lucide-react"

const destinations = [
  {
    title: "Imperial Rome",
    era: "27 BC",
    location: "Rome, Roman Empire",
    image: "/images/ancient-rome.jpg",
    description:
      "Walk the marble streets of the Eternal City at the height of its glory. Witness gladiatorial spectacles, feast with senators, and stand in the presence of Augustus himself.",
    price: "From 245,000 CR",
  },
  {
    title: "Renaissance Florence",
    era: "1503 AD",
    location: "Florence, Italian Republic",
    image: "/images/renaissance-florence.jpg",
    description:
      "Stroll through the workshops of da Vinci and Michelangelo. Attend a Medici banquet and experience the cultural revolution that reshaped Western civilization.",
    price: "From 198,000 CR",
  },
  {
    title: "Neo-Tokyo",
    era: "2150 AD",
    location: "Tokyo, Pacific Federation",
    image: "/images/future-tokyo.jpg",
    description:
      "Soar above a city of luminous spires and holographic gardens. Experience the zenith of human innovation in an age of wonder beyond imagination.",
    price: "From 310,000 CR",
  },
]

export function DestinationsSection() {
  const [isVisible, setIsVisible] = useState(false)
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setIsVisible(true)
      },
      { threshold: 0.1 }
    )
    if (sectionRef.current) observer.observe(sectionRef.current)
    return () => observer.disconnect()
  }, [])

  return (
    <section
      id="destinations"
      ref={sectionRef}
      className="relative border-t border-border/50 py-32"
    >
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="flex flex-col items-start justify-between gap-6 md:flex-row md:items-end">
          <div>
            <p className="text-xs uppercase tracking-[0.4em] text-primary">
              Curated Experiences
            </p>
            <h2
              className={`mt-4 font-serif text-4xl tracking-tight text-foreground transition-all duration-700 md:text-5xl ${
                isVisible
                  ? "translate-y-0 opacity-100"
                  : "translate-y-6 opacity-0"
              }`}
            >
              Featured Destinations
            </h2>
          </div>
          <a
            href="#contact"
            className="group flex items-center gap-2 text-sm uppercase tracking-[0.2em] text-primary transition-colors hover:text-foreground"
          >
            View all eras
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          </a>
        </div>

        <div className="mt-16 grid gap-8 md:grid-cols-3">
          {destinations.map((dest, i) => (
            <article
              key={dest.title}
              className={`group cursor-pointer border border-border bg-card transition-all duration-700 hover:border-primary/50 ${
                isVisible
                  ? "translate-y-0 opacity-100"
                  : "translate-y-10 opacity-0"
              }`}
              style={{ transitionDelay: `${200 + i * 150}ms` }}
            >
              <div className="relative aspect-[4/3] overflow-hidden">
                <Image
                  src={dest.image}
                  alt={`${dest.title} - ${dest.era}`}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-background/20 transition-opacity group-hover:opacity-0" />
                <span className="absolute right-4 top-4 border border-foreground/30 bg-background/70 px-3 py-1 text-xs uppercase tracking-[0.15em] text-foreground backdrop-blur-sm">
                  {dest.era}
                </span>
              </div>

              <div className="p-6">
                <h3 className="font-serif text-2xl text-foreground">
                  {dest.title}
                </h3>
                <div className="mt-3 flex items-center gap-4 text-xs text-muted-foreground">
                  <span className="flex items-center gap-1.5">
                    <MapPin className="h-3.5 w-3.5" />
                    {dest.location}
                  </span>
                  <span className="flex items-center gap-1.5">
                    <Calendar className="h-3.5 w-3.5" />
                    {dest.era}
                  </span>
                </div>
                <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
                  {dest.description}
                </p>
                <div className="mt-6 flex items-center justify-between border-t border-border pt-4">
                  <span className="text-sm font-medium text-primary">
                    {dest.price}
                  </span>
                  <span className="flex items-center gap-1.5 text-xs uppercase tracking-[0.15em] text-muted-foreground transition-colors group-hover:text-primary">
                    Discover
                    <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
                  </span>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
