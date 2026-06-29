"use client";

import { CalendarCheck, Clock3, Coffee, UsersRound } from "lucide-react";
import { AppShell } from "@/components/app-shell";
import { useQueue } from "@/components/queue-provider";

const retroStats = [
  { label: "Waiting", value: "3", detail: "Parties in line", icon: UsersRound },
  { label: "Estimate", value: "40m", detail: "Longest current wait", icon: Clock3 },
  { label: "Hold Time", value: "10m", detail: "After table is ready", icon: CalendarCheck }
];

export default function RetroPreviewPage() {
  const { guests } = useQueue();
  const waiting = guests.filter((guest) => guest.status === "Waiting");
  const maxWait = waiting.length ? Math.max(...waiting.map((guest) => guest.quotedMinutes)) : 0;

  return (
    <AppShell>
      <div className="overflow-hidden rounded-lg border-2 border-[#5a3520] bg-[#f6ead5] text-[#3b2417] shadow-[8px_8px_0_#5a3520]">
        <section className="border-b-2 border-[#5a3520] bg-[#7b3f25] px-5 py-5 text-[#fff7e6] sm:px-6">
          <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.22em] text-[#f4c26b]">Retro preview</p>
              <h2 className="mt-2 text-3xl font-black sm:text-4xl">Reservation Counter</h2>
              <p className="mt-3 max-w-2xl text-sm leading-6 text-[#ffe6ba]">
                A warmer all-you-can-eat waiting list style using diner-inspired brown, cream, mustard, and coral accents.
              </p>
            </div>
            <div className="flex w-fit items-center gap-2 rounded-md border-2 border-[#f4c26b] bg-[#3b2417] px-4 py-3 text-sm font-bold text-[#f4c26b]">
              <Coffee aria-hidden className="h-4 w-4" />
              AYCE Queue
            </div>
          </div>
        </section>

        <section className="grid gap-4 p-5 sm:grid-cols-3 sm:p-6">
          {retroStats.map((item, index) => {
            const Icon = item.icon;
            const value = item.label === "Waiting" ? String(waiting.length) : item.label === "Estimate" ? (maxWait ? `${maxWait}m` : "Now") : item.value;
            return (
              <div key={item.label} className="rounded-lg border-2 border-[#5a3520] bg-[#fff7e6] p-4 shadow-[4px_4px_0_#c86f46]">
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <p className="text-sm font-bold uppercase text-[#8b5a2b]">{item.label}</p>
                    <p className="mt-2 text-3xl font-black">{value}</p>
                    <p className="mt-1 text-sm text-[#76533a]">{item.detail}</p>
                  </div>
                  <div className="rounded-md bg-[#f4c26b] p-2 text-[#5a3520]">
                    <Icon aria-hidden className="h-5 w-5" />
                  </div>
                </div>
              </div>
            );
          })}
        </section>

        <section className="grid gap-5 border-t-2 border-[#5a3520] p-5 sm:p-6 lg:grid-cols-[0.8fr_1.2fr]">
          <div className="rounded-lg border-2 border-[#5a3520] bg-[#fff7e6] p-5">
            <h3 className="text-xl font-black">Guest Snapshot</h3>
            <p className="mt-2 text-sm leading-6 text-[#76533a]">
              The customer view stays focused on reservation confidence: estimated wait, parties ahead, and table hold time.
            </p>
            <button className="mt-5 min-h-11 rounded-md border-2 border-[#5a3520] bg-[#d9573f] px-4 text-sm font-black text-[#fff7e6] shadow-[3px_3px_0_#5a3520]">
              Join Waiting List
            </button>
          </div>

          <div className="rounded-lg border-2 border-[#5a3520] bg-[#fff7e6] p-5">
            <div className="flex items-center justify-between gap-3">
              <h3 className="text-xl font-black">Anonymous Queue</h3>
              <span className="rounded-full bg-[#f4c26b] px-3 py-1 text-xs font-black text-[#5a3520]">
                {waiting.length} waiting
              </span>
            </div>
            <div className="mt-4 grid gap-3">
              {waiting.map((guest, index) => (
                <div key={guest.id} className="flex items-center justify-between rounded-md border-2 border-[#d8b98c] bg-[#f6ead5] px-3 py-3 text-sm">
                  <span className="font-black">Party #{index + 1}</span>
                  <span className="font-bold text-[#76533a]">{guest.partySize} guests - ETA {guest.quotedMinutes}m</span>
                </div>
              ))}
            </div>
          </div>
        </section>
      </div>
    </AppShell>
  );
}
