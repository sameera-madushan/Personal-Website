import type { Metadata } from 'next'
import AnimatedSection from '@/components/animated-section'
import Skills from '@/components/skills'
import Experience from '@/components/experience'
import Education from '@/components/education'
import CVProjects from '@/components/cv-projects'
import CVPosts from '@/components/cv-posts'

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL!

export const metadata: Metadata = {
  title: "Curriculum Vitae",
  description: "Explore the Curriculum Vitae of Sameera Madushan, showcasing work experience, skills, projects, and achievements.",
  openGraph: {
    title: "Curriculum Vitae | Sameera Madushan",
    description: "Explore the Curriculum Vitae of Sameera Madushan, showcasing work experience, skills, projects, and achievements.",
    url: `${siteUrl}/cv`,
    images: [`${siteUrl}/images/og-cover.png`],
  },
  twitter: {
    card: "summary_large_image",
    title: "Curriculum Vitae | Sameera Madushan",
    description: "Explore the Curriculum Vitae of Sameera Madushan, showcasing work experience, skills, projects, and achievements.",
    images: [`${siteUrl}/images/og-cover.png`],
  },
}

export default function CurriculumVitaePage() {
  return (
    <section className="pb-24 pt-24 sm:pt-40">
      <div className="mx-auto max-w-3xl px-4 sm:px-0">

        <AnimatedSection delay={0}>
          <h1 className="title mb-8 sm:mb-12 text-2xl sm:text-3xl">
            Curriculum Vitae
          </h1>
        </AnimatedSection>

        <AnimatedSection delay={0.2}>
          <p className="mb-8 text-sm sm:text-base text-justify text-gray-700 dark:text-neutral-300">
            I’m Sameera Madushan, a self-taught software engineer based in Pannala,
            Sri Lanka. I create meaningful software solutions, combining my
            passion for coding, cybersecurity, and problem-solving with a
            dedication to continuous learning and innovation.
          </p>
        </AnimatedSection>

        <AnimatedSection delay={0.3}>
          <Skills />
        </AnimatedSection>

        <AnimatedSection delay={0.4}>
          <Experience />
        </AnimatedSection>

        <AnimatedSection delay={0.4}>
          <Education />
        </AnimatedSection>

        <AnimatedSection delay={0.5}>
          <CVProjects />
        </AnimatedSection>

        <AnimatedSection delay={0.6}>
          <CVPosts />
        </AnimatedSection>
      </div>
    </section>
  );
}