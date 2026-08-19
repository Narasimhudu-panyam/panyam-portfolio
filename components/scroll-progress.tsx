'use client';
import { motion, useScroll, useSpring } from 'framer-motion';
export function ScrollProgress() { const { scrollYProgress } = useScroll(); const scaleX = useSpring(scrollYProgress, { stiffness: 100, damping: 30 }); return <motion.div className="fixed left-0 top-0 z-[60] h-px w-full origin-left bg-gradient-to-r from-violet-500 via-cyan-400 to-blue-500" style={{ scaleX }} />; }
