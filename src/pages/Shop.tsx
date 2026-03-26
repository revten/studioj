/**
 * Component: Shop
 * Purpose: Renders the product catalog with an asymmetric Bento Grid layout.
 */
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import ProductCard from '../components/ProductCard';
import { getProducts } from '../lib/db';
import { Product } from '../types';
import { ChevronDown, Filter } from 'lucide-react';

export default function Shop() {
  const [products, setProducts] = useState<Product[]>([]);
  const [activeCategory, setActiveCategory] = useState('All');
  const [loading, setLoading] = useState(true);
  const categories = ['All', 'Outerwear', 'Tops', 'Bottoms', 'Dresses'];

  useEffect(() => {
    getProducts().then(data => {
      setProducts(data);
      setLoading(false);
    });
  }, []);

  const filteredProducts = activeCategory === 'All' 
    ? products 
    : products.filter(p => p.category === activeCategory);

  return (
    <main className="pt-32 pb-24 bg-white min-h-screen">
      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-center mb-16 space-y-8 md:space-y-0">
          <h1 className="text-4xl md:text-5xl font-serif tracking-tight">Shop Collection</h1>
          
          <div className="flex items-center space-x-8">
            <div className="flex items-center space-x-6 overflow-x-auto pb-2 md:pb-0 no-scrollbar">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={`text-[11px] tracking-[0.2em] font-medium uppercase transition-all whitespace-nowrap ${activeCategory === cat ? 'opacity-100 border-b border-black' : 'opacity-40 hover:opacity-100'}`}
                >
                  {cat}
                </button>
              ))}
            </div>
            <button className="flex items-center space-x-2 opacity-40 hover:opacity-100 transition-opacity">
              <Filter size={14} />
              <span className="text-[11px] tracking-[0.2em] font-medium uppercase">Sort</span>
              <ChevronDown size={14} />
            </button>
          </div>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-16 auto-rows-auto">
          {filteredProducts.map((product, index) => {
            // Asymmetric Bento Grid logic: make specific items larger
            const isLarge = index === 0 || index === 5 || index === 10;
            return (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05, duration: 0.8, ease: "easeOut" }}
                className={isLarge ? "md:col-span-2 md:row-span-2" : ""}
              >
                <ProductCard product={product} isLarge={isLarge} />
              </motion.div>
            );
          })}
        </div>

        {filteredProducts.length === 0 && (
          <div className="py-32 text-center opacity-40">
            <p className="text-sm tracking-widest uppercase">No items found in this category</p>
          </div>
        )}
      </div>
    </main>
  );
}
