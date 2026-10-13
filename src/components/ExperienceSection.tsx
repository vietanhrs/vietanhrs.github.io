const WORLDQUANT_START_TIME = new Date("2026-09-07T09:00:00+07:00").getTime();

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
    title: "Software Engineer",
    period: "November 2022 - June 2026",
    organization: "Teko Solution",
    description:
      "Led front-end and product engineering delivery across multiple applications, with responsibilities spanning system design, integration strategy, and release execution.",
    products: [
      { name: "Nio App", url: "https://nioapp.io/" },
      { name: "Tempi", url: "http://tempi.vn" },
    ],
    highlights: [
      "Owned front-end architecture and implementation for complex user flows, application integrations, data aggregation, Kotlin/UI integration, and production-ready user experiences.",
      "Served as the main engineer for integrating NIO products with Tempi micro-frontend infrastructure, resolving difficult compatibility issues across products and repositories.",
      "Delivered medium- and high-complexity epics spanning data-intensive user workflows, admin interfaces, multi-language support, browser embedding, and release coordination.",
      "Designed technical solutions where common React state patterns were insufficient, including cross-application integration and shared-state flows across micro-frontends and multi-package UI systems.",
      "Built a real-time alerting solution that made incident alerts directly actionable for on-call engineers.",
    ],
    skills: [
      "React",
      "TypeScript",
      "Kotlin",
      "Micro-frontends",
      "SPA/MPA",
      "Node.js",
      "CI/CD",
      "System Design",
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

const roleIds = [
  "worldquant",
  "wins-residence",
  "teko",
  "defi-research",
  "tvm",
  "blockchain-lab",
  "robotics",
  "evolutionary-research",
];
function Role({ exp, index }: { exp: Experience; index: number }) {
  const started = !exp.startsAt || Date.now() >= exp.startsAt;
  return (
    <article
      id={roleIds[index]}
      tabIndex={-1}
      className={
        "role role-" + exp.type + (exp.featured ? " role-current" : "")
      }
    >
      <header className="role-header">
        <div>
          <h3>{exp.organization}</h3>
          <p className="role-period">
            {started ? (exp.currentPeriod ?? exp.period) : exp.period}
          </p>
        </div>
        <p className="role-kind">
          {exp.featured
            ? "Current role"
            : exp.type === "work"
              ? "Industry"
              : exp.type === "teaching"
                ? "Research & teaching"
                : "Research"}
        </p>
      </header>
      <div className="role-content">
        <p className="role-title">{exp.title}</p>
        <p>
          {started
            ? (exp.currentDescription ?? exp.description)
            : exp.description}
        </p>
        {exp.highlights && (
          <ul className="role-highlights">
            {exp.highlights.map((text) => (
              <li key={text}>{text}</li>
            ))}
          </ul>
        )}
        <ul className="skill-list" aria-label="Skills">
          {exp.skills.map((skill) => (
            <li key={skill}>{skill}</li>
          ))}
        </ul>
        <div className="role-links">
          {exp.organizationUrl && (
            <a
              href={exp.organizationUrl}
              target="_blank"
              rel="noopener noreferrer"
            >
              {exp.organization} website
            </a>
          )}
          {exp.products?.map((p) => (
            <a
              key={p.name}
              href={p.url}
              target="_blank"
              rel="noopener noreferrer"
            >
              {p.name} product website
            </a>
          ))}
        </div>
      </div>
    </article>
  );
}
export function ExperienceSection() {
  return (
    <section
      id="experiences"
      tabIndex={-1}
      className="section shell experience"
      aria-labelledby="experience-title"
    >
      <div className="section-heading">
        <h2 id="experience-title">Experience</h2>
        <p>
          Front-end architecture, product delivery, and the research that shaped
          my engineering.
        </p>
      </div>
      <div className="career-layout">
        <aside className="career-index">
          <p>Career index</p>
          <nav aria-label="Career roles">
            {experiences.map((exp, i) => (
              <a href={"#" + roleIds[i]} key={roleIds[i]}>
                <span>
                  {
                    [
                      "2026",
                      "2025",
                      "2022",
                      "2022",
                      "2021",
                      "2021",
                      "2019",
                      "2020",
                    ][i]
                  }
                </span>
                {
                  [
                    "WorldQuant",
                    "Wins Residence",
                    "Teko Solution",
                    "DeFi research",
                    "TVM Digital",
                    "Blockchain lab",
                    "Robotics / UET",
                    "Evolutionary AI",
                  ][i]
                }
              </a>
            ))}
          </nav>
          <p className="index-note">
            All roles and responsibilities are shown below.
          </p>
        </aside>
        <div className="career-record">
          {experiences.map((exp, i) => (
            <Role key={roleIds[i]} exp={exp} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
