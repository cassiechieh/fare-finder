import { createFileRoute } from "@tanstack/react-router";
import { Plane, Sparkles } from "lucide-react";
import { useAuthUser } from "./route";

export const Route = createFileRoute("/_authenticated/app")({
  head: () => ({
    meta: [
      { title: "Dashboard — Flight Price Notifier" },
      { name: "description", content: "Your flight-route tracking dashboard." },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: DashboardPage,
});

function DashboardPage() {
  const user = useAuthUser();

  return (
    <div className="animate-fade-up">
      <h1 className="text-3xl font-bold tracking-tight text-foreground">
        Hi {user?.email}
      </h1>
      <p className="mt-2 text-sm text-muted-foreground">機票降價通知 · Flight Price Notifier</p>

      <div className="mt-10 rounded-2xl border border-dashed border-primary/40 bg-card p-10 text-center">
        <div className="mx-auto flex size-12 items-center justify-center rounded-2xl bg-accent">
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
        <div className="mt-8 flex items-center justify-center gap-2 text-xs text-muted-foreground/70">
          <Plane className="size-3.5" />
          台北出發 · 東京 / 首爾熱門航線
        </div>
      </div>
    </div>
  );
}
