/**
 * Landing Page Hooks
 */

import { useQuery } from '@tanstack/react-query';
import { queryKeys } from '@/lib/query-keys';
import { getHeroSection, getStatistics } from '@/services/landing-page.service';

export const useHeroSection = () => {
  return useQuery({
    queryKey: queryKeys.landingPage.hero,
    queryFn: getHeroSection,
  });
};

export const useStatistics = () => {
  return useQuery({
    queryKey: queryKeys.landingPage.statistics,
    queryFn: getStatistics,
  });
};

