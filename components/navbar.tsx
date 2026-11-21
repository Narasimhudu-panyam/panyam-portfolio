'use client';

import { Menu, X, Download, Compass } from 'lucide-react';
import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { navItems } from '@/constants/data';

export function Navbar() {
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState('home');
  useEffect(() => {
    const ids = ['home', ...navItems.map(i => i.toLowerCase())];
    const nodes = ids.map(id => document.getElementById(id)).filter((node): node is HTMLElement => Boolean(node));
    const observer = new IntersectionObserver(entries => entries.forEach(entry => { if (entry.isIntersecting) setActive(entry.target.id); }), { rootMargin: '-25% 0px -60% 0px' });
    nodes.forEach(node => observer.observe(node));
    return () => observer.disconnect();
  }, []);
  const links = <>{navItems.map(i => <a key={i} onClick={() => setOpen(false)} aria-current={active === i.toLowerCase() ? 'location' : undefined} className={`nav-link ${active === i.toLowerCase() ? 'nav-link-active' : ''}`} href={`#${i.toLowerCase()}`}>{i}</a>)}<a href="/resume.pdf" download="Panyam_Lakshmi_Narasimhudu_Resume.pdf" className="nav-resume"><Download size={14}/> Resume</a></>;
  return <header className="fixed inset-x-0 top-3 z-50 mx-auto w-[calc(100%-1.25rem)] max-w-7xl sm:top-4 sm:w-[calc(100%-2rem)]">
    <nav aria-label="Main navigation" className="nav-shell flex min-h-14 items-center justify-between rounded-2xl px-3.5 sm:px-5">
      <a href="#home" className="flex min-w-0 items-center gap-2.5 text-sm font-bold text-[#18324A] sm:text-base"><span className="grid h-8 w-8 shrink-0 place-items-center rounded-xl bg-[#e5f5f9] text-[#168DAB]"><Compass size={18}/></span><span className="truncate">Panyam Narasimhudu</span></a>
      <div className="hidden items-center gap-1 lg:flex">{links}</div>
      <button type="button" aria-label={open ? 'Close navigation' : 'Open navigation'} aria-expanded={open} aria-controls="mobile-navigation" className="rounded-lg p-2 text-[#18324A] hover:bg-[#eaf6f8] focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#168DAB] lg:hidden" onClick={() => setOpen(!open)}>{open ? <X size={21}/> : <Menu size={21}/>}</button>
    </nav>
    <AnimatePresence>{open && <motion.div id="mobile-navigation" initial={{ opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }} className="nav-shell mt-2 grid gap-1 rounded-2xl p-3 lg:hidden">{links}</motion.div>}</AnimatePresence>
  </header>;
}
