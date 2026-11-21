'use client';

import { motion, useReducedMotion } from 'framer-motion';
import { Anchor, ChevronLeft, ChevronRight, Compass } from 'lucide-react';

export const voyageDestinations = [
  { label: 'Home', target: 'home' },
  { label: 'About', target: 'about' },
  { label: 'Skills', target: 'skills' },
  { label: 'Projects', target: 'projects' },
  { label: 'Certifications', target: 'certifications' },
  { label: 'Journey', target: 'journey' },
  { label: 'GitHub', target: 'github' },
  { label: 'Contact', target: 'contact' },
] as const;

type Point = { x: number; y: number };
const stops: Point[] = [55, 182, 309, 436, 563, 690, 817, 944].map((x, index) => ({
  x,
  y: [72, 47, 77, 43, 73, 46, 78, 52][index],
}));

function segmentPoint(from: number, to: number, t: number): Point {
  const start = stops[from];
  const end = stops[to];
  const dx = end.x - start.x;
  const dy = end.y - start.y;
  const bend = (from % 2 === 0 ? -18 : 18) * Math.sign(dx || 1);
  const c1 = { x: start.x + dx * 0.34, y: start.y + dy * 0.34 + bend };
  const c2 = { x: start.x + dx * 0.68, y: start.y + dy * 0.68 + bend };
  const u = 1 - t;
  return {
    x: u ** 3 * start.x + 3 * u ** 2 * t * c1.x + 3 * u * t ** 2 * c2.x + t ** 3 * end.x,
    y: u ** 3 * start.y + 3 * u ** 2 * t * c1.y + 3 * u * t ** 2 * c2.y + t ** 3 * end.y,
  };
}

function segmentPath(from: number, to: number) {
  const start = stops[from];
  const end = stops[to];
  const dx = end.x - start.x;
  const dy = end.y - start.y;
  const bend = (from % 2 === 0 ? -18 : 18) * Math.sign(dx || 1);
  return `C ${start.x + dx * 0.34} ${start.y + dy * 0.34 + bend}, ${start.x + dx * 0.68} ${start.y + dy * 0.68 + bend}, ${end.x} ${end.y}`;
}

export function makeVoyageTrack(fromIndex: number, toIndex: number): { points: Point[]; rotations: number[] } {
  if (fromIndex === toIndex) return { points: [stops[toIndex]], rotations: [0] };
  const points: Point[] = [stops[fromIndex]];
  const direction = toIndex > fromIndex ? 1 : -1;
  for (let segment = fromIndex; segment !== toIndex; segment += direction) {
    const left = direction > 0 ? segment : segment - 1;
    if (direction > 0) {
      for (let step = 1; step <= 12; step += 1) points.push(segmentPoint(left, left + 1, step / 12));
    } else {
      for (let step = 11; step >= 0; step -= 1) points.push(segmentPoint(left, left + 1, step / 12));
    }
  }
  const rotations = points.map((point, index) => {
    const previous = points[Math.max(0, index - 1)];
    const next = points[Math.min(points.length - 1, index + 1)];
    return Math.atan2(next.y - previous.y, next.x - previous.x) * 180 / Math.PI;
  });
  return { points, rotations };
}

function fullRoutePath() {
  return stops.reduce((path, point, index) => {
    if (index === 0) return `M ${point.x} ${point.y}`;
    return `${path} ${segmentPath(index - 1, index)}`;
  }, '');
}

function SailingShip() {
  return <svg aria-hidden="true" viewBox="0 0 100 72" className="voyage-ship-art">
    <path d="M10 48 Q45 55 90 45 L78 61 Q48 67 22 58Z" fill="#39271f" stroke="#c39662" strokeWidth="2.2" />
    <path d="M46 13 V49 M66 20 V51" stroke="#624630" strokeWidth="3" />
    <path d="M43 16 23 42 H43Z M49 18 64 43 H49Z M63 23 81 44 H66Z" fill="#eee2c9" stroke="#c9b897" strokeWidth="1.4" />
    <path d="M21 52 Q29 49 37 54 M34 62 Q43 58 52 63 M68 61 Q77 57 86 57" fill="none" stroke="#f5e7d3" strokeWidth="1.6" strokeLinecap="round" opacity=".78" />
    <path d="M46 12 55 16 46 20Z" fill="#b56b4d" />
  </svg>;
}

