"use client"

import { useEffect, useState, useRef, useCallback } from "react"
import Image from "next/image"
import { ChevronDown } from "lucide-react"

function FloatingParticle({ delay, duration, size, x, y }: {
  delay: number
  duration: number
  size: number
  x: string
  y: string
}) {
  return (
    <div
      className="absolute rounded-full bg-primary/20"
      style={{
        width: size,
        height: size,
        left: x,
        top: y,
        animation: `drift ${duration}s ease-in-out ${delay}s infinite`,
        ["--dx" as string]: `${(Math.random() - 0.5) * 120}px`,
        ["--dy" as string]: `${(Math.random() - 0.5) * 120}px`,
      }}
    />
  )
}

function AnimatedCounter({ target, suffix = "" }: { target: string; suffix?: string }) {
  const [value, setValue] = useState("0")
  const [started, setStarted] = useState(false)
  const ref = useRef<HTMLSpanElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !started) setStarted(true)
      },
      { threshold: 0.5 }
    )
    if (ref.current) observer.observe(ref.current)
    return () => observer.disconnect()
  }, [started])

  useEffect(() => {
    if (!started) return
    const numTarget = parseInt(target.replace(/\D/g, ""))
    if (isNaN(numTarget)) {
      setValue(target)
      return
    }
    const duration = 2000
    const steps = 60
    const increment = numTarget / steps
    let current = 0
    let step = 0

    const timer = setInterval(() => {
      step++
      current = Math.min(Math.round(increment * step), numTarget)
      setValue(String(current))
      if (step >= steps) {
        clearInterval(timer)
        setValue(target.replace(/\d+/, String(numTarget)))
      }
    }, duration / steps)

    return () => clearInterval(timer)
  }, [started, target])

  return (
    <span ref={ref} className="font-serif text-3xl text-primary tabular-nums md:text-4xl">
      {value}{suffix}
    </span>
  )
}

const particles = Array.from({ length: 18 }, (_, i) => ({
  delay: Math.random() * 8,
  duration: 10 + Math.random() * 15,
  size: 2 + Math.random() * 4,
  x: `${Math.random() * 100}%`,
  y: `${Math.random() * 100}%`,
  id: i,
}))

