// Public API Gateway endpoint for the AWS backend (no secrets — the browser holds no AWS credentials).
const FLIGHT_API_URL: string =
  import.meta.env["VITE_FLIGHT_API_URL"] ??
  "https://z03t2dpwda.execute-api.us-east-1.amazonaws.com";

export type PlanName = "tokyo" | "seoul" | "london";

export interface Subscription {
  route: string;
  plan_name: PlanName;
  origin: string;
  destination: string;
  target_price: number;
  currency: "TWD";
  created_at?: string;
  updated_at?: string;
}

export async function listSubscriptions(email: string): Promise<Subscription[]> {
  const res = await fetch(`${FLIGHT_API_URL}/subscriptions?email=${encodeURIComponent(email)}`);
  if (!res.ok) throw new Error(`讀取訂閱失敗 (${res.status})`);
  const data = (await res.json()) as { subscriptions?: Subscription[] };
  return data.subscriptions ?? [];
}

export async function subscribe(email: string, plan_name: PlanName, target_price: number) {
  const res = await fetch(`${FLIGHT_API_URL}/subscribe`, {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify({ email, plan_name, target_price }),
  });
  const data = (await res.json().catch(() => ({}))) as { error?: string };
  if (!res.ok) throw new Error(data.error ?? `訂閱失敗 (${res.status})`);
  return data;
}
