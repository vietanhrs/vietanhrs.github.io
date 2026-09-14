import { useState, useEffect } from "react";
import { ThemeToggle } from "./ThemeToggle";
import { Menu, X, Terminal } from "lucide-react";
import { Button } from "@/components/ui/button";

const navItems = [
  { label: "experiences", href: "#experiences" },
  { label: "achievements", href: "#achievements" },
  { label: "gear", href: "#gear" },
  { label: "links", href: "#links" },
];

export function Navigation() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (href: string) => {
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
    setIsMobileMenuOpen(false);
  };

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-background/80 backdrop-blur-lg border-b border-border shadow-sm"
          : "bg-transparent"
      }`}
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <a
            href="#"
            className="flex items-center gap-2 font-mono font-bold text-lg group"
            onClick={(e) => {
              e.preventDefault();
              window.scrollTo({ top: 0, behavior: "smooth" });
            }}
          >
            <Terminal className="h-5 w-5 text-primary transition-transform group-hover:rotate-12" />
            <span className="syntax-keyword">Viet</span>
            <span className="syntax-function">Anh</span>
            <span className="text-muted-foreground">.dev</span>
          </a>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-1">
            {navItems.map((item) => (
              <button
                key={item.label}
                onClick={() => scrollToSection(item.href)}
                className="px-4 py-2 font-mono text-sm text-muted-foreground hover:text-foreground transition-colors relative group"
              >
                <span className="text-syntax-comment">//</span> {item.label}
                <span className="absolute bottom-0 left-0 w-full h-0.5 bg-primary scale-x-0 group-hover:scale-x-100 transition-transform origin-left" />
              </button>
            ))}
            <div className="ml-4 pl-4 border-l border-border">
              <ThemeToggle />
            </div>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex md:hidden items-center gap-2">
            <ThemeToggle />
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? (
                <X className="h-5 w-5" />
              ) : (
                <Menu className="h-5 w-5" />
              )}
            </Button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden py-4 border-t border-border animate-fade-in">
            {navItems.map((item, index) => (
              <button
                key={item.label}
                onClick={() => scrollToSection(item.href)}
                className="block w-full text-left px-4 py-3 font-mono text-sm text-muted-foreground hover:text-foreground hover:bg-secondary/50 transition-colors"
                style={{ animationDelay: `${index * 50}ms` }}
              >
                <span className="text-syntax-comment">//</span> {item.label}
              </button>
            ))}
          </div>
        )}
      </div>
    </nav>
  );
}
