'use client'

import { AnnouncementTicker } from "@/components/AnnouncementTicker";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { motion } from "framer-motion";
import { Search, Mail, Phone, MapPin, Briefcase, CheckCircle } from "lucide-react";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { useTranslations } from "next-intl";
import { usePoliticalParties, usePositions, useRegions } from "@/hooks/use-common";
import { useOfficials } from "@/hooks/use-officials";
import type { ElectedOfficial } from "@/models";
import { useQueryState, parseAsString } from "nuqs";
import { useDebounce } from "use-debounce";

export default function OfficialsPage() {
  const t = useTranslations();
  const [searchInput, setSearchInput] = useQueryState(
    'search',
    parseAsString
  );
  const [regionCode, setRegionCode] = useQueryState(
    'region',
    parseAsString
  );
  const [positionCode, setPositionCode] = useQueryState(
    'position',
    parseAsString
  );
  const [partyAbbr, setPartyAbbr] = useQueryState(
    'political_party',
    parseAsString
  );

  const [debouncedSearch] = useDebounce(searchInput, 1000);

  const { data: regions } = useRegions();
  const { data: positions } = usePositions();
  const { data: parties } = usePoliticalParties();

  const regionId = regionCode ? regions?.find(r => r.code === regionCode)?.id : undefined;
  const positionId = positionCode ? positions?.find(p => p.code === positionCode)?.id : undefined;
  const partyId = partyAbbr ? parties?.find(p => p.abbreviation === partyAbbr)?.id : undefined;

  const queryParams = {
    search: debouncedSearch || undefined,
    filters: {
      ...(regionId ? { region: regionId } : {}),
      ...(positionId ? { position: positionId } : {}),
      ...(partyId ? { political_party: partyId } : {}),
    },
  };

  const { data: officials, isLoading: officialsLoading } = useOfficials(queryParams);

  return (
    <div className="min-h-screen bg-background">
      <AnnouncementTicker />

      <div className="container mx-auto px-4 py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h1 className="mb-4 text-3xl font-bold text-foreground">{t('nav.officials')}</h1>
          
          <div className="space-y-4">
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

            <div className="flex flex-wrap gap-3">
              <Select 
                value={regionCode || "all"} 
                onValueChange={(value) => setRegionCode(value === "all" ? null : value)}
              >
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder={t('search.region')} />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">{t('search.allRegions')}</SelectItem>
                  {regions?.map((r) => (
                    <SelectItem key={r.id} value={r.code}>
                      {r.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <Select 
                value={positionCode || "all"} 
                onValueChange={(value) => setPositionCode(value === "all" ? null : value)}
              >
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder={t('search.position')} />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">{t('search.allPositions')}</SelectItem>
                  {positions?.map((p) => (
                    <SelectItem key={p.id} value={p.code}>
                      {p.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <Select 
                value={partyAbbr || "all"} 
                onValueChange={(value) => setPartyAbbr(value === "all" ? null : value)}
              >
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder={t('search.party')} />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">{t('search.allParties')}</SelectItem>
                  {parties?.map((p) => (
                    <SelectItem key={p.id} value={p.abbreviation}>
                      {p.abbreviation}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              {(regionCode || positionCode || partyAbbr || searchInput) && (
                <Button
                  variant="ghost"
                  onClick={() => {
                    setSearchInput(null);
                    setRegionCode(null);
                    setPositionCode(null);
                    setPartyAbbr(null);
                  }}
                >
                  Clear filters
                </Button>
              )}
            </div>
          </div>
        </motion.div>

        {officialsLoading ? (
          <div className="text-center py-12 text-muted-foreground">{t('loading')}</div>
        ) : officials?.length === 0 ? (
          <div className="text-center py-12 text-muted-foreground">{t('search.noResults')}</div>
        ) : (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3"
          >
            {officials?.map((official: ElectedOfficial, index: number) => (
              <motion.div
                key={official.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
              >
                <Link href={`/officials/${official.documentId}`}>
                  <Card className="group overflow-hidden transition-all hover:shadow-elegant">
                    <div className="p-6">
                      <div className="mb-4 flex items-start justify-between">
                        <div className="flex-1">
                          <div className="mb-2 flex items-center gap-2">
                            <h3 className="text-lg font-semibold text-foreground group-hover:text-primary">
                              {official.firstName} {official.lastName}
                            </h3>
                            {official.verified && (
                              <CheckCircle className="h-4 w-4 text-success" />
                            )}
                          </div>
                          <Badge variant="secondary" className="mb-2">
                            {official.position?.name}
                          </Badge>
                        </div>
                      </div>

                      <div className="space-y-2 text-sm text-muted-foreground">
                        <div className="flex items-center gap-2">
                          <MapPin className="h-4 w-4" />
                          <span>{official.region?.name} - {official.district}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Briefcase className="h-4 w-4" />
                          <span>{official.political_party?.abbreviation}</span>
                        </div>
                        {official.email && (
                          <div className="flex items-center gap-2">
                            <Mail className="h-4 w-4" />
                            <span className="truncate">{official.email}</span>
                          </div>
                        )}
                        {official.phone && (
                          <div className="flex items-center gap-2">
                            <Phone className="h-4 w-4" />
                            <span>{official.phone}</span>
                          </div>
                        )}
                      </div>
                    </div>
                  </Card>
                </Link>
              </motion.div>
            ))}
          </motion.div>
        )}
      </div>
    </div>
  );
}
