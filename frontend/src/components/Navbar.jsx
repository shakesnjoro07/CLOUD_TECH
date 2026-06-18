// frontend/src/components/Navbar.jsx
import React from 'react';

export default function Navbar() {
  const handleScroll = (id) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <nav className="sticky top-0 z-50 border-b border-slate-900 bg-slate-950/90 backdrop-blur-md px-6 py-4">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row gap-4 md:gap-0 items-center justify-between">
        
        {/* Left Side: Services Link */}
        <div className="hidden md:block text-sm font-medium text-slate-400">
          <button onClick={() => handleScroll('services')} className="hover:text-slate-100 transition-colors">
            Our Solutions
          </button>
        </div>

        {/* Center Side: Your Custom Animated "CT CLOUD TECH" Logo */}
        <div 
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} 
          className="flex flex-col items-center cursor-pointer select-none group"
        >
          {/* Animated SVG Cloud & Circuit CT Icon */}
          <svg 
            className="w-16 h-12 text-cyan-400 fill-none filter drop-shadow-[0_0_8px_rgba(34,211,238,0.2)] animate-logo-pulse" 
            viewBox="0 0 120 80"
          >
            {/* Cloud Outline Frame */}
            <path 
              d="M35 55 A 15 15 0 0 1 35 25 A 20 21 0 0 1 75 20 A 18 18 0 0 1 95 38 A 12 12 0 0 1 90 55 Z" 
              stroke="currentColor" 
              strokeWidth="3.5" 
              strokeLinecap="round" 
              strokeLinejoin="round" 
            />
            {/* The 'C' Element */}
            <path 
              d="M58 38 C 45 38, 42 45, 42 50 C 42 55, 45 60, 58 60" 
              stroke="url(#ctGradient)" 
              strokeWidth="4" 
              strokeLinecap="round" 
            />
            {/* The 'T' Element */}
            <path 
              d="M54 42 L 76 42 M66 42 L 66 60" 
              stroke="url(#ctGradient)" 
              strokeWidth="4" 
              strokeLinecap="round" 
            />
            {/* Circuit Traces Extending Right */}
            <path d="M78 44 L 88 44 A 1.5 1.5 0 1 0 90 44" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
            <path d="M74 50 L 84 50 L 92 47 A 1.5 1.5 0 1 0 94 47" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
            <path d="M70 56 L 80 56 L 88 52 A 1.5 1.5 0 1 0 90 52" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />

            {/* Gradient Definitions */}
            <defs>
              <linearGradient id="ctGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#22d3ee" />
                <stop offset="100%" stopColor="#3b82f6" />
              </linearGradient>
            </defs>
          </svg>

          {/* Typography Stack matching image */}
          <div className="text-center mt-1">
            <span className="text-lg font-bold tracking-widest font-sans text-slate-100">
              CLOUD <span className="text-cyan-400 bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">TECH</span>
            </span>
            <span className="block text-[8px] font-mono tracking-[0.4em] uppercase text-slate-500 font-bold -mt-1 pl-1">
              TECHNOLOGIES
            </span>
          </div>
        </div>

        {/* Right Side: Deploy Action Wire Button */}
        <div className="flex justify-end">
          <button 
            onClick={() => handleScroll('contact')} 
            className="px-4 py-2 bg-slate-900 border border-slate-800 text-cyan-400 hover:border-cyan-500/50 rounded-xl transition-all text-xs font-mono font-bold shadow-md"
          >
            Deploy Request &rarr;
          </button>
        </div>

      </div>
    </nav>
  );
}