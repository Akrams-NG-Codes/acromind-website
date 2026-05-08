import { Header } from '@/components/Header'
import { Footer } from '@/components/Footer'

const events = [
  {
    title: 'AcroMind Community Workshop',
    date: '2026-07-15',
    location: 'Kampala Community Center',
    description: 'A multi-day workshop focused on circus skills, teamwork, and confidence-building activities for young people.',
  },
  {
    title: 'Public Performance Night',
    date: '2026-08-05',
    location: 'Luganda Park',
    description: 'A joyful community performance showcasing the talents of our participants and celebrating creative expression.',
  },
]

export default function EventsPage() {
  return (
    <>
      <Header />
      <main className="bg-white dark:bg-slate-950 text-gray-900 dark:text-gray-100">
        <section className="py-24 bg-slate-900 text-white">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
            <span className="inline-flex items-center rounded-full bg-purple-600/20 px-4 py-2 text-sm font-semibold uppercase tracking-wide mb-4">
              Events & Activities
            </span>
            <h1 className="text-4xl sm:text-5xl font-bold mb-4">Our Events</h1>
            <p className="mx-auto max-w-2xl text-lg text-purple-200">
              Join us at our upcoming workshops, performances, and community activities across Uganda.
            </p>
          </div>
        </section>

        <section className="py-16 bg-gray-50 dark:bg-slate-900">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="grid gap-8">
              {events.map((event, index) => (
                <div key={index} className="rounded-3xl bg-white dark:bg-slate-900 border border-gray-200 dark:border-gray-800 shadow-sm p-8">
                  <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4 mb-4">
                    <div>
                      <h2 className="text-2xl font-bold">{event.title}</h2>
                      <p className="text-sm text-purple-600 dark:text-purple-400 font-semibold mt-2">{event.location}</p>
                    </div>
                    <p className="text-sm text-gray-600 dark:text-gray-400">{new Date(event.date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</p>
                  </div>
                  <p className="text-gray-700 dark:text-gray-300 leading-7">{event.description}</p>
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
