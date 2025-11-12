/**
 * Officials Service
 */

import { api } from '@/lib/api-client';
import type { ElectedOfficial, OfficialQueryParams } from '@/models';

export const getOfficials = async (params?: OfficialQueryParams): Promise<ElectedOfficial[]> => {
  const queryParams: Record<string, string | number | boolean> = {
    populate: '*',
  };

  // Add pagination
  if (params?.page) queryParams['pagination[page]'] = params.page;
  if (params?.pageSize) queryParams['pagination[pageSize]'] = params.pageSize;

  // Add sorting
  if (params?.sort) queryParams['sort'] = params.sort;

  // Add search (firstName or lastName)
  if (params?.search) {
    queryParams['filters[$or][0][firstName][$containsi]'] = params.search;
    queryParams['filters[$or][1][lastName][$containsi]'] = params.search;
  }

  // Add filters
  if (params?.filters) {
    if (params.filters.region) {
      queryParams['filters[region][id][$eq]'] = params.filters.region;
    }
    if (params.filters.position) {
      queryParams['filters[position][id][$eq]'] = params.filters.position;
    }
    if (params.filters.political_party) {
      queryParams['filters[political_party][id][$eq]'] = params.filters.political_party;
    }
    if (params.filters.verified !== undefined) {
      queryParams['filters[verified][$eq]'] = params.filters.verified;
    }
  }

  return api.get<ElectedOfficial[]>('/elected-officials', queryParams);
};

export const getOfficialByDocumentId = async (documentId: string): Promise<ElectedOfficial> => {
  return api.get<ElectedOfficial>(`/elected-officials/${documentId}?populate=*`);
};

export const createOfficial = async (data: unknown): Promise<ElectedOfficial> => {
  return api.post<ElectedOfficial>('/elected-officials', { data });
};

export const updateOfficial = async (id: number, data: unknown): Promise<ElectedOfficial> => {
  return api.put<ElectedOfficial>(`/elected-officials/${id}`, { data });
};

export const deleteOfficial = async (id: number): Promise<void> => {
  return api.delete<void>(`/elected-officials/${id}`);
};

