
import React from 'react';
import { motion } from 'framer-motion';

const Navbar: React.FC = () => {
  const navItems = ['Model Alpha', 'Model Sigma', 'Model Zenith', 'Inventory'];
  
  return (
    <motion.nav 
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
      className="fixed top-0 left-0 w-full z-50 px-8 py-6 flex items-center justify-between"
    >
      <motion.div 
        whileHover={{ scale: 1.05 }}
        className="text-2xl font-bold tracking-[0.4em] uppercase cursor-pointer"
      >
        LuxeDrive
      </motion.div>
      
      <div className="hidden md:flex space-x-10 text-[11px] font-semibold uppercase tracking-[0.2em]">
        {navItems.map((item, i) => (
          <motion.a 
            key={item}
            href={`#${item.toLowerCase().replace(' ', '-')}`}
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 + (i * 0.1), duration: 0.8 }}
            whileHover={{ y: -2, opacity: 0.6 }}
            className="transition-all relative group"
          >
            {item}
            <span className="absolute bottom-[-4px] left-0 w-0 h-[1px] bg-white transition-all group-hover:w-full" />
          </motion.a>
        ))}
      </div>

      <div className="flex space-x-8 text-[11px] font-semibold uppercase tracking-[0.2em]">
        <motion.a 
          whileHover={{ opacity: 0.6 }}
          href="#shop" 
          className="hover:opacity-60 transition-opacity"
        >
          Shop
        </motion.a>
        <motion.a 
          whileHover={{ opacity: 0.6 }}
          href="#account" 
          className="hover:opacity-60 transition-opacity"
        >
          Account
        </motion.a>
        <button className="md:hidden">Menu</button>
      </div>
    </motion.nav>
  );
};

export default Navbar;
