/**
 * Mailchimp embedded-audience signup from the browser via JSONP.
 * Uses the same public values as the official embed form (u, id, datacenter).
 * @see https://mailchimp.com/help/add-a-signup-form-to-your-website/
 */

export type MailchimpJsonPayload = {
  result: 'success' | 'error'
  /** Often HTML; strip before showing inline */
  msg: string
}

export type MailchimpSubscribeConfig = {
  /** Datacenter subdomain, e.g. `us21` from `https://us21.list-manage.com/...` */
  dc: string
  /** `u` value from the embed form action URL */
  u: string
  /** `id` value (audience / list id) from the embed form */
  audienceId: string
  /** Optional `f_id` if your embed includes a hidden `f_id` field */
  fId?: string
}

/** Remove basic HTML tags from Mailchimp messages for safe plain-text display */
export function stripMailchimpHtml(msg: string) {
  return msg
    .replace(/<[^>]+>/g, ' ')
    .replace(/\s+/g, ' ')
    .trim()
}

/**
 * Subscribes an email to the audience. Resolves with Mailchimp’s payload
 * (check `result === 'success'`). Rejects on network / timeout only.
 */
export function subscribeMailchimpJsonp(
  email: string,
  config: MailchimpSubscribeConfig,
): Promise<MailchimpJsonPayload> {
  const { dc, u, audienceId, fId } = config
  const dcClean = dc.trim().toLowerCase().replace(/[^a-z0-9]/g, '')
  if (!dcClean) {
    return Promise.reject(new Error('Invalid Mailchimp datacenter'))
  }

  return new Promise((resolve, reject) => {
    const cb = `mailchimp_jsonp_${Date.now()}_${Math.random().toString(36).slice(2)}`
    const params = new URLSearchParams({
      u: u.trim(),
      id: audienceId.trim(),
      EMAIL: email.trim(),
      c: cb,
    })
    if (fId?.trim()) {
      params.set('f_id', fId.trim())
    }

    const url = `https://${dcClean}.list-manage.com/subscribe/post-json?${params.toString()}`
    const script = document.createElement('script')
    const timeoutMs = 20_000
    const timeoutId = window.setTimeout(() => {
      cleanup()
      reject(new Error('Request timed out'))
    }, timeoutMs)

    function cleanup() {
      window.clearTimeout(timeoutId)
      Reflect.deleteProperty(window, cb)
      script.remove()
    }

    ;(window as unknown as Record<string, (data: MailchimpJsonPayload) => void>)[cb] = (
      data,
    ) => {
      cleanup()
      resolve(data)
    }

    script.onerror = () => {
      cleanup()
      reject(new Error('Network error'))
    }

    script.src = url
    document.body.appendChild(script)
  })
}
