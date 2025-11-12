/**
 * Announcements Service
 */

import { api } from '@/lib/api-client';
import type { Announcement, AnnouncementQueryParams } from '@/models';

export const getAnnouncements = async (params?: AnnouncementQueryParams): Promise<Announcement[]> => {
  const queryParams: Record<string, string | number | boolean> = {};

  // Add pagination
  if (params?.page) queryParams['pagination[page]'] = params.page;
  if (params?.pageSize) queryParams['pagination[pageSize]'] = params.pageSize;

  // Add sorting
  if (params?.sort) queryParams['sort'] = params.sort;

  if (params?.filters?.locale) {
    queryParams['locale'] = params.filters.locale;
  }

  // Add tags filter 
  if (params?.filters?.tags && params.filters.tags.length > 0) {
    if (params.filters.tags.length === 1) {
      queryParams['filters[tags][$contains]'] = params.filters.tags[0];
    } else {
      params.filters.tags.forEach((tag, index) => {
        queryParams[`filters[$or][${index}][tags][$contains]`] = tag;
      });
    }
  }

  // Add search filter 
  if (params?.search) {
    queryParams['filters[title][$contains]'] = params.search;
  }

  return api.get<Announcement[]>('/announcements', queryParams);
};

export const getAnnouncementByDocumentId = async (documentId: string): Promise<Announcement> => {
  return api.get<Announcement>(`/announcements/${documentId}`);
};

export const createAnnouncement = async (data: unknown): Promise<Announcement> => {
  return api.post<Announcement>('/announcements', { data });
};

export const updateAnnouncement = async (id: number, data: unknown): Promise<Announcement> => {
  return api.put<Announcement>(`/announcements/${id}`, { data });
};

export const deleteAnnouncement = async (id: number): Promise<void> => {
  return api.delete<void>(`/announcements/${id}`);
};

