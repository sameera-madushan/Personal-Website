import Image from 'next/image'
import authorImage from '@/public/images/authors/sameera.jpeg'

export default function Intro() {
  return (
    <section className='flex flex-col-reverse items-start gap-x-10 gap-y-4 pb-24 md:flex-row md:items-center'>
      <div className='mt-2 flex-1 md:mt-0'>
        <h1 className='title no-underline'>Hey, I&#39;m Sameera Madushan.</h1>
        <p className='mt-3 font-light text-muted-foreground text-justify'>
          I&#39;m a software engineer based in Pannala, Sri Lanka. I&#39;m
          a self-taught software developer, passionate about coding, 
          cybersecurity, problem-solving, and continuous learning to build impactful software solutions.
        </p>
      </div>
      <div className='relative'>
        <Image
          className='flex-1 rounded-lg grayscale'
          src={authorImage}
          alt='Sameera Madushan'
          width={175}
          height={175}
          priority
        />
      </div>
    </section>
  )
}