'use client';

import Image from 'next/image';
import { useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { ArrowDown, ArrowDownRight, ArrowRight, Download, Mail } from 'lucide-react';
import { DepthVoyageScene } from '@/components/depth-voyage-scene';
import { IntroScene } from '@/components/intro-scene';
import { VoyageNavigation, voyageDestinations } from '@/components/voyage-navigation';
import { ScrollProgress } from '@/components/scroll-progress';
import { Footer } from '@/components/footer';
import { About } from '@/sections/about';
import { Projects } from '@/sections/projects';
import { Certifications } from '@/sections/certifications';
import { Journey } from '@/sections/journey';
import { GitHub } from '@/sections/github';
import { Contact } from '@/sections/contact';

function OceanHome({ onNavigate }: { onNavigate: (index: number) => void }) {
  const reduceMotion = useReducedMotion();
  return (
    <section id="home" className="ocean-home">
      <div className="home-backdrop" aria-hidden="true" />
      <div className="home-shimmer" aria-hidden="true" />
      <div className="home-vignette" aria-hidden="true" />
      <div className="home-layout">
        <motion.div className="home-content" initial={reduceMotion ? false : { opacity: 0, x: -24 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: reduceMotion ? 0 : 0.75, delay: reduceMotion ? 0 : 0.12 }}>
          <p className="home-kicker"><span /> A FULL STACK DEVELOPER'S VOYAGE</p>
          <h2>Panyam Lakshmi<br /><em>Narasimhudu</em></h2>
          <p className="home-role">Full Stack Developer <span>|</span> AI Enthusiast</p>
          <p className="home-introduction">MCA student and developer building modern web applications and AI-powered solutions. I enjoy turning ambitious ideas into useful products with clean architecture, thoughtful interfaces, and practical problem-solving.</p>
          <div className="home-actions">
            <button type="button" onClick={() => onNavigate(1)} className="home-primary"><ArrowDownRight size={17} /> Begin the voyage <ArrowRight size={17} /></button>
            <a href="/resume.pdf" download="Panyam_Lakshmi_Narasimhudu_Resume.pdf" className="home-secondary"><Download size={16} /> Download resume</a>
            <button type="button" onClick={() => onNavigate(voyageDestinations.findIndex(item => item.target === 'contact'))} className="home-secondary"><Mail size={16} /> Contact</button>
          </div>
          <div className="home-stats"><span>06 featured projects</span><span>MCA | CGPA 9.1</span><span>Web | AI | Mobile</span></div>
        </motion.div>
        <motion.div className="home-portrait" initial={reduceMotion ? false : { opacity: 0, scale: 0.92, y: 18 }} animate={reduceMotion ? { opacity: 1, scale: 1 } : { opacity: 1, scale: 1, y: [0, -8, 0] }} transition={reduceMotion ? { duration: 0 } : { opacity: { duration: 0.7 }, scale: { duration: 0.7 }, y: { duration: 5, repeat: Infinity, ease: 'easeInOut' } }}>
          <div className="home-portrait-glow" />
          <div className="home-portrait-frame"><Image src="/headshot.jpg" alt="Panyam Lakshmi Narasimhudu" fill priority sizes="(max-width: 720px) 70vw, 420px" className="home-portrait-photo" /></div>
          <span className="home-portrait-caption">Full Stack | Applied AI</span>
        </motion.div>
      </div>
      <div className="home-scene-meta"><span>OPEN WATER | 01</span><span>06 FEATURED PROJECTS</span><a href="#about" onClick={event => { event.preventDefault(); onNavigate(1); }}>Scroll to explore <ArrowDown size={14} /></a></div>
      <div className="home-horizon-mark" aria-hidden="true"><span /><span /><span /></div>
    </section>
  );
}

export function PortfolioExperience() {
  const reduceMotion = useReducedMotion();
  const [showIntro, setShowIntro] = useState(true);
  const [transitioning, setTransitioning] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const transitionTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const selectionLock = useRef<number | null>(null);
  const selectionTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => () => {
    if (transitionTimer.current) clearTimeout(transitionTimer.current);
    if (selectionTimer.current) clearTimeout(selectionTimer.current);
  }, []);

  useEffect(() => {
    if (showIntro) return;
    const nodes = voyageDestinations.map(destination => document.getElementById(destination.target)).filter((node): node is HTMLElement => Boolean(node));
    const observer = new IntersectionObserver(entries => {
      if (selectionLock.current !== null) {
        setCurrentIndex(selectionLock.current);
        return;
      }
      const visible = entries.filter(entry => entry.isIntersecting).sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
      if (!visible) return;
      const index = voyageDestinations.findIndex(destination => destination.target === visible.target.id);
      if (index >= 0) setCurrentIndex(index);
    }, { rootMargin: '-30% 0px -48% 0px', threshold: [0, 0.18, 0.4, 0.65] });
    nodes.forEach(node => observer.observe(node));
    return () => observer.disconnect();
  }, [showIntro]);

  const beginVoyage = () => {
    setTransitioning(true);
    setShowIntro(false);
    if (transitionTimer.current) clearTimeout(transitionTimer.current);
    transitionTimer.current = setTimeout(() => setTransitioning(false), reduceMotion ? 80 : 1050);
  };

  const selectDestination = (index: number) => {
    selectionLock.current = index;
    setCurrentIndex(index);
    if (selectionTimer.current) clearTimeout(selectionTimer.current);
    selectionTimer.current = setTimeout(() => { selectionLock.current = null; }, reduceMotion ? 50 : 1500);
  };

  return (
    <div className="portfolio-voyage">
      <DepthVoyageScene />
      <AnimatePresence>{showIntro && <IntroScene key="intro-scene" onNext={beginVoyage} />}</AnimatePresence>
      {transitioning && <motion.div className="voyage-transition" initial={{ scaleX: 0, opacity: 0 }} animate={{ scaleX: [0, 1, 0], opacity: [0, 1, 0] }} transition={{ duration: reduceMotion ? 0.1 : 0.9, times: [0, 0.4, 1], ease: 'easeInOut' }} aria-hidden="true" />}

      <main className="portfolio-main" aria-hidden={showIntro} inert={showIntro}>
        <ScrollProgress />
        <OceanHome onNavigate={index => { document.getElementById(voyageDestinations[index].target)?.scrollIntoView({ behavior: reduceMotion ? 'auto' : 'smooth', block: 'center' }); selectDestination(index); }} />
        <div className="voyage-content">
          <div className="destination-heading destination-heading-about"><span>01 / THE CAPTAIN</span><span>ABOARD</span></div>
          <About />
          <div className="destination-heading destination-heading-projects"><span>02 / CHARTED WORK</span><span>THE TREASURE LOG</span></div>
          <Projects />
          <div className="destination-heading destination-heading-certs"><span>03 / MILESTONES</span><span>MARKS OF THE VOYAGE</span></div>
          <Certifications />
          <div className="destination-heading destination-heading-journey"><span>04 / THE ROUTE SO FAR</span><span>EXPERIENCE | EDUCATION</span></div>
          <Journey />
          <div className="destination-heading destination-heading-github"><span>05 / OPEN WATERS</span><span>BUILDING IN PUBLIC</span></div>
          <GitHub />
          <div className="destination-heading destination-heading-contact"><span>06 / THE NEXT HORIZON</span><span>MAKE CONTACT</span></div>
          <Contact />
        </div>
        <Footer />
      </main>
      {!showIntro && <VoyageNavigation currentIndex={currentIndex} onSelect={selectDestination} />}
    </div>
  );
}
