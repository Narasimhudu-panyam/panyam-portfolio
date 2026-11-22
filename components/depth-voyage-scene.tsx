'use client';

import { motion, useReducedMotion, useScroll, useSpring, useTransform } from 'framer-motion';
import { SailingShip, useVoyageProgress } from '@/components/voyage-navigation';

const hills = [
  { name: 'The First Passage', x: 16, y: 71, width: 570, shape: 'hill-shape-a' },
  { name: 'The Far Ridge', x: 80, y: 60, width: 480, shape: 'hill-shape-b' },
  { name: 'The High Water', x: 31, y: 56, width: 660, shape: 'hill-shape-c' },
  { name: 'The Crown Isles', x: 73, y: 76, width: 530, shape: 'hill-shape-a' },
  { name: 'The Blue Reach', x: 18, y: 66, width: 620, shape: 'hill-shape-b' },
  { name: 'The Amber Coast', x: 82, y: 62, width: 570, shape: 'hill-shape-c' },
  { name: 'The Last Horizon', x: 49, y: 57, width: 720, shape: 'hill-shape-a' },
];

function DistantIsland({ index, name, x, y, width, shape }: { index: number } & (typeof hills)[number]) {
  const { scrollYProgress } = useScroll();
  const routeStops = useVoyageProgress();
  const routeCenter = routeStops[Math.min(routeStops.length - 1, Math.round(index * (routeStops.length - 1) / (hills.length - 1)))];
  const center = Math.max(0.08, Math.min(0.92, routeCenter));
  const start = Math.max(0, center - 0.18);
  const end = Math.min(1, center + 0.18);
  const scale = useTransform(scrollYProgress, [start, center, end], [0.54, 1.08, 0.44]);
  const opacity = useTransform(scrollYProgress, [start, center, end], [0.18, 0.78, 0.11]);
  const depth = useTransform(scrollYProgress, [0, 1], [260 + center * 420, -160 + center * 420]);
  const softenedScale = useSpring(scale, { stiffness: 44, damping: 22, mass: 0.85 });
  const softenedOpacity = useSpring(opacity, { stiffness: 44, damping: 22, mass: 0.85 });
  const reduceMotion = useReducedMotion();
  return (
    <motion.div
      className={`distant-island ${shape}`}
      aria-label={name}
      style={{ left: `${x}%`, top: `${y}%`, width: `min(${width}px, 66vw)`, z: reduceMotion ? 120 + index * 40 : depth, scale: reduceMotion ? 0.72 : softenedScale, opacity: reduceMotion ? 0.28 : softenedOpacity }}
    >
      <span className="island-ridge island-ridge-back" />
      <span className="island-ridge island-ridge-front" />
      <span className="island-beacon" />
    </motion.div>
  );
}

export function DepthVoyageScene() {
  const { scrollYProgress } = useScroll();
  const routeStops = useVoyageProgress();
  const reduceMotion = useReducedMotion();
  const cameraX = useTransform(scrollYProgress, routeStops, ['-4vw', '5vw', '-7vw', '8vw', '-6vw', '6vw', '-7vw', '5vw', '0vw']);
  const cameraY = useTransform(scrollYProgress, routeStops, ['0vh', '-1vh', '1vh', '-1vh', '1vh', '-.5vh', '1vh', '-.5vh', '0vh']);
  const cameraZ = useTransform(scrollYProgress, [0, 1], [0, -420]);
  const cameraRoll = useTransform(scrollYProgress, routeStops, [0, -1.1, 1.2, -1.35, 1.1, -1.3, 1.1, -0.8, 0]);
  const easedX = useSpring(cameraX, { stiffness: 34, damping: 20, mass: 0.9 });
  const easedY = useSpring(cameraY, { stiffness: 34, damping: 20, mass: 0.9 });
  const easedZ = useSpring(cameraZ, { stiffness: 42, damping: 25, mass: 1 });
  const easedRoll = useSpring(cameraRoll, { stiffness: 34, damping: 20 });
  const shipX = useTransform(scrollYProgress, routeStops, ['-41vw', '-30vw', '-16vw', '3vw', '22vw', '40vw', '22vw', '-9vw', '28vw']);
  const shipY = useTransform(scrollYProgress, routeStops, ['0vh', '-4vh', '2vh', '-3vh', '2vh', '-4vh', '2vh', '-3vh', '1vh']);
  const shipRoll = useTransform(scrollYProgress, routeStops, [-7, -4, 3, -3, 4, -5, 2, -4, 6]);
  const shipScale = useTransform(scrollYProgress, routeStops, [0.78, 0.94, 1.05, 1.1, 0.98, 1.13, 1.02, 0.94, 1.14]);
  const smoothedShipX = useSpring(shipX, { stiffness: 52, damping: 20, mass: 0.7 });
  const smoothedShipY = useSpring(shipY, { stiffness: 52, damping: 20, mass: 0.7 });

  return (
    <div className="depth-scene" aria-hidden="true">
      <div className="depth-sky" />
      <div className="depth-haze depth-haze-back" />
      <div className="depth-perspective">
        <motion.div className="depth-camera-world" style={{ x: reduceMotion ? 0 : easedX, y: reduceMotion ? 0 : easedY, z: reduceMotion ? 0 : easedZ, rotateZ: reduceMotion ? 0 : easedRoll }}>
          {hills.map((hill, index) => <DistantIsland key={hill.name} index={index} {...hill} />)}
        </motion.div>
      </div>
      <div className="depth-ocean" />
      <div className="depth-sea-glints" />
      {!reduceMotion && <motion.div className="world-ship" style={{ x: smoothedShipX, y: smoothedShipY, rotate: shipRoll, scale: shipScale }}>
        <SailingShip className="world-ship-art" />
        <span className="ship-wake ship-wake-one" />
        <span className="ship-wake ship-wake-two" />
      </motion.div>}
      {reduceMotion && <div className="world-ship world-ship-static"><SailingShip className="world-ship-art" /></div>}
      <div className="depth-haze depth-haze-front" />
    </div>
  );
}
