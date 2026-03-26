/**
 * Component: CartDrawer
 * Purpose: Renders a slide-out shopping cart drawer.
 */
import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Minus, Plus, Trash2, ShoppingBag } from 'lucide-react';
import { CartItem } from '../types';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  onUpdateQuantity: (id: string, delta: number) => void;
  onRemove: (id: string) => void;
}

export default function CartDrawer({ isOpen, onClose, items, onUpdateQuantity, onRemove }: CartDrawerProps) {
  const subtotal = items.reduce((sum, item) => sum + (item.product?.price || 0) * item.quantity, 0);

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/20 backdrop-blur-sm z-[70]"
          />
          
          {/* Drawer */}
          <motion.div 
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 30, stiffness: 300 }}
            className="fixed top-0 right-0 h-full w-full max-w-md bg-white z-[80] shadow-2xl flex flex-col"
          >
            <div className="p-6 flex items-center justify-between border-b border-gray-100">
              <h2 className="text-sm tracking-[0.2em] font-medium uppercase">Shopping Bag ({items.length})</h2>
              <button onClick={onClose} className="hover:rotate-90 transition-transform duration-300">
                <X size={24} strokeWidth={1} />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto custom-scrollbar p-6 space-y-8">
              {items.length === 0 ? (
                <div className="h-full flex flex-col items-center justify-center space-y-4 opacity-40">
                  <ShoppingBag size={48} strokeWidth={0.5} />
                  <p className="text-xs tracking-widest uppercase">Your bag is empty</p>
                </div>
              ) : (
                items.map((item) => (
                  <div key={item.id} className="flex space-x-4">
                    <div className="w-24 h-32 bg-gray-50 overflow-hidden">
                      <img 
                        src={item.product?.images[0]} 
                        alt={item.product?.name} 
                        className="w-full h-full object-cover"
                        referrerPolicy="no-referrer"
                      />
                    </div>
                    <div className="flex-1 flex flex-col justify-between py-1">
                      <div>
                        <div className="flex justify-between">
                          <h3 className="text-xs font-medium tracking-wide uppercase">{item.product?.name}</h3>
                          <button onClick={() => onRemove(item.id)} className="opacity-40 hover:opacity-100 transition-opacity">
                            <Trash2 size={14} />
                          </button>
                        </div>
                        <p className="text-[10px] text-gray-400 mt-1 uppercase">Size: {item.size}</p>
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <div className="flex items-center border border-gray-200 rounded-full px-2 py-1">
                          <button 
                            onClick={() => onUpdateQuantity(item.id, -1)}
                            disabled={item.quantity <= 1}
                            className="p-1 disabled:opacity-20"
                          >
                            <Minus size={12} />
                          </button>
                          <span className="text-xs w-8 text-center">{item.quantity}</span>
                          <button 
                            onClick={() => onUpdateQuantity(item.id, 1)}
                            className="p-1"
                          >
                            <Plus size={12} />
                          </button>
                        </div>
                        <p className="text-xs font-medium">₩{(item.product?.price || 0).toLocaleString()}</p>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>

            {items.length > 0 && (
              <div className="p-6 border-t border-gray-100 space-y-4">
                <div className="flex justify-between items-end">
                  <p className="text-[10px] tracking-widest uppercase opacity-50">Subtotal</p>
                  <p className="text-lg font-serif">₩{subtotal.toLocaleString()}</p>
                </div>
                <button className="w-full bg-black text-white py-4 text-[11px] tracking-[0.2em] font-medium uppercase hover:bg-gray-900 transition-colors">
                  Checkout
                </button>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
