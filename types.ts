export enum WaterStatus {
  UNKNOWN = 'UNKNOWN',
  AVAILABLE = 'AVAILABLE',
  SCARCE = 'SCARCE',
  CONTAMINATED = 'CONTAMINATED',
  NO_WATER = 'NO_WATER',
}

export enum PowerStatus {
  UNKNOWN = 'UNKNOWN',
  ON = 'ON',
  INTERMITTENT = 'INTERMITTENT',
  OFF = 'OFF',
}

export interface LatLng {
  lat: number;
  lng: number;
}

export interface NeighborhoodData {
  id: string;
  name: string;
  waterStatus: WaterStatus;
  powerStatus: PowerStatus;
  lastUpdated: string; // ISO date string
  daysNoWater?: number;
  nearestWell?: string;
  waterTruckSchedule?: string[];
  alerts?: string[];
  centroid: LatLng;
}

export enum ReportType {
  WATER_ISSUE = 'WATER_ISSUE',
  POWER_ISSUE = 'POWER_ISSUE',
  NEW_INSTALLATION = 'NEW_INSTALLATION',
  GENERAL = 'GENERAL',
  // New Complaint Types
  COMPLAINT_WATER_QUALITY = 'COMPLAINT_WATER_QUALITY',
  COMPLAINT_NO_WATER_DELIVERY = 'COMPLAINT_NO_WATER_DELIVERY',
  COMPLAINT_INFRASTRUCTURE_DAMAGE = 'COMPLAINT_INFRASTRUCTURE_DAMAGE',
  COMPLAINT_OTHER = 'COMPLAINT_OTHER',
}

export interface Report {
  id: string;
  neighborhoodId: string;
  type: ReportType;
  timestamp: string; // ISO date string
  message: string;
  photoUrl?: string; // Changed from imageUrl for consistency with plan
  audioUrl?: string; // Base64 or Blob URL for audio
  isVerified: boolean;
  urgency?: 'Low' | 'Medium' | 'High' | 'Critical'; // New field for complaints
}

export type Language = 'en' | 'ar' | 'fur' | 'beja' | 'nub';

export interface Translation {
  [key: string]: string;
}

// For D3 Map visualization
export interface GeoFeatureProperties {
  id: string;
  name: string;
  waterStatus: WaterStatus;
  powerStatus: PowerStatus;
  daysNoWater?: number; // Add daysNoWater here
  // Add other properties from NeighborhoodData if needed for display
}

export interface GeoFeature {
  type: "Feature";
  properties: GeoFeatureProperties;
  geometry: {
    type: "Polygon" | "MultiPolygon";
    coordinates: number[][][][] | number[][][];
  };
}

export interface GeoJsonData {
  type: "FeatureCollection";
  features: GeoFeature[];
}