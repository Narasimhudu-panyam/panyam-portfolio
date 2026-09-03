import type { Metadata } from 'next';
// The stylesheet is processed by Next.js even when TypeScript cannot resolve
// its side-effect import in the editor.
// @ts-expect-error Next.js resolves global CSS imports at build time.
import './globals.css';

export const metadata: Metadata = {
  metadataBase: new URL('https://panyam-portfolio.vercel.app'),
  title: 'Panyam Lakshmi Narasimhudu | Full Stack Developer',
  description:
    'MCA student and Full Stack Developer building modern web applications and AI-powered solutions using React, Next.js, Python, Flutter, Supabase, and Machine Learning.',
  keywords: [
    'Panyam Lakshmi Narasimhudu',
    'Full Stack Developer',
    'Python Developer',
    'Next.js Developer',
    'Flutter Developer',
    'AI Engineer',
    'React',
    'FastAPI',
    'Supabase',
    'Portfolio',
  ],
  authors: [{ name: 'Panyam Lakshmi Narasimhudu', url: 'https://panyam-portfolio.vercel.app/' }],
  creator: 'Panyam Lakshmi Narasimhudu',
  publisher: 'Panyam Lakshmi Narasimhudu',
  alternates: {
    canonical: 'https://panyam-portfolio.vercel.app/',
  },
  openGraph: {
    title: 'Panyam Lakshmi Narasimhudu | Full Stack Developer',
    description:
      'MCA student and Full Stack Developer building modern web applications and AI-powered solutions using React, Next.js, Python, Flutter, Supabase, and Machine Learning.',
    url: 'https://panyam-portfolio.vercel.app/',
    siteName: 'Panyam Lakshmi Narasimhudu Portfolio',
    locale: 'en_US',
    type: 'website',
    images: [
      {
        url: 'https://panyam-portfolio.vercel.app/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Panyam Lakshmi Narasimhudu - Full Stack Developer Portfolio',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Panyam Lakshmi Narasimhudu | Full Stack Developer',
    description:
      'MCA student and Full Stack Developer building modern web applications and AI-powered solutions using React, Next.js, Python, Flutter, Supabase, and Machine Learning.',
    images: ['https://panyam-portfolio.vercel.app/og-image.png'],
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
  icons: {
    icon: '/favicon.png',
    shortcut: '/favicon.png',
    apple: '/favicon.png',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className="bg-ink text-slate-100 antialiased">{children}</body>
    </html>
  );
}
