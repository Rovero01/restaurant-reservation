"use client";

import type { ReactNode } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { CalendarCheck, ClipboardList, LayoutDashboard, Moon, Palette, Sun } from "lucide-react";
import { useTheme } from "@/components/theme-provider";

const navItems = [
  { href: "/", label: "Dashboard", icon: LayoutDashboard },
  { href: "/admin", label: "Admin", icon: ClipboardList },
  { href: "/user", label: "User", icon: CalendarCheck },
  { href: "/retro", label: "Retro", icon: Palette }
];

export function AppShell({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const { theme, mounted, toggleTheme } = useTheme();
  const ThemeIcon = theme === "dark" ? Sun : Moon;

  return (
    <main className="min-h-screen text-[var(--text)]">
      <header className="border-b border-[var(--line)] bg-[color-mix(in_srgb,var(--surface)_86%,transparent)] backdrop-blur-xl">
        <div className="mx-auto flex max-w-7xl flex-col gap-4 px-4 py-4 sm:px-6 lg:flex-row lg:items-center lg:justify-between lg:px-8">
          <div className="flex min-w-0 items-center gap-3">
            <div className="relative grid h-12 w-12 shrink-0 place-items-center overflow-hidden rounded-lg bg-[var(--primary)] text-lg font-black text-white shadow-glow">
              <span className="absolute inset-x-2 top-2 h-1 rounded-full bg-white/30" />
              DQ
            </div>
            <div className="min-w-0">
              <h1 className="flex items-baseline gap-2 truncate text-3xl font-black text-[var(--text)] sm:text-4xl">
                <span>Dine</span>
                <span className="rounded-md bg-[color-mix(in_srgb,var(--primary)_14%,transparent)] px-2 text-[var(--primary)]">
                  Q
                </span>
              </h1>
              <p className="mt-1 text-xs font-semibold uppercase tracking-[0.18em] text-[var(--accent)]">
                Reserve. Arrive. Enjoy.
              </p>
            </div>
          </div>

          <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
            <nav className="grid grid-cols-4 gap-1 rounded-lg border border-[var(--line)] bg-[var(--surface-strong)] p-1">
              {navItems.map((item) => {
                const Icon = item.icon;
                const active = pathname === item.href;
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={`flex min-h-11 items-center justify-center gap-2 rounded-md px-3 text-sm font-medium transition ${
                      active
                        ? "bg-[var(--surface)] text-[var(--primary)] shadow-soft"
                        : "text-[var(--muted)] hover:bg-[var(--surface)] hover:text-[var(--text)]"
                    }`}
                  >
                    <Icon aria-hidden className="h-4 w-4" />
                    <span>{item.label}</span>
                  </Link>
                );
              })}
            </nav>
            <button
              type="button"
              aria-label="Toggle color theme"
              onClick={toggleTheme}
              disabled={!mounted}
              className="flex min-h-11 min-w-24 items-center justify-center gap-2 rounded-lg border border-[var(--line)] bg-[var(--surface)] px-3 text-sm font-semibold text-[var(--text)] shadow-soft transition hover:border-[var(--primary)] disabled:cursor-default disabled:opacity-70"
            >
              {mounted ? (
                <>
                  <ThemeIcon aria-hidden className="h-4 w-4 text-[var(--primary)]" />
                  <span>{theme === "dark" ? "Light" : "Dark"}</span>
                </>
              ) : (
                <span className="h-4 w-12 rounded bg-[var(--surface-strong)]" aria-hidden />
              )}
            </button>
          </div>
        </div>
      </header>
      <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">{children}</div>
    </main>
  );
}
