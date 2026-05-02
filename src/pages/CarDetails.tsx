import React from "react";
import { useNavigate } from "react-router-dom";
import { ChevronLeft, Star, Clock, Zap, Target, ShieldCheck, ChevronRight } from "lucide-react";

const CarDetails = () => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col min-h-screen bg-white">
      <div className="p-6 flex items-center gap-4">
        <button onClick={() => navigate(-1)} className="p-2 border border-gray-100 rounded-xl">
           <ChevronLeft size={24} />
        </button>
        <h2 className="text-xl font-bold flex-1 text-center pr-10">Mustang Shelby GT</h2>
      </div>

      <div className="flex-1 overflow-y-auto">
         <div className="px-6 mb-8 relative">
            <div className="flex justify-between items-center mb-6">
               <div className="flex items-center gap-2">
                  <Star size={16} className="text-primary fill-primary" />
                  <span className="font-bold">4.9</span>
                  <span className="text-gray-400 text-xs">(531 reviews)</span>
               </div>
            </div>
            
            <div className="relative group">
               <img 
                 src="https://images.unsplash.com/photo-1584345604476-8ec5e12e42dd?q=80&w=1000" 
                 alt="Car" 
                 className="w-full object-contain h-56 transition-transform group-hover:scale-105 duration-700" 
               />
               <button className="absolute left-0 top-1/2 -translate-y-1/2 w-10 h-10 bg-white rounded-full shadow-lg flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                  <ChevronLeft size={20} />
               </button>
               <button className="absolute right-0 top-1/2 -translate-y-1/2 w-10 h-10 bg-white rounded-full shadow-lg flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                  <ChevronRight size={20} />
               </button>
            </div>
         </div>

         <div className="px-6 mb-10">
            <h3 className="font-bold text-gray-400 uppercase tracking-widest text-[10px] mb-6">Specifications</h3>
            <div className="grid grid-cols-4 gap-4">
               {[
                 { icon: <Zap size={18} />, label: "Max power", val: "250hp" },
                 { icon: <Clock size={18} />, label: "Fuel", val: "Octane" },
                 { icon: <Target size={18} />, label: "Max speed", val: "230km" },
                 { icon: <ShieldCheck size={18} />, label: "0-60mph", val: "2.5sec" }
               ].map((spec, i) => (
                 <div key={i} className="flex flex-col items-center p-3 bg-[#F7F8F9] rounded-2xl">
                    <div className="text-primary mb-2 line-clamp-1">{spec.icon}</div>
                    <span className="text-[8px] font-bold text-gray-400 uppercase tracking-tighter text-center">{spec.label}</span>
                    <span className="text-[10px] font-black text-secondary mt-1">{spec.val}</span>
                 </div>
               ))}
            </div>
         </div>

         <div className="px-6 pb-20">
            <h3 className="font-bold text-gray-400 uppercase tracking-widest text-[10px] mb-6">Car features</h3>
            <div className="space-y-4">
               {[
                 { label: "Model", val: "GT500" },
                 { label: "Capacity", val: "760hp" },
                 { label: "Color", val: "Red" },
                 { label: "Fuel type", val: "Octane" },
                 { label: "Gear type", val: "Automatic" }
               ].map((feature, i) => (
                 <div key={i} className="flex justify-between items-center py-4 border-b border-gray-50">
                    <span className="font-bold text-gray-400 text-sm">{feature.label}</span>
                    <span className="font-black text-secondary text-sm">{feature.val}</span>
                 </div>
               ))}
            </div>
         </div>
      </div>

      <div className="absolute bottom-0 inset-x-0 p-8 pt-4 bg-white/80 backdrop-blur-md flex gap-4">
         <button className="flex-1 h-14 border-2 border-primary rounded-xl font-black uppercase tracking-widest text-xs active:scale-95 transition-all">
            Book later
         </button>
         <button 
           onClick={() => navigate("/ride-request")}
           className="flex-[2] h-14 bg-primary text-secondary rounded-xl font-black uppercase tracking-widest text-xs active:scale-95 transition-all shadow-xl shadow-primary/20"
         >
            Ride Now
         </button>
      </div>
    </div>
  );
};

export default CarDetails;
