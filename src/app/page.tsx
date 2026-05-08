import type { ComponentType } from 'react'
import { Header } from '@/components/Header'
import { Footer } from '@/components/Footer'
import { IMPACT_STATS, PROGRAMS } from '@/lib/constants'
import Link from 'next/link'
import { ArrowRight, Users, Sparkles, Shield, Star } from 'lucide-react'

const iconMap: Record<string, ComponentType<{ className?: string }>> = {
  Users,
  Sparkles,
  Shield,
  Star,
}

export default function Home() {
  return (
    <>
      <Header />
      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative bg-gradient-to-br from-purple-600 to-purple-800 dark:from-purple-900 dark:to-slate-900 text-white py-20 overflow-hidden">
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-0 left-0 w-96 h-96 bg-white rounded-full mix-blend-multiply filter blur-3xl"></div>
            <div className="absolute bottom-0 right-0 w-96 h-96 bg-purple-300 rounded-full mix-blend-multiply filter blur-3xl"></div>
          </div>

          <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl">
              <div className="inline-flex items-center space-x-2 mb-6 bg-white/20 backdrop-blur-md px-4 py-2 rounded-full">
                <span className="w-2 h-2 bg-white rounded-full"></span>
                <span className="text-sm font-medium">Empower Children and Youth</span>
              </div>
              <h1 className="text-5xl sm:text-6xl font-bold mb-6 leading-tight">
                Transforming Lives Through Circus Arts
              </h1>
              <p className="text-xl text-purple-100 mb-8 max-w-2xl">
                We empower children and youth through circus arts, acrobatics, and creative expression. Safe spaces where talents flourish and dreams take flight.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link
                  href="/about"
                  className="inline-flex items-center justify-center px-6 py-3 bg-white text-purple-600 font-semibold rounded-lg hover:bg-gray-100 transition"
                >
                  Learn Our Story
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Link>
                <Link
                  href="/programs"
                  className="inline-flex items-center justify-center px-6 py-3 bg-purple-500 text-white font-semibold rounded-lg hover:bg-purple-700 transition"
                >
                  Our Programs
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Impact Stats */}
        <section className="py-16 bg-white dark:bg-slate-900">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <h2 className="text-center text-3xl font-bold mb-12 text-gray-900 dark:text-white">
              Our Impact
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              {IMPACT_STATS.map((stat, index) => (
                <div key={index} className="text-center">
                  <div className="text-4xl font-bold text-purple-600 dark:text-purple-400 mb-2">
                    {stat.number}
                  </div>
                  <div className="text-gray-600 dark:text-gray-400 font-medium">
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Featured Programs */}
        <section className="py-16 bg-gray-50 dark:bg-slate-800">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <h2 className="text-center text-3xl font-bold mb-4 text-gray-900 dark:text-white">
              Our Programs
            </h2>
            <p className="text-center text-gray-600 dark:text-gray-400 mb-12 max-w-2xl mx-auto">
              Transformative programs designed to develop skills, build confidence, and create lasting change.
            </p>
            <div className="grid md:grid-cols-2 gap-8">
              {PROGRAMS.map((program) => {
                const Icon = iconMap[program.icon]
                return (
                  <div
                    key={program.id}
                    className="bg-white dark:bg-slate-900 rounded-lg shadow-md hover:shadow-lg transition p-6"
                  >
                    <div className="flex items-start space-x-4">
                      <div className="flex-shrink-0">
                        <Icon className="w-8 h-8 text-purple-600 dark:text-purple-400" />
                      </div>
                      <div className="flex-1">
                        <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">
                          {program.title}
                        </h3>
                        <p className="text-gray-600 dark:text-gray-400 text-sm mb-4">
                          {program.description}
                        </p>
                        <ul className="space-y-2">
                          {program.highlights.map((highlight, idx) => (
                            <li key={idx} className="flex items-center text-sm text-gray-600 dark:text-gray-400">
                              <span className="w-1.5 h-1.5 bg-purple-600 dark:bg-purple-400 rounded-full mr-2"></span>
                              {highlight}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>
            <div className="text-center mt-12">
              <Link
                href="/programs"
                className="inline-flex items-center px-6 py-3 bg-purple-600 text-white font-semibold rounded-lg hover:bg-purple-700 transition"
              >
                View All Programs
                <ArrowRight className="w-4 h-4 ml-2" />
              </Link>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 bg-purple-600 dark:bg-purple-900 text-white">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl font-bold mb-4">
              Ready to Support Our Mission?
            </h2>
            <p className="text-purple-100 mb-8 max-w-2xl mx-auto">
              Join us in creating safe spaces where children and youth can discover their potential through creative expression.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/donate"
                className="inline-flex items-center justify-center px-6 py-3 bg-white text-purple-600 font-semibold rounded-lg hover:bg-gray-100 transition"
              >
                Support Us Today
              </Link>
              <Link
                href="/contact"
                className="inline-flex items-center justify-center px-6 py-3 bg-purple-500 text-white font-semibold rounded-lg hover:bg-purple-700 transition"
              >
                Get in Touch
              </Link>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