type VoyageNavigationProps = {
  currentIndex: number;
  selectedIndex: number;
  isSailing: boolean;
  routePoints: Point[];
  routeRotations: number[];
  status: string;
  onSelect: (index: number) => void;
  onPrevious: () => void;
  onNext: () => void;
};

export function VoyageNavigation({ currentIndex, selectedIndex, isSailing, routePoints, routeRotations, status, onSelect, onPrevious, onNext }: VoyageNavigationProps) {
  const reduceMotion = useReducedMotion();
  const active = voyageDestinations[selectedIndex];
  const indexText = `${String(selectedIndex + 1).padStart(2, '0')} / ${String(voyageDestinations.length).padStart(2, '0')}`;
  const route = fullRoutePath();
  const points = routePoints.length ? routePoints : [stops[currentIndex]];
  return (
    <nav className="voyage-dock" aria-label="Portfolio voyage navigation">
      <div className="voyage-dock-heading">
        <span className="voyage-brand"><Compass size={16} /> THE GRAND VOYAGE</span>
        <span className="voyage-status" aria-live="polite">{isSailing ? <><span className="status-lantern" /> Under sail · {active.label}</> : <><Anchor size={13} /> {active.label} · {indexText}</>}</span>
        <div className="desktop-voyage-controls">
          <button type="button" onClick={onPrevious} disabled={isSailing || selectedIndex === 0} aria-label="Previous destination"><ChevronLeft size={17} /> Previous</button>
          <button type="button" onClick={onNext} disabled={isSailing || selectedIndex === voyageDestinations.length - 1} aria-label="Next destination">Next <ChevronRight size={17} /></button>
        </div>
      </div>
      <div className="voyage-track" aria-hidden="true">
        <svg className="voyage-route-svg" viewBox="0 0 1000 120" preserveAspectRatio="none">
          <path d={route} className="voyage-route-shadow" />
          <path d={route} className="voyage-route-line" />
          {stops.map((point, index) => <circle key={index} cx={point.x} cy={point.y} r={index === selectedIndex ? 7 : 4.2} className={index === selectedIndex ? 'route-stop route-stop-active' : 'route-stop'} />)}
        </svg>
        <motion.div
          className="voyage-ship"
          data-sailing={isSailing}
          animate={{ left: points.map(point => `${point.x / 10}%`), top: points.map(point => `${point.y / 120 * 100}%`), rotate: routeRotations.length ? routeRotations : [0] }}
          transition={{ duration: reduceMotion ? 0.01 : isSailing ? Math.min(2.5, 0.78 + Math.abs(selectedIndex - currentIndex) * 0.19) : 0.34, ease: 'easeInOut' }}
        ><SailingShip /></motion.div>
      </div>
      <div className="voyage-destinations">
        {voyageDestinations.map((destination, index) => <button
          key={destination.target}
          type="button"
          className={index === selectedIndex ? 'voyage-stop voyage-stop-active' : 'voyage-stop'}
          aria-current={index === selectedIndex ? 'location' : undefined}
          aria-label={`Sail to ${destination.label}`}
          disabled={isSailing}
          onClick={() => onSelect(index)}
        >{destination.label}</button>)}
      </div>
      <div className="mobile-voyage-controls">
        <button type="button" onClick={onPrevious} disabled={isSailing || selectedIndex === 0} aria-label="Previous destination"><ChevronLeft size={20} /></button>
        <label><span className="sr-only">Choose portfolio destination</span><select value={selectedIndex} disabled={isSailing} onChange={event => onSelect(Number(event.target.value))} aria-label="Choose portfolio destination">{voyageDestinations.map((destination, index) => <option key={destination.target} value={index}>{destination.label}</option>)}</select></label>
        <button type="button" onClick={onNext} disabled={isSailing || selectedIndex === voyageDestinations.length - 1} aria-label="Next destination"><ChevronRight size={20} /></button>
      </div>
      <p className="sr-only" role="status">{status}</p>
    </nav>
  );
}
