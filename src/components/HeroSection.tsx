export const CV_URL = "/Tran_Viet_Anh_CV___Fullstack_Software_Engineer.pdf";
export function HeroSection() {
  return (
    <section id="top" className="hero shell" aria-labelledby="hero-title">
      <p className="eyebrow">Software engineer · Hanoi, Vietnam</p>
      <h1 id="hero-title">Trần Việt Anh</h1>
      <p className="hero-role">
        Front-end engineering.
        <br />
        System design. Product delivery.
      </p>
      <p className="hero-intro">
        I design systems and build web applications—from front-end architecture
        to cross-application integrations.
      </p>
      <div className="hero-actions">
        <a className="primary-action" href="#work">
          Selected work <span aria-hidden="true">↘</span>
        </a>
        <a className="secondary-action" href="#links">
          Contact me
        </a>
      </div>
      <div className="support-links">
        <a href={CV_URL} target="_blank" rel="noopener noreferrer">
          View CV (PDF) ↗
        </a>
        <a
          href="https://github.com/vietanhrs"
          target="_blank"
          rel="noopener noreferrer"
        >
          GitHub ↗
        </a>
      </div>
      <div className="hero-note">
        <span className="syntax-keyword">const</span> focus ={" "}
        <span className="syntax-string">"build, integrate, deliver"</span>;
      </div>
    </section>
  );
}
