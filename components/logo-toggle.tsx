'use client'

import Image from 'next/image'
import { useTheme } from 'next-themes'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import { Skeleton } from "@/components/ui/skeleton"

export default function LogoToggle() {
  const { theme } = useTheme()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return (
      <div className="flex items-center gap-4">
        <Skeleton className="h-[30px] w-[30px] rounded-full" />
      </div>
    )
  }

  return (
    <div className='flex items-center gap-4'>
      <Link href='/' className='inline-block'>
        <Image
          src={theme === 'dark' ? '/images/logos/light.svg' : '/images/logos/dark.svg'}
          alt='Logo'
          width={30}
          height={30}
        />
      </Link>
    </div>
  )
}
