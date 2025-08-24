import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import { Post, PostMetadata } from '@/types/posts'

const rootDirectory = path.join(process.cwd(), 'content', 'posts')

export async function getPostBySlug(slug: string, lang = 'en'): Promise<Post | null> {
  try {
    const filePath = path.join(rootDirectory, slug, `${lang}.mdx`)
    const fileContent = fs.readFileSync(filePath, { encoding: 'utf8' })
    const { data, content } = matter(fileContent)
    return { metadata: { ...data, slug, lang }, content }
  } catch {
    return null
  }
}

export async function getPosts(limit?: number): Promise<PostMetadata[]> {
  const slugs = fs.readdirSync(rootDirectory).filter((file) =>
    fs.statSync(path.join(rootDirectory, file)).isDirectory()
  )

  const posts = slugs
    .map((slug) => {
      const filePath = path.join(rootDirectory, slug, 'en.mdx')
      if (!fs.existsSync(filePath)) return null

      const fileContent = fs.readFileSync(filePath, 'utf8')
      const { data } = matter(fileContent)
      return { ...data, slug, lang: 'en' } as PostMetadata
    })
    .filter((post): post is PostMetadata => post !== null)
    .sort((a, b) => {
      return new Date(b.publishedAt ?? '').getTime() - new Date(a.publishedAt ?? '').getTime()
    })

  if (limit) return posts.slice(0, limit)
  return posts
}

export function getPostMetadata(slug: string, lang = 'en'): PostMetadata {
  const filePath = path.join(rootDirectory, slug, `${lang}.mdx`)
  const fileContent = fs.readFileSync(filePath, { encoding: 'utf8' })
  const { data } = matter(fileContent)
  return { ...data, slug, lang }
}
