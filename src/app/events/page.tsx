import { Header } from '@/components/Header'
import { Footer } from '@/components/Footer'
import { supabase } from '@/lib/supabase'
import { DEFAULT_EVENTS } from '@/lib/constants'

export const dynamic = 'force-dynamic'

async function getEvents() {
  try {
    const { data, error } = await supabase
      .from('events')
      .select('*')
      .eq('status', 'upcoming')
      .order('date', { ascending: true })

    if (error) {
      console.error('Error fetching events:', error)
      return DEFAULT_EVENTS
    }

    return data && data.length > 0 ? data : DEFAULT_EVENTS
  } catch (err) {
    console.error('Error:', err)
    return DEFAULT_EVENTS
  }
}

export default async function EventsPage() {
  const events = await getEvents()

  return (
    <>
      <Header />
      <main className="bg-white dark:bg-slate-950 text-gray-900 dark:text-gray-100">
        <section className="py-24 bg-slate-900 text-white">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
            <span className="inline-flex items-center rounded-full bg-sky-600/20 px-4 py-2 text-sm font-semibold uppercase tracking-wide mb-4">
              Events & Activities
            </span>
            <h1 className="text-4xl sm:text-5xl font-bold mb-4">Our Events</h1>
            <p className="mx-auto max-w-2xl text-lg text-sky-200">
              Join us at our upcoming workshops, performances, and community activities across Uganda.
            </p>
          </div>
        </section>

        <section className="py-16 bg-gray-50 dark:bg-slate-900">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            {events.length === 0 ? (
              <div className="text-center py-12">
                <p className="text-gray-600 dark:text-gray-400 text-lg">No upcoming events at the moment. Check back soon!</p>
              </div>
            ) : (
              <div className="grid gap-8">
                {events.map((event: any) => (
                  <div key={event.id} className="rounded-3xl bg-white dark:bg-slate-900 border border-gray-200 dark:border-gray-800 shadow-sm p-8 hover:shadow-md transition">
                    <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-4 mb-4">
                      <div className="flex-1">
                        <h2 className="text-2xl font-bold">{event.title}</h2>
                        <p className="text-sm text-sky-600 dark:text-sky-400 font-semibold mt-2">{event.location}</p>
                        {event.event_type && (
                          <span className="inline-block mt-2 bg-sky-100 dark:bg-sky-900 text-sky-800 dark:text-sky-100 px-3 py-1 rounded-full text-xs">
                            {event.event_type}
                          </span>
                        )}
                      </div>
                      {event.date && (
                        <p className="text-sm text-gray-600 dark:text-gray-400 whitespace-nowrap">
                          {new Date(event.date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
                        </p>
                      )}
                    </div>
                    <p className="text-gray-700 dark:text-gray-300 leading-7">{event.description}</p>
                    {event.image_url && (
                      <img src={event.image_url} alt={event.title} className="mt-4 rounded-lg w-full max-h-80 object-cover" />
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
