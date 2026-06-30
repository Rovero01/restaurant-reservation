"use client";

import { CheckCircle2, Clock3, UsersRound } from "lucide-react";
import { Guest } from "@/lib/queue-store";

const statusStyle = {
  Waiting: "bg-[color-mix(in_srgb,var(--warning)_18%,transparent)] text-[var(--warning)]",
  "Dine In": "bg-[color-mix(in_srgb,var(--accent)_18%,transparent)] text-[var(--accent)]",
  Done: "bg-[color-mix(in_srgb,var(--primary)_14%,transparent)] text-[var(--primary)]",
  Cancelled: "bg-[color-mix(in_srgb,var(--danger)_16%,transparent)] text-[var(--danger)]"
};

export function QueueList({
  guests,
  compact = false
}: {
  guests: Guest[];
  compact?: boolean;
}) {
  return (
    <div className="overflow-hidden rounded-lg border border-[var(--line)] bg-[var(--surface)] shadow-soft overflow-y-auto">
      <div className="flex items-center justify-between border-b border-[var(--line)] px-4 py-3">
        <h2 className="text-base font-semibold text-[var(--text)]">Live Queue</h2>
        <span className="text-sm text-[var(--muted)]">{guests.length} reservations</span>
      </div>
      <div className="divide-y divide-[var(--line)] max-h-[70vh]">
        {guests.map((guest, index) => (
          <article key={guest.id} className="grid gap-3 p-4 transition hover:bg-[var(--surface-strong)] md:grid-cols-[1.1fr_0.7fr_0.7fr_0.8fr] md:items-center">
            <div className="min-w-0">
              <div className="flex flex-wrap items-center gap-2">
                <span className="rounded-md bg-[var(--surface-strong)] px-2 py-1 text-xs font-bold text-[var(--primary)]">No. {guest.queueNumber}</span>
                <p className="font-semibold text-[var(--text)]">{guest.name}</p>
                <span className={`rounded-full px-2 py-1 text-xs font-semibold ${statusStyle[guest.status]}`}>
                  {guest.status}
                </span>
              </div>
              <p className="mt-1 truncate text-sm text-[var(--muted)]">{guest.id} - {guest.phone}</p>
            </div>
            <div className="flex items-center gap-2 text-sm text-[var(--muted)]">
              <UsersRound aria-hidden className="h-4 w-4 text-[var(--accent)]" />
              {guest.partySize} guests, {guest.seating}
            </div>
            <div className="flex items-center gap-2 text-sm text-[var(--muted)]">
              <Clock3 aria-hidden className="h-4 w-4 text-[var(--accent)]" />
              {guest.status === "Waiting" ? `ETA ${guest.quotedMinutes} min` : guest.status}
            </div>
            {!compact && (
              <div className="flex items-center gap-2 text-sm text-[var(--muted)]">
                <CheckCircle2 aria-hidden className="h-4 w-4 text-[var(--accent)]" />
                Joined {guest.joinedAt}
              </div>
            )}
          </article>
        ))}
      </div>
    </div>
  );
}


