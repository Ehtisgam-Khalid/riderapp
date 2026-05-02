import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ChevronLeft } from "lucide-react";

const SignUp = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    gender: "Male"
  });

  return (
    <div className="flex flex-col min-h-screen bg-white">
      <div className="p-6">
        <button onClick={() => navigate(-1)} className="p-2 border border-gray-100 rounded-xl">
           <ChevronLeft size={24} />
        </button>
      </div>

      <div className="flex-1 px-8">
        <h1 className="text-3xl font-black text-secondary mb-8">Sign up</h1>
        
        <div className="space-y-6">
          <div className="space-y-2">
            <input 
              type="text" 
              placeholder="Name" 
              className="auth-input"
              value={formData.name}
              onChange={(e) => setFormData({...formData, name: e.target.value})}
            />
          </div>
          <div className="space-y-2">
            <input 
              type="email" 
              placeholder="Email" 
              className="auth-input"
              value={formData.email}
              onChange={(e) => setFormData({...formData, email: e.target.value})}
            />
          </div>
          <div className="flex items-center gap-2">
             <div className="h-14 px-4 bg-[#F7F8F9] rounded-xl flex items-center border-none">
                <img src="https://flagcdn.com/w20/pk.png" alt="PK" className="w-6 h-4 object-cover" />
                <span className="ml-2 font-semibold text-secondary">+92</span>
             </div>
             <input 
               type="tel" 
               placeholder="Your mobile number" 
               className="auth-input flex-1"
               value={formData.phone}
               onChange={(e) => setFormData({...formData, phone: e.target.value})}
             />
          </div>
          <div className="relative">
             <select 
               className="auth-input appearance-none bg-[#F7F8F9]"
               value={formData.gender}
               onChange={(e) => setFormData({...formData, gender: e.target.value})}
             >
                <option>Male</option>
                <option>Female</option>
                <option>Other</option>
             </select>
          </div>

          <div className="flex items-start gap-4">
             <input type="checkbox" className="mt-1 w-5 h-5 accent-primary" id="tos" />
             <label htmlFor="tos" className="text-sm text-gray-500 leading-snug">
               By signing up, you agree to the <span className="text-primary font-bold">Terms of service</span> and <span className="text-primary font-bold">Privacy policy</span>.
             </label>
          </div>
        </div>
      </div>

      <div className="p-8 space-y-6">
        <button 
          onClick={() => navigate("/otp", { state: { email: formData.email } })}
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
          Already have an account? <button onClick={() => navigate("/login")} className="text-primary font-bold hover:underline">Sign in</button>
        </p>
      </div>
    </div>
  );
};

export default SignUp;
