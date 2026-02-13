"use client"

import { useEffect, useState } from "react"
import { ArrowDown } from "lucide-react"
import Image from "next/image"

export function HeroSection() {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    setIsVisible(true)
  }, [])

  return (
    <section className="relative flex min-h-screen items-center justify-center overflow-hidden">
      <div className="absolute inset-0">
        <Image
          src="/images/hero-portal.jpg"
          alt="Ethereal time travel portal with swirling golden light"
          fill
          className="object-cover opacity-40"
          priority
        />
        <div className="absolute inset-0 bg-background/60" />
      </div>

      <div className="absolute inset-0">
        <div className="absolute left-1/4 top-1/4 h-64 w-64 rounded-full bg-primary/5 blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 h-96 w-96 rounded-full bg-primary/3 blur-3xl" />
      </div>

      <div className="relative z-10 mx-auto max-w-5xl px-6 text-center">
        <p
          className={`mb-6 text-xs uppercase tracking-[0.4em] text-primary transition-all duration-700 ${
            isVisible ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"
          }`}
        >
          Transcend the boundaries of time
        </p>

        <h1
          className={`font-serif text-5xl leading-tight tracking-tight text-foreground transition-all delay-200 duration-700 md:text-7xl lg:text-8xl ${
            isVisible ? "translate-y-0 opacity-100" : "translate-y-6 opacity-0"
          }`}
        >
          <span className="text-balance">
            Journey Beyond
            <br />
            <span className="text-primary">Time Itself</span>
          </span>
        </h1>

        <p
          className={`mx-auto mt-8 max-w-2xl text-lg leading-relaxed text-muted-foreground transition-all delay-400 duration-700 md:text-xl ${
            isVisible ? "translate-y-0 opacity-100" : "translate-y-6 opacity-0"
          }`}
        >
          Chronos Voyages offers exclusive, curated temporal expeditions to
          history{"'"}s most extraordinary moments. An unparalleled luxury
          experience, reserved for the few.
        </p>

        <div
          className={`mt-12 flex flex-col items-center gap-4 transition-all delay-500 duration-700 sm:flex-row sm:justify-center ${
            isVisible ? "translate-y-0 opacity-100" : "translate-y-6 opacity-0"
          }`}
        >
          <a
            href="#destinations"
            className="rounded-none border border-primary bg-primary px-10 py-4 text-xs uppercase tracking-[0.2em] text-primary-foreground transition-all hover:bg-transparent hover:text-primary"
          >
            Explore Destinations
          </a>
          <a
            href="#about"
            className="rounded-none border border-border px-10 py-4 text-xs uppercase tracking-[0.2em] text-foreground transition-all hover:border-primary hover:text-primary"
          >
            Our Legacy
          </a>
        </div>
      </div>

      <a
        href="#about"
        className="absolute bottom-10 left-1/2 -translate-x-1/2 animate-float text-primary"
        aria-label="Scroll down"
      >
        <ArrowDown className="h-5 w-5" />
      </a>
    </section>
  )
}
