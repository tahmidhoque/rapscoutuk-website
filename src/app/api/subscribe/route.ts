import { Resend } from 'resend'
import { NextResponse } from 'next/server'

import { isValidEmail } from '@/lib/emailValidation'

function jsonError(message: string, status: number) {
  return NextResponse.json({ error: message }, { status })
}

/** True when Resend reports the contact already exists in the audience. */
function isDuplicateContactError(err: unknown): boolean {
  if (!err || typeof err !== 'object') return false
  const message =
    'message' in err && typeof (err as { message: unknown }).message === 'string'
      ? (err as { message: string }).message
      : ''
  const name =
    'name' in err && typeof (err as { name: unknown }).name === 'string'
      ? (err as { name: string }).name
      : ''
  const combined = `${name} ${message}`.toLowerCase()
  return (
    combined.includes('already') ||
    combined.includes('duplicate') ||
    combined.includes('exists')
  )
}

export async function POST(request: Request) {
  const apiKey = process.env.RESEND_API_KEY
  const audienceId = process.env.RESEND_AUDIENCE_ID

  if (!apiKey?.trim() || !audienceId?.trim()) {
    return jsonError(
      'Newsletter signup is not available right now. Please try again later.',
      503,
    )
  }

  let body: unknown
  try {
    body = await request.json()
  } catch {
    return jsonError('Invalid request body.', 400)
  }

  if (!body || typeof body !== 'object' || !('email' in body)) {
    return jsonError('Missing email.', 400)
  }

  const email = (body as { email: unknown }).email
  if (typeof email !== 'string' || !isValidEmail(email)) {
    return jsonError('Enter a valid email address.', 400)
  }

  const trimmed = email.trim()
  const resend = new Resend(apiKey)

  const { error } = await resend.contacts.create({
    email: trimmed,
    audienceId: audienceId.trim(),
    unsubscribed: false,
  })

  if (error) {
    if (isDuplicateContactError(error)) {
      return NextResponse.json({ ok: true }, { status: 200 })
    }
    const msg =
      typeof error === 'object' &&
      error !== null &&
      'message' in error &&
      typeof (error as { message: unknown }).message === 'string'
        ? (error as { message: string }).message
        : ''
    return jsonError(
      msg || 'Could not add this email. Please try again.',
      422,
    )
  }

  return NextResponse.json({ ok: true }, { status: 201 })
}
