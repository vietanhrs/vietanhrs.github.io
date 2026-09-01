import { useEffect, useState } from "react";
import { Badge } from "@/components/ui/badge";
import {
  Building2,
  Calendar,
  GraduationCap,
  Briefcase,
  ExternalLink,
  Sparkles,
} from "lucide-react";

const WORLDQUANT_START_TIME = new Date(
  "2026-09-07T09:00:00+07:00",
).getTime();

interface Experience {
  title: string;
  period: string;
  organization: string;
  organizationUrl?: string;
  description?: string;
  highlights?: string[];
  products?: { name: string; url: string }[];
  skills: string[];
  type: "work" | "research" | "teaching";
  featured?: boolean;
  startsAt?: number;
  currentPeriod?: string;
  currentDescription?: string;
}

const experiences: Experience[] = [
  {
    title: "Front-end Engineer",
    period: "Starting September 7, 2026 at 9:00 AM GMT+7",
    currentPeriod: "September 2026 - now",
    organization: "WorldQuant",
    description: "Joining WorldQuant as a Front-end Engineer.",
    currentDescription: "Working at WorldQuant as a Front-end Engineer.",
    skills: ["Front-end Engineering"],
    type: "work",
    featured: true,
    startsAt: WORLDQUANT_START_TIME,
  },
  {
    title: "Co-founder",
    period: "November 2025 - Present",
    organization: "Wins Residence",
    organizationUrl: "https://www.winsresidence.com/",
    description:
      "Building and growing a business beyond the software industry, with hands-on involvement in operations, digital presence, and market-facing execution.",
    highlights: [
      "Expanded my perspective beyond engineering into business thinking, execution, and long-term product positioning.",
    ],
    skills: ["Business Development", "Digital Presence", "Operations"],
    type: "work",
  },
  {
    title: "Software Engineer / Blockchain Product Engineer",
    period: "November 2022 - June 2026",
    organization: "Teko Solution",
    description:
      "Leading and delivering front-end and product engineering work across blockchain and DeFi products, while also contributing to system design, integration strategy, and release execution.",
    products: [
      { name: "Danogo", url: "https://app.danogo.io/" },
      { name: "Nio App", url: "https://nioapp.io/" },
      { name: "BTC Grow", url: "https://app.btcgrow.io/" },
      { name: "Tempi", url: "http://tempi.vn" },
    ],
    highlights: [
      "Focused strongly on front-end architecture and implementation: complex user flows, wallet integrations, data aggregation, Kotlin/UI integration, and production-ready UX for blockchain products.",
      "Served as the main engineer for integrating NIO products with Tempi micro-frontend infrastructure, resolving difficult compatibility issues across products and repositories.",
      "Worked across medium/high-complexity epics involving lending, borrowing, liquidation, airdrops, admin pages, multi-language support, browser embedding, and release coordination.",
      "Designed technical solutions where common React state patterns were insufficient, including wallet and shared-state flows across micro-frontends and multi-package UI systems.",
      "Built a real-time alerting solution that reduced Danogo incident latency from roughly 5 minutes to about 1 second, making alerts directly actionable for on-call engineers.",
    ],
    skills: [
      "React",
      "TypeScript",
      "Kotlin",
      "Micro-frontends",
      "SPA/MPA",
      "Node.js",
      "CI/CD",
      "DeFi",
    ],
    type: "work",
  },
  {
    title: "Data Mining & Analysis in DeFi",
    period: "April 2022 - Apr 2026",
    organization: "Faculty of Finance & Banking - UEB - VNU",
    description:
      "Research work centered on DAO, governance, lending, and protocol data analysis for decentralized finance.",
    highlights: [
      "Built research tooling and data pipelines to collect, normalize, and analyze governance and lending data from sources such as Snapshot and Aave.",
      "Designed GraphQL-based collection flows and structured datasets for proposal analysis, voting behavior analysis, coalition detection, and lending market observation.",
    ],
    skills: ["Python", "GraphQL", "Data Analysis", "DeFi Research"],
    type: "research",
  },
  {
    title: "DApp Developer / Solution Architect",
    period: "October 2021 - October 2022",
    organization: "TVM Digital",
    description:
      "Worked on blockchain application architecture and implementation across Terra and Polygon ecosystems.",
    products: [{ name: "OODLZ", url: "https://www.oodlz.io/" }],
    highlights: [
      "Contributed to solution architecture and system design for OODLZ, a cashback platform with web/mobile user journeys and financial product flows.",
      "Built DApp features using Solidity, Rust, Angular, and Node.js while strengthening end-to-end product delivery across front-end, integration, and architecture.",
    ],
    skills: ["Angular", "Node.js", "Solidity", "Rust", "Terra", "Polygon"],
    type: "work",
  },
  {
    title: "Blockchain Researcher",
    period: "September 2021 - June 2022",
    organization: "Blockchain Research Lab - UET",
    description:
      "Academic and applied blockchain research focused on real prototypes and decentralized application design.",
    highlights: [
      "Built hands-on prototypes in supply-chain traceability, anti-counterfeiting, and decentralized application research.",
      "Strengthened my foundation in distributed systems thinking, blockchain architecture, and smart-contract-oriented product design.",
    ],
    skills: ["Solidity", "Rust", "Ethereum", "Avalanche", "Terra"],
    type: "research",
  },
  {
    title: "Machine Learning / Computer Vision Researcher & Teaching Assistant",
    period: "2019 - June 2022",
    organization: "UET",
    description:
      "Worked on robotics-focused machine learning and computer vision while also supporting teaching activities.",
    highlights: [
      "Used ROS/ROS 2 with Turtlebot3, Raspberry Pi, lidar, cameras, and Arduino-based motor control to prototype robotics systems.",
      "Focused on computer vision for autonomous navigation and robotics, while helping students understand ROS-based workflows and engineering fundamentals.",
    ],
    skills: ["ROS", "ROS 2", "Python", "TensorFlow", "OpenCV", "C++"],
    type: "teaching",
  },
  {
    title: "Evolutionary Computation Research",
    period: "2020 - June 2022",
    organization: "Computer Science Laboratory - UET",
    description:
      "Research in evolutionary approaches for deep learning and neural-network optimization.",
    highlights: [
      "Implemented research code combining deep learning with search and optimization techniques, especially for CNN-related experimentation.",
    ],
    skills: ["Python", "TensorFlow", "Deep Learning"],
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
  const [hasWorldQuantStarted, setHasWorldQuantStarted] = useState(
    () => Date.now() >= WORLDQUANT_START_TIME,
  );

  useEffect(() => {
    const timeUntilStart = WORLDQUANT_START_TIME - Date.now();

    if (timeUntilStart <= 0) return;

    const timeoutId = window.setTimeout(
      () => setHasWorldQuantStarted(true),
      timeUntilStart,
    );

    return () => window.clearTimeout(timeoutId);
  }, []);

  return (
    <section id="experiences" className="py-24 relative">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            <span className="syntax-keyword">interface</span>{" "}
            <span className="syntax-function">Experience</span>{" "}
            <span className="text-muted-foreground">{"{"}</span>
          </h2>
          <p className="text-muted-foreground font-mono text-sm pl-4">
            <span className="syntax-comment">
              // Architecture, product delivery, and hands-on engineering
            </span>
          </p>
        </div>

        <div className="max-w-6xl mx-auto relative">
          <div
            aria-hidden="true"
            className="absolute left-2 top-0 bottom-0 w-px -translate-x-1/2 bg-border"
          />

          {experiences.map((exp) => {
            const Icon = typeIcons[exp.type];
            const isIncoming = Boolean(
              exp.startsAt && !hasWorldQuantStarted,
            );
            const displayPeriod =
              exp.startsAt && hasWorldQuantStarted
                ? (exp.currentPeriod ?? exp.period)
                : exp.period;
            const displayDescription =
              exp.startsAt && hasWorldQuantStarted
                ? (exp.currentDescription ?? exp.description)
                : exp.description;

            return (
              <div
                key={`${exp.organization}-${exp.title}`}
                className="relative mb-10 last:mb-0"
              >
                <div
                  aria-hidden="true"
                  className={`absolute left-2 top-7 z-20 -translate-x-1/2 rounded-full border-primary ${
                    exp.featured
                      ? "h-5 w-5 border-4 bg-primary ring-4 ring-primary/20"
                      : "h-4 w-4 border-2 bg-card"
                  }`}
                />

                <div className="ml-8 md:ml-12">
                  <article
                    className={`relative overflow-hidden rounded-lg border p-6 transition-all duration-300 ${
                      exp.featured
                        ? "border-primary/70 bg-gradient-to-br from-primary/20 via-card to-accent/10 shadow-xl shadow-primary/20 ring-1 ring-primary/30 hover:shadow-2xl hover:shadow-primary/25 md:p-8"
                        : "border-border bg-card hover:border-primary/50 hover:shadow-lg"
                    }`}
                  >
                    {exp.featured && (
                      <div
                        aria-hidden="true"
                        className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-primary via-accent to-primary"
                      />
                    )}

                    <div className="flex flex-wrap items-center gap-2 mb-3">
                      {exp.featured && (
                        <Badge className="border-foreground bg-foreground font-mono text-xs text-background shadow-md shadow-primary/20">
                          <Sparkles
                            aria-hidden="true"
                            className="mr-1 h-3 w-3"
                          />
                          {isIncoming ? "incoming" : "current"}
                        </Badge>
                      )}
                      <Badge
                        variant="outline"
                        className={`font-mono text-xs ${
                          exp.featured
                            ? "border-primary/30 bg-primary/10 text-foreground"
                            : typeColors[exp.type]
                        }`}
                      >
                        <Icon className="w-3 h-3 mr-1" />
                        {exp.type}
                      </Badge>
                    </div>

                    <h3
                      className={`font-bold mb-1 ${
                        exp.featured
                          ? "text-2xl text-primary md:text-3xl"
                          : "text-lg"
                      }`}
                    >
                      {exp.title}
                    </h3>
                    {exp.organizationUrl ? (
                      <a
                        href={exp.organizationUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={`inline-flex items-center gap-1 font-mono mb-2 hover:underline ${
                          exp.featured
                            ? "text-xl font-semibold text-foreground"
                            : "text-sm text-primary"
                        }`}
                      >
                        {exp.organization}
                        <ExternalLink className="w-3 h-3" />
                      </a>
                    ) : (
                      <p
                        className={`font-mono mb-2 ${
                          exp.featured
                            ? "text-xl font-semibold text-foreground"
                            : "text-sm text-primary"
                        }`}
                      >
                        {exp.organization}
                      </p>
                    )}

                    <div className="flex items-center gap-2 text-muted-foreground text-sm mb-3">
                      <Calendar className="w-4 h-4" />
                      {displayPeriod}
                    </div>

                    {displayDescription && (
                      <p
                        className={`text-muted-foreground mb-4 leading-7 ${
                          exp.featured ? "text-base" : "text-sm"
                        }`}
                      >
                        {displayDescription}
                      </p>
                    )}

                    {exp.products && exp.products.length > 0 && (
                      <div className="flex flex-wrap gap-2 mb-4">
                        {exp.products.map((product) => (
                          <a
                            key={product.name}
                            href={product.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-1 rounded-full border border-primary/30 bg-primary/5 px-3 py-1 text-xs font-mono text-primary hover:bg-primary/10"
                          >
                            {product.name}
                            <ExternalLink className="w-3 h-3" />
                          </a>
                        ))}
                      </div>
                    )}

                    {exp.highlights && (
                      <ul className="space-y-2 text-sm text-muted-foreground mb-4 pl-4 list-disc">
                        {exp.highlights.map((highlight) => (
                          <li key={highlight} className="leading-7">
                            {highlight}
                          </li>
                        ))}
                      </ul>
                    )}

                    <div className="flex flex-wrap gap-2">
                      {exp.skills.map((skill) => (
                        <Badge
                          key={skill}
                          variant="secondary"
                          className={`font-mono text-xs ${
                            exp.featured
                              ? "border border-primary/30 bg-primary/10 text-foreground"
                              : ""
                          }`}
                        >
                          {skill}
                        </Badge>
                      ))}
                    </div>
                  </article>
                </div>
              </div>
            );
          })}
        </div>

        <div className="max-w-6xl mx-auto mt-8">
          <p className="text-muted-foreground font-mono text-3xl md:text-4xl">
            <span className="text-muted-foreground">{"}"}</span>
          </p>
        </div>
      </div>
    </section>
  );
}
