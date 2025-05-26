"use client";
import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import Slider from "./Slider";
import { menuItems, Theme } from "../premium-slider-data";

const textVariants = {
  hidden: {
    opacity: 0,
    y: 20,
  },
  visible: (custom: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.7,
      ease: "easeOut",
      delay: custom * 0.15,
    },
  }),
  exit: {
    opacity: 0,
    y: -20,
    transition: {
      duration: 0.5,
      ease: "easeIn",
    },
  },
};

type Props = {
  themeIndex: number;
  currentTheme: Theme;
  currentIndex: number;
  direction: number;
  progress: number;
  handleNext: () => void;
  handlePrev: () => void;
};
const MainContent = ({
  themeIndex,
  currentTheme,
  currentIndex,
  direction,
  progress,
  handleNext,
  handlePrev,
}: Props) => {
  const titleColor = currentTheme.color;
  return (
    <div className="relative flex flex-col items-center justify-center h-full z-30 px-4">
      <AnimatePresence mode="wait">
        <motion.div
          key={`title-${themeIndex}`}
          className="flex flex-col items-center lg:-mt-28 2xl:mt-0"
          initial="hidden"
          animate="visible"
          exit="exit"
          variants={textVariants}
          custom={0}
        >
          <motion.h2
            className="text-sm md:text-lg font-light tracking-[0.3em] md:tracking-[0.5em] uppercase mb-2"
            variants={textVariants}
            custom={1}
            style={{ color: titleColor }}
          >
            {currentTheme.subtitle}
          </motion.h2>
          <motion.h1
            className="text-3xl md:text-5xl lg:text-6xl font-[family-name:var(--font-manrope)] mb-8 md:mb-14 lg:mb-4 2xl:mb-14 tracking-wide text-center"
            variants={textVariants}
            custom={2}
          >
            {currentTheme.title}
          </motion.h1>
        </motion.div>
      </AnimatePresence>

      {/* Slider */}
      <Slider
        currentIndex={currentIndex}
        currentTheme={currentTheme}
        direction={direction}
        handleNext={handleNext}
        handlePrev={handlePrev}
        progress={progress}
      />
      {/* Item Details */}
      <AnimatePresence mode="wait">
        <motion.div
          key={`details-${currentIndex}`}
          className="text-center mt-8 md:mt-12 lg:mt-4 2xl:mt-12 flex flex-col items-center"
          initial="hidden"
          animate="visible"
          exit="exit"
          variants={textVariants}
          custom={0}
        >
          <motion.p
            className="text-lg md:text-xl font-[family-name:var(--font-manrope)] mb-1"
            variants={textVariants}
            custom={3}
          >
            {menuItems[currentIndex].title}
          </motion.p>
          <motion.p
            className="text-amber-300 mb-1 text-xs md:text-sm tracking-wide"
            variants={textVariants}
            custom={4}
          >
            {menuItems[currentIndex].category} · {menuItems[currentIndex].price}
          </motion.p>
          <motion.p
            className="text-gray-300 max-w-xs md:max-w-md mx-auto text-xs md:text-sm leading-relaxed mt-2"
            variants={textVariants}
            custom={5}
          >
            {menuItems[currentIndex].description}
          </motion.p>
        </motion.div>
      </AnimatePresence>

      {/* Season Description */}
      <AnimatePresence mode="wait">
        <motion.div
          key={`theme-desc-${themeIndex}`}
          className="absolute bottom-24 sm:bottom-36 max-w-xs sm:max-w-sm md:max-w-md mx-auto text-center px-4"
          initial="hidden"
          animate="visible"
          exit="exit"
          variants={textVariants}
          custom={0}
        >
          <p className="text-gray-300 text-xs md:text-sm leading-relaxed">
            {currentTheme.description}
          </p>
        </motion.div>
      </AnimatePresence>
    </div>
  );
};

export default MainContent;
