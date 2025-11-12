/**
 * Landing Page Service
 */

import { api } from '@/lib/api-client';
import type { Statistics, HeroSection } from '@/models';

export const getHeroSection = async (): Promise<HeroSection> => {
  return api.get<HeroSection>('/hero-section?filters[isActive][$eq]=true');
};

export const getStatistics = async (): Promise<Statistics> => {
  return api.get<Statistics>('/statistics');
};

