
import React, { useEffect, useState, useRef } from 'react';
import { motion, useSpring, useScroll } from 'framer-motion';
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
      className="custom-cursor hidden md:block"
      style={{ x: mouseX, y: mouseY, scale }}
    />
  );
};

const App: React.FC = () => {
  const [loading, setLoading] = useState(true);
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ container: containerRef });
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 2000);
    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return (
      <div className="h-screen w-full bg-black flex flex-col items-center justify-center">
        <motion.div 
          initial={{ opacity: 0, letterSpacing: '2em' }}
          animate={{ opacity: 1, letterSpacing: '0.8em' }}
          transition={{ duration: 1.5, ease: 'easeOut' }}
          className="text-white text-4xl font-bold uppercase"
        >
          LuxeDrive
        </motion.div>
        <motion.div 
          initial={{ width: 0 }}
          animate={{ width: '100px' }}
          transition={{ duration: 1.5, ease: 'easeInOut' }}
          className="h-px bg-white/30 mt-8"
        />
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
      
      {/* Page Progress Indicator */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-1 bg-white z-[100] origin-left"
        style={{ scaleX }}
      />

      <Navbar />
      
      <main ref={containerRef} className="snap-container h-screen overflow-y-scroll scrollbar-hide">
        {CARS.map((car) => (
          <CarSection key={car.id} car={car} />
        ))}

        {/* Footer Snap Section */}
        <section className="snap-section h-screen w-full flex flex-col items-center justify-center bg-black px-4 relative overflow-hidden">
          <motion.div 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 0.1 }}
            transition={{ duration: 2 }}
            className="absolute inset-0 z-0 pointer-events-none"
          >
             <img 
               src="https://images.unsplash.com/photo-1593941707882-a5bba14938c7?auto=format&fit=crop&q=80&w=1920" 
               className="w-full h-full object-cover grayscale"
               alt="Grid background"
             />
          </motion.div>

          <div className="relative z-10 text-center max-w-4xl px-6">
            <motion.h2 
              initial={{ y: 50, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              transition={{ duration: 1 }}
              className="text-5xl md:text-8xl font-bold mb-10 tracking-tighter"
            >
              The Future of Mobility
            </motion.h2>
            <motion.p 
              initial={{ y: 30, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              transition={{ duration: 1, delay: 0.2 }}
              className="text-gray-400 mb-14 text-xl font-light leading-relaxed tracking-wide"
            >
              Every LuxeDrive is an engineering marvel. Designed for performance, 
              built for sustainability, and driven by innovation.
            </motion.p>
            <div className="flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-8 justify-center items-center">
              <motion.button 
                whileHover={{ scale: 1.05, boxShadow: "0 0 30px rgba(255,255,255,0.2)" }}
                className="bg-white text-black px-16 py-5 rounded-full font-bold uppercase tracking-[0.2em] text-xs transition-all w-full md:w-auto"
              >
                Configure Yours
              </motion.button>
              <motion.button 
                whileHover={{ scale: 1.05, backgroundColor: 'white', color: 'black' }}
                className="border border-white/40 px-16 py-5 rounded-full font-bold uppercase tracking-[0.2em] text-xs transition-all w-full md:w-auto"
              >
                Find Showroom
              </motion.button>
            </div>
          </div>

          <footer className="absolute bottom-12 w-full flex flex-wrap justify-center gap-12 text-[10px] uppercase tracking-[0.4em] text-gray-600 font-bold">
            <a href="#" className="hover:text-white transition-colors">LuxeDrive © 2024</a>
            <a href="#" className="hover:text-white transition-colors">Privacy</a>
            <a href="#" className="hover:text-white transition-colors">Legal</a>
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
