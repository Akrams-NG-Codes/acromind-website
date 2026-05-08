import { Header } from '@/components/Header'
import { Footer } from '@/components/Footer'
import Link from 'next/link'

const galleryItems = [
  { title: 'Community Story Night', category: 'performances', image: '/images/gallery-1.svg', caption: 'performances' },
  { title: 'Wellness Workshop', category: 'workshops', image: '/images/gallery-2.svg', caption: 'workshops' },
  { title: 'Spring Volunteer Drive', category: 'events', image: '/images/gallery-3.svg', caption: 'events' },
  { title: 'Team Planning Session', category: 'team', image: '/images/gallery-4.svg', caption: 'team' },
]

const categories = ['all', 'workshops', 'performances', 'events', 'team', 'general']

export default function GalleryPage() {
  return (
    <>
      <Header />
      <main className="bg-white dark:bg-slate-950 text-gray-900 dark:text-gray-100">
        <section className="py-24 bg-slate-900 text-white">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
            <span className="inline-flex items-center rounded-full bg-purple-600/20 px-4 py-2 text-sm font-semibold uppercase tracking-wide mb-4">
              Visual Stories
            </span>
            <h1 className="text-4xl sm:text-5xl font-bold mb-4">Gallery</h1>
            <p className="mx-auto max-w-2xl text-lg text-purple-200">
              A visual journey through our workshops, performances, and community impact.
            </p>
          </div>
        </section>

        <section className="py-16">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="flex flex-wrap justify-center gap-3 mb-10">
              {categories.map((category) => (
                <button
                  key={category}
                  className="rounded-full border border-gray-300 dark:border-gray-700 px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-purple-50 dark:hover:bg-slate-800 transition"
                >
                  {category}
                </button>
              ))}
            </div>

            <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
              {galleryItems.map((item, idx) => (
                <div key={idx} className="group overflow-hidden rounded-3xl border border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-slate-900 shadow-sm">
                  <div className="relative h-80 overflow-hidden">
                    <div
                      className="absolute inset-0 bg-cover bg-center transition-transform duration-500 group-hover:scale-105"
                      style={{ backgroundImage: `url(${item.image})` }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-0 group-hover:opacity-100 transition" />
                    <div className="absolute bottom-4 left-4 text-white opacity-0 group-hover:opacity-100 transition">
                      <p className="text-sm uppercase tracking-[0.2em] text-purple-200">{item.caption}</p>
                      <h3 className="text-xl font-semibold">{item.title}</h3>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-12 text-center">
              <p className="text-gray-600 dark:text-gray-400">This gallery uses local WhatsApp image fallbacks when no published items are available.</p>
              <Link
                href="/contact"
                className="mt-6 inline-flex items-center justify-center px-6 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition"
              >
                Share Your Story
              </Link>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
