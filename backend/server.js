// backend/server.js
const dns = require('dns');
dns.setDefaultResultOrder('ipv4first');

const express = require('express');
const cors = require('cors');
const nodemailer = require('nodemailer');
const rateLimit = require('express-rate-limit');
const path = require('path'); 
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

// FIXED: Tell Express to trust the Render proxy so express-rate-limit doesn't throw a validation error
app.set('trust proxy', 1);

app.use(cors());
app.use(express.json());

// 1. Serve the compiled static frontend files from the Vite build
app.use(express.static(path.join(__dirname, '../frontend/dist')));

// FIXED: Switched to Port 587 and configured explicit socket options to force IPv4 on cloud infrastructure
const transporter = nodemailer.createTransport({
  host: 'smtp.gmail.com',
  port: 587,
  secure: false, // Must be false for Port 587 TLS
  auth: { 
    user: process.env.EMAIL_USER, 
    pass: process.env.EMAIL_PASS 
  },
  connectionTimeout: 10000, 
  greetingTimeout: 10000,
  socketTimeout: 10000,
  // Force IPv4 lookup directly on the socket level
  connectionOptions: { family: 4 }
});

const additionalServices = [
  { id: 1, title: 'Web Development', desc: 'High-performance, stunning, responsive websites tailored to your brand.' },
  { id: 2, title: 'AI & Bot Creation', desc: 'Custom automation, Discord/Telegram bots, and intelligent workflows.' },
  { id: 3, title: 'POS Web Systems', desc: 'Cloud-based Point of Sale systems to streamline your retail business.' },
  { id: 4, title: 'Portfolio Design', desc: 'Showstopping personal portfolios that guarantee you get hired.' },
  { id: 5, title: 'Something Else Entirely', desc: 'Custom tailored engineering pipelines built to your custom scale.' }
];

const contactLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 5,
  message: { success: false, message: 'Too many requests. Try again later.' }
});

// API ROUTES
app.get('/api/services', (req, res) => {
  res.json(additionalServices);
});

app.post('/api/contact', contactLimiter, async (req, res) => {
  const { name, email, phone, location, projectType, message } = req.body;
  if (!name || !email || !message) {
    return res.status(400).json({ success: false, message: 'Missing required fields.' });
  }
  const timestamp = new Date().toLocaleString('en-KE', { timeZone: 'Africa/Nairobi' });
  try {
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: process.env.EMAIL_USER,
      replyTo: email,
      subject: `🚀 New Lead: ${projectType} from ${name}`,
      text: `--- NEW INQUIRY RECEIVED (${timestamp}) ---\n\nName: ${name}\nEmail: ${email}\nPhone: ${phone || 'Not provided'}\nLocation: ${location || 'Not provided'}\nProject Stream: ${projectType}\n\nMessage Brief:\n${message}`
    };
    await transporter.sendMail(mailOptions);
    res.json({ success: true, message: 'Inquiry processed successfully!' });
  } catch (error) {
    // Log the actual error to your Render dashboard just in case auth fails later
    console.error('Email Send Error:', error);
    res.status(500).json({ success: false, message: 'Server processing error.' });
  }
});

// 2. FALLBACK ROUTE: Foolproof Express v5 static catch-all middleware
app.use((req, res, next) => {
  if (req.url.startsWith('/api')) {
    return res.status(404).json({ success: false, message: 'API route not found' });
  }
  res.sendFile(path.join(__dirname, '../frontend/dist/index.html'));
});

// Start listening for traffic
app.listen(PORT, () => console.log(`⚡ Unified App Running on Port ${PORT}`));