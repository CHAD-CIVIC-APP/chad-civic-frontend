const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:1337/api';

export interface Region {
  id: number;
  name: string;
  code: string;
  isActive: boolean;
  displayOrder?: number;
}

export interface Position {
  id: number;
  name: string;
  code: string;
  level: 'National' | 'Regional' | 'Local';
  isActive: boolean;
  displayOrder?: number;
}

export interface PoliticalParty {
  id: number;
  name: string;
  abbreviation: string;
  logo?: string;
  color?: string;
  isActive: boolean;
  displayOrder?: number;
}

export interface ElectedOfficial {
  id: number;
  lastName: string;
  firstName: string;
  region: Region;
  district: string;
  position: Position;
  politicalParty: PoliticalParty;
  biography?: string;
  photo?: string;
  termStart?: string;
  termEnd?: string;
  email?: string;
  phone?: string;
  sourceLink?: string;
  verified: boolean;
  published: boolean;
}

export interface Announcement {
  id: number;
  title: string;
  content: string;
  tags?: string[];
  externalLink?: string;
  featuredImage?: string;
  targetRegion?: Region;
  publishDate: string;
  unpublishDate?: string;
  isPublished: boolean;
}

// Mock data imports
import {
  mockRegions,
  mockPositions,
  mockPoliticalParties,
  mockOfficials,
  mockAnnouncements,
} from './mockData';

// Use mock data for now - replace with real API calls when backend is ready
const USE_MOCK_DATA = true;

// Helper function to simulate API delay
const simulateDelay = (ms: number = 300) => new Promise(resolve => setTimeout(resolve, ms));

// API functions will use React Query
export const api = {
  regions: {
    getAll: async (): Promise<Region[]> => {
      if (USE_MOCK_DATA) {
        await simulateDelay();
        return mockRegions;
      }
      const response = await fetch(`${API_URL}/regions`);
      if (!response.ok) throw new Error('Failed to fetch regions');
      const data = await response.json();
      return data.data || data;
    },
  },
  positions: {
    getAll: async (): Promise<Position[]> => {
      if (USE_MOCK_DATA) {
        await simulateDelay();
        return mockPositions;
      }
      const response = await fetch(`${API_URL}/positions`);
      if (!response.ok) throw new Error('Failed to fetch positions');
      const data = await response.json();
      return data.data || data;
    },
  },
  politicalParties: {
    getAll: async (): Promise<PoliticalParty[]> => {
      if (USE_MOCK_DATA) {
        await simulateDelay();
        return mockPoliticalParties;
      }
      const response = await fetch(`${API_URL}/political-parties`);
      if (!response.ok) throw new Error('Failed to fetch political parties');
      const data = await response.json();
      return data.data || data;
    },
  },
  officials: {
    getAll: async (): Promise<ElectedOfficial[]> => {
      if (USE_MOCK_DATA) {
        await simulateDelay();
        return mockOfficials;
      }
      const response = await fetch(`${API_URL}/elected-officials?populate=*`);
      if (!response.ok) throw new Error('Failed to fetch officials');
      const data = await response.json();
      return data.data || data;
    },
    getById: async (id: number): Promise<ElectedOfficial> => {
      if (USE_MOCK_DATA) {
        await simulateDelay();
        const official = mockOfficials.find(o => o.id === id);
        if (!official) throw new Error('Official not found');
        return official;
      }
      const response = await fetch(`${API_URL}/elected-officials/${id}?populate=*`);
      if (!response.ok) throw new Error('Failed to fetch official');
      const data = await response.json();
      return data.data || data;
    },
  },
  announcements: {
    getAll: async (): Promise<Announcement[]> => {
      if (USE_MOCK_DATA) {
        await simulateDelay();
        return mockAnnouncements;
      }
      const response = await fetch(`${API_URL}/announcements?populate=*&sort=publishDate:desc`);
      if (!response.ok) throw new Error('Failed to fetch announcements');
      const data = await response.json();
      return data.data || data;
    },
  },
};
