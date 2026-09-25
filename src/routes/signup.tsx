import { useState } from "react";
import { Link, useNavigate } from "react-router";
import { Loader2 } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { usePageMeta } from "@/lib/page-meta";
import { AuthShell, Field } from "./auth";

export function SignUpPage() {
  usePageMeta({
    title: "Sign up — Flight Price Notifier",
    description: "Create your Flight Price Notifier 機票降價通知 account.",
  });
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setLoading(true);
    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: { emailRedirectTo: window.location.origin },
    });
    setLoading(false);
    if (error) {
      setError(error.message);
      return;
    }
    navigate("/app", { replace: true });
  }

  return (
    <AuthShell title="Create account" subtitle="註冊新帳號">
      <form onSubmit={handleSubmit} className="space-y-4">
        <Field label="Email" type="email" value={email} onChange={setEmail} autoComplete="email" />
        <Field
          label="Password"
          type="password"
          value={password}
          onChange={setPassword}
          autoComplete="new-password"
        />
        {error && <p className="text-sm text-destructive">{error}</p>}
        <button
          type="submit"
          disabled={loading}
          className="flex w-full items-center justify-center gap-2 rounded-lg bg-primary py-2.5 text-sm font-semibold text-primary-foreground transition-colors hover:bg-primary/85 disabled:opacity-60"
        >
          {loading && <Loader2 className="size-4 animate-spin" />}
          Sign up / 註冊
        </button>
      </form>
      <p className="mt-6 text-center text-sm text-muted-foreground">
        已經有帳號了？{" "}
        <Link to="/auth" className="font-medium text-primary hover:underline">
          Sign in / 登入
        </Link>
      </p>
    </AuthShell>
  );
}
