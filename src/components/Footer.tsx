import React from 'react';
import { Link } from 'react-router-dom';
import { Instagram, Facebook, Twitter } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-white border-t border-gray-100 pt-24 pb-12">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-24">
          <div className="col-span-1 md:col-span-1 space-y-6">
            <h2 className="text-xl font-serif tracking-tighter font-bold uppercase">STUDIO J.</h2>
            <p className="text-xs text-gray-400 leading-relaxed max-w-xs">
              Redefining modern luxury through minimalist design and exceptional craftsmanship.
            </p>
            <div className="flex items-center space-x-4">
              <Instagram size={18} className="opacity-40 hover:opacity-100 cursor-pointer transition-opacity" />
              <Facebook size={18} className="opacity-40 hover:opacity-100 cursor-pointer transition-opacity" />
              <Twitter size={18} className="opacity-40 hover:opacity-100 cursor-pointer transition-opacity" />
            </div>
          </div>

          <div className="space-y-6">
            <h3 className="text-[10px] tracking-[0.2em] font-medium uppercase">Collection</h3>
            <ul className="space-y-4">
              {['New Arrivals', 'Outerwear', 'Dresses', 'Tops', 'Bottoms'].map((item) => (
                <li key={item}>
                  <Link to="/shop" className="text-xs text-gray-400 hover:text-black transition-colors">{item}</Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="space-y-6">
            <h3 className="text-[10px] tracking-[0.2em] font-medium uppercase">Company</h3>
            <ul className="space-y-4">
              {['Our Story', 'Editorial', 'Sustainability', 'Contact'].map((item) => (
                <li key={item}>
                  <Link to="/editorial" className="text-xs text-gray-400 hover:text-black transition-colors">{item}</Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="space-y-6">
            <h3 className="text-[10px] tracking-[0.2em] font-medium uppercase">Newsletter</h3>
            <p className="text-xs text-gray-400">Join our mailing list for exclusive updates and early access.</p>
            <div className="flex border-b border-black pb-2">
              <input 
                type="email" 
                placeholder="EMAIL ADDRESS" 
                className="bg-transparent border-none outline-none text-[10px] tracking-widest flex-1 placeholder:text-gray-300"
              />
              <button className="text-[10px] tracking-widest font-medium uppercase hover:opacity-50 transition-opacity">Join</button>
            </div>
          </div>
        </div>

        <div className="flex flex-col md:flex-row justify-between items-center pt-12 border-t border-gray-50 space-y-4 md:space-y-0">
          <p className="text-[10px] text-gray-300 tracking-widest uppercase">© 2026 STUDIO J. All rights reserved.</p>
          <div className="flex items-center space-x-8 text-[10px] text-gray-300 tracking-widest uppercase">
            <span className="hover:text-black cursor-pointer transition-colors">Privacy Policy</span>
            <span className="hover:text-black cursor-pointer transition-colors">Terms of Service</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
