'use server'

import { z } from 'zod'
import { Resend } from 'resend'
import { ContactFormSchema} from '@/schemas/contact-form-schema'
import { ContactFormEmail } from '@/emails/contact-form-email'

type ContactFormInputs = z.infer<typeof ContactFormSchema>

const resend = new Resend(process.env.RESEND_API_KEY)

export async function sendEmail(data: ContactFormInputs) {
  const result = ContactFormSchema.safeParse(data)

  if (result.error) {
    return { error: result.error.format() }
  }

  try {
    const { name, email, message } = result.data
    const emailComponent = ContactFormEmail({ name, email, message });

    const { data, error } = await resend.emails.send({
      from: 'hello@sameeramadushan.me',
      to: ['sameera.xyz.me@gmail.com'],
      subject: 'Contact form submission',
      react: emailComponent
    })

    if (!data || error) {
      throw new Error('Failed to send email')
    }

    return { success: true }
  } catch (error) {
    return { error }
  }
}