import { getPosts } from '@/lib/posts'
import PostsWithSearch from '@/components/posts-with-search'
import type { Metadata } from 'next'

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL!

export const metadata: Metadata = {
  title: "Posts",
  description: "Read the latest blog posts and articles by Sameera Madushan on software development, modern technologies, and cybersecurity.",
  openGraph: {
    title: "Blog Posts | Sameera Madushan",
    description: "Read the latest blog posts and articles by Sameera Madushan on software development, modern technologies, and cybersecurity.",
    url: `${siteUrl}/posts`,
    images: [`${siteUrl}/images/og-cover.png`],
  },
  twitter: {
    card: "summary_large_image",
    title: "Blog Posts | Sameera Madushan",
    description: "Read the latest blog posts and articles by Sameera Madushan on software development, modern technologies, and cybersecurity.",
    images: [`${siteUrl}/images/og-cover.png`],
  },
}

export default async function PostsPage() {
  const posts = await getPosts()

  return (
    <section className='pb-24 pt-40'>
      <div className='mx-auto max-w-3xl px-4'>
        <h1 className='title mb-12'>Posts</h1>

        <PostsWithSearch posts={posts} />
      </div>
    </section>
  )
}