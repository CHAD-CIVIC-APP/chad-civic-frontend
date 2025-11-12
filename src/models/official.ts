/**
 * Official Models
 */

import { Region, Position, PoliticalParty } from './common';

export interface ElectedOfficial {
  id: number;
  documentId: string;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
  firstName: string;
  lastName: string;
  district: string;
  biography?: string;
  termStartDate: string;
  termEndDate: string;
  email?: string;
  phone?: string;
  sourceLink?: string | null;
  verified: boolean;
  region: Region;
  position: Position;
  political_party: PoliticalParty;
  photo?: string | null;
}

/**
 * Create/Update Official DTO
 */
export interface OfficialCreateInput {
  lastName: string;
  firstName: string;
  region: number; // Region ID
  district: string;
  position: number; // Position ID
  politicalParty: number; // PoliticalParty ID
  biography?: string;
  photo?: string;
  termStart?: string;
  termEnd?: string;
  email?: string;
  phone?: string;
  sourceLink?: string;
  verified?: boolean;
  published?: boolean;
}

export interface OfficialUpdateInput extends Partial<OfficialCreateInput> {
  id: number;
}

/**
 * Official query parameters
 */
export interface OfficialQueryParams {
  page?: number;
  pageSize?: number;
  sort?: string; // e.g., "lastName:asc", "termStartDate:desc"
  search?: string; // Search in firstName or lastName
  filters?: {
    region?: number;
    position?: number;
    political_party?: number;
    verified?: boolean;
  };
}

