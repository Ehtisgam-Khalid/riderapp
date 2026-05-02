import React from "react";
import { useNavigate } from "react-router-dom";

const Welcome = () => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col min-h-screen bg-white">
      <div className="flex-1 flex flex-col items-center justify-center px-8 text-center pt-20">
         <div className="w-full max-w-sm aspect-video bg-gray-50 rounded-[2rem] overflow-hidden mb-12 shadow-sm">
            <img 
               src="https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?q=80&w=1000" 
               alt="Welcome"
               className="w-full h-full object-cover"
            />
         </div>
         <h1 className="text-4xl font-black text-secondary mb-4">Welcome</h1>
         <p className="text-gray-500 max-w-xs leading-relaxed mb-12">
           Have a better sharing experience
         </p>
      </div>

      <div className="p-8 space-y-4 mb-10">
        <button 
          onClick={() => navigate("/signup")}
          className="btn-primary"
        >
          Create an account
        </button>
        <button 
          onClick={() => navigate("/login")}
          className="w-full h-14 border-2 border-primary text-secondary font-bold rounded-xl flex items-center justify-center transition-all active:scale-95"
        >
          Log In
        </button>
      </div>
    </div>
  );
};

export default Welcome;
