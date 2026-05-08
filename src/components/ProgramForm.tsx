'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'

interface ProgramFormProps {
  id?: string
}

export default function ProgramForm({ id }: ProgramFormProps) {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    highlights: JSON.stringify([]),
    icon: '',
    order_index: 0,
    is_active: true,
  })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const router = useRouter()

  useEffect(() => {
    if (id) {
      fetchProgram()
    }
  }, [id])

  const fetchProgram = async () => {
    try {
      const response = await fetch(`/api/programs/${id}`)
      if (!response.ok) throw new Error('Failed to fetch program')
      const data = await response.json()
      setFormData({
        ...data,
        highlights: JSON.stringify(data.highlights || []),
      })
    } catch (err) {
      setError('Failed to load program')
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : value,
    })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setLoading(true)

    try {
      const url = id ? `/api/programs/${id}` : '/api/programs'
      const method = id ? 'PATCH' : 'POST'

      const submitData = {
        ...formData,
        highlights: JSON.parse(formData.highlights),
        order_index: parseInt(formData.order_index.toString()),
      }

      const response = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(submitData),
      })

      if (!response.ok) throw new Error('Failed to save program')

      router.push('/admin/programs')
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to save program')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <Link href="/admin/programs" className="text-blue-600 hover:text-blue-800 mb-2 block">
            ← Back to Programs
          </Link>
          <h1 className="text-3xl font-bold text-gray-900">{id ? 'Edit Program' : 'Create Program'}</h1>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 py-12">
        <div className="bg-white rounded-lg shadow p-8">
          {error && (
            <div className="mb-6 p-4 bg-red-100 border border-red-400 text-red-700 rounded">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Title</label>
                <input
                  type="text"
                  name="title"
                  value={formData.title}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Icon</label>
                <input
                  type="text"
                  name="icon"
                  value={formData.icon}
                  onChange={handleChange}
                  placeholder="e.g., Users, Sparkles, Shield, Star"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Order Index</label>
                <input
                  type="number"
                  name="order_index"
                  value={formData.order_index}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                />
              </div>

              <div className="flex items-end">
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    name="is_active"
                    checked={formData.is_active}
                    onChange={handleChange}
                    className="w-4 h-4 text-blue-600 border-gray-300 rounded"
                  />
                  <span className="ml-2 text-sm text-gray-700">Active</span>
                </label>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                rows={4}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Highlights (JSON array)</label>
              <textarea
                name="highlights"
                value={formData.highlights}
                onChange={handleChange}
                rows={3}
                placeholder='["Highlight 1", "Highlight 2"]'
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none font-mono text-sm"
              />
              <p className="mt-2 text-sm text-gray-600">Enter highlights as a JSON array</p>
            </div>

            <div className="flex gap-4 pt-6">
              <button
                type="submit"
                disabled={loading}
                className="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 rounded disabled:opacity-50"
              >
                {loading ? 'Saving...' : 'Save Program'}
              </button>
              <Link
                href="/admin/programs"
                className="flex-1 bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 rounded text-center"
              >
                Cancel
              </Link>
            </div>
          </form>
        </div>
      </main>
    </div>
  )
}
