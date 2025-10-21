'use client'

import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
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
import { api, ElectedOfficial } from "@/lib/api";
import { motion } from "framer-motion";
import { Search, Mail, Phone, MapPin, Briefcase, CheckCircle } from "lucide-react";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { useTranslations } from "next-intl";

export default function OfficialsPage() {
  const t = useTranslations();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedRegion, setSelectedRegion] = useState<string>("");
  const [selectedPosition, setSelectedPosition] = useState<string>("");
  const [selectedParty, setSelectedParty] = useState<string>("");

  const { data: officials, isLoading: officialsLoading } = useQuery({
    queryKey: ['officials'],
    queryFn: api.officials.getAll,
  });

  const { data: regions } = useQuery({
    queryKey: ['regions'],
    queryFn: api.regions.getAll,
  });

  const { data: positions } = useQuery({
    queryKey: ['positions'],
    queryFn: api.positions.getAll,
  });

  const { data: parties } = useQuery({
    queryKey: ['politicalParties'],
    queryFn: api.politicalParties.getAll,
  });

  const filteredOfficials = officials?.filter((official: ElectedOfficial) => {
    const matchesSearch = searchQuery
      ? `${official.firstName} ${official.lastName}`.toLowerCase().includes(searchQuery.toLowerCase())
      : true;
    const matchesRegion = selectedRegion ? official.region?.id.toString() === selectedRegion : true;
    const matchesPosition = selectedPosition ? official.position?.id.toString() === selectedPosition : true;
    const matchesParty = selectedParty ? official.politicalParty?.id.toString() === selectedParty : true;
    return matchesSearch && matchesRegion && matchesPosition && matchesParty && official.published;
  });

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
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>

            <div className="flex flex-wrap gap-3">
              <Select value={selectedRegion} onValueChange={setSelectedRegion}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder={t('search.region')} />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">{t('search.allRegions')}</SelectItem>
                  {regions?.filter(r => r.isActive).map((region) => (
                    <SelectItem key={region.id} value={region.id.toString()}>
                      {region.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <Select value={selectedPosition} onValueChange={setSelectedPosition}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder={t('search.position')} />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">{t('search.allPositions')}</SelectItem>
                  {positions?.filter(p => p.isActive).map((position) => (
                    <SelectItem key={position.id} value={position.id.toString()}>
                      {position.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <Select value={selectedParty} onValueChange={setSelectedParty}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder={t('search.party')} />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">{t('search.allParties')}</SelectItem>
                  {parties?.filter(p => p.isActive).map((party) => (
                    <SelectItem key={party.id} value={party.id.toString()}>
                      {party.abbreviation}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              {(selectedRegion || selectedPosition || selectedParty) && (
                <Button
                  variant="ghost"
                  onClick={() => {
                    setSelectedRegion("");
                    setSelectedPosition("");
                    setSelectedParty("");
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
        ) : filteredOfficials?.length === 0 ? (
          <div className="text-center py-12 text-muted-foreground">{t('search.noResults')}</div>
        ) : (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3"
          >
            {filteredOfficials?.map((official: ElectedOfficial, index: number) => (
              <motion.div
                key={official.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
              >
                <Link href={`/officials/${official.id}`}>
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
                          <span>{official.politicalParty?.abbreviation}</span>
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
