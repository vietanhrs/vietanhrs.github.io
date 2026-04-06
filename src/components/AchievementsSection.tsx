import { Badge } from "@/components/ui/badge";
import { Trophy, Award, GraduationCap, ExternalLink } from "lucide-react";

interface Achievement {
  title: string;
  year: string;
  description: string;
  skills?: string[];
  link?: string;
  type: "competition" | "certificate" | "award";
}

const achievements: Achievement[] = [
  {
    title: "TOEIC",
    year: "Dec 2025",
    description: "980/990 - English proficiency certification",
    type: "certificate",
  },
  {
    title: "VMO Hackathon DApp Creator 2021",
    year: "2021",
    description: "Second Prize - Educational platform using Ethereum blockchain",
    skills: ["Angular", "Node.js", "Solidity", "Ethereum"],
    type: "award",
  },
  {
    title: "Blockchain Specialization",
    year: "2021",
    description: "Coursera certification",
    link: "https://coursera.org/verify/specialization/9EP3RFKY8QEZ",
    type: "certificate",
  },
  {
    title: "Deep Learning Specialization",
    year: "2020",
    description: "Coursera certification",
    link: "https://coursera.org/verify/specialization/KBWPAFP973NV",
    type: "certificate",
  },
  {
    title: "Youth IT Competition",
    year: "2017",
    description:
      "Second Prize - Creative Software for Cau Giay District's High School Students",
    type: "award",
  },
  {
    title: "Youth IT Competition",
    year: "2017",
    description:
      "Third Prize - Creative Software for Hanoi's High School Students",
    type: "award",
  },
  {
    title: "IT Competition for Gifted Students",
    year: "2015",
    description:
      "First Prize - Cau Giay District's Competition for Secondary School Students",
    type: "award",
  },
  {
    title: "IT Competition for Gifted Students",
    year: "2015",
    description:
      "Third Prize - Hanoi's Competition for Secondary School Students",
    type: "award",
  },
  {
    title: "Hanoi Youth IT Competitive Programming",
    year: "2015",
    description: "Third Prize",
    skills: ["Competitive Programming"],
    type: "competition",
  },
];

const typeIcons = {
  competition: GraduationCap,
  certificate: Award,
  award: Trophy,
};

const typeGradients = {
  competition: "from-accent/20 to-accent/5",
  certificate: "from-primary/20 to-primary/5",
  award: "from-syntax-variable/20 to-syntax-variable/5",
};

export function AchievementsSection() {
  return (
    <section id="achievements" className="py-24 bg-secondary/30">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto mb-16 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            <span className="syntax-keyword">const</span>{" "}
            <span className="syntax-variable">achievements</span>{" "}
            <span className="text-muted-foreground">=</span>{" "}
            <span className="syntax-function">[</span>
          </h2>
          <p className="text-muted-foreground font-mono text-sm">
            <span className="syntax-comment">// Certificates, awards, and competitive milestones</span>
          </p>
        </div>

        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {achievements.map((achievement, index) => {
            const Icon = typeIcons[achievement.type];
            return (
              <div
                key={index}
                className="group relative bg-card border border-border rounded-xl p-6 hover:border-primary/50 transition-all duration-300 hover:shadow-xl hover:-translate-y-1 overflow-hidden"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div
                  className={`absolute inset-0 bg-gradient-to-br ${typeGradients[achievement.type]} opacity-0 group-hover:opacity-100 transition-opacity duration-300`}
                />

                <div className="relative z-10">
                  <div className="flex items-center justify-between mb-4 gap-3">
                    <div className="w-12 h-12 rounded-lg bg-secondary flex items-center justify-center group-hover:scale-110 transition-transform">
                      <Icon className="w-6 h-6 text-primary" />
                    </div>
                    <Badge variant="outline" className="font-mono text-xs">
                      {achievement.year}
                    </Badge>
                  </div>

                  <h3 className="font-bold text-lg mb-2 group-hover:text-primary transition-colors">
                    {achievement.title}
                  </h3>

                  <p className="text-muted-foreground text-sm mb-4 leading-7">
                    {achievement.description}
                  </p>

                  {achievement.skills && (
                    <div className="flex flex-wrap gap-2 mb-4">
                      {achievement.skills.map((skill) => (
                        <Badge key={skill} variant="secondary" className="font-mono text-xs">
                          {skill}
                        </Badge>
                      ))}
                    </div>
                  )}

                  {achievement.link && (
                    <a
                      href={achievement.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 text-primary text-sm font-mono hover:underline"
                    >
                      <span>verify</span>
                      <ExternalLink className="w-3 h-3" />
                    </a>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        <div className="max-w-4xl mx-auto mt-12 text-center">
          <p className="text-muted-foreground font-mono text-3xl">
            <span className="syntax-function">]</span>
            <span className="text-muted-foreground">;</span>
          </p>
        </div>
      </div>
    </section>
  );
}
