import { Header } from '@/components/Header'
import { Footer } from '@/components/Footer'
import { supabase } from '@/lib/supabase'
import Link from 'next/link'

async function getGalleryItems() {
  try {
    const { data, error } = await supabase
      .from('gallery')
      .select('*')
      .order('order_index', { ascending: true })

    if (error) {
      console.error('Error fetching gallery:', error)
      return []
    }

    return data || []
  } catch (err) {
    console.error('Error:', err)
    return []
  }
}

export default async function GalleryPage() {
  const galleryItems = await getGalleryItems()

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
            {galleryItems.length === 0 ? (
              <div className="text-center py-12">
                <p className="text-gray-600 dark:text-gray-400 text-lg">No gallery items available yet.</p>
              </div>
            ) : (
              <>
                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                  {galleryItems.map((item: any) => (
                    <div
                      key={item.id}
                      className="group overflow-hidden rounded-3xl border border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-slate-900 shadow-sm hover:shadow-lg transition"
                    >
                      <div className="relative h-80 overflow-hidden">
                        {item.image_url ? (
                          <>
                            <img
                              src={item.image_url}
                              alt={item.title}
                              className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-0 group-hover:opacity-100 transition" />
                          </>
                        ) : (
                          <div className="absolute inset-0 bg-gray-300 dark:bg-gray-600 flex items-center justify-center">
                            <span className="text-gray-500">No image</span>
                          </div>
                        )}
                        <div className="absolute bottom-4 left-4 right-4 text-white opacity-0 group-hover:opacity-100 transition">
                          {item.category && (
                            <p className="text-xs uppercase tracking-[0.2em] text-purple-200 mb-1">{item.category}</p>
                          )}
                          <h3 className="text-lg font-semibold line-clamp-2">{item.title}</h3>
                          {item.description && (
                            <p className="text-xs text-purple-100 mt-2 line-clamp-2">{item.description}</p>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="mt-12 text-center">
                  <Link
                    href="/contact"
                    className="inline-flex items-center justify-center px-6 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition"
                  >
                    Share Your Story
                  </Link>
                </div>
              </>
            )}
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
