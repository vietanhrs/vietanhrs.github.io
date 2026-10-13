const stories = [
  {
    title: "Connecting products through micro-frontends",
    context: "Teko Solution · 2022–2026",
    problem:
      "NIO products needed to integrate with Tempi’s micro-frontend infrastructure across products and repositories.",
    responsibility:
      "I was the main engineer for the integration, working through compatibility issues and shared-state flows where common React state patterns were insufficient.",
    outcome:
      "Delivered cross-application integrations as part of front-end and product engineering delivery.",
    tags: "React / TypeScript / Micro-frontends",
    link: "https://nioapp.io/",
    label: "Nio App — product website",
  },
  {
    title: "Making incident alerts actionable",
    context: "Teko Solution · 2022–2026",
    problem:
      "On-call engineers needed timely incident alerts they could act on.",
    responsibility:
      "I built a real-time alerting solution, prioritizing direct, actionable notifications for the on-call workflow.",
    outcome:
      "Reduced the delay between incidents and alerts. Exact latency measurements and internal implementation details are not published here.",
    tags: "Real-time systems / Engineering operations",
  },
  {
    title: "Turning DeFi data into research datasets",
    context: "Faculty of Finance & Banking · UEB–VNU · 2022–2026",
    problem:
      "Governance and lending research required structured data from sources including Snapshot and Aave.",
    responsibility:
      "I built collection and normalization pipelines, using GraphQL-based flows to prepare proposal, voting and lending data for analysis.",
    outcome:
      "Produced research tooling and structured datasets for governance, coalition and lending-market analysis.",
    tags: "Python / GraphQL / Data analysis",
  },
];
export function SelectedWork() {
  return (
    <section
      id="work"
      tabIndex={-1}
      className="section shell"
      aria-labelledby="work-title"
    >
      <div className="section-heading">
        <p className="eyebrow">01 / Selected work</p>
        <h2 id="work-title">Systems behind the interface.</h2>
        <p>Selected responsibilities from my engineering and research work.</p>
      </div>
      <div className="work-list">
        {stories.map((story, index) => (
          <article className="work-story" key={story.title}>
            <div>
              <span className="story-number">0{index + 1}</span>
              <p className="meta">{story.context}</p>
              <h3>{story.title}</h3>
              <p className="tags">{story.tags}</p>
            </div>
            <div className="story-body">
              <p>
                <strong>Context.</strong> {story.problem}
              </p>
              <p>
                <strong>My contribution.</strong> {story.responsibility}
              </p>
              <p>
                <strong>Result.</strong> {story.outcome}
              </p>
              {story.link ? (
                <a href={story.link} target="_blank" rel="noopener noreferrer">
                  {story.label} ↗
                </a>
              ) : (
                <p className="artifact-note">
                  No public project artifact linked.
                </p>
              )}
            </div>
          </article>
        ))}
      </div>
      <p className="artifact-note">
        Product links provide context, not independent verification of
        individual contributions.
      </p>
    </section>
  );
}
