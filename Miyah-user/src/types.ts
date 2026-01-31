export const WaterStatus = {
    UNKNOWN: 'UNKNOWN',
    AVAILABLE: 'AVAILABLE',
    SCARCE: 'SCARCE',
    CONTAMINATED: 'CONTAMINATED',
    NO_WATER: 'NO_WATER',
} as const;

export type WaterStatus = typeof WaterStatus[keyof typeof WaterStatus];

export const PowerStatus = {
    UNKNOWN: 'UNKNOWN',
    ON: 'ON',
    INTERMITTENT: 'INTERMITTENT',
    OFF: 'OFF',
} as const;

export type PowerStatus = typeof PowerStatus[keyof typeof PowerStatus];

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

export interface Report {
    id: string;
    neighborhoodId: string;
    type: string;
    timestamp: string; // ISO date string
    message: string;
    isVerified: boolean;
}

// Mesh Specific Types
export interface MeshPacket {
    type: 'NEIGHBORHOOD_UPDATE' | 'REPORT_NEW';
    payload: any;
    timestamp: number;
    senderId: string;
    messageId: string; // UUID for deduplication
}

export interface MeshPeer {
    id: string;
    lastSeen: number;
}
