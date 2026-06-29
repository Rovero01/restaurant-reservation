"use client";

import { useMemo, useState } from "react";
import { CheckCircle2, Clock3, ListFilter, Utensils, XCircle } from "lucide-react";
import { AppShell } from "@/components/app-shell";
import { useQueue } from "@/components/queue-provider";
import { Guest, GuestStatus } from "@/lib/queue-store";

type QueueFilter = "Active" | "Waiting" | "Dine In" | "Done" | "Cancelled" | "All";

const tableCapacity = 7;

const statusStyle: Record<GuestStatus, string> = {
  Waiting: "bg-[color-mix(in_srgb,var(--warning)_18%,transparent)] text-[var(--warning)]",
  "Dine In": "bg-[color-mix(in_srgb,var(--accent)_18%,transparent)] text-[var(--accent)]",
  Done: "bg-[color-mix(in_srgb,var(--primary)_14%,transparent)] text-[var(--primary)]",
  Cancelled: "bg-[color-mix(in_srgb,var(--danger)_16%,transparent)] text-[var(--danger)]"
};

export default function AdminPage() {
  const { guests, updateStatus } = useQueue();
  const [filter, setFilter] = useState<QueueFilter>("Active");

  const counts = useMemo(
    () => ({
      active: guests.filter((guest) => guest.status === "Waiting" || guest.status === "Dine In").length,
      waiting: guests.filter((guest) => guest.status === "Waiting").length,
      dineIn: guests.filter((guest) => guest.status === "Dine In").length,
      done: guests.filter((guest) => guest.status === "Done").length,
      cancelled: guests.filter((guest) => guest.status === "Cancelled").length,
      all: guests.length
    }),
    [guests]
  );

  const filteredGuests = guests.filter((guest) => {
    if (filter === "All") return true;
    if (filter === "Active") return guest.status === "Waiting" || guest.status === "Dine In";
    return guest.status === filter;
  });

  const filters: { label: QueueFilter; count: number }[] = [
    { label: "Active", count: counts.active },
    { label: "Waiting", count: counts.waiting },
    { label: "Dine In", count: counts.dineIn },
    { label: "Done", count: counts.done },
    { label: "Cancelled", count: counts.cancelled },
    { label: "All", count: counts.all }
  ];

  return (
    <AppShell>
      <div className="mb-5 flex flex-col justify-between gap-3 sm:flex-row sm:items-end">
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[var(--accent)]">Admin</p>
          <h2 className="mt-1 text-2xl font-semibold text-[var(--text)]">Today Queue Management</h2>
          <p className="mt-1 text-sm text-[var(--muted)]">Track today&apos;s waiting, dine in, done, and cancelled reservations.</p>
        </div>
        <div className="grid grid-cols-2 gap-2 sm:grid-cols-3">
          <SummaryPill label="Tables" value={`${counts.dineIn}/${tableCapacity}`} danger={counts.dineIn >= tableCapacity} />
          <SummaryPill label="Waiting" value={String(counts.waiting)} />
          <SummaryPill label="Done" value={String(counts.done)} />
        </div>
      </div>

      <section className="rounded-lg border border-[var(--line)] bg-[var(--surface)] shadow-soft">
        <div className="border-b border-[var(--line)] p-4">
          <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
            <div className="flex items-center gap-2 text-sm font-semibold text-[var(--text)]">
              <ListFilter aria-hidden className="h-4 w-4 text-[var(--primary)]" />
              Today&apos;s queue
            </div>
            <div className="grid grid-cols-2 gap-2 sm:grid-cols-3 lg:flex">
              {filters.map((item) => {
                const active = filter === item.label;
                return (
                  <button
                    key={item.label}
                    type="button"
                    onClick={() => setFilter(item.label)}
                    className={`min-h-10 rounded-md border px-3 text-sm font-semibold transition ${
                      active
                        ? "border-[var(--primary)] bg-[color-mix(in_srgb,var(--primary)_14%,transparent)] text-[var(--primary)]"
                        : "border-[var(--line)] bg-[var(--surface-strong)] text-[var(--muted)] hover:text-[var(--text)]"
                    }`}
                  >
                    {item.label} ({item.count})
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        <div className="max-h-[68vh] overflow-y-auto p-4">
          <div className="grid gap-4">
            {filteredGuests.map((guest) => (
              <QueueCard key={guest.id} guest={guest} updateStatus={updateStatus} />
            ))}
            {!filteredGuests.length && (
              <div className="rounded-lg border border-[var(--line)] bg-[var(--surface-strong)] p-6 text-center text-sm text-[var(--muted)]">
                No reservations match this filter.
              </div>
            )}
          </div>
        </div>
      </section>
    </AppShell>
  );
}

function QueueCard({
  guest,
  updateStatus
}: {
  guest: Guest;
  updateStatus: (id: string, status: GuestStatus) => void;
}) {
  return (
    <section className="rounded-lg border border-[var(--line)] bg-[var(--surface-strong)] p-4">
      <div className="grid gap-4 xl:grid-cols-[1fr_auto] xl:items-center">
        <div className="min-w-0">
          <div className="flex flex-wrap items-center gap-2">
            <span className="rounded-md bg-[var(--surface)] px-2 py-1 text-xs font-bold text-[var(--primary)]">No. {guest.queueNumber}</span>
            <h3 className="text-lg font-semibold text-[var(--text)]">{guest.name}</h3>
            <span className="rounded-full bg-[var(--surface)] px-2 py-1 text-xs font-semibold text-[var(--muted)]">{guest.id}</span>
            <span className={`rounded-full px-2 py-1 text-xs font-semibold ${statusStyle[guest.status]}`}>
              {guest.status}
            </span>
          </div>
          <p className="mt-1 text-sm text-[var(--muted)]">
            {guest.partySize} guests - {guest.seating} - Joined {guest.joinedAt} - {guest.status === "Waiting" ? `ETA ${guest.quotedMinutes} min` : guest.status}
          </p>
          {guest.notes && <p className="mt-2 text-sm text-[var(--text)]">{guest.notes}</p>}
        </div>

        <div className="grid gap-2 sm:grid-cols-3">
          <ActionButton
            label="Dine In"
            icon={Utensils}
            disabled={guest.status === "Dine In" || guest.status === "Done" || guest.status === "Cancelled"}
            onClick={() => updateStatus(guest.id, "Dine In")}
            tone="accent"
          />
          <ActionButton
            label="Done"
            icon={CheckCircle2}
            disabled={guest.status === "Done" || guest.status === "Cancelled"}
            onClick={() => updateStatus(guest.id, "Done")}
            tone="primary"
          />
          <ActionButton
            label="Cancel"
            icon={XCircle}
            disabled={guest.status === "Done" || guest.status === "Cancelled"}
            onClick={() => updateStatus(guest.id, "Cancelled")}
            tone="danger"
          />
        </div>
      </div>
    </section>
  );
}

function SummaryPill({ label, value, danger = false }: { label: string; value: string; danger?: boolean }) {
  return (
    <div className="rounded-lg border border-[var(--line)] bg-[var(--surface)] px-4 py-3 shadow-soft">
      <p className="text-xs font-semibold uppercase tracking-[0.14em] text-[var(--muted)]">{label}</p>
      <p className={`mt-1 text-xl font-semibold ${danger ? "text-[var(--danger)]" : "text-[var(--primary)]"}`}>{value}</p>
    </div>
  );
}

function ActionButton({
  label,
  icon: Icon,
  disabled,
  onClick,
  tone
}: {
  label: string;
  icon: typeof Utensils;
  disabled: boolean;
  onClick: () => void;
  tone: "accent" | "primary" | "danger";
}) {
  const colors = {
    accent: "bg-[color-mix(in_srgb,var(--accent)_14%,transparent)] text-[var(--accent)] hover:bg-[color-mix(in_srgb,var(--accent)_20%,transparent)]",
    primary: "bg-[color-mix(in_srgb,var(--primary)_14%,transparent)] text-[var(--primary)] hover:bg-[color-mix(in_srgb,var(--primary)_20%,transparent)]",
    danger: "bg-[color-mix(in_srgb,var(--danger)_12%,transparent)] text-[var(--danger)] hover:bg-[color-mix(in_srgb,var(--danger)_18%,transparent)]"
  };

  return (
    <button
      type="button"
      disabled={disabled}
      onClick={onClick}
      className={`flex min-h-11 items-center justify-center gap-2 rounded-md px-3 text-sm font-semibold transition disabled:cursor-not-allowed disabled:opacity-45 ${colors[tone]}`}
    >
      <Icon aria-hidden className="h-4 w-4" />
      {label}
    </button>
  );
}


