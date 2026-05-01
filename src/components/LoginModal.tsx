import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Smartphone, Lock, ArrowRight, CheckCircle2 } from "lucide-react";
import { useApp } from "../context/AppContext";

interface LoginModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
}

const LoginModal: React.FC<LoginModalProps> = ({ isOpen, onClose, onSuccess }) => {
  const [step, setStep] = useState<"phone" | "otp">("phone");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [otp, setOtp] = useState(["", "", "", ""]);
  const { setCurrentUser } = useApp();

  const handlePhoneSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (phoneNumber.length < 10) return;
    setStep("otp");
  };

  const handleOtpChange = (index: number, value: string) => {
    if (value.length > 1) return;
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    // Auto-focus next
    if (value && index < 3) {
      const nextInput = document.getElementById(`otp-${index + 1}`);
      nextInput?.focus();
    }

    if (newOtp.every(v => v !== "")) {
      // Success!
      setTimeout(() => {
        setCurrentUser({
          id: "u123",
          name: "Ehtisham",
          email: "ehtisham@example.com",
          phone: phoneNumber,
          role: "user"
        });
        onSuccess();
      }, 500);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[2000] flex items-center justify-center p-4">
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        className="absolute inset-0 bg-secondary/80 backdrop-blur-sm" 
      />
      
      <motion.div 
        initial={{ opacity: 0, scale: 0.9, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        className="relative bg-white w-full max-w-lg rounded-xl shadow-2xl overflow-hidden border border-gray-100"
      >
        <div className="p-12">
          <div className="flex justify-center mb-12">
            <div className="w-20 h-2 bg-primary/20 rounded-full overflow-hidden">
              <div className="w-1/3 h-full bg-primary animate-ping" />
            </div>
          </div>
          
          <AnimatePresence mode="wait">
            {step === "phone" ? (
              <motion.div
                key="phone"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
              >
                <div className="text-[10px] text-primary font-black uppercase tracking-[0.5em] mb-4 italic">Security Gateway</div>
                <h2 className="text-5xl font-black mb-4 tracking-tighter uppercase italic leading-none">Authentication</h2>
                <p className="text-gray-400 font-bold uppercase text-[10px] tracking-widest mb-10 italic">Initialize your session to access global ride services.</p>
                
                <form onSubmit={handlePhoneSubmit}>
                  <div className="relative mb-8">
                    <div className="absolute left-6 top-1/2 -translate-y-1/2 flex items-center gap-3 border-r border-gray-100 pr-5">
                      <Smartphone size={18} className="text-primary" />
                      <span className="text-sm font-black italic">+92</span>
                    </div>
                    <input 
                      type="tel"
                      value={phoneNumber}
                      onChange={(e) => setPhoneNumber(e.target.value)}
                      placeholder="300 1234567"
                      className="w-full bg-slate-50 p-6 pl-24 rounded-lg font-black italic tracking-widest border border-gray-100 outline-none focus:border-primary transition-all text-xs"
                    />
                  </div>
                  <button 
                    type="submit"
                    className="w-full bg-secondary text-white font-black py-6 rounded-lg flex items-center justify-center gap-4 hover:bg-black transition-all shadow-2xl uppercase tracking-widest text-xs italic"
                  >
                    CONTINUE PROTOCOL <ArrowRight size={20} className="text-primary" />
                  </button>
                </form>
              </motion.div>
            ) : (
              <motion.div
                key="otp"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
              >
                <button onClick={() => setStep("phone")} className="text-gray-400 font-black text-[10px] uppercase tracking-widest mb-8 hover:text-primary transition-colors italic">← Regress Step</button>
                <h2 className="text-5xl font-black mb-4 tracking-tighter uppercase italic leading-none">Validation</h2>
                <p className="text-gray-400 font-bold uppercase text-[10px] tracking-widest mb-10 italic">Verification token dispatched into <span className="text-secondary">+92 {phoneNumber}</span> field.</p>
                
                <div className="flex justify-between gap-5 mb-12">
                  {otp.map((digit, i) => (
                    <input 
                      key={i}
                      id={`otp-${i}`}
                      type="text"
                      maxLength={1}
                      value={digit}
                      onChange={(e) => handleOtpChange(i, e.target.value)}
                      className="w-20 h-20 bg-slate-50 border-2 border-transparent rounded-lg text-center text-4xl font-black focus:border-primary outline-none transition-all italic text-secondary"
                    />
                  ))}
                </div>
                
                <div className="text-center">
                  <p className="text-[10px] text-gray-400 font-black uppercase tracking-widest italic">Missing payload? <button className="text-primary underline decoration-2 underline-offset-4">Re-initialize</button></p>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
        
        <div className="p-8 bg-slate-50 text-center border-t border-gray-100 relative overflow-hidden">
          <div className="absolute inset-0 opacity-5 bg-[radial-gradient(#000_1px,transparent_1px)] [background-size:10px_10px]" />
          <p className="text-[9px] text-gray-400 uppercase tracking-widest font-black italic relative z-10">Encrypted via SmartShield Geospatial Analytics Framework</p>
        </div>
      </motion.div>
    </div>
  );
};

export default LoginModal;
