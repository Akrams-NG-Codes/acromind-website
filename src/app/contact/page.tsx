'use client'

import { Header } from '@/components/Header'
import { Footer } from '@/components/Footer'
import { ORGANIZATION } from '@/lib/constants'
import { useState } from 'react'
import { supabase } from '@/lib/supabase'
import toast from 'react-hot-toast'

export default function ContactPage() {
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' })
  const [loading, setLoading] = useState(false)

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setLoading(true)

    if (!form.name || !form.email || !form.subject || !form.message) {
      toast.error('Please fill in all fields.')
      setLoading(false)
      return
    }

    const { error } = await supabase.from('contact_messages').insert([
      {
        name: form.name,
        email: form.email,
        subject: form.subject,
        message: form.message,
      },
    ])

    if (error) {
      toast.error('Could not send your message. Please try again later.')
    } else {
      toast.success('Message sent! We will respond soon.')
      setForm({ name: '', email: '', subject: '', message: '' })
    }

    setLoading(false)
  }

  return (
    <>
      <Header />
      <main className="bg-white dark:bg-slate-950 text-gray-900 dark:text-gray-100">
        <section className="py-24 bg-slate-900 text-white">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
            <span className="inline-flex items-center rounded-full bg-purple-600/20 px-4 py-2 text-sm font-semibold uppercase tracking-wide mb-4">
              Get In Touch
            </span>
            <h1 className="text-4xl sm:text-5xl font-bold mb-4">Contact Us</h1>
            <p className="mx-auto max-w-2xl text-lg text-purple-200">
              Reach out to us for partnerships, volunteering, or support.
            </p>
          </div>
        </section>

        <section className="py-16 bg-gray-50 dark:bg-slate-900">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 grid gap-12 lg:grid-cols-[1.2fr_1fr]">
            <div className="space-y-8">
              <div className="rounded-3xl bg-white dark:bg-slate-900 border border-gray-200 dark:border-gray-800 p-8 shadow-sm">
                <h2 className="text-2xl font-bold mb-4">Contact Information</h2>
                <p className="text-gray-600 dark:text-gray-300 leading-7 mb-6">
                  We are here to answer your questions and help you connect with our programs.
                </p>
                <div className="space-y-4 text-sm text-gray-700 dark:text-gray-300">
                  <div>
                    <p className="font-semibold">Address</p>
                    <p>{ORGANIZATION.address}</p>
                  </div>
                  <div>
                    <p className="font-semibold">Email</p>
                    <a href={`mailto:${ORGANIZATION.email}`} className="text-purple-600 dark:text-purple-400 hover:underline">
                      {ORGANIZATION.email}
                    </a>
                  </div>
                  <div>
                    <p className="font-semibold">Phone</p>
                    <a href={`tel:${ORGANIZATION.phone}`} className="text-purple-600 dark:text-purple-400 hover:underline">
                      {ORGANIZATION.phone}
                    </a>
                  </div>
                  <div>
                    <p className="font-semibold">WhatsApp</p>
                    <a href={`https://wa.me/${ORGANIZATION.whatsapp.replace(/\D/g, '')}`} target="_blank" rel="noreferrer" className="text-purple-600 dark:text-purple-400 hover:underline">
                      Chat on WhatsApp
                    </a>
                  </div>
                </div>
              </div>
            </div>

            <div className="rounded-3xl bg-white dark:bg-slate-900 border border-gray-200 dark:border-gray-800 p-8 shadow-sm">
              <h2 className="text-2xl font-bold mb-6">Send a Message</h2>
              <form className="space-y-4" onSubmit={handleSubmit}>
                <div className="grid gap-4 sm:grid-cols-2">
                  <label className="block">
                    <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Full Name</span>
                    <input
                      type="text"
                      value={form.name}
                      onChange={(event) => setForm({ ...form, name: event.target.value })}
                      className="mt-2 w-full rounded-2xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-slate-950 px-4 py-3 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-purple-500"
                      placeholder="Your name"
                    />
                  </label>
                  <label className="block">
                    <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Email Address</span>
                    <input
                      type="email"
                      value={form.email}
                      onChange={(event) => setForm({ ...form, email: event.target.value })}
                      className="mt-2 w-full rounded-2xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-slate-950 px-4 py-3 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-purple-500"
                      placeholder="you@example.com"
                    />
                  </label>
                </div>
                <label className="block">
                  <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Subject</span>
                  <input
                    type="text"
                    value={form.subject}
                    onChange={(event) => setForm({ ...form, subject: event.target.value })}
                    className="mt-2 w-full rounded-2xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-slate-950 px-4 py-3 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-purple-500"
                    placeholder="How can we help?"
                  />
                </label>
                <label className="block">
                  <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Message</span>
                  <textarea
                    value={form.message}
                    onChange={(event) => setForm({ ...form, message: event.target.value })}
                    className="mt-2 w-full min-h-[160px] rounded-2xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-slate-950 px-4 py-3 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-purple-500"
                    placeholder="Write your message here..."
                  />
                </label>
                <button
                  type="submit"
                  disabled={loading}
                  className="inline-flex w-full items-center justify-center rounded-2xl bg-purple-600 px-6 py-3 text-white font-semibold hover:bg-purple-700 transition disabled:opacity-60"
                >
                  {loading ? 'Sending...' : 'Send Message'}
                </button>
              </form>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
