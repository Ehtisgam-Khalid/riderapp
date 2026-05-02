import React, { useEffect } from "react";
import { motion } from "motion/react";
import { useNavigate } from "react-router-dom";
import { Car } from "lucide-react";

const LandingPage = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      navigate("/onboarding");
    }, 2500);
    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-primary">
      <motion.div
        initial={{ scale: 0.5, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="flex flex-col items-center"
      >
        <div className="w-24 h-24 bg-white rounded-[2.5rem] flex items-center justify-center shadow-2xl mb-8">
           <Car className="text-secondary" size={48} />
        </div>
        <h1 className="text-5xl font-black text-secondary tracking-tighter italic uppercase">
          Easy <span className="text-white">Rider</span>
        </h1>
      </motion.div>

      <div className="absolute bottom-16 flex gap-3">
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.3, 1, 0.3],
          }}
          transition={{ duration: 1.5, repeat: Infinity, delay: 0 }}
          className="w-3 h-3 bg-secondary rounded-full"
        />
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.3, 1, 0.3],
          }}
          transition={{ duration: 1.5, repeat: Infinity, delay: 0.3 }}
          className="w-3 h-3 bg-secondary rounded-full"
        />
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.3, 1, 0.3],
          }}
          transition={{ duration: 1.5, repeat: Infinity, delay: 0.6 }}
          className="w-3 h-3 bg-secondary rounded-full"
        />
      </div>
    </div>
  );
};

export default LandingPage;
