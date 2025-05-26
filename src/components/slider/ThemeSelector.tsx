import React from "react";
import { motion } from "framer-motion";

const ThemeSelector = ({
  themeIndex,
  id,
}: {
  themeIndex: number;
  id: string;
}) => {
  return (
    <div className="absolute bottom-20 left-1/2 -translate-x-1/2 z-30">
      <div className="bg-black/30 backdrop-blur-sm px-3 py-1 rounded-full">
        <motion.span
          key={`theme-name-${themeIndex}`}
          className="text-xs tracking-wider uppercase"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
        >
          {id}
        </motion.span>
      </div>
    </div>
  );
};

export default ThemeSelector;
