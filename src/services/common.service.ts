/**
 * Common Service
 */

import { api } from '@/lib/api-client';
import type { Region, Position, PoliticalParty, Statistics } from '@/models';

export const getRegions = async (): Promise<Region[]> => {
  return api.get<Region[]>('/regions');
};

export const getPositions = async (): Promise<Position[]> => {
  return api.get<Position[]>('/positions');
};

export const getPoliticalParties = async (): Promise<PoliticalParty[]> => {
  return api.get<PoliticalParty[]>('/political-parties');
};

export const getLandingPageStats = async (): Promise<Statistics> => {
  return api.get<Statistics>('/landing-page');
};

