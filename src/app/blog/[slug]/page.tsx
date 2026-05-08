import { Footer } from '@/components/Footer'
import { Header } from '@/components/Header'
import Link from 'next/link'

const posts = [
  {
    slug: 'empowering-youth-through-acrobatics',
    title: 'Empowering Youth Through Acrobatics',
    author: 'AcroMind Team',
    date: '2026-04-10',
    content: [
      'Our recent workshop helped young people build confidence, discipline, and teamwork through circus art training. Participants gained new skills and a stronger sense of belonging.',
      'Circus arts are a powerful vehicle for positive change, helping youth discover their strengths while learning in a supportive environment.',
    ],
  },
  {
    slug: 'safeguarding-children-in-creative-spaces',
    title: 'Safeguarding Children in Creative Spaces',
    author: 'AcroMind Team',
    date: '2026-03-18',
    content: [
      'We prioritize child protection in every activity. Our safeguarding training ensures artists and volunteers create safe, respectful, and empowering environments.',
      'This approach allows children to explore creative expression with confidence and trust.',
    ],
  },
]

export function generateStaticParams() {
  return posts.map((post) => ({ slug: post.slug }))
}

export default function BlogPostPage({ params }: { params: { slug: string } }) {
  const post = posts.find((item) => item.slug === params.slug)

  if (!post) {
    return (
      <>
        <Header />
        <main className="min-h-screen bg-white dark:bg-slate-950 text-gray-900 dark:text-gray-100 flex items-center justify-center">
          <div className="text-center px-4 py-20">
            <h1 className="text-3xl font-bold mb-4">Post not found</h1>
            <p className="text-gray-600 dark:text-gray-400 mb-6">The article you are looking for does not exist.</p>
            <Link href="/blog" className="inline-flex items-center px-5 py-3 rounded-full bg-purple-600 text-white hover:bg-purple-700 transition">
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
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 py-20">
          <div className="space-y-4">
            <div className="text-sm uppercase tracking-[0.2em] text-purple-600">News & Stories</div>
            <h1 className="text-4xl font-bold">{post.title}</h1>
            <div className="text-sm text-gray-500 dark:text-gray-400">{post.author} · {new Date(post.date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</div>
            <div className="space-y-6 text-gray-700 dark:text-gray-300 leading-8">
              {post.content.map((paragraph, index) => (
                <p key={index}>{paragraph}</p>
              ))}
            </div>
            <Link href="/blog" className="inline-flex items-center px-5 py-3 rounded-full bg-purple-600 text-white hover:bg-purple-700 transition">
              Back to Blog
            </Link>
          </div>
        </div>
      </main>
      <Footer />
    </>
  )
}
