'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'

interface Program {
  id: string
  title: string
  icon: string
  is_active: boolean
  order_index: number
}

export default function AdminPrograms() {
  const [programs, setPrograms] = useState<Program[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const router = useRouter()

  useEffect(() => {
    fetchPrograms()
  }, [])

  const fetchPrograms = async () => {
    try {
      const response = await fetch('/api/programs')
      if (!response.ok) throw new Error('Failed to fetch programs')
      const data = await response.json()
      setPrograms(data)
    } catch (err) {
      setError('Failed to load programs')
    } finally {
      setLoading(false)
    }
  }

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this program?')) return

    try {
      const response = await fetch(`/api/programs/${id}`, { method: 'DELETE' })
      if (!response.ok) throw new Error('Failed to delete program')
      setPrograms(programs.filter((p) => p.id !== id))
    } catch (err) {
      setError('Failed to delete program')
    }
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <div className="flex justify-between items-center">
            <div>
              <Link href="/admin/dashboard" className="text-blue-600 hover:text-blue-800 mb-2">
                ← Back to Dashboard
              </Link>
              <h1 className="text-3xl font-bold text-gray-900">Manage Programs</h1>
            </div>
            <Link
              href="/admin/programs/new"
              className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            >
              + New Program
            </Link>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-12">
        {error && (
          <div className="mb-6 p-4 bg-red-100 border border-red-400 text-red-700 rounded">
            {error}
          </div>
        )}

        {loading ? (
          <div className="text-center text-gray-600">Loading programs...</div>
        ) : programs.length === 0 ? (
          <div className="text-center text-gray-600">
            <p>No programs found. Create one to get started!</p>
          </div>
        ) : (
          <div className="bg-white rounded-lg shadow overflow-hidden">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase">
                    Title
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase">
                    Icon
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase">
                    Status
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase">
                    Order
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {programs.map((program) => (
                  <tr key={program.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 text-sm font-medium text-gray-900">{program.title}</td>
                    <td className="px-6 py-4 text-sm text-gray-600">{program.icon}</td>
                    <td className="px-6 py-4 text-sm">
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-semibold ${
                          program.is_active
                            ? 'bg-green-100 text-green-800'
                            : 'bg-gray-100 text-gray-800'
                        }`}
                      >
                        {program.is_active ? 'Active' : 'Inactive'}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-600">{program.order_index}</td>
                    <td className="px-6 py-4 text-sm space-x-2">
                      <Link
                        href={`/admin/programs/${program.id}`}
                        className="text-blue-600 hover:text-blue-800 font-semibold"
                      >
                        Edit
                      </Link>
                      <button
                        onClick={() => handleDelete(program.id)}
                        className="text-red-600 hover:text-red-800 font-semibold"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </main>
    </div>
  )
}
