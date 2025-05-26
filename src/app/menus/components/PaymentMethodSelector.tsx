// src/components/PaymentMethodSelector.tsx
import React, { useState } from "react";
import { motion } from "framer-motion";

interface PaymentMethod {
  id: string;
  name: string;
  logo: string;
}

const PaymentMethodSelector: React.FC = () => {
  const [selectedMethod, setSelectedMethod] = useState<string>("paystack");
  const [cardNumber, setCardNumber] = useState<string>("");
  const [cardExpiry, setCardExpiry] = useState<string>("");
  const [cardCvv, setCardCvv] = useState<string>("");
  const [cardName, setCardName] = useState<string>("");

  const paymentMethods: PaymentMethod[] = [
    {
      id: "paystack",
      name: "Paystack",
      logo: "/images/payment/paystack.svg",
    },
    {
      id: "flutterwave",
      name: "Flutterwave",
      logo: "/images/payment/flutterwave.svg",
    },
    {
      id: "card",
      name: "Credit Card",
      logo: "/images/payment/credit-card.svg",
    },
  ];

  const formatCardNumber = (value: string): string => {
    const v = value.replace(/\s+/g, "").replace(/[^0-9]/gi, "");
    const matches = v.match(/\d{4,16}/g);
    const match = (matches && matches[0]) || "";
    const parts = [];

    for (let i = 0, len = match.length; i < len; i += 4) {
      parts.push(match.substring(i, i + 4));
    }

    if (parts.length) {
      return parts.join(" ");
    } else {
      return value;
    }
  };

  const formatExpiry = (value: string): string => {
    const v = value.replace(/\s+/g, "").replace(/[^0-9]/gi, "");

    if (v.length > 2) {
      return `${v.substring(0, 2)}/${v.substring(2, 4)}`;
    }

    return value;
  };

  const handleCardNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formatted = formatCardNumber(e.target.value);
    setCardNumber(formatted.substring(0, 19)); // Limit to 19 characters (16 digits + 3 spaces)
  };

  const handleExpiryChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formatted = formatExpiry(e.target.value);
    setCardExpiry(formatted.substring(0, 5)); // Limit to 5 characters (MM/YY)
  };

  const handleCvvChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const v = e.target.value.replace(/\s+/g, "").replace(/[^0-9]/gi, "");
    setCardCvv(v.substring(0, 3)); // Limit to 3 characters
  };

  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <h3 className="font-medium text-stone-800">Select Payment Method</h3>
        <div className="grid grid-cols-3 gap-3">
          {paymentMethods.map((method) => (
            <motion.button
              key={method.id}
              whileHover={{ y: -2 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => setSelectedMethod(method.id)}
              className={`p-4 border rounded-lg flex flex-col items-center justify-center transition-all duration-300 ${
                selectedMethod === method.id
                  ? "border-amber-500 bg-amber-50"
                  : "border-stone-200 hover:border-amber-300"
              }`}
            >
              <div className="w-12 h-12 mb-2 flex items-center justify-center">
                <img
                  src="/api/placeholder/48/48"
                  alt={method.name}
                  className="max-w-full max-h-full"
                />
              </div>
              <span
                className={`text-sm ${
                  selectedMethod === method.id
                    ? "text-amber-700"
                    : "text-stone-600"
                }`}
              >
                {method.name}
              </span>
            </motion.button>
          ))}
        </div>
      </div>

      {/* Credit Card Form */}
      {selectedMethod === "card" && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="space-y-4"
        >
          <div className="p-4 rounded-lg bg-gradient-to-r from-gray-800 to-gray-900 text-white shadow-lg">
            <div className="flex justify-between mb-6">
              <div className="text-xs uppercase tracking-wider opacity-80">
                Credit Card
              </div>
              <div className="flex space-x-1">
                <div className="w-8 h-5 bg-white/20 rounded"></div>
                <div className="w-8 h-5 bg-white/20 rounded"></div>
              </div>
            </div>

            <div className="mb-4">
              <div className="text-xs opacity-70 mb-1">Card Number</div>
              <div className="font-mono text-lg">
                {cardNumber || "•••• •••• •••• ••••"}
              </div>
            </div>

            <div className="flex justify-between">
              <div>
                <div className="text-xs opacity-70 mb-1">Card Holder</div>
                <div className="font-mono uppercase text-sm">
                  {cardName || "YOUR NAME"}
                </div>
              </div>

              <div>
                <div className="text-xs opacity-70 mb-1">Expires</div>
                <div className="font-mono text-sm">{cardExpiry || "MM/YY"}</div>
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <div className="space-y-1">
              <label
                htmlFor="cardName"
                className="text-sm font-medium text-stone-700"
              >
                Cardholder Name
              </label>
              <input
                type="text"
                id="cardName"
                value={cardName}
                onChange={(e) => setCardName(e.target.value)}
                className="w-full p-2.5 border border-stone-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500 outline-none transition-all duration-300"
                placeholder="Name on card"
                required
              />
            </div>

            <div className="space-y-1">
              <label
                htmlFor="cardNumber"
                className="text-sm font-medium text-stone-700"
              >
                Card Number
              </label>
              <input
                type="text"
                id="cardNumber"
                value={cardNumber}
                onChange={handleCardNumberChange}
                className="w-full p-2.5 border border-stone-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500 outline-none transition-all duration-300"
                placeholder="1234 5678 9012 3456"
                required
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-1">
                <label
                  htmlFor="cardExpiry"
                  className="text-sm font-medium text-stone-700"
                >
                  Expiry Date
                </label>
                <input
                  type="text"
                  id="cardExpiry"
                  value={cardExpiry}
                  onChange={handleExpiryChange}
                  className="w-full p-2.5 border border-stone-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500 outline-none transition-all duration-300"
                  placeholder="MM/YY"
                  required
                />
              </div>

              <div className="space-y-1">
                <label
                  htmlFor="cardCvv"
                  className="text-sm font-medium text-stone-700"
                >
                  CVV
                </label>
                <input
                  type="password"
                  id="cardCvv"
                  value={cardCvv}
                  onChange={handleCvvChange}
                  className="w-full p-2.5 border border-stone-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500 outline-none transition-all duration-300"
                  placeholder="123"
                  required
                />
              </div>
            </div>
          </div>
        </motion.div>
      )}

      {/* Paystack Form */}
      {selectedMethod === "paystack" && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="p-4 border border-green-200 rounded-lg bg-green-50"
        >
          <div className="flex items-center space-x-3 mb-4">
            <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-sm">
              <img
                src="/api/placeholder/32/32"
                alt="Paystack"
                className="w-6 h-6"
              />
            </div>
            <div>
              <h3 className="font-medium text-green-800">Paystack Payment</h3>
              <p className="text-sm text-green-600">
                Secure payment via Paystack
              </p>
            </div>
          </div>
          <p className="text-sm text-green-700 mb-3">
            You&apos;ll be redirected to Paystack&apos;s secure payment page to
            complete your purchase.
          </p>
        </motion.div>
      )}

      {/* Flutterwave Form */}
      {selectedMethod === "flutterwave" && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="p-4 border border-blue-200 rounded-lg bg-blue-50"
        >
          <div className="flex items-center space-x-3 mb-4">
            <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-sm">
              <img
                src="/api/placeholder/32/32"
                alt="Flutterwave"
                className="w-6 h-6"
              />
            </div>
            <div>
              <h3 className="font-medium text-blue-800">Flutterwave Payment</h3>
              <p className="text-sm text-blue-600">
                Fast and secure payments across Africa
              </p>
            </div>
          </div>
          <p className="text-sm text-blue-700 mb-3">
            You&apos;ll be redirected to Flutterwave&apos;s secure payment page
            to complete your purchase with your preferred payment method.
          </p>
          <div className="mt-4 flex flex-wrap gap-2">
            <div className="px-3 py-1 bg-white rounded border border-blue-100 text-xs text-blue-800">
              Debit/Credit Card
            </div>
            <div className="px-3 py-1 bg-white rounded border border-blue-100 text-xs text-blue-800">
              Bank Transfer
            </div>
            <div className="px-3 py-1 bg-white rounded border border-blue-100 text-xs text-blue-800">
              Mobile Money
            </div>
            <div className="px-3 py-1 bg-white rounded border border-blue-100 text-xs text-blue-800">
              USSD
            </div>
          </div>
        </motion.div>
      )}
    </div>
  );
};

export default PaymentMethodSelector;
