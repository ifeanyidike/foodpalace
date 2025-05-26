// src/components/MenuItemCard.tsx
import React from "react";
import { motion } from "framer-motion";
import { MenuItem } from "./types/menu";
import { FaPlus } from "react-icons/fa";

interface MenuItemCardProps {
  item: MenuItem;
  onClick: () => void;
  onAddToCart: () => void;
}

const MenuItemCard: React.FC<MenuItemCardProps> = ({
  item,
  onClick,
  onAddToCart,
}) => {
  return (
    <div className="group relative h-full flex flex-col">
      <div
        className="relative h-64 w-full overflow-hidden cursor-pointer"
        onClick={onClick}
      >
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent z-10 opacity-70 group-hover:opacity-90 transition-opacity duration-300"></div>
        <img
          src={item.image}
          alt={item.name}
          className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700 ease-in-out"
        />

        {item.isNew && (
          <div className="absolute top-4 right-4 z-20 bg-amber-500 text-white px-3 py-1 rounded-full text-xs uppercase font-bold tracking-wider shadow-lg">
            New
          </div>
        )}

        {item.isSignature && (
          <div className="absolute top-4 left-4 z-20 bg-rose-600 text-white px-3 py-1 rounded-full text-xs uppercase font-bold tracking-wider shadow-lg">
            Signature
          </div>
        )}
      </div>

      <div className="p-5 flex-grow flex flex-col">
        <div className="flex justify-between items-start mb-2">
          <h3
            className="text-xl font-serif text-stone-800 group-hover:text-amber-600 transition-colors duration-300"
            onClick={onClick}
          >
            {item.name}
          </h3>
          <span className="font-semibold text-amber-600">
            ${item.price.toFixed(2)}
          </span>
        </div>

        <p className="text-stone-600 text-sm mb-4 line-clamp-2">
          {item.shortDescription}
        </p>

        <div className="mt-auto flex justify-between items-center">
          <button
            onClick={onClick}
            className="text-amber-600 hover:text-amber-800 text-sm font-medium transition-colors duration-300"
          >
            View Details
          </button>

          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={(e) => {
              e.stopPropagation();
              onAddToCart();
            }}
            className="bg-amber-500 hover:bg-amber-600 text-white w-10 h-10 rounded-full flex items-center justify-center shadow-md transition-colors duration-300"
          >
            <FaPlus />
          </motion.button>
        </div>
      </div>

      {/* Quick add animation overlay */}
      <div className="add-to-cart-animation absolute inset-0 bg-green-500/20 flex items-center justify-center z-30 pointer-events-none opacity-0 transition-opacity duration-300">
        <motion.div
          initial={{ scale: 0.5, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="bg-white rounded-full p-3 shadow-lg"
        >
          <svg
            className="w-6 h-6 text-green-500"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M5 13l4 4L19 7"
            />
          </svg>
        </motion.div>
      </div>
    </div>
  );
};

export default MenuItemCard;
