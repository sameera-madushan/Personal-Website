import { getPosts } from '@/lib/posts'
import { NextRequest } from 'next/server'
import { PostMetadata } from '@/types/posts'

const CONFIG = {
  title: 'My Articles',
  siteUrl: 'https://sameeramadushan.me',
  description: 'Articles by Sameera Madushan',
  lang: 'en-us'
}

const escapeXml = (unsafe: string = '') =>
  unsafe
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;')

export async function GET(_req: NextRequest) {
  const posts: PostMetadata[] = await getPosts()

  const items = posts
    .map((post) => {
      const title = escapeXml(post.title ?? '')
      const description = escapeXml(post.summary ?? '')
      const url = `${CONFIG.siteUrl}/posts/${post.slug}`
      const pubDate = new Date(post.publishedAt).toUTCString()

      return `
      <item>
        <title>${title}</title>
        <link>${url}</link>
        <guid>${url}</guid>
        <description>${description}</description>
        <pubDate>${pubDate}</pubDate>
      </item>`
    })
    .join('\n')

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0">
  <channel>
    <title>${CONFIG.title}</title>
    <link>${CONFIG.siteUrl}</link>
    <description>${CONFIG.description}</description>
    <language>${CONFIG.lang}</language>
${items}
  </channel>
</rss>`

  return new Response(xml, {
    headers: {
      'Content-Type': 'application/rss+xml'
    }
  })
}
