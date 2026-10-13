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
    description:
      "Second Prize - Educational platform using Ethereum blockchain",
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

function Award({ item }: { item: Achievement }) {
  return (
    <li>
      <span className="meta">{item.year}</span>
      <div>
        <h3>{item.title}</h3>
        <p>{item.description}</p>
        {item.link && (
          <a href={item.link} target="_blank" rel="noopener noreferrer">
            Verify certificate ↗
          </a>
        )}
      </div>
    </li>
  );
}
export function AchievementsSection() {
  return (
    <section
      id="achievements"
      tabIndex={-1}
      className="section shell"
      aria-labelledby="achievements-title"
    >
      <div className="section-heading">
        <p className="eyebrow">03 / Achievements</p>
        <h2 id="achievements-title">Learning, applied.</h2>
      </div>
      <ul className="awards">
        {achievements.slice(0, 4).map((item) => (
          <Award key={item.title} item={item} />
        ))}
      </ul>
      <details className="archive">
        <summary>Earlier awards · 2015–2017</summary>
        <ul className="awards">
          {achievements.slice(4).map((item, index) => (
            <Award key={index} item={item} />
          ))}
        </ul>
      </details>
    </section>
  );
}
