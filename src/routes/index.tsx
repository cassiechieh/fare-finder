import { Link } from "react-router";
import { Plane, BellRing, Radar, CalendarX2 } from "lucide-react";
import { usePageMeta } from "@/lib/page-meta";
import { SunsetSky } from "@/components/SunsetSky";

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
    <div className="relative min-h-screen overflow-x-hidden bg-background">
      {/* Header */}
      <header className="sticky top-0 z-10 border-b border-border/70 bg-white/80 backdrop-blur">
        <div className="mx-auto flex max-w-6xl items-center justify-between gap-3 px-4 py-4 sm:px-6">
          <div className="flex items-center gap-2 font-display text-base font-bold whitespace-nowrap text-[var(--navy)] sm:text-lg">
            <span className="flex size-8 items-center justify-center rounded-full bg-[var(--sky)]">
              <Plane className="size-4 text-white" />
            </span>
            Flight Price Notifier
          </div>
          <Link
            to="/auth"
            className="sunset-button shrink-0 rounded-full bg-primary px-4 py-2 text-sm font-semibold whitespace-nowrap text-primary-foreground sm:px-5"
          >
            Sign in / 登入
          </Link>
        </div>
      </header>

      {/* Hero */}
      <section className="hero-glow relative overflow-hidden">
        <SunsetSky className="pointer-events-none absolute inset-x-0 bottom-0 h-[260px] w-full md:h-[340px]" />
        <div className="relative mx-auto max-w-3xl px-6 pt-20 pb-[250px] text-center md:pt-28 md:pb-[330px]">
          <h1 className="animate-fade-up text-4xl font-extrabold text-[var(--navy)] md:text-6xl">
            Flight Price Notifier
            <span className="mt-3 block text-2xl font-bold text-[var(--sky)] md:text-3xl">
              機票降價通知
            </span>
          </h1>
          <p className="animate-fade-up-delay-1 mt-7 text-lg font-medium text-[var(--navy)] md:text-xl">
            設定航線與目標價，機票降價就通知你
          </p>
          <p className="animate-fade-up-delay-1 mt-2 text-sm text-muted-foreground md:text-base">
            Set a route and a target price — we email you when the fare drops.
          </p>
          <div className="animate-fade-up-delay-2 mt-9">
            <Link
              to="/auth"
              className="sunset-button inline-flex items-center gap-2 rounded-full bg-primary px-8 py-3.5 text-base font-semibold text-primary-foreground"
            >
              <Plane className="size-4" />
              Sign in / 登入
            </Link>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="mx-auto -mt-14 max-w-6xl px-6 pb-24 md:-mt-20">
        <div className="relative grid gap-6 md:grid-cols-3">
          {features.map((f, i) => (
            <div
              key={f.title}
              className={`animate-fade-up-delay-${i + 1} soft-card rounded-2xl p-7 transition-transform duration-200 hover:-translate-y-1`}
            >
              <div className="flex size-12 items-center justify-center rounded-xl bg-[var(--sky-light)]">
                <f.icon className="size-5 text-[var(--sky)]" />
              </div>
              <h3 className="mt-5 text-lg font-bold text-card-foreground">
                {f.title}
                <span className="mt-1 block text-sm font-semibold tracking-normal text-[var(--sky)]">
                  {f.subtitle}
                </span>
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{f.body}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-[var(--navy)] py-8">
        <p className="text-center text-sm text-[#b8c4d6]">© 2026 Flight Price Notifier</p>
      </footer>
    </div>
  );
}
