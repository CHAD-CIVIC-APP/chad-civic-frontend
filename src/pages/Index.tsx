import { Navbar } from "@/components/Navbar";
import { Hero } from "@/components/Hero";
import { AnnouncementTicker } from "@/components/AnnouncementTicker";
import { useTranslations } from "next-intl";

const Index = () => {
  const t = useTranslations();

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <AnnouncementTicker />
      <Hero />
      <footer className="border-t" style={{ border: '1px solid red'}}>
        <div className="container mx-auto px-4 text-center">
          <p className="text-sm text-muted-foreground">
            © 2025 {t("footer.about")}. {t("footer.rights")}.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
