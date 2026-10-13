export function Footer() {
  return (
    <footer className="footer">
      <div className="shell">
        <div className="footer-meta">
          <p>Hanoi, Vietnam · {new Date().getFullYear()}</p>
          <a
            href="https://github.com/vietanhrs/vietanhrs.github.io"
            target="_blank"
            rel="noopener noreferrer"
          >
            Site source
          </a>
          <a href="#top">Back to top ↑</a>
        </div>
        <p className="footer-name">Trần Việt Anh</p>
      </div>
    </footer>
  );
}
