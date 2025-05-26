"use client";
import { motion } from "framer-motion";

const navVariants = {
  hidden: { opacity: 0, y: -20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2,
      duration: 0.6,
      ease: "easeOut",
    },
  },
};

const navItemVariants = {
  hidden: { opacity: 0, y: -20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: "easeOut",
    },
  },
};

type Props = {
  setIsMenuOpen: (e: boolean) => void;
  isMenuOpen: boolean;
};
const SliderNavigation = ({ isMenuOpen, setIsMenuOpen }: Props) => {
  return (
    <motion.nav
      className="absolute top-0 w-full flex justify-between items-center px-4 sm:px-6 md:px-10 py-4 md:py-6 z-50"
      initial="hidden"
      animate="visible"
      variants={navVariants}
    >
      <motion.button
        className="text-gray-300 hover:text-white transition-all duration-300 hover:scale-105 flex items-center gap-2 font-light tracking-wider text-xs md:text-sm"
        variants={navItemVariants}
      >
        <span className="w-4 md:w-6 h-[1px] bg-gray-300"></span>
        ABOUT
      </motion.button>

      <motion.div
        className="text-xl md:text-3xl tracking-widest flex flex-col sm:flex-row items-center gap-1 md:gap-2 opacity-90 hover:opacity-100 transition-opacity duration-300"
        variants={navItemVariants}
      >
        <span className="text-xs text-amber-400 hidden sm:inline">●</span>
        <span className="font-light">PLATES OF</span>
        <span className="text-xs text-amber-400 hidden sm:inline">●</span>
        <span className="font-semibold tracking-widest">PERFECTION</span>
      </motion.div>

      <div className="flex gap-2 sm:gap-4 md:gap-8">
        <motion.button
          className="text-gray-300 hover:text-white transition-all duration-300 hover:scale-105 font-light tracking-wider text-xs md:text-sm"
          variants={navItemVariants}
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          MENU
        </motion.button>
        <motion.button
          className="text-gray-300 hover:text-white transition-all duration-300 hover:scale-105 font-light tracking-wider text-xs md:text-sm hidden sm:block"
          variants={navItemVariants}
        >
          CATERING
        </motion.button>
        <motion.button
          className="text-gray-300 hover:text-white transition-all duration-300 hover:scale-105 font-light tracking-wider text-xs md:text-sm"
          variants={navItemVariants}
        >
          CONTACT
        </motion.button>
      </div>
    </motion.nav>
  );
};

export default SliderNavigation;
