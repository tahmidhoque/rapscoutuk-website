/// <reference types="vite/client" />

interface ImportMetaEnv {
  /** Optional fallback: POST JSON { email } when Mailchimp env is not set */
  readonly VITE_NEWSLETTER_ENDPOINT?: string
  /** Mailchimp datacenter, e.g. `us21` from admin / embed URL */
  readonly VITE_MAILCHIMP_DC?: string
  /** Mailchimp user id (`u` query param on embed form action) */
  readonly VITE_MAILCHIMP_U?: string
  /** Mailchimp audience / list id (`id` query param on embed form action) */
  readonly VITE_MAILCHIMP_AUDIENCE_ID?: string
  /** Only if your embed includes a hidden `f_id` field */
  readonly VITE_MAILCHIMP_F_ID?: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
