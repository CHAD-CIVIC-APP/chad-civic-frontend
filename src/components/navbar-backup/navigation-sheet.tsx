import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Menu } from "lucide-react";
import SVGLogo from '@/components/common/SVGLogo'
import { NavMenu } from "./nav-menu";
import Link from "next/link";
import { useTranslations } from "next-intl";
import { useState } from "react";

export const NavigationSheet = () => {
  const t = useTranslations();
  const [open, setOpen] = useState(false);
  const handleClose = () => setOpen(false);

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button variant="outline" size="icon" className="rounded-full">
          <Menu />
        </Button>
      </SheetTrigger>
      <SheetContent>
        <Link href="/" onClick={handleClose}>
          <SVGLogo className="w-10 h-10" />
        </Link>
        <NavMenu orientation="vertical" className="mt-12" onNavigate={handleClose} />

        <div className="mt-8 space-y-4">
              <Button variant="outline" className="w-full sm:hidden" asChild>
                <Link href="/auth/login" onClick={handleClose}>
                  {t("signIn")}
                </Link>
              </Button>
              <Button className="w-full sm:hidden" asChild>
                <Link href="/auth/signup" onClick={handleClose}>
                  {t("getStarted")}
                </Link>
              </Button>
        </div>
      </SheetContent>
    </Sheet>
  );
};
