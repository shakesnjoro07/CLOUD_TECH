// frontend/src/components/Contact.jsx
import React, { useState, useEffect } from 'react';

// Accept selectedProject and setSelectedProject as props from App.jsx
export default function Contact({ selectedProject, setSelectedProject }) {
  const [formData, setFormData] = useState({ 
    name: '', 
    email: '', 
    phone: '', 
    location: '', 
    projectType: 'Web Development', 
    message: '' 
  });
  const [status, setStatus] = useState({ success: null, message: '' });
  const [loading, setLoading] = useState(false);

  // Automatically update the local form dropdown when a service card is clicked up top
  useEffect(() => {
    if (selectedProject) {
      setFormData(prev => ({ ...prev, projectType: selectedProject }));
    }
  }, [selectedProject]);

  // Phone input handler that forces exactly digits and max 10 characters
  const handlePhoneChange = (e) => {
    const value = e.target.value;
    const numbersOnly = value.replace(/\D/g, '');
    
    if (numbersOnly.length <= 10) {
      setFormData({ ...formData, phone: numbersOnly });
    }
  };

  // Handle regular changes and keep parent sync stable if they manually change the dropdown select values
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    
    if (name === 'projectType' && setSelectedProject) {
      setSelectedProject(value);
    }
  };

  // 1. Secure Nodemailer Backend Submit Protocol
  const handleEmailSubmit = async (e) => {
    e.preventDefault();

    if (formData.phone.length < 10) {
      setStatus({ success: false, message: 'Please provide a valid 10-digit phone number.' });
      return;
    }

    setLoading(true);
    setStatus({ success: null, message: '' });

    try {
      // FIXED: Swapped out 'http://localhost:5000/api/contact' for a relative routing endpoint
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (data.success) {
        setStatus({ 
          success: true, 
          message: 'Inquiry sent to Cloud Technologies successfully! Our work is efficient, fast, and high-quality. We will carefully analyze your project specifications and send a detailed design brief straight to your email. Thank you for choosing us!' 
        });
        
        // Reset local form and clear parent selection state
        setFormData({ name: '', email: '', phone: '', location: '', projectType: 'Web Development', message: '' });
        if (setSelectedProject) setSelectedProject('');
        
        setTimeout(() => {
          setStatus({ success: null, message: '' });
        }, 20000);
      } else {
        setStatus({ success: false, message: data.message || 'Routing failure.' });
      }
    } catch (err) {
      console.error('Backend Communication Error:', err);
      setStatus({ success: false, message: 'Network transit exception. Secure mail gateway offline.' });
    } finally {
      setLoading(false);
    }
  };

  // 2. WhatsApp Submit Protocol
  const handleWhatsAppSubmit = (e) => {
    e.preventDefault();

    if (!formData.name || !formData.message) {
      setStatus({ success: false, message: 'Please provide at least your Name and Project Brief before launching WhatsApp.' });
      return;
    }

    if (formData.phone.length < 10) {
      setStatus({ success: false, message: 'Please provide a valid 10-digit phone number.' });
      return;
    }

    const baseText = `--- NEW PROJECT INQUIRY ---\n\n` +
                     `Name: ${formData.name}\n` +
                     `Email: ${formData.email || 'Not provided'}\n` +
                     `Phone: ${formData.phone || 'Not provided'}\n` +
                     `Location: ${formData.location || 'Not provided'}\n` +
                     `Service: ${formData.projectType}\n\n` +
                     `--- Project Brief ---\n` +
                     `${formData.message}`;

    const encodedText = encodeURIComponent(baseText);
    const whatsappUrl = `https://wa.me/254737472970?text=${encodedText}`;

    setStatus({ 
      success: true, 
      message: 'Inquiry sent to Cloud Technologies successfully! Redirecting you to our secure WhatsApp line. We deliver highly efficient, reliable systems and will coordinate your build live on chat. Thank you!' 
    });
    
    setFormData({ name: '', email: '', phone: '', location: '', projectType: 'Web Development', message: '' });
    if (setSelectedProject) setSelectedProject('');
    
    setTimeout(() => {
      setStatus({ success: null, message: '' });
    }, 20000);

    window.open(whatsappUrl, '_blank');
  };

  return (
    <section id="contact" className="py-20 max-w-4xl mx-auto px-6">
      <div className="bg-gradient-to-b from-slate-900 to-slate-950 border border-slate-800 p-8 md:p-12 rounded-3xl relative overflow-hidden shadow-2xl">
        <h2 className="text-3xl font-bold mb-2 text-center">Let's Build Something Legendary</h2>
        <p className="text-slate-400 text-center mb-8 text-sm">Select your preferred transmit protocol. Speak with engineers via email or jump onto an instant WhatsApp wire.</p>

        <form className="space-y-6 relative z-10">
          
          {/* Row 1: Name and Email */}
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-slate-400 mb-2">Name</label>
              <input type="text" required name="name" value={formData.name} onChange={handleInputChange} className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-slate-100 focus:outline-none focus:border-cyan-500 transition-colors" placeholder="John Doe" />
            </div>
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-slate-400 mb-2">Email Address</label>
              <input type="email" name="email" value={formData.email} onChange={handleInputChange} className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-slate-100 focus:outline-none focus:border-cyan-500 transition-colors" placeholder="john@example.com" />
            </div>
          </div>

          {/* Row 2: Phone Number and Location */}
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-slate-400 mb-2">Phone Number</label>
              <input type="tel" required value={formData.phone} onChange={handlePhoneChange} className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-slate-100 focus:outline-none focus:border-cyan-500 transition-colors" placeholder="0700000000" />
            </div>
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-slate-400 mb-2">Location / City</label>
              <input type="text" name="location" value={formData.location} onChange={handleInputChange} className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-slate-100 focus:outline-none focus:border-cyan-500 transition-colors" placeholder="Nairobi, Kenya" />
            </div>
          </div>

          {/* Dropdown Selection */}
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-slate-400 mb-2">What are we building?</label>
            <select name="projectType" value={formData.projectType} onChange={handleInputChange} className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-slate-100 focus:outline-none focus:border-cyan-500 transition-colors">
              <option value="Web Development">Web Development</option>
              <option value="AI & Bot Creation">AI & Bot Creation</option>
              <option value="POS Web Systems">POS Web Systems</option>
              <option value="Portfolio Design">Portfolio Design</option>
              <option value="Something Else Entirely">Something Else Entirely</option>
            </select>
          </div>

          {/* Project Brief Description */}
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-slate-400 mb-2">Project Brief</label>
            <textarea required rows="4" name="message" value={formData.message} onChange={handleInputChange} className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-slate-100 focus:outline-none focus:border-cyan-500 transition-colors resize-none" placeholder="Describe the vision, features, and timeline..."></textarea>
          </div>

          {/* Action Interface Buttons Row */}
          <div className="grid sm:grid-cols-2 gap-4 pt-2">
            <button type="button" onClick={handleEmailSubmit} disabled={loading} className="w-full py-4 bg-slate-900 border border-slate-800 hover:border-cyan-500 text-cyan-400 font-bold rounded-xl transition-all flex items-center justify-center gap-2 disabled:opacity-50 shadow-md">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 0 1-2.25 2.25h-15a2.25 2.25 0 0 1-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25m19.5 0v.243a2.25 2.25 0 0 1-1.07 1.916l-7.5 4.615a2.25 2.25 0 0 1-2.36 0l-7.5-4.615m19.5 0v.243a2.25 2.25 0 0 1-1.07 1.916l-7.5 4.615a2.25 2.25 0 0 1-2.36 0l-7.5-4.615" />
              </svg>
              {loading ? 'Transmitting...' : 'Send via Email'}
            </button>

            <button type="button" onClick={handleWhatsAppSubmit} className="w-full py-4 bg-emerald-600 hover:bg-emerald-500 text-white font-bold rounded-xl transition-all flex items-center justify-center gap-2 shadow-lg shadow-emerald-600/10">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" className="bi bi-whatsapp w-5 h-5" viewBox="0 0 16 16">
                <path d="M13.601 2.326A7.85 7.85 0 0 0 7.994 0C3.627 0 .068 3.558.064 7.926c0 1.399.366 2.76 1.057 3.965L0 16l4.204-1.102a7.9 7.9 0 0 0 3.79.907h.004c4.368 0 7.926-3.558 7.93-7.93a7.9 7.9 0 0 0-2.33-5.64M7.994 14.521a6.6 6.6 0 0 1-3.356-.92l-.24-.144-2.494.654.666-2.433-.156-.251a6.56 6.56 0 0 1-1.007-3.505c1.1-4.345 5.536-7.142 9.88-6.042a6.56 6.56 0 0 1 4.594 4.594c1.1 4.344-1.697 8.782-6.042 9.88m3.504-4.809c-.197-.099-1.16-.573-1.337-.636-.177-.063-.305-.095-.434.099-.129.196-.5.636-.614.763-.114.127-.228.142-.425.043-.197-.1-.832-.307-1.584-.977-.585-.522-.981-1.167-1.1-1.372-.114-.197-.012-.304.087-.403.089-.089.197-.228.296-.343.1-.114.133-.193.197-.324.064-.132.033-.246-.015-.344-.049-.099-.434-1.045-.595-1.432-.158-.381-.311-.33-.427-.336-.109-.005-.234-.006-.359-.006a.7.7 0 0 0-.507.237c-.171.187-.655.641-.655 1.562s.668 1.808.761 1.932c.093.125 1.31 2.001 3.174 2.804.443.19.788.305 1.057.39.445.14.85.12 1.171.073.358-.053 1.16-.474 1.323-.93.163-.456.163-.847.114-.93-.049-.083-.177-.132-.373-.231"/>
              </svg>
              Chat on WhatsApp
            </button>
          </div>

          {/* Success / Error Feedbacks */}
          {status.message && (
            <div className={`p-4 rounded-xl text-sm border ${status.success ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-400' : 'bg-rose-500/10 border-rose-500/30 text-rose-400'}`}>
              {status.message}
            </div>
          )}
        </form>
      </div>
    </section>
  );
}