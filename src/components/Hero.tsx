'use client'

import { useTranslations } from 'next-intl';
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { ArrowRight, Users, MapPin, Briefcase } from "lucide-react";
import { Link } from "@/i18n/navigation";

export function Hero() {
  const t = useTranslations();

  const stats = [
    { icon: Users, label: t('hero.stats.officials'), value: "150+" },
    { icon: MapPin, label: t('hero.stats.regions'), value: "23" },
    { icon: Briefcase, label: t('hero.stats.positions'), value: "45+" },
  ];

  return (
    <section className="relative overflow-hidden bg-background py-20 sm:py-32">
      <div className="absolute inset-0 -z-10 opacity-20">
        <div className="absolute left-1/2 top-0 h-96 w-96 -translate-x-1/2 rounded-full bg-primary blur-3xl" />
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-3xl text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, ease: "easeOut" }}
          >
            <h1 className="mb-6 text-4xl font-bold tracking-tight text-foreground sm:text-5xl lg:text-6xl">
              {t('hero.title')}
            </h1>
            <p className="mb-8 text-lg text-muted-foreground sm:text-xl">
              {t('hero.subtitle')}
            </p>
            <Link href="/officials">
              <Button size="lg" className="group bg-gradient-primary text-primary-foreground shadow-elegant transition-all hover:shadow-lg">
                {t('hero.cta')}
                <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
              </Button>
            </Link>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.15, ease: "easeOut" }}
            className="mt-16 grid grid-cols-1 gap-6 sm:grid-cols-3"
          >
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3, delay: 0.25 + index * 0.08 }}
                className="group border rounded-xl py-6 px-5 transition-all hover:shadow-elegant"
              >
                <stat.icon className="mx-auto mb-3 h-8 w-8 text-primary transition-transform group-hover:scale-110" />
                <div className="text-3xl font-bold text-foreground">{stat.value}</div>
                <div className="text-sm text-muted-foreground">{stat.label}</div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
