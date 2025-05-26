"use client";
// src/pages/Menu.tsx
import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { MenuItem } from "./types/menu";
import MenuItemCard from "./MenuItemCard";
import MenuItemModal from "./MenuItemModal";
import ReservationForm from "./ReservationForm";
import CartSidebar from "./CartSidebar";
import { categories, menuItems } from "./data/menuData";
import { FaWhatsapp } from "react-icons/fa";

const Menu: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>(
    categories[0].id
  );
  const [selectedItem, setSelectedItem] = useState<MenuItem | null>(null);
  const [showCart, setShowCart] = useState<boolean>(false);
  const [showReservation, setShowReservation] = useState<boolean>(false);
  const [cart, setCart] = useState<{ item: MenuItem; quantity: number }[]>([]);

  const { ref, inView } = useInView({
    threshold: 0.2,
    triggerOnce: true,
  });

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

    // Show animation feedback
    const element = document.getElementById(`menu-item-${item.id}`);
    if (element) {
      element.classList.add("added-to-cart");
      setTimeout(() => {
        element.classList.remove("added-to-cart");
      }, 500);
    }
  };

  const filteredItems = menuItems.filter(
    (item) => item.categoryId === selectedCategory
  );

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 15,
      },
    },
  };

  return (
    <div className="bg-stone-100 min-h-screen !font-[family-name:var(--font-urbanist)]">
      {/* Hero Section */}
      <div className="relative h-96 overflow-hidden">
        <div className="absolute inset-0 bg-black/30 z-10"></div>
        <motion.div
          initial={{ scale: 1.1 }}
          animate={{ scale: 1 }}
          transition={{ duration: 10, ease: "easeOut" }}
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage:
              "url('https://plus.unsplash.com/premium_photo-1700053460872-79957d639296?q=80&w=4142&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')",
          }}
        ></motion.div>
        <div className="absolute inset-0 z-20 flex flex-col items-center justify-center text-white">
          <motion.h1
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
            className="text-5xl md:text-6xl font-serif tracking-wider mb-4"
          >
            Our Menu
          </motion.h1>
          <motion.div
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 1, ease: "easeInOut", delay: 0.6 }}
            className="h-px w-32 bg-gold my-4"
          ></motion.div>
          <motion.p
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, ease: "easeOut", delay: 0.8 }}
            className="text-lg md:text-xl max-w-2xl text-center px-4"
          >
            Experience culinary artistry with locally sourced ingredients and
            seasonal inspirations
          </motion.p>
        </div>
      </div>

      {/* Category Navigation */}
      <div className="sticky top-0 z-30 bg-white shadow-md">
        <div className="container mx-auto px-4 py-4">
          <div className="flex justify-between items-center">
            <motion.div
              className="flex items-center space-x-1 md:space-x-3 overflow-x-auto hide-scrollbar py-2"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              {categories.map((category) => (
                <motion.button
                  key={category.id}
                  whileTap={{ scale: 0.95 }}
                  whileHover={{ y: -2 }}
                  onClick={() => setSelectedCategory(category.id)}
                  className={`px-4 py-2 whitespace-nowrap rounded-full text-sm md:text-base transition-all duration-300 ${
                    selectedCategory === category.id
                      ? "bg-amber-500 text-white shadow-lg"
                      : "bg-stone-100 text-stone-700 hover:bg-stone-200"
                  }`}
                >
                  {category.name}
                </motion.button>
              ))}
            </motion.div>

            <div className="flex space-x-2">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setShowReservation(true)}
                className="px-4 py-2 bg-amber-600 hover:bg-amber-700 text-white rounded-full text-sm md:text-base shadow-md transition-all duration-300"
              >
                Book a Table
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setShowCart(true)}
                className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-full text-sm md:text-base shadow-md transition-all duration-300 relative"
              >
                Order Online
                {cart.length > 0 && (
                  <span className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs">
                    {cart.reduce((acc, item) => acc + item.quantity, 0)}
                  </span>
                )}
              </motion.button>
            </div>
          </div>
        </div>
      </div>

      {/* Current Category Description */}
      <div className="container mx-auto px-4 py-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center max-w-3xl mx-auto mb-8"
        >
          <h2 className="text-3xl text-stone-800 mb-4">
            {categories.find((c) => c.id === selectedCategory)?.name}
          </h2>
          <p className="text-stone-600">
            {categories.find((c) => c.id === selectedCategory)?.description}
          </p>
          <div className="h-0.5 w-20 bg-amber-500 mx-auto mt-6"></div>
        </motion.div>

        {/* Menu Items Grid */}
        <motion.div
          ref={ref}
          variants={containerVariants}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-12"
        >
          {filteredItems.map((item) => (
            <motion.div
              key={item.id}
              variants={itemVariants}
              id={`menu-item-${item.id}`}
              whileHover={{ y: -5, transition: { duration: 0.2 } }}
              className="bg-white rounded-lg overflow-hidden shadow-lg transition-all duration-300 transform hover:shadow-xl"
            >
              <MenuItemCard
                item={item}
                onClick={() => setSelectedItem(item)}
                onAddToCart={() => addToCart(item)}
              />
            </motion.div>
          ))}
        </motion.div>

        {/* Contact via WhatsApp floating button */}
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 1.5, type: "spring" }}
          className="fixed bottom-6 right-6 z-40"
        >
          <a
            href="https://wa.me/1234567890"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center w-14 h-14 bg-green-500 hover:bg-green-600 rounded-full shadow-lg text-white transition-all duration-300 hover:scale-110"
          >
            <FaWhatsapp size={28} />
          </a>
        </motion.div>
      </div>

      {/* Item Detail Modal */}
      <AnimatePresence>
        {selectedItem && (
          <MenuItemModal
            item={selectedItem}
            onClose={() => setSelectedItem(null)}
            onAddToCart={addToCart}
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
          />
        )}
      </AnimatePresence>

      {/* Reservation Modal */}
      <AnimatePresence>
        {showReservation && (
          <ReservationForm onClose={() => setShowReservation(false)} />
        )}
      </AnimatePresence>
    </div>
  );
};

export default Menu;
