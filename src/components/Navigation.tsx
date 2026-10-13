import { useEffect, useRef, useState } from "react";
import { Menu, X } from "lucide-react";
import { ThemeToggle } from "./ThemeToggle";
const sections = [
  ["work", "Selected work"],
  ["experiences", "Experience"],
  ["achievements", "Achievements"],
  ["links", "Contact"],
];
export function Navigation() {
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState("");
  const trigger = useRef<HTMLButtonElement>(null);
  useEffect(() => {
    const update = () => {
      const current = sections
        .filter(
          ([id]) =>
            (document.getElementById(id)?.getBoundingClientRect().top ??
              Infinity) <= 160,
        )
        .at(-1);
      setActive(current?.[0] ?? "");
    };
    const escape = (event: KeyboardEvent) => {
      if (event.key === "Escape" && open) {
        setOpen(false);
        trigger.current?.focus();
      }
    };
    const resize = () => {
      if (window.innerWidth >= 900) setOpen(false);
    };
    update();
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("keydown", escape);
    window.addEventListener("resize", resize);
    return () => {
      window.removeEventListener("scroll", update);
      window.removeEventListener("keydown", escape);
      window.removeEventListener("resize", resize);
    };
  }, [open]);
  const links = sections.map(([id, label]) => (
    <a
      key={id}
      href={"#" + id}
      aria-current={active === id ? "location" : undefined}
      onClick={() => {
        setOpen(false);
        document.getElementById(id)?.focus({ preventScroll: true });
      }}
    >
      {label}
    </a>
  ));
  return (
    <>
      <a className="skip-link" href="#main">
        Skip to content
      </a>
      <header className="site-header">
        <nav className="shell nav-bar" aria-label="Main navigation">
          <a
            className="wordmark"
            href="#top"
            aria-label="Trần Việt Anh, back to top"
          >
            <span aria-hidden="true">~/</span>anh.tv
          </a>
          <div className="desktop-nav">{links}</div>
          <div className="nav-tools">
            <ThemeToggle />
            <button
              ref={trigger}
              className="menu-trigger"
              aria-label={open ? "Close navigation" : "Open navigation"}
              aria-expanded={open}
              aria-controls="mobile-navigation"
              onClick={() => setOpen(!open)}
            >
              {open ? <X aria-hidden="true" /> : <Menu aria-hidden="true" />}
            </button>
          </div>
        </nav>
        {open && (
          <div id="mobile-navigation" className="mobile-nav shell">
            {links}
          </div>
        )}
      </header>
    </>
  );
}
