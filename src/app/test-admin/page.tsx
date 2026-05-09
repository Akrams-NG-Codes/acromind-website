'use client'

import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabase'

export default function TestAdmin() {
  const [user, setUser] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [settingRole, setSettingRole] = useState(false)

  useEffect(() => {
    checkUser()
  }, [])

  const checkUser = async () => {
    const { data: { user }, error } = await supabase.auth.getUser()
    setUser(user)
    setLoading(false)
    console.log('Current user:', user)
    console.log('User metadata:', user?.user_metadata)
    console.log('App metadata:', user?.app_metadata)
  }

  const setAdminRole = async () => {
    if (!user?.email) return

    setSettingRole(true)
    try {
      const response = await fetch('/api/admin/set-role', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: user.email })
      })

      const result = await response.json()

      if (response.ok) {
        alert('Admin role set successfully! Try logging in again.')
        await checkUser() // Refresh user data
      } else {
        alert('Error: ' + result.error)
      }
    } catch (err) {
      alert('Error setting admin role')
    } finally {
      setSettingRole(false)
    }
  }

  if (loading) return <div className="p-8">Loading...</div>

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-4">Admin User Test</h1>
      {user ? (
        <div className="space-y-4">
          <div>
            <p><strong>Email:</strong> {user.email}</p>
            <p><strong>Confirmed:</strong> {user.email_confirmed_at ? 'Yes' : 'No'}</p>
            <p><strong>User Metadata:</strong></p>
            <pre className="bg-gray-100 p-2 rounded text-sm">{JSON.stringify(user.user_metadata, null, 2)}</pre>
            <p><strong>App Metadata:</strong></p>
            <pre className="bg-gray-100 p-2 rounded text-sm">{JSON.stringify(user.app_metadata, null, 2)}</pre>
            <p><strong>Is Admin:</strong> {user?.user_metadata?.role === 'admin' || user?.app_metadata?.role === 'admin' ? 'Yes' : 'No'}</p>
          </div>

          {(!user?.user_metadata?.role || user.user_metadata.role !== 'admin') && (
            <div>
              <button
                onClick={setAdminRole}
                disabled={settingRole}
                className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 disabled:opacity-50"
              >
                {settingRole ? 'Setting...' : 'Set Admin Role'}
              </button>
            </div>
          )}
        </div>
      ) : (
        <p>No user logged in. Please sign in first.</p>
      )}
    </div>
  )
}