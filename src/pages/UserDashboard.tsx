import React, { useState } from "react";
import { 
  MapPin, Search, ChevronRight, Menu, Bell, Wallet, 
  Home, Heart, Tag, User, Car, Truck, Bike, CarFront as Taxi,
  Navigation, LogOut, XCircle
} from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { useNavigate } from "react-router-dom";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

// Fix leaflet icon issue
import icon from 'leaflet/dist/images/marker-icon.png';
import iconShadow from 'leaflet/dist/images/marker-shadow.png';

let DefaultIcon = L.icon({
    iconUrl: icon,
    shadowUrl: iconShadow,
    iconSize: [25, 41],
    iconAnchor: [12, 41]
});
L.Marker.prototype.options.icon = DefaultIcon;

const UserDashboard = () => {
  const navigate = useNavigate();
  const [isSideMenuOpen, setIsSideMenuOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("home");
  const [serviceType, setServiceType] = useState("transport"); // transport or delivery

  const sideMenuItems = [
    { icon: <User size={20} />, label: "Edit Profile", path: "/profile" },
    { icon: <MapPin size={20} />, label: "Address", path: "/address" },
    { icon: <Navigation size={20} />, label: "History", path: "/history" },
    { icon: <Tag size={20} />, label: "Referral", path: "/referral" },
    { icon: <Heart size={20} />, label: "About Us", path: "/about" },
    { icon: <Bell size={20} />, label: "Settings", path: "/settings" },
    { icon: <XCircle size={20} />, label: "Help and Support", path: "/support" },
    { icon: <LogOut size={20} />, label: "Logout", path: "/login" },
  ];

  return (
    <div className="flex flex-col h-screen bg-white overflow-hidden relative">
      {/* Side Menu Drawer */}
      <AnimatePresence>
        {isSideMenuOpen && (
          <>
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsSideMenuOpen(false)}
              className="absolute inset-0 bg-black/40 z-50 backdrop-blur-sm"
            />
            <motion.div 
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="absolute inset-y-0 left-0 w-4/5 bg-white z-[60] shadow-2xl rounded-r-3xl overflow-hidden flex flex-col"
            >
              <div className="p-8 bg-white border-b border-gray-50 flex flex-col items-center">
                 <div className="w-24 h-24 rounded-full bg-gray-100 mb-4 overflow-hidden border-4 border-white shadow-xl">
                    <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=Nate" alt="Avatar" />
                 </div>
                 <h3 className="text-xl font-black text-secondary">Nate Samson</h3>
                 <p className="text-sm text-gray-400">nate@email.com</p>
              </div>
              <div className="flex-1 overflow-y-auto p-4 py-6 space-y-2">
                 {sideMenuItems.map((item, i) => (
                   <button 
                     key={i}
                     onClick={() => {
                        setIsSideMenuOpen(false);
                        navigate(item.path);
                     }}
                     className="w-full flex items-center gap-4 p-4 hover:bg-gray-50 rounded-2xl transition-all text-secondary group"
                   >
                     <div className="p-2 group-hover:bg-primary/20 rounded-lg transition-colors">
                        {item.icon}
                     </div>
                     <span className="font-bold">{item.label}</span>
                   </button>
                 ))}
              </div>
              <div className="p-8 flex items-center justify-center text-[10px] text-gray-300 font-bold uppercase tracking-widest">
                 Easy Rider v1.0
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Header */}
      <header className="absolute top-0 inset-x-0 p-6 z-40 flex justify-between items-center bg-transparent pointer-events-none">
         <button 
           onClick={() => setIsSideMenuOpen(true)}
           className="w-12 h-12 bg-white rounded-xl shadow-xl flex items-center justify-center pointer-events-auto active:scale-90 transition-transform"
         >
           <Menu size={24} className="text-secondary" />
         </button>
         <div className="flex gap-4 pointer-events-auto">
            <button className="w-12 h-12 bg-white rounded-xl shadow-xl flex items-center justify-center active:scale-90 transition-transform">
               <Search size={22} className="text-secondary" />
            </button>
            <button className="w-12 h-12 bg-white rounded-xl shadow-xl flex items-center justify-center relative active:scale-90 transition-transform">
               <Bell size={22} className="text-secondary" />
               <div className="absolute top-3 right-3 w-3 h-3 bg-red-500 rounded-full border-2 border-white shadow-sm" />
            </button>
         </div>
      </header>

      {/* Map Section */}
      <div className="flex-1 relative z-0">
         <MapContainer center={[24.8607, 67.0011] as any} zoom={15} zoomControl={false} style={{ height: "100%", width: "100%" }}>
            <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
            <Marker position={[24.8607, 67.0011] as any} />
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
               <div className="w-32 h-32 bg-primary/20 rounded-full flex items-center justify-center border-2 border-primary animate-pulse">
                  <div className="w-4 h-4 bg-primary rounded-full shadow-lg" />
               </div>
            </div>
         </MapContainer>

         {/* Rental Badge */}
         <div className="absolute bottom-64 left-1/2 -translate-x-1/2 z-10">
            <button className="bg-primary px-8 py-3 rounded-xl font-bold shadow-xl shadow-primary/20 text-secondary active:scale-95 transition-all">
              Rental
            </button>
         </div>
      </div>

      {/* Action Area */}
      <div className="bg-white rounded-t-[3rem] shadow-3xl p-8 z-30 -mt-10 overflow-hidden">
         <div className="w-12 h-1 bg-gray-100 rounded-full mx-auto mb-8" />
         
         <div 
           onClick={() => navigate("/select-address")}
           className="w-full h-16 bg-[#F7F8F9] rounded-2xl flex items-center px-6 gap-4 border border-gray-50 mb-8 cursor-pointer active:scale-[0.99] transition-all"
         >
            <Search size={20} className="text-primary" strokeWidth={3} />
            <span className="text-gray-400 font-bold">Where would you go?</span>
            <Heart size={20} className="ml-auto text-gray-300" />
         </div>

         <div className="flex gap-4">
            <button 
              onClick={() => setServiceType("transport")}
              className={`flex-1 h-14 rounded-2xl font-black text-sm uppercase tracking-widest transition-all ${
                serviceType === "transport" ? "bg-primary text-secondary shadow-lg shadow-primary/20" : "bg-[#F7F8F9] text-gray-400"
              }`}
            >
              Transport
            </button>
            <button 
              onClick={() => setServiceType("delivery")}
              className={`flex-1 h-14 rounded-2xl font-black text-sm uppercase tracking-widest transition-all ${
                serviceType === "delivery" ? "bg-primary text-secondary shadow-lg shadow-primary/20" : "bg-[#F7F8F9] text-gray-400"
              }`}
            >
              Delivery
            </button>
         </div>
      </div>

      {/* Bottom Navigation */}
      <nav className="h-24 bg-white border-t border-gray-50 px-8 flex items-center justify-between z-40">
        {[
          { id: "home", icon: <Home />, label: "Home" },
          { id: "fav", icon: <Heart />, label: "Favourite" },
          { id: "wallet", icon: <Wallet />, label: "Wallet" },
          { id: "offer", icon: <Tag />, label: "Offer" },
          { id: "profile", icon: <User />, label: "Profile" }
        ].map(tab => (
          <button 
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`flex flex-col items-center gap-1 transition-all ${
              activeTab === tab.id ? "text-primary scale-110" : "text-gray-300"
            }`}
          >
            <div className={activeTab === tab.id ? "relative mb-1" : ""}>
               {activeTab === tab.id && (
                 <div className="absolute inset-0 bg-primary/20 blur-xl rounded-full scale-150" />
               )}
               {React.cloneElement(tab.icon as React.ReactElement, { 
                 size: 24, 
                 strokeWidth: activeTab === tab.id ? 3 : 2,
                 fill: activeTab === tab.id ? "currentColor" : "none"
               })}
            </div>
            <span className="text-[10px] font-black uppercase tracking-tighter">{tab.label}</span>
          </button>
        ))}

        {/* Floating Action Button Replacement (Special Styling for Wallet/Home in screen) */}
        <div className="absolute left-1/2 -translate-x-1/2 -top-4 w-16 h-16 bg-primary rounded-2xl shadow-xl shadow-primary/20 flex items-center justify-center rotate-45 active:scale-95 transition-all cursor-pointer border-4 border-white">
           <div className="-rotate-45 text-secondary">
              <Wallet size={28} strokeWidth={2.5} />
           </div>
        </div>
      </nav>
    </div>
  );
};

export default UserDashboard;
