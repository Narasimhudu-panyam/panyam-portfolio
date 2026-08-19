import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Panyam Lakshmi Narasimhudu — Full Stack Developer',
  description: 'Portfolio of Panyam Lakshmi Narasimhudu, a Full Stack Developer and AI enthusiast.',
  keywords: ['Full Stack Developer', 'Python Developer', 'Next.js', 'AI', 'Panyam Lakshmi Narasimhudu'],
  openGraph: { title: 'Panyam Lakshmi Narasimhudu', description: 'Full Stack Developer · Python Developer · AI Enthusiast', type: 'website' },
  twitter: { card: 'summary_large_image', title: 'Panyam Lakshmi Narasimhudu', description: 'Full Stack Developer · Python Developer · AI Enthusiast' },
};
export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) { return <html lang="en" className="scroll-smooth"><body className="bg-ink text-slate-100 antialiased">{children}</body></html>; }
