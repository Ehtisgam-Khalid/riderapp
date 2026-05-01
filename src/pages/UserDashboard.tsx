import React, { useState, useEffect } from "react";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import { useApp } from "../context/AppContext";
import { 
  Search, MapPin, Navigation, Clock, CreditCard, Star, 
  ChevronRight, Car, Zap, Wallet, X, MessageCircle, ArrowRight,
  ShieldCheck
} from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { formatCurrency, cn } from "../lib/utils";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import LoginModal from "../components/LoginModal";
import toast from "react-hot-toast";

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
  const { currentUser, rides, createRideRequest, onlineDrivers } = useApp();
  const [step, setStep] = useState<"book" | "fare" | "finding" | "on-ride" | "payment">("book");
  const [pickup, setPickup] = useState("Karachi Cantonment Station");
  const [destination, setDestination] = useState("");
  const [showLogin, setShowLogin] = useState(false);
  const [selectedService, setSelectedService] = useState("economy");

  const services = [
    { id: "economy", name: "Smart Economy", price: 450, icon: <Car />, eta: "4 min" },
    { id: "premium", name: "Smart Premium", price: 850, icon: <Car />, eta: "3 min" },
    { id: "bike", name: "Smart Bike", price: 180, icon: <Zap />, eta: "2 min" },
  ];

  const KARACHI_COORDS: [number, number] = [24.8607, 67.0011];

  const handleBook = () => {
    if (!destination) {
      toast.error("Please enter a destination");
      return;
    }
    if (!currentUser) {
      setShowLogin(true);
      return;
    }
    setStep("finding");
    
    setTimeout(() => {
      const newRide = {
        userId: currentUser.id,
        userName: currentUser.name,
        pickup: { address: pickup, coords: { lat: 24.8607, lng: 67.0011 } },
        drop: { address: destination, coords: { lat: 24.8700, lng: 67.0100 } },
        fare: services.find(s => s.id === selectedService)?.price || 450,
      };
      createRideRequest(newRide);
      setStep("on-ride");
      toast.success("Driver matched!");
    }, 4000);
  };

  const handlePayment = () => {
    toast.success("Payment successful via JazzCash!");
    setStep("book");
    setDestination("");
  };

  return (
    <div className="h-[calc(100vh-80px)] flex flex-col md:flex-row relative overflow-hidden bg-[#F8F9FA]">
      {/* Map Section */}
      <div className="flex-1 h-full z-0 relative">
        <div className="absolute inset-0 opacity-5 bg-[radial-gradient(#000_1px,transparent_1px)] [background-size:24px_24px] pointer-events-none z-10" />
        <MapContainer center={KARACHI_COORDS} zoom={14} zoomControl={false} className="h-full w-full grayscale contrast-125 brightness-90">
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          />
          {onlineDrivers.map(driver => (
            <Marker key={driver.id} position={[driver.currentLocation.lat, driver.currentLocation.lng]}>
              <Popup>
                <div className="font-bold">{driver.name}</div>
                <div className="text-xs text-gray-500">{driver.carModel}</div>
              </Popup>
            </Marker>
          ))}
        </MapContainer>
        
        <div className="absolute top-6 left-6 z-10 flex flex-col gap-3">
          <button className="p-4 bg-white rounded-xl shadow-sm hover:shadow-md text-secondary border border-gray-100 transition-all">
            <Search size={22} strokeWidth={3} />
          </button>
        </div>
      </div>

      {/* Side Control Panel */}
      <div className="absolute bottom-0 md:relative md:w-[420px] w-full bg-white md:h-full shadow-2xl z-20 flex flex-col rounded-t-[2rem] md:rounded-none overflow-hidden border-l border-gray-100">
        <div className="p-10 flex-1 overflow-y-auto">
          <div className="w-16 h-1 bg-gray-100 rounded-full mx-auto mb-10 md:hidden" />
          
          <AnimatePresence mode="wait">
            {step === "book" && (
              <motion.div
                key="book"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
              >
                <div className="flex items-center gap-2 mb-2">
                   <div className="w-4 h-4 bg-primary rounded-sm rotate-45" />
                   <h2 className="text-[10px] font-black text-primary uppercase tracking-[0.3em]">Commuter Module</h2>
                </div>
                <h1 className="text-4xl font-black mb-10 tracking-tighter uppercase italic">Target <br/> Destination</h1>
                <div className="space-y-4 mb-10 relative">
                   <div className="absolute left-6 top-1/2 -translate-y-1/2 w-[2px] h-12 bg-gray-100 z-0 border-r border-dashed border-gray-200" />
                  <div className="relative z-10">
                    <div className="absolute left-5 top-1/2 -translate-y-1/2 w-3 h-3 rounded-full border-2 border-primary bg-white shadow-sm" />
                    <input 
                      type="text" 
                      value={pickup}
                      onChange={(e) => setPickup(e.target.value)}
                      className="w-full bg-slate-50 p-5 pl-12 rounded-xl font-bold border border-gray-100 focus:bg-white focus:ring-2 focus:ring-primary outline-none transition-all placeholder:text-gray-300"
                      placeholder="Origin"
                    />
                  </div>
                  <div className="relative z-10">
                    <div className="absolute left-5 top-1/2 -translate-y-1/2 w-3 h-3 bg-secondary rounded-sm shadow-md" />
                    <input 
                      type="text" 
                      value={destination}
                      onChange={(e) => setDestination(e.target.value)}
                      className="w-full bg-slate-50 p-5 pl-12 rounded-xl font-bold border border-gray-100 focus:bg-white focus:ring-2 focus:ring-primary outline-none transition-all placeholder:text-gray-300"
                      placeholder="Final destination"
                      autoFocus
                    />
                  </div>
                </div>

                {destination && (
                  <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-3">
                    <h3 className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-4">Service Tier</h3>
                    {services.map((service) => (
                      <button 
                        key={service.id}
                        onClick={() => setSelectedService(service.id)}
                        className={cn(
                          "w-full flex items-center justify-between p-5 rounded-xl border-2 transition-all group",
                          selectedService === service.id 
                            ? "bg-slate-50 border-primary shadow-sm" 
                            : "bg-white border-gray-50 hover:border-gray-200"
                        )}
                      >
                        <div className="flex items-center gap-4">
                          <div className={cn("p-3 rounded-lg transition-colors", selectedService === service.id ? "bg-primary text-white" : "bg-gray-100 text-gray-400")}>
                            {React.cloneElement(service.icon as React.ReactElement, { size: 20, strokeWidth: 3 })}
                          </div>
                          <div className="text-left">
                            <div className="font-black text-sm uppercase tracking-tighter">{service.name}</div>
                            <div className="text-[9px] text-gray-400 font-bold uppercase tracking-widest">{service.eta} • Available</div>
                          </div>
                        </div>
                        <div className="font-black text-lg text-secondary">{formatCurrency(service.price)}</div>
                      </button>
                    ))}
                    <button 
                      onClick={handleBook}
                      className="w-full bg-primary text-white font-black py-5 rounded-xl mt-8 hover:brightness-110 transition-all shadow-xl active:scale-[0.98] uppercase tracking-widest italic"
                    >
                      Initialize Booking
                    </button>
                  </motion.div>
                )}

                {!destination && (
                  <div className="space-y-6 pt-4">
                    <h3 className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Recent Coordinates</h3>
                    {[
                      { name: "LuckyOne Mall", addr: "Grid Alpha-8" },
                      { name: "Dolmen Mall Clifton", addr: "Sector Beta-4" },
                      { name: "Karachi Airport", addr: "Node Delta-1" }
                    ].map((place, i) => (
                      <div 
                        key={i} 
                        onClick={() => setDestination(place.name)}
                        className="flex items-center gap-4 p-4 hover:bg-slate-50 rounded-xl cursor-pointer group transition-colors border border-transparent hover:border-gray-100"
                      >
                        <div className="w-10 h-10 bg-gray-50 rounded-lg flex items-center justify-center group-hover:bg-primary/10 group-hover:text-primary transition-colors">
                          <Clock size={18} strokeWidth={3} />
                        </div>
                        <div className="flex-1">
                          <div className="font-bold text-sm uppercase tracking-tighter">{place.name}</div>
                          <div className="text-[10px] text-gray-400 uppercase font-black">{place.addr}</div>
                        </div>
                        <ChevronRight size={16} className="text-gray-200 group-hover:text-primary" />
                      </div>
                    ))}
                  </div>
                )}
              </motion.div>
            )}

            {step === "finding" && (
              <motion.div
                key="finding"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="flex flex-col items-center justify-center py-24 text-center"
              >
                <div className="relative mb-12">
                   <div className="absolute -inset-10 bg-primary/10 rounded-full blur-[50px] animate-pulse" />
                   <div className="w-32 h-32 border-[12px] border-primary border-t-transparent rounded-full animate-spin" />
                   <div className="absolute inset-0 flex items-center justify-center">
                     <Car className="text-primary animate-bounce" size={40} strokeWidth={3} />
                   </div>
                </div>
                <h2 className="text-3xl font-black mb-3 tracking-tighter uppercase italic">Balancing Flux...</h2>
                <p className="text-gray-400 font-bold text-xs uppercase tracking-widest px-10">Optimizing driver proximity for maximum geometric efficiency.</p>
                
                <button 
                  onClick={() => setStep("book")}
                  className="mt-16 text-primary font-black text-[10px] uppercase tracking-[0.2em] hover:bg-primary/5 px-8 py-4 rounded-xl transition-all border border-dashed border-primary/20"
                >
                  Terminate Request
                </button>
              </motion.div>
            )}

            {step === "on-ride" && (
              <motion.div
                key="on-ride"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
              >
                <div className="flex justify-between items-center mb-10 pb-10 border-b border-gray-100">
                  <div className="flex items-center gap-5">
                    <div className="relative">
                      <img 
                        src="https://api.dicebear.com/7.x/avataaars/svg?seed=driver1" 
                        className="w-20 h-20 rounded-2xl bg-slate-50 border-[6px] border-white shadow-xl" 
                        alt="Driver" 
                      />
                      <div className="absolute -bottom-2 -right-2 bg-primary text-white text-[9px] font-black px-3 py-1.5 rounded-lg flex items-center gap-1 shadow-lg border-2 border-white">
                        4.8 <Star size={10} fill="currentColor" />
                      </div>
                    </div>
                    <div>
                      <div className="text-2xl font-black tracking-tighter uppercase italic text-secondary">Ahmed Khan</div>
                      <div className="text-[10px] font-black text-gray-400 tracking-widest uppercase mt-1">Toyota Corolla • <span className="text-primary">ABC-123</span></div>
                    </div>
                  </div>
                  <button className="p-5 bg-slate-50 rounded-2xl hover:bg-gray-100 text-secondary transition-all border border-gray-200">
                    <MessageCircle size={24} strokeWidth={3} />
                  </button>
                </div>

                <div className="bg-slate-50 rounded-[2rem] p-8 mb-10 border border-gray-200 shadow-inner relative overflow-hidden">
                  <div className="absolute top-0 right-0 p-4 opacity-10">
                    <Navigation size={80} strokeWidth={1} />
                  </div>
                  <div className="flex justify-between items-center mb-8 relative z-10">
                    <div>
                      <div className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-2 italic">Proximity Delta</div>
                      <div className="text-4xl font-black text-secondary tracking-tighter">02:00</div>
                    </div>
                    <div className="text-right">
                      <div className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-2 italic">Calculated Fare</div>
                      <div className="text-4xl font-black text-primary tracking-tighter">{formatCurrency(450)}</div>
                    </div>
                  </div>
                  
                  <div className="h-2 w-full bg-gray-200 rounded-full overflow-hidden">
                    <motion.div 
                      initial={{ width: '0%' }}
                      animate={{ width: '68%' }}
                      className="h-full bg-primary"
                    />
                  </div>
                </div>

                <div className="space-y-4">
                    <button 
                      onClick={() => setStep("payment")}
                      className="w-full bg-secondary text-white font-black py-6 rounded-xl flex items-center justify-center gap-4 shadow-2xl hover:bg-black transition-all uppercase tracking-widest text-sm"
                    >
                      Proceed to Settlement <ArrowRight size={20} />
                    </button>
                    <button className="w-full text-red-500 font-black py-3 text-[10px] uppercase tracking-widest italic opacity-50 hover:opacity-100 transition-opacity">
                      Emergency SOS Protocol
                    </button>
                </div>
              </motion.div>
            )}

            {step === "payment" && (
              <motion.div
                key="payment"
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
              >
                <h2 className="text-5xl font-black mb-10 tracking-tighter uppercase italic">Fiscal <br/> Clearance</h2>
                
                <div className="bg-white border-2 border-primary rounded-[2rem] p-8 mb-10 shadow-2xl relative overflow-hidden group">
                  <div className="absolute right-0 top-0 w-48 h-48 bg-primary/5 rounded-full -mr-24 -mt-24 group-hover:scale-125 transition-transform duration-700" />
                  <div className="relative z-10">
                    <div className="flex items-center justify-between mb-10">
                      <img src="https://upload.wikimedia.org/wikipedia/commons/e/e0/JazzCash_Log_2017.png" alt="JazzCash" className="h-8 object-contain" />
                      <div className="text-[10px] font-black uppercase text-gray-300 tracking-[0.2em]">Validated Gateway</div>
                    </div>
                    <div className="mb-10">
                       <div className="text-[10px] text-gray-400 font-black uppercase tracking-widest mb-2 italic">Account Custodian</div>
                       <div className="text-2xl font-black uppercase tracking-tighter">{currentUser?.name || 'User'}</div>
                    </div>
                    <div className="flex justify-between items-end border-t border-dashed border-gray-100 pt-8">
                      <div className="text-4xl font-black tracking-tighter">{formatCurrency(450)}</div>
                      <div className="text-[10px] font-black text-gray-400 uppercase tracking-widest italic">Tax Inclusive</div>
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <button 
                    onClick={handlePayment}
                    className="w-full bg-primary text-white font-black py-6 rounded-xl flex items-center justify-center gap-4 shadow-2xl hover:brightness-110 transition-all uppercase tracking-widest text-sm"
                  >
                    Authorize Payment <CreditCard size={20} strokeWidth={3} />
                  </button>
                  <button 
                    onClick={() => setStep("on-ride")}
                    className="w-full text-gray-400 font-black py-3 text-[10px] uppercase tracking-widest italic hover:text-secondary transition-colors"
                  >
                    Switch Settlement Vector
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
        
        {/* Safety Banner */}
        <div className="p-5 bg-secondary text-white flex items-center justify-center gap-4 font-black text-[10px] tracking-[0.3em] uppercase italic border-t border-white/5">
          <ShieldCheck size={18} className="text-primary" /> Architecture Integrity Insured
        </div>
      </div>

      <LoginModal 
        isOpen={showLogin} 
        onClose={() => setShowLogin(false)} 
        onSuccess={() => setShowLogin(false)} 
      />
    </div>
  );
};

export default UserDashboard;

