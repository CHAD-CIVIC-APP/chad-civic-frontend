/**
 * Common Hooks
 */

import { useQuery } from '@tanstack/react-query';
import { queryKeys } from '@/lib/query-keys';
import { getRegions, getPositions, getPoliticalParties, getLandingPageStats } from '@/services/common.service';

export const useRegions = () => {
  return useQuery({
    queryKey: queryKeys.common.regions,
    queryFn: getRegions,
  });
};

export const usePositions = () => {
  return useQuery({
    queryKey: queryKeys.common.positions,
    queryFn: getPositions,
  });
};

export const usePoliticalParties = () => {
  return useQuery({
    queryKey: queryKeys.common.politicalParties,
    queryFn: getPoliticalParties,
  });
};

export const useLandingPageStats = () => {
  return useQuery({
    queryKey: queryKeys.landingPage.statistics,
    queryFn: getLandingPageStats,
  });
};

