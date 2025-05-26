"use client";
import React from "react";
import { themes } from "../premium-slider-data";
import { motion } from "framer-motion";

type Props = {
  setThemeIndex: (e: number) => void;
  setCurrentIndex: (e: number) => void;
  setProgress: (e: number) => void;
  themeIndex: number;
};
const SeasonDots = ({
  themeIndex,
  setProgress,
  setCurrentIndex,
  setThemeIndex,
}: Props) => {
  return (
    <div className="absolute bottom-3 md:bottom-6 left-1/2 -translate-x-1/2 flex gap-2 md:gap-3 z-30">
      {themes.map((theme, idx) => (
        <motion.button
          key={theme.id}
          className={`w-1.5 h-1.5 md:w-2 md:h-2 rounded-full ${
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
  );
};

export default SeasonDots;
