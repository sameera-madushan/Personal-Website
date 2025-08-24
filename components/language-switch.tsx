'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Skeleton } from "@/components/ui/skeleton"
import { Languages } from 'lucide-react'

export default function LanguageToggle({ slug, currentLang }: { slug: string; currentLang: string }) {
  const router = useRouter()
  const [enabled, setEnabled] = useState(currentLang === 'si')
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  useEffect(() => {
    if (!mounted) return
    const lang = enabled ? 'si' : 'en'
    router.push(`/posts/${lang}/${slug}`)
  }, [enabled, slug, router, mounted])

  if (!mounted) {
    return <Skeleton className="h-9 w-9 rounded-md" />
  }

  return (
    <Button
      size="sm"
      variant="ghost"
      onClick={() => setEnabled(!enabled)}
    >
      <Languages />
      <span className="sr-only">Toggle language</span>
    </Button>
  )
}
