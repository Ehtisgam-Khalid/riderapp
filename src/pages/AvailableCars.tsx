import React from "react";
import { useNavigate } from "react-router-dom";
import { ChevronLeft, MapPin, Search, Star } from "lucide-react";

const AvailableCars = () => {
  const navigate = useNavigate();

  const cars = [
    { id: 1, name: "BMW Cabrio", type: "Automatic | 3 seats | Octane", dist: "800m (5mins away)", price: "$200", image: "https://images.unsplash.com/photo-1552519507-da3b142c6e3d?q=80&w=400" },
    { id: 2, name: "Mustang Shelby GT", type: "Automatic | 3 seats | Octane", dist: "800m (5mins away)", price: "$350", image: "https://images.unsplash.com/photo-1584345604476-8ec5e12e42dd?q=80&w=400" },
    { id: 3, name: "BMW i8", type: "Automatic | 3 seats | Octane", dist: "800m (5mins away)", price: "$400", image: "https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?q=80&w=400" },
  ];

  return (
    <div className="flex flex-col min-h-screen bg-white">
      <div className="p-6 flex items-center gap-4">
        <button onClick={() => navigate(-1)} className="p-2 border border-gray-100 rounded-xl">
           <ChevronLeft size={24} />
        </button>
        <h2 className="text-xl font-bold flex-1 text-center pr-10">Available cars for ride</h2>
      </div>

      <div className="flex-1 px-6 space-y-6 overflow-y-auto pb-20">
         <p className="text-sm font-bold text-gray-400 uppercase tracking-widest">18 cars found</p>
         
         {cars.map((car) => (
           <div 
             key={car.id}
             className="bg-white border-2 border-gray-50 rounded-[2.5rem] p-6 shadow-sm hover:shadow-md transition-shadow"
           >
              <div className="flex justify-between items-start mb-6">
                 <div>
                    <h3 className="text-xl font-black text-secondary mb-1">{car.name}</h3>
                    <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">{car.type}</p>
                    <div className="flex items-center gap-2 mt-2">
                       <MapPin size={12} className="text-primary" />
                       <span className="text-[10px] font-bold text-gray-400">{car.dist}</span>
                    </div>
                 </div>
                 <img src={car.image} alt={car.name} className="w-24 h-24 object-contain" />
              </div>
              
              <div className="flex items-center justify-between pt-6 border-t border-gray-50">
                 <button 
                   onClick={() => navigate("/car-details")}
                   className="text-secondary font-bold text-sm border-b-2 border-primary"
                 >
                    View car list
                 </button>
                 <div className="flex gap-2">
                    <button 
                      onClick={() => navigate("/car-details")}
                      className="px-6 py-3 border-2 border-primary rounded-xl text-xs font-black uppercase tracking-widest"
                    >
                       Book later
                    </button>
                    <button 
                      onClick={() => navigate("/car-details")}
                      className="px-6 py-3 bg-primary rounded-xl text-xs font-black uppercase tracking-widest text-secondary"
                    >
                       Ride Now
                    </button>
                 </div>
              </div>
           </div>
         ))}
      </div>
    </div>
  );
};

export default AvailableCars;
