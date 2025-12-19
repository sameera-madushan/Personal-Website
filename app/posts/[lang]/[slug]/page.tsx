import Link from 'next/link'
import Image from 'next/image'
import type { Metadata } from "next"
import { Props } from '@/types/posts'
import { formatDate } from '@/lib/utils'
import { notFound } from 'next/navigation'
import Comments from '@/components/comments';
import MDXContent from '@/components/mdx-content'
import { getPosts, getPostBySlug } from '@/lib/posts'
import { ArrowLeftIcon } from '@radix-ui/react-icons'
import LanguageSwitch from '@/components/language-switch'
import AnimatedSection from '@/components/animated-section'
import LightboxWrapper from "@/components/lightbox-wrapper"

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL!

export async function generateStaticParams() {
  const posts = await getPosts()
  const langs = ['en', 'si']

  const params = posts.flatMap(post => 
    langs.map(lang => ({ slug: post.slug, lang }))
  )

  return params
}
export async function generateMetadata({ params }: Props): Promise<Metadata> {

  const { slug, lang } = await params
  const post = await getPostBySlug(slug, lang)

  if (!post) {
    return {
      title: "Post Not Found",
      description: "This post could not be found."
    }
  }

  const { title, summary, image } = post.metadata

  return {
    title,
    description: summary,
    metadataBase: new URL(siteUrl),
    alternates: {
      canonical: `/posts/${lang}/${slug}`,
    },
    openGraph: {
      title,
      type: "article",
      description: summary,
      url: `${siteUrl}/posts/${lang}/${slug}`,
      images: image ? [`${siteUrl}${image}`] : [],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description: summary,
      images: image ? [`${siteUrl}${image}`] : [],
    },
  }
}


export default async function Post({ params }: Props ) {

  const { slug, lang } = await params
  const post = await getPostBySlug(slug, lang)

  if (!post) {
    notFound()
  }

  const { metadata, content } = post
  const { title, image, author, publishedAt, summary, updatedAt } = metadata

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: title,
    author: author,
    datePublished: publishedAt,
    description: summary,
    image: image ? [`${siteUrl}${image}`] : [],
    mainEntityOfPage: `${siteUrl}/posts/${lang}/${slug}`,
  }

  return (
    <section className='pb-24 pt-32'>
      <div className='mx-auto max-w-3xl px-4'>

        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(jsonLd).replace(/</g, '\\u003c'),
          }}
        />

        <Link
          href='/posts'
          className='mb-8 inline-flex items-center gap-2 text-sm font-light text-muted-foreground transition-colors hover:text-foreground'
        >
          <ArrowLeftIcon className='h-5 w-5' />
          <span>Back to posts</span>
        </Link>

        <AnimatedSection delay={0}>
          {image && (
            <div className='relative mb-6 h-96 w-full overflow-hidden rounded-lg'>
              <Image
                src={`${image}?v=${new Date(updatedAt!).getTime()}`}
                alt={title || ''}
                className='object-cover'
                fill
              />
            </div>
          )}
        </AnimatedSection>

        <AnimatedSection delay={0.1}>
          <header className="flex items-center justify-between mt-6">
            <h1 className='title'>{title}</h1>
            <LanguageSwitch slug={slug} currentLang={lang} />
          </header>

          <p className='mt-3 text-xs text-muted-foreground'>
            {author} / {formatDate(publishedAt ?? '')}
          </p>
        </AnimatedSection>

        <AnimatedSection delay={0.2}>
          <main className='prose mt-16 dark:prose-invert'>
            <MDXContent source={content} />
          </main>
        </AnimatedSection>

        <LightboxWrapper />

        <Comments />
      </div>
    </section>
  )
}
