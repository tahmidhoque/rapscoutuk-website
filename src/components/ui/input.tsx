import * as React from 'react'

import { cn } from '@/lib/utils'

function Input({ className, type, ...props }: React.ComponentProps<'input'>) {
  return (
    <input
      type={type}
      className={cn(
        'flex h-14 w-full min-w-0 rounded-lg border border-ink/15 bg-ink/[0.06] px-4 text-base text-ink transition-[border-color,box-shadow] outline-none md:text-lg',
        'placeholder:text-dim',
        'focus-visible:border-signal focus-visible:ring-2 focus-visible:ring-signal/40',
        'disabled:cursor-not-allowed disabled:opacity-45',
        'aria-invalid:border-signal aria-invalid:ring-signal/30',
        className,
      )}
      {...props}
    />
  )
}

export { Input }
