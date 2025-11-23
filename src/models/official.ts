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
  prenom: string; // firstName
  nom: string; // lastName
  circonscription: string; // district
  biographie?: string; // biography
  date_de_debut_du_mandat: string; // termStartDate
  date_de_fin_du_mandat: string; // termEndDate
  email?: string;
  telephone?: string; // phone
  lien_source?: string | null; // sourceLink
  region: Region;
  fonction: Position; // position
  parti: PoliticalParty; // political_party
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

