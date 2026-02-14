
import React, { useState, useEffect } from 'react';
import { NAV_LINKS } from '../constants';

const Header: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header className={`fixed top-0 w-full z-50 transition-all duration-700 ${
      isScrolled ? 'bg-black/95 backdrop-blur-2xl py-3 border-b border-[#d4af37]/20 shadow-[0_10px_30px_rgba(0,0,0,0.5)]' : 'bg-transparent py-10'
    }`}>
      <div className="container mx-auto px-10 flex justify-between items-center">
        <div className="flex items-center gap-4 group cursor-pointer">
          <div className="w-12 h-12 border border-[#d4af37]/50 group-hover:border-[#d4af37] rotate-45 flex items-center justify-center transition-all duration-500">
            <span className="font-serif font-bold text-[#d4af37] text-2xl -rotate-45">J</span>
          </div>
          <div className="flex flex-col">
            <span className="text-xl font-serif font-bold tracking-[0.25em] text-white uppercase italic leading-none">
              Jesko
            </span>
            <span className="text-[10px] tracking-[0.5em] text-[#d4af37] uppercase font-light mt-1">
              International
            </span>
          </div>
        </div>

        <nav className="hidden lg:flex gap-12">
          {NAV_LINKS.map(link => (
            <a 
              key={link.label} 
              href={link.href}
              className="text-[11px] font-medium tracking-[0.3em] text-slate-300 uppercase hover:text-[#d4af37] transition-all duration-300 relative after:content-[''] after:absolute after:bottom-[-4px] after:left-0 after:w-0 after:h-[1px] after:bg-[#d4af37] hover:after:w-full after:transition-all"
            >
              {link.label}
            </a>
          ))}
        </nav>

        <button className="hidden sm:block bg-transparent border border-[#d4af37]/50 hover:bg-[#d4af37] hover:text-black text-[#d4af37] px-8 py-2.5 rounded-none font-medium uppercase text-[10px] tracking-[0.3em] transition-all duration-500">
          Book Your Journey
        </button>
      </div>
    </header>
  );
};

export default Header;
