
import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { getCarAdvice } from '../services/geminiService';
import { Message } from '../types';

interface ExtendedMessage extends Message {
  sources?: { title: string; uri: string }[];
}

const AIAssistant: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState<ExtendedMessage[]>([
    { role: 'model', text: 'Welcome to LuxeDrive. How can I assist you with our fleet today?' }
  ]);
  const [isTyping, setIsTyping] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isTyping]);

  const handleSend = async () => {
    if (!input.trim()) return;

    const userMsg: ExtendedMessage = { role: 'user', text: input };
    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setIsTyping(true);

    const { text, sources } = await getCarAdvice(messages, input);
    
    setIsTyping(false);
    setMessages(prev => [...prev, { role: 'model', text, sources }]);
  };

  return (
    <>
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-8 right-8 z-[60] bg-white text-black p-4 rounded-full shadow-2xl flex items-center justify-center border border-white/20"
      >
        {isOpen ? (
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        ) : (
          <div className="flex items-center space-x-2 px-1">
            <div className="relative">
               <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
              </svg>
              <span className="absolute -top-1 -right-1 flex h-3 w-3">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-3 w-3 bg-blue-500"></span>
              </span>
            </div>
            <span className="text-xs font-bold uppercase tracking-widest">Concierge</span>
          </div>
        )}
      </motion.button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 50, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 50, scale: 0.9 }}
            className="fixed bottom-24 right-8 z-[60] w-[350px] md:w-[420px] h-[600px] bg-black/95 backdrop-blur-2xl border border-white/10 rounded-[2rem] shadow-2xl flex flex-col overflow-hidden"
          >
            <div className="p-8 border-b border-white/10 bg-white/5 backdrop-blur-md">
              <h3 className="font-bold tracking-widest uppercase text-xs text-white">LuxeDrive Concierge</h3>
              <div className="flex items-center mt-1">
                 <div className="w-1.5 h-1.5 bg-green-500 rounded-full mr-2 animate-pulse" />
                 <p className="text-[10px] text-gray-400 uppercase tracking-widest font-semibold">Active & Enhanced</p>
              </div>
            </div>

            <div 
              ref={scrollRef}
              className="flex-1 overflow-y-auto p-6 space-y-6 scroll-smooth scrollbar-hide"
            >
              {messages.map((msg, idx) => (
                <div key={idx} className={`flex flex-col ${msg.role === 'user' ? 'items-end' : 'items-start'}`}>
                  <div className={`max-w-[85%] p-4 rounded-2xl text-[13px] leading-relaxed ${
                    msg.role === 'user' 
                      ? 'bg-white text-black font-medium shadow-lg' 
                      : 'bg-white/10 text-gray-100 font-light border border-white/10'
                  }`}>
                    {msg.text}
                  </div>
                  {msg.sources && msg.sources.length > 0 && (
                    <div className="mt-2 flex flex-wrap gap-2">
                      {msg.sources.map((source, sIdx) => (
                        <a 
                          key={sIdx}
                          href={source.uri}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-[9px] uppercase tracking-widest bg-blue-500/20 text-blue-300 border border-blue-500/30 px-2 py-1 rounded hover:bg-blue-500/30 transition-colors"
                        >
                          {source.title.length > 20 ? source.title.substring(0, 20) + '...' : source.title}
                        </a>
                      ))}
                    </div>
                  )}
                </div>
              ))}
              {isTyping && (
                <div className="flex justify-start">
                  <div className="bg-white/10 p-4 rounded-2xl border border-white/10 flex space-x-1.5">
                    <motion.div animate={{ opacity: [0.4, 1, 0.4] }} transition={{ repeat: Infinity, duration: 1.2 }} className="w-1.5 h-1.5 bg-gray-400 rounded-full" />
                    <motion.div animate={{ opacity: [0.4, 1, 0.4] }} transition={{ repeat: Infinity, duration: 1.2, delay: 0.2 }} className="w-1.5 h-1.5 bg-gray-400 rounded-full" />
                    <motion.div animate={{ opacity: [0.4, 1, 0.4] }} transition={{ repeat: Infinity, duration: 1.2, delay: 0.4 }} className="w-1.5 h-1.5 bg-gray-400 rounded-full" />
                  </div>
                </div>
              )}
            </div>

            <div className="p-6 border-t border-white/10 bg-black/50">
              <div className="flex space-x-3 items-center">
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleSend()}
                  placeholder="Ask Luxe Concierge..."
                  className="flex-1 bg-white/5 border border-white/10 rounded-xl px-5 py-3 text-sm text-white placeholder:text-gray-600 focus:outline-none focus:border-white/30 transition-all"
                />
                <motion.button 
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handleSend}
                  className="bg-white text-black p-3 rounded-xl shadow-xl hover:bg-gray-200 transition-colors"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.429A1 1 0 009 15.571V11a1 1 0 112 0v4.571a1 1 0 00.725.962l5 1.428a1 1 0 001.17-1.408l-7-14z" />
                  </svg>
                </motion.button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default AIAssistant;
