// frontend/src/App.jsx
import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Services from './components/Services';
import Contact from './components/Contact';

function App() {
  const [services, setServices] = useState([]);
  const [selectedProject, setSelectedProject] = useState('');

  useEffect(() => {
    fetch('http://localhost:5000/api/services')
      .then(res => res.json())
      .then(data => setServices(data))
      .catch(err => console.error("Error fetching services:", err));
  }, []);

  return (
    <div className="bg-slate-950 text-slate-100 min-h-screen font-sans antialiased selection:bg-cyan-500 selection:text-slate-900">
      <Navbar />
      <main>
        <Hero />
        <Services services={services} onSelectService={setSelectedProject} />
        <Contact selectedProject={selectedProject} setSelectedProject={setSelectedProject} />
      </main>
      
      {/* Centered Stacked Footer */}
      <footer className="border-t border-slate-900 bg-slate-950/80 py-10 text-center">
        <div className="max-w-6xl mx-auto px-6 flex flex-col items-center gap-6">
          
          {/* Social Icons with custom click actions */}
          <div className="flex items-center justify-center gap-8 text-slate-400">
            
            {/* Instagram */}
            <a 
              href="https://instagram.com/shake._ss" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="hover:text-pink-500 transition-colors transform hover:scale-110 duration-200"
              aria-label="Instagram"
            >
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.051.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 1 0 0 12.324 6.162 6.162 0 0 0 0-12.324zM12 16a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm6.406-11.845a1.44 1.44 0 1 0 0 2.881 1.44 1.44 0 0 0 0-2.881z"/>
              </svg>
            </a>

            {/* Facebook (Includes an inquiry quote parameter) */}
            <a 
              href="https://facebook.com/shake.njoro?quote=Hello%20Cloud%20Technologies,%20I%20have%20an%20enquiry" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="hover:text-blue-600 transition-colors transform hover:scale-110 duration-200"
              aria-label="Facebook"
            >
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                <path d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z"/>
              </svg>
            </a>

            {/* Twitter / X (Pre-populates a Tweet text intent box) */}
            <a 
              href="https://x.com/intent/tweet?text=Hello%20Cloud%20Technologies,%20I%20have%20an%20enquiry%20regarding%20systems%20integration." 
              target="_blank" 
              rel="noopener noreferrer" 
              className="hover:text-white transition-colors transform hover:scale-110 duration-200"
              aria-label="Twitter/X"
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
              </svg>
            </a>

            {/* TikTok */}
            <a 
              href="https://www.tiktok.com/@cloud.t3ch" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="hover:text-cyan-400 transition-colors transform hover:scale-110 duration-200"
              aria-label="TikTok"
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.54-4.06-1.42-.45-.34-.85-.75-1.21-1.19-.08 1.7-.1 3.4-.11 5.1-.07 2.73-1.07 5.48-3.08 7.33-2.07 1.94-5.04 2.87-7.82 2.4-3.11-.47-5.94-2.81-6.81-5.87-.99-3.32.32-7.14 3.12-9.04 1.83-1.27 4.11-1.74 6.31-1.34V7.47c-1.38-.4-2.92-.1-4.07.72-.94.67-1.55 1.77-1.62 2.94-.13 1.73.91 3.42 2.53 3.99.98.36 2.08.28 3.01-.22.8-.41 1.39-1.2 1.54-2.1.11-1.33.05-2.67.07-4V.02z"/>
              </svg>
            </a>

            {/* WhatsApp (With Predefined Text Stream Setup) */}
            <a 
              href="https://wa.me/254737472970?text=Hello%20Cloud%20Technologies,%20I%20have%20an%20enquiry" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="hover:text-emerald-500 transition-colors transform hover:scale-110 duration-200"
              aria-label="WhatsApp"
            >
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 16 16">
                <path d="M13.601 2.326A7.85 7.85 0 0 0 7.994 0C3.627 0 .068 3.558.064 7.926c0 1.399.366 2.76 1.057 3.965L0 16l4.204-1.102a7.9 7.9 0 0 0 3.79.907h.004c4.368 0 7.926-3.558 7.93-7.93a7.9 7.9 0 0 0-2.33-5.64M7.994 14.521a6.6 6.6 0 0 1-3.356-.92l-.24-.144-2.494.654.666-2.433-.156-.251a6.56 6.56 0 0 1-1.007-3.505c1.1-4.345 5.536-7.142 9.88-6.042a6.56 6.56 0 0 1 4.594 4.594c1.1 4.344-1.697 8.782-6.042 9.88m3.504-4.809c-.197-.099-1.16-.573-1.337-.636-.177-.063-.305-.095-.434.099-.129.196-.5.636-.614.763-.114.127-.228.142-.425.043-.197-.1-.832-.307-1.584-.977-.585-.522-.981-1.167-1.1-1.372-.114-.197-.012-.304.087-.403.089-.089.197-.228.296-.343.1-.114.133-.193.197-.324.064-.132.033-.246-.015-.344-.049-.099-.434-1.045-.595-1.432-.158-.381-.311-.33-.427-.336-.109-.005-.234-.006-.359-.006a.7.7 0 0 0-.507.237c-.171.187-.655.641-.655 1.562s.668 1.808.761 1.932c.093.125 1.31 2.001 3.174 2.804.443.19.788.305 1.057.39.445.14.85.12 1.171.073.358-.053 1.16-.474 1.323-.93.163-.456.163-.847.114-.93-.049-.083-.177-.132-.373-.231"/>
              </svg>
            </a>
          </div>

          {/* Copyright Metadata Details */}
          <div className="font-mono text-xs text-slate-600 tracking-wider">
            &copy; {new Date().getFullYear()} CLOUD TECH. Built to Elevate.
          </div>

        </div>
      </footer>
    </div>
  );
}

export default App;