'use client'

import { useState } from 'react'
import { PostMetadata } from '@/types/posts'

import Posts from '@/components/posts'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Cross2Icon } from '@radix-ui/react-icons'

export default function PostsWithSearch({ posts }: { posts: PostMetadata[] }) {
  const [query, setQuery] = useState('')
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null)

  const allCategories = Array.from(
    new Set(posts.flatMap(post => post.categories ?? []))
  )

  const filtered = posts.filter(post => {
    const matchesQuery = post.title?.toLowerCase().includes(query.toLowerCase())
    const matchesCategory = selectedCategory ? post.categories?.includes(selectedCategory) : true
    return matchesQuery && matchesCategory
  })

  const isFiltered = query.length > 0 || selectedCategory !== null

  function resetFilter() {
    setQuery('')
    setSelectedCategory(null)
  }

  return (
    <div>
      <div className='mb-4 flex items-center gap-3'>
        <Input
          type='text'
          placeholder='Search posts...'
          className='h-9 w-full sm:w-1/2'
          value={query}
          onChange={e => setQuery(e.target.value)}
        />
        {isFiltered && (
          <Button
            size='sm'
            variant='secondary'
            onClick={resetFilter}
            className='h-8 px-2 lg:px-3'
          >
            Reset
            <Cross2Icon className='ml-2 h-4 w-4' />
          </Button>
        )}
      </div>

      <div className='mb-6 flex flex-wrap gap-2'>
        {allCategories.map(category => (
          <Button
            key={category}
            size='sm'
            variant={selectedCategory === category ? 'default' : 'outline'}
            onClick={() =>
              setSelectedCategory(selectedCategory === category ? null : category)
            }
          >
            {category}
          </Button>
        ))}
      </div>

      <Posts posts={filtered} />
    </div>
  )
}
