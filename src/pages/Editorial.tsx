import React from 'react';
import { motion } from 'framer-motion';

export default function Editorial() {
  return (
    <main className="pt-32 pb-24 bg-white min-h-screen">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center mb-32">
          <div className="lg:col-span-5 space-y-8">
            <motion.span 
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              className="text-[10px] tracking-[0.4em] uppercase font-medium opacity-40 block"
            >
              The Philosophy
            </motion.span>
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              className="text-5xl md:text-7xl font-serif tracking-tight leading-tight"
            >
              From Wholesale <br /> to High-End.
            </motion.h1>
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-sm text-gray-500 leading-relaxed max-w-md"
            >
              STUDIO J. was born from a decade of excellence in the wholesale garment industry. We've taken our deep understanding of fabric quality, tailoring precision, and manufacturing expertise directly to the modern woman.
            </motion.p>
          </div>
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.5 }}
            className="lg:col-span-7 aspect-[16/9] overflow-hidden bg-gray-50"
          >
            <img 
              src="https://images.unsplash.com/photo-1441984904996-e0b6ba687e04?q=80&w=2070&auto=format&fit=crop" 
              alt="Atelier" 
              className="w-full h-full object-cover grayscale"
              referrerPolicy="no-referrer"
            />
          </motion.div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-32">
          {[
            { title: 'Quality', text: 'We source only the finest natural fibers from Italy and Japan, ensuring every piece feels as good as it looks.' },
            { title: 'Tailoring', text: 'Our patterns are refined over months of fitting sessions to achieve the perfect balance of comfort and form.' },
            { title: 'Vision', text: 'We believe in timeless design over fleeting trends. STUDIO J. is built for a lifetime of elegance.' }
          ].map((item, idx) => (
            <motion.div 
              key={idx}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.2 }}
              className="space-y-4 text-center md:text-left"
            >
              <h3 className="text-sm tracking-[0.2em] font-medium uppercase">{item.title}</h3>
              <p className="text-xs text-gray-400 leading-relaxed">{item.text}</p>
            </motion.div>
          ))}
        </div>

        <motion.div 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          className="aspect-[21/9] overflow-hidden bg-black relative flex items-center justify-center text-white"
        >
          <img 
            src="https://images.unsplash.com/photo-1490114538077-0a7f8cb49891?q=80&w=2070&auto=format&fit=crop" 
            alt="Vision" 
            className="absolute inset-0 w-full h-full object-cover opacity-40 grayscale"
            referrerPolicy="no-referrer"
          />
          <div className="relative text-center space-y-6 px-6">
            <h2 className="text-3xl md:text-5xl font-serif tracking-tight">"Simplicity is the ultimate sophistication."</h2>
            <p className="text-[10px] tracking-[0.5em] uppercase opacity-60">— Studio J. Manifesto</p>
          </div>
        </motion.div>
      </div>
    </main>
  );
}
