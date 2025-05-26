"use client";
import React from "react";
import { motion } from "framer-motion";
import { Calendar, ChevronLeft, ChevronRight } from "lucide-react";

type Props = {
  handlePrev: () => void;
  handleNext: () => void;
};
const NavigationArrows = ({ handleNext, handlePrev }: Props) => {
  return (
    <div className="absolute bottom-10 md:bottom-14 w-full flex justify-center items-center gap-4 md:gap-6 z-40">
      <motion.button
        onClick={handlePrev}
        className="p-2 md:p-3 rounded-full bg-black/20 backdrop-blur-sm border border-white/10 hover:bg-black/40 transition-all duration-300 hover:scale-110"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
      >
        <ChevronLeft className="w-4 h-4 md:w-5 md:h-5 text-white" />
      </motion.button>

      <motion.button
        className="px-4 sm:px-6 md:px-8 py-2 md:py-3 bg-transparent border-2 border-amber-400 text-white text-xs md:text-sm font-light tracking-widest rounded-full hover:bg-amber-400/10 transition-all duration-300 group flex items-center gap-2 md:gap-3"
        whileHover={{ scale: 1.03 }}
        whileTap={{ scale: 0.98 }}
      >
        <span>BOOK A TABLE</span>
        <Calendar className="w-3 h-3 md:w-4 md:h-4 opacity-0 group-hover:opacity-100 transition-all duration-300 -translate-x-4 group-hover:translate-x-0" />
      </motion.button>

      <motion.button
        onClick={handleNext}
        className="p-2 md:p-3 rounded-full bg-black/20 backdrop-blur-sm border border-white/10 hover:bg-black/40 transition-all duration-300 hover:scale-110"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
      >
        <ChevronRight className="w-4 h-4 md:w-5 md:h-5 text-white" />
      </motion.button>
    </div>
  );
};

export default NavigationArrows;
