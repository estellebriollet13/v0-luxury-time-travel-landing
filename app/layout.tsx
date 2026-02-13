import type { Metadata, Viewport } from "next"
import { Playfair_Display, Inter } from "next/font/google"

import "./globals.css"

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
})

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
})

export const metadata: Metadata = {
  title: "Chronos Voyages | Agence de Voyages Temporels de Luxe",
  description:
    "Explorez les epoques les plus fascinantes de l'histoire avec un confort et un raffinement incomparables. Chronos Voyages, la premiere agence de voyages temporels de prestige.",
}

export const viewport: Viewport = {
  themeColor: "#161412",
  maximumScale: 1,
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="fr" className={`${playfair.variable} ${inter.variable}`}>
      <body className="font-sans antialiased">{children}</body>
    </html>
  )
}
