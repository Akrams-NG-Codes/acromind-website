import { Header } from '@/components/Header'
import { Footer } from '@/components/Footer'
import { ORGANIZATION } from '@/lib/constants'

export default function AboutPage() {
  return (
    <>
      <Header />
      <main className="bg-white dark:bg-slate-950 text-gray-900 dark:text-gray-100">
        <section className="relative overflow-hidden bg-slate-900 text-white py-24">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(139,92,246,0.35),_transparent_45%)]" />
          <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl">
              <span className="inline-flex items-center rounded-full bg-purple-100/20 px-4 py-2 text-sm font-semibold text-purple-200 mb-4">
                Who We Are
              </span>
              <h1 className="text-4xl sm:text-5xl font-bold tracking-tight">Who We Are</h1>
              <p className="mt-6 text-lg text-purple-100/90 leading-8">
                {ORGANIZATION.name} is a registered community-based, non-profit initiative founded in 2023 in Kampala, Uganda. We provide safe spaces for children and youth to grow through circus arts, acrobatics, and creative expression.
              </p>
            </div>
          </div>
        </section>

        <section className="py-16">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="grid gap-10 lg:grid-cols-2 lg:items-start">
              <div className="space-y-8">
                <div className="rounded-3xl bg-purple-700/5 dark:bg-white/5 p-8 shadow-sm border border-gray-200/70 dark:border-slate-800">
                  <h2 className="text-2xl font-bold mb-4">Organization Story</h2>
                  <p className="text-gray-600 dark:text-gray-300 leading-8">
                    Founded in 2023, AcroMind Initiative Limited addresses the lack of safe spaces and creative opportunities for young people in Uganda. Many face poverty, drugs, violence, school dropout, and limited role models. We believe circus arts and creative expression transform lives by nurturing confidence, skill, and positive choices.
                  </p>
                </div>

                <div className="grid gap-6 sm:grid-cols-3">
                  <div className="rounded-3xl bg-purple-600/10 dark:bg-purple-500/10 p-6">
                    <h3 className="text-lg font-semibold mb-2">Mission</h3>
                    <p className="text-gray-600 dark:text-gray-300 text-sm">{ORGANIZATION.mission}</p>
                  </div>
                  <div className="rounded-3xl bg-purple-600/10 dark:bg-purple-500/10 p-6">
                    <h3 className="text-lg font-semibold mb-2">Vision</h3>
                    <p className="text-gray-600 dark:text-gray-300 text-sm">{ORGANIZATION.vision}</p>
                  </div>
                  <div className="rounded-3xl bg-purple-600/10 dark:bg-purple-500/10 p-6">
                    <h3 className="text-lg font-semibold mb-2">Core Values</h3>
                    <ul className="space-y-2 text-gray-600 dark:text-gray-300 text-sm">
                      {ORGANIZATION.coreValues.map((value) => (
                        <li key={value}>• {value}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>

              <div className="space-y-8">
                <div className="rounded-3xl overflow-hidden bg-gray-900 h-full">
                  <div className="bg-[url('/images/hero-main.svg')] bg-cover bg-center h-80" />
                </div>
                <div className="rounded-3xl overflow-hidden bg-gray-900 h-full">
                  <div className="bg-[url('/images/programs-workshop.svg')] bg-cover bg-center h-80" />
                </div>
              </div>
            </div>

            <div className="mt-16 rounded-3xl bg-gradient-to-r from-purple-600 to-purple-900 text-white p-10 shadow-xl">
              <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-6">
                <div>
                  <span className="inline-flex rounded-full bg-white/20 px-3 py-1 text-sm font-semibold uppercase tracking-wide">Founded 2023</span>
                  <h2 className="mt-4 text-3xl font-bold">A Movement for Change</h2>
                  <p className="mt-4 max-w-2xl text-purple-100/90 leading-7">
                    We are building a movement that connects young people with meaningful creative opportunities, positive role models, and safe environments for growth.
                  </p>
                </div>
                <div className="space-y-3 text-sm text-purple-100/90">
                  <p className="font-semibold">Contact</p>
                  <p>{ORGANIZATION.address}</p>
                  <p>{ORGANIZATION.email}</p>
                  <p>{ORGANIZATION.phone}</p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
