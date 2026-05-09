import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

let supabaseClient: any = null

export const supabase = (() => {
  if (!supabaseClient) {
    if (!supabaseUrl || !supabaseAnonKey) {
      if (typeof window === 'undefined') {
        // Server-side build time - create a dummy client to avoid build errors
        console.warn('Supabase environment variables not available during build - using dummy client')
        supabaseClient = createClient('https://dummy.supabase.co', 'dummy-key')
      } else {
        // Client-side - this should not happen in production
        throw new Error('Missing Supabase environment variables')
      }
    } else {
      supabaseClient = createClient(supabaseUrl, supabaseAnonKey)
    }
  }
  return supabaseClient
})()
