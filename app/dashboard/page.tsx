"use client";

import { CheckCircle2, Clock3, Utensils, UsersRound } from "lucide-react";
import { AppShell } from "@/components/app-shell";
import { QueueList } from "@/components/queue-list";
import { StatCard } from "@/components/stat-card";
import { useQueue } from "@/components/queue-provider";

export default function DashboardPage() {
  const { guests } = useQueue();
  const waiting = guests.filter((guest) => guest.status === "Waiting");
  const dineIn = guests.filter((guest) => guest.status === "Dine In");
  const done = guests.filter((guest) => guest.status === "Done");
  const avgWait = waiting.length
    ? Math.round(waiting.reduce((total, guest) => total + guest.quotedMinutes, 0) / waiting.length)
    : 0;

  return (
    <AppShell>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard label="Waiting" value={String(waiting.length)} detail="Parties not seated yet" icon={UsersRound} />
        <StatCard label="Dine in" value={String(dineIn.length)} detail="Currently eating" icon={Utensils} />
        <StatCard label="Done" value={String(done.length)} detail="Finished reservations" icon={CheckCircle2} />
        <StatCard label="Average wait" value={`${avgWait}m`} detail="Waiting parties only" icon={Clock3} />
      </div>

      <section className="mt-6">
        <QueueList guests={guests} />
      </section>
    </AppShell>
  );
}
