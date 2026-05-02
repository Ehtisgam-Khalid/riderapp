import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ChevronLeft, Eye, EyeOff } from "lucide-react";

const SetPassword = () => {
  const navigate = useNavigate();
  const [showPass, setShowPass] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const handleRegister = () => {
    navigate("/user");
  };

  return (
    <div className="flex flex-col min-h-screen bg-white">
      <div className="p-6">
        <button onClick={() => navigate(-1)} className="p-2 border border-gray-100 rounded-xl">
           <ChevronLeft size={24} />
        </button>
      </div>

      <div className="flex-1 px-8">
        <h1 className="text-3xl font-black text-secondary mb-4">Set password</h1>
        <p className="text-gray-500 mb-10">Set your password</p>
        
        <div className="space-y-6">
          <div className="relative">
            <input 
              type={showPass ? "text" : "password"} 
              placeholder="Enter Your Password" 
              className="auth-input pr-12"
            />
            <button 
              onClick={() => setShowPass(!showPass)}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400"
            >
              {showPass ? <EyeOff size={20} /> : <Eye size={20} />}
            </button>
          </div>
          <div className="relative">
            <input 
              type={showConfirm ? "text" : "password"} 
              placeholder="Confirm Password" 
              className="auth-input pr-12"
            />
            <button 
              onClick={() => setShowConfirm(!showConfirm)}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400"
            >
              {showConfirm ? <EyeOff size={20} /> : <Eye size={20} />}
            </button>
          </div>
          <p className="text-xs text-gray-400 italic">Atleast 1 number or a special character</p>
        </div>
      </div>

      <div className="p-8 pb-12">
        <button 
          onClick={handleRegister}
          className="btn-primary"
        >
          Register
        </button>
        
        <div className="mt-8 grid grid-cols-10 gap-x-1 gap-y-2">
           {"QWERTYUIOPASDFGHJKLZXCVBNM".split("").map((key, i) => (
             <button key={i} className="h-10 text-sm font-bold text-secondary bg-[#F7F8F9] rounded-lg active:scale-90 transition-transform">
                {key}
             </button>
           ))}
        </div>
      </div>
    </div>
  );
};

export default SetPassword;
