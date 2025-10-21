'use client'

import { useQuery } from "@tanstack/react-query";
import { api, Announcement } from "@/lib/api";
import { motion } from "framer-motion";
import { Megaphone, ExternalLink } from "lucide-react";
import { useTranslations } from 'next-intl';

export function AnnouncementTicker() {
  const t = useTranslations();
  const { data: announcements } = useQuery<Announcement[]>({
    queryKey: ['announcements'],
    queryFn: api.announcements.getAll,
  });

  const publishedAnnouncements = announcements?.filter(a => a.isPublished).slice(0, 5) || [];

  if (!publishedAnnouncements.length) return null;

  return (
    <div className="overflow-hidden border-b border-t bg-accent/10 py-2.5">
      <div className="container mx-auto px-4">
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-2 text-accent">
            <Megaphone className="h-4 w-4 animate-pulse" />
            <span className="text-xs font-semibold uppercase tracking-wide">{t('announcements.title')}</span>
          </div>
          <div className="flex-1 overflow-hidden">
            <motion.div
              animate={{ x: [0, -1000] }}
              transition={{
                duration: 35,
                repeat: Infinity,
                ease: "linear",
              }}
              className="flex space-x-8 whitespace-nowrap"
            >
              {[...publishedAnnouncements, ...publishedAnnouncements].map((announcement, idx) => (
                <a
                  key={`${announcement.id}-${idx}`}
                  href={announcement.externalLink || '#'}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group inline-flex items-center space-x-2 text-sm text-foreground transition-colors hover:text-primary"
                >
                  <span className="relative">
                    {announcement.title}
                    <span className="absolute bottom-0 left-0 h-px w-0 bg-primary transition-all group-hover:w-full" />
                  </span>
                  {announcement.externalLink && <ExternalLink className="h-3 w-3 transition-transform group-hover:translate-x-0.5" />}
                </a>
              ))}
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}
