import { useEffect, useState } from "react";
import { Github, ChevronDown, Linkedin, FileText } from "lucide-react";
import { Button } from "@/components/ui/button";

const roles = [
  "Solution Architect",
  "Full-stack Software Engineer",
  "Front-end Specialist",
  "Blockchain Product Engineer",
  "Builder & Tinkerer",
];

export function HeroSection() {
  const [currentRole, setCurrentRole] = useState(0);
  const [displayText, setDisplayText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const role = roles[currentRole];
    const timeout = setTimeout(
      () => {
        if (!isDeleting) {
          if (displayText.length < role.length) {
            setDisplayText(role.slice(0, displayText.length + 1));
          } else {
            setTimeout(() => setIsDeleting(true), 1800);
          }
        } else {
          if (displayText.length > 0) {
            setDisplayText(displayText.slice(0, -1));
          } else {
            setIsDeleting(false);
            setCurrentRole((prev) => (prev + 1) % roles.length);
          }
        }
      },
      isDeleting ? 40 : 90
    );

    return () => clearTimeout(timeout);
  }, [displayText, isDeleting, currentRole]);

  const scrollToExperiences = () => {
    const element = document.querySelector("#experiences");
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section className="min-h-screen flex items-center justify-center relative overflow-hidden">
      <div className="absolute inset-0 opacity-5">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `repeating-linear-gradient(
            0deg,
            transparent,
            transparent 50px,
            hsl(var(--border)) 50px,
            hsl(var(--border)) 51px
          ),
          repeating-linear-gradient(
            90deg,
            transparent,
            transparent 50px,
            hsl(var(--border)) 50px,
            hsl(var(--border)) 51px
          )`,
          }}
        />
      </div>

      <div className="absolute top-1/4 -left-32 w-96 h-96 bg-primary/20 rounded-full blur-3xl animate-pulse-slow" />
      <div
        className="absolute bottom-1/4 -right-32 w-96 h-96 bg-accent/20 rounded-full blur-3xl animate-pulse-slow"
        style={{ animationDelay: "2s" }}
      />

      <div className="container mx-auto px-4 py-20 relative z-10">
        <div className="max-w-5xl mx-auto">
          <div className="bg-card border border-border rounded-lg p-6 mb-8 font-mono text-sm animate-fade-in shadow-lg">
            <div className="flex items-center gap-2 mb-4 pb-4 border-b border-border">
              <div className="w-3 h-3 rounded-full bg-destructive" />
              <div className="w-3 h-3 rounded-full bg-syntax-variable" />
              <div className="w-3 h-3 rounded-full bg-syntax-string" />
              <span className="ml-4 text-muted-foreground">~/portfolio</span>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2 md:border-r md:border-border md:pr-4">
                <p>
                  <span className="text-terminal-green">❯</span>{" "}
                  <span className="syntax-function">whoami</span>
                </p>
                <p className="text-muted-foreground pl-4">Trần Việt Anh</p>
                <p>
                  <span className="text-terminal-green">❯</span>{" "}
                  <span className="syntax-function">cat</span>{" "}
                  <span className="syntax-string">focus.txt</span>
                </p>
                <p className="text-muted-foreground pl-4">
                  System Design • Front-end Architecture • DeFi Products
                </p>
              </div>
              <div className="space-y-2 pt-4 md:pt-0 border-t md:border-t-0 border-border">
                <p>
                  <span className="text-terminal-green">❯</span>{" "}
                  <span className="syntax-function">cat</span>{" "}
                  <span className="syntax-string">contact.txt</span>
                </p>
                <p className="text-muted-foreground pl-4">
                  <span className="syntax-comment">email:</span>{" "}
                  vietanhtran.uet@gmail.com
                </p>
                <p className="text-muted-foreground pl-4">
                  <span className="syntax-comment">phone:</span> (+84) 988 582 914
                </p>
              </div>
            </div>
          </div>

          <div className="text-center mb-8" style={{ animationDelay: "0.2s" }}>
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6">
              <span className="syntax-keyword">const</span>{" "}
              <span className="syntax-variable">developer</span>{" "}
              <span className="text-muted-foreground">=</span>{" "}
              <span className="syntax-string">"</span>
              <span className="text-gradient">Việt Anh</span>
              <span className="syntax-string">"</span>
              <span className="text-muted-foreground">;</span>
            </h1>

            <div className="h-12 md:h-16 flex items-center justify-center">
              <p className="text-xl md:text-2xl lg:text-3xl font-mono text-muted-foreground text-center px-2">
                <span className="syntax-comment">// </span>
                <span className="text-foreground">{displayText}</span>
                <span className="animate-blink text-primary">|</span>
              </p>
            </div>

            <p className="mt-8 max-w-3xl mx-auto text-base md:text-lg text-muted-foreground leading-8">
              I design systems, build polished front-end experiences, and ship
              full-stack blockchain products. My work sits at the intersection of
              <span className="text-foreground font-medium"> architecture</span>,
              <span className="text-foreground font-medium"> product thinking</span>,
              and <span className="text-foreground font-medium"> hands-on engineering</span>.
            </p>
          </div>

          <div
            className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-12"
            style={{ animationDelay: "0.4s" }}
          >
            <Button
              size="lg"
              className="font-mono gap-2 glow-primary text-primary-foreground"
              onClick={scrollToExperiences}
            >
              <span>explore</span>
              <span className="opacity-70">()</span>
            </Button>
            <Button variant="outline" size="lg" className="font-mono gap-2" asChild>
              <a href="https://github.com/vietanhrs" target="_blank" rel="noopener noreferrer">
                <Github className="h-4 w-4" />
                <span>GitHub</span>
              </a>
            </Button>
            <Button variant="outline" size="lg" className="font-mono gap-2" asChild>
              <a href="https://www.linkedin.com/in/tva2710" target="_blank" rel="noopener noreferrer">
                <Linkedin className="h-4 w-4" />
                <span>LinkedIn</span>
              </a>
            </Button>
            <Button variant="outline" size="lg" className="font-mono gap-2" asChild>
              <a href="/Simple-CV-updated.pdf" target="_blank" rel="noopener noreferrer">
                <FileText className="h-4 w-4" />
                <span>CV</span>
              </a>
            </Button>
          </div>
        </div>

        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
          <ChevronDown className="h-8 w-8 text-muted-foreground" />
        </div>
      </div>
    </section>
  );
}
