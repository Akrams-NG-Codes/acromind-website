import { Header } from '@/components/Header'
import { Footer } from '@/components/Footer'
import Link from 'next/link'
import { CreditCard, Handshake, Gift } from 'lucide-react'

const waysToGive = [
  {
    title: 'Direct Donation',
    icon: CreditCard,
    description: 'One-time or recurring contributions to support workshops, outreach, and program growth.',
  },
  {
    title: 'Corporate Partnership',
    icon: Handshake,
    description: 'Sponsorship, program support, or institutional collaboration for long-term impact.',
  },
  {
    title: 'In-Kind Support',
    icon: Gift,
    description: 'Equipment, materials, and services that help us deliver creative programs safely.',
  },
]

export default function DonatePage() {
  return (
    <>
      <Header />
      <main className="bg-white dark:bg-slate-950 text-gray-900 dark:text-gray-100">
        <section className="py-24 bg-sky-600 text-white">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
            <div className="inline-flex items-center rounded-full bg-white/15 px-4 py-2 text-sm font-semibold uppercase tracking-wide mb-4">
              <span className="mr-2">❤</span>
              Support Our Mission
            </div>
            <h1 className="text-4xl sm:text-5xl font-bold mb-4">Support Our Mission</h1>
            <p className="mx-auto max-w-2xl text-lg text-sky-100">
              Your generosity helps create safe, creative spaces for children and youth in Uganda.
            </p>
          </div>
        </section>

        <section className="py-16 bg-gray-50 dark:bg-slate-900">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="grid gap-6 md:grid-cols-3 mb-12">
              {waysToGive.map((item) => {
                const Icon = item.icon
                return (
                  <div key={item.title} className="rounded-3xl bg-white dark:bg-slate-900 border border-gray-200 dark:border-gray-800 p-8 shadow-sm hover:shadow-md transition">
                    <div className="mb-4 inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-sky-600 text-white">
                      <Icon className="w-6 h-6" />
                    </div>
                    <h2 className="text-xl font-semibold mb-3">{item.title}</h2>
                    <p className="text-gray-600 dark:text-gray-300 leading-7">{item.description}</p>
                  </div>
                )
              })}
            </div>

            <div className="rounded-3xl bg-white dark:bg-slate-900 border border-gray-200 dark:border-gray-800 p-10 shadow-sm text-center">
              <h2 className="text-3xl font-bold mb-4">Ready to Make a Difference?</h2>
              <p className="text-gray-600 dark:text-gray-300 leading-7 mb-6">
                Whether you give financially, partner with us, or contribute resources, your support helps us reach more children and expand our community impact.
              </p>
              <Link href="/contact" className="inline-flex items-center justify-center rounded-2xl bg-sky-600 px-6 py-3 text-white font-semibold hover:bg-sky-700 transition">
                Contact Our Team
              </Link>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
