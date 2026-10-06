import { Brain, Award, Code2, Database, Layers, Smartphone, Wrench } from 'lucide-react';

export const navItems = ['About', 'Skills', 'Projects', 'Certifications', 'Experience', 'Education', 'Contact'];

export const skills = [
  { icon: Code2, label: 'Frontend', items: ['HTML5', 'CSS3', 'JavaScript', 'React', 'Next.js', 'Tailwind CSS', 'Bootstrap'] },
  { icon: Layers, label: 'Backend', items: ['Node.js', 'Express', 'Python', 'FastAPI', 'REST APIs'] },
  { icon: Database, label: 'Database', items: ['MongoDB', 'MySQL', 'Supabase', 'PostgreSQL', 'SQLite', 'Firebase'] },
  { icon: Brain, label: 'AI Technologies', items: ['TensorFlow', 'MediaPipe', 'OpenCV', 'NumPy', 'Gemini AI', 'Google Maps API'] },
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
  stack: string[];
  githubUrl: string;
  liveUrl?: string;
}

export const projects: Project[] = [
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
