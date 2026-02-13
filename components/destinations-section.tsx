"use client"

import { useEffect, useRef, useState } from "react"
import Image from "next/image"
import { Clock, Star, ArrowRight } from "lucide-react"

interface Destination {
  id: string
  title: string
  subtitle: string
  era: string
  year: string
  image: string
  duration: string
  rating: string
  narrative: string
  atmosphere: string
  highlights: { label: string; detail: string }[]
  eraClass: string
  accentFrom: string
  accentVia: string
  accentBorder: string
  accentText: string
  accentGlow: string
  accentBg: string
}

const destinations: Destination[] = [
  {
    id: "paris-1889",
    title: "Paris, 1889",
    subtitle: "L'Exposition Universelle",
    era: "Belle Epoque",
    year: "1889",
    image: "/images/paris-1889.jpg",
    duration: "3 - 7 jours",
    rating: "4.9",
    narrative:
      "Le fer et l'acier s'elevent vers le ciel parisien. Gustave Eiffel defie la gravite et les critiques tandis que la Ville Lumiere accueille le monde entier. Les boulevards grouillent de fiacres, les cafes debordent de conversations passionnees, et la nuit, les nouveaux lampadaires electriques transforment Paris en un reve dore. Vous etes la, au coeur du progres, temoin de la naissance d'une icone eternelle.",
    atmosphere:
      "Lumiere doree du gaz et de l'electricite naissante, brume matinale sur la Seine, effervescence des Grands Boulevards",
    highlights: [
      { label: "Tour Eiffel en construction", detail: "Observez les derniers rivets poses sur la dame de fer, a 300 metres du sol" },
      { label: "Grand Palais & Beaux-Arts", detail: "Decouvrez l'architecture de verre et d'acier qui revolutionne l'exposition" },
      { label: "Mode Belle Epoque", detail: "Robes a tournure, hauts-de-forme et promenades aux Tuileries" },
      { label: "Gastronomie parisienne", detail: "Dinez chez Maxim's avant meme son ouverture officielle" },
    ],
    eraClass: "era-paris",
    accentFrom: "from-amber-500/10",
    accentVia: "via-amber-600/5",
    accentBorder: "border-amber-500/20",
    accentText: "text-amber-400",
    accentGlow: "bg-amber-500/10",
    accentBg: "bg-amber-500",
  },
  {
    id: "cretaceous",
    title: "Cretace Superieur",
    subtitle: "-68 millions d'annees",
    era: "Mesozoique",
    year: "-68M",
    image: "/images/cretaceous.jpg",
    duration: "1 - 3 jours",
    rating: "5.0",
    narrative:
      "Le sol tremble sous vos pieds. A travers le hublot blinde de votre capsule d'observation, la canopee prehistorique s'etend a l'infini -- fougeres arborescentes, cycas immenses et coniferes colossaux. Un Tyrannosaurus rex emerge de la brume volcanique, sa silhouette decoupee contre un ciel d'un orange surnaturel. L'air est chaud, humide, charge d'une energie primordiale. Bienvenue au dernier age des geants.",
    atmosphere:
      "Brume volcanique permanente, chaleur tropicale intense, ciel cuivre par les eruptions lointaines, vegetation d'un vert profond",
    highlights: [
      { label: "T-Rex & Triceratops in situ", detail: "Observation depuis une capsule blindee anti-impact de classe Chronos-7" },
      { label: "Flore prehistorique geante", detail: "Fougeres de 15 metres, sequoias primitifs et plaines de preles ancestrales" },
      { label: "Volcans actifs & geysers", detail: "Survolez les chaines volcaniques en aero-capsule thermique securisee" },
      { label: "Protocole scientifique", detail: "Prelevements holographiques et analyses paleontologiques en temps reel" },
    ],
    eraClass: "era-cretaceous",
    accentFrom: "from-emerald-500/10",
    accentVia: "via-emerald-600/5",
    accentBorder: "border-emerald-500/20",
    accentText: "text-emerald-400",
    accentGlow: "bg-emerald-500/10",
    accentBg: "bg-emerald-500",
  },
  {
    id: "florence-renaissance",
    title: "Florence, 1504",
    subtitle: "L'Apogee de la Renaissance",
    era: "Renaissance",
    year: "1504",
    image: "/images/florence-renaissance.jpg",
    duration: "5 - 10 jours",
    rating: "4.8",
    narrative:
      "Les cloches du Duomo resonnent dans l'air toscan tandis que Michel-Ange donne les derniers coups de ciseau a son David. Dans les ruelles pavees de Florence, l'odeur du pigment frais se mele a celle du cuir et des epices. Lorenzo de Medicis a fait de cette cite le berceau du monde moderne. Chaque palais cache un atelier, chaque place raconte une revolution. Ici, l'art et le genie humain n'ont jamais brille aussi fort.",
    atmosphere:
      "Lumiere doree de Toscane, palette d'ocres et de terres brulees, bleu Medicis profond, chaleur de la pierre au soleil",
    highlights: [
      { label: "Atelier de Michel-Ange", detail: "Assistez a la finalisation du David dans l'intimite de son bottega" },
      { label: "Duomo de Brunelleschi", detail: "Montez dans le dome le plus audacieux de l'histoire de l'architecture" },
      { label: "Galerie des Offices", detail: "Contemplez La Naissance de Venus avant qu'elle ne soit exposee au public" },
      { label: "Banquet chez les Medicis", detail: "Table d'honneur au Palazzo, vins toscans et conversations avec les humanistes" },
    ],
    eraClass: "era-florence",
    accentFrom: "from-orange-500/10",
    accentVia: "via-orange-600/5",
    accentBorder: "border-orange-500/20",
    accentText: "text-orange-400",
    accentGlow: "bg-orange-500/10",
    accentBg: "bg-orange-500",
  },
]

