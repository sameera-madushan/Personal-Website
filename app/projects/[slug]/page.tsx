import Link from 'next/link'
import Image from 'next/image'
import type { Metadata } from "next"
import type { ReactNode } from 'react'
import { formatDate } from '@/lib/utils'
import { Props } from '@/types/projects'
import { notFound } from 'next/navigation'
import Comments from '@/components/comments';
import MDXContent from '@/components/mdx-content'
import { ArrowLeftIcon } from '@radix-ui/react-icons'
import AnimatedSection from '@/components/animated-section'
import { getProjectBySlug, getProjects } from '@/lib/projects'
import { UsersRound, UserRound, CodeXml, Link as LinkIcon } from 'lucide-react'

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL!

export async function generateStaticParams() {
  const projects = await getProjects()
  const slugs = projects.map(project => ({ slug: project.slug }))

  return slugs
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {

  const { slug } = await params
  const project = await getProjectBySlug(slug)

  if (!project) {
    return {
      title: "Project Not Found",
      description: "This project could not be found."
    }
  }

  const { title, summary, image } = project.metadata

  return {
    title,
    description: summary,
    openGraph: {
      title,
      description: summary,
      url: `${siteUrl}/projects/${slug}`,
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


export default async function Project({ params }: Props ) {

  const { slug } = await params
  const project = await getProjectBySlug(slug)

  if (!project) {
    notFound()
  }

  const { metadata, content } = project
  const { title, image, author, publishedAt, repository, live, type } = metadata

  return (
    <section className='pb-24 pt-32'>
      <div className='mx-auto max-w-3xl px-4'>
        <Link
          href='/projects'
          className='mb-8 inline-flex items-center gap-2 text-sm font-light text-muted-foreground transition-colors hover:text-foreground'
        >
          <ArrowLeftIcon className='h-5 w-5' />
          <span>Back to projects</span>
        </Link>

        <AnimatedSection delay={0}>
          {image && (
            <div className='relative mb-6 h-96 w-full overflow-hidden rounded-lg'>
              <Image
                src={image}
                alt={title || ''}
                className='object-cover'
                fill
              />
            </div>
          )}
        </AnimatedSection>

        <AnimatedSection delay={0.1}>
          <header>
            <h1 className='title'>{title}</h1>
            <p className='mt-3 text-xs text-muted-foreground'>
              {author} / {formatDate(publishedAt ?? '')}
            </p>

            {(repository || live || type) && (
              <div className='mt-2 flex items-center gap-2 text-xs text-muted-foreground'>
                {[
                  live && (
                    <a
                      key="live"
                      href={live}
                      target='_blank'
                      rel='noopener noreferrer'
                      className='hover:text-foreground flex items-center gap-1 transition-colors'
                    >
                      <LinkIcon className='h-5 w-5' />
                      <span>Live Site</span>
                    </a>
                  ),
                  repository && (
                    <a
                      key="repo"
                      href={repository}
                      target='_blank'
                      rel='noopener noreferrer'
                      className='hover:text-foreground flex items-center gap-1 transition-colors'
                    >
                      <CodeXml className='h-5 w-5' />
                      <span>Source Code</span>
                    </a>
                  ),
                  type && (
                    <div key="type" className='flex items-center gap-1'>
                      {type === 'personal' ? (
                        <UserRound className='h-4 w-4' />
                      ) : (
                        <UsersRound className='h-4 w-4' />
                      )}
                      <span>
                        {type === 'personal' ? 'Personal Project' : `Associated with ${type}`}
                      </span>
                    </div>
                  ),
                ]
                .filter(Boolean)
                .reduce((prev, curr, idx) => {
                  if (idx === 0) return [curr];
                  return [...prev, <span key={`sep-${idx}`}>|</span>, curr];
                }, [] as ReactNode[])}
              </div>
            )}


            <hr className='my-7 border-t border-muted-foreground' />
          </header>
        </AnimatedSection>

        <AnimatedSection delay={0.2}>
          <main className='prose mt-7 dark:prose-invert'>
            <MDXContent source={content} />
          </main>
        </AnimatedSection>

        <Comments />
      </div>
    </section>
  )
}