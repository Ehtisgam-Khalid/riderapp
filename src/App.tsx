import React from "react";
import { BrowserRouter as Router, Routes, Route, Link, useNavigate } from "react-router-dom";
import { AppProvider, useApp } from "./context/AppContext";
import { Toaster } from "react-hot-toast";
import LandingPage from "./pages/LandingPage";
import UserDashboard from "./pages/UserDashboard";
import DriverDashboard from "./pages/DriverDashboard";
import AdminDashboard from "./pages/AdminDashboard";
import { User, ShieldCheck, Car as SteeringWheel, Home } from "lucide-react";

const NavigationShell = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="min-h-screen flex flex-col bg-[#F8F9FA]">
      <header className="h-20 bg-white border-b border-gray-200 flex items-center justify-between px-8 sticky top-0 z-50">
        <div className="flex items-center gap-4">
          <Link to="/" className="flex items-center gap-4 group">
            <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center relative transition-transform group-hover:rotate-6">
              <div className="w-6 h-1 bg-white rotate-45 absolute rounded-full"></div>
              <div className="w-6 h-1 bg-white -rotate-45 absolute rounded-full"></div>
            </div>
            <div>
              <h1 className="text-xl font-black tracking-tight text-secondary leading-none">SMART RIDE</h1>
              <p className="text-[10px] text-gray-400 uppercase font-black tracking-widest mt-1">Project Ecosystem</p>
            </div>
          </Link>
        </div>
        
        <nav className="flex items-center gap-8">
          <div className="flex items-center gap-6 text-xs font-black uppercase tracking-widest text-gray-400">
            <Link to="/user" className="hover:text-primary transition-colors flex items-center gap-2">
              <User size={16} strokeWidth={3} /> <span className="hidden sm:inline">User</span>
            </Link>
            <Link to="/driver" className="hover:text-primary transition-colors flex items-center gap-2">
              <SteeringWheel size={16} strokeWidth={3} /> <span className="hidden sm:inline">Driver</span>
            </Link>
            <Link to="/admin" className="hover:text-primary transition-colors flex items-center gap-2">
              <ShieldCheck size={16} strokeWidth={3} /> <span className="hidden sm:inline">Admin HQ</span>
            </Link>
          </div>
          <div className="hidden md:flex items-center gap-2 ml-4">
            <span className="px-3 py-1 bg-green-100 text-green-700 text-[9px] font-black rounded-full border border-green-200 uppercase tracking-tighter">Live v2.4</span>
            <button className="px-5 py-2.5 bg-secondary text-white text-[10px] font-black rounded-lg hover:bg-black transition-all shadow-lg active:scale-95 uppercase tracking-widest">
              Build App
            </button>
          </div>
        </nav>
      </header>
      <main className="flex-1 relative">
        {children}
      </main>
      <Toaster position="top-right" />
    </div>
  );
};

export default function App() {
  return (
    <AppProvider>
      <Router>
        <NavigationShell>
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/user" element={<UserDashboard />} />
            <Route path="/driver" element={<DriverDashboard />} />
            <Route path="/admin" element={<AdminDashboard />} />
          </Routes>
        </NavigationShell>
      </Router>
    </AppProvider>
  );
}