function TimelineNode({ isVisible, destination }: { isVisible: boolean; destination: Destination }) {
  return (
    <div className="relative flex flex-col items-center">
      {/* Outer pulse ring */}
      <div
        className={`absolute h-6 w-6 rounded-full ${destination.accentBg} opacity-0 transition-all duration-1000 ${
          isVisible ? "opacity-20" : ""
        }`}
        style={{ animation: isVisible ? "timeline-pulse 2.5s ease-out infinite" : "none" }}
      />
      {/* Main node */}
      <div
        className={`relative z-10 h-4 w-4 rounded-full border-2 ${destination.accentBorder} bg-background transition-all duration-700 ${
          isVisible ? "scale-100" : "scale-0"
        }`}
      >
        <div className={`absolute inset-1 rounded-full ${destination.accentBg} transition-opacity duration-500 ${isVisible ? "opacity-100" : "opacity-0"}`} />
      </div>
      {/* Year label */}
      <div
        className={`mt-3 text-[10px] font-medium tracking-[0.3em] uppercase transition-all duration-700 delay-200 ${destination.accentText} ${
          isVisible ? "translate-y-0 opacity-100" : "translate-y-2 opacity-0"
        }`}
      >
        {destination.year}
      </div>
    </div>
  )
}

function DestinationCard({ destination, index }: { destination: Destination; index: number }) {
  const [isVisible, setIsVisible] = useState(false)
  const [isHovered, setIsHovered] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTimeout(() => setIsVisible(true), 150)
        }
      },
      { threshold: 0.12 }
    )
    if (ref.current) observer.observe(ref.current)
    return () => observer.disconnect()
  }, [])

  const isEven = index % 2 === 0

  return (
    <div ref={ref} className="relative">
      {/* Mobile + Desktop layout */}
      <div className={`flex flex-col items-center gap-8 lg:flex-row lg:gap-16 ${isEven ? "" : "lg:flex-row-reverse"}`}>

        {/* Timeline node (hidden on mobile, visible desktop) */}
        <div className="hidden shrink-0 lg:flex lg:flex-col lg:items-center" style={{ width: 80 }}>
          <TimelineNode isVisible={isVisible} destination={destination} />
        </div>

        {/* Image side */}
        <div
          className={`w-full transition-all duration-1000 lg:w-1/2 ${
            isVisible
              ? "translate-x-0 opacity-100"
              : isEven
              ? "-translate-x-16 opacity-0"
              : "translate-x-16 opacity-0"
          }`}
          style={{ transitionDelay: "200ms" }}
        >
          <div
            className={`group relative overflow-hidden rounded-2xl border ${destination.accentBorder} ${destination.eraClass}`}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
          >
            {/* Atmospheric glow */}
            <div className={`absolute -inset-1 rounded-2xl ${destination.accentGlow} blur-xl opacity-0 transition-opacity duration-700 ${isHovered ? "opacity-100" : ""}`} />

            <div className="relative aspect-[4/3] overflow-hidden">
              <Image
                src={destination.image}
                alt={`${destination.title} - ${destination.subtitle}`}
                fill
                className={`object-cover transition-all duration-1000 ${isHovered ? "scale-105 brightness-110" : "scale-100"}`}
              />

              {/* Era atmospheric gradient overlay */}
              <div className={`absolute inset-0 bg-gradient-to-t ${destination.accentFrom} ${destination.accentVia} to-transparent`} />
              <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-transparent to-transparent" />

              {/* Top badges */}
              <div className="absolute top-4 right-4 left-4 flex items-start justify-between">
                <span className={`rounded-full border ${destination.accentBorder} bg-background/30 px-3 py-1.5 text-[10px] tracking-[0.2em] text-foreground uppercase backdrop-blur-md`}>
                  {destination.era}
                </span>
                <div className="flex items-center gap-1.5 rounded-full bg-background/30 px-3 py-1.5 backdrop-blur-md">
                  <Star className={`h-3 w-3 fill-current ${destination.accentText}`} />
                  <span className="text-xs font-medium text-foreground">{destination.rating}</span>
                </div>
              </div>

              {/* Bottom atmosphere text */}
              <div className="absolute right-4 bottom-4 left-4">
                <p className={`text-[10px] italic leading-relaxed tracking-wide ${destination.accentText} opacity-80`}>
                  {destination.atmosphere}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Content side */}
        <div
          className={`w-full transition-all duration-1000 lg:w-1/2 ${
            isVisible
              ? "translate-x-0 opacity-100"
              : isEven
              ? "translate-x-16 opacity-0"
              : "-translate-x-16 opacity-0"
          }`}
          style={{ transitionDelay: "400ms" }}
        >
          {/* Mobile timeline node */}
          <div className="mb-4 flex items-center gap-3 lg:hidden">
            <div className={`h-2.5 w-2.5 rounded-full ${destination.accentBg}`} />
            <span className={`text-[10px] tracking-[0.3em] uppercase ${destination.accentText}`}>
              {destination.year}
            </span>
            <div className={`h-px flex-1 ${destination.accentBg} opacity-20`} />
          </div>

          <div className="flex items-center gap-3">
            <Clock className={`h-3.5 w-3.5 ${destination.accentText} opacity-60`} />
            <span className="text-[11px] text-muted-foreground">{destination.duration}</span>
          </div>

          <h3 className="mt-3 font-serif text-3xl tracking-tight text-foreground md:text-4xl">
            {destination.title}
          </h3>
          <p className={`mt-1 text-sm font-medium ${destination.accentText}`}>
            {destination.subtitle}
          </p>

          {/* Narrative paragraph -- the storytelling */}
          <p className="mt-6 text-[15px] leading-[1.8] text-muted-foreground">
            {destination.narrative}
          </p>

          {/* Highlights with animated reveals */}
          <div className="mt-8 space-y-4">
            {destination.highlights.map((h, hi) => (
              <div
                key={h.label}
                className={`flex gap-4 transition-all duration-700 ${
                  isVisible
                    ? "translate-x-0 opacity-100"
                    : "translate-x-8 opacity-0"
                }`}
                style={{ transitionDelay: `${600 + hi * 150}ms` }}
              >
                <div className={`mt-2 h-1.5 w-1.5 shrink-0 rounded-full ${destination.accentBg}`} />
                <div>
                  <span className="text-sm font-medium text-foreground">{h.label}</span>
                  <p className="mt-0.5 text-[13px] leading-relaxed text-muted-foreground/70">
                    {h.detail}
                  </p>
                </div>
              </div>
            ))}
          </div>

          <button
            className={`group mt-8 flex items-center gap-3 rounded-full border ${destination.accentBorder} px-7 py-3 text-[11px] tracking-[0.15em] uppercase transition-all duration-300 ${destination.accentText} hover:${destination.accentGlow}`}
          >
            <span>Reserver cette experience</span>
            <ArrowRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-1" />
          </button>
        </div>
      </div>
    </div>
  )
}

