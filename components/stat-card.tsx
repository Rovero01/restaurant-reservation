import { LucideIcon } from "lucide-react";

export function StatCard({
  label,
  value,
  detail,
  icon: Icon
}: {
  label: string;
  value: string;
  detail: string;
  icon: LucideIcon;
}) {
  return (
    <section className="rounded-lg border border-[var(--line)] bg-[var(--surface)] p-4 shadow-soft">
      <div className="flex items-start justify-between gap-4">
        <div className="min-w-0">
          <p className="text-sm font-medium text-[var(--muted)]">{label}</p>
          <p className="mt-2 text-3xl font-semibold text-[var(--text)]">{value}</p>
          <p className="mt-1 text-sm text-[var(--muted)]">{detail}</p>
        </div>
        <div className="rounded-md bg-[color-mix(in_srgb,var(--primary)_12%,transparent)] p-2 text-[var(--primary)]">
          <Icon aria-hidden className="h-5 w-5" />
        </div>
      </div>
    </section>
  );
}
