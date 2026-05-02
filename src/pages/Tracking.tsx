import React from "react";
import { useNavigate } from "react-router-dom";
import { ChevronLeft, MessageCircle, Phone, Navigation, Menu, Search, Bell, Star } from "lucide-react";
import { MapContainer, TileLayer, Marker } from "react-leaflet";
import { motion } from "motion/react";

const Tracking = () => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col h-screen bg-white overflow-hidden relative">
      {/* Header (Minimal) */}
      <header className="absolute top-0 inset-x-0 p-6 z-40 flex items-center bg-transparent pointer-events-none">
         <button 
           onClick={() => navigate(-1)}
           className="w-12 h-12 bg-white rounded-xl shadow-xl flex items-center justify-center pointer-events-auto"
         >
           <ChevronLeft size={24} className="text-secondary" />
         </button>
      </header>

      {/* Map */}
      <div className="flex-1 relative z-0">
         <MapContainer center={[24.8607, 67.0011] as any} zoom={16} zoomControl={false} style={{ height: "100%", width: "100%" }}>
            <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
            
            {/* Animated Car Marker path placeholder */}
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
               <motion.div 
                 animate={{
                    pathOffset: [0, 1],
                 }}
                 className="relative"
               >
                  <svg width="200" height="200" className="opacity-40">
                     <path d="M50 150 Q 100 50 150 150" fill="none" stroke="#FFCC00" strokeWidth="8" strokeLinecap="round" />
                  </svg>
                  <div className="absolute top-10 left-1/2 -translate-x-1/2 bg-white p-2 rounded-lg shadow-xl">
                      <div className="w-4 h-4 bg-red-500 rounded-full border-2 border-white" />
                  </div>
               </motion.div>
            </div>
         </MapContainer>
      </div>

      {/* Driver Info Popup */}
      <div className="bg-white rounded-t-[3rem] shadow-3xl p-8 z-30 -mt-10">
         <div className="w-12 h-1 bg-gray-100 rounded-full mx-auto mb-8" />
         
         <div className="flex items-center justify-between mb-8">
            <h3 className="font-bold text-secondary text-lg">Your driver is coming in 3:35</h3>
            <div className="w-10 h-10 bg-[#F7F8F9] rounded-xl flex items-center justify-center text-gray-400">
               <Navigation size={18} />
            </div>
         </div>

         <div className="flex items-center gap-5 p-4 bg-[#F7F8F9]/50 rounded-3xl border border-gray-50 mb-8">
            <div className="relative">
               <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=Sergio" className="w-16 h-16 rounded-2xl bg-white border-2 border-white shadow-md" alt="Driver" />
               <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-primary rounded-lg flex items-center justify-center border-2 border-white shadow-sm">
                  <Star size={10} fill="currentColor" />
               </div>
            </div>
            <div className="flex-1">
               <h4 className="font-black text-secondary">Sergio Ramasis</h4>
               <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">BMW i8 • <span className="text-primary font-black">ABC-1234</span></p>
            </div>
            <img src="https://images.unsplash.com/photo-1552519507-da3b142c6e3d?q=80&w=200" className="w-20 h-12 object-contain" alt="Car" />
         </div>

         <div className="flex justify-between items-center mb-8 px-2">
            <div>
               <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1 italic">Payment method</p>
               <div className="flex items-center gap-2">
                  <img src="https://upload.wikimedia.org/wikipedia/commons/e/e0/JazzCash_Log_2017.png" alt="JazzCash" className="h-4" />
                  <span className="font-black text-secondary">**** 8970</span>
               </div>
            </div>
            <div className="text-right">
               <span className="text-3xl font-black text-secondary tracking-tighter">$220.00</span>
            </div>
         </div>

         <div className="flex gap-4">
            <button 
              onClick={() => navigate("/chat")}
              className="w-14 h-14 bg-[#F7F8F9] rounded-2xl flex items-center justify-center text-secondary border border-gray-100 active:scale-90 transition-transform"
            >
               <MessageCircle size={24} />
            </button>
            <button className="w-14 h-14 bg-[#F7F8F9] rounded-2xl flex items-center justify-center text-secondary border border-gray-100 active:scale-90 transition-transform">
               <Phone size={24} />
            </button>
            <button 
              className="flex-1 bg-red-500/10 text-red-500 font-black rounded-2xl text-xs uppercase tracking-widest active:scale-[0.98] transition-all"
            >
               Cancel Ride
            </button>
         </div>
      </div>
    </div>
  );
};

export default Tracking;
