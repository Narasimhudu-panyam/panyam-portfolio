import { Brain, Award, Code2, Database, Layers, Smartphone, Wrench } from 'lucide-react';

export const navItems = ['About', 'Skills', 'Projects', 'Certifications', 'Experience', 'Education', 'Contact'];

export const skills = [
  { icon: Code2, label: 'Frontend', items: ['HTML5', 'CSS3', 'JavaScript', 'TypeScript', 'React', 'Next.js', 'Vite', 'Tailwind CSS', 'Bootstrap'] },
  { icon: Layers, label: 'Backend', items: ['Node.js', 'Express', 'Python', 'FastAPI', 'REST APIs'] },
  { icon: Database, label: 'Database', items: ['MongoDB', 'MySQL', 'Supabase', 'PostgreSQL', 'SQLite', 'ChromaDB', 'Firebase'] },
  { icon: Brain, label: 'AI Technologies', items: ['RAG', 'ChromaDB', 'Ollama', 'Sentence Transformers', 'TensorFlow', 'MediaPipe', 'OpenCV', 'NumPy', 'Gemini AI'] },
  { icon: Smartphone, label: 'Mobile', items: ['Flutter', 'Dart', 'Offline Sync', 'Secure Storage'] },
  { icon: Wrench, label: 'Tools & DevOps', items: ['Git', 'GitHub', 'VS Code', 'Vercel'] },
];

export interface Project {
  name: string;
  tag: string;
  image: string;
  description: string;
  fullDescription?: string;
  features: string[];
  architecture?: string[];
  challenges?: string[];
  architectureDiagram?: string;
  accent?: 'cyan' | 'emerald';
  stack: string[];
  githubUrl: string;
  liveUrl?: string;
}

