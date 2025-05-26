import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  FaTimes,
  FaCalendarAlt,
  FaClock,
  FaUsers,
  FaCheck,
} from "react-icons/fa";

interface ReservationFormProps {
  onClose: () => void;
}

const ReservationForm: React.FC<ReservationFormProps> = ({ onClose }) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    date: "",
    time: "",
    guests: "2",
    occasion: "",
    specialRequests: "",
  });

  const [step, setStep] = useState(1);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Here you would normally submit the data to your backend
    console.log("Reservation data:", formData);
    setIsSubmitted(true);
  };

  const nextStep = () => setStep(step + 1);
  const prevStep = () => setStep(step - 1);

  const availableTimes = [
    "11:30 AM",
    "12:00 PM",
    "12:30 PM",
    "1:00 PM",
    "1:30 PM",
    "5:30 PM",
    "6:00 PM",
    "6:30 PM",
    "7:00 PM",
    "7:30 PM",
    "8:00 PM",
    "8:30 PM",
  ];

  const occasions = [
    "None",
    "Birthday",
    "Anniversary",
    "Business",
    "Date Night",
    "Other",
  ];

  const modalVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
    exit: { opacity: 0 },
  };

  const contentVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { delay: 0.2 } },
    exit: { opacity: 0, y: -20 },
  };

  const formSteps = [
    // Step 1: Select date, time, and guests
    <motion.div
      key="step1"
      initial="hidden"
      animate="visible"
      exit="exit"
      variants={contentVariants}
      className="space-y-6"
    >
      <h2 className="text-2xl font-serif text-stone-800 mb-6">
        Select Date & Time
      </h2>

      <div className="space-y-4">
        <div className="space-y-2">
          <label
            htmlFor="date"
            className="block text-sm font-medium text-stone-700"
          >
            Date
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <FaCalendarAlt className="text-stone-400" />
            </div>
            <input
              type="date"
              id="date"
              name="date"
              value={formData.date}
              onChange={handleChange}
              min={new Date().toISOString().split("T")[0]}
              required
              className="pl-10 w-full p-3 border border-stone-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500 outline-none transition-all duration-300"
            />
          </div>
        </div>

        <div className="space-y-2">
          <label
            htmlFor="time"
            className="block text-sm font-medium text-stone-700"
          >
            Time
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <FaClock className="text-stone-400" />
            </div>
            <select
              id="time"
              name="time"
              value={formData.time}
              onChange={handleChange}
              required
              className="pl-10 w-full p-3 border border-stone-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500 outline-none transition-all duration-300 appearance-none"
            >
              <option value="" disabled>
                Select a time
              </option>
              {availableTimes.map((time) => (
                <option key={time} value={time}>
                  {time}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="space-y-2">
          <label
            htmlFor="guests"
            className="block text-sm font-medium text-stone-700"
          >
            Number of Guests
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <FaUsers className="text-stone-400" />
            </div>
            <select
              id="guests"
              name="guests"
              value={formData.guests}
              onChange={handleChange}
              required
              className="pl-10 w-full p-3 border border-stone-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500 outline-none transition-all duration-300 appearance-none"
            >
              {[1, 2, 3, 4, 5, 6, 7, 8].map((num) => (
                <option key={num} value={num}>
                  {num} {num === 1 ? "person" : "people"}
                </option>
              ))}
              <option value="9+">
                9+ people (Please specify in special requests)
              </option>
            </select>
          </div>
        </div>

        <div className="space-y-2">
          <label
            htmlFor="occasion"
            className="block text-sm font-medium text-stone-700"
          >
            Occasion (Optional)
          </label>
          <select
            id="occasion"
            name="occasion"
            value={formData.occasion}
            onChange={handleChange}
            className="w-full p-3 border border-stone-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500 outline-none transition-all duration-300 appearance-none"
          >
            <option value="" disabled>
              Select an occasion
            </option>
            {occasions.map((occasion) => (
              <option key={occasion} value={occasion}>
                {occasion}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="flex justify-end mt-6">
        <motion.button
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.97 }}
          onClick={nextStep}
          disabled={!formData.date || !formData.time || !formData.guests}
          className="px-6 py-3 bg-amber-500 text-white rounded-lg font-medium shadow-md hover:bg-amber-600 transition-colors duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Next: Your Information
        </motion.button>
      </div>
    </motion.div>,

    // Step 2: Contact information
    <motion.div
      key="step2"
      initial="hidden"
      animate="visible"
      exit="exit"
      variants={contentVariants}
      className="space-y-6"
    >
      <h2 className="text-2xl font-serif text-stone-800 mb-6">
        Your Information
      </h2>

      <div className="space-y-4">
        <div className="space-y-2">
          <label
            htmlFor="name"
            className="block text-sm font-medium text-stone-700"
          >
            Name
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
            className="w-full p-3 border border-stone-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500 outline-none transition-all duration-300"
            placeholder="Your full name"
          />
        </div>

        <div className="space-y-2">
          <label
            htmlFor="email"
            className="block text-sm font-medium text-stone-700"
          >
            Email
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
            className="w-full p-3 border border-stone-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500 outline-none transition-all duration-300"
            placeholder="your.email@example.com"
          />
        </div>

        <div className="space-y-2">
          <label
            htmlFor="phone"
            className="block text-sm font-medium text-stone-700"
          >
            Phone
          </label>
          <input
            type="tel"
            id="phone"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            required
            className="w-full p-3 border border-stone-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500 outline-none transition-all duration-300"
            placeholder="Your phone number"
          />
        </div>

        <div className="space-y-2">
          <label
            htmlFor="specialRequests"
            className="block text-sm font-medium text-stone-700"
          >
            Special Requests (Optional)
          </label>
          <textarea
            id="specialRequests"
            name="specialRequests"
            value={formData.specialRequests}
            onChange={handleChange}
            rows={3}
            className="w-full p-3 border border-stone-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500 outline-none transition-all duration-300"
            placeholder="Allergies, dietary restrictions, special occasions, etc."
          />
        </div>
      </div>

      <div className="flex justify-between mt-6">
        <motion.button
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.97 }}
          onClick={prevStep}
          className="px-6 py-3 bg-stone-200 text-stone-800 rounded-lg font-medium shadow-md hover:bg-stone-300 transition-colors duration-300"
        >
          Back
        </motion.button>

        <motion.button
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.97 }}
          onClick={handleSubmit}
          disabled={!formData.name || !formData.email || !formData.phone}
          className="px-6 py-3 bg-amber-500 text-white rounded-lg font-medium shadow-md hover:bg-amber-600 transition-colors duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Complete Reservation
        </motion.button>
      </div>
    </motion.div>,

    // Confirmation step
    <motion.div
      key="confirmation"
      initial="hidden"
      animate="visible"
      variants={contentVariants}
      className="text-center py-8"
    >
      <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-green-100 flex items-center justify-center">
        <FaCheck className="text-green-600 text-3xl" />
      </div>

      <h2 className="text-2xl font-serif text-stone-800 mb-4">
        Reservation Confirmed!
      </h2>

      <p className="text-stone-600 mb-6">
        Thank you for your reservation, {formData.name}. We&apos;ve sent a
        confirmation to {formData.email}.
      </p>

      <div className="bg-stone-100 rounded-lg p-6 max-w-md mx-auto mb-6">
        <div className="grid grid-cols-2 gap-4 text-left">
          <div>
            <p className="text-sm text-stone-500">Date</p>
            <p className="font-medium">{formData.date}</p>
          </div>
          <div>
            <p className="text-sm text-stone-500">Time</p>
            <p className="font-medium">{formData.time}</p>
          </div>
          <div>
            <p className="text-sm text-stone-500">Guests</p>
            <p className="font-medium">{formData.guests}</p>
          </div>
          <div>
            <p className="text-sm text-stone-500">Occasion</p>
            <p className="font-medium">{formData.occasion || "None"}</p>
          </div>
        </div>
      </div>

      <motion.button
        whileHover={{ scale: 1.03 }}
        whileTap={{ scale: 0.97 }}
        onClick={onClose}
        className="px-6 py-3 bg-amber-500 text-white rounded-lg font-medium shadow-md hover:bg-amber-600 transition-colors duration-300"
      >
        Close
      </motion.button>
    </motion.div>,
  ];

  return (
    <AnimatePresence>
      <motion.div
        initial="hidden"
        animate="visible"
        exit="exit"
        variants={modalVariants}
        className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4"
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.9 }}
          transition={{ type: "spring", stiffness: 300, damping: 30 }}
          className="bg-white rounded-xl shadow-2xl w-full max-w-lg overflow-hidden"
        >
          {/* Header */}
          <div className="bg-amber-500 px-6 py-4 flex justify-between items-center">
            <h3 className="text-xl font-serif text-white">
              Reserve Your Table
            </h3>
            <button
              onClick={onClose}
              className="text-white hover:text-stone-200 transition-colors duration-300"
            >
              <FaTimes />
            </button>
          </div>

          {/* Form Content */}
          <div className="p-6">
            <AnimatePresence mode="wait">
              {isSubmitted ? formSteps[2] : formSteps[step - 1]}
            </AnimatePresence>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default ReservationForm;
