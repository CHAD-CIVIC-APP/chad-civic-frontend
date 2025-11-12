/**
 * Tags Service
 */

import { api } from '@/lib/api-client';

export const getTags = async (locale?: string): Promise<string[]> => {
  const queryParams: Record<string, string> = {};
  
  if (locale) {
    queryParams['locale'] = locale;
  }
  
  return api.get<string[]>('/tags', queryParams);
};

