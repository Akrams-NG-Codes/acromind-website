'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'

interface BlogFormProps {
  id?: string
}

export default function BlogForm({ id }: BlogFormProps) {
  const [formData, setFormData] = useState({
    title: '',
    slug: '',
    description: '',
    content: '',
    author: '',
    featured_image_url: '',
    is_published: false,
    published_at: '',
  })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [imageUploading, setImageUploading] = useState(false)
  const router = useRouter()

  useEffect(() => {
    if (id) {
      fetchPost()
    }
  }, [id])

  const fetchPost = async () => {
    try {
      const response = await fetch(`/api/blog/${id}`)
      if (!response.ok) throw new Error('Failed to fetch post')
      const data = await response.json()
      setFormData({
        ...data,
        published_at: data.published_at ? data.published_at.split('T')[0] : '',
      })
    } catch (err) {
      setError('Failed to load post')
    }
  }

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    setImageUploading(true)
    try {
      const formDataForUpload = new FormData()
      formDataForUpload.append('file', file)

      const response = await fetch('/api/upload', { method: 'POST', body: formDataForUpload })
      if (!response.ok) throw new Error('Upload failed')

      const { url } = await response.json()
      setFormData({ ...formData, featured_image_url: url })
    } catch (err) {
      setError('Failed to upload image')
    } finally {
      setImageUploading(false)
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
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
      const url = id ? `/api/blog/${id}` : '/api/blog'
      const method = id ? 'PATCH' : 'POST'

      const submitData = {
        ...formData,
        published_at: formData.is_published && formData.published_at
          ? new Date(formData.published_at).toISOString()
          : null,
      }

      const response = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(submitData),
      })

      if (!response.ok) throw new Error('Failed to save post')

      router.push('/admin/blog')
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to save post')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <Link href="/admin/blog" className="text-blue-600 hover:text-blue-800 mb-2 block">
            ← Back to Blog
          </Link>
          <h1 className="text-3xl font-bold text-gray-900">{id ? 'Edit Post' : 'Create Post'}</h1>
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
                <label className="block text-sm font-medium text-gray-700 mb-2">Slug</label>
                <input
                  type="text"
                  name="slug"
                  value={formData.slug}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Author</label>
                <input
                  type="text"
                  name="author"
                  value={formData.author}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Publish Date</label>
                <input
                  type="date"
                  name="published_at"
                  value={formData.published_at}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                />
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
              <label className="block text-sm font-medium text-gray-700 mb-2">Content</label>
              <textarea
                name="content"
                value={formData.content}
                onChange={handleChange}
                rows={10}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none font-mono text-sm"
                placeholder="Write your blog post content here..."
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Featured Image</label>
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-6">
                <input
                  type="file"
                  accept="image/*,.heic,.heif,.avif,.webp"
                  onChange={handleImageUpload}
                  disabled={imageUploading}
                  className="w-full"
                />
                {imageUploading && <p className="text-sm text-gray-600 mt-2">Uploading...</p>}
                {formData.featured_image_url && (
                  <div className="mt-4">
                    <img src={formData.featured_image_url} alt="Featured" className="max-w-xs rounded-lg" />
                  </div>
                )}
              </div>
            </div>

            <div>
              <label className="flex items-center">
                <input
                  type="checkbox"
                  name="is_published"
                  checked={formData.is_published}
                  onChange={handleChange}
                  className="w-4 h-4 text-blue-600 border-gray-300 rounded"
                />
                <span className="ml-2 text-sm text-gray-700">Publish this post</span>
              </label>
            </div>

            <div className="flex gap-4 pt-6">
              <button
                type="submit"
                disabled={loading}
                className="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 rounded disabled:opacity-50"
              >
                {loading ? 'Saving...' : 'Save Post'}
              </button>
              <Link
                href="/admin/blog"
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
