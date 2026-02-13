"use client"

import { useEffect, useRef, useState } from "react"

export function AboutSection() {
  const [isVisible, setIsVisible] = useState(false)
  const ref = useRef<HTMLElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setIsVisible(true)
      },
      { threshold: 0.15 }
    )
    if (ref.current) observer.observe(ref.current)
    return () => observer.disconnect()
  }, [])

  return (
    <section
      id="about"
      ref={ref}
      className="relative border-t border-border/40 py-32"
    >
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="grid items-center gap-16 lg:grid-cols-2">
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
                {
                  "Fondee par le physicien Dr. Helena Varnier et l'ingenieur quantique Maxime Durand, Chronos Voyages est nee d'une vision audacieuse : rendre le voyage dans le temps accessible aux amoureux de l'histoire et du luxe."
                }
              </p>
              <p>
                {
                  "Notre technologie brevetee de navigation chrono-quantique permet des deplacements temporels d'une precision absolue, dans un confort digne des plus grands palaces."
                }
              </p>
              <p>
                {
                  "Chaque expedition est concue sur mesure par nos historiens et designers d'experience, pour garantir une immersion totale et respectueuse du continuum temporel."
                }
              </p>
            </div>
          </div>

          <div
            className={`transition-all delay-300 duration-1000 ${
              isVisible
                ? "translate-x-0 opacity-100"
                : "translate-x-12 opacity-0"
            }`}
          >
            <div className="relative rounded-2xl border border-border/50 bg-card p-10">
              <div className="absolute -top-3 left-10 rounded-full bg-primary px-4 py-1 text-[10px] font-medium tracking-[0.15em] text-primary-foreground uppercase">
                Nos Engagements
              </div>
              <div className="mt-4 space-y-8">
                {[
                  {
                    number: "01",
                    title: "Paradoxe Zero",
                    text: "Notre protocole strict garantit zero impact sur la ligne temporelle. Observez sans alterer.",
                  },
                  {
                    number: "02",
                    title: "Immersion Totale",
                    text: "Costumes d'epoque, monnaie locale et briefing historique complet avant chaque depart.",
                  },
                  {
                    number: "03",
                    title: "Retour Garanti",
                    text: "Triple systeme de securite quantique. Aucun voyageur n'a jamais ete perdu dans le temps.",
                  },
                ].map((item) => (
                  <div key={item.number} className="flex gap-5">
                    <span className="font-serif text-3xl text-primary/30">
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
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
