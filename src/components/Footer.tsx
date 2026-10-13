export function Footer() {
  return (
    <footer className="shell footer">
      <a href="#top">~/anh.tv ↑</a>
      <p>Trần Việt Anh · {new Date().getFullYear()}</p>
      <a
        href="https://github.com/vietanhrs/vietanhrs.github.io"
        target="_blank"
        rel="noopener noreferrer"
      >
        Site source ↗
      </a>
    </footer>
  );
}
