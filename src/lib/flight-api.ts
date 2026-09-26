// Public API Gateway endpoint for the AWS backend (no secrets — the browser holds no AWS credentials).
const FLIGHT_API_URL: string =
  import.meta.env["VITE_FLIGHT_API_URL"] ??
  "https://z03t2dpwda.execute-api.us-east-1.amazonaws.com";

export type PlanName = "tokyo" | "seoul" | "london";
export type SubscriptionStatus = "pending_payment" | "active" | "cancelled" | "expired";

export interface Subscription {
  route: string;
  plan_name: PlanName;
  origin: string;
  destination: string;
  target_price: number;
  currency: "TWD";
  subscription_status?: SubscriptionStatus | null | undefined;
  current_period_end?: string | null | undefined;
  current_period_end_date?: string | null | undefined;
  created_at?: string;
  updated_at?: string;
}

export async function listSubscriptions(
  email: string,
): Promise<{ subscriptions: Subscription[]; monthlyPrice: number | null }> {
  const res = await fetch(`${FLIGHT_API_URL}/subscriptions?email=${encodeURIComponent(email)}`);
  if (!res.ok) throw new Error(`讀取訂閱失敗 (${res.status})`);
  const data = (await res.json()) as { subscriptions?: Subscription[]; monthly_price?: number };
  return { subscriptions: data.subscriptions ?? [], monthlyPrice: data.monthly_price ?? null };
}

/** A paid (active / cancelled-in-grace) user still inside the paid period. */
export function isPaidThrough(sub: Subscription | undefined): boolean {
  if (!sub) return false;
  if (sub.subscription_status === "active") return true;
  if (sub.subscription_status === "cancelled" && sub.current_period_end) {
    return sub.current_period_end >= new Date().toISOString().replace(/\.\d{3}Z$/, "Z");
  }
  return false;
}

/**
 * POST /subscribe.
 * - text/html  → the ECPay auto-submit checkout form: hand the whole page over to it (browser goes to ECPay).
 * - application/json → in-place target-price update for a paid user (no re-payment).
 */
export async function subscribe(
  email: string,
  plan_name: PlanName,
  target_price: number,
): Promise<{ redirected: true } | ({ redirected: false } & Partial<Subscription>)> {
  const res = await fetch(`${FLIGHT_API_URL}/subscribe`, {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify({ email, plan_name, target_price }),
  });
  const type = res.headers.get("content-type") ?? "";
  if (res.ok && type.includes("text/html")) {
    const html = await res.text();
    document.open();
    document.write(html);
    document.close();
    return { redirected: true };
  }
  const data = (await res.json().catch(() => ({}))) as { error?: string } & Partial<Subscription>;
  if (!res.ok) throw new Error(data.error ?? `訂閱失敗 (${res.status})`);
  return { redirected: false, ...data };
}

export async function cancelSubscription(email: string, route: string) {
  const res = await fetch(`${FLIGHT_API_URL}/cancel`, {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify({ email, route }),
  });
  const data = (await res.json().catch(() => ({}))) as {
    error?: string;
    subscription_status?: SubscriptionStatus;
    current_period_end_date?: string;
  };
  if (!res.ok) throw new Error(data.error ?? `取消失敗 (${res.status})`);
  return data;
}