export function DestinationsSection() {
  const [lineVisible, setLineVisible] = useState(false)
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setLineVisible(true)
      },
      { threshold: 0.05 }
    )
    if (sectionRef.current) observer.observe(sectionRef.current)
    return () => observer.disconnect()
  }, [])

  return (
    <section id="destinations" ref={sectionRef} className="relative py-32">
      {/* Section header */}
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mb-24 text-center">
          <p className="mb-4 text-[10px] tracking-[0.5em] text-primary uppercase">
            Destinations exclusives
          </p>
          <h2 className="font-serif text-4xl tracking-tight text-foreground md:text-5xl lg:text-6xl">
            <span className="text-balance">Choisissez votre epoque</span>
          </h2>
          <p className="mx-auto mt-6 max-w-2xl text-base leading-relaxed text-muted-foreground">
            {"Chaque voyage est un recit que vous ecrirez de vos propres yeux. Nos capsules temporelles de luxe vous transportent au coeur des moments qui ont faconne l'humanite."}
          </p>

          {/* Decorative timeline start */}
          <div className="mx-auto mt-12 flex flex-col items-center">
            <div className="h-2 w-2 rounded-full bg-primary" />
            <div className={`w-px bg-gradient-to-b from-primary to-transparent transition-all duration-1000 ${lineVisible ? "h-16" : "h-0"}`} />
          </div>
        </div>

        {/* Timeline vertical line (desktop only) */}
        <div className="relative">
          {/* Central line */}
          <div className="absolute top-0 bottom-0 left-1/2 hidden -translate-x-px lg:block" aria-hidden="true">
            <div
              className={`w-px bg-gradient-to-b from-primary/40 via-primary/20 to-primary/40 transition-all duration-[2s] ease-out ${
                lineVisible ? "h-full" : "h-0"
              }`}
            />
          </div>

          {/* Destination cards */}
          <div className="flex flex-col gap-32 lg:gap-40">
            {destinations.map((dest, i) => (
              <DestinationCard key={dest.id} destination={dest} index={i} />
            ))}
          </div>

          {/* Timeline end */}
          <div className="mx-auto mt-16 flex flex-col items-center">
            <div className={`w-px bg-gradient-to-b from-transparent to-primary transition-all duration-1000 ${lineVisible ? "h-16" : "h-0"}`} />
            <div className="relative">
              <div className="h-3 w-3 rounded-full border border-primary/50 bg-background" />
              <div className="absolute inset-0 animate-pulse-ring rounded-full bg-primary/30" />
            </div>
            <p className="mt-4 text-[10px] tracking-[0.4em] text-muted-foreground uppercase">
              Plus de destinations bientot
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
