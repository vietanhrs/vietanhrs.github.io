export const CV_URL = "/Tran_Viet_Anh_CV___Fullstack_Software_Engineer.pdf";
export function HeroSection() {
  return (
    <section id="top" className="hero shell" aria-labelledby="hero-title">
      <div className="hero-topline">
        <p>Front-end engineer</p>
        <p>Hanoi, Vietnam</p>
      </div>
      <h1 id="hero-title">Trần Việt Anh</h1>
      <div className="hero-bottom">
        <div className="hero-summary">
          <p>
            I build web applications, design systems, and connect products
            across front-end and full-stack engineering.
          </p>
          <div className="hero-actions">
            <a className="primary-action" href="#experiences">
              View experience <span aria-hidden="true">↘</span>
            </a>
            <a href={CV_URL} target="_blank" rel="noopener noreferrer">
              View CV (PDF)
            </a>
            <a href="#links">Contact</a>
          </div>
        </div>
        <div className="current-work">
          <a href="#worldquant">WorldQuant</a>
          <p>
            Current role: Front-end Engineer
            <br />
            September 2026 – now
          </p>
        </div>
      </div>
      <div className="career-strip" aria-label="Career overview">
        <a href="#robotics">
          <span>Research foundations</span>UET
        </a>
        <a href="#teko">
          <span>Product engineering</span>Teko Solution
        </a>
        <a href="#worldquant">
          <span>Front-end engineering</span>WorldQuant
        </a>
      </div>
    </section>
  );
}
