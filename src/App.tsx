/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import CartDrawer from './components/CartDrawer';
import Home from './pages/Home';
import Shop from './pages/Shop';
import ProductDetail from './pages/ProductDetail';
import Editorial from './pages/Editorial';
import { Product, CartItem } from './types';
import { seedProducts } from './lib/db';

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
}

export default function App() {
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [cartItems, setCartItems] = useState<CartItem[]>([]);

  useEffect(() => {
    seedProducts();
  }, []);

  const handleAddToCart = (product: Product, size: string) => {
    setCartItems(prev => {
      const existing = prev.find(item => item.productId === product.id && item.size === size);
      if (existing) {
        return prev.map(item => 
          item.productId === product.id && item.size === size 
            ? { ...item, quantity: item.quantity + 1 } 
            : item
        );
      }
      return [...prev, { 
        id: Math.random().toString(36).substr(2, 9),
        productId: product.id,
        quantity: 1,
        size,
        product
      }];
    });
    setIsCartOpen(true);
  };

  const handleUpdateQuantity = (id: string, delta: number) => {
    setCartItems(prev => prev.map(item => 
      item.id === id ? { ...item, quantity: Math.max(1, item.quantity + delta) } : item
    ));
  };

  const handleRemoveItem = (id: string) => {
    setCartItems(prev => prev.filter(item => item.id !== id));
  };

  return (
    <Router basename="/studioj">
      <ScrollToTop />
      <div className="min-h-screen flex flex-col">
        <Navbar 
          onOpenCart={() => setIsCartOpen(true)} 
          cartCount={cartItems.reduce((sum, item) => sum + item.quantity, 0)} 
        />
        
        <div className="flex-1">
          <AnimatePresence mode="wait">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/shop" element={<Shop />} />
              <Route path="/product/:id" element={<ProductDetail onAddToCart={handleAddToCart} />} />
              <Route path="/editorial" element={<Editorial />} />
              <Route path="/story" element={<Editorial />} />
            </Routes>
          </AnimatePresence>
        </div>

        <Footer />

        <CartDrawer 
          isOpen={isCartOpen} 
          onClose={() => setIsCartOpen(false)} 
          items={cartItems}
          onUpdateQuantity={handleUpdateQuantity}
          onRemove={handleRemoveItem}
        />
      </div>
    </Router>
  );
}
