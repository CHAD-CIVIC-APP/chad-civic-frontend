import { Button } from "@/components/ui/button";
import { useTranslations } from "next-intl";
import Link from "next/link";
import ThemeToggle from "../common/theme-toggle";
import { NavMenu } from "./nav-menu";
import { NavigationSheet } from "./navigation-sheet";
import { LanguageSwitcher } from "@/components/common/LanguageSwitcher";
import SVGLogo from '@/components/common/SVGLogo'

export const Navbar = () => {
const t = useTranslations();
    return (
        <nav className="fixed z-50 top-4 inset-x-4 h-16 bg-background/80 backdrop-blur-md border border-border/60 max-w-7xl mx-auto rounded-full shadow-xs shadow-black/5 dark:shadow-black/20">
            <div className="h-full flex items-center justify-between mx-auto px-6">
                {/* Logo */}
                <Link href="/" className="flex-shrink-0">
                    <SVGLogo className="w-10 h-10 transition-transform hover:scale-105" />
                </Link>

                {/* Desktop Menu - Centered */}
                <div className="hidden lg:flex justify-center flex-grow">
                    <NavMenu />
                </div>

                {/* Right Actions */}
                <div className="flex items-center">
                    {/* Utility Controls */}
                    <div className="hidden sm:flex items-center gap-1 mr-4 pr-4 border-r border-border/40">
                        <ThemeToggle />
                        <LanguageSwitcher />
                    </div>

                    {/* Auth Actions */}
                    <div className="hidden sm:flex items-center gap-3">
                            <>
                                <Button
                                    asChild
                                    variant="secondary"
                                    size="sm"
                                >
                                    <Link href="/auth/login">{t("signIn")}</Link>
                                </Button>
                                <Button
                                    asChild
                                    size="sm">
                                    <Link href="/auth/signup" className="font-medium">
                                        {t("getStarted")}
                                    </Link>
                                </Button>
                            </> 
                    </div>
                    {/* Mobile Auth Actions */}
                    <div className="sm:hidden flex items-center gap-2">
                        <NavigationSheet />
                    </div>
                </div>
            </div>
        </nav>
    );
};
