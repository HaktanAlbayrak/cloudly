import type { Theme } from "@/context/theme-context";

export { cn } from "cn";

export type ResolvedTheme = Exclude<Theme, "system">;

/** Resolves "system" to the OS color scheme ("dark" | "light"). */
export function resolveTheme(theme: Theme): ResolvedTheme {
  if (theme !== "system") return theme;

  return window.matchMedia("(prefers-color-scheme: dark)").matches
    ? "dark"
    : "light";
}
