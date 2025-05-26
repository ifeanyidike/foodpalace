"use client";
import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { menuItems, Theme } from "../premium-slider-data";
import Image from "next/image";
import { OrbitalRings, ShockwaveEffect } from "../premium-slider-components";

// Secondary slides with spiral entry/exit and 3D perspective
const secondarySlideVariants = {
  enter: (direction: number) => ({
    x: direction > 0 ? "25vw" : "-25vw",
    y: direction > 0 ? "-10vh" : "10vh",
    scale: 0.5,
    opacity: 0,
    filter: "blur(12px) saturate(0.8)",
    rotateZ: direction > 0 ? -15 : 15,
    rotateY: direction > 0 ? 40 : -40,
  }),
  center: {
    x: 0,
    y: 0,
    scale: 0.8,
    opacity: 0.85,
    filter: "blur(0px) saturate(1.1)",
    rotateZ: 0,
    rotateY: 0,
    transition: {
      duration: 1.2,
      ease: [0.16, 1, 0.3, 1],
      opacity: { duration: 0.8 },
      rotateZ: { duration: 1.3, ease: [0.34, 1.56, 0.64, 1] },
      rotateY: { duration: 1.4, ease: [0.34, 1.56, 0.64, 1] },
    },
  },
  exit: (direction: number) => ({
    x: direction < 0 ? "25vw" : "-25vw",
    y: direction < 0 ? "-10vh" : "10vh",
    scale: 0.5,
    opacity: 0,
    filter: "blur(12px) saturate(0.8)",
    rotateZ: direction < 0 ? 15 : -15,
    rotateY: direction < 0 ? -40 : 40,
    transition: {
      duration: 1.2,
      ease: [0.16, 1, 0.3, 1],
      opacity: { duration: 0.6 },
      rotateZ: { duration: 1.1, ease: [0.34, 1.56, 0.64, 1] },
      rotateY: { duration: 1.2, ease: [0.34, 1.56, 0.64, 1] },
    },
  }),
  hover: {
    scale: 0.9,
    opacity: 0.95,
    filter: "blur(0px) saturate(1.5)",
    transition: { duration: 0.4 },
  },
};

// RADICALLY enhanced main slide transitions with a dramatic portal-like effect
const slideVariants = {
  enter: (direction: number) => ({
    scale: direction > 0 ? 2.5 : 0.15,
    opacity: 0,
    filter: "blur(20px) saturate(0.3) contrast(0.8)",
    rotateY: direction > 0 ? 60 : -60,
    rotateX: direction > 0 ? 40 : -40,
    rotateZ: direction > 0 ? 30 : -30,
    y: direction > 0 ? 100 : -100,
    transition: {
      duration: 0,
    },
  }),
  center: {
    scale: 1,
    opacity: 1,
    filter: "blur(0px) saturate(1.2) contrast(1)",
    rotateY: 0,
    rotateX: 0,
    rotateZ: 0,
    y: 0,
    transition: {
      duration: 1.4,
      opacity: { duration: 0.8 },
      scale: {
        duration: 1.6,
        ease: [0.19, 1.4, 0.38, 1], // Elastic-like effect
      },
      filter: { duration: 1.2 },
      rotateY: { duration: 1.4, ease: [0.34, 1.56, 0.64, 1] },
      rotateX: { duration: 1.3, ease: [0.34, 1.56, 0.64, 1] },
      rotateZ: { duration: 1.5, ease: [0.34, 1.56, 0.64, 1] },
    },
  },
  exit: (direction: number) => ({
    scale: direction < 0 ? 2.5 : 0.15,
    opacity: 0,
    filter: "blur(20px) saturate(0.3) contrast(0.8)",
    rotateY: direction < 0 ? -60 : 60,
    rotateX: direction < 0 ? -40 : 40,
    rotateZ: direction < 0 ? -30 : 30,
    y: direction < 0 ? -100 : 100,
    transition: {
      duration: 1.1,
      ease: [0.43, 0.13, 0.23, 0.96], // Custom easing
      opacity: { duration: 0.6 },
      scale: { duration: 1.1 },
      rotateY: { duration: 1.0 },
      rotateX: { duration: 0.9 },
      rotateZ: { duration: 1.0 },
    },
  }),
  hover: {
    scale: 1.05,
    filter: "blur(0px) saturate(1.4) brightness(1.05)",
    transition: { duration: 0.4 },
  },
};

