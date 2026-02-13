export function Footer() {
  return (
    <footer id="contact" className="border-t border-border/40 bg-card/50">
      <div className="mx-auto max-w-7xl px-6 py-20 lg:px-8">
        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-4">
          <div className="lg:col-span-2">
            <div className="flex items-center gap-3">
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
            </div>
            <p className="mt-6 max-w-md text-sm leading-relaxed text-muted-foreground">
              {
                "La premiere agence de voyages temporels de luxe. Explorez le passe et le futur avec un confort et une securite inegales."
              }
            </p>
            <div className="mt-6 flex gap-3">
              {["In", "Li", "X"].map((social) => (
                <a
                  key={social}
                  href="#"
                  className="flex h-10 w-10 items-center justify-center rounded-full border border-border/50 text-xs text-muted-foreground transition-all duration-300 hover:border-primary/50 hover:text-primary"
                  aria-label={social}
                >
                  {social}
                </a>
              ))}
            </div>
          </div>

          <div>
            <h4 className="mb-5 text-[10px] tracking-[0.3em] text-foreground uppercase">
              Destinations
            </h4>
            <div className="flex flex-col gap-3">
              {[
                "Paris 1889",
                "Cretace Superieur",
                "Florence Renaissance",
                "Egypte Antique",
                "Japon Edo",
              ].map((link) => (
                <a
                  key={link}
                  href="#destinations"
                  className="text-sm text-muted-foreground transition-colors duration-300 hover:text-primary"
                >
                  {link}
                </a>
              ))}
            </div>
          </div>

          <div>
            <h4 className="mb-5 text-[10px] tracking-[0.3em] text-foreground uppercase">
              Informations
            </h4>
            <div className="flex flex-col gap-3">
              {[
                "Protocole de securite",
                "FAQ Temporelle",
                "Conditions de voyage",
                "Confidentialite",
                "Nous contacter",
              ].map((link) => (
                <a
                  key={link}
                  href="#"
                  className="text-sm text-muted-foreground transition-colors duration-300 hover:text-primary"
                >
                  {link}
                </a>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-16 flex flex-col items-center justify-between gap-4 border-t border-border/40 pt-8 md:flex-row">
          <p className="text-xs text-muted-foreground">
            {"2031 Chronos Voyages. Tous droits reserves a travers le temps."}
          </p>
          <p className="text-xs text-muted-foreground/50">
            {
              "Licence de voyage temporel N 7749-QX | Certifie Paradoxe Zero"
            }
          </p>
        </div>
      </div>
    </footer>
  )
}
