
import React, { useState } from 'react';

const BookingWidget: React.FC = () => {
  const [tripType, setTripType] = useState<'one-way' | 'round-trip'>('one-way');

  return (
    <div className="w-full max-w-6xl mx-auto bg-black/60 backdrop-blur-3xl border border-[#d4af37]/10 rounded-none p-1 md:p-1 shadow-[0_50px_100px_rgba(0,0,0,0.8)] -mt-24 relative z-20">
      <div className="bg-[#050505] p-8 md:p-12 border border-[#d4af37]/30">
        <div className="flex gap-10 mb-10">
          <button 
            onClick={() => setTripType('one-way')}
            className={`text-[11px] font-bold uppercase tracking-[0.4em] transition-all duration-500 relative pb-2 ${tripType === 'one-way' ? 'text-[#d4af37] after:w-full' : 'text-slate-500 after:w-0'} after:content-[''] after:absolute after:bottom-0 after:left-0 after:h-[1px] after:bg-[#d4af37] after:transition-all`}
          >
            One Way
          </button>
          <button 
            onClick={() => setTripType('round-trip')}
            className={`text-[11px] font-bold uppercase tracking-[0.4em] transition-all duration-500 relative pb-2 ${tripType === 'round-trip' ? 'text-[#d4af37] after:w-full' : 'text-slate-500 after:w-0'} after:content-[''] after:absolute after:bottom-0 after:left-0 after:h-[1px] after:bg-[#d4af37] after:transition-all`}
          >
            Round Trip
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="flex flex-col gap-3">
            <label className="text-[9px] uppercase tracking-[0.4em] font-bold text-[#d4af37]/80">Departure</label>
            <input 
              type="text" 
              placeholder="GLOBAL HUB" 
              className="bg-transparent border-b border-white/10 p-2 text-white placeholder-slate-700 outline-none focus:border-[#d4af37] transition-all font-serif italic text-lg"
            />
          </div>
          <div className="flex flex-col gap-3">
            <label className="text-[9px] uppercase tracking-[0.4em] font-bold text-[#d4af37]/80">Arrival</label>
            <input 
              type="text" 
              placeholder="DESTINATION" 
              className="bg-transparent border-b border-white/10 p-2 text-white placeholder-slate-700 outline-none focus:border-[#d4af37] transition-all font-serif italic text-lg"
            />
          </div>
          <div className="flex flex-col gap-3">
            <label className="text-[9px] uppercase tracking-[0.4em] font-bold text-[#d4af37]/80">Schedule</label>
            <input 
              type="date" 
              className="bg-transparent border-b border-white/10 p-2 text-white outline-none focus:border-[#d4af37] transition-all text-sm appearance-none"
            />
          </div>
          <div className="flex flex-col gap-3">
            <label className="text-[9px] uppercase tracking-[0.4em] font-bold text-[#d4af37]/80">Manifest</label>
            <select className="bg-transparent border-b border-white/10 p-2 text-white outline-none focus:border-[#d4af37] transition-all text-sm cursor-pointer">
              {[...Array(19)].map((_, i) => (
                <option key={i} value={i + 1} className="bg-black text-white">{i + 1} Guests</option>
              ))}
            </select>
          </div>
        </div>

        <div className="mt-12 flex justify-center md:justify-end">
          <button className="group relative overflow-hidden bg-[#d4af37] text-black px-12 py-5 font-bold uppercase text-[11px] tracking-[0.4em] transition-all duration-700">
            <span className="relative z-10">Inquire Availability</span>
            <div className="absolute inset-0 bg-white translate-y-full group-hover:translate-y-0 transition-transform duration-500"></div>
          </button>
        </div>
      </div>
    </div>
  );
};

export default BookingWidget;
