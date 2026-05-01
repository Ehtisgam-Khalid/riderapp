import React, { useState } from "react";
import { 
  BarChart3, Users, Car as SteeringWheel, AlertCircle, 
  Search, Filter, Download, MoreVertical, 
  TrendingUp, Wallet, ShieldCheck, Map as MapIcon,
  ChevronDown, ExternalLink, Activity, Star
} from "lucide-react";
import { format } from "date-fns";
import { useApp } from "../context/AppContext";
import { formatCurrency, cn } from "../lib/utils";
import { motion } from "motion/react";

const AdminDashboard = () => {
  const { rides, onlineDrivers } = useApp();
  const [activeTab, setActiveTab] = useState("overview");

  const stats = [
    { label: "Total Revenue", value: formatCurrency(125400), icon: <Wallet />, trend: "+12.5%", color: "text-green-500" },
    { label: "Active Drivers", value: onlineDrivers.length, icon: <SteeringWheel />, trend: "82% online", color: "text-primary" },
    { label: "Total Rides", value: rides.length + 1250, icon: <Activity />, trend: "+45 today", color: "text-blue-500" },
    { label: "Pending Support", value: 3, icon: <AlertCircle />, trend: "High Priority", color: "text-red-500" },
  ];

  return (
    <div className="flex h-[calc(100vh-80px)] bg-[#F8F9FA] flex-col md:flex-row">
      {/* Sidebar Navigation */}
      <div className="md:w-80 w-full bg-secondary text-white flex flex-col p-10 border-r border-white/5 overflow-y-auto relative">
        <div className="absolute inset-0 opacity-5 bg-[radial-gradient(#fff_1px,transparent_1px)] [background-size:20px_20px]" />
        
        <div className="flex items-center gap-4 mb-16 relative z-10">
            <div className="w-12 h-12 bg-primary rounded-xl flex items-center justify-center text-white rotate-45 shadow-[0_0_20px_rgba(255,51,51,0.4)]">
                <ShieldCheck size={28} className="-rotate-45" />
            </div>
            <div>
                <div className="font-black text-2xl tracking-tighter uppercase italic leading-none">CORE CONTROL</div>
                <div className="text-[9px] font-black text-primary tracking-[0.3em] uppercase mt-1">Smart Ride OS</div>
            </div>
        </div>

        <nav className="flex-1 space-y-3 relative z-10">
          {[
            { id: "overview", label: "Operations", icon: <BarChart3 size={20} /> },
            { id: "rides", label: "Fleet Stream", icon: <MapIcon size={20} /> },
            { id: "users", label: "Demographics", icon: <Users size={20} /> },
            { id: "drivers", label: "Operator Base", icon: <SteeringWheel size={20} /> },
            { id: "apk", label: "Artifacts", icon: <Download size={20} /> },
          ].map((item) => (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={cn(
                "w-full flex items-center justify-between p-5 rounded-xl transition-all font-black text-[11px] uppercase tracking-widest italic group",
                activeTab === item.id 
                  ? "bg-primary text-white shadow-[0_10px_30px_rgba(255,51,51,0.3)] pr-4" 
                  : "text-gray-500 hover:bg-white/5 hover:text-white"
              )}
            >
              <div className="flex items-center gap-4">
                {item.icon}
                {item.label}
              </div>
              {activeTab === item.id && <div className="w-1.5 h-1.5 bg-white rounded-full animate-pulse" />}
            </button>
          ))}
        </nav>

        <div className="pt-10 mt-10 border-t border-white/5 hidden md:block relative z-10">
            <div className="bg-white/5 p-8 rounded-[2rem] border border-white/10 backdrop-blur-sm">
                <div className="text-[10px] font-black text-gray-500 uppercase tracking-widest mb-6 italic">Protocol Status</div>
                <div className="flex items-center gap-4 mb-6">
                    <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse shadow-[0_0_10px_rgba(34,197,94,0.5)]" />
                    <span className="text-[10px] font-black uppercase tracking-tighter text-gray-300">Engine: Optimal</span>
                </div>
                <div className="w-full bg-white/5 h-2 rounded-full overflow-hidden border border-white/5">
                    <div className="w-4/5 h-full bg-primary" />
                </div>
            </div>
        </div>
      </div>

      {/* Main Content Area */}
      <main className="flex-1 overflow-y-auto p-6 md:p-12 relative">
        <div className="absolute inset-0 opacity-15 pointer-events-none bg-[radial-gradient(#000_1px,transparent_1px)] [background-size:40px_40px]" />
        
        <header className="flex flex-col lg:flex-row justify-between lg:items-end gap-10 mb-16 relative z-10">
          <div>
            <div className="text-primary font-black text-[10px] uppercase tracking-[0.5em] mb-3 italic">Reporting Service v2.4</div>
            <h1 className="text-6xl font-black tracking-tighter uppercase text-secondary italic leading-none">Console</h1>
          </div>
          <div className="flex flex-col sm:flex-row gap-5 items-end">
            <div className="relative group">
              <Search className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-primary transition-colors" size={20} />
              <input 
                type="text" 
                placeholder="Query Registry..." 
                className="bg-white border-2 border-gray-100 pl-14 pr-8 py-4 rounded-xl w-full sm:w-72 lg:w-96 font-black uppercase italic text-xs shadow-xl focus:border-primary outline-none transition-all"
              />
            </div>
            <button className="flex items-center justify-center gap-3 bg-secondary text-white px-8 py-4 rounded-xl font-black text-[11px] uppercase tracking-widest hover:bg-black transition-all shadow-2xl italic group">
               <Download size={18} className="group-hover:translate-y-1 transition-transform" /> Sync <ChevronDown size={14} />
            </button>
          </div>
        </header>

        {/* Global Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mb-16 relative z-10">
          {stats.map((stat, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05 }}
              className="bg-white p-10 rounded-[3rem] shadow-xl border border-gray-50 relative group overflow-hidden"
            >
              <div className="absolute -top-6 -right-6 text-gray-50 group-hover:text-primary/5 transition-all duration-500 rotate-12">
                 {React.cloneElement(stat.icon as React.ReactElement, { size: 120, strokeWidth: 4 })}
              </div>
              <div className="relative z-10">
                 <div className="flex items-center gap-3 mb-6">
                    <div className={cn("p-3 rounded-xl", stat.color.includes('green') ? 'bg-green-50' : stat.color.includes('primary') ? 'bg-red-50' : stat.color.includes('blue') ? 'bg-blue-50' : 'bg-red-50')}>
                        {React.cloneElement(stat.icon as React.ReactElement, { size: 24, strokeWidth: 3 })}
                    </div>
                    <span className="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] italic">{stat.label}</span>
                 </div>
                 <div className="text-4xl font-black text-secondary mb-3 tracking-tighter italic">{stat.value}</div>
                 <div className={cn("text-[10px] font-black flex items-center gap-2 italic uppercase", stat.color)}>
                    <TrendingUp size={12} strokeWidth={3} /> {stat.trend}
                 </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Dynamic Tables & Lists */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10 relative z-10">
            {/* Recent Rides Table */}
            <div className="lg:col-span-2 bg-white rounded-[3rem] shadow-2xl border border-gray-50 overflow-hidden">
                <div className="p-10 border-b border-gray-50 flex items-center justify-between bg-white relative">
                    <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1.5 h-10 bg-primary" />
                    <h2 className="font-black text-2xl text-secondary uppercase tracking-tighter italic px-4">Live Transaction Layer</h2>
                    {/* ... */}
                </div>
                <div className="overflow-x-auto">
                    <table className="w-full text-left">
                        <thead>
                            <tr className="bg-slate-50/50">
                                <th className="px-10 py-6 text-[9px] font-black text-gray-400 uppercase tracking-widest italic">Identity</th>
                                <th className="px-10 py-6 text-[9px] font-black text-gray-400 uppercase tracking-widest italic">Phase</th>
                                <th className="px-10 py-6 text-[9px] font-black text-gray-400 uppercase tracking-widest italic hidden sm:table-cell">Vector</th>
                                <th className="px-10 py-6 text-[9px] font-black text-gray-400 uppercase tracking-widest italic text-right">Yield</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-50">
                            {rides.map((ride) => (
                                <tr key={ride.id} className="hover:bg-slate-50 transition-all group">
                                    <td className="px-10 py-8">
                                        <div className="flex items-center gap-4">
                                            <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center font-black text-secondary border-2 border-gray-50 group-hover:border-primary group-hover:bg-primary group-hover:text-white transition-all shadow-sm">
                                                {ride.userName.charAt(0)}
                                            </div>
                                            <div>
                                                <div className="font-black text-sm text-secondary uppercase italic tracking-tighter">{ride.userName}</div>
                                                <div className="text-[9px] text-primary font-black uppercase tracking-widest">Type: Alpha</div>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-10 py-8">
                                        <span className={cn(
                                            "text-[9px] font-black px-4 py-2 rounded-lg uppercase tracking-[0.2em] border italic whitespace-nowrap",
                                            ride.status === 'completed' ? "bg-green-50 text-green-600 border-green-100" : 
                                            ride.status === 'accepted' ? "bg-blue-50 text-blue-600 border-blue-100" :
                                            "bg-red-50 text-primary border-red-100 animate-pulse"
                                        )}>
                                            {ride.status}
                                        </span>
                                    </td>
                                    <td className="px-10 py-8 hidden sm:table-cell">
                                        <div className="text-[11px] font-bold text-gray-500 line-clamp-1 max-w-[200px] italic">
                                            {ride.pickup.address} <span className="text-primary mx-1">→</span> {ride.drop.address}
                                        </div>
                                    </td>
                                    <td className="px-10 py-8 text-right">
                                        <div className="font-black text-secondary text-xl italic tracking-tighter">{formatCurrency(ride.fare)}</div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
                <div className="p-8 bg-slate-50 flex justify-center border-t border-gray-100">
                    <button className="text-[10px] font-black text-gray-400 uppercase tracking-[0.3em] hover:text-primary transition-colors flex items-center gap-4 italic active:scale-95">
                        Deep Observation <ChevronDown size={14} strokeWidth={3} />
                    </button>
                </div>
            </div>

            {/* List Section: Top Drivers */}
            <div className="space-y-10">
                <div className="bg-white p-10 rounded-[3rem] shadow-2xl border border-gray-50 relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-full -mr-16 -mt-16" />
                    <div className="flex items-center justify-between mb-10 relative z-10">
                        <h2 className="font-black text-xl text-secondary uppercase tracking-tighter italic">Alpha Fleet</h2>
                        <TrendingUp size={24} className="text-primary" strokeWidth={3} />
                    </div>
                    <div className="space-y-8 relative z-10">
                        {onlineDrivers.map((driver) => (
                            <div key={driver.id} className="flex items-center gap-5 p-3 hover:bg-slate-50 rounded-[1.5rem] transition-all cursor-pointer group border border-transparent hover:border-gray-100">
                                <div className="relative">
                                    <img src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${driver.name}`} className="w-14 h-14 rounded-2xl border-4 border-white shadow-xl group-hover:rotate-12 transition-transform" alt={driver.name} />
                                    <div className="absolute -bottom-1 -right-1 bg-green-500 w-5 h-5 rounded-full border-4 border-white shadow-lg animate-pulse" />
                                </div>
                                <div className="flex-1">
                                    <div className="font-black text-sm text-secondary uppercase italic tracking-tighter">{driver.name}</div>
                                    <div className="text-[9px] font-black text-primary uppercase tracking-[0.2em]">{driver.carModel}</div>
                                </div>
                                <div className="text-right">
                                    <div className="flex items-center gap-1 text-primary text-xs font-black italic">
                                        4.9 <Star size={12} fill="currentColor" />
                                    </div>
                                    <div className="text-[9px] font-black text-gray-300 uppercase italic">1.2k ops</div>
                                </div>
                            </div>
                        ))}
                    </div>
                    <button className="w-full mt-10 bg-slate-50 text-gray-400 font-black py-5 rounded-xl text-[10px] uppercase tracking-[0.3em] hover:bg-primary hover:text-white transition-all italic shadow-inner">
                        Fleet Nexus <ExternalLink size={14} className="inline ml-2" />
                    </button>
                </div>

                <div className="bg-secondary p-10 rounded-[3rem] shadow-[0_30px_60px_rgba(0,0,0,0.3)] text-white relative overflow-hidden group">
                    <div className="absolute -right-20 -bottom-20 w-80 h-80 bg-primary/30 rounded-full blur-[100px] opacity-40 group-hover:scale-110 transition-transform duration-700" />
                    <div className="relative z-10">
                        <div className="w-20 h-20 bg-white/10 rounded-[2rem] flex items-center justify-center mb-8 backdrop-blur-xl border border-white/10 group-hover:rotate-12 transition-transform">
                            <Download className="text-primary" size={36} strokeWidth={3} />
                        </div>
                        <h3 className="text-3xl font-black mb-3 tracking-tighter uppercase italic leading-none">BUILD v1.8.4</h3>
                        <p className="text-gray-500 text-[10px] font-bold mb-10 italic uppercase tracking-[0.2em]">Security Protocol Alpha Ready</p>
                        <button className="w-full bg-primary text-white font-black py-6 rounded-xl shadow-[0_20px_40px_rgba(255,51,51,0.3)] hover:brightness-110 transition-all flex items-center justify-center gap-4 italic text-sm tracking-widest">
                           DEPLOY PACKAGE <Activity size={20} />
                        </button>
                    </div>
                </div>
            </div>
        </div>
      </main>
    </div>
  );
};

export default AdminDashboard;
