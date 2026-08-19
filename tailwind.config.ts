import type { Config } from 'tailwindcss';
const config: Config = { content: ['./app/**/*.{ts,tsx}', './components/**/*.{ts,tsx}', './sections/**/*.{ts,tsx}'], theme: { extend: { colors: { ink: '#030712' }, boxShadow: { glow: '0 0 80px rgba(99,102,241,.24)' } } }, plugins: [] };
export default config;
