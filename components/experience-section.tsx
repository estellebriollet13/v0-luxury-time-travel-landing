"use client"

import { useEffect, useRef, useState } from "react"

const stats = [
  { value: "4,200+", label: "Journeys completed" },
  { value: "38", label: "Years of excellence" },
  { value: "142", label: "Available eras" },
  { value: "100%", label: "Safe return rate" },
]

export function ExperienceSection() {
  const [isVisible, setIsVisible] = useState(false)
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setIsVisible(true)
      },
      { threshold: 0.2 }
    )
    if (sectionRef.current) observer.observe(sectionRef.current)
    return () => observer.disconnect()
  }, [])

  return (
    <section
      id="experience"
      ref={sectionRef}
      className="relative border-t border-border/50 bg-card py-32"
    >
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="grid items-center gap-16 lg:grid-cols-2">
          <div>
            <p className="text-xs uppercase tracking-[0.4em] text-primary">
              The Chronos Difference
            </p>
            <h2
              className={`mt-4 font-serif text-4xl tracking-tight text-foreground transition-all duration-700 md:text-5xl ${
                isVisible
                  ? "translate-y-0 opacity-100"
                  : "translate-y-6 opacity-0"
              }`}
            >
              <span className="text-balance">
                An Experience Without Parallel
              </span>
            </h2>
            <p
              className={`mt-6 text-lg leading-relaxed text-muted-foreground transition-all delay-200 duration-700 ${
                isVisible
                  ? "translate-y-0 opacity-100"
                  : "translate-y-6 opacity-0"
              }`}
            >
              Each temporal expedition is a bespoke masterpiece. From the moment
              you step into our chrono-chambers, every detail has been
              orchestrated — the ambient temporal fields, the era-appropriate
              attire woven from quantum-stable fabrics, the cuisine prepared by
              historians and master chefs working in tandem.
            </p>
            <p
              className={`mt-4 text-lg leading-relaxed text-muted-foreground transition-all delay-300 duration-700 ${
                isVisible
                  ? "translate-y-0 opacity-100"
                  : "translate-y-6 opacity-0"
              }`}
            >
              This is not tourism. This is temporal immersion at its finest —
              an art form perfected over decades of relentless dedication
              to the extraordinary.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-6">
            {stats.map((stat, i) => (
              <div
                key={stat.label}
                className={`border border-border p-8 text-center transition-all duration-700 hover:border-primary/50 ${
                  isVisible
                    ? "translate-y-0 opacity-100"
                    : "translate-y-8 opacity-0"
                }`}
                style={{ transitionDelay: `${400 + i * 100}ms` }}
              >
                <p className="font-serif text-3xl text-primary md:text-4xl">
                  {stat.value}
                </p>
                <p className="mt-2 text-xs uppercase tracking-[0.15em] text-muted-foreground">
                  {stat.label}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
