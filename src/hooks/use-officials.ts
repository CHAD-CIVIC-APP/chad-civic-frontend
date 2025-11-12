/**
 * Officials Hooks
 */

import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { queryKeys } from '@/lib/query-keys';
import {
  getOfficials,
  getOfficialByDocumentId,
  createOfficial,
  updateOfficial,
  deleteOfficial,
} from '@/services/officials.service';
import type { OfficialQueryParams } from '@/models';

export const useOfficials = (params?: OfficialQueryParams) => {
  return useQuery({
    queryKey: [...queryKeys.officials.all, params],
    queryFn: () => getOfficials(params),
  });
};

export const useOfficial = (documentId: string) => {
  return useQuery({
    queryKey: queryKeys.officials.detail(documentId),
    queryFn: () => getOfficialByDocumentId(documentId),
    enabled: !!documentId,
  });
};

export const useCreateOfficial = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createOfficial,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.officials.all });
    },
  });
};

export const useUpdateOfficial = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }: { id: number; data: unknown }) =>
      updateOfficial(id, data),
    onSuccess: (data) => {
      if (data?.documentId) {
        queryClient.invalidateQueries({
          queryKey: queryKeys.officials.detail(data.documentId),
        });
      }
      queryClient.invalidateQueries({ queryKey: queryKeys.officials.all });
    },
  });
};

export const useDeleteOfficial = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteOfficial,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.officials.all });
    },
  });
};

