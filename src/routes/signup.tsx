import { useState } from "react";
import { Link, useNavigate } from "react-router";
import { Loader2, MailCheck } from "lucide-react";
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
  const [sentTo, setSentTo] = useState<string | null>(null);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setLoading(true);
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: { emailRedirectTo: window.location.origin },
    });
    setLoading(false);
    if (error) {
      setError(error.message);
      return;
    }
    // Email confirmation is on: no session until the user clicks the link.
    if (data.session) {
      navigate("/app", { replace: true });
      return;
    }
    setSentTo(email);
  }

  if (sentTo) {
    return (
      <AuthShell title="Check your email" subtitle="請至信箱收驗證信">
        <div className="space-y-4 text-center">
          <div className="mx-auto flex size-14 items-center justify-center rounded-full bg-[var(--sky)]/10">
            <MailCheck className="size-7 text-[var(--sky)]" />
          </div>
          <p className="text-sm leading-relaxed text-foreground">
            我們已寄出驗證信到
            <br />
            <span className="font-semibold break-all">{sentTo}</span>
          </p>
          <p className="text-sm leading-relaxed text-muted-foreground">
            請打開信中的「確認信箱」連結完成註冊，之後就能登入。
            <br />
            沒收到嗎？請檢查垃圾郵件匣，或稍等幾分鐘。
          </p>
        </div>
        <p className="mt-6 text-center text-sm text-muted-foreground">
          已完成驗證？{" "}
          <Link to="/auth" className="font-semibold text-[var(--sky)] hover:underline">
            Sign in / 登入
          </Link>
        </p>
      </AuthShell>
    );
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
          className="sunset-button flex w-full items-center justify-center gap-2 rounded-full bg-primary py-3 text-sm font-semibold text-primary-foreground disabled:opacity-60"
        >
          {loading && <Loader2 className="size-4 animate-spin" />}
          Sign up / 註冊
        </button>
      </form>
      <p className="mt-6 text-center text-sm text-muted-foreground">
        已經有帳號了？{" "}
        <Link to="/auth" className="font-semibold text-[var(--sky)] hover:underline">
          Sign in / 登入
        </Link>
      </p>
    </AuthShell>
  );
}
