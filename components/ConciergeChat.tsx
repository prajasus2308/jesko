
import React, { useState, useRef, useEffect } from 'react';
import { getConciergeResponse } from '../services/geminiService';
import { Message } from '../types';

const ConciergeChat: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([
    { role: 'model', text: 'Good day. I am your Jesko Attache. It would be my honor to curate your next journey. How may I serve you?' }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    const userMsg = input.trim();
    setInput('');
    setMessages(prev => [...prev, { role: 'user', text: userMsg }]);
    setIsLoading(true);

    const response = await getConciergeResponse(userMsg, messages);
    setMessages(prev => [...prev, { role: 'model', text: response || 'Forgive me, I seem to have a temporary lapse in communication. Please try again.' }]);
    setIsLoading(false);
  };

  return (
    <section id="concierge" className="py-32 bg-[#080808] relative overflow-hidden">
      <div className="absolute top-0 right-0 w-[50%] h-full bg-[#d4af37]/5 blur-[120px] rounded-full translate-x-1/2"></div>
      
      <div className="container mx-auto px-10 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-24 items-start">
          <div className="lg:sticky lg:top-40">
            <span className="text-[11px] uppercase tracking-[0.8em] text-[#d4af37] font-bold mb-6 block italic">Personalized Excellence</span>
            <h2 className="text-5xl md:text-7xl font-serif font-bold mb-10 leading-tight">The <span className="italic">Attache</span> Service</h2>
            <p className="text-slate-400 text-lg mb-10 leading-relaxed font-light italic">
              "To fly is common, to travel is an art." Our digital attache is programmed with the sensibilities of a world-class majordomo, ensuring every detail is anticipated.
            </p>
            <div className="space-y-8">
              {[
                { label: 'Bespoke Itinerary Curation', desc: 'Crafting multi-destination routes with absolute precision.' },
                { label: 'Ultra-Luxury Logistics', desc: 'Seamless integration with ground transport and private estates.' },
                { label: 'In-Flight Gastronomy', desc: 'Coordination of Michelin-standard catering at high altitude.' }
              ].map((item, i) => (
                <div key={i} className="flex gap-6 group">
                  <div className="w-px h-12 bg-[#d4af37]/30 group-hover:bg-[#d4af37] transition-all"></div>
                  <div>
                    <h4 className="text-[#d4af37] font-bold text-xs uppercase tracking-[0.3em] mb-2">{item.label}</h4>
                    <p className="text-slate-500 text-sm italic">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-black border border-[#d4af37]/20 rounded-none overflow-hidden shadow-[0_50px_100px_rgba(0,0,0,1)] flex flex-col h-[700px]">
            <div className="p-8 bg-[#0a0a0a] border-b border-[#d4af37]/10 flex justify-between items-center">
              <div className="flex items-center gap-5">
                <div className="w-12 h-12 border border-[#d4af37]/40 flex items-center justify-center font-serif text-[#d4af37] text-xl">
                  JA
                </div>
                <div>
                  <h3 className="font-serif italic text-lg text-white">Jesko Attache</h3>
                  <div className="flex items-center gap-2">
                    <div className="w-1 h-1 bg-[#d4af37] rounded-full animate-pulse"></div>
                    <span className="text-[9px] text-[#d4af37] uppercase tracking-[0.4em] font-bold">At Your Service</span>
                  </div>
                </div>
              </div>
            </div>

            <div ref={scrollRef} className="flex-1 p-10 overflow-y-auto space-y-8 custom-scrollbar">
              {messages.map((msg, i) => (
                <div key={i} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                  <div className={`max-w-[85%] p-6 text-sm leading-[1.8] tracking-wide font-light ${
                    msg.role === 'user' 
                      ? 'bg-[#111] text-[#d4af37] italic border-r-2 border-[#d4af37]' 
                      : 'text-slate-300 font-serif italic border-l border-white/10'
                  }`}>
                    {msg.text}
                  </div>
                </div>
              ))}
              {isLoading && (
                <div className="flex justify-start">
                  <div className="flex gap-2 p-6">
                    <div className="w-1 h-1 bg-[#d4af37] rounded-full animate-bounce"></div>
                    <div className="w-1 h-1 bg-[#d4af37] rounded-full animate-bounce [animation-delay:-0.15s]"></div>
                    <div className="w-1 h-1 bg-[#d4af37] rounded-full animate-bounce [animation-delay:-0.3s]"></div>
                  </div>
                </div>
              )}
            </div>

            <div className="p-8 border-t border-white/5 bg-[#050505]">
              <div className="flex items-center gap-6 border-b border-[#d4af37]/20 pb-4 group">
                <input 
                  type="text" 
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleSend()}
                  placeholder="Express your travel desires..."
                  className="flex-1 bg-transparent text-white placeholder-slate-700 outline-none italic font-serif text-lg py-2"
                />
                <button 
                  onClick={handleSend}
                  disabled={isLoading}
                  className="text-[#d4af37] hover:text-white transition-colors duration-500 uppercase text-[10px] tracking-[0.5em] font-bold"
                >
                  Send
                </button>
              </div>
              <p className="mt-4 text-[8px] text-slate-700 uppercase tracking-[0.3em] text-center">Encrypted & Confidential</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ConciergeChat;
