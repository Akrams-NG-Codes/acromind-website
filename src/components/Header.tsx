'use client'

import Image from 'next/image'
import Link from 'next/link'
import { NAVIGATION } from '@/lib/constants'
import { useTheme } from 'next-themes'
import { Moon, Sun } from 'lucide-react'
import { useEffect, useState } from 'react'

export function Header() {
  const [mounted, setMounted] = useState(false)
  const { theme, setTheme } = useTheme()

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setMounted(true)
  }, [])

  return (
    <header className="sticky top-0 z-50 border-b border-gray-200 dark:border-gray-800 bg-white dark:bg-slate-900 shadow-sm">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link href="/" className="flex items-center space-x-3 font-bold text-xl text-sky-600 dark:text-sky-400">
            <div className="relative w-10 h-10 rounded-full overflow-hidden bg-sky-600 dark:bg-sky-400">
              <Image src="/images/logo.jpeg" alt="AcroMind logo" fill className="object-cover" />
            </div>
            <span className="hidden sm:inline">AcroMind Initiative</span>
          </Link>

          <nav className="hidden md:flex space-x-1">
            {NAVIGATION.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="px-3 py-2 text-sm font-medium text-gray-700 dark:text-gray-200 hover:text-sky-600 dark:hover:text-sky-400 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-md transition"
              >
                {item.name}
              </Link>
            ))}
          </nav>

          <div className="flex items-center space-x-4">
            {mounted && (
              <button
                onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
                className="p-2 text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-md transition"
                aria-label="Toggle theme"
              >
                {theme === 'dark' ? (
                  <Sun className="w-5 h-5" />
                ) : (
                  <Moon className="w-5 h-5" />
                )}
              </button>
            )}
            <Link
              href="/donate"
              className="px-4 py-2 bg-sky-600 text-white rounded-md hover:bg-sky-700 transition font-medium text-sm"
            >
              Donate
            </Link>
          </div>
        </div>
      </div>
    </header>
  )
}
