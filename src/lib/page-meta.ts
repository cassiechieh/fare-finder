import { useEffect } from "react";

type PageMeta = {
  title: string;
  description?: string;
  robots?: string;
};

function setMeta(name: string, content: string | undefined) {
  let el = document.head.querySelector<HTMLMetaElement>(`meta[name="${name}"]`);
  if (content === undefined) {
    el?.remove();
    return;
  }
  if (!el) {
    el = document.createElement("meta");
    el.name = name;
    document.head.appendChild(el);
  }
  el.content = content;
}

// Client-side replacement for TanStack Start's per-route `head()`.
export function usePageMeta({ title, description, robots }: PageMeta) {
  useEffect(() => {
    document.title = title;
    if (description !== undefined) setMeta("description", description);
    setMeta("robots", robots);
  }, [title, description, robots]);
}
