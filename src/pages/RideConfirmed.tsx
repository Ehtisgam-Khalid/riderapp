import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { CheckCircle } from "lucide-react";
import { motion } from "motion/react";

const RideConfirmed = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      navigate("/tracking");
    }, 3000);
    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-white p-8">
      <motion.div 
        initial={{ scale: 0.5, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className="w-40 h-40 bg-primary/10 rounded-full flex items-center justify-center mb-12"
      >
         <CheckCircle size={80} className="text-primary" strokeWidth={3} />
      </motion.div>
      
      <h1 className="text-3xl font-black text-secondary mb-6">Thank you</h1>
      <p className="text-gray-500 text-center max-w-xs leading-relaxed mb-12 font-medium">
        Your booking has been placed sent to Md. Sharif Ahmed
      </p>

      <button 
        onClick={() => navigate("/tracking")}
        className="btn-primary"
      >
        Confirm Ride
      </button>
    </div>
  );
};

export default RideConfirmed;
