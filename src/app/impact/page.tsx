import { Header } from '@/components/Header'
import { Footer } from '@/components/Footer'
import { IMPACT_STATS, IMPACT_AREAS, TESTIMONIALS } from '@/lib/constants'

export default function ImpactPage() {
  return (
    <>
      <Header />
      <main className="bg-white dark:bg-slate-950 text-gray-900 dark:text-gray-100">
        <section className="relative overflow-hidden bg-[url('/images/WhatsApp%20Image%202026-05-09%20at%207.28.32%20AM%20(2).jpeg')] bg-cover bg-center py-24">
          <div className="absolute inset-0 bg-black/70" />
          <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center text-white">
            <h1 className="text-4xl sm:text-5xl font-bold mb-4">Measuring What Matters</h1>
            <p className="mx-auto max-w-2xl text-lg text-sky-200">
              Our impact is defined by the lives we touch, the skills we build, and the communities we strengthen.
            </p>
          </div>
        </section>

        <section className="py-16 bg-gray-50 dark:bg-slate-900">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4 mb-16">
              {IMPACT_STATS.map((item, idx) => (
                <div key={idx} className="rounded-3xl bg-white dark:bg-slate-900 border border-gray-200 dark:border-gray-800 p-8 text-center shadow-sm">
                  <div className="text-4xl font-bold text-sky-600 dark:text-sky-400 mb-3">{item.number}</div>
                  <div className="text-gray-700 dark:text-gray-300">{item.label}</div>
                </div>
              ))}
            </div>

            <div className="grid gap-8 lg:grid-cols-3 mb-16">
              {TESTIMONIALS.map((testimonial, index) => (
                <div key={index} className="rounded-3xl bg-white dark:bg-slate-900 border border-gray-200 dark:border-gray-800 p-8 shadow-sm">
                  <p className="text-gray-700 dark:text-gray-300 leading-7 mb-6">“{testimonial.quote}”</p>
                  <p className="font-semibold text-sky-600 dark:text-sky-400">{testimonial.role}</p>
                </div>
              ))}
            </div>

            <div className="grid gap-6 md:grid-cols-2">
              {IMPACT_AREAS.map((area, index) => (
                <div key={index} className="rounded-3xl bg-white dark:bg-slate-900 border border-gray-200 dark:border-gray-800 p-8 shadow-sm">
                  <h3 className="text-xl font-bold mb-3">{area.title}</h3>
                  <p className="text-gray-600 dark:text-gray-300 leading-7">{area.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
