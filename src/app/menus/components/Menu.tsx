"use client";
// src/pages/Menu.tsx
import React, { useState, useEffect } from "react";
import {
  motion,
  AnimatePresence,
  useScroll,
  useTransform,
} from "framer-motion";
import { useInView } from "react-intersection-observer";
import { MenuItem } from "./types/menu";
import MenuItemModal from "./MenuItemModal";
import ReservationForm from "./ReservationForm";
import CartSidebar from "./CartSidebar";
import { categories, menuItems } from "./data/menuData";
import { FaWhatsapp, FaRegBookmark, FaBookmark, FaStar } from "react-icons/fa";
import { LuChefHat, LuLeaf } from "react-icons/lu";
import { MdOutlineLocalFireDepartment } from "react-icons/md";
import { IoIosWine } from "react-icons/io";
import { Swiper, SwiperSlide } from "swiper/react";
import {
  EffectCoverflow,
  Pagination,
  Navigation,
  Autoplay,
} from "swiper/modules";
import "swiper/css";
import "swiper/css/effect-coverflow";
import "swiper/css/pagination";
import "swiper/css/navigation";

const Menu: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>(
    categories[0].id
  );
  const [selectedItem, setSelectedItem] = useState<MenuItem | null>(null);
  const [showCart, setShowCart] = useState<boolean>(false);
  const [showReservation, setShowReservation] = useState<boolean>(false);
  const [cart, setCart] = useState<{ item: MenuItem; quantity: number }[]>([]);
  const [favorites, setFavorites] = useState<string[]>([]);
  const [, setIsScrolled] = useState<boolean>(false);
  const [activeFilter, setActiveFilter] = useState<string | null>(null);
  const [isDarkMode, setIsDarkMode] = useState<boolean>(false);

  const { scrollY } = useScroll();
  const headerOpacity = useTransform(scrollY, [0, 200], [1, 0.95]);
  const headerBlur = useTransform(scrollY, [0, 100], [0, 8]);

  const { ref, inView } = useInView({
    threshold: 0.1,
    triggerOnce: false,
  });

  const { ref: categoryRef, inView: categoryInView } = useInView({
    threshold: 0.5,
    triggerOnce: false,
  });

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      setIsScrolled(scrollPosition > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const toggleFavorite = (itemId: string) => {
    setFavorites((prev) =>
      prev.includes(itemId)
        ? prev.filter((id) => id !== itemId)
        : [...prev, itemId]
    );
  };

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
    document.documentElement.classList.toggle("dark");
  };

  const addToCart = (item: MenuItem, quantity: number = 1) => {
    const existingItem = cart.find((cartItem) => cartItem.item.id === item.id);

    if (existingItem) {
      setCart(
        cart.map((cartItem) =>
          cartItem.item.id === item.id
            ? { ...cartItem, quantity: cartItem.quantity + quantity }
            : cartItem
        )
      );
    } else {
      setCart([...cart, { item, quantity }]);
    }

    // Advanced animation feedback
    const element = document.getElementById(`menu-item-${item.id}`);
    if (element) {
      element.classList.add("added-to-cart-premium");
      setTimeout(() => {
        element.classList.remove("added-to-cart-premium");
      }, 800);
    }
  };

  const applyFilter = (filter: string) => {
    setSelectedCategory(filter);
    setActiveFilter(activeFilter === filter ? null : filter);
  };

  const filteredItems = menuItems
    .filter((item) => item.categoryId === selectedCategory)
    .filter((item) => {
      if (!activeFilter) return true;

      switch (activeFilter) {
        case "vegetarian":
          return item.dietary?.includes("vegetarian");
        case "spicy":
          return item.spicyLevel && item.spicyLevel > 2;
        case "chef":
          return item.isChefSpecial;
        case "pairing":
          return item.winePairing;
        default:
          return true;
      }
    });

  const categoryImages: Record<string, string> = {
    appetizers:
      "https://images.unsplash.com/photo-1670398564097-0762e1b30b3a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1931&q=80",
    mains:
      "https://images.unsplash.com/photo-1504674900247-0877df9cc836?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1770&q=80",
    desserts:
      "https://images.unsplash.com/photo-1488477181946-6428a0291777?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1787&q=80",
    drinks:
      "https://images.unsplash.com/photo-1536935338788-846bb9981813?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1766&q=80",
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.08,
        delayChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 30, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 80,
        damping: 12,
      },
    },
  };

  const buttonVariants = {
    rest: { scale: 1 },
    hover: {
      scale: 1.05,
      boxShadow: "0px 10px 20px rgba(0, 0, 0, 0.1)",
      transition: {
        type: "spring",
        stiffness: 500,
        damping: 15,
      },
    },
    tap: { scale: 0.95 },
  };

  // const itemShadowVariants = {
  //   hover: {
  //     boxShadow: "0px 15px 25px rgba(0, 0, 0, 0.08)",
  //     y: -8,
  //     transition: { type: "spring", stiffness: 400, damping: 20 },
  //   },
  // };

  return (
    <div
      className={`${
        isDarkMode
          ? "dark bg-stone-900"
          : "bg-gradient-to-br from-amber-50 to-stone-100"
      } min-h-screen transition-colors duration-700 ease-in-out font-[family-name:var(--font-urbanist)]`}
    >
      {/* Featured Categories Showcase */}
      <div
        ref={categoryRef}
        className="py-20 px-4 md:px-8 bg-white dark:bg-stone-900 transition-colors duration-700"
      >
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={
            categoryInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }
          }
          transition={{ duration: 0.8 }}
          className="container mx-auto"
        >
          <h2 className="text-3xl md:text-4xl text-center font-serif mb-2 dark:text-white">
            Explore Our Categories
          </h2>
          <p className="text-center text-stone-600 dark:text-stone-400 mb-12 max-w-2xl mx-auto">
            Discover our carefully curated selection of culinary masterpieces
          </p>

          <Swiper
            effect={"coverflow"}
            grabCursor={true}
            centeredSlides={true}
            slidesPerView={"auto"}
            coverflowEffect={{
              rotate: 50,
              stretch: 0,
              depth: 100,
              modifier: 1,
              slideShadows: true,
            }}
            pagination={{ clickable: true }}
            navigation={true}
            autoplay={{
              delay: 3500,
              disableOnInteraction: false,
            }}
            modules={[EffectCoverflow, Pagination, Navigation, Autoplay]}
            className="mySwiper"
          >
            {categories.map((category) => (
              <SwiperSlide key={category.id} className="pb-14">
                <motion.div
                  className="group relative w-[280px] md:w-[380px] h-[400px] mx-auto overflow-hidden rounded-xl cursor-pointer"
                  onClick={() => setSelectedCategory(category.id)}
                  whileHover={{ scale: 1.03 }}
                  transition={{ duration: 0.3 }}
                >
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent z-10"></div>
                  <img
                    src={
                      categoryImages[category.id] ||
                      "https://images.unsplash.com/photo-1414235077428-338989a2e8c0"
                    }
                    alt={category.name}
                    className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700 ease-in-out"
                  />
                  <div className="absolute bottom-0 left-0 w-full p-6 z-20 text-white">
                    <h3 className="text-2xl font-serif mb-2">
                      {category.name}
                    </h3>
                    <p className="text-sm text-white/80 mb-4 line-clamp-2">
                      {category.description}
                    </p>
                    <div className="h-0.5 w-12 bg-amber-400 transform origin-left group-hover:scale-x-150 transition-transform duration-300"></div>
                  </div>
                </motion.div>
              </SwiperSlide>
            ))}
          </Swiper>
        </motion.div>
      </div>

      {/* Category Navigation */}
      <motion.div
        style={{
          opacity: headerOpacity,
          backdropFilter: `blur(${headerBlur}px)`,
        }}
        className={`sticky top-0 z-30 ${
          isDarkMode ? "bg-stone-900/90" : "bg-white/90"
        } transition-colors duration-700 shadow-md`}
      >
        <div className="container mx-auto px-4 py-4">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <motion.div
              className="flex items-center space-x-1 md:space-x-3 overflow-x-auto hide-scrollbar py-2 w-full md:w-auto"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              {categories.map((category) => (
                <motion.button
                  key={category.id}
                  variants={buttonVariants}
                  initial="rest"
                  whileHover="hover"
                  whileTap="tap"
                  onClick={() => setSelectedCategory(category.id)}
                  className={`px-5 py-2.5 whitespace-nowrap rounded-full text-sm md:text-base transition-all duration-300 ${
                    selectedCategory === category.id
                      ? `${
                          isDarkMode ? "bg-amber-600" : "bg-amber-500"
                        } text-white shadow-lg`
                      : `${
                          isDarkMode
                            ? "bg-stone-800 text-stone-300 hover:bg-stone-700"
                            : "bg-stone-100 text-stone-700 hover:bg-stone-200"
                        }`
                  }`}
                >
                  {category.name}
                </motion.button>
              ))}
            </motion.div>

            <div className="flex space-x-3 w-full md:w-auto justify-center md:justify-end">
              <motion.button
                variants={buttonVariants}
                initial="rest"
                whileHover="hover"
                whileTap="tap"
                onClick={toggleDarkMode}
                className={`px-3 py-3 rounded-full transition-all duration-300 ${
                  isDarkMode
                    ? "bg-stone-800 text-amber-400"
                    : "bg-stone-100 text-stone-700"
                }`}
              >
                {isDarkMode ? (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"
                    />
                  </svg>
                ) : (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"
                    />
                  </svg>
                )}
              </motion.button>

              <motion.button
                variants={buttonVariants}
                initial="rest"
                whileHover="hover"
                whileTap="tap"
                onClick={() => setShowReservation(true)}
                className={`px-4 py-2.5 ${
                  isDarkMode
                    ? "bg-amber-600 hover:bg-amber-700"
                    : "bg-amber-500 hover:bg-amber-600"
                } text-white rounded-full text-sm md:text-base shadow-md transition-all duration-300`}
              >
                Book a Table
              </motion.button>

              <motion.button
                variants={buttonVariants}
                initial="rest"
                whileHover="hover"
                whileTap="tap"
                onClick={() => setShowCart(true)}
                className={`px-4 py-2.5 ${
                  isDarkMode
                    ? "bg-emerald-700 hover:bg-emerald-800"
                    : "bg-emerald-600 hover:bg-emerald-700"
                } text-white rounded-full text-sm md:text-base shadow-md transition-all duration-300 relative`}
              >
                Order Online
                {cart.length > 0 && (
                  <motion.span
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: "spring", stiffness: 400, damping: 10 }}
                    className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs"
                  >
                    {cart.reduce((acc, item) => acc + item.quantity, 0)}
                  </motion.span>
                )}
              </motion.button>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Current Category Description */}
      <div
        className={`container mx-auto px-4 py-12 md:py-16 transition-colors duration-700`}
      >
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center max-w-3xl mx-auto mb-12"
        >
          <h2
            className={`text-3xl md:text-4xl font-serif mb-4 ${
              isDarkMode ? "text-white" : "text-stone-800"
            }`}
          >
            {categories.find((c) => c.id === selectedCategory)?.name}
          </h2>
          <p
            className={`${
              isDarkMode ? "text-stone-400" : "text-stone-600"
            } md:text-lg`}
          >
            {categories.find((c) => c.id === selectedCategory)?.description}
          </p>
          <div className="h-0.5 w-20 bg-amber-500 mx-auto mt-6"></div>
        </motion.div>

        {/* Filters */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="flex flex-wrap justify-center gap-3 mb-10"
        >
          <button
            onClick={() => applyFilter("vegetarian")}
            className={`px-4 py-2 rounded-full text-sm flex items-center gap-2 transition-all duration-300 ${
              activeFilter === "vegetarian"
                ? "bg-green-500 text-white"
                : `${
                    isDarkMode
                      ? "bg-stone-800 hover:bg-stone-700 text-stone-300"
                      : "bg-stone-100 hover:bg-stone-200 text-stone-700"
                  }`
            }`}
          >
            <LuLeaf /> Vegetarian
          </button>

          <button
            onClick={() => applyFilter("spicy")}
            className={`px-4 py-2 rounded-full text-sm flex items-center gap-2 transition-all duration-300 ${
              activeFilter === "spicy"
                ? "bg-red-500 text-white"
                : `${
                    isDarkMode
                      ? "bg-stone-800 hover:bg-stone-700 text-stone-300"
                      : "bg-stone-100 hover:bg-stone-200 text-stone-700"
                  }`
            }`}
          >
            <MdOutlineLocalFireDepartment /> Spicy
          </button>

          <button
            onClick={() => applyFilter("chef")}
            className={`px-4 py-2 rounded-full text-sm flex items-center gap-2 transition-all duration-300 ${
              activeFilter === "chef"
                ? "bg-amber-500 text-white"
                : `${
                    isDarkMode
                      ? "bg-stone-800 hover:bg-stone-700 text-stone-300"
                      : "bg-stone-100 hover:bg-stone-200 text-stone-700"
                  }`
            }`}
          >
            <LuChefHat /> Chef&apos;s Special
          </button>

          <button
            onClick={() => applyFilter("pairing")}
            className={`px-4 py-2 rounded-full text-sm flex items-center gap-2 transition-all duration-300 ${
              activeFilter === "pairing"
                ? "bg-purple-500 text-white"
                : `${
                    isDarkMode
                      ? "bg-stone-800 hover:bg-stone-700 text-stone-300"
                      : "bg-stone-100 hover:bg-stone-200 text-stone-700"
                  }`
            }`}
          >
            <IoIosWine /> Wine Pairing
          </button>
        </motion.div>

        {/* Menu Items Grid */}
        <motion.div
          ref={ref}
          variants={containerVariants}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-12"
        >
          {filteredItems.length > 0 ? (
            filteredItems.map((item) => (
              <motion.div
                key={item.id}
                variants={itemVariants}
                id={`menu-item-${item.id}`}
                whileHover="hover"
                // variants={itemShadowVariants}
                className={`${
                  isDarkMode ? "bg-stone-800" : "bg-white"
                } rounded-xl overflow-hidden shadow-lg transition-all duration-300 transform`}
              >
                <div className="relative">
                  <div className="h-60 overflow-hidden">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-full h-full object-cover transform hover:scale-110 transition-transform duration-700"
                    />
                  </div>

                  <motion.button
                    whileTap={{ scale: 0.9 }}
                    className="absolute top-4 right-4 z-10 p-2 rounded-full bg-white/80 dark:bg-black/50 backdrop-blur-sm text-amber-500 hover:text-amber-600 transition-all duration-300"
                    onClick={(e) => {
                      e.stopPropagation();
                      toggleFavorite(item.id);
                    }}
                  >
                    {favorites.includes(item.id) ? (
                      <FaBookmark />
                    ) : (
                      <FaRegBookmark />
                    )}
                  </motion.button>

                  {item.isChefSpecial && (
                    <div className="absolute top-4 left-4 z-10 px-3 py-1 rounded-full bg-amber-500 text-white text-xs font-medium flex items-center gap-1">
                      <LuChefHat size={12} /> Chef&apos;s Special
                    </div>
                  )}

                  {item.dietary?.includes("vegetarian") && (
                    <div className="absolute bottom-4 left-4 z-10 px-3 py-1 rounded-full bg-green-500 text-white text-xs font-medium flex items-center gap-1">
                      <LuLeaf size={12} /> Vegetarian
                    </div>
                  )}
                </div>

                <div
                  className={`p-6 ${
                    isDarkMode ? "text-white" : "text-stone-800"
                  }`}
                >
                  <div className="flex justify-between items-start mb-3">
                    <h3 className="text-xl font-medium">{item.name}</h3>
                    <span className="text-lg font-semibold text-amber-500">
                      ${item.price.toFixed(2)}
                    </span>
                  </div>

                  <p
                    className={`text-sm mb-4 line-clamp-2 ${
                      isDarkMode ? "text-stone-400" : "text-stone-600"
                    }`}
                  >
                    {item.description}
                  </p>

                  <div className="flex items-center space-x-1 mb-4">
                    {[...Array(5)].map((_, i) => (
                      <FaStar
                        key={i}
                        className={`${
                          i < item.rating ? "text-amber-400" : "text-gray-300"
                        } w-4 h-4`}
                      />
                    ))}
                    <span
                      className={`text-xs ml-2 ${
                        isDarkMode ? "text-stone-400" : "text-stone-500"
                      }`}
                    >
                      ({item.reviewCount || 0})
                    </span>
                  </div>

                  <div className="flex space-x-3">
                    <motion.button
                      variants={buttonVariants}
                      whileHover="hover"
                      whileTap="tap"
                      onClick={() => setSelectedItem(item)}
                      className={`flex-1 py-2.5 ${
                        isDarkMode
                          ? "bg-stone-700 hover:bg-stone-600"
                          : "bg-stone-100 hover:bg-stone-200"
                      } rounded-md text-sm font-medium ${
                        isDarkMode ? "text-white" : "text-stone-800"
                      } transition-all duration-300`}
                    >
                      Details
                    </motion.button>

                    <motion.button
                      variants={buttonVariants}
                      whileHover="hover"
                      whileTap="tap"
                      onClick={(e) => {
                        e.stopPropagation();
                        addToCart(item);
                      }}
                      className={`flex-1 py-2.5 ${
                        isDarkMode
                          ? "bg-amber-600 hover:bg-amber-700"
                          : "bg-amber-500 hover:bg-amber-600"
                      } rounded-md text-sm font-medium text-white transition-all duration-300`}
                    >
                      Add to Cart
                    </motion.button>
                  </div>
                </div>
              </motion.div>
            ))
          ) : (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              className={`col-span-1 md:col-span-2 lg:col-span-3 flex flex-col items-center justify-center py-16 px-4 ${
                isDarkMode ? "text-white" : "text-stone-700"
              }`}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-16 w-16 opacity-30 mb-4"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              <h3 className="text-xl font-medium mb-2">
                No items match your filter
              </h3>
              <p className="text-center max-w-md">
                Try adjusting your filter or explore another category
              </p>
              <button
                onClick={() => setActiveFilter(null)}
                className={`mt-6 px-6 py-2 rounded-md ${
                  isDarkMode
                    ? "bg-amber-600 hover:bg-amber-700"
                    : "bg-amber-500 hover:bg-amber-600"
                } text-white transition-colors duration-300`}
              >
                Clear Filter
              </button>
            </motion.div>
          )}
        </motion.div>

        {/* Chef's Recommendation Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className={`mt-24 mb-16 p-8 md:p-12 rounded-2xl relative overflow-hidden ${
            isDarkMode ? "bg-stone-800" : "bg-amber-50"
          }`}
        >
          <div className="absolute top-0 right-0 w-64 h-64 -mt-16 -mr-16 bg-amber-300 rounded-full opacity-20"></div>
          <div className="absolute bottom-0 left-0 w-48 h-48 -mb-12 -ml-12 bg-amber-500 rounded-full opacity-10"></div>

          <div className="relative z-10">
            <div className="flex flex-col md:flex-row gap-10">
              <div className="md:w-1/2">
                <div
                  className={`text-sm uppercase tracking-widest font-medium mb-2 ${
                    isDarkMode ? "text-amber-400" : "text-amber-600"
                  }`}
                >
                  Chef&apos;s Recommendation
                </div>
                <h2
                  className={`text-3xl md:text-4xl font-serif mb-6 ${
                    isDarkMode ? "text-white" : "text-stone-800"
                  }`}
                >
                  Seasonal Sensation
                </h2>

                <div
                  className={`mb-6 ${
                    isDarkMode ? "text-stone-300" : "text-stone-700"
                  }`}
                >
                  <p className="mb-4">
                    Our chef has curated a special seasonal dish using the
                    freshest local ingredients, combining classic techniques
                    with innovative flavors.
                  </p>
                  <p>
                    This limited-time offering is a perfect representation of
                    our commitment to culinary excellence and sustainable
                    dining.
                  </p>
                </div>

                <div className="flex space-x-4 items-center mb-8">
                  <div
                    className={`text-3xl font-serif ${
                      isDarkMode ? "text-amber-400" : "text-amber-600"
                    }`}
                  >
                    $32.50
                  </div>
                  <div className="flex items-center space-x-1">
                    {[...Array(5)].map((_, i) => (
                      <FaStar key={i} className="text-amber-400 w-4 h-4" />
                    ))}
                  </div>
                </div>

                <div className="flex space-x-4">
                  <motion.button
                    variants={buttonVariants}
                    initial="rest"
                    whileHover="hover"
                    whileTap="tap"
                    className={`px-6 py-3 ${
                      isDarkMode
                        ? "bg-amber-600 hover:bg-amber-700"
                        : "bg-amber-500 hover:bg-amber-600"
                    } text-white rounded-md shadow-lg transition-all duration-300`}
                    onClick={() =>
                      addToCart(
                        menuItems.find((item) => item.isChefSpecial) ||
                          menuItems[0]
                      )
                    }
                  >
                    Add to Order
                  </motion.button>

                  <motion.button
                    variants={buttonVariants}
                    initial="rest"
                    whileHover="hover"
                    whileTap="tap"
                    className={`px-6 py-3 border ${
                      isDarkMode
                        ? "border-stone-600 text-white hover:bg-stone-700"
                        : "border-amber-500 text-amber-600 hover:bg-amber-50"
                    } rounded-md transition-all duration-300`}
                  >
                    View Details
                  </motion.button>
                </div>
              </div>

              <div className="md:w-1/2">
                <motion.div
                  className="relative h-[300px] md:h-[400px] rounded-xl overflow-hidden shadow-xl"
                  whileHover={{ scale: 1.02 }}
                  transition={{ type: "spring", stiffness: 300, damping: 15 }}
                >
                  <img
                    src="https://images.unsplash.com/photo-1544025162-d76694265947?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2069&q=80"
                    alt="Chef's special dish"
                    className="w-full h-full object-cover"
                  />

                  <div className="absolute top-4 left-4 px-3 py-1.5 bg-amber-500 text-white text-sm font-medium rounded-md flex items-center">
                    <LuChefHat className="mr-1" /> Signature Dish
                  </div>

                  <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-black/70 to-transparent"></div>
                </motion.div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Awards and Recognitions */}
        <div className="py-12 mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center max-w-3xl mx-auto mb-10"
          >
            <h2
              className={`text-3xl md:text-4xl font-serif mb-4 ${
                isDarkMode ? "text-white" : "text-stone-800"
              }`}
            >
              Acclaim & Recognition
            </h2>
            <p
              className={`${isDarkMode ? "text-stone-400" : "text-stone-600"}`}
            >
              Our dedication to culinary excellence has earned us prestigious
              accolades
            </p>
          </motion.div>

          <div className="flex flex-wrap justify-center gap-8 md:gap-12">
            {[
              { name: "Michelin Star", year: "2023", icon: "🌟" },
              { name: "Gourmet Excellence", year: "2022", icon: "🏆" },
              { name: "Best Fine Dining", year: "2023", icon: "🍽️" },
              { name: "Sustainable Dining", year: "2023", icon: "🌱" },
            ].map((award, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.1 * index }}
                className={`flex flex-col items-center p-6 ${
                  isDarkMode ? "bg-stone-800" : "bg-white"
                } rounded-lg shadow-md hover:shadow-lg transition-all duration-300 w-64`}
              >
                <div className="text-4xl mb-3">{award.icon}</div>
                <h3
                  className={`text-xl font-semibold mb-2 ${
                    isDarkMode ? "text-white" : "text-stone-800"
                  }`}
                >
                  {award.name}
                </h3>
                <div
                  className={`text-sm ${
                    isDarkMode ? "text-amber-400" : "text-amber-500"
                  }`}
                >
                  {award.year}
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Testimonials */}
        <div className="py-16 mb-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center max-w-3xl mx-auto mb-12"
          >
            <h2
              className={`text-3xl md:text-4xl font-serif mb-4 ${
                isDarkMode ? "text-white" : "text-stone-800"
              }`}
            >
              Guest Experiences
            </h2>
            <p
              className={`${isDarkMode ? "text-stone-400" : "text-stone-600"}`}
            >
              What our valued guests have to say about their dining journey
            </p>
          </motion.div>

          <Swiper
            slidesPerView={1}
            spaceBetween={30}
            centeredSlides={true}
            breakpoints={{
              640: {
                slidesPerView: 1.5,
              },
              1024: {
                slidesPerView: 2.5,
              },
            }}
            pagination={{
              clickable: true,
            }}
            modules={[Pagination, Autoplay]}
            autoplay={{
              delay: 5000,
              disableOnInteraction: false,
            }}
            className="testimonial-swiper pb-14"
          >
            {[
              {
                name: "Alexandra R.",
                review:
                  "An absolutely sublime dining experience. Every dish was a masterpiece of flavor and presentation. The staff's attention to detail made our anniversary unforgettable.",
                rating: 5,
                image: "https://randomuser.me/api/portraits/women/44.jpg",
              },
              {
                name: "Michael T.",
                review:
                  "Impeccable service and extraordinary cuisine. The chef's tasting menu was a revelation, with wine pairings that complemented each course perfectly.",
                rating: 5,
                image: "https://randomuser.me/api/portraits/men/32.jpg",
              },
              {
                name: "Sophia L.",
                review:
                  "Beyond expectations! The ambiance, the service, and most importantly, the food were exceptional. The seasonal menu showcases incredible creativity.",
                rating: 5,
                image: "https://randomuser.me/api/portraits/women/68.jpg",
              },
              {
                name: "James W.",
                review:
                  "A culinary journey worth every moment. The attention to sustainable sourcing is evident in the freshness and quality of each magnificent dish.",
                rating: 5,
                image: "https://randomuser.me/api/portraits/men/75.jpg",
              },
            ].map((testimonial, index) => (
              <SwiperSlide key={index}>
                <motion.div
                  whileHover={{ y: -5 }}
                  transition={{ type: "spring", stiffness: 300, damping: 15 }}
                  className={`p-8 rounded-xl ${
                    isDarkMode ? "bg-stone-800" : "bg-white"
                  } shadow-lg h-full`}
                >
                  <div className="flex items-center space-x-4 mb-6">
                    <img
                      src={testimonial.image}
                      alt={testimonial.name}
                      className="w-16 h-16 rounded-full object-cover"
                    />
                    <div>
                      <h3
                        className={`font-medium text-lg ${
                          isDarkMode ? "text-white" : "text-stone-800"
                        }`}
                      >
                        {testimonial.name}
                      </h3>
                      <div className="flex space-x-1 mt-1">
                        {[...Array(5)].map((_, i) => (
                          <FaStar
                            key={i}
                            className={`${
                              i < testimonial.rating
                                ? "text-amber-400"
                                : "text-gray-300"
                            } w-4 h-4`}
                          />
                        ))}
                      </div>
                    </div>
                  </div>
                  <p
                    className={`italic text-lg ${
                      isDarkMode ? "text-stone-300" : "text-stone-600"
                    }`}
                  >
                    &quot;{testimonial.review}&quot;
                  </p>
                </motion.div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>

        {/* Call to Action */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className={`relative overflow-hidden rounded-3xl my-24 ${
            isDarkMode
              ? "bg-gradient-to-br from-amber-900/40 to-stone-900"
              : "bg-gradient-to-br from-amber-500 to-amber-700"
          }`}
        >
          <div className="absolute inset-0 overflow-hidden">
            <svg
              className="absolute -bottom-10 -right-10 w-80 h-80 opacity-10"
              viewBox="0 0 200 200"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fill="white"
                d="M45.7,-77.3C59.1,-71.3,70,-58.8,78.1,-44.5C86.2,-30.2,91.5,-15.1,90.8,-0.4C90.1,14.3,83.4,28.6,73.5,40.1C63.6,51.6,50.5,60.2,36.3,64.5C22.1,68.8,6.9,68.8,-8.2,67.2C-23.4,65.6,-38.5,62.6,-50.2,54.5C-61.9,46.5,-70.2,33.6,-74.9,19.1C-79.5,4.7,-80.5,-11.1,-75.8,-24.9C-71.2,-38.6,-60.9,-50.2,-48.1,-56.6C-35.2,-63,-17.6,-64.2,-0.1,-64C17.5,-63.8,35,-83.3,45.7,-77.3Z"
                transform="translate(100 100)"
              />
            </svg>
          </div>

          <div className="relative z-10 px-8 py-16 md:py-20 text-center">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-serif text-white mb-6">
              Experience Culinary Excellence
            </h2>
            <p className="text-white/80 max-w-2xl mx-auto mb-12 text-lg">
              Join us for an unforgettable dining experience where artistry
              meets flavor. Reserve your table today or order online.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <motion.button
                variants={buttonVariants}
                initial="rest"
                whileHover="hover"
                whileTap="tap"
                onClick={() => setShowReservation(true)}
                className="px-8 py-3.5 bg-white text-amber-600 rounded-lg shadow-lg font-medium text-lg transition-all duration-300"
              >
                Book Your Table
              </motion.button>

              <motion.button
                variants={buttonVariants}
                initial="rest"
                whileHover="hover"
                whileTap="tap"
                onClick={() => setShowCart(true)}
                className="px-8 py-3.5 border-2 border-white text-white rounded-lg font-medium text-lg transition-all duration-300 hover:bg-white/10"
              >
                Order Online
              </motion.button>
            </div>
          </div>
        </motion.div>

        {/* Contact via WhatsApp floating button */}
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 1.5, type: "spring" }}
          className="fixed bottom-6 right-6 z-40"
        >
          <motion.a
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            href="https://wa.me/1234567890"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center w-16 h-16 bg-green-500 hover:bg-green-600 rounded-full shadow-xl text-white transition-all duration-300"
          >
            <FaWhatsapp size={30} />
          </motion.a>
        </motion.div>
      </div>

      {/* Item Detail Modal */}
      <AnimatePresence>
        {selectedItem && (
          <MenuItemModal
            item={selectedItem}
            onClose={() => setSelectedItem(null)}
            onAddToCart={addToCart}
            // isDarkMode={isDarkMode}
          />
        )}
      </AnimatePresence>

      {/* Cart Sidebar */}
      <AnimatePresence>
        {showCart && (
          <CartSidebar
            cart={cart}
            setCart={setCart}
            onClose={() => setShowCart(false)}
            // isDarkMode={isDarkMode}
          />
        )}
      </AnimatePresence>

      {/* Reservation Modal */}
      <AnimatePresence>
        {showReservation && (
          <ReservationForm
            onClose={() => setShowReservation(false)}
            // isDarkMode={isDarkMode}
          />
        )}
      </AnimatePresence>

      {/* Custom CSS for animations */}
      <style jsx global>{`
        @keyframes added-to-cart-pulse {
          0% {
            transform: scale(1);
            box-shadow: 0 0 0 0 rgba(245, 158, 11, 0.7);
          }
          50% {
            transform: scale(1.05);
            box-shadow: 0 0 0 10px rgba(245, 158, 11, 0);
          }
          100% {
            transform: scale(1);
            box-shadow: 0 0 0 0 rgba(245, 158, 11, 0);
          }
        }

        .added-to-cart-premium {
          animation: added-to-cart-pulse 0.8s ease-in-out;
        }

        .hide-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }

        .hide-scrollbar::-webkit-scrollbar {
          display: none;
        }

        /* For swiper pagination */
        .swiper-pagination-bullet {
          width: 10px !important;
          height: 10px !important;
          background: ${isDarkMode
            ? "rgba(255, 255, 255, 0.2)"
            : "rgba(0, 0, 0, 0.2)"} !important;
          opacity: 1 !important;
        }

        .swiper-pagination-bullet-active {
          background: ${isDarkMode ? "#f59e0b" : "#f59e0b"} !important;
        }
      `}</style>
    </div>
  );
};

export default Menu;
