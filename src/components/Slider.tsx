// components/PremiumSlider.tsx

"use client";

import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { motion, AnimatePresence, useAnimation } from "framer-motion";
import { ChevronLeft, ChevronRight, Calendar, Clock } from "lucide-react";
import { menuItems, themes } from "./premium-slider-data";

const PremiumSlider: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [themeIndex, setThemeIndex] = useState(0);
  const [progress, setProgress] = useState(0);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isAutoSliding, setIsAutoSliding] = useState(true);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const autoSlideInterval = 6000;
  const progressRef = useRef<NodeJS.Timeout | null>(null);
  const themeControls = useAnimation();
  const backgroundRef = useRef<HTMLDivElement>(null);

  const currentTheme = themes[themeIndex];
  const bgAnimationDuration = 1.5;

  useEffect(() => {
    if (isAutoSliding) {
      startProgressTimer();
    } else {
      if (progressRef.current) clearInterval(progressRef.current);
    }

    return () => {
      if (progressRef.current) clearInterval(progressRef.current);
    };
  }, [isAutoSliding, currentIndex, themeIndex]);

  const startProgressTimer = () => {
    if (progressRef.current) clearInterval(progressRef.current);
    setProgress(0);

    progressRef.current = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          handleNext();
          return 0;
        }
        return prev + 100 / (autoSlideInterval / 100);
      });
    }, 100);
  };

  const handleNext = () => {
    if (isTransitioning) return;
    setIsTransitioning(true);

    const nextIndex = (currentIndex + 1) % menuItems.length;
    setCurrentIndex(nextIndex);
    setProgress(0);

    // Change theme every full cycle through menu items
    if (nextIndex === 0) {
      setThemeIndex((prevTheme) => (prevTheme + 1) % themes.length);
    }

    setTimeout(() => setIsTransitioning(false), 800);
  };

  const handlePrev = () => {
    if (isTransitioning) return;
    setIsTransitioning(true);

    setCurrentIndex(
      (prevIndex) => (prevIndex - 1 + menuItems.length) % menuItems.length
    );
    setProgress(0);

    setTimeout(() => setIsTransitioning(false), 800);
  };

  useEffect(() => {
    themeControls.start({
      opacity: [0.3, 1],
      scale: [1.05, 1],
      transition: { duration: bgAnimationDuration, ease: [0.16, 1, 0.3, 1] },
    });
  }, [themeIndex, themeControls]);

  const toggleAutoSlide = () => {
    setIsAutoSliding(!isAutoSliding);
  };

  // Animation variants
  const slideVariants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 300 : -300,
      y: direction > 0 ? 50 : -50,
      scale: 0.7,
      opacity: 0,
      filter: "blur(8px)",
    }),
    center: {
      x: 0,
      y: 0,
      scale: 1,
      opacity: 1,
      filter: "blur(0px)",
      transition: {
        duration: 0.8,
        ease: [0.16, 1, 0.3, 1],
        opacity: { duration: 0.6 },
      },
    },
    exit: (direction: number) => ({
      x: direction < 0 ? 300 : -300,
      y: direction < 0 ? 50 : -50,
      scale: 0.7,
      opacity: 0,
      filter: "blur(8px)",
      transition: {
        duration: 0.8,
        ease: [0.16, 1, 0.3, 1],
        opacity: { duration: 0.4 },
      },
    }),
  };

  const secondarySlideVariants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 200 : -200,
      scale: 0.6,
      opacity: 0,
      filter: "blur(3px)",
    }),
    center: {
      x: 0,
      scale: 0.8,
      opacity: 0.7,
      filter: "blur(0px)",
      transition: {
        duration: 0.9,
        ease: [0.16, 1, 0.3, 1],
        opacity: { duration: 0.7 },
      },
    },
    exit: (direction: number) => ({
      x: direction < 0 ? 200 : -200,
      scale: 0.6,
      opacity: 0,
      filter: "blur(3px)",
      transition: {
        duration: 0.9,
        ease: [0.16, 1, 0.3, 1],
        opacity: { duration: 0.5 },
      },
    }),
  };

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

  const circleVariants = {
    animate: {
      strokeDasharray: `${progress * 2.51}, 251`,
      transition: { duration: 0.1, ease: "linear" },
    },
  };

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

  const getPrevIndex = (index: number): number =>
    (index - 1 + menuItems.length) % menuItems.length;

  const getNextIndex = (index: number): number =>
    (index + 1) % menuItems.length;

  // Dynamic styles based on current theme
  const progressColor = currentTheme.secondaryColor;
  const titleColor = currentTheme.color;

  return (
    <div className="relative w-full h-screen overflow-hidden text-white font-[family-name:var(--font-urbanist)]">
      {/* Background with animated transitions */}
      <motion.div
        ref={backgroundRef}
        className="absolute inset-0 z-0"
        key={`bg-${themeIndex}`}
        animate={themeControls}
      >
        <div className="absolute inset-0 bg-black/60 z-10" />
        <Image
          src={currentTheme.backgroundImage}
          alt="Restaurant ambient background"
          layout="fill"
          objectFit="cover"
          className="z-0 transition-opacity duration-1000"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-black/60 z-20" />
      </motion.div>
      {/* Texture overlay for premium feel */}
      <div className="absolute inset-0 bg-[url('/assets/noise-texture.png')] opacity-5 z-10 pointer-events-none" />
      {/* Navigation */}
      <motion.nav
        className="absolute top-0 w-full flex justify-between items-center px-10 py-6 z-50"
        initial="hidden"
        animate="visible"
        variants={navVariants}
      >
        <motion.button
          className="text-gray-300 hover:text-white transition-all duration-300 hover:scale-105 flex items-center gap-2 font-light tracking-wider"
          variants={navItemVariants}
        >
          <span className="w-6 h-[1px] bg-gray-300"></span>
          ABOUT
        </motion.button>

        <motion.div
          className="text-3xl  tracking-widest flex items-center gap-2 opacity-90 hover:opacity-100 transition-opacity duration-300"
          variants={navItemVariants}
        >
          <span className="text-sm text-amber-400">●</span>
          <span className="font-light">PLATES OF</span>
          <span className="text-sm text-amber-400">●</span>
          <br />
          <span className="font-semibold tracking-widest">PERFECTION</span>
        </motion.div>

        <div className="flex gap-8">
          <motion.button
            className="text-gray-300 hover:text-white transition-all duration-300 hover:scale-105 font-light tracking-wider"
            variants={navItemVariants}
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            MENU
          </motion.button>
          <motion.button
            className="text-gray-300 hover:text-white transition-all duration-300 hover:scale-105 font-light tracking-wider"
            variants={navItemVariants}
          >
            CATERING
          </motion.button>
          <motion.button
            className="text-gray-300 hover:text-white transition-all duration-300 hover:scale-105 font-light tracking-wider"
            variants={navItemVariants}
          >
            CONTACT
          </motion.button>
        </div>
      </motion.nav>
      {/* Side date/time indicator */}
      <motion.div
        className="absolute left-5 top-1/2 -translate-y-1/2 flex flex-col items-center gap-1 z-40"
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 1, duration: 0.8 }}
      >
        <div className="text-xs tracking-widest">
          {new Date().getFullYear()}
        </div>
        <div className="h-6 w-[1px] bg-gray-400/30"></div>
        <div
          className="text-xs tracking-widest rotate-180"
          style={{ writingMode: "vertical-rl" }}
        >
          SEASONAL MENU
        </div>
      </motion.div>
      {/* Main Content */}
      <div className="relative flex flex-col items-center justify-center h-full z-30">
        <AnimatePresence mode="wait">
          <motion.div
            key={`title-${themeIndex}`}
            className="flex flex-col items-center"
            initial="hidden"
            animate="visible"
            exit="exit"
            variants={textVariants}
            custom={0}
          >
            <motion.h2
              className="text-lg font-light tracking-[0.5em] uppercase mb-2"
              variants={textVariants}
              custom={1}
              style={{ color: titleColor }}
            >
              {currentTheme.subtitle}
            </motion.h2>
            <motion.h1
              className="text-6xl font-serif mb-14 tracking-wide"
              variants={textVariants}
              custom={2}
            >
              {currentTheme.title}
            </motion.h1>
          </motion.div>
        </AnimatePresence>

        {/* Slider */}
        <div className="flex items-center gap-12">
          {/* Previous Item */}
          <AnimatePresence initial={false} custom={1}>
            <motion.div
              key={`prev-${currentIndex}`}
              custom={1}
              variants={secondarySlideVariants}
              initial="enter"
              animate="center"
              exit="exit"
              className="relative w-48 h-48 flex-shrink-0"
            >
              <div className="absolute inset-0 rounded-full border border-gray-400/20"></div>
              <Image
                src={menuItems[getPrevIndex(currentIndex)].image}
                alt={menuItems[getPrevIndex(currentIndex)].alt}
                width={192}
                height={192}
                className="rounded-full object-cover opacity-70 hover:opacity-90 transition duration-500 cursor-pointer"
                onClick={handlePrev}
              />
            </motion.div>
          </AnimatePresence>

          {/* Middle Item with Circular Progress */}
          <div className="relative w-72 h-72 flex-shrink-0">
            {/* Outer decorative rings */}
            <div className="absolute inset-0 rounded-full border-2 border-gray-400/10"></div>
            <div className="absolute inset-2 rounded-full border border-gray-400/15"></div>

            {/* Progress circle */}
            <svg
              className="absolute inset-0 w-full h-full"
              viewBox="0 0 100 100"
              style={{ transform: "rotate(-90deg)" }}
            >
              <circle
                cx="50"
                cy="50"
                r="45"
                fill="none"
                stroke="#f1c40f20"
                strokeWidth="1"
                className="opacity-50"
              />
              <motion.circle
                cx="50"
                cy="50"
                r="45"
                fill="none"
                stroke={progressColor}
                strokeWidth="1.5"
                strokeDasharray="0, 283"
                variants={circleVariants}
                animate="animate"
              />
            </svg>

            {/* Main image with animation */}
            <AnimatePresence initial={false} custom={1} mode="wait">
              <motion.div
                key={`main-${currentIndex}`}
                custom={1}
                variants={slideVariants}
                initial="enter"
                animate="center"
                exit="exit"
                className="relative w-full h-full"
              >
                <Image
                  src={menuItems[currentIndex].image}
                  alt={menuItems[currentIndex].alt}
                  width={288}
                  height={288}
                  className="rounded-full object-cover hover:scale-105 transition-transform duration-700 shadow-lg shadow-black/20"
                />
              </motion.div>
            </AnimatePresence>

            {/* Pulsing dot on progress circle */}
            <motion.div
              className="absolute w-3 h-3 rounded-full bg-amber-400"
              style={{
                top: "50%",
                left: "50%",
                transform: `rotate(${
                  progress * 3.6
                }deg) translateX(146px) translateY(-50%)`,
              }}
              animate={{
                scale: [1, 1.2, 1],
                opacity: [0.7, 1, 0.7],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />
          </div>

          {/* Next Item */}
          <AnimatePresence initial={false} custom={-1}>
            <motion.div
              key={`next-${currentIndex}`}
              custom={-1}
              variants={secondarySlideVariants}
              initial="enter"
              animate="center"
              exit="exit"
              className="relative w-48 h-48 flex-shrink-0"
            >
              <div className="absolute inset-0 rounded-full border border-gray-400/20"></div>
              <Image
                src={menuItems[getNextIndex(currentIndex)].image}
                alt={menuItems[getNextIndex(currentIndex)].alt}
                width={192}
                height={192}
                className="rounded-full object-cover opacity-70 hover:opacity-90 transition duration-500 cursor-pointer"
                onClick={handleNext}
              />
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Item Details */}
        <AnimatePresence mode="wait">
          <motion.div
            key={`details-${currentIndex}`}
            className="text-center mt-12 flex flex-col items-center"
            initial="hidden"
            animate="visible"
            exit="exit"
            variants={textVariants}
            custom={0}
          >
            <motion.p
              className="text-xl font-serif mb-1"
              variants={textVariants}
              custom={3}
            >
              {menuItems[currentIndex].title}
            </motion.p>
            <motion.p
              className="text-amber-300 mb-1 text-sm tracking-wide"
              variants={textVariants}
              custom={4}
            >
              {menuItems[currentIndex].category} ·{" "}
              {menuItems[currentIndex].price}
            </motion.p>
            <motion.p
              className="text-gray-300 max-w-md mx-auto text-sm leading-relaxed mt-2"
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
            className="absolute bottom-36 max-w-md mx-auto text-center"
            initial="hidden"
            animate="visible"
            exit="exit"
            variants={textVariants}
            custom={0}
          >
            <p className="text-gray-300 text-sm leading-relaxed">
              {currentTheme.description}
            </p>
          </motion.div>
        </AnimatePresence>
      </div>
      {/* Navigation Arrows and CTA */}
      <div className="absolute bottom-14 w-full flex justify-center items-center gap-6 z-40">
        <motion.button
          onClick={handlePrev}
          className="p-3 rounded-full bg-black/20 backdrop-blur-sm border border-white/10 hover:bg-black/40 transition-all duration-300 hover:scale-110"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
        >
          <ChevronLeft className="w-5 h-5 text-white" />
        </motion.button>

        <motion.button
          className="px-8 py-3 bg-transparent border-2 border-amber-400 text-white font-light tracking-widest rounded-full hover:bg-amber-400/10 transition-all duration-300 group flex items-center gap-3"
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.98 }}
        >
          <span>BOOK A TABLE</span>
          <Calendar className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-all duration-300 -translate-x-4 group-hover:translate-x-0" />
        </motion.button>

        <motion.button
          onClick={handleNext}
          className="p-3 rounded-full bg-black/20 backdrop-blur-sm border border-white/10 hover:bg-black/40 transition-all duration-300 hover:scale-110"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
        >
          <ChevronRight className="w-5 h-5 text-white" />
        </motion.button>
      </div>
      {/* Play/Pause control */}
      <motion.button
        onClick={toggleAutoSlide}
        className="absolute bottom-16 right-10 z-40 p-2 rounded-full bg-black/20 backdrop-blur-sm border border-white/10 hover:bg-black/40 transition-all duration-300"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1, duration: 0.8 }}
      >
        {isAutoSliding ? (
          <div className="w-6 h-6 flex items-center justify-center">
            <div className="w-1 h-3 bg-white mx-[1px]"></div>
            <div className="w-1 h-3 bg-white mx-[1px]"></div>
          </div>
        ) : (
          <Clock className="w-5 h-5 text-white" />
        )}
      </motion.button>
      {/* Fullscreen Menu Overlay */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            className="fixed inset-0 bg-black/90 backdrop-blur-md z-50 flex flex-col items-center justify-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
          >
            <motion.button
              className="absolute top-8 right-10 text-white text-3xl"
              onClick={() => setIsMenuOpen(false)}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              ×
            </motion.button>

            <motion.h2
              className="text-2xl font-serif mb-10 tracking-widest text-amber-400"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              OUR SEASONAL OFFERINGS
            </motion.h2>

            <div className="grid grid-cols-2 gap-12 max-w-4xl mx-auto">
              {menuItems.map((item, index) => (
                <motion.div
                  key={item.id}
                  className="flex gap-5 items-center"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 * index + 0.3 }}
                  whileHover={{ x: 10 }}
                >
                  <div className="relative w-16 h-16">
                    <Image
                      src={item.image}
                      alt={item.alt}
                      width={64}
                      height={64}
                      className="rounded-full object-cover"
                    />
                  </div>
                  <div>
                    <h3 className="text-lg font-medium">{item.title}</h3>
                    <p className="text-sm text-gray-400">{item.description}</p>
                    <p className="text-amber-400 text-sm mt-1">{item.price}</p>
                  </div>
                </motion.div>
              ))}
            </div>

            <motion.button
              className="mt-16 px-6 py-3 border border-white/20 text-white hover:bg-white/5 transition"
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
      {/* Social media links */}
      <div className="absolute bottom-16 right-10 z-30 flex flex-col gap-4">
        <motion.a
          href="#"
          className="w-6 h-6 flex items-center justify-center text-gray-400 hover:text-white transition"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.2 }}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
            <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
            <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
          </svg>
        </motion.a>
        <motion.a
          href="#"
          className="w-6 h-6 flex items-center justify-center text-gray-400 hover:text-white transition"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.3 }}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path>
          </svg>
        </motion.a>
      </div>
      {/* Season indicator dots */}

      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-3 z-30">
        {themes.map((theme, idx) => (
          <motion.button
            key={theme.id}
            className={`w-2 h-2 rounded-full ${
              idx === themeIndex ? "bg-amber-400" : "bg-gray-500/50"
            }`}
            onClick={() => {
              setThemeIndex(idx);
              setCurrentIndex(0);
              setProgress(0);
            }}
            whileHover={{ scale: 1.5 }}
            whileTap={{ scale: 0.9 }}
            animate={{
              scale: idx === themeIndex ? [1, 1.2, 1] : 1,
            }}
            transition={{
              duration: idx === themeIndex ? 2 : 0.3,
              repeat: idx === themeIndex ? Infinity : 0,
              ease: "easeInOut",
            }}
          />
        ))}
      </div>
      {/* Theme description indicator */}
      <div className="absolute bottom-6 right-10 flex items-center gap-2 text-xs text-gray-400 z-30">
        <motion.div
          className="w-4 h-[1px] bg-gray-500"
          initial={{ width: 0 }}
          animate={{ width: 16 }}
          transition={{ delay: 1.4, duration: 0.5 }}
        />
        <motion.span
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.7 }}
          transition={{ delay: 1.5, duration: 0.5 }}
        >
          {themeIndex + 1}/{themes.length}
        </motion.span>
      </div>
      {/* Accessibility indicators for keyboard navigation */}
      <div className="sr-only">
        <button onClick={handlePrev}>Previous item</button>
        <button onClick={handleNext}>Next item</button>
        <button onClick={toggleAutoSlide}>
          {isAutoSliding
            ? "Pause automatic slideshow"
            : "Resume automatic slideshow"}
        </button>
      </div>
    </div>
  );
};

export default PremiumSlider;
