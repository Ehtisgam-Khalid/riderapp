import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ChevronLeft, CheckCircle, Smartphone, CreditCard, DollarSign, Wallet } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

const Payment = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState<"summary" | "success" | "feedback">("summary");

  return (
    <div className="flex flex-col min-h-screen bg-white">
      <div className="p-6 flex items-center gap-4">
        <button onClick={() => navigate(-1)} className="p-2 border border-gray-100 rounded-xl">
           <ChevronLeft size={24} />
        </button>
        <h2 className="text-xl font-bold flex-1 text-center pr-10">Payment</h2>
      </div>

      <div className="flex-1 px-6 flex flex-col items-center">
         <AnimatePresence mode="wait">
            {step === "summary" && (
              <motion.div 
                key="summary"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="w-full flex-1 flex flex-col"
              >
                  <div className="bg-[#F7F8F9] rounded-[2.5rem] p-8 mb-10 w-full">
                     <div className="flex justify-between items-center mb-8 border-b border-white pb-6">
                        <div className="flex items-center gap-3">
                           <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=Sergio" className="w-12 h-12 rounded-xl bg-white" alt="Driver" />
                           <div>
                              <h4 className="font-bold text-secondary text-sm">Sergio Ramasis</h4>
                              <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest italic">Mustang Shelby GT</p>
                           </div>
                        </div>
                        <div className="flex items-center gap-1 text-primary">
                           <Star size={14} fill="currentColor" />
                           <span className="font-bold text-sm">4.9</span>
                        </div>
                     </div>

                     <div className="space-y-4 mb-8">
                        <div className="flex justify-between font-bold text-sm">
                           <span className="text-gray-400">Mustang(per hour)</span>
                           <span className="text-secondary">$200</span>
                        </div>
                        <div className="flex justify-between font-bold text-sm">
                           <span className="text-gray-400">Vat 5%</span>
                           <span className="text-secondary">$20</span>
                        </div>
                        <div className="flex justify-between font-bold text-sm">
                           <span className="text-gray-400">Promo Code</span>
                           <span className="text-red-500">-$5</span>
                        </div>
                     </div>

                     <div className="flex justify-between items-center pt-6 border-t border-white">
                        <span className="text-sm font-bold text-secondary uppercase tracking-widest">Total</span>
                        <span className="text-3xl font-black text-secondary tracking-tighter">$215</span>
                     </div>
                  </div>

                  <div className="space-y-6">
                     <div className="flex justify-between items-center px-2">
                        <h3 className="font-bold text-gray-400 uppercase tracking-widest text-[10px]">Select payment method</h3>
                        <button className="text-primary font-bold text-xs">View All</button>
                     </div>
                     <div className="space-y-4">
                        <button className="w-full p-4 bg-primary/5 border-2 border-primary rounded-2xl flex items-center gap-4 transition-all">
                           <CreditCard size={20} className="text-primary" />
                           <div className="flex-1 text-left">
                              <div className="font-bold text-secondary text-sm">**** **** **** 8970</div>
                              <div className="text-[10px] text-gray-400 font-bold">Expires: 12/26</div>
                           </div>
                        </button>
                        <button className="w-full p-4 bg-white border-2 border-gray-50 rounded-2xl flex items-center gap-4 transition-all text-gray-300">
                           <Wallet size={20} />
                           <span className="font-bold text-sm">Cash</span>
                        </button>
                     </div>
                  </div>
                  
                  <div className="mt-auto pb-12">
                     <button 
                        onClick={() => setStep("success")}
                        className="btn-primary"
                     >
                        Confirm Ride
                     </button>
                  </div>
              </motion.div>
            )}

            {step === "success" && (
               <motion.div 
                  key="success"
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  className="flex-1 flex flex-col items-center justify-center text-center w-full"
               >
                  <div className="w-40 h-40 bg-primary/10 rounded-full flex items-center justify-center mb-10">
                     <CheckCircle size={80} className="text-primary" strokeWidth={3} />
                  </div>
                  <h2 className="text-3xl font-black text-secondary mb-4 italic uppercase tracking-tighter">Payment Success</h2>
                  <p className="text-gray-400 font-bold text-xs mb-2">Amount</p>
                  <div className="text-5xl font-black text-secondary tracking-tighter mb-12">$215</div>
                  
                  <div className="bg-[#F7F8F9] p-6 rounded-3xl w-full mb-12">
                     <p className="text-sm font-medium text-gray-500 leading-relaxed">
                        Your money has been successfully sent to Sergio Ramasis
                     </p>
                  </div>

                  <button 
                     onClick={() => setStep("feedback")}
                     className="btn-primary"
                  >
                     Please Feedback
                  </button>
               </motion.div>
            )}

            {step === "feedback" && (
                <motion.div 
                  key="feedback"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="w-full flex-1 flex flex-col items-center text-center py-10"
                >
                   <div className="w-32 h-32 bg-primary/5 rounded-full flex items-center justify-center mb-8">
                      <Star size={48} className="text-primary fill-primary" />
                   </div>
                   <h2 className="text-3xl font-black text-secondary mb-2 italic uppercase tracking-tighter">Excellent</h2>
                   <p className="text-gray-400 text-sm mb-12 font-medium">You rated Sergio Ramasis 4 star</p>
                   
                   <div className="w-full space-y-6">
                      <textarea 
                        placeholder="Write your text..."
                        className="w-full h-32 bg-[#F7F8F9] rounded-3xl p-6 border-none outline-none focus:ring-2 focus:ring-primary font-medium text-secondary"
                      />
                      
                      <div className="space-y-4">
                         <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Give some tips to Sergio Ramasis</p>
                         <div className="flex justify-between gap-3 px-4">
                            {["$1", "$2", "$5", "$10", "$20"].map(tip => (
                               <button key={tip} className="w-12 h-12 rounded-xl flex items-center justify-center border-2 border-gray-100 text-sm font-bold text-secondary active:scale-90 transition-all focus:border-primary focus:bg-primary/5">
                                  {tip}
                               </button>
                            ))}
                         </div>
                         <button className="text-xs font-bold text-primary underline">Enter other amount</button>
                      </div>

                      <div className="flex gap-4 pt-10">
                         <button onClick={() => navigate("/user")} className="flex-1 h-16 border-2 border-primary rounded-2xl font-black text-xs uppercase tracking-widest text-secondary active:scale-95 transition-all">
                            Back Home
                         </button>
                         <button onClick={() => navigate("/user")} className="flex-[2] btn-primary h-16">
                            Submit
                         </button>
                      </div>
                   </div>
                </motion.div>
            )}
         </AnimatePresence>
      </div>
    </div>
  );
};

const Star = ({ size, className, fill }: { size: number, className?: string, fill?: string }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill={fill || "none"} stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>
);

export default Payment;
