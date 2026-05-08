import { Header } from '@/components/Header'
import { Footer } from '@/components/Footer'
import Link from 'next/link'

const posts = [
  {
    title: 'Empowering Youth Through Acrobatics',
    excerpt: 'Our recent workshop helped young people build confidence, discipline, and teamwork through circus art training.',
    author: 'AcroMind Team',
    date: '2026-04-10',
    href: '/blog/empowering-youth-through-acrobatics',
  },
  {
    title: 'Safeguarding Children in Creative Spaces',
    excerpt: 'We prioritize child protection in every activity with training and care built into our programs.',
    author: 'AcroMind Team',
    date: '2026-03-18',
    href: '/blog/safeguarding-children-in-creative-spaces',
  },
]

export default function BlogPage() {
  return (
    <>
      <Header />
      <main className="bg-white dark:bg-slate-950 text-gray-900 dark:text-gray-100">
        <section className="py-24 bg-slate-900 text-white">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
            <span className="inline-flex items-center rounded-full bg-purple-600/20 px-4 py-2 text-sm font-semibold uppercase tracking-wide mb-4">
              News & Stories
            </span>
            <h1 className="text-4xl sm:text-5xl font-bold mb-4">Blog</h1>
            <p className="mx-auto max-w-2xl text-lg text-purple-200">
              Stories, updates, and insights from our work across Uganda.
            </p>
          </div>
        </section>

        <section className="py-16 bg-gray-50 dark:bg-slate-900">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="grid gap-8 md:grid-cols-2">
              {posts.map((post) => (
                <article key={post.href} className="rounded-3xl bg-white dark:bg-slate-900 shadow-sm border border-gray-200 dark:border-gray-800 p-8 hover:shadow-md transition">
                  <div className="mb-4 text-sm text-purple-600 dark:text-purple-400 font-semibold">{post.author} · {new Date(post.date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</div>
                  <h2 className="text-2xl font-bold mb-3">{post.title}</h2>
                  <p className="text-gray-600 dark:text-gray-300 leading-7 mb-6">{post.excerpt}</p>
                  <Link href={post.href} className="inline-flex items-center text-purple-600 dark:text-purple-400 font-semibold hover:underline">
                    Read More
                  </Link>
                </article>
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
