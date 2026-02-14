
import React, { useState, useEffect, useRef } from 'react';
import Header from './components/Header';
import BookingWidget from './components/BookingWidget';
import FleetSection from './components/FleetSection';
import ConciergeChat from './components/ConciergeChat';
import GlobalConnectivity from './components/GlobalConnectivity';

// Error Boundary Fallback Component
const ErrorFallback = () => (
  <div className="min-h-screen bg-black flex items-center justify-center text-center px-10">
    <div>
      <h2 className="text-[#d4af37] font-serif text-3xl mb-4 italic">The Journey Has Paused</h2>
      <p className="text-slate-500 text-sm tracking-widest uppercase mb-8">We encountered an unexpected turbulence.</p>
      <button 
        onClick={() => window.location.reload()} 
        className="px-8 py-3 border border-[#d4af37] text-[#d4af37] uppercase text-[10px] tracking-widest hover:bg-[#d4af37] hover:text-black transition-all"
      >
        Refresh Connection
      </button>
    </div>
  </div>
);

const ZoomHero: React.FC = () => {
  const [scrollProgress, setScrollProgress] = useState(0);
  const [videoLoaded, setVideoLoaded] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      const maxScroll = 1400;
      const currentScroll = window.scrollY;
      const progress = Math.min(currentScroll / maxScroll, 1);
      setScrollProgress(progress);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scale = 1 + scrollProgress * 45;
  const rotation = scrollProgress * -15; 
  const frameOpacity = scrollProgress > 0.85 ? 1 - (scrollProgress - 0.85) * 6.6 : 1;
  const backdropOpacity = Math.max(0, 1 - scrollProgress * 1.8);
  const contentScale = 1 + scrollProgress * 1.5;
  const contentOpacity = Math.max(0, 1 - scrollProgress * 3.5);
  const websiteAlpha = scrollProgress > 0.3 ? (scrollProgress - 0.3) * 1.5 : 0;
  const websiteBlur = Math.max(0, (0.7 - scrollProgress) * 20);

  const scrollToFleet = () => {
    const fleetSection = document.getElementById('fleet');
    if (fleetSection) {
      fleetSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="relative w-full" style={{ height: '280vh' }}>
      <div className="sticky top-0 h-screen w-full overflow-hidden bg-black">
        
        {/* Layer 0: Background Video */}
        <div 
          className="absolute inset-0 z-0 transition-opacity duration-1000 overflow-hidden"
          style={{ opacity: videoLoaded ? backdropOpacity : 0 }}
        >
          <video 
            ref={videoRef}
            autoPlay 
            muted 
            loop 
            playsInline
            onCanPlayThrough={() => setVideoLoaded(true)}
            className="absolute inset-0 w-full h-full object-cover scale-[1.1] transition-transform duration-100 ease-out"
            style={{ 
              transform: `translateY(${scrollProgress * 100}px) scale(${1.1 + scrollProgress * 0.2}) rotate(${rotation * 0.5}deg)` 
            }}
          >
            <source src="https://assets.mixkit.co/videos/preview/mixkit-aerial-view-of-a-luxury-resort-and-the-sea-40348-large.mp4" type="video/mp4" />
          </video>
          <div className="absolute inset-0 sky-gradient mix-blend-multiply opacity-40"></div>
          <div className="absolute inset-0 bg-black/30"></div>
        </div>

        {/* Loading Placeholder */}
        {!videoLoaded && (
          <div className="absolute inset-0 flex items-center justify-center bg-black">
             <div className="w-8 h-8 border border-[#d4af37]/30 border-t-[#d4af37] rounded-full animate-spin"></div>
          </div>
        )}

        {/* Layer 1: Website Preview */}
        <div 
          className="absolute inset-0 z-1 flex items-center justify-center transition-all duration-700"
          style={{ 
            opacity: websiteAlpha,
            filter: `blur(${websiteBlur}px)`,
            transform: `scale(${0.85 + scrollProgress * 0.15})` 
          }}
        >
          <div className="w-full max-w-6xl px-10 pt-20">
             <div className="text-center mb-12">
                <span className="text-[10px] uppercase tracking-[1em] text-[#d4af37] font-bold mb-6 block animate-pulse">Connection Established</span>
                <h2 className="text-4xl md:text-7xl font-serif font-bold text-white italic mb-6">The Sovereign <span className="text-[#d4af37]">Horizon</span></h2>
                <div className="w-24 h-[1px] bg-[#d4af37] mx-auto"></div>
             </div>
             <BookingWidget />
          </div>
        </div>

        {/* Layer 2: Window Frame */}
        <div 
          className="absolute inset-0 z-10 flex items-center justify-center pointer-events-none transition-transform duration-75 ease-out"
          style={{ 
            transform: `scale(${scale}) rotate(${rotation}deg)`,
            opacity: frameOpacity
          }}
        >
          <div className="absolute inset-0 bg-[#050505] window-frame-container"></div>
          <div className="relative w-[30vw] h-[55vh] border-[15px] md:border-[25px] border-[#131313] rounded-[100px] md:rounded-[180px] window-rim">
             <div 
               className="absolute inset-0 flex flex-col items-center justify-center text-center px-4 pointer-events-auto"
               style={{ 
                 transform: `scale(${contentScale / scale}) rotate(${-rotation}deg)`, 
                 opacity: contentOpacity 
               }}
             >
                <h1 className="text-2xl md:text-5xl font-futuristic font-bold tracking-[0.25em] mb-4 shimmer-text uppercase">
                    Jeskojets
                </h1>
                <p className="text-[#d4af37] text-[7px] md:text-[10px] tracking-[0.6em] font-bold uppercase italic mb-8">
                    Absolute Sovereignty
                </p>
                <button 
                  onClick={scrollToFleet}
                  className="px-6 py-2 border border-[#d4af37]/40 text-[#d4af37] text-[8px] md:text-[10px] uppercase tracking-[0.4em] font-bold hover:bg-[#d4af37] hover:text-black transition-all duration-500 backdrop-blur-sm"
                >
                  Explore The Collection
                </button>
             </div>
          </div>
        </div>

        {scrollProgress < 0.05 && (
          <div className="absolute bottom-10 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-4 animate-bounce">
            <span className="text-[9px] text-white/40 tracking-[0.5em] uppercase">Scroll to Depart</span>
            <div className="w-[1px] h-10 bg-gradient-to-b from-[#d4af37]/60 to-transparent"></div>
          </div>
        )}
      </div>
    </div>
  );
};

// Main App with simple local error boundary logic
const App: React.FC = () => {
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    const errorHandler = (e: ErrorEvent) => {
      console.error("Caught global error:", e.error);
      setHasError(true);
    };
    window.addEventListener('error', errorHandler);
    return () => window.removeEventListener('error', errorHandler);
  }, []);

  if (hasError) return <ErrorFallback />;

  return (
    <div className="min-h-screen bg-[#050505]">
      <Header />
      
      <ZoomHero />

      <div className="reveal-content relative z-20">
        <section className="py-40 container mx-auto px-10 bg-gradient-to-b from-black to-[#050505]">
            <div className="max-w-4xl mx-auto text-center">
                <span className="text-[12px] md:text-[14px] uppercase tracking-[1em] text-[#d4af37] font-bold mb-10 block italic">
                    Unrivaled Distinction
                </span>
                <h2 className="text-4xl md:text-6xl font-serif font-bold mb-12 leading-tight text-white italic">
                    The Art of <span className="text-[#d4af37]">Global Mastery</span>
                </h2>
                <p className="text-slate-400 text-lg md:text-xl leading-relaxed font-light italic max-w-2xl mx-auto">
                    Transcending the ordinary through precise execution and aesthetic perfection. 
                    Every mile is a testament to our commitment to your absolute comfort.
                </p>
            </div>
        </section>

        <FleetSection />

        <section id="services" className="py-32 bg-black border-y border-white/5">
          <div className="container mx-auto px-10">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-1 px-4">
              {[
                {
                  title: 'Celestial Dining',
                  desc: 'A gastronomic odyssey curated by master chefs, served at 40,000 feet with impeccable timing.',
                  icon: '🍷'
                },
                {
                  title: 'Stealth Privacy',
                  desc: 'Advanced protocols ensuring your movements remain entirely off-radar and confidential.',
                  icon: '🔒'
                },
                {
                  title: 'Elite Concierge',
                  desc: 'Our global network orchestrates every aspect of your life beyond the tarmac.',
                  icon: '🗝️'
                }
              ].map((service, idx) => (
                <div key={idx} className="group p-16 bg-[#050505] border border-white/5 hover:border-[#d4af37]/20 transition-all duration-1000 text-center cursor-default">
                  <div className="text-3xl mb-10 opacity-40 group-hover:opacity-100 transition-opacity grayscale group-hover:grayscale-0 transform group-hover:scale-110 duration-700">{service.icon}</div>
                  <h3 className="text-2xl font-serif font-bold mb-6 italic tracking-wide group-hover:text-[#d4af37] transition-colors">{service.title}</h3>
                  <p className="text-slate-500 leading-relaxed font-light text-sm italic">{service.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <ConciergeChat />

        <section className="py-40 bg-[#050505] flex justify-center items-center text-center">
          <div className="max-w-4xl px-10">
            <span className="text-[40px] text-[#d4af37] font-serif mb-8 block italic">"</span>
            <h3 className="text-3xl md:text-5xl font-serif font-light text-slate-300 italic leading-snug">
              Luxury is not a destination, but a state of being curated through silence and space.
            </h3>
            <div className="w-16 h-[1px] bg-[#d4af37]/30 mx-auto mt-12 mb-6"></div>
            <p className="text-[10px] uppercase tracking-[0.6em] text-[#d4af37] font-bold">The Jesko Philosophy</p>
          </div>
        </section>

        <GlobalConnectivity />

        <footer id="contact" className="bg-black pt-32 pb-16 border-t border-white/5">
          <div className="container mx-auto px-10">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-20 mb-24">
              <div className="col-span-1 lg:col-span-1">
                <div className="flex items-center gap-4 mb-10">
                  <div className="w-10 h-10 border border-[#d4af37] rotate-45 flex items-center justify-center">
                    <span className="font-serif text-[#d4af37] font-bold -rotate-45">J</span>
                  </div>
                  <span className="text-2xl font-serif font-bold tracking-widest text-white uppercase italic">
                    Jesko <span className="text-[#d4af37]">Jets</span>
                  </span>
                </div>
                <p className="text-slate-500 italic leading-relaxed text-sm">
                  Architects of the sky. Redefining private travel through absolute discretion and technological mastery.
                </p>
              </div>
              
              <div>
                <h4 className="text-[9px] uppercase tracking-[0.4em] font-bold text-[#d4af37] mb-10">Exploration</h4>
                <ul className="space-y-6">
                  {['Our Fleet', 'Safety First', 'Services', 'Empty Legs', 'Memberships'].map(item => (
                    <li key={item}><a href="#" className="text-slate-500 text-xs font-light tracking-widest hover:text-[#d4af37] transition-colors italic">{item}</a></li>
                  ))}
                </ul>
              </div>

              <div>
                <h4 className="text-[9px] uppercase tracking-[0.4em] font-bold text-[#d4af37] mb-10">Global Hubs</h4>
                <ul className="space-y-6">
                  {['Dubai (DWC)', 'London (FAB)', 'New York (TEB)', 'Singapore (SIN)', 'Paris (LBG)'].map(item => (
                    <li key={item}><a href="#" className="text-slate-500 text-xs font-light tracking-widest hover:text-[#d4af37] transition-colors italic">{item}</a></li>
                  ))}
                </ul>
              </div>

              <div>
                <h4 className="text-[9px] uppercase tracking-[0.4em] font-bold text-[#d4af37] mb-10">Stay Informed</h4>
                <p className="text-slate-500 text-xs italic mb-8">Receive exclusive offers for empty leg flights and fleet updates.</p>
                <div className="flex border-b border-[#d4af37]/30 pb-2">
                  <input 
                    type="email" 
                    placeholder="Enter your email" 
                    className="bg-transparent text-white placeholder-slate-800 text-sm flex-1 outline-none font-serif italic"
                  />
                  <button className="text-[#d4af37] font-bold tracking-widest uppercase text-[10px]">Join</button>
                </div>
              </div>
            </div>
            
            <div className="pt-16 border-t border-white/5 flex flex-col md:flex-row justify-between items-end gap-10">
              <p className="text-slate-700 text-[9px] uppercase tracking-[0.3em]">
                © 2024 Jesko Jets. Part of the International Aviation Group.
              </p>
              <div className="flex flex-col items-end gap-4">
                <div className="flex gap-12 text-[9px] text-slate-700 uppercase tracking-[0.3em]">
                  <a href="#" className="hover:text-[#d4af37] transition-colors">Privacy Policy</a>
                  <a href="#" className="hover:text-[#d4af37] transition-colors">Safety Standards</a>
                </div>
                <p className="text-slate-800 text-[8px] uppercase tracking-[0.4em] font-medium">
                  Created by Pratyush Raj
                </p>
              </div>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
};

export default App;