export const projects: Project[] = [
  {
    name: 'FoodRescue — Food Waste to Donation Matcher',
    tag: 'Full Stack Development · Social Impact · Geospatial Technology',
    image: '/projects/food-rescue.png',
    description: 'A full-stack food rescue platform that connects commercial food businesses with verified community organizations and volunteer dispatchers. It uses geospatial matching, food-safety checks, donation coordination, and real-time pickup tracking to help surplus food reach communities in need.',
    fullDescription: 'A full-stack food rescue and donation matching platform that bridges the gap between commercial food surplus and local hunger relief organizations. By integrating PostGIS spatial indexing with asynchronous FastAPI endpoints and Leaflet interactive maps, FoodRescue automates radius-bounded donation discovery, enforces food-safety and capacity rules, and coordinates volunteer pickup dispatches with real-time WebSocket communication.',
    architectureDiagram: 'Next.js Frontend → FastAPI Backend → PostgreSQL/PostGIS Database, with WebSockets for real-time notifications.',
    features: [
      'Food donation creation, categorization, and quantity management with real-time expiration monitoring',
      'Geospatial matching between food donors and eligible recipient organizations using PostGIS ST_DWithin queries',
      'Organization verification workflow and granular role-based access control (Donors, Recipients, Dispatchers)',
      'Donation acceptance, capacity reservation, and volunteer pickup/delivery coordination',
      'Food-safety validation, shelf-life verification, and temperature requirement tracking',
      'Real-time WebSocket notifications and live status updates across the pickup lifecycle',
      'Analytics dashboard for donation volume, waste diversion impact, and fulfillment metrics'
    ],
    architecture: [
      'Next.js 16 (App Router) + React 19 + TypeScript + Tailwind CSS Frontend',
      'FastAPI + Uvicorn Asynchronous REST API & Native WebSocket Server',
      'PostgreSQL 16 + PostGIS 3.4 Spatial Database (GEOGRAPHY(Point, 4326))',
      'SQLAlchemy 2.0 (Asyncpg) with Alembic Database Schema Migrations',
      'JWT Authentication (Access & Refresh Tokens) with Role-Based Access Control (RBAC)',
      'In-Memory Notification Event Hub for Targeted Broadcasts',
      'Multi-Stage Docker & Docker Compose Containerization'
    ],
    challenges: [
      'Spatial Database Queries: Executed optimized ST_DWithin and ST_Distance geospatial calculations on GEOGRAPHY(Point, 4326) columns with spatial indexing to calculate radius-bounded matching between donors and recipient organizations without performance bottlenecks.',
      'Asynchronous Concurrency: Designed a high-throughput async SQLAlchemy 2.0 + asyncpg pipeline within FastAPI to prevent event-loop blocking during simultaneous spatial queries and concurrent client connections.',
      'Data Validation & Food Safety: Enforced strict Pydantic v2 schemas and client-side Zod validation to ensure non-negotiable food-safety parameters (perishable flags, storage temperatures, expiration windows) are validated before donation broadcast.',
      'Authorization & Multi-Role Governance: Built fine-grained JWT role-based access control (RBAC) securely separating commercial food donors, verified community non-profits, and volunteer delivery dispatchers.',
      'Coordinating Donation Workflows: Managed atomic transactional state transitions (Available → Matched → Claimed → Picked Up → Delivered) while broadcasting instant state changes to all parties via WebSockets.'
    ],
    stack: [
      'Next.js',
      'React',
      'TypeScript',
      'Tailwind CSS',
      'Python',
      'FastAPI',
      'SQLAlchemy 2.0',
      'PostgreSQL',
      'PostGIS',
      'WebSockets',
      'Docker',
      'Docker Compose'
    ],
    githubUrl: 'https://github.com/Narasimhudu-panyam/food-helper',
    liveUrl: 'https://food-helper-swart.vercel.app/',
    accent: 'emerald'
  },
  {
    name: 'AI Software Engineering Assistant',
    tag: 'AI · ML · RAG · Local LLM',
    image: '/projects/ai-software-engineering-assistant.png',
    description: 'An AI-powered developer debugging assistant that combines Machine Learning, Retrieval-Augmented Generation (RAG), and a locally hosted LLM to analyze software errors and provide context-aware troubleshooting guidance.',
    fullDescription: 'An AI-powered developer debugging assistant that combines Machine Learning, Retrieval-Augmented Generation (RAG), and a locally hosted LLM to analyze software errors and provide context-aware troubleshooting guidance.',
    features: [
      'Error classification into 10 categories using TF-IDF + Logistic Regression with confidence scores',
      'ChromaDB & all-MiniLM-L6-v2 vector search for technical documentation retrieval',
      'Ollama + Qwen2.5 0.5B local LLM for private, offline AI response generation',
      'SQLite persistence for multi-session chat history and conversation logs',
      'FastAPI backend with React + Vite + TypeScript interactive frontend',
      'End-to-end ML → RAG → Local LLM workflow verified with 17/17 test suite pass'
    ],
    architecture: [
      'TF-IDF & Logistic Regression Error Classifier',
      'ChromaDB Vector Store with Sentence Transformers',
      'Ollama Engine running Qwen2.5 0.5B',
      'SQLite Conversation Store',
      'FastAPI REST Service API',
      'React & Vite TypeScript Interface'
    ],
    stack: [
      'Python',
      'FastAPI',
      'React',
      'Vite',
      'TypeScript',
      'TF-IDF',
      'Logistic Regression',
      'ChromaDB',
      'Sentence Transformers',
      'Ollama',
      'Qwen2.5 0.5B',
      'SQLite'
    ],
    githubUrl: 'https://github.com/Narasimhudu-panyam/sofware-assistant'
  },
  {
    name: 'AI Smart Travel Planner',
    tag: 'AI · Full Stack',
    image: '/projects/ai-smart-travel-planner.png',
    description: 'An AI-powered travel planning application that generates personalized itineraries based on destination and budget, with intelligent recommendations, maps, weather information, expense estimation, and cloud-backed trip management.',
    fullDescription: 'An AI-powered travel planning application that generates personalized itineraries based on destination and budget, with intelligent recommendations, maps, weather information, expense estimation, and cloud-backed trip management.',
    features: [
      'Gemini AI personalized itinerary generation',
      'Destination & budget-based trip planning',
      'Google Maps APIs location & routing integration',
      'OpenWeather API real-time weather forecasting',
      'Expense estimation and budget tracking',
      'Cloud-backed trip saving and management'
    ],
    stack: ['React', 'FastAPI', 'Python', 'Gemini AI', 'MongoDB', 'Google Maps APIs', 'OpenWeather API'],
    githubUrl: 'https://github.com/Narasimhudu-panyam/AI-Smart-Travel-Planner',
    liveUrl: 'https://ai-smart-travel-planner-five.vercel.app/'
  },
  {
    name: 'Netflix Clone',
    tag: 'Frontend',
    image: '/projects/netflix-clone.png',
    description: 'A responsive streaming-platform interface inspired by modern OTT experiences, featuring dynamic movie browsing, categorized content rows, responsive layouts, and a polished Netflix-style user experience.',
    fullDescription: 'A responsive streaming-platform interface inspired by modern OTT experiences, featuring dynamic movie browsing, categorized content rows, responsive layouts, and a polished Netflix-style user experience.',
    features: [
      'Dynamic movie & show browsing interface',
      'Categorized content rows and carousels',
      'Modern OTT platform look and feel',
      'Fluid micro-interactions and hover states',
      'Fully responsive across desktop, tablet, and mobile'
    ],
    stack: ['Next.js', 'React', 'Tailwind CSS', 'JavaScript'],
    githubUrl: 'https://github.com/Narasimhudu-panyam/netflix-clone',
    liveUrl: 'https://netflix-clone-brown-chi.vercel.app/'
  },
  {
    name: 'Flutter + Supabase To-Do Management App',
    tag: 'Mobile · Cloud · Offline-First',
    image: '/projects/flutter-supabase-todo.png',
    description: 'A secure task management application built with Flutter and Supabase featuring authentication, task CRUD operations, reminders, offline-first task management, SQLite local persistence, and automatic synchronization when connectivity is restored.',
    fullDescription: 'A secure task management application built with Flutter and Supabase featuring authentication, task CRUD operations, reminders, offline-first task management, SQLite local persistence, and automatic synchronization when connectivity is restored.',
    features: [
      'Secure user authentication',
      'Task CRUD operations',
      'Due dates and reminders',
      'Offline-first task creation & editing',
      'SQLite local persistence',
      'Automatic cloud synchronization on reconnect',
      'Supabase Realtime updates',
      'Secure storage for credentials',
      'Row Level Security (RLS) data protection'
    ],
    architecture: [
      'Flutter & Dart UI framework',
      'Supabase Authentication',
      'Supabase PostgreSQL Cloud DB',
      'Supabase Realtime updates',
      'SQLite Local Storage',
      'Background Synchronization Engine',
      'Row Level Security (RLS)',
      'Secure Storage'
    ],
    stack: ['Flutter', 'Dart', 'Supabase', 'PostgreSQL', 'SQLite', 'Realtime', 'Authentication', 'Secure Storage'],
    githubUrl: 'https://github.com/Narasimhudu-panyam/flutter-supabase-todo-management'
  },
  {
    name: 'VSign – Vision-Based Sign Language Subtitler',
    tag: 'Computer Vision · AI',
    image: '/projects/vsign.png',
    description: 'An AI-powered real-time sign language recognition system that uses computer vision and deep learning to recognize hand gestures and convert them into text subtitles for more accessible communication.',
    fullDescription: 'An AI-powered real-time sign language recognition system that uses computer vision and deep learning to recognize hand gestures and convert them into text subtitles for more accessible communication.',
    features: [
      'Real-time hand gesture tracking and landmark detection',
      'MediaPipe vision pipeline for keypoint extraction',
      'Multi-Layer Perceptron (MLP) gesture classification model',
      'Low-latency (200-300 ms) subtitle generation',
      'Gesture stability logic for enhanced accuracy'
    ],
    stack: ['Python', 'TensorFlow', 'MediaPipe', 'OpenCV', 'NumPy', 'Machine Learning'],
    githubUrl: 'https://github.com/Narasimhudu-panyam/vsign-sign-language-recognition'
  }
];

