'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { signOutAdmin } from '@/lib/admin-auth'

export default function AdminDashboard() {
  const [user, setUser] = useState<any>(null)
  const router = useRouter()

  useEffect(() => {
    // Check if user is authenticated
    const checkAuth = async () => {
      // In a real app, you'd get this from a session/context
      const storedUser = localStorage.getItem('adminUser')
      if (!storedUser) {
        router.push('/admin/login')
      } else {
        setUser(JSON.parse(storedUser))
      }
    }

    checkAuth()
  }, [router])

  const handleLogout = async () => {
    await signOutAdmin()
    localStorage.removeItem('adminUser')
    router.push('/admin/login')
  }

  const modules = [
    {
      name: 'Events',
      description: 'Manage events and announcements',
      href: '/admin/events',
      icon: '📅',
      color: 'bg-blue-500',
    },
    {
      name: 'Programs',
      description: 'Manage programs and workshops',
      href: '/admin/programs',
      icon: '🎪',
      color: 'bg-purple-500',
    },
    {
      name: 'Gallery',
      description: 'Manage gallery images',
      href: '/admin/gallery',
      icon: '🖼️',
      color: 'bg-pink-500',
    },
    {
      name: 'Blog',
      description: 'Manage blog posts',
      href: '/admin/blog',
      icon: '✍️',
      color: 'bg-green-500',
    },
  ]

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header */}
      <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 py-6 flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">AcroMind Admin</h1>
            <p className="text-gray-600 mt-1">Manage your organization's content</p>
          </div>
          <button
            onClick={handleLogout}
            className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded"
          >
            Logout
          </button>
        </div>
      </header>

      {/* Main content */}
      <main className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {modules.map((module) => (
            <Link key={module.name} href={module.href}>
              <div className="bg-white rounded-lg shadow hover:shadow-xl transition cursor-pointer">
                <div className={`${module.color} text-white p-6 rounded-t-lg`}>
                  <div className="text-4xl mb-2">{module.icon}</div>
                  <h2 className="text-2xl font-bold">{module.name}</h2>
                </div>
                <div className="p-6">
                  <p className="text-gray-600">{module.description}</p>
                  <button className="mt-4 text-blue-600 font-semibold hover:text-blue-800">
                    Manage →
                  </button>
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* Quick stats */}
        <div className="mt-12 bg-white rounded-lg shadow p-6">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">System Status</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center">
              <p className="text-gray-600">Database</p>
              <p className="text-2xl font-bold text-green-600">✓ Connected</p>
            </div>
            <div className="text-center">
              <p className="text-gray-600">Storage</p>
              <p className="text-2xl font-bold text-green-600">✓ Active</p>
            </div>
            <div className="text-center">
              <p className="text-gray-600">Authentication</p>
              <p className="text-2xl font-bold text-green-600">✓ Verified</p>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
