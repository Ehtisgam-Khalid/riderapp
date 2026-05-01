import React, { useState, useEffect } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import { useApp } from "../context/AppContext";
import { 
  Smartphone, Car as SteeringWheel, DollarSign, History, 
  Power, Navigation, User, MapPin, Bell, Star, 
  ChevronUp, ShieldCheck, Zap, MessageCircle
} from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { formatCurrency, cn } from "../lib/utils";
import toast from "react-hot-toast";

const DriverDashboard = () => {
  const { rides, updateRideStatus, onlineDrivers } = useApp();
  const [isOnline, setIsOnline] = useState(false);
  const [activeRide, setActiveRide] = useState<any>(null);
  const [currentLocation] = useState({ lat: 24.8607, lng: 67.0011 });
  const [earnings, setEarnings] = useState(2450);

  // Get current active driver (mocking driver-1)
  const driverData = onlineDrivers.find(d => d.id === "driver-1") || onlineDrivers[0];
  const pendingRides = rides.filter(r => r.status === "pending");

  useEffect(() => {
    if (isOnline && pendingRides.length > 0 && !activeRide) {
      toast("New Ride Request Nearby!", {
        icon: <Bell className="text-primary" />,
        duration: 5000,
      });
    }
  }, [pendingRides.length, isOnline, activeRide]);

  const handleAccept = (ride: any) => {
    updateRideStatus(ride.id, "accepted", driverData.id);
    setActiveRide({ ...ride, status: "accepted" });
    toast.success("Ride Accepted! Head to pickup.");
  };

  const handleArrived = () => {
    setActiveRide({ ...activeRide, status: "picked-up" });
    updateRideStatus(activeRide.id, "picked-up");
    toast.success("Passenger Picked Up");
  };

  const handleComplete = () => {
    if (!activeRide) return;
    updateRideStatus(activeRide.id, "completed");
    setEarnings(prev => prev + activeRide.fare);
    setActiveRide(null);
    toast.success(`Ride Completed! Earned ${formatCurrency(activeRide.fare)}`);
  };

  return (
    <div className="h-[calc(100vh-80px)] flex flex-col md:flex-row bg-[#F8F9FA] overflow-hidden">
      {/* Sidebar - Control Center */}
      <div className="w-full md:w-[400px] bg-white shadow-xl flex flex-col z-20 relative border-r border-gray-100">
        <div className="p-10 border-b border-gray-50 bg-secondary text-white rounded-br-[3rem] relative overflow-hidden">
          <div className="absolute inset-0 opacity-5 bg-[radial-gradient(#fff_1px,transparent_1px)] [background-size:20px_20px]" />
          <div className="flex items-center justify-between mb-12 relative z-10">
            <div className="flex items-center gap-5">
              <div className="relative">
                <div className="w-20 h-20 bg-white rounded-[2rem] overflow-hidden border-[6px] border-white shadow-2xl">
                  <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=driver1" alt="Driver" className="w-full h-full object-cover" />
                </div>
                <div className="absolute -bottom-2 -right-2 bg-primary text-white text-[9px] font-black px-3 py-1.5 rounded-lg flex items-center gap-1 shadow-lg border-2 border-secondary">
                  4.8 <Star size={10} fill="currentColor" />
                </div>
              </div>
              <div>
                <div className="font-black text-2xl tracking-tighter leading-none italic uppercase">{driverData.name}</div>
                <div className="text-[10px] text-primary font-black mt-3 tracking-[0.2em] uppercase flex items-center gap-1 italic underline decoration-white/20">
                   <ShieldCheck size={12} /> Gold Partner
                </div>
              </div>
            </div>
            
            <motion.button 
              whileTap={{ scale: 0.9 }}
              onClick={() => setIsOnline(!isOnline)}
              className={cn(
                "p-5 rounded-[2rem] transition-all shadow-2xl flex items-center justify-center border-[5px]",
                isOnline 
                  ? "bg-green-500 text-white border-green-400 rotate-12" 
                  : "bg-gray-800 text-gray-500 border-gray-700 hover:text-white"
              )}
            >
              <Power size={32} strokeWidth={3} />
            </motion.button>
          </div>

          <div className="grid grid-cols-2 gap-5 relative z-10">
            <div className="bg-white/5 backdrop-blur-xl p-6 rounded-[2rem] border border-white/10 shadow-inner group">
              <div className="text-[9px] text-gray-400 font-black uppercase tracking-widest mb-2 italic">Yield Today</div>
              <div className="text-3xl font-black text-primary tracking-tighter italic">{formatCurrency(earnings)}</div>
            </div>
            <div className="bg-white/5 backdrop-blur-xl p-6 rounded-[2rem] border border-white/10 shadow-inner">
              <div className="text-[9px] text-gray-400 font-black uppercase tracking-widest mb-2 italic">Ops Completed</div>
              <div className="text-3xl font-black text-white tracking-tighter italic">{servicesCount(rides, driverData.id)}</div>
            </div>
          </div>
        </div>

        <div className="flex-1 overflow-y-auto p-10 pt-8 pb-24">
          <header className="flex justify-between items-center mb-8">
            <h3 className="text-[10px] font-black text-gray-300 uppercase tracking-widest italic">
              {activeRide ? "Operational Mission" : "Geospatial Stream"}
            </h3>
            {isOnline && !activeRide && <span className="flex h-3 w-3 rounded-full bg-green-500 animate-pulse border-4 border-white shadow-lg" />}
          </header>

          <AnimatePresence mode="wait">
            {activeRide ? (
              <motion.div 
                key="active"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                className="bg-white border-2 border-gray-50 p-10 rounded-[3rem] shadow-2xl"
              >
                <div className="flex items-center justify-between mb-10">
                   <div className="flex items-center gap-5">
                      <img 
                        src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${activeRide.userId}`} 
                        className="w-14 h-14 rounded-2xl bg-slate-50 border-2 border-gray-100" 
                        alt="Rider" 
                      />
                      <div>
                        <div className="text-[10px] text-gray-400 font-black uppercase tracking-widest">Designated Commuter</div>
                        <div className="text-xl font-black tracking-tighter uppercase italic">{activeRide.userName}</div>
                      </div>
                   </div>
                   <div className="p-4 bg-slate-50 rounded-2xl text-secondary shadow-sm hover:bg-primary hover:text-white transition-colors cursor-pointer">
                      <MessageCircle size={24} />
                   </div>
                </div>

                <div className="space-y-8 mb-12 relative px-2">
                   <div className="absolute left-6 top-8 bottom-8 w-[2px] bg-gray-100 border-r border-dashed border-gray-200" />
                   <div className="flex items-start gap-6 relative z-10">
                      <div className="w-4 h-4 rounded-full border-4 border-white bg-blue-500 mt-1.5 shrink-0 shadow-lg" />
                      <div>
                          <div className="text-[9px] text-gray-400 uppercase font-black tracking-widest mb-1 italic">Point of Ingress</div>
                          <div className="font-bold text-sm leading-tight text-secondary italic underline decoration-gray-100">{activeRide.pickup.address}</div>
                      </div>
                   </div>
                   <div className="flex items-start gap-6 relative z-10">
                      <div className="w-4 h-4 bg-primary mt-1.5 shrink-0 shadow-lg border-4 border-white rotate-45" />
                      <div>
                          <div className="text-[9px] text-gray-400 uppercase font-black tracking-widest mb-1 italic">Point of Egress</div>
                          <div className="font-bold text-sm leading-tight text-secondary italic underline decoration-gray-100">{activeRide.drop.address}</div>
                      </div>
                   </div>
                </div>

                <div className="flex gap-4">
                    {activeRide.status === "accepted" ? (
                      <button 
                        onClick={handleArrived}
                        className="flex-1 bg-secondary text-white font-black py-6 rounded-xl hover:bg-black transition-all shadow-[0_20px_40px_rgba(0,0,0,0.15)] uppercase tracking-widest text-xs italic"
                      >
                        Arrived at Site
                      </button>
                    ) : (
                      <button 
                        onClick={handleComplete}
                        className="flex-1 bg-primary text-white font-black py-6 rounded-xl hover:brightness-110 transition-all shadow-[0_20px_40px_rgba(255,51,51,0.2)] uppercase tracking-widest text-xs italic"
                      >
                        Clear Mission
                      </button>
                    )}
                    <button className="p-6 bg-slate-50 border border-gray-200 rounded-xl text-secondary hover:bg-white shadow-sm transition-all active:scale-95">
                        <Navigation size={24} strokeWidth={3} />
                    </button>
                </div>
              </motion.div>
            ) : isOnline ? (
              <div className="space-y-6">
                {pendingRides.length > 0 ? (
                  pendingRides.map(ride => (
                    <motion.div 
                      key={ride.id}
                      layout
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      className="bg-white border border-gray-100 p-8 rounded-[2.5rem] shadow-xl hover:shadow-2xl transition-all relative overflow-hidden group"
                    >
                      <div className="absolute top-0 right-0 p-8">
                         <div className="text-3xl font-black text-secondary italic uppercase tracking-tighter">{formatCurrency(ride.fare)}</div>
                      </div>
                      
                      <div className="flex items-center gap-4 mb-8">
                         <div className="w-12 h-12 bg-slate-50 rounded-2xl flex items-center justify-center font-black text-secondary border border-gray-100 group-hover:bg-primary group-hover:text-white transition-all">
                            {ride.userName.charAt(0)}
                         </div>
                         <div>
                            <div className="font-black uppercase italic tracking-tighter text-lg">{ride.userName}</div>
                            <div className="text-[9px] text-gray-400 font-black uppercase tracking-[0.2em] italic">Commuter Tier: Alpha</div>
                         </div>
                      </div>

                      <div className="space-y-4 mb-8">
                          <div className="text-xs text-gray-500 line-clamp-1 flex items-center gap-4 font-bold border-l-4 border-blue-500 pl-4 py-1 italic">
                               {ride.pickup.address}
                          </div>
                      </div>

                      <button 
                          onClick={() => handleAccept(ride)}
                          className="w-full bg-primary text-white font-black py-5 rounded-xl hover:brightness-110 transition-all shadow-xl uppercase tracking-widest text-xs italic"
                      >
                          Accept Engagement
                      </button>
                    </motion.div>
                  ))
                ) : (
                  <div className="text-center py-24 px-10 bg-slate-50/50 rounded-[3rem] border border-gray-100 relative overflow-hidden">
                      <div className="absolute inset-0 opacity-5 bg-[radial-gradient(#000_1px,transparent_1px)] [background-size:20px_20px]" />
                      <div className="relative mb-10 inline-block">
                        <div className="w-28 h-28 border-[10px] border-gray-100 border-t-primary rounded-full animate-spin" />
                        <div className="absolute inset-0 flex items-center justify-center">
                           <Zap className="text-primary animate-pulse" size={36} strokeWidth={3} />
                        </div>
                      </div>
                      <h4 className="text-2xl font-black mb-3 italic tracking-tighter uppercase relative z-10">Scanning Sectors...</h4>
                      <p className="text-gray-400 text-[10px] uppercase font-bold tracking-widest px-8 leading-relaxed relative z-10">System is balancing commuter demand with your current geospatial coordinates.</p>
                  </div>
                )
              }
              </div>
            ) : (
              <div className="text-center py-24 px-10 bg-slate-100 rounded-[3.5rem] border-4 border-dashed border-gray-200">
                <div className="w-28 h-28 bg-white rounded-[2rem] flex items-center justify-center mx-auto mb-10 shadow-3xl text-gray-200 transition-transform hover:rotate-12">
                  <Power size={56} strokeWidth={3} />
                </div>
                <h4 className="text-3xl font-black text-gray-400 mb-4 uppercase tracking-tighter italic">Fleet Disconnected</h4>
                <p className="text-xs text-gray-400 font-bold uppercase tracking-widest italic px-4 leading-relaxed">Engagement protocol is currently inert. Initialize power to begin revenue generation.</p>
              </div>
            )}
          </AnimatePresence>
        </div>
        
        {/* Help Banner */}
        <div className="p-8 bg-secondary text-white border-t border-white/5 flex items-center justify-between mt-auto">
            <div className="text-[10px] font-black uppercase tracking-[0.2em] flex items-center gap-4 italic group cursor-pointer">
               <History size={18} className="text-primary group-hover:rotate-180 transition-transform duration-500" /> Operational History
            </div>
            <ChevronUp size={20} className="text-gray-600" />
        </div>
      </div>

      {/* Map Content - Dynamic Full Screen */}
      <div className="flex-1 relative">
         <MapContainer center={[currentLocation.lat, currentLocation.lng]} zoom={14} scrollWheelZoom={false} zoomControl={false} className="h-full w-full">
            <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
            
            {/* Driver Current Position */}
            <Marker position={[currentLocation.lat, currentLocation.lng]}>
              <Popup className="font-bold">You are here</Popup>
            </Marker>

            {/* Active Ride Source & Destination */}
            {activeRide && (
                <>
                    <Marker position={[activeRide.pickup.coords.lat, activeRide.pickup.coords.lng]}>
                        <Popup>Pickup: {activeRide.userName}</Popup>
                    </Marker>
                    <Marker position={[activeRide.drop.coords.lat, activeRide.drop.coords.lng]}>
                        <Popup>Destination</Popup>
                    </Marker>
                </>
            )}
         </MapContainer>

         {/* Floating Map Controls */}
         <div className="absolute bottom-10 right-10 z-[1000] flex flex-col gap-4">
            <button className="bg-white p-5 rounded-3xl shadow-2xl hover:bg-gray-50 transition-all text-secondary border border-gray-100">
                <Navigation size={28} />
            </button>
         </div>

         {activeRide && (
             <motion.div 
               initial={{ y: -50, opacity: 0 }}
               animate={{ y: 0, opacity: 1 }}
               className="absolute top-10 left-1/2 -translate-x-1/2 z-[1000] bg-secondary text-white px-10 py-5 rounded-full shadow-2xl flex items-center gap-4 border-2 border-primary"
             >
                <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse shadow-[0_0_15px_rgba(34,197,94,0.6)]" />
                <span className="font-black text-sm tracking-widest uppercase">
                  {activeRide.status === 'accepted' ? 'Pickup' : 'In Progress'}
                </span>
             </motion.div>
         )}
      </div>
    </div>
  );
};

const servicesCount = (rides: any[], driverId: string) => {
    return rides.filter(r => r.driverId === driverId && r.status === 'completed').length + 8;
};

export default DriverDashboard;
