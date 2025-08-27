import Intro from "@/components/intro"
import RecentPosts from '@/components/recent-posts'
import RecentProjects from '@/components/recent-projects'
import AnimatedSection from "@/components/animated-section"

export default function Home(){
  return (
    <section className="py-24">
      <div className="mx-auto max-w-3xl px-4">
        <AnimatedSection delay={0}>
          <Intro />
        </AnimatedSection>
        <AnimatedSection delay={0.1}>
          <RecentPosts />
        </AnimatedSection>
        <AnimatedSection delay={0.2}>
          <RecentProjects />
        </AnimatedSection>
      </div>
    </section>
  )
}