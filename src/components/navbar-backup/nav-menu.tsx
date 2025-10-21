import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from "@/components/ui/navigation-menu";
import { NavigationMenuProps } from "@radix-ui/react-navigation-menu";
import Link from "next/link";
import { useTranslations } from "next-intl";
import React from "react";

interface NavMenuWithNavigateProps extends NavigationMenuProps {
  onNavigate?: () => void;
}

export const NavMenu = (props: NavMenuWithNavigateProps) => {
  const { onNavigate, ...rest } = props;
  const t = useTranslations();

  return (
    <NavigationMenu {...rest}>
      <NavigationMenuList className="text-sm gap-6 space-x-0 data-[orientation=vertical]:flex-col data-[orientation=vertical]:items-start">
        <NavigationMenuItem>
          <NavigationMenuLink asChild>
            <Link href="/#datasets" className="rounded-md px-3 py-2 transition-colors hover:bg-muted hover:text-primary focus:bg-muted focus:text-primary" onClick={onNavigate}>
              {t("datasets")}
            </Link>
          </NavigationMenuLink>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <NavigationMenuLink asChild>
            <Link href="/#sdgs" className="rounded-md px-3 py-2 transition-colors hover:bg-muted hover:text-primary focus:bg-muted focus:text-primary" onClick={onNavigate}>
              {t("sdgs")}
            </Link>
          </NavigationMenuLink>
        </NavigationMenuItem>
        <NavigationMenuItem> 
          <NavigationMenuLink asChild>
            <Link href="/#contact-us" className="rounded-md px-3 py-2 transition-colors hover:bg-muted hover:text-primary focus:bg-muted focus:text-primary" onClick={onNavigate}>
              {t("contactUs")}
            </Link>
          </NavigationMenuLink>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  );
};
