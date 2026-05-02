import React from "react";
import { useNavigate } from "react-router-dom";
import { ChevronLeft, ChevronRight, Lock, Globe, Shield, Phone, Trash2 } from "lucide-react";

const Settings = () => {
  const navigate = useNavigate();

  const sections = [
    { icon: <Lock size={20} />, label: "Change Password" },
    { icon: <Globe size={20} />, label: "Change Language" },
    { icon: <Shield size={20} />, label: "Privacy Policy" },
    { icon: <Phone size={20} />, label: "Contact Us" },
    { icon: <Trash2 size={20} className="text-red-500" />, label: "Delete Account", color: "text-red-500" },
  ];

  return (
    <div className="flex flex-col min-h-screen bg-white">
      <div className="p-6 flex items-center gap-4">
        <button onClick={() => navigate(-1)} className="p-2 border border-gray-100 rounded-xl">
           <ChevronLeft size={24} />
        </button>
        <h2 className="text-xl font-bold flex-1 text-center pr-10">Settings</h2>
      </div>

      <div className="flex-1 px-6 pt-6 space-y-2">
         {sections.map((item, i) => (
           <button 
             key={i}
             className="w-full flex items-center gap-4 p-5 hover:bg-gray-50 rounded-2xl transition-all group"
           >
              <div className={`p-2 bg-[#F7F8F9] rounded-xl group-hover:bg-primary/20 transition-colors ${item.color || "text-secondary"}`}>
                 {item.icon}
              </div>
              <span className={`flex-1 text-left font-bold text-sm ${item.color || "text-secondary"}`}>
                 {item.label}
              </span>
              <ChevronRight size={18} className="text-gray-200" />
           </button>
         ))}
      </div>

      <div className="p-8 text-center">
         <p className="text-[10px] font-black text-gray-300 uppercase tracking-widest italic">Easy Rider v1.0.4 - Production</p>
      </div>
    </div>
  );
};

export default Settings;
