'use client';

import { useEffect } from 'react';

export function NoTranslateMeta() {
  useEffect(() => {
    // Check if meta tag already exists to avoid unnecessary DOM manipulation
    const existingMeta = document.querySelector('meta[name="google"][content="notranslate"]');
    
    if (!existingMeta) {
      // Add the notranslate meta tag only if it doesn't exist
      const meta = document.createElement('meta');
      meta.name = 'google';
      meta.content = 'notranslate';
      document.head.appendChild(meta);
    }

    // No cleanup needed - we want this meta tag to persist
    // The meta tag will remain in the document head for the entire session
  }, []); // Empty dependency array means this runs only once per component mount

  return null;
}

