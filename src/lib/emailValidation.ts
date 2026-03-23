const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

/** Validates a single email address (same rules as the newsletter form). */
export function isValidEmail(value: string): boolean {
  return EMAIL_REGEX.test(value.trim())
}
