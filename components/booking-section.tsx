"use client"

import { useState, useRef, useEffect } from "react"
import { MapPin, Clock, Users, ChevronDown, Check } from "lucide-react"

const destinations = [
  { id: "paris-1889", label: "Paris, 1889 - Belle Epoque", era: "Belle Epoque" },
  { id: "cretaceous", label: "Cretace Superieur - 68M ans", era: "Mesozoique" },
  { id: "florence-1504", label: "Florence, 1504 - Renaissance", era: "Renaissance" },
]

const durations = [
  { id: "1-day", label: "1 jour", description: "Immersion express" },
  { id: "3-days", label: "3 jours", description: "Exploration classique" },
  { id: "5-days", label: "5 jours", description: "Experience approfondie" },
  { id: "7-days", label: "7 jours", description: "Sejour premium" },
  { id: "10-days", label: "10 jours", description: "Immersion totale" },
]

function CustomSelect({
  options,
  value,
  onChange,
  placeholder,
  icon: Icon,
}: {
  options: { id: string; label: string; description?: string }[]
  value: string
  onChange: (val: string) => void
  placeholder: string
  icon: typeof MapPin
}) {
  const [open, setOpen] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false)
      }
    }
    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [])

  const selected = options.find((o) => o.id === value)

  return (
    <div ref={ref} className="relative">
      <button
        type="button"
        onClick={() => setOpen(!open)}
        className="flex w-full items-center gap-3 rounded-xl border border-border/50 bg-background px-5 py-4 text-left transition-all duration-200 hover:border-primary/40 focus:border-primary/50 focus:outline-none focus:ring-1 focus:ring-primary/20"
      >
        <Icon className="h-4 w-4 shrink-0 text-primary/60" />
        <span className={`flex-1 text-sm ${selected ? "text-foreground" : "text-muted-foreground/60"}`}>
          {selected ? selected.label : placeholder}
        </span>
        <ChevronDown
          className={`h-4 w-4 text-muted-foreground transition-transform duration-200 ${open ? "rotate-180" : ""}`}
        />
      </button>
      {open && (
        <div className="absolute right-0 left-0 z-20 mt-2 overflow-hidden rounded-xl border border-border/50 bg-card shadow-xl shadow-background/50">
          {options.map((option) => (
            <button
              key={option.id}
              type="button"
              onClick={() => {
                onChange(option.id)
                setOpen(false)
              }}
              className={`flex w-full items-center justify-between px-5 py-3.5 text-left text-sm transition-colors hover:bg-secondary ${
                value === option.id ? "text-primary" : "text-muted-foreground"
              }`}
            >
              <div>
                <p className={value === option.id ? "text-primary" : "text-foreground"}>{option.label}</p>
                {option.description && (
                  <p className="mt-0.5 text-[11px] text-muted-foreground">{option.description}</p>
                )}
              </div>
              {value === option.id && <Check className="h-4 w-4 text-primary" />}
            </button>
          ))}
        </div>
      )}
    </div>
  )
}

