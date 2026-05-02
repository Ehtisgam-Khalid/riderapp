import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ChevronLeft, MapPin, Search, Navigation, Heart, X } from "lucide-react";

const SelectAddress = () => {
  const navigate = useNavigate();
  const [query, setQuery] = useState("");

  const recentPlaces = [
    { name: "Office", addr: "2972 Westheimer Rd. Santa Ana, Illinois 85486", dist: "2.7km" },
    { name: "Coffee shop", addr: "1901 Thornridge Cir. Shiloh, Hawaii 81063", dist: "1.1km" },
    { name: "Shopping center", addr: "4140 Parker Rd. Allentown, New Mexico 31134", dist: "4.8km" },
    { name: "Shopping mall", addr: "3892 Westheimer Rd. Santa Ana, Illinois 85486", dist: "4.0km" },
  ];

  return (
    <div className="flex flex-col min-h-screen bg-white">
      <div className="p-6 flex items-center gap-4">
        <button onClick={() => navigate(-1)} className="p-2 border border-gray-100 rounded-xl">
           <ChevronLeft size={24} />
        </button>
        <h2 className="text-xl font-bold flex-1 text-center pr-10">Select address</h2>
      </div>

      <div className="px-6 space-y-4 mb-10">
         <div className="relative">
            <div className="absolute left-4 top-1/2 -translate-y-1/2 w-2 h-2 rounded-full border-2 border-primary" />
            <input 
              type="text" 
              placeholder="From" 
              defaultValue="Abcdefghijk|"
              className="w-full h-14 bg-primary/5 rounded-2xl pl-12 pr-12 font-semibold text-secondary outline-none focus:ring-2 focus:ring-primary"
            />
            <button className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-300">
               <X size={18} />
            </button>
         </div>
         <div className="relative">
            <div className="absolute left-4 top-1/2 -translate-y-1/2 w-2 h-2 bg-secondary rounded-sm" />
            <input 
              type="text" 
              placeholder="To" 
              className="w-full h-14 bg-[#F7F8F9] rounded-2xl pl-12 pr-12 font-semibold text-secondary outline-none focus:ring-2 focus:ring-primary"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />
         </div>
      </div>

      <div className="flex-1 px-6">
         <div className="flex justify-between items-center mb-6">
            <h3 className="font-bold text-gray-400 uppercase tracking-widest text-xs">Recent places</h3>
            <button className="text-primary font-bold text-sm">Clear All</button>
         </div>

         <div className="space-y-6">
            {recentPlaces.map((place, i) => (
              <div 
                key={i} 
                onClick={() => navigate("/select-transport")}
                className="flex items-center gap-4 group cursor-pointer"
              >
                <div className="w-12 h-12 bg-[#F7F8F9] rounded-2xl flex items-center justify-center text-gray-400 group-hover:bg-primary group-hover:text-secondary transition-all">
                   <Navigation size={20} />
                </div>
                <div className="flex-1">
                   <div className="flex justify-between items-center mb-1">
                      <h4 className="font-bold text-secondary">{place.name}</h4>
                      <span className="text-[10px] font-bold text-gray-400">{place.dist}</span>
                   </div>
                   <p className="text-xs text-gray-400 truncate w-60">{place.addr}</p>
                </div>
              </div>
            ))}
         </div>
      </div>
    </div>
  );
};

export default SelectAddress;
