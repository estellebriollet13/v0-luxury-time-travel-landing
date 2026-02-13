"use client"

import { useState } from "react"
import { Clock, Menu, X } from "lucide-react"

const navLinks = [
  { label: "Destinations", href: "#destinations" },
  { label: "Experience", href: "#experience" },
  { label: "About", href: "#about" },
  { label: "Contact", href: "#contact" },
]

export function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false)

  return (
    <header className="fixed top-0 left-0 right-0 z-50 border-b border-border/50 bg-background/80 backdrop-blur-xl">
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4 lg:px-8">
        <a href="#" className="flex items-center gap-2">
          <Clock className="h-6 w-6 text-primary" />
          <span className="font-serif text-xl tracking-wide text-foreground">
            Chronos Voyages
          </span>
        </a>

        <ul className="hidden items-center gap-10 md:flex">
          {navLinks.map((link) => (
            <li key={link.label}>
              <a
                href={link.href}
                className="text-sm uppercase tracking-[0.2em] text-muted-foreground transition-colors hover:text-primary"
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>

        <a
          href="#contact"
          className="hidden rounded-none border border-primary bg-transparent px-6 py-2.5 text-xs uppercase tracking-[0.2em] text-primary transition-colors hover:bg-primary hover:text-primary-foreground md:inline-block"
        >
          Book a Journey
        </a>

        <button
          className="text-foreground md:hidden"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label={mobileOpen ? "Close menu" : "Open menu"}
        >
          {mobileOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </nav>

      {mobileOpen && (
        <div className="border-t border-border/50 bg-background/95 backdrop-blur-xl md:hidden">
          <ul className="flex flex-col gap-1 px-6 py-4">
            {navLinks.map((link) => (
              <li key={link.label}>
                <a
                  href={link.href}
                  className="block py-3 text-sm uppercase tracking-[0.2em] text-muted-foreground transition-colors hover:text-primary"
                  onClick={() => setMobileOpen(false)}
                >
                  {link.label}
                </a>
              </li>
            ))}
            <li>
              <a
                href="#contact"
                className="mt-2 block border border-primary py-3 text-center text-xs uppercase tracking-[0.2em] text-primary transition-colors hover:bg-primary hover:text-primary-foreground"
                onClick={() => setMobileOpen(false)}
              >
                Book a Journey
              </a>
            </li>
          </ul>
        </div>
      )}
    </header>
  )
}
