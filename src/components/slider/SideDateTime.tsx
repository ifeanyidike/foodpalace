"use client";
import React from "react";
import { motion } from "framer-motion";
const SideDateTime = () => {
  return (
    <motion.div
      className="absolute left-2 md:left-5 top-1/2 -translate-y-1/2 flex flex-col items-center gap-1 z-40 hidden sm:flex"
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: 1, duration: 0.8 }}
    >
      <div className="text-xs tracking-widest">{new Date().getFullYear()}</div>
      <div className="h-6 w-[1px] bg-gray-400/30"></div>
      <div
        className="text-xs tracking-widest rotate-180"
        style={{ writingMode: "vertical-rl" }}
      >
        SEASONAL MENU
      </div>
    </motion.div>
  );
};

export default SideDateTime;
