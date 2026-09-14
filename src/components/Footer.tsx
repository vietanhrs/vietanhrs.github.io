import { Terminal, Heart } from "lucide-react";

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="py-12 border-t border-border">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          {/* Logo */}
          <div className="flex items-center gap-2 font-mono">
            <Terminal className="h-5 w-5 text-primary" />
            <span className="syntax-keyword">Viet</span>
            <span className="syntax-function">Anh</span>
            <span className="text-muted-foreground">.dev</span>
          </div>

          {/* Copyright */}
          <div className="flex items-center gap-2 text-muted-foreground text-sm font-mono">
            <span className="syntax-comment">/*</span>
            <span>Built with</span>
            <Heart className="w-4 h-4 text-destructive fill-destructive" />
            <span>in Hanoi</span>
            <span className="syntax-comment">*/</span>
          </div>

          {/* Year */}
          <div className="text-muted-foreground text-sm font-mono">
            <span className="syntax-keyword">const</span>{" "}
            <span className="syntax-variable">year</span> <span>=</span>{" "}
            <span className="syntax-number">{currentYear}</span>
            <span>;</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
