/**
 * Component: Home
 * Purpose: Renders the main landing page with Scrollytelling and massive padding.
 */
import React, { useState, useEffect } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Instagram } from 'lucide-react';
import Hero from '../components/Hero';
import ProductCard from '../components/ProductCard';
import { getProducts } from '../lib/db';
import { Product } from '../types';
import { Link } from 'react-router-dom';

export default function Home() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getProducts().then(data => {
      setProducts(data);
      setLoading(false);
    });
  }, []);

  const { scrollYProgress } = useScroll();
  const y1 = useTransform(scrollYProgress, [0, 1], [0, -100]);
  const y2 = useTransform(scrollYProgress, [0, 1], [0, 100]);

  return (
    <main className="bg-white">
      <Hero />
      
      {/* New Arrivals Section */}
      <section className="max-w-7xl mx-auto px-6 py-32 md:py-48">
        <div className="flex flex-col md:flex-row justify-between items-end mb-24 space-y-6 md:space-y-0">
          <div>
            <motion.span 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              className="text-[10px] tracking-[0.4em] uppercase font-medium opacity-40 mb-6 block"
            >
              Just In
            </motion.span>
            <motion.h2 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ delay: 0.2 }}
              className="text-5xl md:text-7xl font-serif tracking-tight leading-tight"
            >
              New Arrivals.
            </motion.h2>
          </div>
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4 }}
          >
            <Link to="/shop" className="text-[11px] tracking-[0.2em] font-medium uppercase border-b border-black pb-2 hover:opacity-50 transition-opacity">
              Shop All New
            </Link>
          </motion.div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 md:gap-8">
          {products.slice(0, 4).map((product, index) => (
            <motion.div
              key={`new-${product.id}`}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ delay: index * 0.15, duration: 0.8, ease: "easeOut" }}
            >
              <ProductCard product={product} />
            </motion.div>
          ))}
        </div>
      </section>

      {/* Featured Section */}
      <section className="max-w-7xl mx-auto px-6 py-32 md:py-48">
        <div className="flex flex-col md:flex-row justify-between items-end mb-24 space-y-6 md:space-y-0">
          <div className="max-w-2xl">
            <motion.span 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              className="text-[10px] tracking-[0.4em] uppercase font-medium opacity-40 mb-6 block"
            >
              Curated Selection
            </motion.span>
            <motion.h2 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ delay: 0.2 }}
              className="text-5xl md:text-7xl font-serif tracking-tight leading-tight"
            >
              The Art of <br /> Minimalist Dressing.
            </motion.h2>
          </div>
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4 }}
          >
            <Link to="/shop" className="text-[11px] tracking-[0.2em] font-medium uppercase border-b border-black pb-2 hover:opacity-50 transition-opacity">
              View All Collection
            </Link>
          </motion.div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 md:gap-8">
          {products.slice(4, 8).map((product, index) => (
            <motion.div
              key={`curated-${product.id}`}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ delay: index * 0.15, duration: 0.8, ease: "easeOut" }}
            >
              <ProductCard product={product} />
            </motion.div>
          ))}
        </div>
      </section>

      {/* Lookbook Section (Scrollytelling) */}
      <section className="bg-brand-gray py-32 md:py-48 overflow-hidden">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-24 items-center">
            <motion.div 
              style={{ y: y1 }}
              className="aspect-[3/4] overflow-hidden relative"
            >
              <img 
                src="https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?q=80&w=1920&auto=format&fit=crop" 
                alt="Lookbook" 
                className="absolute inset-0 w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-1000"
                referrerPolicy="no-referrer"
              />
            </motion.div>
            <motion.div 
              style={{ y: y2 }}
              className="space-y-10 md:pl-12"
            >
              <motion.span 
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                className="text-[10px] tracking-[0.4em] uppercase font-medium opacity-40 block"
              >
                Editorial 01
              </motion.span>
              <motion.h2 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="text-5xl md:text-7xl font-serif tracking-tight leading-tight"
              >
                Modern <br /> Silhouette.
              </motion.h2>
              <motion.p 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 }}
                className="text-sm text-gray-500 leading-relaxed max-w-md"
              >
                Exploring the intersection of comfort and high-fashion. Our latest editorial captures the essence of the STUDIO J. woman: confident, understated, and eternally elegant.
              </motion.p>
              <motion.div
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.4 }}
              >
                <Link to="/editorial" className="inline-block border border-black px-12 py-5 text-[11px] tracking-[0.2em] font-medium uppercase hover:bg-black hover:text-white transition-colors duration-500">
                  Read Story
                </Link>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Follow Us Section */}
      <section className="py-32 md:py-48 border-t border-gray-100">
        <div className="max-w-7xl mx-auto px-6 text-center mb-16">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="text-3xl md:text-5xl font-serif tracking-tight mb-4"
          >
            Follow Us
          </motion.h2>
          <motion.a 
            href="https://instagram.com"
            target="_blank"
            rel="noopener noreferrer"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-[11px] tracking-[0.2em] uppercase font-medium hover:opacity-50 transition-opacity inline-flex items-center justify-center space-x-2"
          >
            <span>@studioj_official</span>
          </motion.a>
        </div>
        
        <div className="grid grid-cols-2 md:grid-cols-5 gap-0">
          {[
            'https://images.unsplash.com/photo-1532453288672-3a27e9be9efd?q=80&w=800&auto=format&fit=crop',
            'https://images.unsplash.com/photo-1485968579580-b6d095142e6e?q=80&w=800&auto=format&fit=crop',
            'https://images.unsplash.com/photo-1487222477894-8943e31ef7b2?q=80&w=1974&auto=format&fit=crop',
            'https://images.unsplash.com/photo-1495385794356-15371f348c31?q=80&w=1973&auto=format&fit=crop',
            'https://images.unsplash.com/photo-1500917293891-ef795e70e1f6?q=80&w=1974&auto=format&fit=crop'
          ].map((src, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="aspect-square overflow-hidden group relative cursor-pointer"
            >
              <img 
                src={src} 
                alt={`Instagram feed ${index + 1}`} 
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-500 flex items-center justify-center">
                <Instagram className="text-white opacity-0 group-hover:opacity-100 transition-opacity duration-500" size={24} strokeWidth={1.5} />
              </div>
            </motion.div>
          ))}
        </div>
      </section>
    </main>
  );
}
