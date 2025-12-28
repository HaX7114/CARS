
import React, { useEffect, useState } from 'react';
import { motion, useSpring } from 'framer-motion';
import Navbar from './components/Navbar';
import CarSection from './components/CarSection';
import AIAssistant from './components/AIAssistant';
import { CARS } from './constants';

const CustomCursor: React.FC = () => {
  const mouseX = useSpring(0, { stiffness: 500, damping: 28 });
  const mouseY = useSpring(0, { stiffness: 500, damping: 28 });
  const scale = useSpring(1, { stiffness: 500, damping: 28 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      mouseX.set(e.clientX - 10);
      mouseY.set(e.clientY - 10);
    };

    const handleMouseDown = () => scale.set(1.5);
    const handleMouseUp = () => scale.set(1);

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('mouseup', handleMouseUp);
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mouseup', handleMouseUp);
    };
  }, [mouseX, mouseY, scale]);

  return (
    <motion.div 
      className="custom-cursor"
      style={{ x: mouseX, y: mouseY, scale }}
    />
  );
};

const App: React.FC = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Artificial delay for entrance cinematic feel
    const timer = setTimeout(() => setLoading(false), 1500);
    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return (
      <div className="h-screen w-full bg-black flex items-center justify-center">
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1 }}
          className="text-white text-3xl font-bold tracking-[0.8em] uppercase"
        >
          LuxeDrive
        </motion.div>
      </div>
    );
  }

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1.5 }}
      className="bg-black text-white selection:bg-white selection:text-black overflow-hidden"
    >
      <CustomCursor />
      <Navbar />
      
      <main className="snap-container h-screen overflow-y-scroll">
        {CARS.map((car) => (
          <CarSection key={car.id} car={car} />
        ))}

        {/* Footer Snap Section */}
        <section className="snap-section h-screen w-full flex flex-col items-center justify-center bg-black px-4 relative overflow-hidden">
          <motion.div 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 0.3 }}
            transition={{ duration: 2 }}
            className="absolute inset-0 z-0 pointer-events-none"
          >
             <img 
               src="https://images.unsplash.com/photo-1593941707882-a5bba14938c7?auto=format&fit=crop&q=80&w=1920" 
               className="w-full h-full object-cover"
               alt="Grid background"
             />
          </motion.div>

          <div className="relative z-10 text-center max-w-2xl px-6">
            <motion.h2 
              initial={{ y: 30, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              transition={{ duration: 1 }}
              className="text-5xl md:text-7xl font-bold mb-10 uppercase tracking-tighter"
            >
              The Future is Yours
            </motion.h2>
            <motion.p 
              initial={{ y: 30, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              transition={{ duration: 1, delay: 0.2 }}
              className="text-gray-400 mb-14 text-xl font-light leading-relaxed tracking-wide"
            >
              LuxeDrive is more than a vehicle. It's an extension of your lifestyle. 
              Meticulously crafted, sustainable, and powerful.
            </motion.p>
            <div className="flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-8 justify-center items-center">
              <motion.button 
                whileHover={{ scale: 1.05, boxShadow: "0 0 30px rgba(255,255,255,0.3)" }}
                className="bg-white text-black px-16 py-5 rounded-full font-bold uppercase tracking-[0.2em] text-xs transition-all"
              >
                Configure Yours
              </motion.button>
              <motion.button 
                whileHover={{ scale: 1.05, backgroundColor: 'white', color: 'black' }}
                className="border border-white/40 px-16 py-5 rounded-full font-bold uppercase tracking-[0.2em] text-xs transition-all"
              >
                Find Showroom
              </motion.button>
            </div>
          </div>

          <footer className="absolute bottom-12 w-full flex flex-wrap justify-center gap-10 text-[10px] uppercase tracking-[0.3em] text-gray-600 font-bold">
            <a href="#" className="hover:text-white transition-colors">LuxeDrive © 2024</a>
            <a href="#" className="hover:text-white transition-colors">Privacy</a>
            <a href="#" className="hover:text-white transition-colors">Contact</a>
            <a href="#" className="hover:text-white transition-colors">Sustainability</a>
          </footer>
        </section>
      </main>

      <AIAssistant />
    </motion.div>
  );
};

export default App;
