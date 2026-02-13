"use client"

import { useEffect, useRef, useState } from "react"
import Image from "next/image"
import { Calendar, MapPin, Clock, Star } from "lucide-react"

interface Destination {
  id: string
  title: string
  subtitle: string
  era: string
  image: string
  duration: string
  rating: string
  description: string
  highlights: string[]
  gradient: string
}

const destinations: Destination[] = [
  {
    id: "paris-1889",
    title: "Paris, 1889",
    subtitle: "L'Exposition Universelle",
    era: "Belle Epoque",
    image: "/images/paris-1889.jpg",
    duration: "3 - 7 jours",
    rating: "4.9",
    description:
      "Assistez a la construction de la Tour Eiffel et a l'inauguration de l'Exposition Universelle. Decouvrez le Grand Palais, la mode vestimentaire de l'epoque et l'ambiance lumineuse du Paris fin de siecle.",
    highlights: [
      "Tour Eiffel en construction",
      "Grand Palais & architecture emblematique",
      "Mode vestimentaire Belle Epoque",
      "Eclairage au gaz & atmosphere unique",
    ],
    gradient: "from-amber-950/90 via-amber-900/50",
  },
  {
    id: "cretaceous",
    title: "Cretace Superieur",
    subtitle: "-68 millions d'annees",
    era: "Mesozoique",
    image: "/images/cretaceous.jpg",
    duration: "1 - 3 jours",
    rating: "5.0",
    description:
      "Observez les especes de dinosaures les plus impressionnantes dans leur habitat naturel. Vegetation prehistorique luxuriante, conditions climatiques tropicales et experience scientifique immersive.",
    highlights: [
      "T-Rex & Triceratops in situ",
      "Vegetation prehistorique geante",
      "Climat tropical & volcans actifs",
      "Capsule d'observation blindee",
    ],
    gradient: "from-emerald-950/90 via-emerald-900/50",
  },
  {
    id: "florence-renaissance",
    title: "Florence, 1504",
    subtitle: "L'Apogee de la Renaissance",
    era: "Renaissance",
    image: "/images/florence-renaissance.jpg",
    duration: "5 - 10 jours",
    rating: "4.8",
    description:
      "Explorez la Florence des Medicis ou Michel-Ange et Botticelli creent leurs chefs-d'oeuvre. Architecture florentine, costumes d'epoque et palette de couleurs ocres, terres et bleus.",
    highlights: [
      "Atelier de Michel-Ange",
      "Duomo de Brunelleschi",
      "Galerie des Offices en creation",
      "Banquets chez les Medicis",
    ],
    gradient: "from-orange-950/90 via-orange-900/50",
  },
]

function DestinationCard({
  destination,
  index,
}: {
  destination: Destination
  index: number
}) {
  const [isVisible, setIsVisible] = useState(false)
  const [isHovered, setIsHovered] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTimeout(() => setIsVisible(true), index * 200)
        }
      },
      { threshold: 0.15 }
    )
    if (ref.current) observer.observe(ref.current)
    return () => observer.disconnect()
  }, [index])

  return (
    <div
      ref={ref}
      className={`group relative overflow-hidden rounded-2xl border border-border/50 bg-card transition-all duration-700 hover:border-primary/30 ${
        isVisible ? "translate-y-0 opacity-100" : "translate-y-12 opacity-0"
      }`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="relative h-72 overflow-hidden sm:h-80">
        <Image
          src={destination.image}
          alt={`${destination.title} - ${destination.subtitle}`}
          fill
          className={`object-cover transition-transform duration-700 ${
            isHovered ? "scale-110" : "scale-100"
          }`}
        />
        <div
          className={`absolute inset-0 bg-gradient-to-t ${destination.gradient} to-transparent`}
        />

        <div className="absolute top-4 left-4">
          <span className="rounded-full border border-foreground/20 bg-background/20 px-3 py-1.5 text-[10px] tracking-[0.2em] text-foreground uppercase backdrop-blur-md">
            {destination.era}
          </span>
        </div>

        <div className="absolute right-4 bottom-4 flex items-center gap-1.5 rounded-full bg-background/20 px-3 py-1.5 backdrop-blur-md">
          <Star className="h-3 w-3 fill-primary text-primary" />
          <span className="text-xs font-medium text-foreground">
            {destination.rating}
          </span>
        </div>
      </div>

      <div className="p-6 lg:p-7">
        <div className="mb-3">
          <h3 className="font-serif text-2xl text-foreground">
            {destination.title}
          </h3>
          <p className="mt-1 text-sm text-primary">{destination.subtitle}</p>
        </div>

        <p className="mb-5 text-sm leading-relaxed text-muted-foreground">
          {destination.description}
        </p>

        <div className="mb-5 flex flex-wrap gap-4 text-[11px] text-muted-foreground">
          <div className="flex items-center gap-1.5">
            <Clock className="h-3.5 w-3.5 text-primary/60" />
            <span>{destination.duration}</span>
          </div>
          <div className="flex items-center gap-1.5">
            <MapPin className="h-3.5 w-3.5 text-primary/60" />
            <span>{destination.title.split(",")[0]}</span>
          </div>
          <div className="flex items-center gap-1.5">
            <Calendar className="h-3.5 w-3.5 text-primary/60" />
            <span>{destination.era}</span>
          </div>
        </div>

        <div className="mb-6 space-y-2.5">
          {destination.highlights.map((highlight) => (
            <div key={highlight} className="flex items-center gap-3 text-sm">
              <div className="h-1 w-1 shrink-0 rounded-full bg-primary/70" />
              <span className="text-muted-foreground">{highlight}</span>
            </div>
          ))}
        </div>

        <button className="w-full rounded-full border border-primary/30 bg-primary/5 py-3.5 text-[11px] tracking-[0.15em] text-primary uppercase transition-all duration-300 hover:border-primary hover:bg-primary/10">
          Reserver cette experience
        </button>
      </div>
    </div>
  )
}

export function DestinationsSection() {
  return (
    <section id="destinations" className="relative py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mb-20 text-center">
          <p className="mb-4 text-[10px] tracking-[0.5em] text-primary uppercase">
            Destinations exclusives
          </p>
          <h2 className="font-serif text-4xl tracking-tight text-foreground md:text-5xl lg:text-6xl">
            <span className="text-balance">Choisissez votre epoque</span>
          </h2>
          <p className="mx-auto mt-6 max-w-2xl text-base leading-relaxed text-muted-foreground">
            {
              "Chaque voyage est une experience sur mesure, concue pour les explorateurs les plus exigeants. Nos capsules temporelles de luxe vous transportent en toute securite."
            }
          </p>
        </div>

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {destinations.map((dest, i) => (
            <DestinationCard key={dest.id} destination={dest} index={i} />
          ))}
        </div>
      </div>
    </section>
  )
}
