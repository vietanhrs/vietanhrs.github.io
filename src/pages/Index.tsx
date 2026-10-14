import { useEffect, useState } from "react";
import { useTheme } from "@/components/ThemeProvider";
import { experiences, achievements, laptops, keyboards, iotItems, socialLinks, CV_URL, roleIds } from "@/lib/portfolio";
// Original ASCII interpretation of the Rust language gear and R; not Ferris.
const rust = [
    "              ##   ##              ",
    "         ##   ########   ##         ",
    "         ##################         ",
    "     ######              ######     ",
    "      ###   ##########     ###      ",
    "   #####    ###     ####    #####   ",
    "    ###     ###      ###     ###    ",
    " ######     ###     ####     ###### ",
    "  ####      ##########       ####  ",
    " ######     ###   ####       ###### ",
    "    ###     ###    ####      ###    ",
    "   #####  #######   ######  #####   ",
    "      ###                 ###      ",
    "     ######              ######     ",
    "         ##################         ",
    "         ##   ########   ##         ",
    "              ##   ##              ",
].join("\n");
const commands = [["fastfetch", "Profile"], ["experience", "Career log"], ["achievements", "Award register"], ["skills", "Skill tree"], ["gear", "Inventory"], ["contact", "Get in touch"], ["cv", "Résumé / PDF"], ["help", "About this terminal"]];
const targets: Record<string, string> = { fastfetch: "fastfetch", experience: "experiences", achievements: "achievements", skills: "skills", tree: "skills", gear: "gear", contact: "links", cv: "cv", help: "help", theme: "theme" };
function Prompt({ children }: {
    children: React.ReactNode;
}) { return <span className="prompt"><span className="prompt-path">~/vietanh</span><span aria-hidden="true" className="chevron">❯</span>{children}</span>; }
function Output({ id, command, title, children }: {
    id: string;
    command: string;
    title: string;
    children: React.ReactNode;
}) { return <section id={id} tabIndex={-1} aria-label={title} className="output"><h2><Prompt>{command}</Prompt></h2>{children}</section>; }
function External({ href, children }: {
    href: string;
    children: React.ReactNode;
}) { return <a href={href} {...(href.startsWith("http") ? { target: "_blank", rel: "noopener noreferrer" } : {})}>{children}</a>; }
export default function Index() {
    const { theme, setTheme } = useTheme();
    const [command, setCommand] = useState("");
    const [status, setStatus] = useState("");
    const [wide, setWide] = useState(false);
    useEffect(() => {
        const go = () => { let id = location.hash.slice(1); try {
            id = decodeURIComponent(id);
        }
        catch { /* Malformed fragments do not interrupt reading. */ } const el = document.getElementById(id); if (el) {
            el.scrollIntoView();
            el.focus({ preventScroll: true });
        } };
        go();
        window.addEventListener("hashchange", go);
        return () => window.removeEventListener("hashchange", go);
    }, []);
    function run(event: React.FormEvent) {
        event.preventDefault();
        const value = command.trim().toLowerCase().replace(/\s+/g, " ");
        if (["theme light", "theme dark", "theme system"].includes(value)) {
            setTheme(value.split(" ")[1] as "light" | "dark" | "system");
            setStatus(value + " — applied.");
        }
        else if (Object.prototype.hasOwnProperty.call(targets, value)) {
            const id = targets[value];
            if (location.hash !== "#" + id) window.history.pushState(null, "", "#" + id);
            const target = document.getElementById(id);
            target?.scrollIntoView();
            target?.focus({ preventScroll: true });
            setStatus("Opened " + value + ". All output remains visible.");
        }
        else {
            setStatus(value ? "Unknown command. Choose a command above or type help. This is not a shell." : "Type a command, or use the links above.");
        }
        setCommand("");
    }
    return <><a className="skip-link" href="#main">Skip to portfolio</a><main id="main" tabIndex={-1} className={"terminal-window" + (wide ? " wide" : "")}>
    <header className="titlebar"><a href="#help" aria-label="Terminal help" className="chrome-control">≡</a><span className="window-title">~ — fish</span><button className="chrome-control" aria-label={wide ? "Restore window width" : "Expand window width"} aria-pressed={wide} onClick={() => setWide(!wide)}>{wide ? "⊡" : "□"}</button></header>
    <div className="terminal-body">
      <section id="fastfetch" tabIndex={-1} aria-label="Profile" className="fetch-section">
        <Prompt>fastfetch</Prompt>
        <div className="fetch-grid"><pre className="rust-logo" role="img" aria-label="ASCII Rust language logo: a gear surrounding the letter R">{rust}</pre><div className="profile">
          <h1>Trần Việt Anh<span className="muted">@</span><span className="blue">portfolio</span></h1><p className="rule" aria-hidden="true">──────────────────────────────────</p>
          <dl className="fetch-fields"><div><dt>Role</dt><dd>Front-end Engineer</dd></div><div><dt>Current</dt><dd><a href="#worldquant">WorldQuant</a></dd></div><div><dt>Location</dt><dd>Hanoi, Vietnam</dd></div><div><dt>Focus</dt><dd>Web apps · system design</dd></div><div><dt>Stack</dt><dd>React · TypeScript · Node.js</dd></div><div><dt>Roots</dt><dd>Robotics · blockchain · research</dd></div><div><dt>Beyond</dt><dd><a href="#wins-residence">Co-founder, Wins Residence</a></dd></div><div><dt>Mail</dt><dd><a href="mailto:vietanhtran.uet@gmail.com">vietanhtran.uet@gmail.com</a></dd></div><div><dt>CV</dt><dd><a href={CV_URL}>Read résumé (PDF) ↗</a></dd></div><div><dt>Theme</dt><dd>Gruvbox / {theme}</dd></div></dl>
          <div className="swatches" aria-hidden="true">{Array.from({ length: 16 }, (_, i) => <i key={i} style={{ background: ["#282828", "#cc241d", "#98971a", "#d79921", "#458588", "#b16286", "#689d6a", "#a89984", "#928374", "#fb4934", "#b8bb26", "#fabd2f", "#83a598", "#d3869b", "#8ec07c", "#ebdbb2"][i] }}/>)}</div>
        </div></div>
        <p className="intro">I build web applications, design systems, and connect products<br className="desktop-break"/> across front-end and full-stack engineering.</p>
      </section>
      <nav className="command-index" aria-label="Portfolio commands"><Prompt>help <span className="muted"># click a command to jump</span></Prompt><div>{commands.map(([c]) => <a key={c} href={"#" + targets[c]}>{c}</a>)}</div></nav>
      <form onSubmit={run} className="command-form"><label htmlFor="command" className="prompt-path" aria-label="Portfolio command">~/vietanh <span className="chevron" aria-hidden="true">❯</span></label><input id="command" value={command} onChange={e => setCommand(e.target.value)} placeholder="Try experience or theme light" autoComplete="off" autoCapitalize="none" spellCheck={false} maxLength={120} aria-describedby="command-hint" onKeyDown={e => { if (e.key === "Escape") {
        setCommand("");
        setStatus("");
    } }}/><button type="submit">Run ↵</button></form>
      <p id="command-hint" className="muted input-note">Optional shortcuts. Everything is already expanded below.</p><p role="status" className="command-status">{status}</p>
      <Output id="experiences" command="experience --all" title="Experience"><p className="annotation"># Career log · 8 entries · industry & research, overlapping timelines</p><nav className="role-index" aria-label="Career roles">{experiences.map((e, i) => <a key={roleIds[i]} href={"#" + roleIds[i]}>{e.organization === "Faculty of Finance & Banking - UEB - VNU" ? "DeFi research" : e.organization}</a>)}</nav><div className="career-log">{experiences.map((e, i) => { const started = !e.startsAt || Date.now() >= e.startsAt; return <article id={roleIds[i]} tabIndex={-1} className="role" key={roleIds[i]}><p className="log-meta"><span aria-hidden="true">● </span>{started ? (e.currentPeriod ?? e.period) : e.period} <span className="muted">[{e.type}]</span></p><h3>{e.organization}{e.featured && <span className="green"> ← current</span>}</h3><p className="role-title">{e.title}</p><p>{started ? (e.currentDescription ?? e.description) : e.description}</p>{e.highlights && <ul className="highlights">{e.highlights.map(h => <li key={h}>{h}</li>)}</ul>}<p className="skill-line"><span className="muted">stack: </span>{e.skills.join(" · ")}</p><div className="record-links">{e.organizationUrl && <External href={e.organizationUrl}>{e.organization} ↗</External>}{e.products?.map(p => <External key={p.name} href={p.url}>{p.name} ↗</External>)}</div></article>; })}</div></Output>
      <Output id="achievements" command="achievements --register" title="Achievements"><p className="annotation"># 9 awards, competition results & certificates</p><ol className="award-register">{achievements.map((a, i) => <li key={i}><span className="award-number" aria-hidden="true">[{String(i + 1).padStart(2, "0")}]</span><div><p className="muted">{a.year} / {a.type}</p><h3>{a.title}</h3><p>{a.description}</p>{a.skills && <p className="skill-line">{a.skills.join(" · ")}</p>}{a.link && <External href={a.link}>Verify certificate ↗</External>}</div></li>)}</ol></Output>
      <Output id="skills" command="tree skills/" title="Skills"><p className="annotation"># Tools and disciplines from the career log</p><ul className="skill-tree">{[["web", "React · TypeScript · Angular · Node.js · Kotlin"], ["architecture", "System Design · Micro-frontends · SPA/MPA · CI/CD"], ["blockchain", "Rust · Solidity · Ethereum · Avalanche · Terra · Polygon"], ["research", "Python · GraphQL · DeFi Research · Data Analysis"], ["robotics + ML", "ROS / ROS 2 · TensorFlow · OpenCV · C++ · Deep Learning"], ["business", "Business Development · Digital Presence · Operations"]].map(([label, text]) => <li key={label}><h3>{label}/</h3><p>{text}</p></li>)}</ul></Output>
      <Output id="gear" command="gear --inventory" title="Gear"><p className="annotation"># Personal equipment · specifications, not live telemetry</p><h3 className="subheading">laptops/</h3><div className="gear-grid">{laptops.map(l => <article key={l.name}><h4>{l.name}</h4><dl>{Object.entries(l).filter(([k]) => k !== "name").map(([k, v]) => <div key={k}><dt>{k}</dt><dd>{v}</dd></div>)}</dl></article>)}</div><h3 className="subheading">keyboards/</h3><ul className="inventory">{keyboards.map(k => <li key={k.name}>{k.name}{k.details && <p className="muted">{k.details}</p>}</li>)}</ul><h3 className="subheading">embedded/</h3><ul className="inventory">{iotItems.map(i => <li key={i.name}>{i.name}<p className="muted">{i.description}</p></li>)}</ul></Output>
      <Output id="links" command="contact --list" title="Contact"><p className="annotation"># For product, architecture, and engineering conversations</p><dl className="contact-list">{socialLinks.map(l => <div key={l.name}><dt>{l.name}</dt><dd><External href={l.url}>{l.url.replace("https://", "").replace("http://", "").replace("mailto:", "").replace("tel:", "")}</External></dd></div>)}</dl></Output>
      <Output id="cv" command="cv --open" title="Résumé"><p><a href={CV_URL}>Read full résumé (PDF) ↗</a></p><p><a href={CV_URL} download>Download a copy ↓</a></p></Output>
      <Output id="help" command="help" title="Terminal help"><p>This is a portfolio, not a shell. Scroll to read everything, click a command to jump, or use the optional input. No commands run on your device.</p><dl className="help-list">{commands.map(([c, d]) => <div key={c}><dt><a href={"#" + targets[c]}>{c}</a></dt><dd>{d}</dd></div>)}</dl><div id="theme" tabIndex={-1} className="theme-settings"><label htmlFor="theme-choice">theme </label><select id="theme-choice" value={theme} onChange={e => setTheme(e.target.value as "light" | "dark" | "system")}><option value="system">System</option><option value="dark">Dark</option><option value="light">Light</option></select><p className="muted">Or type theme light, theme dark, or theme system.</p></div><p className="muted">Ghostty-inspired window · Gruvbox · Source Code Pro Medium.<br />Rust language logo is decorative; no affiliation implied.</p></Output>
      <footer><Prompt><a href="#fastfetch">back to top ↑</a><span className="cursor" aria-hidden="true">▊</span></Prompt><span className="muted">end of transcript</span></footer>
    </div>
  </main></>;
}
