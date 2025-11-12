/**
 * Announcements Hooks
 */

import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { queryKeys } from '@/lib/query-keys';
import {
  getAnnouncements,
  getAnnouncementByDocumentId,
  createAnnouncement,
  updateAnnouncement,
  deleteAnnouncement,
} from '@/services/announcements.service';
import type { AnnouncementQueryParams } from '@/models';

export const useAnnouncements = (params?: AnnouncementQueryParams) => {
  return useQuery({
    queryKey: [...queryKeys.announcements.all, params],
    queryFn: () => getAnnouncements(params),
  });
};

export const useAnnouncement = (documentId: string) => {
  return useQuery({
    queryKey: queryKeys.announcements.detail(documentId),
    queryFn: () => getAnnouncementByDocumentId(documentId),
    enabled: !!documentId,
  });
};

export const useCreateAnnouncement = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createAnnouncement,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.announcements.all });
    },
  });
};

export const useUpdateAnnouncement = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }: { id: number; data: unknown }) =>
      updateAnnouncement(id, data),
    onSuccess: (data) => {
      if (data?.documentId) {
        queryClient.invalidateQueries({
          queryKey: queryKeys.announcements.detail(data.documentId),
        });
      }
      queryClient.invalidateQueries({ queryKey: queryKeys.announcements.all });
    },
  });
};

export const useDeleteAnnouncement = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteAnnouncement,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.announcements.all });
    },
  });
};

