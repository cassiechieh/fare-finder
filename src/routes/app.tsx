import { useEffect, useState } from "react";
import { BellRing, Check, Loader2, Plane } from "lucide-react";
import { usePageMeta } from "@/lib/page-meta";
import { listSubscriptions, subscribe, type PlanName, type Subscription } from "@/lib/flight-api";
import { useAuthUser } from "./AuthenticatedLayout";

const PLANS: { plan: PlanName; route: string; title: string; hint: number }[] = [
  { plan: "tokyo", route: "TPE-TYO", title: "台北 ✈ 東京", hint: 9325 },
  { plan: "seoul", route: "TPE-SEL", title: "台北 ✈ 首爾", hint: 5989 },
];

export function DashboardPage() {
  usePageMeta({
    title: "Dashboard — Flight Price Notifier",
    description: "Your flight-route tracking dashboard.",
    robots: "noindex",
  });
  const user = useAuthUser();
  const email = user?.email ?? "";
  const [subs, setSubs] = useState<Record<string, Subscription>>({});
  const [loading, setLoading] = useState(true);
  const [loadError, setLoadError] = useState<string | null>(null);

  useEffect(() => {
    if (!email) return;
    setLoading(true);
    listSubscriptions(email)
      .then((rows) => {
        setSubs(Object.fromEntries(rows.map((r) => [r.route, r])));
        setLoadError(null);
      })
      .catch((e: Error) => setLoadError(e.message))
      .finally(() => setLoading(false));
  }, [email]);

  return (
    <div className="animate-fade-up">
      <h1 className="text-3xl font-bold tracking-tight text-foreground">Hi {user?.email}</h1>
      <p className="mt-2 font-hand text-xl text-muted-foreground">
        機票降價通知 · Flight Price Notifier
      </p>
      <p className="mt-6 max-w-2xl text-sm leading-relaxed text-muted-foreground">
        選一條航線、設定你的目標價（新台幣）。我們每 30 分鐘查一次下個月的最低票價，
        一旦低於你的目標價，就寄 email 通知你。
      </p>

      {loadError && (
        <p className="mt-6 rounded-xl border-[1.5px] border-destructive bg-card px-4 py-3 text-sm text-destructive">
          {loadError}
        </p>
      )}

      <div className="mt-8 grid gap-6 md:grid-cols-2">
        {PLANS.map((p) => (
          <PlanCard
            key={p.plan}
            {...p}
            email={email}
            loading={loading}
            sub={subs[p.route]}
            onSaved={(s) => setSubs((prev) => ({ ...prev, [s.route]: s }))}
          />
        ))}
      </div>

      <div className="mt-8 flex items-center gap-2 text-xs text-muted-foreground">
        <Plane className="size-3.5" />
        通知會寄到 {email || "你的登入 email"}
      </div>
    </div>
  );
}

function PlanCard({
  plan,
  route,
  title,
  hint,
  email,
  loading,
  sub,
  onSaved,
}: {
  plan: PlanName;
  route: string;
  title: string;
  hint: number;
  email: string;
  loading: boolean;
  sub: Subscription | undefined;
  onSaved: (s: Subscription) => void;
}) {
  const [price, setPrice] = useState<string>("");
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [justSaved, setJustSaved] = useState(false);

  useEffect(() => {
    if (sub) setPrice(String(sub.target_price));
  }, [sub]);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const n = Math.round(Number(price));
    if (!Number.isFinite(n) || n <= 0) {
      setError("請輸入大於 0 的金額");
      return;
    }
    setSaving(true);
    setError(null);
    try {
      await subscribe(email, plan, n);
      const [origin = "", destination = ""] = route.split("-");
      onSaved({ route, plan_name: plan, origin, destination, target_price: n, currency: "TWD" });
      setJustSaved(true);
      setTimeout(() => setJustSaved(false), 2500);
    } catch (err) {
      setError((err as Error).message);
    } finally {
      setSaving(false);
    }
  }

  return (
    <div className="ink-card overflow-hidden rounded-2xl bg-card">
      <div className="napkin-stripes h-3 border-b-[1.5px] border-[var(--ink)]" aria-hidden="true" />
      <form onSubmit={handleSubmit} className="p-6">
        <div className="flex items-start justify-between gap-3">
          <h2 className="text-xl font-semibold text-card-foreground">{title}</h2>
          {sub && (
            <span className="inline-flex items-center gap-1 rounded-full border-[1.5px] border-[var(--ink)] bg-accent px-3 py-0.5 text-xs font-bold text-foreground">
              <BellRing className="size-3.5 text-primary" />
              已訂閱
            </span>
          )}
        </div>
        <p className="mt-1 text-sm text-muted-foreground">
          {sub
            ? `目前目標價 NT$${sub.target_price.toLocaleString()}`
            : `最近最低價約 NT$${hint.toLocaleString()}，可以此為參考`}
        </p>

        <label className="mt-5 block text-sm font-medium text-foreground" htmlFor={`price-${plan}`}>
          目標價（新台幣）
        </label>
        <div className="mt-1.5 flex gap-3">
          <div className="relative flex-1">
            <span className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-sm text-muted-foreground">
              NT$
            </span>
            <input
              id={`price-${plan}`}
              type="number"
              inputMode="numeric"
              min={1}
              step={1}
              required
              placeholder={String(Math.round(hint * 1.1))}
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              disabled={loading || !email}
              className="w-full rounded-xl border-[1.5px] border-input bg-background py-2.5 pl-12 pr-3.5 text-sm text-foreground outline-none transition-colors placeholder:text-muted-foreground focus:border-primary focus:ring-2 focus:ring-ring disabled:opacity-60"
            />
          </div>
          <button
            type="submit"
            disabled={saving || loading || !email}
            className="ink-button inline-flex shrink-0 items-center justify-center gap-2 rounded-full bg-primary px-5 py-2 text-sm font-bold text-primary-foreground disabled:opacity-60"
          >
            {saving ? (
              <Loader2 className="size-4 animate-spin" />
            ) : justSaved ? (
              <Check className="size-4" />
            ) : null}
            {justSaved ? "已儲存" : sub ? "更新目標價" : "開始追蹤"}
          </button>
        </div>
        {error && <p className="mt-2 text-sm text-destructive">{error}</p>}
      </form>
    </div>
  );
}
