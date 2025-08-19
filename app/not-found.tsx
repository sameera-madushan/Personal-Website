import Link from 'next/link'
import Image from 'next/image'
import { ArrowLeftIcon } from '@radix-ui/react-icons'

export default function NotFound() {
  return (
    <section className="flex min-h-screen items-center justify-center px-4">
      <div className="text-center">
        <main className="flex flex-col items-center">
          
          <div className="mb-10 w-56 sm:w-72 md:w-80">
            <Image
              src="/images/not-found/dark.svg"
              alt="Not Found Illustration Dark"
              width={320}
              height={320}
              className="block h-auto w-full dark:hidden"
              priority
            />
            <Image
              src="/images/not-found/light.svg"
              alt="Not Found Illustration Light"
              width={320}
              height={320}
              className="hidden h-auto w-full dark:block"
              priority
            />
          </div>

          <p className="text-4xl font-bold tracking-tight text-muted-foreground sm:text-5xl">
            404
          </p>
          <h1 className="mt-4 text-3xl font-bold tracking-tight sm:text-5xl">
            Page not found
          </h1>
          <p className="mt-1 text-base text-muted-foreground">
            That page? Yeah… I ate it too.
          </p>

          <div className="mt-10 flex justify-center">
            <Link
              href="/"
              className="inline-flex items-center gap-3 text-muted-foreground transition-colors hover:text-foreground"
            >
              <ArrowLeftIcon className="h-5 w-5" />
              <span>Go back home</span>
            </Link>
          </div>
        </main>
      </div>
    </section>
  )
}
