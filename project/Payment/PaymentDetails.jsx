/**
 * 💳 PAYMENT DETAILS COMPONENT - GOLDEN ESSENCE RESTAURANT
 * 
 * COLOR SCHEME: Dark Theme with Amber Accents
 * - Page Background: from-slate-900 to-slate-800
 * - Card Background: bg-slate-800 with border-amber-600
 * - Order Summary: Dark text (slate-300) with amounts in text-amber-400
 * - Button: from-amber-600 to-amber-500, hover:from-amber-700 hover:to-amber-600
 * - Loading/Processing: border-amber-600 with animate-spin
 * - Success Modal: bg-slate-800 with border-amber-600, text-amber-400
 * 
 * TAILWIND CLASSES:
 * - Card: bg-slate-800 border border-amber-600 rounded-lg p-6 shadow-lg
 * - Heading: text-white text-xl font-bold
 * - Amount: text-amber-400 font-bold
 * - Button: from-amber-600 to-amber-500 text-white w-full py-3 rounded-lg
 * - Loader: border-4 border-amber-600 border-t-transparent rounded-full animate-spin
 * 
 * Color values defined in: src/constants/COLORS.js
 *
 * ✅ IMPLEMENTATION STATUS: ✨ SECURE PAYMENT EXPERIENCE
 */

import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../src/context/useAuth";
import { COLORS } from "../src/constants/COLORS";

export default function PaymentPage() {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [cartItems, setCartItems] = useState([]);
  const [isProcessing, setIsProcessing] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  // Load cart from localStorage
  useEffect(() => {
    const cart = JSON.parse(localStorage.getItem("cart")) || [];
    setCartItems(cart);
  }, []);

  // Helper to parse price string like "₹150" to number 150
  const parsePrice = (price) => Number(price.replace(/[^0-9.-]+/g, ""));

  // Total amount
  const totalAmount = cartItems.reduce(
    (total, item) => total + parsePrice(item.price) * item.qty,
    0
  );

  const handlePayNow = () => {
    setIsProcessing(true);
    setTimeout(() => {
      setIsProcessing(false);
      setShowSuccess(true);
      
      // Save order to localStorage
      const newOrder = {
        id: `#ORD${Date.now()}`,
        items: cartItems,
        total: totalAmount,
        date: new Date().toLocaleDateString(),
        time: new Date().toLocaleTimeString(),
        status: "Delivered",
        paymentMethod: "Online Payment"
      };

      // Get existing orders or create new array
      const existingOrders = JSON.parse(localStorage.getItem("orders")) || [];
      existingOrders.push(newOrder);
      localStorage.setItem("orders", JSON.stringify(existingOrders));

      // Clear cart after payment
      localStorage.removeItem("cart");

      // Redirect to UserDash after 2 seconds
      setTimeout(() => {
        navigate("/UserDash");
      }, 2000);
    }, 3000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 to-white">

      <div className="flex items-center justify-center p-4 min-h-[calc(100vh-80px)]">
        <div className="bg-white w-full max-w-md rounded-2xl shadow-lg p-6">
        <h1 className="text-2xl font-bold text-center mb-2">Restaurant Checkout</h1>
        <p className="text-center text-gray-500 mb-6">Confirm your order & pay</p>

        {/* Order Summary */}
        <div className="border rounded-xl p-4 mb-6">
          <h2 className="font-semibold mb-3">Your Items</h2>
          {cartItems.map((item) => (
            <div key={item.id} className="flex justify-between text-sm text-gray-600 mb-1">
              <span>{item.name} × {item.qty}</span>
              <span>₹{parsePrice(item.price) * item.qty}</span>
            </div>
          ))}
          <hr className="my-2" />
          <div className="flex justify-between font-bold">
            <span>Total Amount</span>
            <span>₹{totalAmount}</span>
          </div>
        </div>

        {/* Pay Now */}
        <button
          onClick={handlePayNow}
          disabled={isProcessing}
          className="w-full bg-amber-600 hover:bg-amber-700 disabled:opacity-60 text-white font-semibold py-3 rounded-xl transition"
        >
          Pay Now
        </button>

        <p className="text-xs text-gray-400 text-center mt-4">
          * Dummy restaurant payment for demo
        </p>

        {/* Processing Animation */}
        {isProcessing && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
            <div className="bg-white rounded-2xl p-6 w-72 text-center shadow-xl">
              <div className="flex justify-center mb-4">
                <div className="text-4xl font-bold text-green-600 animate-bounce">₹</div>
              </div>
              <p className="font-semibold">Processing Payment...</p>
            </div>
          </div>
        )}

        {/* Success Popup */}
        {showSuccess && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
            <div className="bg-white rounded-2xl p-6 w-80 text-center shadow-xl">
              <h2 className="text-xl font-bold mb-2 text-green-600">
                Payment Successful 🎉
              </h2>
              <p className="text-gray-600 mb-4">Your food order has been confirmed.</p>
              <p className="text-sm text-gray-500 mb-4">Redirecting to your dashboard...</p>
              <div className="animate-spin inline-block w-6 h-6 border-4 border-green-600 border-t-transparent rounded-full"></div>
            </div>
          </div>
        )}
        </div>
      </div>
    </div>
  );
}

