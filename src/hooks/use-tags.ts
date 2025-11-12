/**
 * Tags Hooks
 */

import { useQuery } from '@tanstack/react-query';
import { queryKeys } from '@/lib/query-keys';
import { getTags } from '@/services/tags.service';

export const useTags = (locale?: string) => {
  return useQuery({
    queryKey: [...queryKeys.common.tags, locale],
    queryFn: () => getTags(locale),
    staleTime: 30 * 60 * 1000, // 30 minutes (tags don't change frequently)
  });
};

