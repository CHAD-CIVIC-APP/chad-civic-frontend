/**
 * Query Keys
 * 
 * Centralized query keys for TanStack Query.
 */

export const queryKeys = {
  announcements: {
    all: ['announcements'] as const,
    detail: (documentId: string) => ['announcements', documentId] as const,
  },
  officials: {
    all: ['officials'] as const,
    detail: (documentId: string) => ['officials', documentId] as const,
  },
  landingPage: {
    hero: ['landingPage', 'hero'] as const,
    statistics: ['landingPage', 'statistics'] as const,
  },
  common: {
    regions: ['regions'] as const,
    positions: ['positions'] as const,
    politicalParties: ['politicalParties'] as const,
    tags: ['tags'] as const,
  },
} as const;

