import { useEffect, useState } from "react";
import { Link, Outlet, useNavigate } from "react-router";
import { Plane, Loader2, LogOut } from "lucide-react";
import type { User } from "@supabase/supabase-js";
import { supabase } from "@/integrations/supabase/client";

export function AuthenticatedLayout() {
  const navigate = useNavigate();
  const [user, setUser] = useState<User | null>(null);
  const [checking, setChecking] = useState(true);

  useEffect(() => {
    supabase.auth.getUser().then(({ data }) => {
      if (!data.user) {
        navigate("/auth", { replace: true });
        return;
      }
      setUser(data.user);
      setChecking(false);
    });

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((event) => {
      if (event === "SIGNED_OUT") {
        navigate("/auth", { replace: true });
      }
    });
    return () => subscription.unsubscribe();
  }, [navigate]);

  if (checking) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <Loader2 className="size-6 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="flex min-h-screen flex-col">
      <header className="sticky top-0 z-10 double-rule bg-[#efe4cc]/85 backdrop-blur-sm">
        <div className="mx-auto flex w-full max-w-6xl items-center justify-between gap-3 px-4 py-4 sm:px-6">
          <Link
            to="/app"
            className="flex items-center gap-2 font-display text-sm font-semibold tracking-wide whitespace-nowrap sm:text-lg text-foreground"
          >
            <Plane className="size-5 text-primary" />
            Flight Price Notifier
          </Link>
          <SignOutButton />
        </div>
      </header>
      <main className="mx-auto w-full max-w-6xl flex-1 px-6 py-10">
        <Outlet />
      </main>
    </div>
  );
}

function SignOutButton() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  async function handleSignOut() {
    setLoading(true);
    await supabase.auth.signOut();
    navigate("/", { replace: true });
  }

  return (
    <button
      onClick={handleSignOut}
      disabled={loading}
      className="inline-flex items-center gap-2 shrink-0 rounded-sm border border-[var(--sepia)] bg-[var(--card)] px-3 py-2 text-xs whitespace-nowrap sm:px-4 sm:text-sm font-medium text-secondary-foreground transition-colors hover:border-primary hover:bg-accent disabled:opacity-60"
    >
      {loading ? <Loader2 className="size-4 animate-spin" /> : <LogOut className="size-4" />}
      Sign out / 登出
    </button>
  );
}

export function useAuthUser(): User | null {
  const [user, setUser] = useState<User | null>(null);
  useEffect(() => {
    supabase.auth.getUser().then(({ data }) => setUser(data.user));
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
    });
    return () => subscription.unsubscribe();
  }, []);
  return user;
}
