
import React from 'react';

const GlobalConnectivity: React.FC = () => {
  return (
    <section className="relative py-40 overflow-hidden bg-gradient-to-b from-[#050505] via-[#0a0c1a] to-[#000000]">
      {/* Background Ambience */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1000px] h-[1000px] bg-blue-500/5 blur-[180px] rounded-full pointer-events-none"></div>
      
      <div className="container mx-auto px-10 relative z-10">
        <div className="flex flex-col items-center">
          
          {/* 3D Rotating Globe Container */}
          <div className="relative w-80 h-80 md:w-[500px] md:h-[500px] mb-20 group">
            {/* Outer Glow Ring */}
            <div className="absolute inset-0 border border-blue-500/20 rounded-full scale-110 animate-[pulse_4s_ease-in-out_infinite]"></div>
            <div className="absolute inset-0 border border-[#d4af37]/10 rounded-full scale-125 animate-[pulse_6s_ease-in-out_infinite]"></div>

            {/* The Globe Sphere */}
            <div className="absolute inset-0 rounded-full overflow-hidden shadow-[inset_0_0_80px_rgba(59,130,246,0.2)] bg-[#050505]/40 backdrop-blur-sm border border-white/5">
              
              {/* Rotating Grid/Lines (Pseudo-3D) */}
              <div className="absolute inset-0 animate-[spin_20s_linear_infinite] opacity-30">
                <svg viewBox="0 0 100 100" className="w-full h-full stroke-blue-400/40 fill-none">
                  <circle cx="50" cy="50" r="48" strokeWidth="0.2" />
                  {[...Array(6)].map((_, i) => (
                    <ellipse key={i} cx="50" cy="50" rx={48} ry={8 + i * 8} strokeWidth="0.1" />
                  ))}
                  {[...Array(6)].map((_, i) => (
                    <ellipse key={i} cx="50" cy="50" rx={8 + i * 8} ry={48} strokeWidth="0.1" />
                  ))}
                </svg>
              </div>

              {/* Glowing Connection Dots & Paths */}
              <div className="absolute inset-0 animate-[spin_35s_linear_infinite_reverse]">
                <svg viewBox="0 0 100 100" className="w-full h-full">
                  {/* Hub Dots */}
                  {[
                    { x: 30, y: 40 }, { x: 70, y: 35 }, { x: 50, y: 65 }, 
                    { x: 20, y: 60 }, { x: 80, y: 65 }, { x: 45, y: 25 }
                  ].map((dot, i) => (
                    <g key={i}>
                      <circle cx={dot.x} cy={dot.y} r="0.8" className="fill-[#d4af37] animate-pulse" />
                      <circle cx={dot.x} cy={dot.y} r="2" className="fill-[#d4af37]/20 animate-ping" />
                    </g>
                  ))}
                  
                  {/* Flight Paths */}
                  <path 
                    d="M30 40 Q 50 20 70 35" 
                    className="stroke-[#d4af37]/40 fill-none stroke-[0.2]" 
                    strokeDasharray="1,2"
                  />
                  <path 
                    d="M70 35 Q 60 50 50 65" 
                    className="stroke-blue-400/40 fill-none stroke-[0.2]" 
                    strokeDasharray="2,2"
                  />
                  <path 
                    d="M50 65 Q 35 65 20 60" 
                    className="stroke-[#d4af37]/40 fill-none stroke-[0.2]" 
                  />
                </svg>
              </div>

              {/* Internal Shadow for Depth */}
              <div className="absolute inset-0 pointer-events-none shadow-[inset_-40px_-40px_100px_rgba(0,0,0,0.9),inset_40px_40px_100px_rgba(59,130,246,0.1)]"></div>
            </div>

            {/* Orbiting Elements */}
            <div className="absolute inset-0 animate-[spin_15s_linear_infinite]">
              <div className="absolute top-0 left-1/2 -translate-x-1/2 w-1.5 h-1.5 bg-[#d4af37] rounded-full shadow-[0_0_15px_#d4af37]"></div>
            </div>
          </div>

          {/* Typography */}
          <div className="text-center">
            <h2 className="text-4xl md:text-6xl font-futuristic font-bold tracking-[0.4em] mb-6 text-white uppercase group-hover:shimmer-text transition-all duration-1000">
              Jeskojets
            </h2>
            <div className="flex items-center justify-center gap-6 mb-8">
              <div className="w-12 h-[1px] bg-gradient-to-r from-transparent to-[#d4af37]/60"></div>
              <span className="text-[#d4af37] text-xs md:text-sm font-bold uppercase tracking-[0.6em] italic">
                Connecting The World
              </span>
              <div className="w-12 h-[1px] bg-gradient-to-l from-transparent to-[#d4af37]/60"></div>
            </div>
            
            <p className="text-slate-500 text-[10px] md:text-xs uppercase tracking-[0.3em] font-light max-w-xl mx-auto leading-loose italic">
              From the azure coasts of the Mediterranean to the soaring skylines of the Far East. 
              Your presence is required everywhere; we ensure you arrive as if you never left.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default GlobalConnectivity;
