'use client'

import { Link } from "@/i18n/navigation";
import { usePathname } from "@/i18n/navigation";
import { useTranslations } from 'next-intl';
import { LanguageToggle } from "./LanguageToggle";
import { motion } from "framer-motion";
import { Building2, Menu } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
} from "@/components/ui/sheet";
import { LanguageSwitcher } from "@/components/common/LanguageSwitcher";
import ThemeToggle from "@/components/common/theme-toggle";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from "@/components/ui/navigation-menu";

export function Navbar() {
  const t = useTranslations();
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);

  const navLinks = [
    { path: "/", label: t('nav.home') },
    { path: "/officials", label: t('nav.officials') },
    { path: "/announcements", label: t('nav.announcements') },
  ];

  return (
    <motion.nav
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.3 }}
      className="sticky top-0 z-50 w-full border-b bg-card/80 backdrop-blur-xl supports-[backdrop-filter]:bg-card/60 shadow-xs shadow-black/5 dark:shadow-black/20"
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-3 group">
            <div className="relative">
              <div className="absolute inset-0 rounded-lg bg-primary/20 blur-sm transition-all group-hover:blur-md" />
              <div className="relative flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-primary shadow-md transition-transform group-hover:scale-105">
                <Building2 className="h-5 w-5 text-primary-foreground" />
              </div>
            </div>
            <div className="hidden flex-col sm:flex">
              <span className="text-sm font-bold leading-tight text-foreground">
                République du Tchad
              </span>
              <span className="text-xs text-muted-foreground">Officials Directory</span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex">
            <NavigationMenu>
              <NavigationMenuList className="text-sm gap-6 space-x-0">
                {navLinks.map((link) => {
                  const isActive = pathname === link.path;
                  return (
                    <NavigationMenuItem key={link.path}>
                      <NavigationMenuLink asChild>
                        <Link 
                          href={link.path} 
                          className={`rounded-md px-3 py-2 transition-colors ${
                            isActive
                              ? "bg-primary/90 text-white"
                              : "hover:bg-muted hover:text-primary focus:bg-muted focus:text-primary"
                          }`}
                        >
                          {link.label}
                        </Link>
                      </NavigationMenuLink>
                    </NavigationMenuItem>
                  );
                })}
              </NavigationMenuList>
            </NavigationMenu>
          </div>

          {/* Right Side Actions */}
          <div className="flex items-center space-x-2">
            <div className="hidden items-center space-x-2 sm:flex">
              {/* <LanguageToggle /> */}
              {/* <ThemeToggle /> */}
              <ThemeToggle />
              <LanguageSwitcher />
            </div>

            {/* Mobile Menu */}
            <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
              <SheetTrigger asChild className="md:hidden">
                <Button variant="ghost" size="icon">
                  <Menu className="h-5 w-5" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-[300px] sm:w-[350px]">
                <div className="flex flex-col h-full">
                  {/* Header */}
                  <div className="flex items-center justify-between py-6 border-b">
                    <div className="flex items-center space-x-3">
                      <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-primary">
                        <Building2 className="h-4 w-4 text-primary-foreground" />
                      </div>
                      <div>
                        <span className="text-sm font-bold text-foreground">République du Tchad</span>
                        <p className="text-xs text-muted-foreground">Officials Directory</p>
                      </div>
                    </div>
                  </div>

                  {/* Navigation Links */}
                  <div className="flex-1 py-6">
                    <nav className="space-y-2">
                      {navLinks.map((link) => {
                        const isActive = pathname === link.path;
                        return (
                          <Link
                            key={link.path}
                            href={link.path}
                            onClick={() => setMobileOpen(false)}
                            className={`group flex items-center rounded-lg px-4 py-3 text-sm font-medium transition-all duration-200 ${
                              isActive
                                ? "bg-primary text-primary-foreground shadow-sm"
                                : "text-muted-foreground hover:bg-muted hover:text-foreground"
                            }`}
                          >
                            <span className="flex-1">{link.label}</span>
                            {isActive && (
                              <div className="h-2 w-2 rounded-full bg-primary-foreground/60" />
                            )}
                          </Link>
                        );
                      })}
                    </nav>
                  </div>

                  <div className="border-t pt-6">
                    <div className="flex items-center justify-between px-4">
                      <div className="flex items-center space-x-2">
                        <LanguageSwitcher />
                        <ThemeToggle />
                      </div>
                    </div>
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </motion.nav>
  );
}
