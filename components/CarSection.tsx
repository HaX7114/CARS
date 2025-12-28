
import React, { useRef } from 'react';
import { motion, useScroll, useTransform, useInView, Variants } from 'framer-motion';
import { CarModel } from '../types';

interface CarSectionProps {
  car: CarModel;
}

const CarSection: React.FC<CarSectionProps> = ({ car }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { amount: 0.3, once: false });
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  // Dramatic Parallax & Zoom
  const yPos = useTransform(scrollYProgress, [0, 1], ["-20%", "20%"]);
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [1.3, 1, 1.3]);
  const overlayOpacity = useTransform(scrollYProgress, [0, 0.5, 1], [0.6, 0.3, 0.6]);

  const textVariants: Variants = {
    hidden: { y: 100, opacity: 0, filter: 'blur(10px)' },
    visible: { y: 0, opacity: 1, filter: 'blur(0px)', transition: { duration: 1.5, ease: [0.16, 1, 0.3, 1] } }
  };

  const specVariants: Variants = {
    hidden: { y: 30, opacity: 0 },
    visible: (i: number) => ({ 
      y: 0, 
      opacity: 1, 
      transition: { delay: 0.8 + (i * 0.15), duration: 1, ease: [0.16, 1, 0.3, 1] } 
    })
  };

  return (
    <section 
      id={car.id}
      ref={containerRef}
      className="snap-section relative h-screen w-full flex flex-col items-center justify-between overflow-hidden"
    >
      {/* Background Media Layer */}
      <motion.div 
        style={{ y: yPos, scale }}
        className="absolute inset-0 z-0"
      >
        <motion.div style={{ opacity: overlayOpacity }} className="absolute inset-0 bg-black z-10" />
        <img 
          src={car.image} 
          alt={car.name} 
          className="w-full h-[140%] object-cover object-center"
        />
      </motion.div>

      {/* Top Text Layer */}
      <div className="relative z-20 pt-40 flex flex-col items-center w-full px-6">
        <motion.div 
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          variants={textVariants}
          className="text-center"
        >
          <h1 className="text-6xl md:text-[10rem] font-bold tracking-tighter text-white leading-none mb-4">
            {car.name}
          </h1>
          <p className="text-lg md:text-2xl font-light tracking-[0.4em] text-gray-300 uppercase">
            {car.tagline}
          </p>
        </motion.div>
      </div>

      {/* Bottom Interface Layer */}
      <motion.div 
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
        className="relative z-20 pb-20 w-full max-w-5xl px-8 flex flex-col items-center"
      >
        <div className="w-full grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-0 mb-16 items-center">
          {[
            { value: car.specs.range, label: 'Range (EPA est.)' },
            { value: car.specs.acceleration, label: '0-60 mph' },
            { value: car.specs.topSpeed, label: 'Top Speed' }
          ].map((spec, i) => (
            <motion.div 
              key={i} 
              custom={i}
              variants={specVariants}
              className="text-center group"
            >
              <div className="text-4xl md:text-5xl font-semibold mb-2 text-white group-hover:scale-110 transition-transform duration-700 ease-out">{spec.value}</div>
              <div className="text-[9px] md:text-xs uppercase tracking-[0.3em] font-bold text-gray-500 group-hover:text-white transition-colors duration-500">{spec.label}</div>
            </motion.div>
          ))}
        </div>

        {/* Interaction Bar */}
        <motion.div 
          variants={specVariants}
          custom={3}
          className="flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-6 w-full justify-center max-w-2xl"
        >
          <motion.button 
            whileHover={{ scale: 1.02, backgroundColor: '#ffffff' }}
            whileTap={{ scale: 0.98 }}
            className="bg-white/90 backdrop-blur-md text-black px-16 py-4 rounded-full text-[11px] font-bold uppercase tracking-[0.2em] transition-all w-full shadow-2xl"
          >
            Custom Order
          </motion.button>
          <motion.button 
            whileHover={{ scale: 1.02, backgroundColor: 'rgba(255,255,255,0.2)' }}
            whileTap={{ scale: 0.98 }}
            className="bg-black/20 backdrop-blur-2xl border border-white/20 text-white px-16 py-4 rounded-full text-[11px] font-bold uppercase tracking-[0.2em] transition-all w-full shadow-2xl"
          >
            Demo Drive
          </motion.button>
        </motion.div>

        {/* Indicator */}
        <motion.div 
          animate={{ y: [0, 8, 0], opacity: [0.3, 0.6, 0.3] }}
          transition={{ repeat: Infinity, duration: 2 }}
          className="mt-12 opacity-50"
        >
          <div className="w-px h-12 bg-gradient-to-b from-white to-transparent" />
        </motion.div>
      </motion.div>
    </section>
  );
};

export default CarSection;
