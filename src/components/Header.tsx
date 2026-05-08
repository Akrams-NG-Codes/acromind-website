'use client'

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
          <Link href="/" className="flex items-center space-x-2 font-bold text-xl text-purple-600 dark:text-purple-400">
            <div className="w-8 h-8 bg-purple-600 dark:bg-purple-400 rounded-full flex items-center justify-center text-white dark:text-slate-900 font-bold text-lg">
              A
            </div>
            <span className="hidden sm:inline">AcroMind Initiative</span>
          </Link>

          <nav className="hidden md:flex space-x-1">
            {NAVIGATION.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="px-3 py-2 text-sm font-medium text-gray-700 dark:text-gray-200 hover:text-purple-600 dark:hover:text-purple-400 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-md transition"
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
              className="px-4 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700 transition font-medium text-sm"
            >
              Donate
            </Link>
          </div>
        </div>
      </div>
    </header>
  )
}
