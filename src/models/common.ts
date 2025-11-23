/**
 * Common/Shared Types
 * 
 * Types used across multiple domains
 */

export interface Region {
  id: number;
  documentId: string;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
  name: string;
}

export interface Position {
  id: number;
  documentId: string;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
  name: string;
  level: 'National' | 'Regional' | 'Local';
}

export interface PoliticalParty {
  id: number;
  documentId: string;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
  name: string;
  abbreviation: string;
}

/**
 * Pagination metadata (reusable)
 */
export interface PaginationMeta {
  page: number;
  pageSize: number;
  pageCount: number;
  total: number;
}

/**
 * Reusable API Response wrapper with pagination
 * Used when you need both data and pagination metadata
 */
export interface PaginatedResponse<T> {
  data: T[];
  meta: {
    pagination: PaginationMeta;
  };
}

/**
 * Query parameters for paginated requests
 */
export interface PaginationParams {
  page?: number;
  pageSize?: number;
}

/**
 * Sort parameters
 */
export interface SortParams {
  sort?: string; // e.g., "publishDate:desc", "name:asc"
}

/**
 * Filter parameters
 */
export interface FilterParams {
  filters?: Record<string, unknown>;
}

