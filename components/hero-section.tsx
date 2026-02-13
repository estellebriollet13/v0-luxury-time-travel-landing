"use client"

import { useEffect, useState } from "react"
import Image from "next/image"
import { ChevronDown } from "lucide-react"

export function HeroSection() {
  const [loaded, setLoaded] = useState(false)

  useEffect(() => {
    setLoaded(true)
  }, [])

  return (
    <section className="relative flex min-h-screen items-center justify-center overflow-hidden">
      <div className="absolute inset-0">
        <Image
          src="/images/hero-bg.jpg"
          alt=""
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-background/70" />
        <div className="absolute inset-0 bg-gradient-to-b from-background/40 via-transparent to-background" />
      </div>

      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 h-96 w-96 rounded-full bg-primary/5 blur-3xl" />
        <div className="absolute right-1/3 bottom-1/3 h-64 w-64 rounded-full bg-primary/3 blur-3xl" />
      </div>

      <div className="relative z-10 mx-auto max-w-5xl px-6 text-center">
        <div
          className={`transition-all duration-1000 ${
            loaded ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
          }`}
        >
          <p className="mb-6 text-[10px] tracking-[0.5em] text-primary uppercase">
            Voyages temporels de prestige
          </p>
          <h1 className="font-serif text-5xl leading-[1.1] font-light tracking-tight text-foreground md:text-7xl lg:text-8xl">
            <span className="text-balance">Traversez le Temps</span>
            <br />
            <span className="text-primary">avec Elegance</span>
          </h1>
        </div>

        <div
          className={`transition-all delay-300 duration-1000 ${
            loaded ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
          }`}
        >
          <p className="mx-auto mt-8 max-w-2xl text-lg leading-relaxed text-muted-foreground">
            {
              "Chronos Voyages est la premiere agence de voyages temporels de luxe. Explorez les epoques les plus fascinantes de l'histoire avec un confort et un raffinement incomparables."
            }
          </p>
        </div>

        <div
          className={`mt-12 flex flex-col items-center justify-center gap-4 transition-all delay-500 duration-1000 sm:flex-row ${
            loaded ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
          }`}
        >
          <a
            href="#destinations"
            className="group relative overflow-hidden rounded-full bg-primary px-10 py-4 text-[11px] font-medium tracking-[0.2em] text-primary-foreground uppercase transition-all hover:shadow-lg hover:shadow-primary/20"
          >
            <span className="relative z-10">Explorer nos destinations</span>
            <div className="absolute inset-0 -translate-x-full bg-foreground/10 transition-transform duration-500 group-hover:translate-x-0" />
          </a>
          <a
            href="#about"
            className="rounded-full border border-border px-10 py-4 text-[11px] tracking-[0.2em] text-muted-foreground uppercase transition-all duration-300 hover:border-primary/50 hover:text-foreground"
          >
            En savoir plus
          </a>
        </div>

        <div
          className={`mt-24 flex items-center justify-center gap-12 text-center transition-all delay-700 duration-1000 md:gap-20 ${
            loaded ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
          }`}
        >
          {[
            { value: "147", label: "Epoques" },
            { value: "12K+", label: "Voyageurs" },
            { value: "100%", label: "Retours securises" },
          ].map((stat) => (
            <div key={stat.label} className="flex flex-col items-center">
              <span className="font-serif text-3xl text-primary md:text-4xl">
                {stat.value}
              </span>
              <span className="mt-1 text-[10px] tracking-[0.3em] text-muted-foreground uppercase">
                {stat.label}
              </span>
            </div>
          ))}
        </div>
      </div>

      <div className="absolute bottom-8 left-1/2 z-10 -translate-x-1/2 animate-float">
        <a
          href="#destinations"
          className="flex flex-col items-center gap-2 text-muted-foreground transition-colors hover:text-primary"
          aria-label="Defiler vers les destinations"
        >
          <span className="text-[9px] tracking-[0.4em] uppercase">
            Decouvrir
          </span>
          <ChevronDown className="h-4 w-4" />
        </a>
      </div>
    </section>
  )
}
