import type { NextRequest } from 'next/server'
import createPreprMiddleware from '@preprio/prepr-nextjs/middleware'

export function proxy(request: NextRequest) {
  return createPreprMiddleware(request, { preview: true })
}