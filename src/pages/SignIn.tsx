import React from "react";
import { useNavigate } from "react-router-dom";
import { ChevronLeft } from "lucide-react";

const SignIn = () => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col min-h-screen bg-white">
      <div className="p-6">
        <button onClick={() => navigate(-1)} className="p-2 border border-gray-100 rounded-xl">
           <ChevronLeft size={24} />
        </button>
      </div>

      <div className="flex-1 px-8">
        <h1 className="text-3xl font-black text-secondary mb-8">Sign in</h1>
        
        <div className="space-y-6">
          <input type="text" placeholder="Email or Phone Number" className="auth-input" />
          <div className="relative">
            <input type="password" placeholder="Enter Your Password" className="auth-input pr-12" />
          </div>
          <div className="flex justify-end">
            <button className="text-sm font-bold text-red-500">Forget password?</button>
          </div>
        </div>
      </div>

      <div className="p-8 space-y-6 pb-12">
        <button 
          onClick={() => navigate("/user")}
          className="btn-primary"
        >
          Sign Up
        </button>
        
        <div className="flex items-center gap-4 text-gray-300">
           <div className="flex-1 h-px bg-gray-200"></div>
           <span className="text-sm font-medium text-gray-400">or</span>
           <div className="flex-1 h-px bg-gray-200"></div>
        </div>

        <div className="flex justify-center gap-6">
           {['google', 'facebook', 'apple'].map(social => (
             <button key={social} className="w-16 h-16 rounded-2xl border border-gray-100 flex items-center justify-center shadow-sm">
                <img src={`https://www.svgrepo.com/show/355037/${social}.svg`} className="w-6 h-6" alt={social} />
             </button>
           ))}
        </div>

        <p className="text-center text-gray-500 font-medium">
          Don't have an account? <button onClick={() => navigate("/signup")} className="text-primary font-bold hover:underline">Sign Up</button>
        </p>
      </div>
    </div>
  );
};

export default SignIn;
