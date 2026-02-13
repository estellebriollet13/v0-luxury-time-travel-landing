"use client"

import { useState, useEffect } from "react"
import { Menu, X } from "lucide-react"

const navLinks = [
  { label: "Destinations", href: "#destinations" },
  { label: "Experience", href: "#experience" },
  { label: "A Propos", href: "#about" },
  { label: "Contact", href: "#contact" },
]

export function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50)
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <header
      className={`fixed top-0 right-0 left-0 z-50 transition-all duration-500 ${
        scrolled
          ? "border-b border-border/40 bg-background/90 backdrop-blur-xl"
          : "bg-transparent"
      }`}
    >
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-6 py-5 lg:px-8">
        <a href="#" className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-full border border-primary/40">
            <svg
              viewBox="0 0 24 24"
              fill="none"
              className="h-5 w-5 text-primary"
              stroke="currentColor"
              strokeWidth="1.5"
            >
              <circle cx="12" cy="12" r="9" />
              <path d="M12 6v6l4 2" />
            </svg>
          </div>
          <span className="font-serif text-xl tracking-wide text-foreground">
            Chronos Voyages
          </span>
        </a>

        <div className="hidden items-center gap-8 md:flex">
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className="text-[11px] tracking-[0.2em] text-muted-foreground uppercase transition-colors duration-300 hover:text-primary"
            >
              {link.label}
            </a>
          ))}
          <a
            href="#contact"
            className="rounded-full border border-primary/50 bg-primary/10 px-7 py-2.5 text-[11px] font-medium tracking-[0.15em] text-primary uppercase transition-all duration-300 hover:bg-primary hover:text-primary-foreground"
          >
            Reserver
          </a>
        </div>

        <button
          className="text-foreground md:hidden"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label={mobileOpen ? "Fermer le menu" : "Ouvrir le menu"}
        >
          {mobileOpen ? (
            <X className="h-6 w-6" />
          ) : (
            <Menu className="h-6 w-6" />
          )}
        </button>
      </nav>

      {mobileOpen && (
        <div className="border-t border-border/40 bg-background/95 backdrop-blur-xl md:hidden">
          <div className="flex flex-col gap-1 px-6 py-4">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                onClick={() => setMobileOpen(false)}
                className="rounded-lg px-4 py-3 text-sm tracking-widest text-muted-foreground uppercase transition-colors hover:bg-secondary hover:text-foreground"
              >
                {link.label}
              </a>
            ))}
            <a
              href="#contact"
              onClick={() => setMobileOpen(false)}
              className="mt-2 rounded-full border border-primary bg-primary/10 px-6 py-3 text-center text-sm font-medium tracking-wider text-primary uppercase transition-all hover:bg-primary hover:text-primary-foreground"
            >
              Reserver
            </a>
          </div>
        </div>
      )}
    </header>
  )
}
