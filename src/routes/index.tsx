import { Link } from "react-router";
import { Plane, BellRing, Radar, CalendarX2 } from "lucide-react";
import { usePageMeta } from "@/lib/page-meta";
import { WindowScene } from "@/components/WindowScene";

const features = [
  {
    icon: Radar,
    title: "盯緊熱門航線",
    subtitle: "Always-on route watching",
    body: "持續監控台北出發的熱門航線（東京、首爾），自動抓最低票價。",
    badge: "bg-secondary",
  },
  {
    icon: BellRing,
    title: "達標自動通知",
    subtitle: "Target-price email alerts",
    body: "低於你設定的目標價，就寄 email 提醒你，附上立即訂購連結。",
    badge: "bg-accent",
  },
  {
    icon: CalendarX2,
    title: "隨時取消",
    subtitle: "Cancel anytime",
    body: "月訂閱制，不想用隨時停，沒有綁約。",
    badge: "bg-[#fbe3de]",
  },
];

export function LandingPage() {
  usePageMeta({
    title: "Flight Price Notifier — 機票降價通知",
    description:
      "設定航線與目標價，機票降價就通知你。Set a route and a target price — we email you when the fare drops.",
  });

  return (
    <div className="relative min-h-screen overflow-x-hidden bg-background">
      {/* Header */}
      <header className="sticky top-0 z-10 border-b border-border bg-background/85 backdrop-blur">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
          <div className="flex items-center gap-2 font-serif text-lg font-semibold tracking-tight">
            <Plane className="size-5 text-primary" />
            Flight Price Notifier
          </div>
          <Link
            to="/auth"
            className="ink-button rounded-full bg-primary px-5 py-2 text-sm font-bold text-primary-foreground"
          >
            Sign in / 登入
          </Link>
        </div>
      </header>

      {/* Hero */}
      <section className="hero-glow relative">
        <div className="mx-auto grid max-w-6xl items-center gap-12 px-6 pt-16 pb-16 md:grid-cols-[1.1fr_1fr] md:pt-24 md:pb-24">
          <div className="text-center md:text-left">
            <h1 className="animate-fade-up text-4xl font-bold leading-tight tracking-tight md:text-6xl">
              Flight Price Notifier
              <span className="mt-3 block text-2xl font-semibold text-primary md:text-3xl">
                機票降價通知
              </span>
            </h1>
            <p className="animate-fade-up-delay-1 mt-8 text-lg font-semibold text-foreground/85 md:text-xl">
              設定航線與目標價，機票降價就通知你
            </p>
            <p className="animate-fade-up-delay-1 mt-2 font-hand text-2xl text-muted-foreground md:text-[1.7rem]">
              Set a route and a target price — we email you when the fare drops.
            </p>
            <div className="animate-fade-up-delay-2 mt-10">
              <Link
                to="/auth"
                className="ink-button inline-flex items-center gap-2 rounded-full bg-primary px-8 py-3.5 text-base font-bold text-primary-foreground"
              >
                <Plane className="size-4" />
                Sign in / 登入
              </Link>
            </div>
          </div>
          <div className="animate-fade-up-delay-2 mx-auto w-full max-w-[26rem]">
            <WindowScene className="h-auto w-full drop-shadow-[6px_8px_0_rgba(43,39,35,0.08)]" />
          </div>
        </div>
      </section>

      <div className="cross-row mx-auto max-w-6xl" aria-hidden="true" />

      {/* Features */}
      <section className="mx-auto max-w-6xl px-6 pt-16 pb-24">
        <div className="grid gap-8 md:grid-cols-3">
          {features.map((f, i) => (
            <div
              key={f.title}
              className={`animate-fade-up-delay-${i + 1} ink-card overflow-hidden rounded-2xl bg-card transition-transform duration-200 hover:-translate-y-1`}
            >
              <div
                className="napkin-stripes h-3 border-b-[1.5px] border-[var(--ink)]"
                aria-hidden="true"
              />
              <div className="p-7">
                <div
                  className={`flex size-12 items-center justify-center rounded-full border-[1.5px] border-[var(--ink)] ${f.badge}`}
                >
                  <f.icon className="size-5 text-primary" />
                </div>
                <h3 className="mt-5 text-xl font-semibold text-card-foreground">
                  {f.title}
                  <span className="mt-1 block font-hand text-xl font-medium tracking-normal text-primary">
                    {f.subtitle}
                  </span>
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{f.body}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border bg-muted/60 py-8">
        <p className="text-center text-sm text-muted-foreground">© 2026 Flight Price Notifier</p>
      </footer>
    </div>
  );
}
