import { Footer } from '@/components/Footer'
import { Header } from '@/components/Header'
import { supabase } from '@/lib/supabase'
import Link from 'next/link'

export const dynamic = 'force-dynamic'

async function getBlogPost(slug: string) {
  try {
    const { data, error } = await supabase
      .from('blog_posts')
      .select('*')
      .eq('slug', slug)
      .eq('is_published', true)
      .single()

    if (error) {
      console.error('Error fetching blog post:', error)
      return null
    }

    return data
  } catch (err) {
    console.error('Error:', err)
    return null
  }
}

export default async function BlogPostPage({ params }: { params: { slug: string } }) {
  const post = await getBlogPost(params.slug)

  if (!post) {
    return (
      <>
        <Header />
        <main className="min-h-screen bg-white dark:bg-slate-950 text-gray-900 dark:text-gray-100 flex items-center justify-center">
          <div className="text-center px-4 py-20">
            <h1 className="text-3xl font-bold mb-4">Post not found</h1>
            <p className="text-gray-600 dark:text-gray-400 mb-6">The article you are looking for does not exist.</p>
            <Link href="/blog" className="inline-flex items-center px-5 py-3 rounded-full bg-sky-600 text-white hover:bg-sky-700 transition">
              Back to Blog
            </Link>
          </div>
        </main>
        <Footer />
      </>
    )
  }

  return (
    <>
      <Header />
      <main className="min-h-screen bg-white dark:bg-slate-950 text-gray-900 dark:text-gray-100">
        <article className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 py-20">
          <div className="space-y-4 mb-8">
            <div className="text-sm uppercase tracking-[0.2em] text-sky-600 dark:text-sky-400">
              News & Stories
            </div>
            <h1 className="text-4xl font-bold">{post.title}</h1>
            <div className="flex items-center gap-3 text-sm text-gray-600 dark:text-gray-400">
              {post.author && <span className="font-semibold text-sky-600 dark:text-sky-400">{post.author}</span>}
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
          </div>

          {post.featured_image_url && (
            <img
              src={post.featured_image_url}
              alt={post.title}
              className="w-full h-96 object-cover rounded-2xl mb-8"
            />
          )}

          {post.description && (
            <p className="text-lg text-gray-700 dark:text-gray-300 mb-8 leading-7">{post.description}</p>
          )}

          <div className="prose prose-invert max-w-none text-gray-700 dark:text-gray-300 leading-8 space-y-6 mb-8">
            {post.content && (
              <div className="whitespace-pre-wrap">{post.content}</div>
            )}
          </div>

          <Link
            href="/blog"
            className="inline-flex items-center px-5 py-3 rounded-full bg-sky-600 text-white hover:bg-sky-700 transition"
          >
            ← Back to Blog
          </Link>
        </article>
      </main>
      <Footer />
    </>
  )
}