export function BookingSection() {
  const [destination, setDestination] = useState("")
  const [duration, setDuration] = useState("")
  const [passengers, setPassengers] = useState(1)
  const [confirmed, setConfirmed] = useState(false)
  const [isVisible, setIsVisible] = useState(false)
  const ref = useRef<HTMLElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setIsVisible(true)
      },
      { threshold: 0.1 }
    )
    if (ref.current) observer.observe(ref.current)
    return () => observer.disconnect()
  }, [])

  const handleConfirm = () => {
    if (destination && duration) {
      setConfirmed(true)
      setTimeout(() => setConfirmed(false), 4000)
    }
  }

  return (
    <section
      id="booking"
      ref={ref}
      className="relative border-t border-border/40 py-32"
    >
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute bottom-0 left-1/4 h-96 w-96 rounded-full bg-primary/3 blur-3xl" />
      </div>

      <div className="relative mx-auto max-w-3xl px-6 lg:px-8">
        <div
          className={`mb-16 text-center transition-all duration-1000 ${
            isVisible ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
          }`}
        >
          <p className="mb-4 text-[10px] tracking-[0.5em] text-primary uppercase">
            Reservation
          </p>
          <h2 className="font-serif text-4xl tracking-tight text-foreground md:text-5xl lg:text-6xl">
            <span className="text-balance">{"Planifiez votre expedition"}</span>
          </h2>
          <p className="mx-auto mt-6 max-w-2xl text-base leading-relaxed text-muted-foreground">
            {"Selectionnez votre destination temporelle, la duree de votre sejour et le nombre de voyageurs pour commencer votre aventure."}
          </p>
        </div>

        <div
          className={`rounded-2xl border border-border/50 bg-card p-8 transition-all delay-200 duration-1000 md:p-10 ${
            isVisible ? "translate-y-0 opacity-100" : "translate-y-12 opacity-0"
          }`}
        >
          <div className="flex flex-col gap-6">
            {/* Destination */}
            <div>
              <label className="mb-2 block text-[10px] tracking-[0.2em] text-muted-foreground uppercase">
                Destination temporelle
              </label>
              <CustomSelect
                options={destinations}
                value={destination}
                onChange={setDestination}
                placeholder="Choisissez votre epoque"
                icon={MapPin}
              />
            </div>

            {/* Duration */}
            <div>
              <label className="mb-2 block text-[10px] tracking-[0.2em] text-muted-foreground uppercase">
                {"Duree du sejour"}
              </label>
              <CustomSelect
                options={durations}
                value={duration}
                onChange={setDuration}
                placeholder="Selectionnez la duree"
                icon={Clock}
              />
            </div>

            {/* Passengers */}
            <div>
              <label className="mb-2 block text-[10px] tracking-[0.2em] text-muted-foreground uppercase">
                Nombre de voyageurs
              </label>
              <div className="flex items-center gap-4 rounded-xl border border-border/50 bg-background px-5 py-4">
                <Users className="h-4 w-4 shrink-0 text-primary/60" />
                <div className="flex flex-1 items-center gap-4">
                  <button
                    type="button"
                    onClick={() => setPassengers(Math.max(1, passengers - 1))}
                    className="flex h-8 w-8 items-center justify-center rounded-lg border border-border/50 text-muted-foreground transition-all hover:border-primary/40 hover:text-foreground"
                    aria-label="Diminuer le nombre de voyageurs"
                  >
                    -
                  </button>
                  <span className="w-8 text-center font-serif text-lg text-foreground">
                    {passengers}
                  </span>
                  <button
                    type="button"
                    onClick={() => setPassengers(Math.min(8, passengers + 1))}
                    className="flex h-8 w-8 items-center justify-center rounded-lg border border-border/50 text-muted-foreground transition-all hover:border-primary/40 hover:text-foreground"
                    aria-label="Augmenter le nombre de voyageurs"
                  >
                    +
                  </button>
                </div>
                <span className="text-xs text-muted-foreground">
                  {passengers === 1 ? "voyageur" : "voyageurs"}
                </span>
              </div>
            </div>

            {/* Confirm Button */}
            <button
              type="button"
              onClick={handleConfirm}
              disabled={!destination || !duration}
              className={`group relative mt-2 w-full overflow-hidden rounded-full py-4 text-[11px] font-medium tracking-[0.2em] uppercase transition-all duration-500 ${
                confirmed
                  ? "border border-emerald-500/50 bg-emerald-500/10 text-emerald-400"
                  : "bg-primary text-primary-foreground hover:shadow-lg hover:shadow-primary/20 disabled:cursor-not-allowed disabled:opacity-30"
              }`}
            >
              {confirmed ? (
                <span className="flex items-center justify-center gap-2">
                  <Check className="h-4 w-4" />
                  Expedition confirmee
                </span>
              ) : (
                <span className="relative z-10">
                  Confirmer la reservation
                </span>
              )}
              {!confirmed && (
                <div className="absolute inset-0 -translate-x-full bg-foreground/10 transition-transform duration-500 group-hover:translate-x-0" />
              )}
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}
