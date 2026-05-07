import { useEffect, useMemo, useState } from "react";
import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Clock3 } from "lucide-react";

const TARGET_DATE = new Date("2026-06-15T18:00:00+07:00");

const getTimeLeft = () => {
  const diff = TARGET_DATE.getTime() - Date.now();

  if (diff <= 0) {
    return { total: 0, days: 0, hours: 0, minutes: 0, seconds: 0 };
  }

  return {
    total: diff,
    days: Math.floor(diff / (1000 * 60 * 60 * 24)),
    hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
    minutes: Math.floor((diff / (1000 * 60)) % 60),
    seconds: Math.floor((diff / 1000) % 60),
  };
};

const formatUnit = (value: number) => value.toString().padStart(2, "0");

const Countdown = () => {
  const [timeLeft, setTimeLeft] = useState(getTimeLeft);

  useEffect(() => {
    const timer = window.setInterval(() => {
      setTimeLeft(getTimeLeft());
    }, 1000);

    return () => window.clearInterval(timer);
  }, []);

  const countdownItems = useMemo(
    () => [
      { label: "days", value: timeLeft.days.toString() },
      { label: "hours", value: formatUnit(timeLeft.hours) },
      { label: "minutes", value: formatUnit(timeLeft.minutes) },
      { label: "seconds", value: formatUnit(timeLeft.seconds) },
    ],
    [timeLeft]
  );

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navigation />
      <main className="relative min-h-screen overflow-hidden pt-24">
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

        <div className="absolute top-1/4 -left-32 h-96 w-96 rounded-full bg-primary/20 blur-3xl animate-pulse-slow" />
        <div
          className="absolute bottom-1/4 -right-32 h-96 w-96 rounded-full bg-accent/20 blur-3xl animate-pulse-slow"
          style={{ animationDelay: "2s" }}
        />

        <section className="container relative z-10 mx-auto flex min-h-[calc(100vh-6rem)] items-center px-4 py-12">
          <div className="mx-auto w-full max-w-5xl">
            <div className="mb-6 flex justify-center">
              <Badge variant="secondary" className="gap-2 border border-border bg-card/70 px-4 py-2 font-mono">
                <Clock3 className="h-3.5 w-3.5 text-primary" />
                hidden/countdown.tsx
              </Badge>
            </div>

            <div className="rounded-2xl border border-border bg-card/80 p-6 shadow-2xl backdrop-blur md:p-10">
              <div className="mb-8 space-y-4 text-center">
                <p className="font-mono text-sm text-muted-foreground">
                  <span className="text-terminal-green">❯</span> target = 2026-06-15 18:00 GMT+7
                </p>
                <h1 className="text-4xl font-bold md:text-6xl">
                  <span className="syntax-keyword">await</span>{" "}
                  <span className="text-gradient">the moment</span>
                </h1>
                <p className="mx-auto max-w-2xl text-base leading-7 text-muted-foreground md:text-lg">
                  A quiet countdown page, styled to match the rest of the site.
                  No breadcrumb from the homepage — only the link if you already know it.
                </p>
              </div>

              <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
                {countdownItems.map((item) => (
                  <div
                    key={item.label}
                    className="rounded-xl border border-border bg-code p-5 text-center shadow-lg"
                  >
                    <div className="text-3xl font-bold text-foreground md:text-5xl">
                      {item.value}
                    </div>
                    <div className="mt-2 font-mono text-xs uppercase tracking-[0.3em] text-muted-foreground">
                      {item.label}
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-8 rounded-xl border border-border bg-background/60 p-4 font-mono text-sm text-muted-foreground">
                {timeLeft.total > 0 ? (
                  <>
                    <span className="text-terminal-green">status:</span> counting down...
                  </>
                ) : (
                  <>
                    <span className="text-terminal-green">status:</span> it&apos;s 18:00 on 15/06/2026 ✨
                  </>
                )}
              </div>

              <div className="mt-8 flex justify-center">
                <Button variant="outline" className="gap-2 font-mono" asChild>
                  <a href="/">
                    <ArrowLeft className="h-4 w-4" />
                    back home
                  </a>
                </Button>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Countdown;
