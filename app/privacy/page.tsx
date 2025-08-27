import type { Metadata } from 'next'
import AnimatedSection from '@/components/animated-section'

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL!

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: "Read the privacy policy of Sameera Madushan's website. Learn how your data is collected, used, and protected.",
  openGraph: {
    title: "Privacy Policy | Sameera Madushan",
    description: "Read the privacy policy of Sameera Madushan's website. Learn how your data is collected, used, and protected.",
    url: `${siteUrl}/privacy-policy`,
    images: [`${siteUrl}/images/og-cover.png`],
  },
  twitter: {
    card: "summary_large_image",
    title: "Privacy Policy | Sameera Madushan",
    description: "Read the privacy policy of Sameera Madushan's website. Learn how your data is collected, used, and protected.",
    images: [`${siteUrl}/images/og-cover.png`],
  },
}

export default function PrivacyPolicyPage() {
  return (
    <section className='pb-24 pt-40'>
      <div className='mx-auto max-w-3xl px-4'>
        <AnimatedSection delay={0}>
          <h1 className='title mb-12'>Privacy Policy</h1>
        </AnimatedSection>

        <AnimatedSection delay={0.2}>
        <p className='mb-4'>
          Your privacy is important to me. This Privacy Policy explains how I collect, use, and protect the personal information you provide when visiting my website.
        </p>
        </AnimatedSection>

        <AnimatedSection delay={0.3}>
        <h2 className='text-xl font-semibold mt-8 mb-4'>Information I Collect</h2>
        <p className='mb-4'>
          I may collect personal information that you voluntarily provide, such as your name and email address when you contact me via the website&#39;s contact form.
        </p>
        </AnimatedSection>

        <AnimatedSection delay={0.4}>
        <h2 className='text-xl font-semibold mt-8 mb-4'>How I Use Your Information</h2>
        <p className='mb-4'>
          The information you provide is used solely to respond to your inquiries and provide the services you request. I do not sell or share your personal data with third parties.
        </p>
        </AnimatedSection>

        <AnimatedSection delay={0.5}>
        <h2 className='text-xl font-semibold mt-8 mb-4'>Cookies</h2>
        <p className='mb-4'>
          My website may use cookies for basic functionality, analytics, or performance tracking. You can disable cookies in your browser settings if you prefer.
        </p>
        </AnimatedSection>

        <AnimatedSection delay={0.6}>
        <h2 className='text-xl font-semibold mt-8 mb-4'>Third-Party Services</h2>
        <p className='mb-4'>
          Some features of my website may rely on third-party services (like analytics or email providers). These services have their own privacy policies.
        </p>
        </AnimatedSection>

        <AnimatedSection delay={0.7}>
        <h2 className='text-xl font-semibold mt-8 mb-4'>Changes to This Policy</h2>
        <p className='mb-4'>
          I may update this Privacy Policy from time to time. Any changes will be reflected on this page with an updated date.
        </p>
        </AnimatedSection>

        <AnimatedSection delay={0.8}>
        <p className='mt-8'>
          If you have any questions about this Privacy Policy, please <a href="/contact" className="text-blue-600 underline">contact me</a>.
        </p>
        </AnimatedSection>
      </div>
    </section>
  )
}
