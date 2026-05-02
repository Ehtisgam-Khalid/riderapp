import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { useNavigate } from "react-router-dom";
import { ChevronRight } from "lucide-react";

const onboardingData = [
  {
    title: "Anywhere you are",
    description: "Sell houses easily with the help of Listenoryx and to make this line big I am writing more.",
    image: "https://images.unsplash.com/photo-1514316454349-750a7fd3da3a?q=80&w=1000",
  },
  {
    title: "At anytime",
    description: "Sell houses easily with the help of Listenoryx and to make this line big I am writing more.",
    image: "https://images.unsplash.com/photo-1449965408869-eaa3f722e40d?q=80&w=1000",
  },
  {
    title: "Book your car",
    description: "Sell houses easily with the help of Listenoryx and to make this line big I am writing more.",
    image: "https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?q=80&w=1000",
  },
];

const Onboarding = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const navigate = useNavigate();

  const handleNext = () => {
    if (currentStep < onboardingData.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      navigate("/welcome");
    }
  };

  const handleSkip = () => {
    navigate("/welcome");
  };

  return (
    <div className="flex flex-col min-h-screen bg-white">
      <div className="flex justify-end p-6">
        <button onClick={handleSkip} className="text-secondary font-semibold text-lg">Skip</button>
      </div>

      <div className="flex-1 flex flex-col items-center px-8 text-center pt-10">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentStep}
            initial={{ x: 50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: -50, opacity: 0 }}
            transition={{ duration: 0.4 }}
            className="flex flex-col items-center"
          >
            <div className="w-full max-w-sm aspect-square bg-gray-50 rounded-[3rem] overflow-hidden mb-12 shadow-inner">
               <img 
                 src={onboardingData[currentStep].image} 
                 alt={onboardingData[currentStep].title}
                 className="w-full h-full object-cover"
               />
            </div>
            
            <h2 className="text-3xl font-black text-secondary mb-4">
              {onboardingData[currentStep].title}
            </h2>
            <p className="text-gray-500 max-w-xs leading-relaxed">
              {onboardingData[currentStep].description}
            </p>
          </motion.div>
        </AnimatePresence>
      </div>

      <div className="p-12 flex flex-col items-center">
        <div className="flex gap-2 mb-10">
          {onboardingData.map((_, i) => (
            <div 
              key={i} 
              className={`h-2 rounded-full transition-all duration-300 ${
                i === currentStep ? "w-8 bg-primary" : "w-2 bg-gray-200"
              }`}
            />
          ))}
        </div>

        <button 
          onClick={handleNext}
          className="w-20 h-20 bg-primary rounded-full flex items-center justify-center shadow-xl shadow-primary/20 hover:scale-105 active:scale-95 transition-all text-secondary"
        >
          {currentStep === onboardingData.length - 1 ? (
            <span className="font-bold text-lg">Go</span>
          ) : (
            <ChevronRight size={32} strokeWidth={3} />
          )}
        </button>
      </div>
    </div>
  );
};

export default Onboarding;
