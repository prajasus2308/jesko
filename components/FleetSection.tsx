
import React, { useState, useMemo, useEffect } from 'react';
import { FLEET } from '../constants';
import { Jet } from '../types';

const JetCard: React.FC<{ jet: Jet; index: number; isVisible: boolean }> = ({ jet, index, isVisible }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div 
      onClick={() => setIsExpanded(!isExpanded)}
      className={`group relative bg-[#0a0a0a] border border-white/5 overflow-hidden transition-all duration-700 animate-in fade-in slide-in-from-bottom-8 fill-mode-both cursor-pointer 
      hover:-translate-y-3 hover:border-[#d4af37]/40 hover:shadow-[0_25px_50px_-12px_rgba(0,0,0,0.5),0_0_30px_rgba(212,175,55,0.2)]
      ${isExpanded ? 'gold-border-glow border-[#d4af37]/60 shadow-[0_0_50px_rgba(212,175,55,0.3)]' : ''} 
      ${isVisible ? 'opacity-100' : 'opacity-0'}`}
      style={{ 
        animationDelay: `${index * 120}ms`, 
        animationDuration: '1000ms'
      }}
    >
      <div className="relative h-[500px] overflow-hidden">
        <img 
          src={jet.image} 
          alt={jet.name} 
          className={`w-full h-full object-cover transition-transform duration-[2.5s] ease-out ${
            isExpanded ? 'scale-110 opacity-100' : 'opacity-80 group-hover:opacity-100 group-hover:scale-115'
          }`}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent"></div>
        
        <div className="absolute top-6 left-6">
          <div className="px-4 py-1.5 border border-[#d4af37]/30 backdrop-blur-md bg-black/20 group-hover:border-[#d4af37]/60 transition-colors duration-500">
            <span className="text-[#d4af37] text-[9px] font-bold uppercase tracking-[0.4em]">
              {jet.category}
            </span>
          </div>
        </div>

        <div className="absolute bottom-0 left-0 right-0 p-10 bg-gradient-to-t from-black to-transparent">
          <h3 className="text-4xl font-serif font-light text-white mb-4 italic group-hover:text-[#d4af37] transition-colors duration-700">
            {jet.name}
          </h3>
          
          <div className="flex gap-10 border-t border-white/10 pt-6 group-hover:border-[#d4af37]/20 transition-colors duration-700">
            <div className="flex flex-col">
              <span className="text-[8px] uppercase tracking-[0.4em] text-[#d4af37] font-bold mb-1">Range</span>
              <span className="text-xs font-light tracking-widest text-white">{jet.range}</span>
            </div>
            <div className="flex flex-col">
              <span className="text-[8px] uppercase tracking-[0.4em] text-[#d4af37] font-bold mb-1">Seats</span>
              <span className="text-xs font-light tracking-widest text-white">{jet.passengers} PAX</span>
            </div>
          </div>

          {/* Expandable Content Container */}
          <div className={`grid transition-all duration-700 ease-in-out ${isExpanded ? 'grid-rows-[1fr] mt-8 opacity-100' : 'grid-rows-[0fr] mt-0 opacity-0'}`}>
            <div className="overflow-hidden">
              <p className="text-slate-400 text-sm mb-8 leading-relaxed italic max-w-sm">
                {jet.description}
              </p>
              
              <div className="grid grid-cols-2 gap-6 pb-4">
                <div className="flex flex-col">
                  <span className="text-[8px] uppercase tracking-[0.4em] text-[#d4af37] font-bold mb-1">Cruising Speed</span>
                  <span className="text-xs font-light tracking-widest text-white">{jet.speed}</span>
                </div>
                <div className="flex flex-col">
                  <span className="text-[8px] uppercase tracking-[0.4em] text-[#d4af37] font-bold mb-1">Cabin Height</span>
                  <span className="text-xs font-light tracking-widest text-white">{jet.cabinHeight}</span>
                </div>
                <div className="flex flex-col col-span-2 mt-2">
                  <span className="text-[8px] uppercase tracking-[0.4em] text-[#d4af37] font-bold mb-1">Charter Investment</span>
                  <span className="text-lg font-serif italic text-white">From ${jet.hourlyRate.toLocaleString()} / Hour</span>
                </div>
              </div>
              
              <button className="w-full mt-4 bg-[#d4af37] text-black py-3 font-bold uppercase text-[9px] tracking-[0.4em] transition-all hover:bg-white shadow-[0_4px_20px_rgba(212,175,55,0.3)]">
                Request Manifest
              </button>
            </div>
          </div>

          <div className="mt-4 flex justify-center">
            <div className={`h-[1px] bg-[#d4af37]/30 transition-all duration-700 ${isExpanded ? 'w-full' : 'w-8 group-hover:w-16'}`}></div>
          </div>
        </div>
      </div>
    </div>
  );
};

const FleetSection: React.FC = () => {
  const [activeFilter, setActiveFilter] = useState('All');
  const [displayFilter, setDisplayFilter] = useState('All');
  const [isTransitioning, setIsTransitioning] = useState(false);
  
  const categories = useMemo(() => {
    const cats = Array.from(new Set(FLEET.map(j => j.category)));
    return ['All', ...cats];
  }, []);

  const filteredJets = useMemo(() => {
    return displayFilter === 'All' 
      ? FLEET 
      : FLEET.filter(jet => jet.category === displayFilter);
  }, [displayFilter]);

  const handleFilterChange = (cat: string) => {
    if (cat === activeFilter || isTransitioning) return;
    
    setIsTransitioning(true);
    setActiveFilter(cat);
    
    // Smooth transition: Fade out first, then change data and fade back in
    setTimeout(() => {
      setDisplayFilter(cat);
      setIsTransitioning(false);
    }, 400);
  };

  return (
    <section id="fleet" className="py-32 bg-[#050505]">
      <div className="container mx-auto px-10">
        <div className="text-center mb-16">
          <span className="text-[11px] uppercase tracking-[0.8em] text-[#d4af37] font-bold mb-6 block">The Sovereign Collection</span>
          <h2 className="text-5xl md:text-7xl font-serif font-bold mb-8 italic">World Class <span className="text-white/20">Fleet</span></h2>
          <div className="w-24 h-[1px] bg-[#d4af37]/50 mx-auto mb-12"></div>
          
          {/* Filtering Options */}
          <div className="flex flex-wrap justify-center gap-4 md:gap-8 mt-12">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => handleFilterChange(cat)}
                className={`text-[10px] uppercase tracking-[0.4em] font-bold transition-all duration-500 py-2 border-b-2 ${
                  activeFilter === cat 
                    ? 'border-[#d4af37] text-[#d4af37]' 
                    : 'border-transparent text-slate-500 hover:text-slate-300'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        <div 
          className={`grid grid-cols-1 lg:grid-cols-2 gap-1 px-4 md:px-0 transition-opacity duration-500 ease-in-out ${
            isTransitioning ? 'opacity-0 translate-y-4' : 'opacity-100 translate-y-0'
          }`}
        >
          {filteredJets.map((jet, idx) => (
            <JetCard 
              key={`${jet.id}-${displayFilter}`} 
              jet={jet} 
              index={idx} 
              isVisible={!isTransitioning} 
            />
          ))}
        </div>
        
        {!isTransitioning && filteredJets.length === 0 && (
          <div className="py-20 text-center animate-in fade-in duration-700">
            <p className="text-slate-500 font-serif italic text-xl">No aircraft in this category currently available for charter.</p>
          </div>
        )}
      </div>
    </section>
  );
};

export default FleetSection;