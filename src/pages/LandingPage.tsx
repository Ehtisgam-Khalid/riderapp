import React from "react";
import { Download, Smartphone, CheckCircle, ShieldCheck, MapPin, ChevronRight } from "lucide-react";
import { motion } from "motion/react";
import { Link } from "react-router-dom";
import { cn } from "../lib/utils";

const LandingPage = () => {
  return (
    <div className="bg-[#F8F9FA]">
      {/* Hero Section */}
      <section className="relative h-[85vh] flex items-center bg-secondary overflow-hidden">
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#fff_1px,transparent_1px)] [background-size:32px_32px]" />
        <div className="absolute -right-20 top-0 w-[600px] h-[600px] bg-primary/20 rounded-full blur-[120px]" />
        
        <div className="max-w-7xl mx-auto px-8 relative z-10 w-full grid md:grid-cols-2 items-center gap-20">
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            className="text-white"
          >
            <div className="inline-block px-4 py-1 bg-white/10 backdrop-blur-md rounded-lg border border-white/10 text-[10px] font-black tracking-[0.3em] uppercase mb-8 text-primary">
              Pakistan's Next-Gen Logistics
            </div>
            <h1 className="text-6xl md:text-8xl font-black mb-8 leading-[0.9] tracking-tighter italic uppercase">
              Move <span className="text-white">Smart</span> <br />
              <span className="text-primary underline decoration-white/20">Ride Fast</span>
            </h1>
            <p className="text-lg md:text-xl text-gray-400 mb-10 max-w-lg font-medium leading-relaxed italic">
              "Building the future of logistics in Pakistan with a data-driven, geometric approach to urban mobility."
            </p>
            <div className="flex flex-wrap gap-6">
              <Link 
                to="/user" 
                className="px-10 py-5 bg-primary text-secondary font-black rounded-xl hover:bg-white transition-all transform active:scale-95 shadow-2xl flex items-center gap-3"
              >
                REQUEST RIDE <ChevronRight size={20} />
              </Link>
              <button 
                className="px-10 py-5 bg-white/5 backdrop-blur-md text-white border border-white/20 font-black rounded-xl flex items-center gap-3 hover:bg-white/10 transition-all border-dashed"
              >
                <Download size={20} />
                DOWNLOAD APK
              </button>
            </div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="hidden md:flex justify-center relative"
          >
            <div className="w-[300px] h-[600px] bg-[#1a1a1a] rounded-[3rem] border-[10px] border-[#2a2a2a] shadow-[0_0_100px_rgba(255,51,51,0.2)] overflow-hidden relative">
               <div className="absolute inset-x-0 top-0 h-8 bg-[#2a2a2a] rounded-b-3xl z-20 flex items-center justify-center">
                  <div className="w-12 h-1.5 bg-[#1a1a1a] rounded-full" />
               </div>
               <img src="https://images.unsplash.com/photo-1512428559087-560fa5ceab42?auto=format&fit=crop&q=80" className="w-full h-full object-cover grayscale brightness-50 contrast-125" alt="App Preview" />
               <div className="absolute bottom-10 left-1/2 -translate-x-1/2 w-4/5">
                  <div className="bg-primary p-6 rounded-2xl shadow-2xl">
                     <div className="w-8 h-1 bg-secondary rounded-full mb-3" />
                     <div className="w-12 h-1 bg-secondary/30 rounded-full mb-6" />
                     <div className="h-10 w-full bg-secondary rounded-xl" />
                  </div>
               </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Stats / Metrics */}
      <section className="py-24 bg-white border-y border-gray-100 relative">
        <div className="absolute inset-0 opacity-[0.03] bg-[radial-gradient(#000_1px,transparent_1px)] [background-size:24px_24px]" />
        <div className="max-w-7xl mx-auto px-8 relative">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-12">
            {[
              { label: "Active Drivers", val: "890+", color: "text-primary" },
              { label: "Total Rides", val: "1.2M", color: "text-secondary" },
              { label: "User Satisfaction", val: "4.9/5", color: "text-primary" },
              { label: "City Coverage", val: "12", color: "text-secondary" }
            ].map((stat, i) => (
              <div key={i} className="text-center group">
                <div className={cn("text-5xl font-black mb-2 tracking-tighter transition-transform group-hover:-translate-y-2", stat.color)}>{stat.val}</div>
                <div className="text-[10px] font-black uppercase tracking-widest text-gray-400">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-32 bg-[#F8F9FA]">
        <div className="max-w-7xl mx-auto px-8">
          <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-8">
            <div className="max-w-xl">
               <h2 className="text-5xl font-black tracking-tighter uppercase italic leading-none mb-6">
                 Engineered for <br/> <span className="text-primary italic">Efficiency</span>
               </h2>
               <p className="text-gray-500 font-medium">Our tech stack leverages real-time geometric balancing to ensure you get a ride in minutes, not hours.</p>
            </div>
            <button className="px-8 py-3 bg-white text-secondary border-2 border-secondary font-black text-xs uppercase tracking-widest hover:bg-secondary hover:text-white transition-all shadow-sm">
              Explore Tech Stack
            </button>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <FeatureCard 
              icon={<ShieldCheck className="text-primary" size={48} strokeWidth={2.5} />}
              title="Identity Guard"
              description="Multi-layer verification protocols for every partner and commuter."
            />
            <FeatureCard 
              icon={<MapPin className="text-secondary" size={48} strokeWidth={2.5} />}
              title="GeoPrecision"
              description="Advanced coordinate mapping for accurate pickup and lightning-fast arrival."
            />
            <FeatureCard 
              icon={<Smartphone className="text-primary" size={48} strokeWidth={2.5} />}
              title="Smart Gateway"
              description="Zero-friction digital payments via JazzCash integrated at the core architecture."
            />
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-secondary text-white py-24 px-8 border-t border-white/5">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-start gap-20">
          <div className="max-w-sm">
            <div className="flex items-center gap-4 mb-10">
              <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center relative">
                <div className="w-6 h-1 bg-white rotate-45 absolute rounded-full"></div>
                <div className="w-6 h-1 bg-white -rotate-45 absolute rounded-full"></div>
              </div>
              <span className="font-black text-2xl leading-none italic uppercase tracking-tighter">SMART RIDE</span>
            </div>
            <p className="text-gray-500 text-sm italic font-serif leading-relaxed">"Building the infrastructure of tomorrow's logistics ecosystem with geometric precision and operational excellence."</p>
          </div>
          
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-20">
             <div className="space-y-4">
                <h4 className="text-[10px] font-black uppercase tracking-widest text-primary">Ecosystem</h4>
                <div className="flex flex-col gap-2 text-sm font-medium text-gray-400">
                   <Link to="/user" className="hover:text-white transition-colors">Commuter Portal</Link>
                   <Link to="/driver" className="hover:text-white transition-colors">Fleet HQ</Link>
                   <Link to="/admin" className="hover:text-white transition-colors">Operations Room</Link>
                </div>
             </div>
             <div className="space-y-4">
                <h4 className="text-[10px] font-black uppercase tracking-widest text-primary">Artifacts</h4>
                <div className="flex flex-col gap-2 text-sm font-medium text-gray-400">
                   <a href="#" className="hover:text-white transition-colors">Android (APK)</a>
                   <a href="#" className="hover:text-white transition-colors">IOS (Beta)</a>
                   <a href="#" className="hover:text-white transition-colors">Docs</a>
                </div>
             </div>
          </div>
        </div>
        <div className="max-w-7xl mx-auto mt-24 pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-6">
           <p className="text-[10px] text-gray-600 font-black uppercase tracking-widest">© 2024 Smart Ride Logistics Corp. v2.4.1 Production</p>
           <div className="flex gap-8 text-[10px] text-gray-600 font-black uppercase tracking-widest">
              <a href="#" className="hover:text-white transition-colors">Legal</a>
              <a href="#" className="hover:text-white transition-colors">Privacy</a>
              <a href="#" className="hover:text-white transition-colors">Audit</a>
           </div>
        </div>
      </footer>
    </div>
  );
};

const FeatureCard = ({ icon, title, description }: { icon: React.ReactNode, title: string, description: string }) => (
  <div className="p-12 rounded-[2.5rem] bg-white border border-gray-100 hover:shadow-2xl transition-all group relative overflow-hidden">
    <div className="absolute top-0 right-0 p-8 opacity-[0.03] group-hover:opacity-[0.1] transition-opacity">
       {React.cloneElement(icon as React.ReactElement, { size: 120 })}
    </div>
    <div className="mb-10 p-2 inline-block bg-gray-50 rounded-2xl group-hover:bg-primary/10 transition-colors">
       {icon}
    </div>
    <h3 className="text-2xl font-black mb-4 uppercase tracking-tighter italic">{title}</h3>
    <p className="text-gray-400 font-medium leading-relaxed italic">{description}</p>
  </div>
);

export default LandingPage;
