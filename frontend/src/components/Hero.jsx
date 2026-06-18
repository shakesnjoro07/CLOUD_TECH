// frontend/src/components/Hero.jsx
import React from 'react';

export default function Hero() {
  const scrollToContact = () => {
    const contactSection = document.getElementById('contact');
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="relative overflow-hidden py-24 md:py-32 flex flex-col items-center text-center px-6">
      {/* Visual Background Glow */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none"></div>

      <div className="relative z-10 max-w-3xl mx-auto">
        {/* Animated Badge */}
        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 mb-6 font-mono tracking-wider uppercase animate-pulse">
          ● Next-Gen Systems Integration
        </span>

        {/* Title */}
        <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight text-slate-100 mb-6 leading-tight">
          We Build Highly Efficient, <br />
          <span className="bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
            Reliable Systems.
          </span>
        </h1>

        {/* Subtitle */}
        <p className="text-base md:text-lg text-slate-400 max-w-xl mx-auto mb-10 leading-relaxed">
          From tailored web development to custom intelligent automation workflows. Built engineered for fast, lightweight performance to elevate your digital infrastructure.
        </p>

        {/* Action Call to Button */}
        <div className="flex flex-col sm:flex-row justify-center items-center gap-4">
          <button 
            onClick={scrollToContact}
            className="w-full sm:w-auto px-8 py-4 bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold rounded-xl shadow-lg shadow-cyan-500/20 transition-all transform hover:-translate-y-0.5"
          >
            Initiate Project Build
          </button>
        </div>
      </div>
    </section>
  );
}