import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Providers } from "./providers";
import { SITE_URL } from '@/lib/constants';

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "AcroMind Initiative - Empowering Youth Through Circus Arts",
    template: "%s | AcroMind Initiative",
  },
  description: "Empowering children and youth through circus arts, acrobatics, creative expression, and community engagement in Uganda.",
  keywords: [
    "AcroMind",
    "AcroMind Initiative",
    "circus arts",
    "Uganda youth empowerment",
    "children empowerment",
    "acrobatics",
    "community arts",
    "creative education",
  ],
  authors: [{ name: "AcroMind Initiative" }],
  openGraph: {
    title: "AcroMind Initiative - Empowering Youth Through Circus Arts",
    description: "Empowering children and youth through circus arts in Uganda",
    type: "website",
    url: SITE_URL,
    siteName: "AcroMind Initiative",
  },
  twitter: {
    card: "summary_large_image",
    title: "AcroMind Initiative - Empowering Youth Through Circus Arts",
    description: "Empowering children and youth through circus arts, acrobatics, creative expression, and community engagement in Uganda.",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  alternates: {
    canonical: SITE_URL,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      data-scroll-behavior="smooth"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      <body className="min-h-full flex flex-col">
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
