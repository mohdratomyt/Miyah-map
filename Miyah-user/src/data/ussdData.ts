// USSD Service Information Database for Sudan
export interface ServiceInfo {
    location: string;
    distance: string;
    schedule?: string;
    details: string;
}

export interface TerritoryData {
    id: string;
    name: string;
    water: ServiceInfo;
    electricity: ServiceInfo;
}

export const SUDAN_TERRITORIES: Record<string, TerritoryData> = {
    '1': {
        id: '1',
        name: 'Khartoum',
        water: {
            location: 'Al-Sudan Mosque Water Station',
            distance: '15 km',
            schedule: 'Sundays and Tuesdays',
            details: 'Water delivery available. Bring containers. Free service for residents.'
        },
        electricity: {
            location: 'Khartoum Central Power Grid',
            distance: '8 km',
            schedule: 'Daily 6 AM - 10 PM',
            details: 'Power available most hours. Outages reported in evenings.'
        }
    },
    '2': {
        id: '2',
        name: 'Gezira (Al-Jazeera)',
        water: {
            location: 'Wad Madani Water Treatment Plant',
            distance: '12 km',
            schedule: 'Mondays, Wednesdays, Fridays',
            details: 'Clean water available. Limited supply during dry season.'
        },
        electricity: {
            location: 'Gezira Power Station',
            distance: '20 km',
            schedule: 'Daily 5 AM - 11 PM',
            details: 'Intermittent power. Check local schedule for your area.'
        }
    },
    '3': {
        id: '3',
        name: 'Omdurman',
        water: {
            location: 'Omdurman Nile Water Point',
            distance: '5 km',
            schedule: 'Daily',
            details: 'River water available. Filtration recommended before drinking.'
        },
        electricity: {
            location: 'Omdurman District Grid',
            distance: '3 km',
            schedule: 'Daily 7 AM - 9 PM',
            details: 'Stable power supply in most areas.'
        }
    },
    '4': {
        id: '4',
        name: 'Kassala',
        water: {
            location: 'Kassala Central Well',
            distance: '18 km',
            schedule: 'Tuesdays and Saturdays',
            details: 'Well water available. Community managed distribution.'
        },
        electricity: {
            location: 'Kassala Power Hub',
            distance: '25 km',
            schedule: 'Daily 6 AM - 8 PM',
            details: 'Limited capacity. Priority given to hospitals and schools.'
        }
    },
    '5': {
        id: '5',
        name: 'Port Sudan',
        water: {
            location: 'Red Sea Desalination Plant',
            distance: '10 km',
            schedule: 'Daily',
            details: 'Desalinated water available. Small fee for non-residents.'
        },
        electricity: {
            location: 'Port Sudan Power Station',
            distance: '7 km',
            schedule: 'Daily 24/7',
            details: 'Reliable power supply. Backup generators available.'
        }
    },
    '6': {
        id: '6',
        name: 'Nyala',
        water: {
            location: 'Nyala Community Water Center',
            distance: '22 km',
            schedule: 'Wednesdays and Sundays',
            details: 'Trucked water delivery. Register at local office.'
        },
        electricity: {
            location: 'Nyala Solar Grid',
            distance: '15 km',
            schedule: 'Daily 6 AM - 10 PM',
            details: 'Solar-powered grid. Weather dependent availability.'
        }
    }
};

export type USSDState =
    | 'IDLE'
    | 'MAIN_MENU'
    | 'TERRITORY_SELECT'
    | 'SERVICE_SELECT'
    | 'DISPLAY_INFO';

export interface USSDSession {
    state: USSDState;
    input: string;
    selectedTerritory?: string;
    selectedService?: 'water' | 'electricity';
    history: string[];
}
