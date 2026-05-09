import { Header } from '@/components/Header'
import { Footer } from '@/components/Footer'
import { supabase } from '@/lib/supabase'
import { Users, Sparkles, Shield, Star } from 'lucide-react'
import Link from 'next/link'
import type { ComponentType } from 'react'

export const dynamic = 'force-dynamic'

const iconMap: Record<string, ComponentType<{ className?: string }>> = {
  Users,
  Sparkles,
  Shield,
  Star,
}

async function getPrograms() {
  try {
    const { data, error } = await supabase
      .from('programs')
      .select('*')
      .eq('is_active', true)
      .order('order_index', { ascending: true })

    if (error) {
      console.error('Error fetching programs:', error)
      return []
    }

    return data || []
  } catch (err) {
    console.error('Error:', err)
    return []
  }
}

export default async function ProgramsPage() {
  const programs = await getPrograms()
  return (
    <>
      <Header />
      <main className="bg-white dark:bg-slate-950 text-gray-900 dark:text-gray-100">
        <section className="relative overflow-hidden bg-[url('/images/WhatsApp%20Image%202026-05-09%20at%207.28.28%20AM.jpeg')] bg-cover bg-center py-24">
          <div className="absolute inset-0 bg-black/70" />
          <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center text-white">
            <span className="inline-flex items-center rounded-full bg-sky-600/30 px-4 py-2 text-sm font-semibold uppercase tracking-wide mb-4">
              Our Programs
            </span>
            <h1 className="text-4xl sm:text-5xl font-bold tracking-tight">Our Programs</h1>
            <p className="mt-4 text-lg text-sky-200 max-w-2xl mx-auto">
              Discover how our programs use circus arts to develop skills, build confidence, and strengthen communities.
            </p>
          </div>
        </section>

        <section className="py-16 bg-gray-50 dark:bg-slate-900">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            {programs.length === 0 ? (
              <div className="text-center py-12">
                <p className="text-gray-600 dark:text-gray-400 text-lg">No programs available at the moment.</p>
              </div>
            ) : (
              <div className="grid gap-8">
                {programs.map((program: any) => {
                  const Icon = iconMap[program.icon] || Users
                  return (
                    <div
                      key={program.id}
                      className="grid gap-6 lg:grid-cols-[1fr_2fr] bg-white dark:bg-slate-900 rounded-3xl shadow-sm border border-gray-200 dark:border-gray-800 overflow-hidden"
                    >
                      <div className="p-8 bg-sky-600/5 dark:bg-sky-500/10">
                        <div className="flex items-center gap-3 mb-6">
                          <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-sky-600 text-white">
                            <Icon className="w-6 h-6" />
                          </div>
                          <h2 className="text-xl font-semibold text-gray-900 dark:text-white">{program.title}</h2>
                        </div>
                        <p className="text-gray-600 dark:text-gray-300 leading-7">{program.description}</p>
                      </div>
                      <div className="p-8">
                        <h3 className="text-lg font-semibold mb-4">Key Highlights</h3>
                        <ul className="space-y-3 text-gray-600 dark:text-gray-300">
                          {Array.isArray(program.highlights) && program.highlights.length > 0 ? (
                            program.highlights.map((item: any, idx: number) => (
                              <li key={idx} className="flex items-start gap-3">
                                <span className="mt-1 h-2 w-2 rounded-full bg-sky-600" />
                                <span>{item}</span>
                              </li>
                            ))
                          ) : (
                            <li className="text-gray-500">No highlights added yet</li>
                          )}
                        </ul>
                      </div>
                    </div>
                  )
                })}
              </div>
            )}
          </div>
        </section>

        <section className="py-16 bg-sky-600 text-white">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
            <span className="inline-flex rounded-full bg-white/20 px-3 py-1 text-sm uppercase tracking-wide mb-4">
              Coming Soon
            </span>
            <h2 className="text-3xl font-bold">The Circus Centre</h2>
            <p className="mt-4 text-lg text-sky-100 max-w-3xl mx-auto">
              Our long-term vision is to establish a permanent Circus Center in Uganda where young people can train,
              perform, and thrive in a safe creative community.
            </p>
            <Link
              href="/contact"
              className="mt-8 inline-flex items-center px-6 py-3 bg-white text-sky-700 font-semibold rounded-lg hover:bg-gray-100 transition"
            >
              Join the Movement
              <span className="ml-2">→</span>
            </Link>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
