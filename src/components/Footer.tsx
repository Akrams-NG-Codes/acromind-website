import { NAVIGATION, ORGANIZATION } from '@/lib/constants'
import Link from 'next/link'
import { Mail, MapPin, Phone } from 'lucide-react'

export function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="border-t border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-slate-950 mt-auto">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          {/* About */}
          <div>
            <h3 className="text-sm font-bold text-gray-900 dark:text-white mb-4">About</h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              {ORGANIZATION.name} - Empowering children and youth through circus arts in Uganda.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-sm font-bold text-gray-900 dark:text-white mb-4">Quick Links</h3>
            <ul className="space-y-2">
              {NAVIGATION.slice(0, 5).map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="text-sm text-gray-600 dark:text-gray-400 hover:text-sky-600 dark:hover:text-sky-400"
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* More Links */}
          <div>
            <h3 className="text-sm font-bold text-gray-900 dark:text-white mb-4">More</h3>
            <ul className="space-y-2">
              {NAVIGATION.slice(5).map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="text-sm text-gray-600 dark:text-gray-400 hover:text-sky-600 dark:hover:text-sky-400"
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-sm font-bold text-gray-900 dark:text-white mb-4">Contact</h3>
            <div className="space-y-3">
              <div className="flex items-start space-x-2">
                <MapPin className="w-4 h-4 text-sky-600 dark:text-sky-400 mt-0.5 flex-shrink-0" />
                <p className="text-sm text-gray-600 dark:text-gray-400">{ORGANIZATION.address}</p>
              </div>
              <div className="flex items-center space-x-2">
                <Mail className="w-4 h-4 text-sky-600 dark:text-sky-400 flex-shrink-0" />
                <a
                  href={`mailto:${ORGANIZATION.email}`}
                  className="text-sm text-gray-600 dark:text-gray-400 hover:text-sky-600 dark:hover:text-sky-400"
                >
                  {ORGANIZATION.email}
                </a>
              </div>
              <div className="flex items-center space-x-2">
                <Phone className="w-4 h-4 text-sky-600 dark:text-sky-400 flex-shrink-0" />
                <a
                  href={`tel:${ORGANIZATION.phone}`}
                  className="text-sm text-gray-600 dark:text-gray-400 hover:text-sky-600 dark:hover:text-sky-400"
                >
                  {ORGANIZATION.phone}
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-gray-200 dark:border-gray-800 pt-8">
          <p className="text-center text-sm text-gray-600 dark:text-gray-400">
            &copy; {currentYear} {ORGANIZATION.legalName}. All rights reserved. | Community-based, non-profit initiative
          </p>
        </div>
      </div>
    </footer>
  )
}
