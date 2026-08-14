import type { Metadata, Viewport } from 'next'
import './globals.css'
import { seo, personal, social } from '@/lib/data'
import SmoothScrollProvider from '@/components/providers/SmoothScrollProvider'
import LoadingScreen from '@/components/shared/LoadingScreen'

export const metadata: Metadata = {
  title: seo.title,
  description: seo.description,
  keywords: [...seo.keywords],
  authors: [{ name: personal.name }],
  creator: personal.name,
  metadataBase: new URL(seo.siteUrl),
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: seo.siteUrl,
    title: seo.title,
    description: seo.description,
    siteName: personal.name,
    images: [
      {
        url: seo.ogImage,
        width: 1200,
        height: 630,
        alt: `${personal.name} Portfolio`,
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: seo.title,
    description: seo.description,
    images: [seo.ogImage],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  alternates: {
    canonical: seo.siteUrl,
  },
}

export const viewport: Viewport = {
  themeColor: '#09090b',
  colorScheme: 'dark',
}

const structuredData = {
  '@context': 'https://schema.org',
  '@type': 'Person',
  name: personal.name,
  url: seo.siteUrl,
  sameAs: [social.github, social.linkedin].filter(Boolean),
  jobTitle: personal.role,
  description: personal.bio,
  knowsAbout: [
    'Full Stack Development',
    'React.js',
    'Node.js',
    'TypeScript',
    'JavaScript',
    'Responsive web development',
  ],
  alumniOf: {
    '@type': 'CollegeOrUniversity',
    name: 'RVS Technical Campus',
  },
  address: {
    '@type': 'PostalAddress',
    addressLocality: 'Coimbatore',
    addressRegion: 'Tamil Nadu',
    addressCountry: 'IN',
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />
      </head>
      <body className="bg-[#101018] text-zinc-50 antialiased">
        <SmoothScrollProvider>
          <LoadingScreen />
          {/* Noise texture overlay */}
          <div className="noise-overlay" aria-hidden="true" />
          <div className="relative z-10 w-full">
            {children}
          </div>
        </SmoothScrollProvider>
      </body>
    </html>
  )
}
