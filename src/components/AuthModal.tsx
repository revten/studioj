/**
 * Component: AuthModal
 * Purpose: Provides an elegant, non-disruptive overlay for user authentication.
 * Props:
 *  - isOpen: Boolean indicating if the modal is visible.
 *  - onClose: Function to close the modal.
 */
import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';
import { auth, googleProvider } from '../lib/firebase';
import { signInWithPopup } from 'firebase/auth';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function AuthModal({ isOpen, onClose }: AuthModalProps) {
  const handleGoogleSignIn = async () => {
    try {
      await signInWithPopup(auth, googleProvider);
      onClose();
    } catch (error) {
      console.error("Authentication failed:", error);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center px-4">
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-black/40 backdrop-blur-sm"
          />
          <motion.div 
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            className="relative bg-white w-full max-w-md p-12 shadow-2xl z-10"
          >
            <button 
              onClick={onClose}
              className="absolute top-6 right-6 hover:rotate-90 transition-transform duration-300 opacity-50 hover:opacity-100"
            >
              <X size={24} strokeWidth={1} />
            </button>
            
            <div className="text-center mb-10">
              <h2 className="text-3xl font-serif tracking-tight mb-4 text-primary">Welcome.</h2>
              <p className="text-xs text-gray-500 tracking-wide leading-relaxed">
                Sign in to access your curated selection, exclusive editorials, and seamless checkout.
              </p>
            </div>

            <button 
              onClick={handleGoogleSignIn}
              className="w-full bg-primary text-white py-4 text-[11px] tracking-[0.2em] uppercase font-medium hover:bg-accent transition-colors duration-300 flex items-center justify-center space-x-3"
            >
              <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
                <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
              </svg>
              <span>Continue with Google</span>
            </button>
            
            <div className="mt-8 text-center">
              <p className="text-[10px] text-gray-400">
                By continuing, you agree to our Terms of Service and Privacy Policy.
              </p>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
