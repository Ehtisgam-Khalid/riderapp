import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ChevronLeft, MoreVertical, Navigation } from "lucide-react";

const History = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("upcoming");

  const rides = [
    { id: 1, name: "Nate", car: "Mustang Shelby GT", time: "Today at 09:20 am", status: "Done", type: "upcoming" },
    { id: 2, name: "Henry", car: "Mustang Shelby GT", time: "Today at 10:20 am", status: "Done", type: "upcoming" },
    { id: 3, name: "William", car: "Mustang Shelby GT", time: "Tomorrow at 09:20 am", status: "Done", type: "upcoming" },
    { id: 4, name: "Nate", car: "Mustang Shelby GT", time: "Today at 09:20 am", status: "Done", type: "completed" },
    { id: 5, name: "Henry", car: "Mustang Shelby GT", time: "Today at 10:20 am", status: "Cancel", type: "cancelled" },
  ];

  return (
    <div className="flex flex-col min-h-screen bg-white">
      <div className="p-6 flex items-center gap-4">
        <button onClick={() => navigate(-1)} className="p-2 border border-gray-100 rounded-xl">
           <ChevronLeft size={24} />
        </button>
        <h2 className="text-xl font-bold flex-1 text-center pr-10">History</h2>
      </div>

      <div className="px-6 mb-8">
         <div className="bg-[#F7F8F9] p-1 rounded-2xl flex">
            {["Upcoming", "Completed", "Cancelled"].map(tab => (
              <button 
                key={tab}
                onClick={() => setActiveTab(tab.toLowerCase())}
                className={`flex-1 py-3 rounded-xl text-xs font-black uppercase tracking-widest transition-all ${
                  activeTab === tab.toLowerCase() ? "bg-primary text-secondary shadow-sm" : "text-gray-400"
                }`}
              >
                {tab}
              </button>
            ))}
         </div>
      </div>

      <div className="flex-1 px-6 space-y-4 overflow-y-auto pb-10">
         {rides.filter(r => r.type === activeTab).map((ride) => (
           <div 
             key={ride.id}
             className="bg-white border-2 border-gray-50 rounded-3xl p-6 flex items-center justify-between shadow-sm"
           >
              <div className="flex-1">
                 <div className="flex items-center gap-2 mb-2">
                    <h4 className="font-bold text-secondary">{ride.name}</h4>
                    <div className="w-1.5 h-1.5 rounded-full bg-gray-200" />
                    <span className="text-[10px] text-gray-400 font-bold uppercase tracking-widest">{ride.time}</span>
                 </div>
                 <p className="text-xs font-bold text-gray-400 mb-4">{ride.car}</p>
                 <div className="flex justify-between items-center pr-10">
                    <span className={`text-[10px] font-black uppercase px-4 py-1.5 rounded-lg ${
                      ride.status === "Done" ? "bg-green-500/10 text-green-500" : "bg-red-500/10 text-red-500"
                    }`}>
                       {ride.status}
                    </span>
                 </div>
              </div>
              <button className="p-3 text-gray-300">
                 <MoreVertical size={20} />
              </button>
           </div>
         ))}
         
         {rides.filter(r => r.type === activeTab).length === 0 && (
            <div className="flex flex-col items-center justify-center py-20 text-center">
               <div className="w-20 h-20 bg-gray-50 rounded-full flex items-center justify-center mb-4">
                  <Navigation size={32} className="text-gray-200" />
               </div>
               <p className="text-gray-400 font-bold text-sm uppercase tracking-widest">No history found</p>
            </div>
         )}
      </div>
    </div>
  );
};

export default History;
