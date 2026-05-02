import React, { useState, useEffect, useRef } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { ChevronLeft } from "lucide-react";
import emailjs from "@emailjs/browser";
import toast from "react-hot-toast";

const OTP = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const email = location.state?.email || "user@example.com";
  
  const [otpInput, setOtpInput] = useState(["", "", "", "", ""]);
  const [actualOtp, setActualOtp] = useState("");
  const [timer, setTimer] = useState(30);
  const [isSending, setIsSending] = useState(false);
  const hasSentFirst = useRef(false);

  // Initialize EmailJS
  useEffect(() => {
    emailjs.init("JTT7CdmtZbU81t0Rj");
  }, []);

  const sendOtpEmail = async (code: string) => {
    setIsSending(true);
    const serviceId = import.meta.env.VITE_EMAILJS_SERVICE_ID || "service_id"; // Replace with your Service ID
    const templateId = import.meta.env.VITE_EMAILJS_TEMPLATE_ID || "template_id"; // Replace with your Template ID
    
    const templateParams = {
      to_email: email,
      otp_code: code,
      app_name: "Easy Rider"
    };

    try {
      if (serviceId === "service_id" || templateId === "template_id") {
        console.warn("EmailJS Service ID or Template ID not set. Check your .env file.");
        toast.error("Email configuration missing. Using simulated OTP.");
      } else {
        await emailjs.send(serviceId, templateId, templateParams);
        toast.success(`OTP sent to ${email}`);
      }
    } catch (error) {
      console.error("Failed to send OTP:", error);
      toast.error("Failed to send email. Check console for details.");
    } finally {
      setIsSending(false);
    }
  };

  const generateAndSendOtp = () => {
    const newOtp = Math.floor(10000 + Math.random() * 90000).toString();
    setActualOtp(newOtp);
    console.log("Generated OTP:", newOtp); // For testing visibility
    sendOtpEmail(newOtp);
  };

  useEffect(() => {
    if (!hasSentFirst.current) {
      generateAndSendOtp();
      hasSentFirst.current = true;
    }
  }, []);

  useEffect(() => {
    if (timer > 0) {
      const t = setTimeout(() => setTimer(timer - 1), 1000);
      return () => clearTimeout(t);
    }
  }, [timer]);

  const handleChange = (index: number, value: string) => {
    if (/^\d*$/.test(value) && value.length <= 1) {
      const newOtp = [...otpInput];
      newOtp[index] = value;
      setOtpInput(newOtp);
      // Auto focus next
      if (value && index < 4) {
        const nextInput = document.getElementById(`otp-${index + 1}`);
        nextInput?.focus();
      }
    }
  };

  const handleVerify = () => {
    const enteredOtp = otpInput.join("");
    if (enteredOtp === actualOtp) {
      toast.success("Verification successful!");
      navigate("/set-password");
    } else {
      toast.error("Invalid OTP. Please try again.");
    }
  };

  const handleResend = () => {
    setTimer(30);
    generateAndSendOtp();
  };

  return (
    <div className="flex flex-col min-h-screen bg-white">
      <div className="p-6">
        <button onClick={() => navigate(-1)} className="p-2 border border-gray-100 rounded-xl">
           <ChevronLeft size={24} />
        </button>
      </div>

      <div className="flex-1 px-8 text-center">
        <h1 className="text-3xl font-black text-secondary mb-4">Phone verification</h1>
        <p className="text-gray-500 mb-2">Enter your OTP code sent to</p>
        <p className="font-bold text-secondary mb-12">{email}</p>
        
        <div className="flex justify-between gap-2 mb-10">
          {otpInput.map((digit, i) => (
            <input 
              key={i}
              id={`otp-${i}`}
              type="text" 
              inputMode="numeric"
              maxLength={1}
              className="w-14 h-14 bg-[#F7F8F9] rounded-xl text-center text-xl font-bold border-none focus:ring-2 focus:ring-primary outline-none"
              value={digit}
              onChange={(e) => handleChange(i, e.target.value)}
            />
          ))}
        </div>

        <p className="text-gray-500 font-medium">
          Didn't receive code? <button 
            disabled={timer > 0 || isSending}
            onClick={handleResend}
            className={`${(timer > 0 || isSending) ? "text-gray-400" : "text-primary"} font-bold ml-1`}
          >
            {isSending ? "Sending..." : `Resend again ${timer > 0 ? `(${timer}s)` : ""}`}
          </button>
        </p>

        {/* Debug helper for the user to see the OTP in case email is not configured */}
        <div className="mt-10 p-4 bg-gray-50 rounded-2xl border border-dashed border-gray-200">
           <p className="text-[10px] text-gray-400 uppercase font-black mb-1">Development Tip</p>
           <p className="text-xs text-secondary font-medium">
             Check console or use code: <span className="font-bold text-primary">{actualOtp}</span>
           </p>
        </div>
      </div>

      <div className="p-8 pb-12">
        <button 
          onClick={handleVerify}
          className="btn-primary"
        >
          Verify
        </button>
        
        <div className="mt-8 grid grid-cols-3 gap-y-6">
           {[1, 2, 3, 4, 5, 6, 7, 8, 9, '*', 0, 'X'].map((num, i) => (
             <button 
               key={i} 
               onClick={() => {
                 if (typeof num === 'number') {
                   const firstEmptyDigit = otpInput.findIndex(d => d === "");
                   if (firstEmptyDigit !== -1) handleChange(firstEmptyDigit, num.toString());
                 } else if (num === 'X') {
                   const lastFilledDigit = [...otpInput].reverse().findIndex(d => d !== "");
                   if (lastFilledDigit !== -1) {
                     const realIndex = 4 - lastFilledDigit;
                     const newOtp = [...otpInput];
                     newOtp[realIndex] = "";
                     setOtpInput(newOtp);
                   }
                 }
               }}
               className="h-12 text-xl font-bold text-secondary active:bg-gray-50 rounded-lg"
             >
                {num}
             </button>
           ))}
        </div>
      </div>
    </div>
  );
};

export default OTP;
