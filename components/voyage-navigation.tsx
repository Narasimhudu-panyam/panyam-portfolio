'use client';

import { useEffect, useState } from 'react';
import { motion, useReducedMotion, useScroll, useSpring, useTransform } from 'framer-motion';
import { Anchor, ChevronLeft, ChevronRight, Compass } from 'lucide-react';

export const voyageDestinations = [
  { label: 'Home', target: 'home' },
  { label: 'About', target: 'about' },
  { label: 'Skills', target: 'skills' },
  { label: 'Projects', target: 'projects' },
  { label: 'Certifications', target: 'certifications' },
  { label: 'Experience', target: 'experience' },
  { label: 'Education', target: 'education' },
  { label: 'GitHub', target: 'github' },
  { label: 'Contact', target: 'contact' },
] as const;

type Point = { x: number; y: number };
const stops: Point[] = [55, 166, 277, 388, 499, 610, 721, 832, 943].map((x, index) => ({
  x,
  y: [72, 47, 77, 43, 73, 46, 78, 45, 70][index],
}));

export function readVoyageProgress(): number[] {
  if (typeof window === 'undefined') return voyageDestinations.map((_, index) => index / (voyageDestinations.length - 1));
  const maxScroll = Math.max(1, document.documentElement.scrollHeight - window.innerHeight);
  let previous = 0;
  return voyageDestinations.map((destination, index) => {
    if (index === 0) return 0;
    const element = document.getElementById(destination.target);
    const absoluteTop = element ? element.getBoundingClientRect().top + window.scrollY : maxScroll * index / (voyageDestinations.length - 1);
    const raw = Math.max(0, Math.min(1, (absoluteTop + (element?.offsetHeight ?? 0) * 0.35 - window.innerHeight * 0.45) / maxScroll));
    previous = Math.min(1, Math.max(raw, previous + 0.0001));
    return previous;
  });
}

export function useVoyageProgress(): number[] {
  const [stopsAt, setStopsAt] = useState<number[]>(() => voyageDestinations.map((_, index) => index / (voyageDestinations.length - 1)));
  useEffect(() => {
    let frame = 0;
    const measure = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => setStopsAt(readVoyageProgress()));
    };
    measure();
    window.addEventListener('resize', measure, { passive: true });
    const observer = new ResizeObserver(measure);
    observer.observe(document.body);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener('resize', measure);
      observer.disconnect();
    };
  }, []);
  return stopsAt;
}

function segmentPath(from: number, to: number) {
  const start = stops[from];
  const end = stops[to];
  const dx = end.x - start.x;
  const dy = end.y - start.y;
  const bend = (from % 2 === 0 ? -18 : 18) * Math.sign(dx || 1);
  return `C ${start.x + dx * 0.34} ${start.y + dy * 0.34 + bend}, ${start.x + dx * 0.68} ${start.y + dy * 0.68 + bend}, ${end.x} ${end.y}`;
}

function fullRoutePath() {
  return stops.reduce((path, point, index) => {
    if (index === 0) return `M ${point.x} ${point.y}`;
    return `${path} ${segmentPath(index - 1, index)}`;
  }, '');
}

export function SailingShip({ className = '' }: { className?: string }) {
  return <svg aria-hidden="true" viewBox="0 0 100 72" className={`voyage-ship-art ${className}`}>
    <path d="M10 48 Q45 55 90 45 L78 61 Q48 67 22 58Z" fill="#39271f" stroke="#c39662" strokeWidth="2.2" />
    <path d="M46 13 V49 M66 20 V51" stroke="#624630" strokeWidth="3" />
    <path d="M43 16 23 42 H43Z M49 18 64 43 H49Z M63 23 81 44 H66Z" fill="#eee2c9" stroke="#c9b897" strokeWidth="1.4" />
    <path d="M21 52 Q29 49 37 54 M34 62 Q43 58 52 63 M68 61 Q77 57 86 57" fill="none" stroke="#f5e7d3" strokeWidth="1.6" strokeLinecap="round" opacity=".78" />
    <path d="M46 12 55 16 46 20Z" fill="#b56b4d" />
  </svg>;
}

type VoyageNavigationProps = {
  currentIndex: number;
  onSelect: (index: number) => void;
};

