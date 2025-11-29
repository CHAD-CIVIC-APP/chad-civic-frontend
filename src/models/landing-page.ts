/**
 * Landing Page Models
 * 
 * Types for landing page data and hero sections
 */

export interface HeroSection {
  id: number;
  title: string;
  subtitle?: string;
  description?: string;
  ctaText?: string;
  ctaLink?: string;
  backgroundImage?: string;
  isActive: boolean;
}

export interface LandingPageData {
  hero: HeroSection;
  featuredAnnouncements?: number[]; // Announcement IDs
  featuredOfficials?: number[]; // Official IDs
  statistics?: {
    totalOfficials: number;
    totalAnnouncements: number;
    activeRegions: number;
  };
}

/**
 * Statistics response
 */
export interface Statistics {
  officials: number;
  regions: number;
  positions: number;
}

