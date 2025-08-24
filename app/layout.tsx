import type { Metadata } from 'next'
import { Inter, Playfair_Display } from 'next/font/google'
import Script from "next/script"

import { cn } from '@/lib/utils'

import './globals.css'
import Providers from '@/components/providers'
import Header from '@/components/header'
import Footer from '@/components/footer'

const inter = Inter({ subsets: ['latin'], variable: '--font-sans' })
const playfair = Playfair_Display({
  subsets: ['latin'],
  variable: '--font-serif'
})

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL!

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Sameera Madushan | Portfolio & Blog",
    template: "%s | Sameera Madushan",
  },
  description:
    "A portfolio and blog by Sameera Madushan, a software engineer passionate about building scalable and secure solutions. View my projects and read my blogs for in-depth articles on development, modern technologies, and cybersecurity.",
  icons: {
    icon: "/favicon.ico",
  },
  openGraph: {
    type: "website",
    url: siteUrl,
    siteName: "Sameera Madushan | Portfolio & Blog",
    images: [
      {
        url: `${siteUrl}/images/og-images/og_opengraph.png`,
        alt: "Sameera Madushan Portfolio & Blog",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Sameera Madushan | Portfolio & Blog",
    description:
      "A portfolio and blog by Sameera Madushan, a software engineer passionate about building scalable and secure solutions. View my projects and read my blogs for in-depth articles on development, modern technologies, and cybersecurity.",
    images: [`${siteUrl}/images/og-images/og_twitter.png`],
  },
}

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode
}>) {

  const websiteStructuredData = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    url: siteUrl,
    name: "Sameera Madushan | Portfolio & Blog",
    description:
      "A portfolio and blog by Sameera Madushan, a software engineer passionate about building scalable and secure solutions. View my projects and read my blogs for in-depth articles on development, modern technologies, and cybersecurity.",
    publisher: {
      "@type": "Person",
      name: "Sameera Madushan",
      url: siteUrl,
    },
  }

  const personStructuredData = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: "Sameera Madushan",
    url: siteUrl,
    image: `${siteUrl}/images/authors/sameera.jpeg`,
    sameAs: [
      "https://github.com/sameera-madushan",
      "https://linkedin.com/in/sameera-madushan-perera",
      "https://facebook.com/sameera.xyz.me"
    ],
    jobTitle: "Software Engineer",
  }

  return (
    <html lang='en' suppressHydrationWarning>
      <body
        className={cn(
          'flex min-h-screen flex-col font-sans antialiased',
          inter.variable,
          playfair.variable
        )}
      >
        <Providers>
          <Header />
          <main className='grow'>{children}</main>
          <Footer />
        </Providers>

        <Script
          id="website-structured-data"
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteStructuredData) }}
        />
        <Script
          id="person-structured-data"
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(personStructuredData) }}
        />
      </body>
    </html>
  )
}