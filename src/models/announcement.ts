/**
 * Announcement Models
 */

export interface Announcement {
  id: number;
  documentId: string;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
  locale: string;
  title: string;
  content: string;
  tags?: string[];
  externalLink?: string;
  featuredImage?: string | null;
}

/**
 * Create/Update Announcement DTO
 */
export interface AnnouncementCreateInput {
  title: string;
  content: string;
  tags?: string[];
  externalLink?: string;
  featuredImage?: string;
  targetRegion?: number; 
  publishDate: string;
  unpublishDate?: string;
  isPublished?: boolean;
}

export interface AnnouncementUpdateInput extends Partial<AnnouncementCreateInput> {
  id: number;
}

/**
 * Announcement query parameters
 */
export interface AnnouncementQueryParams {
  page?: number;
  pageSize?: number;
  sort?: string;
  search?: string;
  filters?: {
    tags?: string[];
    locale?: string;
  };
}

