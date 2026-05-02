import React from "react";
import { useNavigate } from "react-router-dom";
import { ChevronLeft, Share2, Copy } from "lucide-react";
import toast from "react-hot-toast";

const Referral = () => {
  const navigate = useNavigate();
  const code = "RkMFucd";

  const handleCopy = () => {
    navigator.clipboard.writeText(code);
    toast.success("Code copied!");
  };

  return (
    <div className="flex flex-col min-h-screen bg-white">
      <div className="p-6 flex items-center gap-4">
        <button onClick={() => navigate(-1)} className="p-2 border border-gray-100 rounded-xl">
           <ChevronLeft size={24} />
        </button>
        <h2 className="text-xl font-bold flex-1 text-center pr-10">Referral</h2>
      </div>

      <div className="flex-1 px-8 flex flex-col items-center justify-center text-center">
         <div className="w-48 h-48 bg-primary/5 rounded-full flex items-center justify-center mb-10">
            <Share2 size={64} className="text-primary" />
         </div>
         <h1 className="text-3xl font-black text-secondary mb-4 italic uppercase tracking-tighter">Refer a friend and Earn $20</h1>
         <p className="text-gray-400 font-medium leading-relaxed mb-12 max-w-xs">
            Invite your friends to use Easy Rider and earn credits for every referral!
         </p>

         <div className="w-full relative">
            <input 
              type="text" 
              readOnly 
              value={code} 
              className="auth-input font-mono font-bold text-lg text-center tracking-[0.2em]" 
            />
            <button 
              onClick={handleCopy}
              className="absolute right-4 top-1/2 -translate-y-1/2 p-2 text-primary"
            >
               <Copy size={20} />
            </button>
         </div>
      </div>

      <div className="p-8 pb-12">
         <button 
           className="btn-primary"
         >
           Invite
         </button>
      </div>
    </div>
  );
};

export default Referral;
