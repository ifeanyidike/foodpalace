// src/components/MenuItemModal.tsx
import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MenuItem } from "./types/menu";
import { FaMinus, FaPlus, FaTimes } from "react-icons/fa";

interface MenuItemModalProps {
  item: MenuItem;
  onClose: () => void;
  onAddToCart: (item: MenuItem, quantity: number) => void;
}

const MenuItemModal: React.FC<MenuItemModalProps> = ({
  item,
  onClose,
  onAddToCart,
}) => {
  const [quantity, setQuantity] = useState(1);
  const [selectedOptions, setSelectedOptions] = useState<
    Record<string, string>
  >({});
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [selectedTab, setSelectedTab] = useState<
    "description" | "ingredients" | "nutrition"
  >("description");

  // Handle Escape key press
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
  }, [onClose]);

  const incrementQuantity = () => setQuantity((q) => q + 1);
  const decrementQuantity = () => setQuantity((q) => (q > 1 ? q - 1 : 1));

  const handleOptionChange = (optionType: string, value: string) => {
    setSelectedOptions((prev) => ({
      ...prev,
      [optionType]: value,
    }));
  };

  const backdropVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
  };

  const modalVariants = {
    hidden: { opacity: 0, y: 50, scale: 0.95 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        type: "spring",
        damping: 25,
        stiffness: 300,
      },
    },
    exit: {
      opacity: 0,
      y: 50,
      scale: 0.95,
      transition: {
        duration: 0.2,
      },
    },
  };

  const imageVariants = {
    hidden: { opacity: 0, x: 20 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.5 },
    },
    exit: {
      opacity: 0,
      x: -20,
      transition: { duration: 0.3 },
    },
  };

  // Handle multiple images slideshow
  const images = [item.image, ...(item.additionalImages || [])];

  const nextImage = () => {
    setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
  };

  const prevImage = () => {
    setCurrentImageIndex(
      (prevIndex) => (prevIndex - 1 + images.length) % images.length
    );
  };

  return (
    <motion.div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm"
      variants={backdropVariants}
      initial="hidden"
      animate="visible"
      exit="hidden"
      onClick={onClose}
    >
      <motion.div
        className="bg-white rounded-2xl overflow-hidden shadow-2xl w-full max-w-5xl max-h-[90vh] flex flex-col md:flex-row"
        variants={modalVariants}
        initial="hidden"
        animate="visible"
        exit="exit"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Image Section */}
        <div className="relative w-full md:w-1/2">
          <div className="aspect-square relative overflow-hidden">
            <AnimatePresence mode="wait">
              <motion.img
                key={images[currentImageIndex]}
                src={images[currentImageIndex]}
                alt={item.name}
                className="w-full h-full object-cover"
                variants={imageVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
              />
            </AnimatePresence>

            {images.length > 1 && (
              <>
                <button
                  onClick={prevImage}
                  className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white/80 hover:bg-white rounded-full w-10 h-10 flex items-center justify-center text-stone-800 shadow-md transition-all duration-300"
                >
                  <svg
                    className="w-6 h-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M15 19l-7-7 7-7"
                    />
                  </svg>
                </button>
                <button
                  onClick={nextImage}
                  className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white/80 hover:bg-white rounded-full w-10 h-10 flex items-center justify-center text-stone-800 shadow-md transition-all duration-300"
                >
                  <svg
                    className="w-6 h-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 5l7 7-7 7"
                    />
                  </svg>
                </button>
              </>
            )}

            {/* Image pagination dots */}
            {images.length > 1 && (
              <div className="absolute bottom-4 left-0 right-0 flex justify-center space-x-2">
                {images.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentImageIndex(index)}
                    className={`w-2 h-2 rounded-full transition-all duration-300 ${
                      currentImageIndex === index
                        ? "bg-white w-4"
                        : "bg-white/50"
                    }`}
                  />
                ))}
              </div>
            )}
          </div>

          {/* Diet labels */}
          <div className="absolute top-4 left-4 flex flex-wrap gap-2">
            {item.isVegetarian && (
              <span className="bg-green-500 text-white text-xs font-bold px-2 py-1 rounded-full">
                Vegetarian
              </span>
            )}
            {item.isVegan && (
              <span className="bg-green-600 text-white text-xs font-bold px-2 py-1 rounded-full">
                Vegan
              </span>
            )}
            {item.isGlutenFree && (
              <span className="bg-amber-500 text-white text-xs font-bold px-2 py-1 rounded-full">
                Gluten Free
              </span>
            )}
          </div>

          <button
            onClick={onClose}
            className="absolute top-4 right-4 bg-white/80 hover:bg-white text-stone-800 rounded-full w-8 h-8 flex items-center justify-center shadow-md transition-all duration-300"
          >
            <FaTimes />
          </button>
        </div>

        {/* Content Section */}
        <div className="w-full md:w-1/2 p-6 overflow-y-auto max-h-[50vh] md:max-h-[90vh]">
          <div className="flex justify-between items-start">
            <h2 className="text-3xl font-serif text-stone-800">{item.name}</h2>
            <span className="text-2xl font-semibold text-amber-600">
              ${item.price.toFixed(2)}
            </span>
          </div>

          {/* Rating */}
          {item.rating && (
            <div className="flex items-center mt-2 mb-4">
              <div className="flex">
                {[1, 2, 3, 4, 5].map((star) => (
                  <svg
                    key={star}
                    className={`w-5 h-5 ${
                      star <= item.rating ? "text-amber-400" : "text-gray-300"
                    }`}
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>
              <span className="ml-2 text-sm text-stone-500">
                {item.reviewCount} reviews
              </span>
            </div>
          )}

          {/* Tabs */}
          <div className="flex border-b border-stone-200 mb-4">
            <button
              onClick={() => setSelectedTab("description")}
              className={`py-2 px-4 font-medium text-sm ${
                selectedTab === "description"
                  ? "text-amber-600 border-b-2 border-amber-600"
                  : "text-stone-500 hover:text-stone-800"
              }`}
            >
              Description
            </button>
            <button
              onClick={() => setSelectedTab("ingredients")}
              className={`py-2 px-4 font-medium text-sm ${
                selectedTab === "ingredients"
                  ? "text-amber-600 border-b-2 border-amber-600"
                  : "text-stone-500 hover:text-stone-800"
              }`}
            >
              Ingredients
            </button>
            <button
              onClick={() => setSelectedTab("nutrition")}
              className={`py-2 px-4 font-medium text-sm ${
                selectedTab === "nutrition"
                  ? "text-amber-600 border-b-2 border-amber-600"
                  : "text-stone-500 hover:text-stone-800"
              }`}
            >
              Nutrition
            </button>
          </div>

          {/* Tab Content */}
          <div className="mb-6">
            {selectedTab === "description" && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
              >
                <p className="text-stone-700 leading-relaxed">
                  {item.description}
                </p>
                {item.chefNote && (
                  <div className="mt-4 p-4 bg-amber-50 border-l-4 border-amber-500 rounded">
                    <h4 className="font-medium text-amber-800 mb-1">
                      Chef&apos;s Note
                    </h4>
                    <p className="text-amber-700 italic text-sm">
                      {item.chefNote}
                    </p>
                  </div>
                )}
              </motion.div>
            )}

            {selectedTab === "ingredients" && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
              >
                <ul className="grid grid-cols-2 gap-2">
                  {item.ingredients?.map((ingredient, index) => (
                    <li
                      key={index}
                      className="flex items-center text-stone-700"
                    >
                      <div className="w-2 h-2 bg-amber-500 rounded-full mr-2"></div>
                      {ingredient}
                    </li>
                  ))}
                </ul>

                {item.allergens && item.allergens.length > 0 && (
                  <div className="mt-4 p-3 bg-red-50 rounded-lg">
                    <h4 className="font-medium text-red-700 mb-1">Allergens</h4>
                    <div className="flex flex-wrap gap-2">
                      {item.allergens.map((allergen, index) => (
                        <span
                          key={index}
                          className="text-xs bg-red-100 text-red-800 px-2 py-1 rounded-full"
                        >
                          {allergen}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </motion.div>
            )}

            {selectedTab === "nutrition" && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
                className="space-y-2"
              >
                {item.nutritionInfo?.map((info, index) => (
                  <div
                    key={index}
                    className="flex justify-between py-2 border-b border-stone-100"
                  >
                    <span className="text-stone-600">{info.name}</span>
                    <span className="font-medium text-stone-800">
                      {info.value}
                    </span>
                  </div>
                ))}

                {item.calories && (
                  <div className="mt-4 text-center">
                    <div className="inline-block p-3 bg-stone-100 rounded-full">
                      <div className="text-xl font-bold text-stone-800">
                        {item.calories}
                      </div>
                      <div className="text-xs text-stone-600">calories</div>
                    </div>
                  </div>
                )}
              </motion.div>
            )}
          </div>

          {/* Options Selectors */}
          {item.options && Object.keys(item.options).length > 0 && (
            <div className="mb-6 space-y-4">
              {Object.entries(item.options).map(([optionType, choices]) => (
                <div key={optionType}>
                  <h4 className="font-medium text-stone-800 mb-2 capitalize">
                    {optionType}
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {choices.map((choice) => (
                      <button
                        key={choice.value}
                        onClick={() =>
                          handleOptionChange(optionType, choice.value)
                        }
                        className={`px-3 py-1.5 text-sm rounded-full border transition-all duration-300 ${
                          selectedOptions[optionType] === choice.value
                            ? "bg-amber-500 text-white border-amber-500"
                            : "bg-white text-stone-700 border-stone-300 hover:border-amber-500"
                        }`}
                      >
                        {choice.value}
                        {choice.priceAdjustment > 0 &&
                          ` (+$${choice.priceAdjustment.toFixed(2)})`}
                      </button>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Special Instructions */}
          <div className="mb-6">
            <h4 className="font-medium text-stone-800 mb-2">
              Special Instructions
            </h4>
            <textarea
              className="w-full p-3 border border-stone-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500 outline-none text-stone-700 text-sm transition-all duration-300"
              placeholder="Any special requests or dietary restrictions? Let us know here."
              rows={2}
            ></textarea>
          </div>

          {/* Quantity and Add to Cart */}
          <div className="flex items-center justify-between mt-6">
            <div className="flex items-center border border-stone-300 rounded-lg overflow-hidden">
              <button
                onClick={decrementQuantity}
                className="px-3 py-2 bg-stone-100 hover:bg-stone-200 text-stone-700 transition-colors duration-300"
              >
                <FaMinus size={14} />
              </button>
              <span className="px-4 py-2 font-medium text-stone-800">
                {quantity}
              </span>
              <button
                onClick={incrementQuantity}
                className="px-3 py-2 bg-stone-100 hover:bg-stone-200 text-stone-700 transition-colors duration-300"
              >
                <FaPlus size={14} />
              </button>
            </div>

            <motion.button
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              onClick={() => {
                onAddToCart(item, quantity);
                onClose();
              }}
              className="bg-amber-500 hover:bg-amber-600 text-white px-6 py-3 rounded-lg shadow-md flex items-center space-x-2 font-medium transition-colors duration-300"
            >
              <span>Add to Order</span>
              <span>${(item.price * quantity).toFixed(2)}</span>
            </motion.button>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default MenuItemModal;
