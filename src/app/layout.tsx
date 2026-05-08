import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Providers } from "./providers";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "AcroMind Initiative - Empowering Youth Through Circus Arts",
  description: "Empowering children and youth through circus arts, acrobatics, creative expression, and community engagement in Uganda.",
  keywords: "circus arts, acrobatics, youth empowerment, Uganda, creative expression",
  authors: [{ name: "AcroMind Initiative" }],
  openGraph: {
    title: "AcroMind Initiative - Empowering Youth Through Circus Arts",
    description: "Empowering children and youth through circus arts in Uganda",
    type: "website",
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
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      <body className="min-h-full flex flex-col">
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
