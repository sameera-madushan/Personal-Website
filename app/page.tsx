import Intro from "@/components/intro"
import RecentPosts from '@/components/recent-posts'
import RecentProjects from '@/components/recent-projects'

export default function Home(){
  return (
    <section className="py-24">
      <div className="mx-auto max-w-3xl px-4">
        <Intro />
        <RecentPosts />
        <RecentProjects />
      </div>
    </section>
  )
}