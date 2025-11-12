'use client'

import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { motion, AnimatePresence } from "framer-motion";
import { Calendar, ExternalLink, Sparkles, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useTranslations, useLocale } from "next-intl";
import { useAnnouncements } from "@/hooks/use-announcements";
import { useTags } from "@/hooks/use-tags";
import type { Announcement } from "@/models";
import { useQueryState, parseAsString } from "nuqs";
import { useDebounce } from "use-debounce";

export default function AnnouncementsPage() {
  const t = useTranslations();
  const locale = useLocale();  
  const [searchInput, setSearchInput] = useQueryState(
    'search',
    parseAsString
  );
  const [selectedTag, setSelectedTag] = useQueryState(
    'tag',
    parseAsString
  );

  const [debouncedSearch] = useDebounce(searchInput, 1000);

  const queryParams = {
    search: debouncedSearch || undefined,
    filters: {
      locale,
      ...(selectedTag ? { tags: [selectedTag] } : {}),
    },
    sort: 'publishedAt:desc',
  };

  const { data: announcements, isLoading } = useAnnouncements(queryParams);
  const { data: tags } = useTags(locale);

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

        {/* Search and Filters */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="mb-6 space-y-4"
        >
          {/* Search Input */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground" />
            <Input
              type="text"
              placeholder={t('search.placeholder')}
              value={searchInput || ''}
              onChange={(e) => setSearchInput(e.target.value || null)}
              className="pl-10"
            />
          </div>

          {/* Tags Filter */}
          {tags && tags.length > 0 && (
            <div className="flex flex-wrap gap-2">
              <Button
                variant={!selectedTag ? "default" : "outline"}
                size="sm"
                onClick={() => setSelectedTag(null)}
                className="rounded-full"
              >
                All
              </Button>
              {tags.map((tag) => (
                <Button
                  key={tag}
                  variant={selectedTag === tag ? "default" : "outline"}
                  size="sm"
                  onClick={() => setSelectedTag(selectedTag === tag ? null : tag)}
                  className="rounded-full"
                >
                  {tag}
                </Button>
              ))}
            </div>
          )}

          {/* Clear Filters */}
          {(searchInput || selectedTag) && (
            <Button
              variant="ghost"
              size="sm"
              onClick={() => {
                setSearchInput(null);
                setSelectedTag(null);
              }}
            >
              Clear filters
            </Button>
          )}
        </motion.div>

        {/* Content */}
        {isLoading ? (
          <div className="py-12 text-center text-muted-foreground">{t('loading')}</div>
        ) : announcements?.length === 0 ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="py-12 text-center"
          >
            <p className="text-muted-foreground">
              {t('search.noResults')}
            </p>
          </motion.div>
        ) : (
          <AnimatePresence mode="popLayout">
            <motion.div layout className="space-y-5">
              {announcements?.map((announcement: Announcement, index: number) => (
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
                            <h2 className="text-xl font-semibold text-foreground">
                              {announcement.title}
                            </h2>
    
                          </div>
                          
                          <div className="flex items-center gap-2 text-sm text-muted-foreground">
                            <Calendar className="h-4 w-4" />
                            <time dateTime={announcement.publishedAt}>
                              {new Date(announcement.publishedAt).toLocaleDateString('en-US', {
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
                                variant={selectedTag === tag ? "default" : "secondary"}
                                className="cursor-pointer hover:bg-primary hover:text-primary-foreground transition-colors"
                                onClick={() => setSelectedTag(selectedTag === tag ? null : tag)}
                              >
                                {tag}
                              </Badge>
                            ))}
                          </div>
                        )}
                      </div>

                      <div
                        className="prose prose-sm max-w-none mb-4 text-muted-foreground whitespace-pre-wrap"
                      >
                        {announcement.content}
                      </div>

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
