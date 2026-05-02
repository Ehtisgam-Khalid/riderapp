import React from "react";
import { useNavigate } from "react-router-dom";
import { ChevronLeft, Camera, Settings } from "lucide-react";

const Profile = () => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col min-h-screen bg-white">
      <div className="p-6 flex items-center gap-4">
        <button onClick={() => navigate(-1)} className="p-2 border border-gray-100 rounded-xl">
           <ChevronLeft size={24} />
        </button>
        <h2 className="text-xl font-bold flex-1 text-center">Edit Profile</h2>
        <button className="p-2 border border-gray-100 rounded-xl">
           <Settings size={22} className="text-gray-400" />
        </button>
      </div>

      <div className="flex-1 px-8">
         <div className="flex flex-col items-center mb-10 pt-4">
            <div className="relative">
               <div className="w-32 h-32 rounded-full bg-gray-100 overflow-hidden border-4 border-white shadow-2xl">
                  <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=Nate" alt="Avatar" className="w-full h-full object-cover" />
               </div>
               <button className="absolute bottom-0 right-0 w-10 h-10 bg-primary rounded-full border-4 border-white flex items-center justify-center text-secondary shadow-lg active:scale-90 transition-transform">
                  <Camera size={18} />
               </button>
            </div>
            <h3 className="text-2xl font-black text-secondary mt-6">Nate Samson</h3>
            <p className="text-gray-400 font-bold text-sm">nate@email.com</p>
         </div>

         <div className="space-y-6">
            <div className="space-y-2">
               <label className="text-[10px] font-black text-gray-300 uppercase tracking-[0.2em] ml-2 italic">Full Name</label>
               <input type="text" defaultValue="Nate Samson" className="auth-input" />
            </div>
            <div className="space-y-2">
               <label className="text-[10px] font-black text-gray-300 uppercase tracking-[0.2em] ml-2 italic">Email</label>
               <input type="email" defaultValue="nate@email.com" className="auth-input" />
            </div>
            <div className="space-y-2">
               <label className="text-[10px] font-black text-gray-300 uppercase tracking-[0.2em] ml-2 italic">Phone Number</label>
               <div className="flex gap-2">
                 <div className="h-14 px-4 bg-[#F7F8F9] rounded-xl flex items-center border-none">
                    <img src="https://flagcdn.com/w20/pk.png" alt="PK" className="w-5 h-3 object-cover" />
                    <span className="ml-2 font-bold text-secondary text-sm">+92</span>
                 </div>
                 <input type="tel" defaultValue="300 1234567" className="auth-input flex-1" />
               </div>
            </div>
            <div className="space-y-2">
               <label className="text-[10px] font-black text-gray-300 uppercase tracking-[0.2em] ml-2 italic">Gender</label>
               <select className="auth-input appearance-none">
                  <option>Male</option>
                  <option>Female</option>
               </select>
            </div>
            <div className="space-y-2">
               <label className="text-[10px] font-black text-gray-300 uppercase tracking-[0.2em] ml-2 italic">Address</label>
               <input type="text" defaultValue="Sector 11-A, Near Power House, Karachi" className="auth-input" />
            </div>
         </div>
      </div>

      <div className="p-8 pb-12">
         <button 
           onClick={() => navigate(-1)}
           className="btn-primary"
         >
           Update
         </button>
      </div>
    </div>
  );
};

export default Profile;
