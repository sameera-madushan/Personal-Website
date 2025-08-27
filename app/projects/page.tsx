import type { Metadata } from 'next'
import Projects from '@/components/projects'
import { getProjects } from '@/lib/projects'
import AnimatedSection from '@/components/animated-section'

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL!

export const metadata: Metadata = {
  title: "Projects",
  description: "Explore the projects by Sameera Madushan, a software engineer passionate about building scalable and secure solutions.",
  openGraph: {
    title: "Projects | Sameera Madushan",
    description: "Explore the projects by Sameera Madushan, a software engineer passionate about building scalable and secure solutions.",
    url: `${siteUrl}/projects`,
    images: [`${siteUrl}/images/og-cover.png`],
  },
  twitter: {
    card: "summary_large_image",
    title: "Projects | Sameera Madushan",
    description: "Explore the projects by Sameera Madushan, a software engineer passionate about building scalable and secure solutions.",
    images: [`${siteUrl}/images/og-cover.png`],
  },
}

export default async function ProjectsPage() {
  const projects = await getProjects()

  return (
    <section className='pb-24 pt-40'>
      <div className='mx-auto max-w-3xl px-4'>
        <AnimatedSection delay={0}>
          <h1 className='title mb-12'>Projects</h1>
        </AnimatedSection>

        <AnimatedSection delay={0.2}>
          <Projects projects={projects} />
        </AnimatedSection>
      </div>
    </section>
  )
}