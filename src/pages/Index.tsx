import { SelectedWork } from "@/components/SelectedWork";
import { Navigation } from "@/components/Navigation";
import { HeroSection } from "@/components/HeroSection";
import { ExperienceSection } from "@/components/ExperienceSection";
import { AchievementsSection } from "@/components/AchievementsSection";
import { GearSection } from "@/components/GearSection";
import { LinksSection } from "@/components/LinksSection";
import { Footer } from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navigation />
      <main id="main" tabIndex={-1}>
        <HeroSection />
        <SelectedWork />
        <ExperienceSection />
        <AchievementsSection />
        <LinksSection />
        <GearSection />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
