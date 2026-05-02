import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ChevronLeft, Car, Bike, Truck, CarFront as Taxi } from "lucide-react";

const SelectTransport = () => {
  const navigate = useNavigate();
  const [selected, setSelected] = useState("car");

  const transports = [
    { id: "car", name: "Car", icon: <Car size={32} /> },
    { id: "bike", name: "Bike", icon: <Bike size={32} /> },
    { id: "cycle", name: "Cycle", icon: <Bike size={32} /> }, // Using Bike for Cycle
    { id: "taxi", name: "Taxi", icon: <Taxi size={32} /> },
  ];

  return (
    <div className="flex flex-col min-h-screen bg-white">
      <div className="p-6 flex items-center gap-4">
        <button onClick={() => navigate(-1)} className="p-2 border border-gray-100 rounded-xl">
           <ChevronLeft size={24} />
        </button>
        <h2 className="text-xl font-bold flex-1 text-center pr-10">Select transport</h2>
      </div>

      <div className="flex-1 px-8 grid grid-cols-2 gap-6 items-center py-10">
         {transports.map((item) => (
           <button 
             key={item.id}
             onClick={() => setSelected(item.id)}
             className={`aspect-square rounded-[2rem] flex flex-col items-center justify-center gap-4 transition-all border-4 ${
               selected === item.id ? "bg-primary/10 border-primary shadow-xl shadow-primary/10" : "bg-[#F7F8F9] border-transparent"
             }`}
           >
              <div className={`${selected === item.id ? "text-primary scale-110" : "text-gray-400"} transition-all`}>
                 {item.icon}
              </div>
              <span className={`font-black uppercase tracking-widest text-xs ${selected === item.id ? "text-secondary" : "text-gray-400"}`}>
                 {item.name}
              </span>
           </button>
         ))}
      </div>

      <div className="p-8 pb-12">
         <button 
           onClick={() => navigate("/available-cars")}
           className="btn-primary"
         >
           Confirm Location
         </button>
      </div>
    </div>
  );
};

export default SelectTransport;