export function VoyageNavigation({ currentIndex, onSelect }: VoyageNavigationProps) {
  const reduceMotion = useReducedMotion();
  const { scrollYProgress } = useScroll();
  const routeProgress = useVoyageProgress();
  const route = fullRoutePath();
  const left = useTransform(scrollYProgress, routeProgress, stops.map(point => `${point.x / 10}%`));
  const top = useTransform(scrollYProgress, routeProgress, stops.map(point => `${point.y / 120 * 100}%`));
  const easedLeft = useSpring(left, { stiffness: 60, damping: 24, mass: 0.8 });
  const easedTop = useSpring(top, { stiffness: 60, damping: 24, mass: 0.8 });
  const active = voyageDestinations[currentIndex] ?? voyageDestinations[0];
  const shipLeft = reduceMotion ? `${stops[currentIndex].x / 10}%` : easedLeft;
  const shipTop = reduceMotion ? `${stops[currentIndex].y / 120 * 100}%` : easedTop;
  const indexText = `${String(currentIndex + 1).padStart(2, '0')} / ${String(voyageDestinations.length).padStart(2, '0')}`;
  const choose = (index: number) => {
    const target = document.getElementById(voyageDestinations[index].target);
    target?.scrollIntoView({ behavior: reduceMotion ? 'auto' : 'smooth', block: 'center' });
    onSelect(index);
  };
  return (
    <nav className="voyage-dock" aria-label="Portfolio voyage navigation">
      <div className="voyage-dock-heading">
        <span className="voyage-brand"><Compass size={16} /> THE GRAND VOYAGE</span>
        <span className="voyage-status" aria-live="polite"><Anchor size={13} /> {active.label} | {indexText}</span>
        <div className="desktop-voyage-controls">
          <button type="button" onClick={() => choose(Math.max(0, currentIndex - 1))} disabled={currentIndex === 0} aria-label="Previous destination"><ChevronLeft size={17} /> Previous</button>
          <button type="button" onClick={() => choose(Math.min(voyageDestinations.length - 1, currentIndex + 1))} disabled={currentIndex === voyageDestinations.length - 1} aria-label="Next destination">Next <ChevronRight size={17} /></button>
        </div>
      </div>
      <div className="voyage-track" aria-hidden="true">
        <svg className="voyage-route-svg" viewBox="0 0 1000 120" preserveAspectRatio="none">
          <path d={route} className="voyage-route-shadow" />
          <path d={route} className="voyage-route-line" />
          {stops.map((point, index) => <circle key={voyageDestinations[index].target} cx={point.x} cy={point.y} r={index === currentIndex ? 7 : 4.2} className={index === currentIndex ? 'route-stop route-stop-active' : 'route-stop'} />)}
        </svg>
        <motion.div className="voyage-ship" style={{ left: shipLeft, top: shipTop }}>
          <SailingShip />
        </motion.div>
      </div>
      <div className="voyage-destinations">
        {voyageDestinations.map((destination, index) => <button key={destination.target} type="button" className={index === currentIndex ? 'voyage-stop voyage-stop-active' : 'voyage-stop'} aria-current={index === currentIndex ? 'location' : undefined} aria-label={`Sail to ${destination.label}`} onClick={() => choose(index)}>{destination.label}</button>)}
      </div>
      <div className="mobile-voyage-controls">
        <button type="button" onClick={() => choose(Math.max(0, currentIndex - 1))} disabled={currentIndex === 0} aria-label="Previous destination"><ChevronLeft size={20} /></button>
        <label><span className="sr-only">Choose portfolio destination</span><select value={currentIndex} onChange={event => choose(Number(event.target.value))} aria-label="Choose portfolio destination">{voyageDestinations.map((destination, index) => <option key={destination.target} value={index}>{destination.label}</option>)}</select></label>
        <button type="button" onClick={() => choose(Math.min(voyageDestinations.length - 1, currentIndex + 1))} disabled={currentIndex === voyageDestinations.length - 1} aria-label="Next destination"><ChevronRight size={20} /></button>
      </div>
      <p className="sr-only" role="status">{`At ${active.label}. Destination ${indexText}.`}</p>
    </nav>
  );
}
