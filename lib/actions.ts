'use server'

import { z } from 'zod'
import { Resend } from 'resend'
import { ContactFormSchema } from '@/schemas/contact-form-schema'
import { ContactFormEmail } from '@/emails/contact-form-email'

type ContactFormInputs = z.infer<typeof ContactFormSchema>

const resend = new Resend(process.env.RESEND_API_KEY)

export async function sendEmail(data: ContactFormInputs) {

  const result = ContactFormSchema.safeParse(data)

  if (!result.success) {
    return { error: result.error.format() }
  }

  const { name, email, message, cfTurnstileResponse } = result.data

  // Verify Turnstile token
  const turnstileData = new URLSearchParams()
  turnstileData.append('secret', process.env.TURNSTILE_SECRET_KEY!)
  turnstileData.append('response', cfTurnstileResponse)

  try {
    const turnstileResponse = await fetch(
      'https://challenges.cloudflare.com/turnstile/v0/siteverify',
      {
        method: 'POST',
        body: turnstileData,
      }
    )

    const turnstileResult = await turnstileResponse.json()
    if (!turnstileResult.success) {
      return { error: 'CAPTCHA verification failed' }
    }

    const emailComponent = ContactFormEmail({ name, email, message })

    await resend.emails.send({
      from: 'hello@sameeramadushan.me',
      to: ['sameera.xyz.me@gmail.com'],
      subject: 'Contact Form Submission',
      react: emailComponent,
    })

    return { success: true }
  } catch (error: unknown) {
    let errorMessage = 'Failed to send email'

    if (error instanceof Error) {
      errorMessage = error.message
    }

    return { error: errorMessage }
  }
}
