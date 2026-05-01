export type UserRole = "user" | "driver" | "admin";

export interface LatLng {
  lat: number;
  lng: number;
}

export interface UserProfile {
  id: string;
  name: string;
  email: string;
  phone: string;
  role: UserRole;
  avatar?: string;
  rating?: number;
}

export interface DriverProfile extends UserProfile {
  carModel: string;
  carPlate: string;
  status: "online" | "offline" | "on-ride";
  currentLocation: LatLng;
  licenseVerified: boolean;
}

export interface RideRequest {
  id: string;
  userId: string;
  userName: string;
  pickup: {
    address: string;
    coords: LatLng;
  };
  drop: {
    address: string;
    coords: LatLng;
  };
  fare: number;
  status: "pending" | "accepted" | "picked-up" | "completed" | "cancelled";
  driverId?: string;
  driverName?: string;
  createdAt: number;
  updatedAt: number;
}

export interface APKVersion {
  version: string;
  releaseDate: string;
  downloadUrl: string;
  changelog: string[];
}
