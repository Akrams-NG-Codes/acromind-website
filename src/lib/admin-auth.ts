import { supabase } from './supabase'

export async function signUpAdmin(email: string, password: string, fullName: string) {
  // Use Supabase Auth for admin signup
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: {
        full_name: fullName,
        role: 'admin',
      },
    },
  })

  return { data, error }
}

export async function signInAdmin(email: string, password: string) {
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  })

  return { data, error }
}

export async function signOutAdmin() {
  const { error } = await supabase.auth.signOut()
  return { error }
}

export async function getCurrentAdmin() {
  const {
    data: { user },
  } = await supabase.auth.getUser()

  return user
}

export async function getAdminSession() {
  const {
    data: { session },
  } = await supabase.auth.getSession()

  return session
}

export async function isAdminLoggedIn() {
  const session = await getAdminSession()
  return !!session
}

export async function isAdminUser(user: any) {
  // Check if user has admin role in metadata
  const hasRole = user?.user_metadata?.role === 'admin' || user?.app_metadata?.role === 'admin'

  // For now, also allow the first user created as admin (temporary fix)
  if (!hasRole && user?.email) {
    console.log('User does not have admin role, checking if we should grant it...')
    // You can manually update user metadata in Supabase dashboard for now
  }

  return hasRole
}
