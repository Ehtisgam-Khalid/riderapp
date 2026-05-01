import React, { createContext, useContext, useState, useEffect } from "react";
import { UserProfile, DriverProfile, RideRequest, LatLng } from "../types";
import { generateId } from "../lib/utils";

interface AppContextType {
  currentUser: UserProfile | null;
  setCurrentUser: (user: UserProfile | null) => void;
  rides: RideRequest[];
  createRideRequest: (ride: Omit<RideRequest, "id" | "status" | "createdAt" | "updatedAt">) => void;
  updateRideStatus: (rideId: string, status: RideRequest["status"], driverId?: string) => void;
  onlineDrivers: DriverProfile[];
  simulateDriverMovement: () => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentUser, setCurrentUser] = useState<UserProfile | null>(null);
  const [rides, setRides] = useState<RideRequest[]>([]);
  const [onlineDrivers, setOnlineDrivers] = useState<DriverProfile[]>([
    {
      id: "driver-1",
      name: "Ahmed Khan",
      email: "ahmed@example.com",
      phone: "0300-1234567",
      role: "driver",
      carModel: "Toyota Corolla",
      carPlate: "ABC-123",
      status: "online",
      rating: 4.8,
      currentLocation: { lat: 24.8607, lng: 67.0011 }, // Karachi
      licenseVerified: true,
    },
    {
      id: "driver-2",
      name: "Zahid Ali",
      email: "zahid@example.com",
      phone: "0301-7654321",
      role: "driver",
      carModel: "Honda Civic",
      carPlate: "KHI-999",
      status: "online",
      rating: 4.9,
      currentLocation: { lat: 24.8700, lng: 67.0100 },
      licenseVerified: true,
    }
  ]);

  const createRideRequest = (ride: Omit<RideRequest, "id" | "status" | "createdAt" | "updatedAt">) => {
    const newRide: RideRequest = {
      ...ride,
      id: "ride-" + generateId(),
      status: "pending",
      createdAt: Date.now(),
      updatedAt: Date.now(),
    };
    setRides((prev) => [newRide, ...prev]);
  };

  const updateRideStatus = (rideId: string, status: RideRequest["status"], driverId?: string) => {
    setRides((prev) =>
      prev.map((r) =>
        r.id === rideId
          ? { ...r, status, driverId: driverId || r.driverId, updatedAt: Date.now() }
          : r
      )
    );
  };

  const simulateDriverMovement = () => {
    setOnlineDrivers((prev) =>
      prev.map((d) => ({
        ...d,
        currentLocation: {
          lat: d.currentLocation.lat + (Math.random() - 0.5) * 0.001,
          lng: d.currentLocation.lng + (Math.random() - 0.5) * 0.001,
        },
      }))
    );
  };

  useEffect(() => {
    const interval = setInterval(simulateDriverMovement, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <AppContext.Provider
      value={{
        currentUser,
        setCurrentUser,
        rides,
        createRideRequest,
        updateRideStatus,
        onlineDrivers,
        simulateDriverMovement,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) throw new Error("useApp must be used within an AppProvider");
  return context;
};
