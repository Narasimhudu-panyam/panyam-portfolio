'use client';

import { useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { ArrowDown, ArrowRight, Download, Mail, Waves } from 'lucide-react';
import { IntroScene } from '@/components/intro-scene';
import { VoyageNavigation, makeVoyageTrack, voyageDestinations } from '@/components/voyage-navigation';
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
      <div className="home-content">
        <motion.div initial={reduceMotion ? false : { opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: reduceMotion ? 0 : 0.75, delay: reduceMotion ? 0 : 0.12 }}>
          <p className="home-kicker"><span /> A FULL STACK DEVELOPER&apos;S VOYAGE</p>
          <h2>Panyam Lakshmi<br /><em>Narasimhudu</em></h2>
          <p className="home-role">Full Stack Developer <span>·</span> AI Enthusiast</p>
          <p className="home-introduction">MCA student and developer building modern web applications and AI-powered solutions. I enjoy turning ambitious ideas into useful products with clean architecture, thoughtful interfaces, and practical problem-solving.</p>
          <div className="home-actions">
            <button type="button" onClick={() => onNavigate(1)} className="home-primary"><Waves size={17} /> Begin the voyage <ArrowRight size={17} /></button>
            <a href="/resume.pdf" download="Panyam_Lakshmi_Narasimhudu_Resume.pdf" className="home-secondary"><Download size={16} /> Download résumé</a>
            <button type="button" onClick={() => onNavigate(voyageDestinations.findIndex(item => item.target === 'contact'))} className="home-secondary"><Mail size={16} /> Contact</button>
          </div>
        </motion.div>
      </div>
      <div className="home-scene-meta"><span>OPEN WATER · 01</span><span>06 FEATURED PROJECTS</span><a href="#about" onClick={event => { event.preventDefault(); onNavigate(1); }}>Scroll to explore <ArrowDown size={14} /></a></div>
      <div className="home-horizon-mark" aria-hidden="true"><span /><span /><span /></div>
    </section>
  );
}

export function PortfolioExperience() {
  const reduceMotion = useReducedMotion();
  const [showIntro, setShowIntro] = useState(true);
  const [transitioning, setTransitioning] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [isSailing, setIsSailing] = useState(false);
  const [status, setStatus] = useState('At Home. Choose a destination to sail.');
  const [routePoints, setRoutePoints] = useState(() => makeVoyageTrack(0, 0).points);
  const [routeRotations, setRouteRotations] = useState(() => makeVoyageTrack(0, 0).rotations);
  const isSailingRef = useRef(false);
  const voyageTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    try {
      if (window.localStorage.getItem('panyam-intro-seen') === 'true') setShowIntro(false);
    } catch { /* The introduction remains available when storage is blocked. */ }
    return () => { if (voyageTimer.current) clearTimeout(voyageTimer.current); };
  }, []);

  useEffect(() => {
    if (showIntro) return;
    const nodes = voyageDestinations
      .map(destination => document.getElementById(destination.target))
      .filter((node): node is HTMLElement => Boolean(node));
    const observer = new IntersectionObserver(entries => {
      if (isSailingRef.current) return;
      const visible = entries.filter(entry => entry.isIntersecting).sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
      if (!visible) return;
      const index = voyageDestinations.findIndex(destination => destination.target === visible.target.id);
      if (index < 0) return;
      setCurrentIndex(index);
      setSelectedIndex(index);
      const track = makeVoyageTrack(index, index);
      setRoutePoints(track.points);
      setRouteRotations(track.rotations);
    }, { rootMargin: '-34% 0px -50% 0px', threshold: [0, 0.2, 0.5] });
    nodes.forEach(node => observer.observe(node));
    return () => observer.disconnect();
  }, [showIntro]);

  const beginVoyage = () => {
    try { window.localStorage.setItem('panyam-intro-seen', 'true'); } catch { /* The button still works without storage. */ }
    setTransitioning(true);
    setShowIntro(false);
    window.setTimeout(() => setTransitioning(false), reduceMotion ? 80 : 1050);
  };

  const sailTo = (nextIndex: number) => {
    if (isSailingRef.current || nextIndex < 0 || nextIndex >= voyageDestinations.length) return;
    const origin = currentIndex;
    const destination = voyageDestinations[nextIndex];
    if (nextIndex === origin) {
      document.getElementById(destination.target)?.scrollIntoView({ behavior: reduceMotion ? 'auto' : 'smooth', block: 'start' });
      return;
    }
    isSailingRef.current = true;
    setSelectedIndex(nextIndex);
    setIsSailing(true);
    setStatus(`Under sail to ${destination.label}.`);
    const track = makeVoyageTrack(origin, nextIndex);
    setRoutePoints(track.points);
    setRouteRotations(track.rotations);
    if (voyageTimer.current) clearTimeout(voyageTimer.current);
    const duration = reduceMotion ? 40 : 900 + Math.abs(nextIndex - origin) * 175;
    voyageTimer.current = setTimeout(() => {
      setCurrentIndex(nextIndex);
      setStatus(`${destination.label} reached.`);
      document.getElementById(destination.target)?.scrollIntoView({ behavior: reduceMotion ? 'auto' : 'smooth', block: 'start' });
      voyageTimer.current = setTimeout(() => {
        setIsSailing(false);
        isSailingRef.current = false;
      }, reduceMotion ? 0 : 700);
    }, duration);
  };

  return (
    <div className="portfolio-voyage">
      <AnimatePresence>
        {showIntro && <IntroScene key="intro-scene" onNext={beginVoyage} />}
      </AnimatePresence>

      {transitioning && <motion.div className="voyage-transition" initial={{ scaleX: 0, opacity: 0 }} animate={{ scaleX: [0, 1, 0], opacity: [0, 1, 0] }} transition={{ duration: reduceMotion ? 0.1 : 0.9, times: [0, 0.4, 1], ease: 'easeInOut' }} aria-hidden="true" />}

      <main className="portfolio-main" aria-hidden={showIntro} inert={showIntro}>
        <ScrollProgress />
        <OceanHome onNavigate={sailTo} />
        <div className="voyage-content">
          <div className="destination-heading destination-heading-about"><span>01 / THE CAPTAIN</span><span>ABOARD</span></div>
          <About />
          <div className="destination-heading destination-heading-projects"><span>02 / CHARTED WORK</span><span>THE TREASURE LOG</span></div>
          <Projects />
          <div className="destination-heading destination-heading-certs"><span>03 / MILESTONES</span><span>MARKS OF THE VOYAGE</span></div>
          <Certifications />
          <div className="destination-heading destination-heading-journey"><span>04 / THE ROUTE SO FAR</span><span>EXPERIENCE · EDUCATION</span></div>
          <Journey />
          <div className="destination-heading destination-heading-github"><span>05 / OPEN WATERS</span><span>BUILDING IN PUBLIC</span></div>
          <GitHub />
          <div className="destination-heading destination-heading-contact"><span>06 / THE NEXT HORIZON</span><span>MAKE CONTACT</span></div>
          <Contact />
        </div>
        <Footer />
      </main>

      {!showIntro && <VoyageNavigation
        currentIndex={currentIndex}
        selectedIndex={selectedIndex}
        isSailing={isSailing}
        routePoints={routePoints}
        routeRotations={routeRotations}
        status={status}
        onSelect={sailTo}
        onPrevious={() => sailTo(selectedIndex - 1)}
        onNext={() => sailTo(selectedIndex + 1)}
      />}
    </div>
  );
}
