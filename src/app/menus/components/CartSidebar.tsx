// src/components/CartSidebar.tsx
import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MenuItem } from "./types/menu";
import { FaMinus, FaPlus, FaTimes, FaTrash } from "react-icons/fa";
import PaymentMethodSelector from "./PaymentMethodSelector";

interface CartSidebarProps {
  cart: { item: MenuItem; quantity: number }[];
  setCart: React.Dispatch<
    React.SetStateAction<{ item: MenuItem; quantity: number }[]>
  >;
  onClose: () => void;
}

const CartSidebar: React.FC<CartSidebarProps> = ({
  cart,
  setCart,
  onClose,
}) => {
  const [paymentStep, setPaymentStep] = useState<
    "cart" | "checkout" | "payment"
  >("cart");
  const [deliveryMethod, setDeliveryMethod] = useState<"pickup" | "delivery">(
    "pickup"
  );
  const [paymentProcessing, setPaymentProcessing] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    note: "",
  });

  const updateQuantity = (itemId: string, newQuantity: number) => {
    if (newQuantity <= 0) {
      setCart(cart.filter((cartItem) => cartItem.item.id !== itemId));
    } else {
      setCart(
        cart.map((cartItem) =>
          cartItem.item.id === itemId
            ? { ...cartItem, quantity: newQuantity }
            : cartItem
        )
      );
    }
  };

  const removeItem = (itemId: string) => {
    setCart(cart.filter((cartItem) => cartItem.item.id !== itemId));
  };

  const calculateSubtotal = () => {
    return cart.reduce((total, cartItem) => {
      return total + cartItem.item.price * cartItem.quantity;
    }, 0);
  };

  const calculateTax = () => {
    return calculateSubtotal() * 0.1; // 10% tax
  };

  const calculateTotal = () => {
    const subtotal = calculateSubtotal();
    const tax = calculateTax();
    const deliveryFee = deliveryMethod === "delivery" ? 5 : 0;

    return subtotal + tax + deliveryFee;
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleCheckout = () => {
    if (paymentStep === "cart") {
      setPaymentStep("checkout");
    } else if (paymentStep === "checkout") {
      setPaymentStep("payment");
    } else {
      // Process payment
      setPaymentProcessing(true);
      setTimeout(() => {
        setPaymentProcessing(false);
        // Clear cart and show success
        setCart([]);
        onClose();
        // Show success toast or notification
      }, 2000);
    }
  };

  const sidebarVariants = {
    hidden: { x: "100%", opacity: 0 },
    visible: {
      x: 0,
      opacity: 1,
      transition: {
        type: "spring",
        damping: 25,
        stiffness: 300,
      },
    },
    exit: {
      x: "100%",
      opacity: 0,
      transition: {
        duration: 0.3,
      },
    },
  };

  const backdropVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
    exit: { opacity: 0 },
  };

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 z-50 bg-black/30 backdrop-blur-sm"
        initial="hidden"
        animate="visible"
        exit="exit"
        variants={backdropVariants}
        onClick={onClose}
      >
        <motion.div
          className="fixed top-0 right-0 bottom-0 w-full sm:w-96 md:w-128 bg-white shadow-xl z-50 flex flex-col"
          variants={sidebarVariants}
          initial="hidden"
          animate="visible"
          exit="exit"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header */}
          <div className="p-4 border-b border-stone-200 flex justify-between items-center">
            <h2 className="text-2xl font-serif text-stone-800">
              {paymentStep === "cart" && "Your Order"}
              {paymentStep === "checkout" && "Checkout"}
              {paymentStep === "payment" && "Payment"}
            </h2>
            <button
              onClick={onClose}
              className="p-2 hover:bg-stone-100 rounded-full text-stone-500 hover:text-stone-800 transition-colors duration-300"
            >
              <FaTimes />
            </button>
          </div>

          {/* Dynamic Content based on payment step */}
          <div className="flex-grow overflow-y-auto">
            {/* Cart Items */}
            {paymentStep === "cart" && (
              <>
                {cart.length === 0 ? (
                  <div className="flex flex-col items-center justify-center h-full text-center p-6">
                    <div className="w-24 h-24 bg-stone-100 rounded-full flex items-center justify-center mb-4">
                      <svg
                        className="w-12 h-12 text-stone-400"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
                        />
                      </svg>
                    </div>
                    <h3 className="text-xl font-medium text-stone-800 mb-2">
                      Your cart is empty
                    </h3>
                    <p className="text-stone-500 mb-6">
                      Add some delicious items from our menu to get started!
                    </p>
                    <button
                      onClick={onClose}
                      className="px-6 py-2 bg-amber-500 hover:bg-amber-600 text-white rounded-lg shadow-md transition-colors duration-300"
                    >
                      Browse Menu
                    </button>
                  </div>
                ) : (
                  <div className="divide-y divide-stone-100">
                    {cart.map((cartItem) => (
                      <div
                        key={cartItem.item.id}
                        className="p-4 flex items-center"
                      >
                        <div className="w-16 h-16 rounded-lg overflow-hidden mr-3 bg-stone-100">
                          <img
                            src={cartItem.item.image}
                            alt={cartItem.item.name}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <div className="flex-grow">
                          <div className="flex justify-between">
                            <h3 className="font-medium text-stone-800">
                              {cartItem.item.name}
                            </h3>
                            <span className="font-medium text-amber-600">
                              $
                              {(
                                cartItem.item.price * cartItem.quantity
                              ).toFixed(2)}
                            </span>
                          </div>
                          <div className="flex items-center justify-between mt-2">
                            <div className="flex items-center border border-stone-300 rounded overflow-hidden">
                              <button
                                onClick={() =>
                                  updateQuantity(
                                    cartItem.item.id,
                                    cartItem.quantity - 1
                                  )
                                }
                                className="px-2 py-1 bg-stone-100 hover:bg-stone-200 text-stone-700 transition-colors duration-300"
                              >
                                <FaMinus size={10} />
                              </button>
                              <span className="px-3 text-sm font-medium text-stone-800">
                                {cartItem.quantity}
                              </span>
                              <button
                                onClick={() =>
                                  updateQuantity(
                                    cartItem.item.id,
                                    cartItem.quantity + 1
                                  )
                                }
                                className="px-2 py-1 bg-stone-100 hover:bg-stone-200 text-stone-700 transition-colors duration-300"
                              >
                                <FaPlus size={10} />
                              </button>
                            </div>
                            <button
                              onClick={() => removeItem(cartItem.item.id)}
                              className="p-1.5 text-red-500 hover:text-red-700 hover:bg-red-50 rounded-full transition-all duration-300"
                            >
                              <FaTrash size={14} />
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </>
            )}

            {/* Checkout Form */}
            {paymentStep === "checkout" && (
              <div className="p-4 space-y-4">
                <div className="space-y-1">
                  <label
                    htmlFor="name"
                    className="text-sm font-medium text-stone-700"
                  >
                    Full Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    className="w-full p-2.5 border border-stone-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500 outline-none transition-all duration-300"
                    required
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label
                      htmlFor="email"
                      className="text-sm font-medium text-stone-700"
                    >
                      Email
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      className="w-full p-2.5 border border-stone-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500 outline-none transition-all duration-300"
                      required
                    />
                  </div>

                  <div className="space-y-1">
                    <label
                      htmlFor="phone"
                      className="text-sm font-medium text-stone-700"
                    >
                      Phone
                    </label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      className="w-full p-2.5 border border-stone-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500 outline-none transition-all duration-300"
                      required
                    />
                  </div>
                </div>

                <div className="space-y-1">
                  <label className="text-sm font-medium text-stone-700">
                    Delivery Method
                  </label>
                  <div className="grid grid-cols-2 gap-4 mt-1">
                    <button
                      onClick={() => setDeliveryMethod("pickup")}
                      className={`py-3 px-4 rounded-lg border text-center transition-all duration-300 ${
                        deliveryMethod === "pickup"
                          ? "bg-amber-50 border-amber-500 text-amber-700"
                          : "border-stone-300 text-stone-600 hover:border-amber-300"
                      }`}
                    >
                      <span className="block font-medium">Pickup</span>
                      <span className="text-xs">Ready in 25 mins</span>
                    </button>

                    <button
                      onClick={() => setDeliveryMethod("delivery")}
                      className={`py-3 px-4 rounded-lg border text-center transition-all duration-300 ${
                        deliveryMethod === "delivery"
                          ? "bg-amber-50 border-amber-500 text-amber-700"
                          : "border-stone-300 text-stone-600 hover:border-amber-300"
                      }`}
                    >
                      <span className="block font-medium">Delivery</span>
                      <span className="text-xs">35-50 mins • $5.00</span>
                    </button>
                  </div>
                </div>

                {deliveryMethod === "delivery" && (
                  <div className="space-y-1">
                    <label
                      htmlFor="address"
                      className="text-sm font-medium text-stone-700"
                    >
                      Delivery Address
                    </label>
                    <input
                      type="text"
                      id="address"
                      name="address"
                      value={formData.address}
                      onChange={handleInputChange}
                      className="w-full p-2.5 border border-stone-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500 outline-none transition-all duration-300"
                      required
                    />
                  </div>
                )}

                <div className="space-y-1">
                  <label
                    htmlFor="note"
                    className="text-sm font-medium text-stone-700"
                  >
                    Order Notes (optional)
                  </label>
                  <textarea
                    id="note"
                    name="note"
                    value={formData.note}
                    onChange={handleInputChange}
                    rows={3}
                    className="w-full p-2.5 border border-stone-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500 outline-none transition-all duration-300"
                  ></textarea>
                </div>
              </div>
            )}

            {/* Payment Options */}
            {paymentStep === "payment" && (
              <div className="p-4">
                <PaymentMethodSelector />
              </div>
            )}
          </div>

          {/* Footer - Order Summary */}
          {cart.length > 0 && (
            <div className="border-t border-stone-200 p-4 bg-stone-50">
              <div className="space-y-2 mb-4">
                <div className="flex justify-between text-stone-600">
                  <span>Subtotal</span>
                  <span>${calculateSubtotal().toFixed(2)}</span>
                </div>

                <div className="flex justify-between text-stone-600">
                  <span>Tax</span>
                  <span>${calculateTax().toFixed(2)}</span>
                </div>

                {deliveryMethod === "delivery" && (
                  <div className="flex justify-between text-stone-600">
                    <span>Delivery Fee</span>
                    <span>$5.00</span>
                  </div>
                )}

                <div className="border-t border-stone-200 pt-2 flex justify-between font-medium text-lg">
                  <span>Total</span>
                  <span className="text-amber-600">
                    ${calculateTotal().toFixed(2)}
                  </span>
                </div>
              </div>

              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={handleCheckout}
                disabled={paymentProcessing}
                className={`w-full py-3 px-4 rounded-lg text-white font-medium shadow-md flex items-center justify-center transition-all duration-300 ${
                  paymentProcessing
                    ? "bg-stone-400 cursor-not-allowed"
                    : "bg-amber-500 hover:bg-amber-600"
                }`}
              >
                {paymentProcessing ? (
                  <>
                    <svg
                      className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      ></circle>
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      ></path>
                    </svg>
                    Processing...
                  </>
                ) : (
                  <>
                    {paymentStep === "cart" && "Proceed to Checkout"}
                    {paymentStep === "checkout" && "Continue to Payment"}
                    {paymentStep === "payment" && "Place Order"}
                  </>
                )}
              </motion.button>
            </div>
          )}
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default CartSidebar;
