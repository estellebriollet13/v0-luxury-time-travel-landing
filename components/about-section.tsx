"use client"

import { useEffect, useRef, useState } from "react"

export function AboutSection() {
  const [isVisible, setIsVisible] = useState(false)
  const [visibleCommitments, setVisibleCommitments] = useState<number[]>([])
  const ref = useRef<HTMLElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setIsVisible(true)
      },
      { threshold: 0.12 }
    )
    if (ref.current) observer.observe(ref.current)
    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    if (!isVisible) return
    const timers = [0, 1, 2].map((i) =>
      setTimeout(() => setVisibleCommitments((prev) => [...prev, i]), 800 + i * 300)
    )
    return () => timers.forEach(clearTimeout)
  }, [isVisible])

  const commitments = [
    {
      number: "01",
      title: "Paradoxe Zero",
      text: "Notre protocole de non-interference est le plus strict de l'industrie. Vous observez l'histoire sans jamais l'alterer -- un privilege rare, une responsabilite que nous prenons au serieux.",
    },
    {
      number: "02",
      title: "Immersion Totale",
      text: "Costumes d'epoque confectionnes sur mesure, monnaie locale frappee a l'identique, et un briefing historique complet par nos academiciens avant chaque depart.",
    },
    {
      number: "03",
      title: "Retour Garanti",
      text: "Triple systeme de securite quantique avec balise de rappel biometrique. En quinze ans d'operation, zero incident. Votre present vous attend toujours.",
    },
  ]

  return (
    <section
      id="about"
      ref={ref}
      className="relative border-t border-border/40 py-32"
    >
      {/* Background element */}
      <div className="absolute inset-0 overflow-hidden" aria-hidden="true">
        <div className="absolute -right-32 bottom-0 h-96 w-96 rounded-full bg-primary/2 blur-3xl animate-glow-breathe" style={{ animationDelay: "1s" }} />
      </div>

      <div className="relative mx-auto max-w-7xl px-6 lg:px-8">
        <div className="grid items-center gap-16 lg:grid-cols-2">
          {/* Left text column */}
          <div
            className={`transition-all duration-1000 ${
              isVisible
                ? "translate-x-0 opacity-100"
                : "-translate-x-12 opacity-0"
            }`}
          >
            <p className="mb-4 text-[10px] tracking-[0.5em] text-primary uppercase">
              Notre histoire
            </p>
            <h2 className="font-serif text-4xl tracking-tight text-foreground md:text-5xl">
              <span className="text-balance">
                {"Pionniers du voyage temporel depuis 2031"}
              </span>
            </h2>
            <div className="mt-8 space-y-5 text-base leading-relaxed text-muted-foreground">
              <p>
                {"Fondee par la physicienne Dr. Helena Varnier et l'ingenieur quantique Maxime Durand, Chronos Voyages est nee d'un reve fou : permettre a l'humanite de toucher du doigt les moments qui ont forge notre monde."}
              </p>
              <p>
                {"Notre technologie brevetee de navigation chrono-quantique -- fruit de vingt ans de recherche au CERN et au MIT -- permet des deplacements temporels d'une precision absolue, enveloppes dans un confort digne des plus grands palaces."}
              </p>
              <p>
                {"Chaque expedition est concue sur mesure par un trio unique : un historien specialiste de l'epoque, un designer d'experience sensorielle, et un ingenieur temporel certifie. Le resultat ? Une immersion totale, respectueuse du continuum, et inoubliable."}
              </p>
            </div>

            {/* Decorative line */}
            <div
              className={`mt-8 flex items-center gap-3 transition-all delay-500 duration-1000 ${
                isVisible ? "translate-x-0 opacity-100" : "-translate-x-4 opacity-0"
              }`}
            >
              <div className="h-px w-12 bg-primary/30" />
              <span className="text-[10px] tracking-[0.3em] text-primary/60 uppercase italic">
                {"Le temps est le plus grand des luxes"}
              </span>
            </div>
          </div>

          {/* Right commitments column */}
          <div
            className={`transition-all delay-300 duration-1000 ${
              isVisible
                ? "translate-x-0 opacity-100"
                : "translate-x-12 opacity-0"
            }`}
          >
            <div className="relative rounded-2xl border border-border/50 bg-card p-10">
              {/* Top label */}
              <div className="absolute -top-3 left-10 rounded-full bg-primary px-4 py-1 text-[10px] font-medium tracking-[0.15em] text-primary-foreground uppercase">
                Nos Engagements
              </div>

              <div className="mt-4 space-y-8">
                {commitments.map((item, i) => (
                  <div
                    key={item.number}
                    className={`flex gap-5 transition-all duration-700 ${
                      visibleCommitments.includes(i)
                        ? "translate-y-0 opacity-100"
                        : "translate-y-6 opacity-0"
                    }`}
                  >
                    <span className="font-serif text-3xl text-primary/30 transition-colors duration-500 group-hover:text-primary/50">
                      {item.number}
                    </span>
                    <div>
                      <h3 className="mb-1 font-serif text-lg text-foreground">
                        {item.title}
                      </h3>
                      <p className="text-sm leading-relaxed text-muted-foreground">
                        {item.text}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Bottom decorative element */}
              <div className="mt-8 flex items-center gap-2">
                <div className="h-px flex-1 bg-border/50" />
                <svg viewBox="0 0 24 24" fill="none" className="h-4 w-4 text-primary/30" stroke="currentColor" strokeWidth="1.5">
                  <circle cx="12" cy="12" r="9" />
                  <path d="M12 6v6l4 2" />
                </svg>
                <div className="h-px flex-1 bg-border/50" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
