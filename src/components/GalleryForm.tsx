'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'

interface GalleryFormProps {
  id?: string
}

export default function GalleryForm({ id }: GalleryFormProps) {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    image_url: '',
    category: '',
    order_index: 0,
    is_featured: false,
  })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [imageUploading, setImageUploading] = useState(false)
  const router = useRouter()

  useEffect(() => {
    if (id) {
      fetchItem()
    }
  }, [id])

  const fetchItem = async () => {
    try {
      const response = await fetch(`/api/gallery/${id}`)
      if (!response.ok) throw new Error('Failed to fetch item')
      const data = await response.json()
      setFormData(data)
    } catch (err) {
      setError('Failed to load item')
    }
  }

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    setImageUploading(true)
    setError('')
    try {
      console.log('[GalleryForm] Starting image upload for:', file.name)

      const formDataForUpload = new FormData()
      formDataForUpload.append('file', file)

      const response = await fetch('/api/upload', {
        method: 'POST',
        body: formDataForUpload,
      })

      const responseData = await response.json()
      console.log('[GalleryForm] Upload response:', responseData)

      if (!response.ok) {
        throw new Error(
          responseData.details
            ? `Upload failed: ${responseData.details}`
            : responseData.error || 'Upload failed'
        )
      }

      if (!responseData.url) {
        throw new Error('No URL returned from upload')
      }

      console.log('[GalleryForm] Image URL received:', responseData.url)
      setFormData({ ...formData, image_url: responseData.url })
      setError('')
    } catch (err) {
      const errorMsg = err instanceof Error ? err.message : 'Failed to upload image'
      console.error('[GalleryForm] Upload error:', errorMsg)
      setError(errorMsg)
    } finally {
      setImageUploading(false)
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
      const url = id ? `/api/gallery/${id}` : '/api/gallery'
      const method = id ? 'PATCH' : 'POST'

      const submitData = {
        ...formData,
        order_index: parseInt(formData.order_index.toString()),
      }

      const response = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(submitData),
      })

      if (!response.ok) throw new Error('Failed to save item')

      router.push('/admin/gallery')
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to save item')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <Link href="/admin/gallery" className="text-blue-600 hover:text-blue-800 mb-2 block">
            ← Back to Gallery
          </Link>
          <h1 className="text-3xl font-bold text-gray-900">{id ? 'Edit Image' : 'Add Image'}</h1>
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
                <label className="block text-sm font-medium text-gray-700 mb-2">Category</label>
                <input
                  type="text"
                  name="category"
                  value={formData.category}
                  onChange={handleChange}
                  placeholder="e.g., Workshop, Performance"
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
                    name="is_featured"
                    checked={formData.is_featured}
                    onChange={handleChange}
                    className="w-4 h-4 text-blue-600 border-gray-300 rounded"
                  />
                  <span className="ml-2 text-sm text-gray-700">Featured Image</span>
                </label>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                rows={3}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Image</label>
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-6">
                <input
                  type="file"
                  accept="image/*,.heic,.heif,.avif,.webp"
                  onChange={handleImageUpload}
                  disabled={imageUploading}
                  className="w-full"
                />
                {imageUploading && <p className="text-sm text-gray-600 mt-2">Uploading...</p>}
                {formData.image_url && (
                  <div className="mt-4">
                    <img src={formData.image_url} alt="Gallery" className="max-w-xs rounded-lg" />
                  </div>
                )}
              </div>
            </div>

            <div className="flex gap-4 pt-6">
              <button
                type="submit"
                disabled={loading}
                className="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 rounded disabled:opacity-50"
              >
                {loading ? 'Saving...' : 'Save Image'}
              </button>
              <Link
                href="/admin/gallery"
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
