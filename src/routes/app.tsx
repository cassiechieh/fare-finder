import { useEffect, useState } from "react";
import { BellRing, Check, Clock, CreditCard, Loader2, Plane, XCircle } from "lucide-react";
import { usePageMeta } from "@/lib/page-meta";
import {
  cancelSubscription,
  isPaidThrough,
  listSubscriptions,
  subscribe,
  type PlanName,
  type Subscription,
} from "@/lib/flight-api";
import { useAuthUser } from "./AuthenticatedLayout";

const PLANS: { plan: PlanName; route: string; title: string; hint: number }[] = [
  { plan: "tokyo", route: "TPE-TYO", title: "台北 ✈ 東京", hint: 9325 },
  { plan: "seoul", route: "TPE-SEL", title: "台北 ✈ 首爾", hint: 5989 },
  { plan: "london", route: "TPE-LON", title: "台北 ✈ 倫敦", hint: 22786 },
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
  const [monthlyPrice, setMonthlyPrice] = useState<number | null>(null);
  const [purchase] = useState(() => new URLSearchParams(window.location.search).get("purchase"));

  useEffect(() => {
    if (!email) return;
    let cancelled = false;
    const load = () =>
      listSubscriptions(email)
        .then(({ subscriptions, monthlyPrice: price }) => {
          if (cancelled) return;
          setSubs(Object.fromEntries(subscriptions.map((r) => [r.route, r])));
          setMonthlyPrice(price);
          setLoadError(null);
        })
        .catch((e: Error) => !cancelled && setLoadError(e.message))
        .finally(() => !cancelled && setLoading(false));
    setLoading(true);
    void load();
    // Right after returning from ECPay, the server-to-server callback may land a few seconds later.
    const timers = purchase === "success" ? [4000, 10000].map((ms) => setTimeout(load, ms)) : [];
    return () => {
      cancelled = true;
      timers.forEach(clearTimeout);
    };
  }, [email, purchase]);

  return (
    <div className="animate-fade-up">
      <h1 className="text-3xl font-bold tracking-tight text-foreground">Hi {user?.email}</h1>
      <p className="mt-2 font-hand text-xl text-muted-foreground">
        機票降價通知 · Flight Price Notifier
      </p>
      <p className="mt-6 max-w-2xl text-sm leading-relaxed text-muted-foreground">
        選一條航線、設定你的目標價（新台幣）。我們每 30 分鐘查一次近期（下個月起）的最低來回票價，
        一旦低於你的目標價，就寄 email 通知你。每條航線為獨立月訂閱
        {monthlyPrice ? `（NT$${monthlyPrice.toLocaleString()} / 月）` : ""}
        ，付款後才會開始通知，可隨時取消。
      </p>

      {purchase === "success" && (
        <p className="mt-6 rounded-xl border-[1.5px] border-[var(--ink)] bg-accent px-4 py-3 text-sm font-medium text-foreground">
          付款完成！正在向綠界確認訂閱狀態，卡片會在幾秒內更新為「已訂閱」。
        </p>
      )}
      {purchase === "failed" && (
        <p className="mt-6 rounded-xl border-[1.5px] border-destructive bg-card px-4 py-3 text-sm text-destructive">
          付款沒有完成，這次沒有扣款。可以再按一次「完成付款」重試。
        </p>
      )}

      {loadError && (
        <p className="mt-6 rounded-xl border-[1.5px] border-destructive bg-card px-4 py-3 text-sm text-destructive">
          {loadError}
        </p>
      )}

      <div className="mt-8 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
        {PLANS.map((p) => (
          <PlanCard
            key={p.plan}
            {...p}
            email={email}
            monthlyPrice={monthlyPrice}
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
  monthlyPrice,
  loading,
  sub,
  onSaved,
}: {
  plan: PlanName;
  route: string;
  title: string;
  hint: number;
  email: string;
  monthlyPrice: number | null;
  loading: boolean;
  sub: Subscription | undefined;
  onSaved: (s: Subscription) => void;
}) {
  const [price, setPrice] = useState<string>("");
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [justSaved, setJustSaved] = useState(false);
  const [cancelling, setCancelling] = useState(false);
  const paid = isPaidThrough(sub);
  const status = sub?.subscription_status ?? (sub ? "pending_payment" : null);
  const priceLabel = monthlyPrice ? `NT$${monthlyPrice.toLocaleString()}/月` : "";

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
      const r = await subscribe(email, plan, n);
      if (r.redirected) return; // browser is now on ECPay's cashier
      const [origin = "", destination = ""] = route.split("-");
      onSaved({
        ...(sub ?? {}),
        route,
        plan_name: plan,
        origin,
        destination,
        target_price: n,
        currency: "TWD",
        subscription_status: r.subscription_status ?? sub?.subscription_status,
      });
      setJustSaved(true);
      setTimeout(() => setJustSaved(false), 2500);
    } catch (err) {
      setError((err as Error).message);
    } finally {
      setSaving(false);
    }
  }

  async function handleCancel() {
    if (!sub) return;
    if (
      !window.confirm(
        `確定要取消「${title}」的月訂閱嗎？\n已付費的期間內仍會照常通知，到期後停止。`,
      )
    )
      return;
    setCancelling(true);
    setError(null);
    try {
      const r = await cancelSubscription(email, route);
      onSaved({
        ...sub,
        subscription_status: r.subscription_status ?? "cancelled",
        current_period_end_date: r.current_period_end_date ?? sub.current_period_end_date,
      });
    } catch (err) {
      setError((err as Error).message);
    } finally {
      setCancelling(false);
    }
  }

  const buttonLabel = justSaved
    ? "已儲存"
    : paid
      ? "更新目標價"
      : status === "pending_payment"
        ? `完成付款${priceLabel ? ` ${priceLabel}` : ""}`
        : status === "expired"
          ? `重新訂閱${priceLabel ? ` ${priceLabel}` : ""}`
          : `訂閱並付款${priceLabel ? ` ${priceLabel}` : ""}`;

  return (
    <div className="ink-card overflow-hidden rounded-2xl bg-card">
      <div className="napkin-stripes h-3 border-b-[1.5px] border-[var(--ink)]" aria-hidden="true" />
      <form onSubmit={handleSubmit} className="p-6">
        <div className="flex items-start justify-between gap-3">
          <h2 className="text-xl font-semibold text-card-foreground">{title}</h2>
          {sub && <StatusBadge status={status} paid={paid} />}
        </div>
        {sub && (
          <p className="mt-1 text-sm font-medium text-foreground">
            目前目標價 NT${sub.target_price.toLocaleString()}
          </p>
        )}
        {sub && status === "active" && sub.current_period_end_date && (
          <p className="mt-1 text-xs text-muted-foreground">
            本期有效至 {sub.current_period_end_date}，每月自動續訂
          </p>
        )}
        {sub && status === "cancelled" && paid && (
          <p className="mt-1 text-xs text-muted-foreground">
            已取消續訂 · {sub.current_period_end_date} 前仍會照常通知
          </p>
        )}
        {sub && status === "pending_payment" && (
          <p className="mt-1 text-xs text-muted-foreground">
            尚未完成付款，付款後才會開始寄降價通知
          </p>
        )}
        <p className="mt-1 text-sm text-muted-foreground">
          最近最低價約 NT${hint.toLocaleString()}，可以此為參考
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
            {buttonLabel}
          </button>
        </div>
        {error && <p className="mt-2 text-sm text-destructive">{error}</p>}
        {status === "active" && (
          <button
            type="button"
            onClick={handleCancel}
            disabled={cancelling}
            className="mt-4 inline-flex items-center gap-1.5 text-xs font-medium text-muted-foreground underline-offset-4 hover:text-destructive hover:underline disabled:opacity-60"
          >
            {cancelling ? (
              <Loader2 className="size-3.5 animate-spin" />
            ) : (
              <XCircle className="size-3.5" />
            )}
            取消訂閱
          </button>
        )}
      </form>
    </div>
  );
}

function StatusBadge({ status, paid }: { status: string | null; paid: boolean }) {
  const base =
    "inline-flex shrink-0 items-center gap-1 rounded-full border-[1.5px] px-3 py-0.5 text-xs font-bold";
  if (status === "active")
    return (
      <span className={`${base} border-[var(--ink)] bg-accent text-foreground`}>
        <BellRing className="size-3.5 text-primary" />
        已訂閱
      </span>
    );
  if (status === "cancelled" && paid)
    return (
      <span className={`${base} border-[var(--ink)] bg-card text-foreground`}>
        <Clock className="size-3.5" />
        已取消 · 期限內有效
      </span>
    );
  if (status === "pending_payment")
    return (
      <span className={`${base} border-[var(--ink)] bg-card text-foreground`}>
        <CreditCard className="size-3.5" />
        未完成付款
      </span>
    );
  return (
    <span className={`${base} border-input bg-card text-muted-foreground`}>
      <XCircle className="size-3.5" />
      已結束
    </span>
  );
}
