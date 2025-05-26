// components/PageSlider.tsx
"use client";

import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { motion, useAnimation } from "framer-motion";
import { Clock } from "lucide-react";
import { menuItems, themes } from "../premium-slider-data";
import SliderNavigation from "./SliderNavigation";
import NavigationArrows from "./NavigationArrows";
import MenuOverlay from "./MenuOverlay";
import SocialLinks from "./SocialLinks";
import SeasonDots from "./SeasonDots";
import MainContent from "./MainContent";
import SideDateTime from "./SideDateTime";
import ThemeSelector from "./ThemeSelector";
import { Particles } from "../premium-slider-components";

const PageSlider: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [themeIndex, setThemeIndex] = useState(0);
  const [progress, setProgress] = useState(0);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isAutoSliding, setIsAutoSliding] = useState(true);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [direction, setDirection] = useState(1);
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

  // Re-initialize auto sliding when component mounts
  useEffect(() => {
    setIsAutoSliding(true);
    startProgressTimer();

    return () => {
      if (progressRef.current) clearInterval(progressRef.current);
    };
  }, []);

  const startProgressTimer = () => {
    if (progressRef.current) clearInterval(progressRef.current);
    setProgress(0);

    progressRef.current = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          handleNext();
          setIsTransitioning(false);
          return 0;
        }
        return prev + 100 / (autoSlideInterval / 100);
      });
    }, 100);
  };

  const handleNext = () => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    setDirection(1);

    const nextIndex = (currentIndex + 1) % menuItems.length;
    setCurrentIndex(nextIndex);
    setProgress(0);
    // Change theme every full cycle through menu items

    setThemeIndex((prevTheme) => (prevTheme + 1) % themes.length);

    setTimeout(() => setIsTransitioning(false), 800);
  };

  const handlePrev = () => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    setDirection(-1);

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

  return (
    <div className="relative w-full h-screen overflow-hidden text-white font-[family-name:var(--font-urbanist)]">
      {/* Background with animated transitions */}
      <motion.div
        ref={backgroundRef}
        className="absolute inset-0 z-0"
        key={`bg-${themeIndex}`}
        animate={themeControls}
      >
        <div className="absolute inset-0 bg-black/70 md:bg-black/60 z-10" />
        <Image
          src={currentTheme.backgroundImage}
          alt="Restaurant ambient background"
          layout="fill"
          objectFit="cover"
          className="z-0 transition-opacity duration-1000"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-black/80 z-20" />
      </motion.div>
      <Particles theme={currentTheme} />

      {/* Texture overlay for premium feel */}
      <div className="absolute inset-0 bg-[url('/assets/p15.png')] opacity-10 mix-blend-overlay z-10 pointer-events-none" />

      {/* Navigation */}
      <SliderNavigation isMenuOpen={isMenuOpen} setIsMenuOpen={setIsMenuOpen} />

      {/* Side date/time indicator */}
      <SideDateTime />

      {/* Main Content */}
      <MainContent
        currentIndex={currentIndex}
        currentTheme={currentTheme}
        direction={direction}
        handleNext={handleNext}
        handlePrev={handlePrev}
        progress={progress}
        themeIndex={themeIndex}
      />
      {/* Navigation Arrows and CTA */}
      <NavigationArrows handleNext={handleNext} handlePrev={handlePrev} />

      {/* Play/Pause control */}
      <motion.button
        onClick={toggleAutoSlide}
        className="absolute bottom-10 md:bottom-16 right-4 md:right-10 z-40 p-1.5 md:p-2 rounded-full bg-black/20 backdrop-blur-sm border border-white/10 hover:bg-black/40 transition-all duration-300"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1, duration: 0.8 }}
      >
        {isAutoSliding ? (
          <div className="w-4 h-4 md:w-6 md:h-6 flex items-center justify-center">
            <div className="w-0.5 md:w-1 h-2 md:h-3 bg-white mx-[1px]"></div>
            <div className="w-0.5 md:w-1 h-2 md:h-3 bg-white mx-[1px]"></div>
          </div>
        ) : (
          <Clock className="w-4 h-4 md:w-5 md:h-5 text-white" />
        )}
      </motion.button>

      {/* Fullscreen Menu Overlay */}
      <MenuOverlay isMenuOpen={isMenuOpen} setIsMenuOpen={setIsMenuOpen} />

      {/* Social media links */}
      <SocialLinks />

      {/* Season indicator dots */}
      <SeasonDots
        setCurrentIndex={setCurrentIndex}
        setProgress={setProgress}
        setThemeIndex={setThemeIndex}
        themeIndex={themeIndex}
      />

      {/* Theme description indicator */}
      <ThemeSelector id={currentTheme.id} themeIndex={themeIndex} />
    </div>
  );
};

export default PageSlider;
