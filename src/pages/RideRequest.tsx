import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ChevronLeft, MapPin, Wallet, CreditCard, DollarSign, Star } from "lucide-react";

const RideRequest = () => {
  const navigate = useNavigate();
  const [paymentMethod, setPaymentMethod] = useState("card1");

  return (
    <div className="flex flex-col min-h-screen bg-white">
      <div className="p-6 flex items-center gap-4">
        <button onClick={() => navigate(-1)} className="p-2 border border-gray-100 rounded-xl">
           <ChevronLeft size={24} />
        </button>
        <h2 className="text-xl font-bold flex-1 text-center pr-10">Request for rent</h2>
      </div>

      <div className="flex-1 overflow-y-auto px-6">
         <div className="space-y-6 pt-6">
            <div className="flex items-start gap-4">
               <div className="w-8 h-8 rounded-full border-2 border-primary flex items-center justify-center flex-shrink-0 mt-1">
                  <div className="w-2 h-2 bg-primary rounded-full" />
               </div>
               <div>
                  <h4 className="font-bold text-gray-400 uppercase tracking-widest text-[10px] mb-1">Current location</h4>
                  <p className="font-bold text-secondary text-sm">2972 Westheimer Rd. Santa Ana, Illinois 85486</p>
               </div>
            </div>
            <div className="flex items-start gap-4 min-h-[40px] border-l-2 border-dashed border-gray-100 ml-4"></div>
            <div className="flex items-start gap-4">
               <div className="w-8 h-8 bg-secondary rounded-lg flex items-center justify-center flex-shrink-0 mt-1">
                  <MapPin size={18} className="text-white" />
               </div>
               <div>
                  <h4 className="font-bold text-gray-400 uppercase tracking-widest text-[10px] mb-1">Office</h4>
                  <p className="font-bold text-secondary text-sm">1901 Thornridge Cir. Shiloh, Hawaii 81063</p>
               </div>
               <span className="ml-auto text-xs font-bold text-gray-400">1.1km</span>
            </div>
         </div>

         <div className="mt-10 bg-[#F7F8F9] rounded-[2.5rem] p-6 flex items-center gap-4 border border-gray-50">
            <img src="https://images.unsplash.com/photo-1584345604476-8ec5e12e42dd?q=80&w=400" className="w-20 h-20 object-contain" alt="Car" />
            <div>
               <h3 className="font-black text-secondary">Mustang Shelby GT</h3>
               <div className="flex items-center gap-2 mt-1">
                  <Star size={12} className="text-primary fill-primary" />
                  <span className="text-xs font-bold">4.9</span>
                  <span className="text-gray-400 text-[10px]">(531 reviews)</span>
               </div>
            </div>
         </div>

         <div className="mt-8 flex gap-4">
            <input type="date" className="flex-1 auth-input text-xs" />
            <input type="time" className="flex-1 auth-input text-xs" />
         </div>
         <input type="text" placeholder="Enter Promo Code" className="w-full auth-input mt-4" />

         <div className="mt-8">
            <div className="flex justify-between items-center mb-6">
               <h3 className="font-bold text-gray-400 uppercase tracking-widest text-[10px]">Select payment method</h3>
               <button className="text-primary font-bold text-xs">View All</button>
            </div>
            <div className="space-y-4">
               {[
                 { id: "card1", icon: <CreditCard size={20} />, label: "**** **** **** 8970", expiry: "Expires: 12/26" },
                 { id: "card2", icon: <CreditCard size={20} />, label: "**** **** **** 5543", expiry: "Expires: 08/25" },
                 { id: "wallet", icon: <Wallet size={20} />, label: "My Wallet", bal: "$345" },
                 { id: "cash", icon: <DollarSign size={20} />, label: "Cash" },
               ].map((method) => (
                 <button 
                  key={method.id}
                  onClick={() => setPaymentMethod(method.id)}
                  className={`w-full p-4 rounded-2xl flex items-center gap-4 transition-all border-2 ${
                    paymentMethod === method.id ? "bg-primary/5 border-primary" : "bg-white border-gray-50"
                  }`}
                 >
                    <div className={`${paymentMethod === method.id ? "text-primary" : "text-gray-300"}`}>
                       {method.icon}
                    </div>
                    <div className="flex-1 text-left">
                       <div className="font-bold text-secondary text-sm">{method.label}</div>
                       {"expiry" in method && <div className="text-[10px] text-gray-400 font-bold">{method.expiry}</div>}
                       {"bal" in method && <div className="text-[10px] text-primary font-bold">{method.bal}</div>}
                    </div>
                    <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                      paymentMethod === method.id ? "border-primary" : "border-gray-200"
                    }`}>
                       {paymentMethod === method.id && <div className="w-2.5 h-2.5 bg-primary rounded-full" />}
                    </div>
                 </button>
               ))}
            </div>
         </div>
      </div>

      <div className="p-8">
         <button 
           onClick={() => navigate("/ride-confirmed")}
           className="btn-primary"
         >
           Confirm Booking
         </button>
      </div>
    </div>
  );
};

export default RideRequest;
