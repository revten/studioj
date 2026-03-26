/**
 * Component: ProductDetail
 * Purpose: Renders the Product Detail Page (PDP) with sticky info and zoomable gallery.
 */
import React, { useState, useEffect, useRef } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronRight, Minus, Plus, ChevronDown, ChevronUp } from 'lucide-react';
import { getProducts } from '../lib/db';
import { Product } from '../types';

interface ProductDetailProps {
  onAddToCart: (product: Product, size: string) => void;
}

export default function ProductDetail({ onAddToCart }: ProductDetailProps) {
  const { id } = useParams();
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [selectedSize, setSelectedSize] = useState('');
  const [activeImage, setActiveImage] = useState(0);
  const [openAccordion, setOpenAccordion] = useState<string | null>('description');

  useEffect(() => {
    getProducts().then(all => {
      const found = all.find(p => p.id === id);
      setProduct(found || null);
      setLoading(false);
    });
  }, [id]);

  const [zoomStyle, setZoomStyle] = useState({});

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const { left, top, width, height } = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - left) / width) * 100;
    const y = ((e.clientY - top) / height) * 100;
    setZoomStyle({ transformOrigin: `${x}% ${y}%`, transform: 'scale(1.5)' });
  };

  const handleMouseLeave = () => {
    setZoomStyle({ transformOrigin: 'center center', transform: 'scale(1)' });
  };

  if (loading) return <div className="pt-32 text-center opacity-40 uppercase tracking-widest text-xs">Loading...</div>;
  if (!product) return <div className="pt-32 text-center opacity-40 uppercase tracking-widest text-xs">Product not found</div>;

  const toggleAccordion = (id: string) => {
    setOpenAccordion(openAccordion === id ? null : id);
  };

  return (
    <main className="pt-32 pb-24 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        {/* Breadcrumbs */}
        <nav className="flex items-center space-x-2 text-[10px] tracking-widest uppercase opacity-40 mb-12">
          <Link to="/" className="hover:opacity-100 transition-opacity">Home</Link>
          <ChevronRight size={10} />
          <Link to="/shop" className="hover:opacity-100 transition-opacity">Shop</Link>
          <ChevronRight size={10} />
          <span className="opacity-100">{product.name}</span>
        </nav>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-start">
          {/* Image Gallery */}
          <div className="lg:col-span-7 space-y-6">
            <div 
              className="aspect-[3/4] overflow-hidden bg-gray-50 relative cursor-zoom-in"
              onMouseMove={handleMouseMove}
              onMouseLeave={handleMouseLeave}
            >
              <motion.img 
                key={activeImage}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                src={product.images[activeImage]} 
                alt={product.name} 
                className="w-full h-full object-cover transition-transform duration-300 ease-out"
                style={zoomStyle}
                referrerPolicy="no-referrer"
              />
            </div>
            <div className="grid grid-cols-4 gap-4">
              {product.images.map((img, idx) => (
                <button 
                  key={idx} 
                  onClick={() => setActiveImage(idx)}
                  className={`aspect-[3/4] overflow-hidden bg-gray-50 border-2 transition-all ${activeImage === idx ? 'border-black' : 'border-transparent opacity-60'}`}
                >
                  <img src={img} alt="" className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                </button>
              ))}
            </div>
          </div>

          {/* Product Info (Sticky) */}
          <div className="lg:col-span-5 space-y-12 lg:sticky lg:top-32">
            <div className="space-y-4">
              <span className="text-[10px] tracking-[0.4em] uppercase font-medium opacity-40 block">
                {product.category}
              </span>
              <h1 className="text-4xl font-serif tracking-tight leading-tight">{product.name}</h1>
              <p className="text-xl font-medium">₩{product.price.toLocaleString()}</p>
            </div>

            {/* Size Selection */}
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-[10px] tracking-widest uppercase font-medium">Select Size</span>
                <button className="text-[10px] tracking-widest uppercase opacity-40 hover:opacity-100 transition-opacity underline underline-offset-4">Size Guide</button>
              </div>
              <div className="grid grid-cols-4 gap-3">
                {product.sizes.map((size) => (
                  <button
                    key={size}
                    onClick={() => setSelectedSize(size)}
                    className={`py-4 text-xs font-medium transition-all border ${selectedSize === size ? 'bg-black text-white border-black' : 'border-gray-200 hover:border-black'}`}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>

            <button 
              onClick={() => selectedSize && onAddToCart(product, selectedSize)}
              disabled={!selectedSize}
              className="w-full bg-black text-white py-5 text-[11px] tracking-[0.2em] font-medium uppercase hover:bg-gray-900 transition-colors disabled:opacity-30 disabled:cursor-not-allowed rounded-full"
            >
              {selectedSize ? 'Add to Bag' : 'Select a Size'}
            </button>

            {/* Accordions */}
            <div className="border-t border-gray-100 pt-8 space-y-6">
              {[
                { id: 'description', title: 'Description', content: product.description },
                { id: 'details', title: 'Details & Care', content: (
                  <div className="space-y-2">
                    <p><span className="font-medium">Fabric:</span> {product.details.fabric}</p>
                    <p><span className="font-medium">Care:</span> {product.details.care}</p>
                    <p><span className="font-medium">Fit:</span> {product.details.fit}</p>
                  </div>
                )},
                { id: 'shipping', title: 'Shipping & Returns', content: 'Complimentary standard shipping on all orders. Returns accepted within 14 days of delivery.' }
              ].map((item) => (
                <div key={item.id} className="border-b border-gray-100 pb-6">
                  <button 
                    onClick={() => toggleAccordion(item.id)}
                    className="w-full flex justify-between items-center text-[10px] tracking-widest uppercase font-medium"
                  >
                    {item.title}
                    {openAccordion === item.id ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
                  </button>
                  <AnimatePresence>
                    {openAccordion === item.id && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        className="overflow-hidden"
                      >
                        <div className="pt-4 text-sm text-gray-500 leading-relaxed">
                          {item.content}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
