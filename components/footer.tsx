import { Clock } from "lucide-react"

const footerLinks = {
  Destinations: ["Ancient World", "Medieval Era", "Renaissance", "Industrial Age", "Far Future"],
  Company: ["Our Story", "Chrono-Engineers", "Safety Protocols", "Careers"],
  Support: ["Contact Us", "FAQ", "Temporal Insurance", "Travel Guidelines"],
}

export function Footer() {
  return (
    <footer id="contact" className="border-t border-border/50 bg-card py-20">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-4">
          <div>
            <a href="#" className="flex items-center gap-2">
              <Clock className="h-5 w-5 text-primary" />
              <span className="font-serif text-lg tracking-wide text-foreground">
                Chronos Voyages
              </span>
            </a>
            <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
              The premier luxury time travel agency. Crafting extraordinary
              temporal experiences since 2087.
            </p>
          </div>

          {Object.entries(footerLinks).map(([category, links]) => (
            <div key={category}>
              <h4 className="text-xs uppercase tracking-[0.2em] text-foreground">
                {category}
              </h4>
              <ul className="mt-4 flex flex-col gap-3">
                {links.map((link) => (
                  <li key={link}>
                    <a
                      href="#"
                      className="text-sm text-muted-foreground transition-colors hover:text-primary"
                    >
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-16 flex flex-col items-center justify-between gap-4 border-t border-border pt-8 md:flex-row">
          <p className="text-xs text-muted-foreground">
            {"Chronos Voyages Ltd. All rights reserved across all timelines."}
          </p>
          <div className="flex gap-6">
            <a
              href="#"
              className="text-xs text-muted-foreground transition-colors hover:text-primary"
            >
              Privacy Policy
            </a>
            <a
              href="#"
              className="text-xs text-muted-foreground transition-colors hover:text-primary"
            >
              Temporal Accords
            </a>
            <a
              href="#"
              className="text-xs text-muted-foreground transition-colors hover:text-primary"
            >
              Paradox Liability
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}
