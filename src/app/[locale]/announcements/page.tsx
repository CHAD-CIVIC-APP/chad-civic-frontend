'use client'

import { useQuery } from "@tanstack/react-query";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { api, Announcement } from "@/lib/api";
import { motion, AnimatePresence } from "framer-motion";
import { Calendar, ExternalLink, Sparkles, Bell } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useTranslations } from "next-intl";
import { useState } from "react";

export default function AnnouncementsPage() {
  const t = useTranslations();
  const [selectedTag, setSelectedTag] = useState<string | null>(null);

  const { data: announcements, isLoading } = useQuery<Announcement[]>({
    queryKey: ['announcements'],
    queryFn: api.announcements.getAll,
  });

  const publishedAnnouncements = announcements?.filter(a => a.isPublished) || [];
  
  const allTags = Array.from(
    new Set(publishedAnnouncements.flatMap(a => a.tags || []))
  );

  const filteredAnnouncements = selectedTag
    ? publishedAnnouncements.filter(a => a.tags?.includes(selectedTag))
    : publishedAnnouncements;

  const isNew = (date: string) => {
    const diff = Date.now() - new Date(date).getTime();
    return diff < 7 * 24 * 60 * 60 * 1000; // 7 days
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-8 py-12">
        {/* Header Section */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-10"
        >          
          <h1 className="mb-2 text-4xl font-bold text-foreground">
            {t('announcements.title')}
          </h1>
          <p className="text-muted-foreground">
            Stay updated with our latest news, features, and important updates
          </p>
        </motion.div>

        {/* Tags Filter */}
        {allTags.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="mb-6 flex flex-wrap gap-2"
          >
            <Button
              variant={selectedTag === null ? "default" : "outline"}
              size="sm"
              onClick={() => setSelectedTag(null)}
              className="rounded-full"
            >
              All
            </Button>
            {allTags.map((tag) => (
              <Button
                key={tag}
                variant={selectedTag === tag ? "default" : "outline"}
                size="sm"
                onClick={() => setSelectedTag(tag)}
                className="rounded-full"
              >
                {tag}
              </Button>
            ))}
          </motion.div>
        )}

        {/* Content */}
        {isLoading ? (
          <div className="py-12 text-muted-foreground">{t('loading')}</div>
        ) : filteredAnnouncements.length === 0 ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="py-12"
          >
            <p className="text-muted-foreground">
              {selectedTag ? `No announcements with tag "${selectedTag}"` : "No announcements available"}
            </p>
          </motion.div>
        ) : (
          <AnimatePresence mode="popLayout">
            <motion.div layout className="space-y-5">
              {filteredAnnouncements.map((announcement, index) => (
                <motion.div
                  layout
                  key={announcement.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.98 }}
                  transition={{ delay: index * 0.05 }}
                >
                  <Card className="group relative overflow-hidden border hover:border-primary/30 transition-all duration-300">                    
                    <div className="p-6">
                      <div className="mb-4 flex flex-wrap items-start justify-between gap-4">
                        <div className="flex-1 space-y-2">
                          <div className="flex items-center gap-3">
                            <h2 className="text-2xl font-semibold text-foreground">
                              {announcement.title}
                            </h2>
                            {isNew(announcement.publishDate) && (
                              <Badge variant="secondary" className="text-xs">
                                <Sparkles className="h-3 w-3 mr-1" />
                                New
                              </Badge>
                            )}
                          </div>
                          
                          <div className="flex items-center gap-2 text-sm text-muted-foreground">
                            <Calendar className="h-4 w-4" />
                            <time dateTime={announcement.publishDate}>
                              {new Date(announcement.publishDate).toLocaleDateString('en-US', {
                                month: 'long',
                                day: 'numeric',
                                year: 'numeric'
                              })}
                            </time>
                          </div>
                        </div>

                        {announcement.tags && announcement.tags.length > 0 && (
                          <div className="flex flex-wrap gap-2">
                            {announcement.tags.map((tag, idx) => (
                              <Badge 
                                key={idx}
                                variant="secondary" 
                                className="cursor-pointer hover:bg-primary hover:text-primary-foreground transition-colors"
                                onClick={() => setSelectedTag(tag)}
                              >
                                {tag}
                              </Badge>
                            ))}
                          </div>
                        )}
                      </div>

                      <div
                        className="prose prose-sm max-w-none mb-4 text-muted-foreground"
                        dangerouslySetInnerHTML={{ __html: announcement.content }}
                      />

                      {announcement.externalLink && (
                        <Button 
                          variant="outline" 
                          asChild
                          className="group/btn"
                        >
                          <a
                            href={announcement.externalLink}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-2"
                          >
                            {t('announcements.readMore')}
                            <ExternalLink className="h-4 w-4 group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5 transition-transform" />
                          </a>
                        </Button>
                      )}
                    </div>
                  </Card>
                </motion.div>
              ))}
            </motion.div>
          </AnimatePresence>
        )}
      </div>
    </div>
  );
}
