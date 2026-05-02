import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ChevronLeft, Send, Phone, Video, MoreVertical } from "lucide-react";

const Chat = () => {
  const navigate = useNavigate();
  const [messages, setMessages] = useState([
    { id: 1, text: "Good Evening!", time: "8:29 pm", sender: "driver" },
    { id: 2, text: "Welcome to Car2go Customer Service", time: "8:29 pm", sender: "driver" },
    { id: 3, text: "Hello! I am on my way.", time: "8:30 pm", sender: "driver" },
  ]);
  const [input, setInput] = useState("");

  const handleSend = () => {
    if (input.trim()) {
      setMessages([...messages, { id: Date.now(), text: input, time: "Just now", sender: "user" }]);
      setInput("");
    }
  };

  return (
    <div className="flex flex-col h-screen bg-white">
      <div className="p-6 flex items-center gap-4 bg-white border-b border-gray-50">
        <button onClick={() => navigate(-1)} className="p-2 border border-gray-100 rounded-xl">
           <ChevronLeft size={24} />
        </button>
        <div className="flex-1 flex flex-col items-center">
           <h2 className="font-bold text-secondary">Sergio Ramasis</h2>
           <span className="text-[10px] font-bold text-green-500 uppercase">Online</span>
        </div>
        <div className="flex gap-2">
           <button className="p-2 text-gray-400"><Phone size={20} /></button>
           <button className="p-2 text-gray-400"><Video size={20} /></button>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto p-6 space-y-6">
         {messages.map((msg) => (
           <div key={msg.id} className={`flex flex-col ${msg.sender === "user" ? "items-end" : "items-start"}`}>
              <div className={`p-4 rounded-3xl max-w-[80%] text-sm font-medium ${
                msg.sender === "user" ? "bg-primary text-secondary rounded-tr-none shadow-sm" : "bg-[#F7F8F9] text-secondary rounded-tl-none"
              }`}>
                 {msg.text}
              </div>
              <span className="text-[10px] text-gray-400 mt-2 font-bold px-1">{msg.time}</span>
           </div>
         ))}
      </div>

      <div className="p-6 bg-white border-t border-gray-50 flex items-center gap-4 pb-10">
         <div className="flex-1 relative">
            <input 
              type="text" 
              placeholder="Type your message" 
              className="w-full h-14 bg-[#F7F8F9] rounded-2xl px-6 pr-12 font-medium border-none outline-none focus:ring-2 focus:ring-primary"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyPress={(e) => e.key === "Enter" && handleSend()}
            />
            <button 
              onClick={handleSend}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-primary"
            >
               <Send size={20} strokeWidth={3} />
            </button>
         </div>
      </div>
    </div>
  );
};

export default Chat;
