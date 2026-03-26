/**
 * Component: Hero
 * Purpose: Renders the 100vh fullscreen hero section on the landing page.
 * Features: Full-bleed background image/video, transparent overlay, scroll indicator.
 */
import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function Hero() {
  return (
    <section className="relative h-screen w-full overflow-hidden bg-black">
      {/* Background Image/Video */}
      <motion.div 
        initial={{ scale: 1.05, opacity: 0 }}
        animate={{ scale: 1, opacity: 0.8 }}
        transition={{ duration: 2, ease: "easeOut" }}
        className="absolute inset-0"
      >
        <img 
          src="https://images.unsplash.com/photo-1490481651871-ab68de25d43d?q=80&w=2070&auto=format&fit=crop" 
          alt="Hero" 
          className="w-full h-full object-cover"
          referrerPolicy="no-referrer"
        />
        <div className="absolute inset-0 bg-black/20" /> {/* Subtle overlay for text legibility */}
      </motion.div>

      {/* Overlay Content */}
      <div className="relative z-10 h-full flex flex-col items-center justify-center text-white px-6 text-center">
        <motion.span 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 1 }}
          className="text-[10px] tracking-[0.5em] uppercase font-medium mb-6"
        >
          The New Standard
        </motion.span>
        
        <motion.h1 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 1.2 }}
          className="text-6xl md:text-8xl lg:text-9xl font-serif tracking-tighter leading-none mb-12"
        >
          ELEVATED <br /> MINIMALISM.
        </motion.h1>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5, duration: 1 }}
        >
          <Link 
            to="/shop" 
            className="group flex items-center space-x-4 border border-white/50 px-10 py-5 hover:bg-white hover:text-black transition-all duration-700"
          >
            <span className="text-[11px] tracking-[0.2em] font-medium uppercase">Explore Collection</span>
            <ArrowRight size={16} className="group-hover:translate-x-2 transition-transform duration-500" />
          </Link>
        </motion.div>
      </div>

      {/* Scroll Indicator */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2, duration: 1 }}
        className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center space-y-4"
      >
        <span className="text-[9px] tracking-[0.3em] uppercase text-white/50">Scroll</span>
        <div className="w-[1px] h-16 bg-white/20 overflow-hidden">
          <motion.div 
            animate={{ y: ['-100%', '100%'] }}
            transition={{ repeat: Infinity, duration: 1.5, ease: "linear" }}
            className="w-full h-full bg-white"
          />
        </div>
      </motion.div>
    </section>
  );
}
