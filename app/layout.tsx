import type { Metadata, Viewport } from 'next'
import { Playfair_Display, Inter } from 'next/font/google'

import './globals.css'

const playfair = Playfair_Display({
  subsets: ['latin'],
  variable: '--font-playfair',
})

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
})

export const metadata: Metadata = {
  title: 'Chronos Voyages | Luxury Time Travel',
  description:
    'Experience the past and future with unparalleled luxury. Chronos Voyages is the premier time travel agency for discerning explorers.',
}

export const viewport: Viewport = {
  themeColor: '#161412',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className={`${playfair.variable} ${inter.variable}`}>
      <body className="font-sans antialiased">{children}</body>
    </html>
  )
}
