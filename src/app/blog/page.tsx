import { Header } from '@/components/Header'
import { Footer } from '@/components/Footer'
import { supabase } from '@/lib/supabase'
import Link from 'next/link'

export const dynamic = 'force-dynamic'

async function getBlogPosts() {
  try {
    const { data, error } = await supabase
      .from('blog_posts')
      .select('*')
      .eq('is_published', true)
      .order('published_at', { ascending: false })

    if (error) {
      console.error('Error fetching blog posts:', error)
      return []
    }

    return data || []
  } catch (err) {
    console.error('Error:', err)
    return []
  }
}

export default async function BlogPage() {
  const posts = await getBlogPosts()

  return (
    <>
      <Header />
      <main className="bg-white dark:bg-slate-950 text-gray-900 dark:text-gray-100">
        <section className="py-24 bg-slate-900 text-white">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
            <span className="inline-flex items-center rounded-full bg-sky-600/20 px-4 py-2 text-sm font-semibold uppercase tracking-wide mb-4">
              News & Stories
            </span>
            <h1 className="text-4xl sm:text-5xl font-bold mb-4">Blog</h1>
            <p className="mx-auto max-w-2xl text-lg text-sky-200">
              Stories, updates, and insights from the AcroMind Initiative
            </p>
          </div>
        </section>

        <section className="py-16 bg-gray-50 dark:bg-slate-900">
          <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
            {posts.length === 0 ? (
              <div className="text-center py-12">
                <p className="text-gray-600 dark:text-gray-400 text-lg">No blog posts published yet. Check back soon!</p>
              </div>
            ) : (
              <div className="grid gap-8">
                {posts.map((post: any) => (
                  <Link key={post.id} href={`/blog/${post.slug}`}>
                    <article className="group bg-white dark:bg-slate-800 rounded-3xl shadow-sm border border-gray-200 dark:border-gray-800 p-8 hover:shadow-lg hover:border-sky-300 dark:hover:border-sky-600 transition cursor-pointer">
                      <div className="flex flex-col sm:flex-row gap-6">
                        {post.featured_image_url && (
                          <img
                            src={post.featured_image_url}
                            alt={post.title}
                            className="w-full sm:w-48 h-48 object-cover rounded-2xl flex-shrink-0"
                          />
                        )}
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-3 text-sm text-gray-600 dark:text-gray-400">
                            {post.author && (
                              <span className="text-sky-600 dark:text-sky-400 font-semibold">
                                {post.author}
                              </span>
                            )}
                            {post.published_at && (
                              <>
                                <span>·</span>
                                <span>
                                  {new Date(post.published_at).toLocaleDateString('en-US', {
                                    year: 'numeric',
                                    month: 'long',
                                    day: 'numeric',
                                  })}
                                </span>
                              </>
                            )}
                          </div>
                          <h2 className="text-2xl font-bold mb-3 group-hover:text-sky-600 dark:group-hover:text-sky-400 transition">
                            {post.title}
                          </h2>
                          <p className="text-gray-600 dark:text-gray-400 leading-7 mb-4">
                            {post.description || (post.content ? post.content.substring(0, 150) + '...' : '')}
                          </p>
                          <span className="inline-flex items-center text-sky-600 dark:text-sky-400 font-semibold group-hover:gap-2 gap-1 transition-all">
                            Read More →
                          </span>
                        </div>
                      </div>
                    </article>
                  </Link>
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