type Props = {
  progress: number;
  direction: number;
  currentTheme: Theme;
  currentIndex: number;
  handlePrev: () => void;
  handleNext: () => void;
};

const Slider = ({
  progress,
  direction,
  currentTheme,
  currentIndex,
  handlePrev,
  handleNext,
}: Props) => {
  // State to trigger shockwave effect
  const [showShockwave, setShowShockwave] = React.useState(false);

  // Trigger shockwave effect when slide changes
  React.useEffect(() => {
    setShowShockwave(true);
    const timer = setTimeout(() => setShowShockwave(false), 1200);
    return () => clearTimeout(timer);
  }, [currentIndex]);

  // Modified circle variants to ensure the progress is always visible
  const circleVariants = {
    animate: {
      strokeDasharray: `${progress * 3}, 300`,
      strokeDashoffset: 0,
      opacity: 1,
      transition: { duration: 0.1, ease: "linear" },
    },
  };

  const getPrevIndex = (index: number): number =>
    (index - 1 + menuItems.length) % menuItems.length;

  const getNextIndex = (index: number): number =>
    (index + 1) % menuItems.length;

  const progressColor = currentTheme.secondaryColor;
  const accentColor = currentTheme.color;

  // Calculate the circumference of the circle (2πr)
  const circumference = 2 * Math.PI * 45;

  return (
    <div className="flex items-center gap-4 md:gap-8 lg:gap-12">
      {/* Previous Item */}
      <AnimatePresence initial={false} custom={1}>
        <motion.div
          key={`prev-${currentIndex}`}
          custom={1}
          variants={secondarySlideVariants}
          initial="enter"
          animate="center"
          exit="exit"
          whileHover="hover"
          className="relative w-24 h-24 sm:w-36 sm:h-36 md:w-48 md:h-48 flex-shrink-0 hidden sm:block perspective"
          style={{ perspective: "1000px" }}
        >
          <div className="absolute inset-0 rounded-full border border-gray-400/20"></div>
          <div
            className="absolute inset-0 rounded-full"
            style={{
              background: `linear-gradient(135deg, transparent 0%, ${currentTheme.color}40 100%)`,
              opacity: 0.7,
            }}
          ></div>
          <Image
            src={menuItems[getPrevIndex(currentIndex)].image}
            alt={menuItems[getPrevIndex(currentIndex)].alt}
            width={192}
            height={192}
            className="rounded-full object-cover transition duration-500 cursor-pointer"
            onClick={handlePrev}
          />
          <motion.div
            className="absolute -inset-1 rounded-full opacity-50"
            style={{
              background: `radial-gradient(ellipse at center, ${currentTheme.secondaryColor}40 0%, transparent 70%)`,
            }}
            animate={{
              opacity: [0.3, 0.6, 0.3],
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        </motion.div>
      </AnimatePresence>

      {/* Main Item with Enhanced Circular Progress */}
      <div
        className="relative w-56 h-56 sm:w-64 sm:h-64 md:w-72 md:h-72 flex-shrink-0 perspective"
        style={{ perspective: "1200px" }}
      >
        {/* Dynamic orbital rings */}
        <OrbitalRings theme={currentTheme} />

        {/* Shockwave effect on transition */}
        <ShockwaveEffect isActive={showShockwave} theme={currentTheme} />

        {/* Enhanced progress circle with glow effect - now larger and positioned outside */}
        <svg
          className="absolute inset-0 w-full h-full"
          viewBox="0 0 100 100"
          style={{
            transform: "rotate(-90deg)",
            width: "calc(100% + 20px)",
            height: "calc(100% + 20px)",
            top: "-10px",
            left: "-10px",
          }}
        >
          {/* Base track with subtle gradient */}
          <defs>
            <linearGradient
              id="progressTrackGradient"
              x1="0%"
              y1="0%"
              x2="100%"
              y2="100%"
            >
              <stop offset="0%" stopColor={`${accentColor}30`} />
              <stop offset="100%" stopColor={`${progressColor}20`} />
            </linearGradient>

            <linearGradient
              id="progressGradient"
              x1="0%"
              y1="0%"
              x2="100%"
              y2="100%"
            >
              <stop offset="0%" stopColor={accentColor} />
              <stop offset="100%" stopColor={progressColor} />
            </linearGradient>

            <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
              <feGaussianBlur stdDeviation="2" result="blur" />
              <feComposite in="SourceGraphic" in2="blur" operator="over" />
            </filter>
          </defs>

          {/* Track circle - always visible */}
          <circle
            cx="50"
            cy="50"
            r="48"
            fill="none"
            stroke="url(#progressTrackGradient)"
            strokeWidth="1.5"
            className="opacity-60"
          />

          {/* Progress circle - now always visible and slightly larger */}
          <motion.circle
            cx="50"
            cy="50"
            r="48"
            fill="none"
            stroke="url(#progressGradient)"
            strokeWidth="2"
            strokeLinecap="round"
            variants={circleVariants}
            initial={{ strokeDasharray: `0, ${circumference}`, opacity: 1 }}
            animate="animate"
            filter="url(#glow)"
          />
        </svg>

        {/* Main Image with RADICAL Animation */}
        <AnimatePresence initial={false} custom={direction} mode="wait">
          <motion.div
            key={`main-${currentIndex}`}
            custom={direction}
            variants={slideVariants}
            initial="enter"
            animate="center"
            exit="exit"
            whileHover="hover"
            className="relative w-full h-full preserve-3d z-0"
            style={{ transformStyle: "preserve-3d" }}
          >
            {/* Vortex background effect during transitions */}
            <motion.div
              className="absolute inset-0 rounded-full overflow-hidden"
              initial={{ opacity: 0 }}
              animate={{
                opacity: showShockwave ? [0, 1, 0] : 0,
              }}
              transition={{ duration: 1.2, times: [0, 0.3, 1] }}
            >
              <motion.div
                className="absolute inset-0"
                style={{
                  background: `conic-gradient(from 0deg, ${currentTheme.color}00, ${currentTheme.secondaryColor}, ${currentTheme.color}00)`,
                }}
                animate={{ rotate: [0, 360] }}
                transition={{ duration: 1.2, ease: "easeOut" }}
              />
            </motion.div>

            <div
              className="absolute inset-0 rounded-full"
              style={{
                background: `radial-gradient(circle at center, ${currentTheme.color}30 0%, transparent 70%)`,
                mixBlendMode: "overlay",
              }}
            ></div>

            <Image
              src={menuItems[currentIndex].image}
              alt={menuItems[currentIndex].alt}
              width={288}
              height={288}
              className="rounded-full object-cover transition-all duration-700 shadow-lg"
              style={{
                boxShadow: `0 10px 40px -10px ${currentTheme.secondaryColor}80`,
              }}
            />

            {/* Animated radial mask that reveals the image */}
            <motion.div
              className="absolute inset-0 rounded-full"
              initial={{ opacity: 1 }}
              animate={{
                opacity: showShockwave ? [1, 0] : 0,
                scale: showShockwave ? [0, 2] : 1,
              }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              style={{
                background: `radial-gradient(circle at center, transparent 30%, black 70%)`,
              }}
            />

            {/* Animated gradient overlay */}
            <motion.div
              className="absolute inset-0 rounded-full opacity-40"
              style={{
                background: `linear-gradient(135deg, transparent 0%, ${currentTheme.color}90 200%)`,
              }}
              animate={{
                background: [
                  `linear-gradient(135deg, transparent 0%, ${currentTheme.color}90 200%)`,
                  `linear-gradient(225deg, transparent 0%, ${currentTheme.secondaryColor}90 200%)`,
                  `linear-gradient(315deg, transparent 0%, ${currentTheme.color}90 200%)`,
                  `linear-gradient(45deg, transparent 0%, ${currentTheme.secondaryColor}90 200%)`,
                  `linear-gradient(135deg, transparent 0%, ${currentTheme.color}90 200%)`,
                ],
              }}
              transition={{
                duration: 8,
                repeat: Infinity,
                ease: "linear",
              }}
            />

            {/* Flash effect on transition */}
            <motion.div
              className="absolute inset-0 rounded-full bg-white"
              initial={{ opacity: 0 }}
              animate={{
                opacity: showShockwave ? [0, 0.7, 0] : 0,
              }}
              transition={{ duration: 0.8, times: [0, 0.1, 1] }}
              style={{ mixBlendMode: "overlay" }}
            />
          </motion.div>
        </AnimatePresence>

        {/* Enhanced pulsing dot on progress circle */}
        <motion.div
          className="absolute w-3 h-3 md:w-4 md:h-4 rounded-full"
          style={{
            backgroundColor: progressColor,
            boxShadow: `0 0 12px 3px ${progressColor}`,
            top: "50%",
            left: "50%",
            transform: `rotate(${
              progress * 3.6
            }deg) translateX(146px) translateY(-50%)`,
          }}
          animate={{
            scale: [1, 1.4, 1],
            opacity: [0.7, 1, 0.7],
            boxShadow: [
              `0 0 12px 3px ${progressColor}80`,
              `0 0 20px 5px ${progressColor}`,
              `0 0 12px 3px ${progressColor}80`,
            ],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />

        {/* Secondary smaller pulsing dot (opposite side) */}
        <motion.div
          className="absolute w-2 h-2 md:w-3 md:h-3 rounded-full"
          style={{
            backgroundColor: accentColor,
            boxShadow: `0 0 8px 2px ${accentColor}`,
            top: "50%",
            left: "50%",
            transform: `rotate(${
              progress * 3.6 + 180
            }deg) translateX(146px) translateY(-50%)`,
          }}
          animate={{
            scale: [1, 1.3, 1],
            opacity: [0.5, 0.8, 0.5],
          }}
          transition={{
            duration: 2.5,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 0.5,
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
          whileHover="hover"
          className="relative w-24 h-24 sm:w-36 sm:h-36 md:w-48 md:h-48 flex-shrink-0 hidden sm:block perspective"
          style={{ perspective: "1000px" }}
        >
          <div className="absolute inset-0 rounded-full border border-gray-400/20"></div>
          <div
            className="absolute inset-0 rounded-full"
            style={{
              background: `linear-gradient(225deg, transparent 0%, ${currentTheme.color}40 100%)`,
              opacity: 0.7,
            }}
          ></div>
          <Image
            src={menuItems[getNextIndex(currentIndex)].image}
            alt={menuItems[getNextIndex(currentIndex)].alt}
            width={192}
            height={192}
            className="rounded-full object-cover transition duration-500 cursor-pointer"
            onClick={handleNext}
          />
          <motion.div
            className="absolute -inset-1 rounded-full opacity-50"
            style={{
              background: `radial-gradient(ellipse at center, ${currentTheme.secondaryColor}40 0%, transparent 70%)`,
            }}
            animate={{
              opacity: [0.3, 0.6, 0.3],
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 1,
            }}
          />
        </motion.div>
      </AnimatePresence>
    </div>
  );
};

export default Slider;
