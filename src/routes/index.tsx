import { Link } from "react-router";
import { Plane, BellRing, Radar, CalendarX2 } from "lucide-react";
import { usePageMeta } from "@/lib/page-meta";

const features = [
  {
    icon: Radar,
    title: "盯緊熱門航線",
    subtitle: "Always-on route watching",
    body: "持續監控台北出發的熱門航線（東京、首爾），自動抓最低票價。",
  },
  {
    icon: BellRing,
    title: "達標自動通知",
    subtitle: "Target-price email alerts",
    body: "低於你設定的目標價，就寄 email 提醒你，附上立即訂購連結。",
  },
  {
    icon: CalendarX2,
    title: "隨時取消",
    subtitle: "Cancel anytime",
    body: "月訂閱制，不想用隨時停，沒有綁約。",
  },
];

export function LandingPage() {
  usePageMeta({
    title: "Flight Price Notifier — 機票降價通知",
    description:
      "設定航線與目標價，機票降價就通知你。Set a route and a target price — we email you when the fare drops.",
  });

  return (
    <div className="relative min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-10 border-b border-border/60 bg-background/80 backdrop-blur">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
          <div className="flex items-center gap-2 font-semibold tracking-tight">
            <Plane className="size-5 text-primary" />
            Flight Price Notifier
          </div>
          <Link
            to="/auth"
            className="rounded-lg bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/85"
          >
            Sign in / 登入
          </Link>
        </div>
      </header>

      {/* Hero */}
      <section className="hero-glow relative">
        <div className="mx-auto max-w-3xl px-6 pt-24 pb-20 text-center md:pt-32 md:pb-28">
          <h1 className="animate-fade-up text-4xl font-bold tracking-tight md:text-6xl">
            Flight Price Notifier
            <span className="mt-3 block text-2xl font-semibold text-primary md:text-3xl">
              機票降價通知
            </span>
          </h1>
          <p className="animate-fade-up-delay-1 mt-8 text-lg text-muted-foreground md:text-xl">
            設定航線與目標價，機票降價就通知你
          </p>
          <p className="animate-fade-up-delay-1 mt-2 text-sm text-muted-foreground/80 md:text-base">
            Set a route and a target price — we email you when the fare drops.
          </p>
          <div className="animate-fade-up-delay-2 mt-10">
            <Link
              to="/auth"
              className="inline-flex items-center gap-2 rounded-xl bg-primary px-8 py-3.5 text-base font-semibold text-primary-foreground shadow-lg shadow-primary/25 transition-all hover:bg-primary/85 hover:shadow-primary/40"
            >
              <Plane className="size-4" />
              Sign in / 登入
            </Link>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="mx-auto max-w-6xl px-6 pb-24">
        <div className="grid gap-6 md:grid-cols-3">
          {features.map((f, i) => (
            <div
              key={f.title}
              className={`animate-fade-up-delay-${i + 1} rounded-2xl border border-border bg-card p-7 transition-colors hover:border-primary/40`}
            >
              <div className="flex size-11 items-center justify-center rounded-xl bg-accent">
                <f.icon className="size-5 text-primary" />
              </div>
              <h3 className="mt-5 text-lg font-semibold text-card-foreground">
                {f.title}
                <span className="mt-1 block text-xs font-medium tracking-wide text-primary">
                  {f.subtitle}
                </span>
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{f.body}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border py-8">
        <p className="text-center text-sm text-muted-foreground">
          © 2026 Flight Price Notifier
        </p>
      </footer>
    </div>
  );
}
