import React, { useState, useEffect } from 'react';
import { ShoppingBag, User, Menu, X, Search } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link, useLocation } from 'react-router-dom';
import { auth } from '../lib/firebase';
import { signOut, onAuthStateChanged } from 'firebase/auth';
import { getProducts } from '../lib/db';
import { Product } from '../types';
import AuthModal from './AuthModal';

interface NavbarProps {
  onOpenCart: () => void;
  cartCount: number;
}

export default function Navbar({ onOpenCart, cartCount }: NavbarProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isAuthOpen, setIsAuthOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [products, setProducts] = useState<Product[]>([]);
  const [user, setUser] = useState(auth.currentUser);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    const unsubscribe = onAuthStateChanged(auth, (u) => setUser(u));
    getProducts().then(setProducts);
    return () => {
      window.removeEventListener('scroll', handleScroll);
      unsubscribe();
    };
  }, []);

  const handleAuth = async () => {
    if (user) {
      await signOut(auth);
    } else {
      setIsAuthOpen(true);
    }
  };

  const searchResults = searchQuery 
    ? products.filter(p => p.name.toLowerCase().includes(searchQuery.toLowerCase()) || p.category.toLowerCase().includes(searchQuery.toLowerCase()))
    : [];

  return (
    <>
      <nav className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 ${isScrolled ? 'bg-white/90 backdrop-blur-md py-4 border-b border-gray-100' : 'bg-transparent py-8'}`}>
        <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
          {/* Mobile Menu Toggle */}
          <div className="flex-1 lg:hidden">
            <button onClick={() => setIsMobileMenuOpen(true)}>
              <Menu size={24} />
            </button>
          </div>

          {/* Desktop Left Links */}
          <div className="hidden lg:flex flex-1 items-center space-x-4 xl:space-x-6">
            <Link to="/shop" className="text-[11px] tracking-[0.2em] font-medium hover:opacity-50 transition-opacity whitespace-nowrap">COLLECTION</Link>
            <Link to="/shop" className="text-[11px] tracking-[0.2em] font-medium hover:opacity-50 transition-opacity whitespace-nowrap">NEW ARRIVALS</Link>
            <Link to="/shop" className="text-[11px] tracking-[0.2em] font-medium hover:opacity-50 transition-opacity whitespace-nowrap">CURATED SELECTION</Link>
          </div>

          {/* Logo */}
          <div className="flex-shrink-0 flex justify-center px-4">
            <Link to="/">
              <h1 className="text-2xl md:text-3xl font-serif tracking-tighter font-bold uppercase whitespace-nowrap">STUDIO J.</h1>
            </Link>
          </div>

          {/* Desktop Right Links & Icons */}
          <div className="hidden lg:flex flex-1 items-center justify-end space-x-4 xl:space-x-6">
            <Link to="/editorial" className="text-[11px] tracking-[0.2em] font-medium hover:opacity-50 transition-opacity whitespace-nowrap">EDITORIAL</Link>
            <Link to="/story" className="text-[11px] tracking-[0.2em] font-medium hover:opacity-50 transition-opacity whitespace-nowrap">STORY</Link>
            
            <div className="flex items-center space-x-4 xl:space-x-5 pl-4 xl:pl-6 border-l border-gray-300">
              <button onClick={() => setIsSearchOpen(true)} className="hover:opacity-50 transition-opacity">
                <Search size={18} strokeWidth={1.5} />
              </button>
              <button onClick={handleAuth} className="hover:opacity-50 transition-opacity">
                <User size={18} strokeWidth={1.5} />
              </button>
              <button onClick={onOpenCart} className="relative hover:opacity-50 transition-opacity">
                <ShoppingBag size={18} strokeWidth={1.5} />
                {cartCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-black text-white text-[8px] w-4 h-4 rounded-full flex items-center justify-center font-bold">
                    {cartCount}
                  </span>
                )}
              </button>
            </div>
          </div>

          {/* Mobile Icons */}
          <div className="flex lg:hidden flex-1 items-center justify-end space-x-4">
            <button onClick={() => setIsSearchOpen(true)} className="hover:opacity-50 transition-opacity">
              <Search size={20} strokeWidth={1.5} />
            </button>
            <button onClick={onOpenCart} className="relative hover:opacity-50 transition-opacity">
              <ShoppingBag size={20} strokeWidth={1.5} />
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-black text-white text-[8px] w-4 h-4 rounded-full flex items-center justify-center font-bold">
                  {cartCount}
                </span>
              )}
            </button>
          </div>
        </div>
      </nav>

      {/* Search Overlay */}
      <AnimatePresence>
        {isSearchOpen && (
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed inset-0 bg-white z-[100] flex flex-col p-6 md:p-12 overflow-y-auto"
          >
            <div className="flex justify-end">
              <button onClick={() => setIsSearchOpen(false)} className="hover:rotate-90 transition-transform duration-300">
                <X size={32} strokeWidth={1} />
              </button>
            </div>
            <div className="max-w-4xl mx-auto w-full mt-12 md:mt-24">
              <div className="relative">
                <Search size={24} className="absolute left-0 top-1/2 -translate-y-1/2 opacity-40" />
                <input 
                  type="text" 
                  placeholder="Search for items, categories..." 
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  autoFocus
                  className="w-full text-2xl md:text-4xl font-serif border-b border-black pb-4 pl-12 outline-none placeholder:text-gray-300"
                />
              </div>
              
              {searchQuery && (
                <div className="mt-16">
                  <p className="text-[10px] tracking-[0.2em] uppercase font-medium mb-8 opacity-40">
                    {searchResults.length} Results Found
                  </p>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                    {searchResults.map(product => (
                      <Link 
                        key={product.id} 
                        to={`/product/${product.id}`} 
                        onClick={() => setIsSearchOpen(false)}
                        className="group"
                      >
                        <div className="aspect-[3/4] overflow-hidden bg-gray-50 mb-4">
                          <img 
                            src={product.images[0]} 
                            alt={product.name} 
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                            referrerPolicy="no-referrer"
                          />
                        </div>
                        <h3 className="text-[10px] font-medium tracking-wide uppercase group-hover:opacity-60 transition-opacity truncate">
                          {product.name}
                        </h3>
                        <p className="text-[10px] text-gray-500 mt-1">₩{product.price.toLocaleString()}</p>
                      </Link>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div 
            initial={{ x: '-100%' }}
            animate={{ x: 0 }}
            exit={{ x: '-100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed inset-0 bg-white z-[60] flex flex-col p-8"
          >
            <div className="flex justify-end">
              <button onClick={() => setIsMobileMenuOpen(false)}>
                <X size={32} strokeWidth={1} />
              </button>
            </div>
            <div className="flex flex-col space-y-8 mt-12">
              <Link to="/shop" onClick={() => setIsMobileMenuOpen(false)} className="text-3xl font-serif tracking-tight">COLLECTION</Link>
              <Link to="/shop" onClick={() => setIsMobileMenuOpen(false)} className="text-3xl font-serif tracking-tight">NEW ARRIVALS</Link>
              <Link to="/shop" onClick={() => setIsMobileMenuOpen(false)} className="text-3xl font-serif tracking-tight">CURATED SELECTION</Link>
              <Link to="/editorial" onClick={() => setIsMobileMenuOpen(false)} className="text-3xl font-serif tracking-tight">EDITORIAL</Link>
              <Link to="/story" onClick={() => setIsMobileMenuOpen(false)} className="text-3xl font-serif tracking-tight">STORY</Link>
              <button onClick={() => { setIsMobileMenuOpen(false); handleAuth(); }} className="text-3xl font-serif tracking-tight text-left">
                {user ? 'LOGOUT' : 'LOGIN'}
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <AuthModal isOpen={isAuthOpen} onClose={() => setIsAuthOpen(false)} />
    </>
  );
}
