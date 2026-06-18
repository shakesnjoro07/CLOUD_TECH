// frontend/src/components/Services.jsx
import React from 'react';

export default function Services({ services, onSelectService }) {
  const handleCardClick = (title) => {
    // 1. Set the selected project type in the parent state
    onSelectService(title);
    
    // 2. Smoothly scroll down to the contact form section
    const contactSection = document.getElementById('contact');
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="services" className="py-20 max-w-6xl mx-auto px-6">
      <h2 className="text-3xl font-bold text-center mb-12 text-cyan-400 font-mono">Our Solutions</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {services.map((service) => (
          <div 
            key={service.id}
            onClick={() => handleCardClick(service.title)} // Trigger on click
            className="p-6 bg-slate-900/40 border border-slate-800 rounded-2xl hover:border-cyan-500/40 transition-all duration-300 cursor-pointer group hover:-translate-y-1"
          >
            <h3 className="text-xl font-semibold mb-2 group-hover:text-cyan-400 transition-colors">{service.title}</h3>
            <p className="text-slate-400 text-sm leading-relaxed">{service.desc}</p>
            <span className="text-xs text-cyan-500 font-mono mt-4 inline-block opacity-0 group-hover:opacity-100 transition-opacity">Select Service →</span>
          </div>
        ))}
      </div>
    </section>
  );
}