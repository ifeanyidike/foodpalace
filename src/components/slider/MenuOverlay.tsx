"use client";
import React from "react";
import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";
import { menuItems } from "../premium-slider-data";

type Props = {
  isMenuOpen: boolean;
  setIsMenuOpen: (e: boolean) => void;
};
const MenuOverlay = ({ isMenuOpen, setIsMenuOpen }: Props) => {
  return (
    <AnimatePresence>
      {isMenuOpen && (
        <motion.div
          className="fixed inset-0 bg-black/95 backdrop-blur-lg z-50 flex flex-col items-center justify-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.4 }}
        >
          <motion.button
            className="absolute top-4 md:top-8 right-4 md:right-10 text-white text-3xl"
            onClick={() => setIsMenuOpen(false)}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            ×
          </motion.button>

          <motion.h2
            className="text-xl md:text-2xl font-[family-name:var(--font-manrope)] mb-6 md:mb-10 tracking-widest text-amber-400"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            OUR SEASONAL OFFERINGS
          </motion.h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 md:gap-12 max-w-4xl mx-auto px-4 md:px-0 overflow-y-auto max-h-[70vh]">
            {menuItems.map((item, index) => (
              <motion.div
                key={item.id}
                className="flex gap-3 md:gap-5 items-center"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 * index + 0.3 }}
                whileHover={{ x: 10 }}
              >
                <div className="relative w-12 h-12 md:w-16 md:h-16 flex-shrink-0">
                  <Image
                    src={item.image}
                    alt={item.alt}
                    width={64}
                    height={64}
                    className="rounded-full object-cover"
                  />
                </div>
                <div>
                  <h3 className="text-base md:text-lg font-medium">
                    {item.title}
                  </h3>
                  <p className="text-xs md:text-sm text-gray-400">
                    {item.description}
                  </p>
                  <p className="text-amber-400 text-xs md:text-sm mt-1">
                    {item.price}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>

          <motion.button
            className="mt-8 md:mt-16 px-4 md:px-6 py-2 md:py-3 border border-white/20 text-white hover:bg-white/5 transition text-sm md:text-base"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            VIEW FULL MENU
          </motion.button>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default MenuOverlay;
