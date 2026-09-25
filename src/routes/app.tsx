import { Plane, Sparkles } from "lucide-react";
import { usePageMeta } from "@/lib/page-meta";
import { useAuthUser } from "./AuthenticatedLayout";

export function DashboardPage() {
  usePageMeta({
    title: "Dashboard — Flight Price Notifier",
    description: "Your flight-route tracking dashboard.",
    robots: "noindex",
  });
  const user = useAuthUser();

  return (
    <div className="animate-fade-up">
      <h1 className="text-3xl font-bold tracking-tight text-foreground">Hi {user?.email}</h1>
      <p className="mt-2 font-hand text-xl text-muted-foreground">
        機票降價通知 · Flight Price Notifier
      </p>

      <div className="ink-card mt-10 overflow-hidden rounded-2xl bg-card text-center">
        <div
          className="napkin-stripes h-3 border-b-[1.5px] border-[var(--ink)]"
          aria-hidden="true"
        />
        <div className="p-10">
          <div className="mx-auto flex size-14 items-center justify-center rounded-full border-[1.5px] border-[var(--ink)] bg-accent">
            <Sparkles className="size-6 text-primary" />
          </div>
          <h2 className="mt-6 text-lg font-semibold text-card-foreground">
            你的航線追蹤儀表板即將上線
          </h2>
          <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
            你的航線追蹤儀表板即將上線 — 下一個里程碑會加上訂閱航線的功能。
            <br />
            Your dashboard is coming soon. Route-subscription will be added in the next milestone.
          </p>
          <div className="mt-8 flex items-center justify-center gap-2 text-xs text-muted-foreground">
            <Plane className="size-3.5" />
            台北出發 · 東京 / 首爾熱門航線
          </div>
        </div>
      </div>
    </div>
  );
}
