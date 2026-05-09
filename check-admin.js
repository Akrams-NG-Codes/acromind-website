import { config } from 'dotenv'
import { createClient } from '@supabase/supabase-js'

config({ path: '.env.local' })

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
)

async function checkAdminUsers() {
  console.log('Checking admin users...')

  try {
    // Try to list users (requires service role key)
    const { data, error } = await supabase.auth.admin.listUsers()

    if (error) {
      console.error('Error listing users:', error.message)
      console.log('Note: This requires SUPABASE_SERVICE_ROLE_KEY in .env.local')
      return
    }

    console.log('Found users:')
    data.users.forEach(user => {
      console.log(`- Email: ${user.email}`)
      console.log(`  Confirmed: ${!!user.email_confirmed_at}`)
      console.log(`  Metadata:`, user.user_metadata)
      console.log(`  App Metadata:`, user.app_metadata)
      console.log('---')
    })
  } catch (err) {
    console.error('Failed to check users:', err)
  }
}

checkAdminUsers()