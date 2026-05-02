import React from "react";
import { BrowserRouter as Router, Routes, Route, Link, useNavigate } from "react-router-dom";
import { AppProvider, useApp } from "./context/AppContext";
import { Toaster } from "react-hot-toast";
import LandingPage from "./pages/LandingPage";
import UserDashboard from "./pages/UserDashboard";
import DriverDashboard from "./pages/DriverDashboard";
import AdminDashboard from "./pages/AdminDashboard";
import Onboarding from "./pages/Onboarding";
import Welcome from "./pages/Welcome";
import SignUp from "./pages/SignUp";
import OTP from "./pages/OTP";
import SetPassword from "./pages/SetPassword";
import SignIn from "./pages/SignIn";
import SelectAddress from "./pages/SelectAddress";
import SelectTransport from "./pages/SelectTransport";
import AvailableCars from "./pages/AvailableCars";
import CarDetails from "./pages/CarDetails";
import RideRequest from "./pages/RideRequest";
import RideConfirmed from "./pages/RideConfirmed";
import Tracking from "./pages/Tracking";
import Chat from "./pages/Chat";
import Payment from "./pages/Payment";
import History from "./pages/History";
import Profile from "./pages/Profile";
import Referral from "./pages/Referral";
import Settings from "./pages/Settings";

export default function App() {
  return (
    <AppProvider>
      <Router>
        <div className="max-w-md mx-auto bg-white min-h-screen shadow-2xl overflow-hidden relative border-x border-gray-100 font-sans">
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/onboarding" element={<Onboarding />} />
            <Route path="/welcome" element={<Welcome />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/otp" element={<OTP />} />
            <Route path="/set-password" element={<SetPassword />} />
            <Route path="/login" element={<SignIn />} />
            <Route path="/user" element={<UserDashboard />} />
            <Route path="/select-address" element={<SelectAddress />} />
            <Route path="/select-transport" element={<SelectTransport />} />
            <Route path="/available-cars" element={<AvailableCars />} />
            <Route path="/car-details" element={<CarDetails />} />
            <Route path="/ride-request" element={<RideRequest />} />
            <Route path="/ride-confirmed" element={<RideConfirmed />} />
            <Route path="/tracking" element={<Tracking />} />
            <Route path="/chat" element={<Chat />} />
            <Route path="/payment" element={<Payment />} />
            <Route path="/history" element={<History />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/referral" element={<Referral />} />
            <Route path="/settings" element={<Settings />} />
            <Route path="/driver" element={<DriverDashboard />} />
            <Route path="/admin" element={<AdminDashboard />} />
          </Routes>
          <Toaster position="top-center" />
        </div>
      </Router>
    </AppProvider>
  );
}
