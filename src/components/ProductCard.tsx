/**
 * Component: ProductCard
 * Purpose: Displays a single product thumbnail with cross-fade hover effects.
 * Props:
 *  - product: Product object containing details and images.
 */
import React from 'react';
import { motion } from 'framer-motion';
import { Product } from '../types';
import { Link } from 'react-router-dom';

interface ProductCardProps {
  product: Product;
  isLarge?: boolean;
}

export default function ProductCard({ product, isLarge = false }: ProductCardProps) {
  return (
    <Link to={`/product/${product.id}`} className="group block h-full">
      <div className={`relative overflow-hidden bg-gray-50 hover-crossfade ${isLarge ? 'aspect-[3/4] md:aspect-auto md:h-[calc(100%-4rem)]' : 'aspect-[3/4]'}`}>
        <img 
          src={product.images[0]} 
          alt={product.name} 
          className="absolute inset-0 w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
          referrerPolicy="no-referrer"
        />
        {product.images[1] && (
          <img 
            src={product.images[1]} 
            alt={`${product.name} alternate`} 
            className="absolute inset-0 w-full h-full object-cover"
            referrerPolicy="no-referrer"
          />
        )}
        
        <div className="absolute bottom-4 left-4">
          <motion.button 
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="bg-white/90 backdrop-blur-sm px-6 py-3 text-[9px] tracking-[0.2em] uppercase font-medium opacity-0 group-hover:opacity-100 transition-opacity duration-500"
          >
            Quick View
          </motion.button>
        </div>
      </div>
      
      <div className="mt-6 space-y-2">
        <div className="flex justify-between items-start">
          <h3 className="text-[11px] font-medium tracking-[0.1em] uppercase group-hover:opacity-60 transition-opacity">
            {product.name}
          </h3>
          <p className="text-[11px] font-medium text-gray-500">₩{product.price.toLocaleString()}</p>
        </div>
        <p className="text-[9px] text-gray-400 uppercase tracking-[0.2em]">{product.category}</p>
      </div>
    </Link>
  );
}
