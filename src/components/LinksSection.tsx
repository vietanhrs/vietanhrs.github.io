const socialLinks = [
  {
    name: "GitHub",
    url: "https://github.com/vietanhrs",
  },
  {
    name: "LinkedIn",
    url: "https://www.linkedin.com/in/tva2710",
  },
  {
    name: "Email",
    url: "mailto:vietanhtran.uet@gmail.com",
  },
  {
    name: "Phone",
    url: "tel:+84988582914",
  },
  {
    name: "Facebook",
    url: "https://www.facebook.com/tv.anh2k/",
  },
  {
    name: "Twitter",
    url: "https://x.com/tr_vietanh",
  },
  {
    name: "Instagram",
    url: "https://www.instagram.com/println_anh.tv/",
  },
  {
    name: "CodeForces",
    url: "https://codeforces.com/profile/anhtv2710",
  },
  {
    name: "LeetCode",
    url: "https://leetcode.com/u/vietanhtranuet/",
  },
];
export function LinksSection() {
  return (
    <section
      id="links"
      tabIndex={-1}
      className="section shell contact"
      aria-labelledby="contact-title"
    >
      <div className="section-heading">
        <h2 id="contact-title">Contact</h2>
        <p>For product, architecture, and engineering conversations.</p>
      </div>
      <a className="contact-email" href="mailto:vietanhtran.uet@gmail.com">
        vietanhtran.uet@gmail.com
      </a>
      <a className="contact-phone" href="tel:+84988582914">
        (+84) 988 582 914
      </a>
      <div className="social-links">
        {socialLinks
          .filter((link) => !["Email", "Phone"].includes(link.name))
          .map((link) => (
            <a
              key={link.name}
              href={link.url}
              target="_blank"
              rel="noopener noreferrer"
            >
              {link.name}
            </a>
          ))}
      </div>
    </section>
  );
}
