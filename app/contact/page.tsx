import type { Metadata } from 'next'
import ContactForm from '@/components/contact-form'
import AnimatedSection from '@/components/animated-section'

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL!

export const metadata: Metadata = {
  title: "Contact",
  description: "Get in touch with Sameera Madushan to discuss your project or collaboration.",
  openGraph: {
    title: "Contact | Sameera Madushan",
    description: "Get in touch with Sameera Madushan to discuss your project or collaboration.",
    url: `${siteUrl}/contact`,
    images: [`${siteUrl}/images/og-cover.png`],
  },
  twitter: {
    card: "summary_large_image",
    title: "Contact | Sameera Madushan",
    description: "Get in touch with Sameera Madushan to discuss your project or collaboration.",
    images: [`${siteUrl}/images/og-cover.png`],
  },
}

export default function Contact() {
  return (
    <section className='pb-24 pt-40'>
      <div className='mx-auto max-w-3xl px-4'>
        <AnimatedSection delay={0}>
          <h2 className='title'>Let&apos;s talk about your project</h2>
        </AnimatedSection>

        <AnimatedSection delay={0.2}>
          <ContactForm />
        </AnimatedSection>
      </div>
    </section>
  )
}