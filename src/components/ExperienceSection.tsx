import { Badge } from "@/components/ui/badge";
import { Building2, Calendar, GraduationCap, Briefcase } from "lucide-react";

interface Experience {
  title: string;
  period: string;
  organization: string;
  description?: string;
  skills: string[];
  type: "work" | "research" | "teaching";
}

const experiences: Experience[] = [
  {
    title: "Co-founder",
    period: "November 2025 - Present",
    organization: "Wins Residence",
    description: "Digital Media, Foreign Languages",
    skills: ["Venture Capital", "Digital Marketing", "Management"],
    type: "work",
  },
  {
    title: "Blockchain & Software Engineer",
    period: "November 2022 - Present",
    organization: "Teko Solution",
    skills: [
      "Micro-frontend",
      "Aiken",
      "Golang",
      "Kotlin",
      "React",
      "CI/CD",
      "TypeScript",
    ],
    type: "work",
  },
  {
    title: "Data Mining & Analysis in DeFi",
    period: "April 2022 - Present",
    organization: "Faculty of Finance & Banking - UEB - VNU",
    description:
      "Research: The determinants of funding liquidity risk in decentralized lending",
    skills: ["Python", "GraphQL"],
    type: "research",
  },
  {
    title: "Decentralized Applications Developer",
    period: "October 2021 - June 2022",
    organization: "TVM Digital",
    skills: ["Angular", "Node.js", "Solidity", "Ethereum"],
    type: "work",
  },
  {
    title: "Blockchain Researcher",
    period: "September 2021 - November 2022",
    organization: "Blockchain Research Lab - UET",
    description: "Supervisor: Associate Professor PhD. Trương Anh Hoàng",
    skills: ["Solidity", "Rust", "Ethereum", "Avalanche", "Terra"],
    type: "research",
  },
  {
    title: "Teaching Assistant - Robotics",
    period: "2020 - 2022",
    organization: "INT 3409 - ROS (Robot Operating System)",
    description:
      "Teachers: PhD. Ta Viet Cuong, PhD. Le Nguyen Khoi, Grad Student. Pham Dình Tuan",
    skills: ["C++", "Python", "Tensorflow", "OpenCV"],
    type: "teaching",
  },
  {
    title: "Evolutionary Computation Research",
    period: "2020 - 2022",
    organization: "Computer Science Laboratory - UET",
    description: "Supervisor: PhD. Le Nguyen Khoi",
    skills: ["Python", "Tensorflow"],
    type: "research",
  },
  {
    title: "ML/Computer Vision for Robotics",
    period: "2019 - 2022",
    organization: "Computer Science Laboratory - UET",
    description: "Supervisor: PhD. Le Nguyen Khoi",
    skills: ["C++", "Python", "Tensorflow", "OpenCV"],
    type: "research",
  },
];

const typeIcons = {
  work: Briefcase,
  research: GraduationCap,
  teaching: Building2,
};

const typeColors = {
  work: "bg-primary/10 text-primary border-primary/20",
  research: "bg-accent/10 text-accent border-accent/20",
  teaching: "bg-syntax-string/10 text-syntax-string border-syntax-string/20",
};

export function ExperienceSection() {
  return (
    <section id="experiences" className="py-24 relative">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="max-w-4xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            <span className="syntax-keyword">interface</span>{" "}
            <span className="syntax-function">Experience</span>{" "}
            <span className="text-muted-foreground">{"{"}</span>
          </h2>
          <p className="text-muted-foreground font-mono text-sm pl-4">
            <span className="syntax-comment">// My professional journey</span>
          </p>
        </div>

        {/* Timeline */}
        <div className="max-w-4xl mx-auto relative">
          {/* Timeline Line */}
          <div className="absolute left-0 md:left-1/2 top-0 bottom-0 w-px bg-border md:-translate-x-1/2" />

          {experiences.map((exp, index) => {
            const Icon = typeIcons[exp.type];
            const isLeft = index % 2 === 0;

            return (
              <div
                key={index}
                className={`relative flex flex-col md:flex-row gap-8 mb-12 ${
                  isLeft ? "md:flex-row" : "md:flex-row-reverse"
                }`}
              >
                {/* Timeline Dot */}
                <div className="absolute left-0 md:left-1/2 w-4 h-4 rounded-full bg-card border-2 border-primary md:-translate-x-1/2 z-10" />

                {/* Content */}
                <div
                  className={`flex-1 ml-8 md:ml-0 ${
                    isLeft ? "md:pr-12 md:text-right" : "md:pl-12"
                  }`}
                >
                  <div
                    className={`bg-card border border-border rounded-lg p-6 hover:border-primary/50 transition-all duration-300 hover:shadow-lg ${
                      isLeft ? "md:mr-4" : "md:ml-4"
                    }`}
                  >
                    {/* Type Badge */}
                    <div
                      className={`flex items-center gap-2 mb-3 ${
                        isLeft ? "md:justify-end" : ""
                      }`}
                    >
                      <Badge
                        variant="outline"
                        className={`${typeColors[exp.type]} font-mono text-xs`}
                      >
                        <Icon className="w-3 h-3 mr-1" />
                        {exp.type}
                      </Badge>
                    </div>

                    {/* Title & Org */}
                    <h3 className="text-lg font-bold mb-1">{exp.title}</h3>
                    <p className="text-primary font-mono text-sm mb-2">
                      {exp.organization}
                    </p>

                    {/* Period */}
                    <div
                      className={`flex items-center gap-2 text-muted-foreground text-sm mb-3 ${
                        isLeft ? "md:justify-end" : ""
                      }`}
                    >
                      <Calendar className="w-4 h-4" />
                      {exp.period}
                    </div>

                    {/* Description */}
                    {exp.description && (
                      <p className="text-muted-foreground text-sm mb-4">
                        {exp.description}
                      </p>
                    )}

                    {/* Skills */}
                    <div
                      className={`flex flex-wrap gap-2 ${
                        isLeft ? "md:justify-end" : ""
                      }`}
                    >
                      {exp.skills.map((skill) => (
                        <Badge
                          key={skill}
                          variant="secondary"
                          className="font-mono text-xs"
                        >
                          {skill}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Spacer for opposite side */}
                <div className="hidden md:block flex-1" />
              </div>
            );
          })}
        </div>

        {/* Section Footer */}
        <div className="max-w-4xl mx-auto mt-8">
          <p className="text-muted-foreground font-mono text-3xl md:text-4xl">
            <span className="text-muted-foreground">{"}"}</span>
          </p>
        </div>
      </div>
    </section>
  );
}