export function HeroSection() {
  const [loaded, setLoaded] = useState(false)
  const [scrollY, setScrollY] = useState(0)
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    setLoaded(true)
  }, [])

  const handleScroll = useCallback(() => {
    if (sectionRef.current) {
      const rect = sectionRef.current.getBoundingClientRect()
      if (rect.bottom > 0) {
        setScrollY(window.scrollY)
      }
    }
  }, [])

  useEffect(() => {
    window.addEventListener("scroll", handleScroll, { passive: true })
    return () => window.removeEventListener("scroll", handleScroll)
  }, [handleScroll])

  return (
    <section ref={sectionRef} className="relative flex min-h-screen items-center justify-center overflow-hidden">
      {/* Parallax background */}
      <div className="absolute inset-0" style={{ transform: `translateY(${scrollY * 0.3}px)` }}>
        <Image
          src="/images/hero-bg.jpg"
          alt=""
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-background/75" />
        <div className="absolute inset-0 bg-gradient-to-b from-background/50 via-transparent to-background" />
      </div>

      {/* Floating particles layer */}
      <div className="absolute inset-0 overflow-hidden" aria-hidden="true">
        {particles.map((p) => (
          <FloatingParticle key={p.id} {...p} />
        ))}
      </div>

      {/* Ambient glow orbs */}
      <div className="absolute inset-0 overflow-hidden" aria-hidden="true">
        <div className="absolute top-1/4 left-1/4 h-96 w-96 rounded-full bg-primary/5 blur-3xl animate-glow-breathe" />
        <div className="absolute right-1/4 bottom-1/3 h-72 w-72 rounded-full bg-primary/3 blur-3xl animate-glow-breathe" style={{ animationDelay: "2s" }} />
        <div className="absolute top-1/2 right-1/3 h-48 w-48 rounded-full bg-primary/4 blur-2xl animate-glow-breathe" style={{ animationDelay: "4s" }} />
      </div>

      {/* Rotating clock element */}
      <div className="absolute inset-0 flex items-center justify-center" aria-hidden="true">
        <div className="relative h-[600px] w-[600px] animate-spin-slow opacity-[0.03] md:h-[800px] md:w-[800px]">
          <svg viewBox="0 0 400 400" className="h-full w-full">
            <circle cx="200" cy="200" r="190" fill="none" stroke="currentColor" strokeWidth="0.5" className="text-primary" />
            <circle cx="200" cy="200" r="150" fill="none" stroke="currentColor" strokeWidth="0.3" className="text-primary" />
            {Array.from({ length: 12 }, (_, i) => {
              const angle = (i * 30 * Math.PI) / 180
              const x1 = 200 + 175 * Math.cos(angle)
              const y1 = 200 + 175 * Math.sin(angle)
              const x2 = 200 + 190 * Math.cos(angle)
              const y2 = 200 + 190 * Math.sin(angle)
              return <line key={i} x1={x1} y1={y1} x2={x2} y2={y2} stroke="currentColor" strokeWidth="0.5" className="text-primary" />
            })}
          </svg>
        </div>
      </div>

      {/* Content */}
      <div className="relative z-10 mx-auto max-w-5xl px-6 text-center">
        <div
          className={`transition-all duration-1000 ${
            loaded ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
          }`}
        >
          <div className="mb-8 inline-flex items-center gap-3 rounded-full border border-primary/20 bg-primary/5 px-5 py-2 backdrop-blur-sm">
            <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-primary" />
            <span className="text-[10px] tracking-[0.4em] text-primary uppercase">
              Voyages temporels de prestige
            </span>
          </div>
          <h1 className="font-serif text-5xl leading-[1.1] font-light tracking-tight text-foreground md:text-7xl lg:text-8xl">
            <span className="text-balance block">Traversez le Temps</span>
            <span className="mt-2 block text-primary">avec Elegance</span>
          </h1>
        </div>

        <div
          className={`transition-all delay-300 duration-1000 ${
            loaded ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
          }`}
        >
          <p className="mx-auto mt-8 max-w-2xl text-lg leading-relaxed text-muted-foreground">
            {"Depuis 2031, Chronos Voyages ouvre les portes du passe aux voyageurs les plus audacieux. Chaque epoque devient votre terrain de jeu, chaque siecle un nouveau chapitre de votre histoire personnelle."}
          </p>
        </div>

        <div
          className={`mt-12 flex flex-col items-center justify-center gap-4 transition-all delay-500 duration-1000 sm:flex-row ${
            loaded ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
          }`}
        >
          <a
            href="#destinations"
            className="group relative overflow-hidden rounded-full bg-primary px-10 py-4 text-[11px] font-medium tracking-[0.2em] text-primary-foreground uppercase transition-all hover:shadow-lg hover:shadow-primary/25"
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

        {/* Animated Stats */}
        <div
          className={`mt-24 flex items-center justify-center gap-12 text-center transition-all delay-700 duration-1000 md:gap-20 ${
            loaded ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
          }`}
        >
          {[
            { target: "147", label: "Epoques", suffix: "" },
            { target: "12", label: "Voyageurs", suffix: "K+" },
            { target: "100", label: "Retours securises", suffix: "%" },
          ].map((stat) => (
            <div key={stat.label} className="flex flex-col items-center">
              <AnimatedCounter target={stat.target} suffix={stat.suffix} />
              <span className="mt-1 text-[10px] tracking-[0.3em] text-muted-foreground uppercase">
                {stat.label}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 z-10 -translate-x-1/2">
        <a
          href="#destinations"
          className="group flex flex-col items-center gap-2 text-muted-foreground transition-colors hover:text-primary"
          aria-label="Defiler vers les destinations"
        >
          <span className="text-[9px] tracking-[0.4em] uppercase">Decouvrir</span>
          <div className="relative">
            <ChevronDown className="h-4 w-4 animate-float" />
            <div className="absolute inset-0 animate-pulse-ring rounded-full" />
          </div>
        </a>
      </div>
    </section>
  )
}
