'use client'

import { z } from 'zod'
import Link from 'next/link'
import { toast } from 'sonner'
import { SubmitHandler, useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { ContactFormSchema } from '@/schemas/contact-form-schema'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { sendEmail } from '@/lib/actions'
import { Toaster } from "@/components/ui/sonner"
import Script from 'next/script'
import { useState } from 'react'

type Inputs = z.infer<typeof ContactFormSchema>

export default function ContactForm() {
  const siteKey = process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY
  const [widgetId, setWidgetId] = useState<string | null>(null)

  const {
    register,
    handleSubmit,
    setValue,
    reset,
    watch,
    formState: { errors, isSubmitting }
  } = useForm<Inputs>({
    resolver: zodResolver(ContactFormSchema),
    defaultValues: {
      name: '',
      email: '',
      message: '',
      cfTurnstileResponse: '',
    }
  })

  const turnstileToken = watch('cfTurnstileResponse')

  const processForm: SubmitHandler<Inputs> = async data => {
    const result = await sendEmail(data)

    if (result?.error) {
      console.log(result.error)
      toast.error('An error occurred! Please try again.')
      return
    }

    toast.success('Message sent successfully!')
    reset()

    if (window.turnstile && widgetId) {
      window.turnstile.reset(widgetId)
      setValue('cfTurnstileResponse', '')
    }
  }

  return (
    <>
      <Script
        src="https://challenges.cloudflare.com/turnstile/v0/api.js"
        strategy="afterInteractive"
        onLoad={() => {
          if (window.turnstile && !widgetId) {
            const id = window.turnstile.render('#cf-turnstile', {
              sitekey: siteKey!,
              callback: token =>
                setValue('cfTurnstileResponse', token, { shouldValidate: true }),
            })
            setWidgetId(id)
          }
        }}
      />

      <section className='relative isolate'>
        <Toaster />
        <div className='relative'>
          <form
            onSubmit={handleSubmit(processForm)}
            className='mt-16 lg:flex-auto'
            noValidate
          >
            <div className='grid grid-cols-1 gap-6 sm:grid-cols-2'>
              {/* Name */}
              <div>
                <Input
                  id='name'
                  type='text'
                  placeholder='Your Name'
                  autoComplete='given-name'
                  {...register('name')}
                />
                {errors.name?.message && (
                  <p className='ml-1 mt-2 text-sm text-rose-400'>
                    {errors.name.message}
                  </p>
                )}
              </div>

              {/* Email */}
              <div>
                <Input
                  type='email'
                  id='email'
                  autoComplete='email'
                  placeholder='Your Email'
                  {...register('email')}
                />
                {errors.email?.message && (
                  <p className='ml-1 mt-2 text-sm text-rose-400'>
                    {errors.email.message}
                  </p>
                )}
              </div>

              {/* Message */}
              <div className='sm:col-span-2'>
                <Textarea
                  rows={4}
                  placeholder='Message'
                  {...register('message')}
                />
                {errors.message?.message && (
                  <p className='ml-1 mt-2 text-sm text-rose-400'>
                    {errors.message.message}
                  </p>
                )}
              </div>

              {/* Turnstile Widget */}
              <div id="cf-turnstile"></div>
            </div>

            <div className='mt-6'>
              <Button
                type='submit'
                disabled={isSubmitting || !turnstileToken}
                className='w-full disabled:opacity-50'
              >
                {isSubmitting ? 'Submitting...' : 'Submit'}
              </Button>
            </div>

            <p className='mt-4 text-xs text-muted-foreground'>
              By submitting this form, I agree to the{' '}
              <Link href='/privacy' className='font-bold'>
                privacy&nbsp;policy.
              </Link>
            </p>
          </form>
        </div>
      </section>
    </>
  )
}
