
import React, { useRef } from 'react';
import { motion, useScroll, useTransform, useInView, Variants } from 'framer-motion';
import { CarModel } from '../types';

interface CarSectionProps {
  car: CarModel;
}

const CarSection: React.FC<CarSectionProps> = ({ car }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { amount: 0.5 });
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  // Enhanced Parallax and Ken Burns effect
  const yPos = useTransform(scrollYProgress, [0, 1], ["-15%", "15%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [1.2, 1, 1.2]);

  const textVariants: Variants = {
    hidden: { y: 60, opacity: 0 },
    visible: { y: 0, opacity: 1, transition: { duration: 1.4, ease: [0.16, 1, 0.3, 1] } }
  };

  const specVariants: Variants = {
    hidden: { y: 20, opacity: 0 },
    visible: (i: number) => ({ 
      y: 0, 
      opacity: 1, 
      transition: { delay: 0.6 + (i * 0.1), duration: 1, ease: [0.16, 1, 0.3, 1] } 
    })
  };

  return (
    <section 
      id={car.id}
      ref={containerRef}
      className="snap-section relative h-screen w-full flex flex-col items-center justify-between overflow-hidden"
    >
      {/* Background Image with Parallax & Ken Burns effect */}
      <motion.div 
        style={{ y: yPos, scale }}
        className="absolute inset-0 z-0"
      >
        {/* Darker overall overlay for better contrast */}
        <div className="absolute inset-0 bg-black/30 z-10" />
        <img 
          src={car.image} 
          alt={car.name} 
          className="w-full h-[130%] object-cover object-center"
        />
      </motion.div>

      {/* Hero Text with Container */}
      <motion.div 
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
        variants={textVariants}
        style={{ opacity }}
        className="relative z-20 pt-32 text-center w-full px-4 flex flex-col items-center"
      >
        <div className="bg-black/40 backdrop-blur-md px-10 py-8 rounded-3xl border border-white/10 shadow-2xl inline-block max-w-4xl">
          <motion.h1 className="text-5xl md:text-8xl font-bold mb-4 tracking-tighter drop-shadow-2xl text-white">
            {car.name}
          </motion.h1>
          <motion.p className="text-lg md:text-2xl font-light tracking-widest text-gray-200">
            {car.tagline}
          </motion.p>
        </div>
      </motion.div>

      {/* Bottom Controls & Specs with Container */}
      <motion.div 
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
        style={{ opacity }}
        className="relative z-20 pb-12 w-full max-w-6xl px-8 flex flex-col items-center"
      >
        <div className="bg-black/50 backdrop-blur-lg p-10 md:p-12 rounded-[2.5rem] border border-white/10 shadow-2xl w-full max-w-4xl flex flex-col items-center">
          {/* Key Metrics */}
          <div className="flex items-center justify-around w-full mb-12">
            {[
              { value: car.specs.range, label: 'Range (est.)' },
              { value: car.specs.acceleration, label: '0-60 mph' },
              { value: car.specs.topSpeed, label: 'Top Speed' }
            ].map((spec, i) => (
              <motion.div 
                key={i} 
                custom={i}
                variants={specVariants}
                className="text-center group cursor-default"
              >
                <div className="text-2xl md:text-5xl font-bold mb-1 group-hover:scale-110 transition-transform duration-700 ease-out text-white">{spec.value}</div>
                <div className="text-[8px] md:text-xs uppercase tracking-[0.3em] font-bold text-gray-400 group-hover:text-white transition-colors duration-500">{spec.label}</div>
              </motion.div>
            ))}
          </div>

          {/* Dynamic Buttons */}
          <div className="flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-6 w-full justify-center max-w-lg">
            <motion.button 
              whileHover={{ scale: 1.05, y: -2, backgroundColor: '#f9fafb' }}
              whileTap={{ scale: 0.98 }}
              className="bg-white text-black px-12 py-4 rounded-full text-[10px] font-bold uppercase tracking-[0.2em] transition-all w-full shadow-lg"
            >
              Custom Order
            </motion.button>
            <motion.button 
              whileHover={{ scale: 1.05, backgroundColor: 'rgba(255,255,255,0.2)', y: -2 }}
              whileTap={{ scale: 0.98 }}
              className="bg-white/10 border border-white/30 text-white px-12 py-4 rounded-full text-[10px] font-bold uppercase tracking-[0.2em] transition-all w-full shadow-lg backdrop-blur-md"
            >
              Demo Drive
            </motion.button>
          </div>
        </div>

        {/* Animated Scroll Hint */}
        <motion.div 
          animate={{ y: [0, 10, 0], opacity: [0.3, 0.7, 0.3] }}
          transition={{ repeat: Infinity, duration: 2.5, ease: "easeInOut" }}
          className="mt-10 flex flex-col items-center"
        >
          <div className="w-[1px] h-10 bg-gradient-to-b from-white to-transparent" />
        </motion.div>
      </motion.div>
    </section>
  );
};

export default CarSection;
