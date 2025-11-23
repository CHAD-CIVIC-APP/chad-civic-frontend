'use client'

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { motion } from "framer-motion";
import {
  ArrowLeft,
  Mail,
  Phone,
  MapPin,
  Briefcase,
  Calendar,
  Copy,
  ExternalLink,
} from "lucide-react";
import { toast } from "sonner";
import { useTranslations } from "next-intl";
import { use } from "react";
import { useOfficial } from "@/hooks/use-officials";

interface PageProps {
  params: Promise<{
    id: string
  }>
}

export default function OfficialDetailPage({ params }: PageProps) {
  const { id } = use(params);
  const t = useTranslations();
  const { data: official, isLoading } = useOfficial(id);

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    toast.success(t('official.copied'));
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background">
        <div className="container mx-auto px-4 py-12 text-center">{t('loading')}</div>
      </div>
    );
  }

  if (!official) {
    return (
      <div className="min-h-screen bg-background">
        <div className="container mx-auto px-4 py-12 text-center">{t('error')}</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-12">
        <Link href="/officials">
          <Button variant="ghost" className="mb-6">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back
          </Button>
        </Link>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="grid gap-8 lg:grid-cols-3"
        >
          <div className="lg:col-span-2">
            <Card className="p-8">
              <div className="mb-6 flex items-start justify-between">
                <div>
                  <div className="mb-3 flex items-center gap-3">
                    <h1 className="text-3xl font-bold text-foreground">
                      {official.prenom} {official.nom}
                    </h1>
                  </div>
                  <Badge className="bg-gradient-primary text-primary-foreground">
                    {official.fonction?.name}
                  </Badge>
                </div>
              </div>

              <div className="mb-8 grid gap-4 sm:grid-cols-2">
                <div className="flex items-center gap-3 rounded-lg bg-muted p-4">
                  <MapPin className="h-5 w-5 text-primary" />
                  <div>
                    <div className="text-xs text-muted-foreground">{t('search.region')}</div>
                    <div className="font-medium">{official.region?.name}</div>
                  </div>
                </div>

                <div className="flex items-center gap-3 rounded-lg bg-muted p-4">
                  <Briefcase className="h-5 w-5 text-primary" />
                  <div>
                    <div className="text-xs text-muted-foreground">{t('official.district')}</div>
                    <div className="font-medium">{official.circonscription}</div>
                  </div>
                </div>

                <div className="flex items-center gap-3 rounded-lg bg-muted p-4">
                  <Briefcase className="h-5 w-5 text-primary" />
                  <div>
                    <div className="text-xs text-muted-foreground">{t('search.party')}</div>
                    <div className="font-medium">{official.parti?.name}</div>
                  </div>
                </div>

                {official.date_de_debut_du_mandat && (
                  <div className="flex items-center gap-3 rounded-lg bg-muted p-4">
                    <Calendar className="h-5 w-5 text-primary" />
                    <div>
                      <div className="text-xs text-muted-foreground">{t('official.term')}</div>
                      <div className="font-medium">
                        {new Date(official.date_de_debut_du_mandat).getFullYear()}
                        {official.date_de_fin_du_mandat && ` - ${new Date(official.date_de_fin_du_mandat).getFullYear()}`}
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {official.biographie && (
                <div className="mb-6">
                  <h2 className="mb-3 text-xl font-semibold text-foreground">
                    {t('official.biography')}
                  </h2>
                  <div
                    className="prose prose-sm max-w-none text-muted-foreground"
                    dangerouslySetInnerHTML={{ __html: official.biographie }}
                  />
                </div>
              )}

              {official.lien_source && (
                <a
                  href={official.lien_source}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-sm text-primary hover:underline"
                >
                  {t('official.source')}
                  <ExternalLink className="h-4 w-4" />
                </a>
              )}
            </Card>
          </div>

          <div>
            <Card className="p-6">
              <h2 className="mb-4 text-lg font-semibold text-foreground">
                {t('official.contact')}
              </h2>
              <div className="space-y-3">
                {official.email && (
                  <div className="rounded-lg border bg-muted/50 p-4">
                    <div className="mb-2 flex items-center gap-2 text-sm text-muted-foreground">
                      <Mail className="h-4 w-4" />
                      {t('official.email')}
                    </div>
                    <div className="flex items-center justify-between gap-2">
                      <span className="truncate font-medium">{official.email}</span>
                      <Button
                        size="sm"
                        variant="ghost"
                        onClick={() => copyToClipboard(official.email!)}
                      >
                        <Copy className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                )}

                {official.telephone && (
                  <div className="rounded-lg border bg-muted/50 p-4">
                    <div className="mb-2 flex items-center gap-2 text-sm text-muted-foreground">
                      <Phone className="h-4 w-4" />
                      {t('official.phone')}
                    </div>
                    <div className="flex items-center justify-between gap-2">
                      <span className="font-medium">{official.telephone}</span>
                      <Button
                        size="sm"
                        variant="ghost"
                        onClick={() => copyToClipboard(official.telephone!)}
                      >
                        <Copy className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                )}
              </div>
            </Card>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