export interface Certification {
  id: string;
  title: string;
  organization: string;
  program?: string;
  inAssociationWith?: string;
  date?: string;
  duration?: string;
  certId?: string;
  teamId?: string;
  description: string;
  pdfUrl: string;
  previewUrl: string;
}

export const certifications: Certification[] = [
  {
    id: 'frontend-pbl',
    title: 'IBM SkillsBuild Project Based Learning Program – Front End Web Development',
    organization: 'IBM SkillsBuild × CSRBOX',
    program: 'Click, Code, Create: Beginner’s Guide to Front End Web Development with CSRBOX',
    date: 'July – August 2025',
    description: 'Successfully completed a project-based learning program focused on front-end web development fundamentals and practical web development skills.',
    pdfUrl: '/certificates/ibm-skillsbuild-frontend-development.pdf',
    previewUrl: '/certificates/ibm-skillsbuild-frontend-development-preview.png',
    teamId: 'IBM 25PBL 1764'
  },
  {
    id: 'genai-cloud-internship',
    title: 'IBM SkillsBuild Gen AI & Cloud Computing Internship',
    organization: 'BharatCares × IBM SkillsBuild',
    inAssociationWith: 'All India Council for Technical Education (AICTE)',
    duration: '22 June 2026 – 31 July 2026',
    certId: 'BHIBMAC02725',
    description: 'Successfully completed a 6-week internship focused on Generative AI and Cloud Computing through the IBM SkillsBuild program, conducted by BharatCares in association with AICTE and IBM SkillsBuild.',
    pdfUrl: '/certificates/ibm-skillsbuild-genai-cloud-internship.pdf',
    previewUrl: '/certificates/ibm-skillsbuild-genai-cloud-internship-preview.png'
  }
];
