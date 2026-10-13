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

export function AchievementsSection() {
  return (
    <section
      id="achievements"
      tabIndex={-1}
      className="achievement-field"
      aria-labelledby="achievements-title"
    >
      <div className="shell section">
        <div className="section-heading">
          <h2 id="achievements-title">Achievements</h2>
          <p>
            English proficiency, applied learning, and competitive milestones.
          </p>
        </div>
        <div className="recognition-lead">
          <article className="toeic">
            <h3>TOEIC</h3>
            <p className="award-year">{achievements[0].year}</p>
            <p className="score">
              980<span>/990</span>
            </p>
            <p>English proficiency certification</p>
          </article>
          <article className="hackathon">
            <h3>DApp Creator</h3>
            <p className="award-year">2021</p>
            <p className="prize">Second Prize</p>
            <p>VMO Hackathon DApp Creator 2021</p>
            <p>Educational platform using Ethereum blockchain</p>
            <ul className="skill-list">
              {achievements[1].skills?.map((skill) => (
                <li key={skill}>{skill}</li>
              ))}
            </ul>
          </article>
        </div>
        <div className="certificate-row">
          {achievements.slice(2, 4).map((item) => (
            <article key={item.title}>
              <h3>{item.title}</h3>
              <p className="award-year">{item.year}</p>
              <p>{item.description}</p>
              <a href={item.link} target="_blank" rel="noopener noreferrer">
                Verify certificate
              </a>
            </article>
          ))}
        </div>
        <div className="early-awards">
          <h3>Where it started</h3>
          <p>Software and competitive programming awards, 2015–2017.</p>
          <ul className="award-register">
            {achievements.slice(4).map((item, i) => (
              <li key={i}>
                <p className="award-year">{item.year}</p>
                <div>
                  <h4>{item.title}</h4>
                  <p>{item.description}</p>
                  {item.skills && (
                    <p className="award-skills">{item.skills.join(", ")}</p>
                  )}
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
