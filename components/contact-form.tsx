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
import { useEffect, useRef, useState } from 'react'

type Inputs = z.infer<typeof ContactFormSchema>

export default function ContactForm() {
  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors, isSubmitting }
  } = useForm<Inputs>({
    resolver: zodResolver(ContactFormSchema),
    defaultValues: {
      name: '',
      email: '',
      message: '',
      cfTurnstileResponse: ''
    }
  });

  const turnstileRef = useRef<HTMLDivElement>(null);
  const [turnstileLoaded, setTurnstileLoaded] = useState(false);
  const [turnstileWidgetId, setTurnstileWidgetId] = useState<string | null>(null);

  useEffect(() => {
    if (!document.getElementById('cf-turnstile-script')) {
      const script = document.createElement('script');
      script.id = 'cf-turnstile-script';
      script.src = 'https://challenges.cloudflare.com/turnstile/v0/api.js';
      script.async = true;
      script.onload = () => setTurnstileLoaded(true);
      document.head.appendChild(script);
    } else {
      setTurnstileLoaded(true);
    }

    return () => {
      if (turnstileWidgetId && window.turnstile) {
        window.turnstile.remove(turnstileWidgetId);
      }
    };
  }, [turnstileWidgetId]);

  useEffect(() => {
    if (turnstileLoaded && turnstileRef.current && !turnstileWidgetId) {
      const widgetId = window.turnstile.render(turnstileRef.current, {
        sitekey: process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY!,
        callback: (token: string) => {
          setValue('cfTurnstileResponse', token);
        },
        'expired-callback': () => {
          setValue('cfTurnstileResponse', '');
          if (turnstileWidgetId) {
            window.turnstile.reset(turnstileWidgetId);
          }
        },
        'error-callback': () => {
          setValue('cfTurnstileResponse', '');
        }
      });
      setTurnstileWidgetId(widgetId);
    }
  }, [turnstileLoaded, setValue, turnstileWidgetId]);

  const processForm: SubmitHandler<Inputs> = async data => {
    const result = await sendEmail(data);

    if (result?.error) {
      toast.error('An error occurred! Please try again.');
      if (turnstileWidgetId && window.turnstile) {
        window.turnstile.reset(turnstileWidgetId);
      }
      return;
    }

    toast.success('Message sent successfully!');
    reset();
    if (turnstileWidgetId && window.turnstile) {
      window.turnstile.reset(turnstileWidgetId);
    }
  }

  return (
    <section className='relative isolate'>
      <Toaster />
      {/* Form */}
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
            <div className='sm:col-span-2'>
              <div ref={turnstileRef} />
              <input type="hidden" {...register('cfTurnstileResponse')} />
              {errors.cfTurnstileResponse?.message && (
                <p className='ml-1 mt-2 text-sm text-rose-400'>
                  {errors.cfTurnstileResponse.message}
                </p>
              )}
            </div>
          </div>
          <div className='mt-6'>
            <Button
              type='submit'
              disabled={isSubmitting || !turnstileLoaded}
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
  )
}