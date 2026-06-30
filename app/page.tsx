"use client";

import { FormEvent, useState } from "react";
import Link from "next/link";
import { ArrowRight, Building2, CalendarCheck, Clock3, LogIn, ShieldCheck, UsersRound, X } from "lucide-react";

const partners = ["Saffron Table", "Garden Grill AYCE", "Kintan Corner", "Seoul Pan House"];

const steps = [
  {
    title: "Reserve online",
    body: "Guests enter their party size, seating preference, and contact number before arriving.",
    icon: CalendarCheck
  },
  {
    title: "Track the queue",
    body: "DineQ gives every guest a queue number and shows an estimated wait without exposing private names.",
    icon: Clock3
  },
  {
    title: "Seat with confidence",
    body: "Admins move guests from waiting to dine in, done, or cancelled from one daily queue screen.",
    icon: ShieldCheck
  }
];

export default function LandingPage() {
  const [loginOpen, setLoginOpen] = useState(false);

  return (
    <main className="min-h-screen text-[var(--text)]">
      <header className="border-b border-[var(--line)] bg-[color-mix(in_srgb,var(--surface)_86%,transparent)] backdrop-blur-xl">
        <div className="mx-auto flex max-w-7xl flex-col gap-4 px-4 py-4 sm:px-6 lg:flex-row lg:items-center lg:justify-between lg:px-8">
          <Link href="/" className="flex min-w-0 items-center gap-3">
            <div className="relative grid h-12 w-12 shrink-0 place-items-center overflow-hidden rounded-lg bg-[var(--primary)] text-lg font-black text-white shadow-glow">
              <span className="absolute inset-x-2 top-2 h-1 rounded-full bg-white/30" />
              DQ
            </div>
            <div>
              <h1 className="flex items-baseline gap-2 text-3xl font-black sm:text-4xl">
                <span>Dine</span>
                <span className="rounded-md bg-[color-mix(in_srgb,var(--primary)_14%,transparent)] px-2 text-[var(--primary)]">Q</span>
              </h1>
              <p className="mt-1 text-xs font-semibold uppercase tracking-[0.18em] text-[var(--accent)]">Reserve. Arrive. Enjoy.</p>
            </div>
          </Link>

          <nav className="flex flex-col gap-2 sm:flex-row sm:items-center">
            <Link href="/dashboard" className="min-h-11 rounded-lg px-4 py-3 text-center text-sm font-semibold text-[var(--muted)] hover:text-[var(--text)]">Dashboard</Link>
            <button type="button" onClick={() => setLoginOpen(true)} className="flex min-h-11 items-center justify-center gap-2 rounded-lg border border-[var(--line)] bg-[var(--surface)] px-4 text-sm font-semibold text-[var(--text)] shadow-soft">
              <LogIn aria-hidden className="h-4 w-4 text-[var(--primary)]" />
              Login
            </button>
            <Link href="/join" className="flex min-h-11 items-center justify-center gap-2 rounded-lg bg-[var(--primary)] px-4 text-sm font-semibold text-white shadow-glow">
              Join DineQ
              <ArrowRight aria-hidden className="h-4 w-4" />
            </Link>
          </nav>
        </div>
      </header>

      <section className="mx-auto grid max-w-7xl gap-6 px-4 py-10 sm:px-6 lg:grid-cols-[1.1fr_0.9fr] lg:px-8 lg:py-16">
        <div className="rounded-lg border border-[var(--line)] bg-[var(--surface)] p-6 shadow-soft sm:p-8">
          <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[var(--accent)]">Restaurant waitlist system</p>
          <h2 className="mt-4 max-w-3xl text-4xl font-black leading-tight text-[var(--text)] sm:text-6xl">
            Turn waiting time into a cleaner guest experience.
          </h2>
          <p className="mt-5 max-w-2xl text-base leading-7 text-[var(--muted)]">
            DineQ helps restaurants collect online reservations, issue queue numbers, estimate arrival time, and manage daily dine-in flow from one simple admin screen.
          </p>
          <div className="mt-6 flex flex-col gap-3 sm:flex-row">
            <Link href="/join" className="flex min-h-12 items-center justify-center gap-2 rounded-lg bg-[var(--primary)] px-5 font-semibold text-white shadow-glow">
              Create company
              <ArrowRight aria-hidden className="h-4 w-4" />
            </Link>
            <button type="button" onClick={() => setLoginOpen(true)} className="min-h-12 rounded-lg border border-[var(--line)] bg-[var(--surface-strong)] px-5 font-semibold text-[var(--text)]">
              Login as user
            </button>
          </div>
        </div>

        <div className="grid gap-4">
          <div className="rounded-lg border border-[var(--line)] bg-[var(--surface)] p-5 shadow-soft">
            <div className="flex items-center justify-between gap-4">
              <div>
                <p className="text-sm text-[var(--muted)]">Current queue</p>
                <p className="mt-1 text-4xl font-black text-[var(--text)]">No. 18</p>
              </div>
              <div className="rounded-lg bg-[color-mix(in_srgb,var(--accent)_14%,transparent)] p-3 text-[var(--accent)]">
                <UsersRound aria-hidden className="h-7 w-7" />
              </div>
            </div>
            <div className="mt-5 grid gap-3 sm:grid-cols-3">
              <MiniStat label="Waiting" value="5" />
              <MiniStat label="Dine in" value="7" />
              <MiniStat label="Avg wait" value="38m" />
            </div>
          </div>
          <div className="rounded-lg border border-[var(--line)] bg-[var(--primary)] p-5 text-white shadow-glow">
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-white/70">Why it works</p>
            <p className="mt-3 text-2xl font-black">Guests know their queue. Staff know the next action.</p>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 pb-10 sm:px-6 lg:px-8">
        <div className="grid gap-4 md:grid-cols-3">
          {steps.map((step) => {
            const Icon = step.icon;
            return (
              <article key={step.title} className="rounded-lg border border-[var(--line)] bg-[var(--surface)] p-5 shadow-soft">
                <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-md bg-[color-mix(in_srgb,var(--primary)_12%,transparent)] text-[var(--primary)]">
                  <Icon aria-hidden className="h-5 w-5" />
                </div>
                <h3 className="text-lg font-bold text-[var(--text)]">{step.title}</h3>
                <p className="mt-2 text-sm leading-6 text-[var(--muted)]">{step.body}</p>
              </article>
            );
          })}
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 pb-12 sm:px-6 lg:px-8">
        <div className="rounded-lg border border-[var(--line)] bg-[var(--surface)] p-5 shadow-soft sm:p-6">
          <div className="flex items-center gap-3">
            <Building2 aria-hidden className="h-5 w-5 text-[var(--primary)]" />
            <h3 className="text-lg font-bold text-[var(--text)]">Restaurants already joining DineQ</h3>
          </div>
          <div className="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {partners.map((partner) => (
              <div key={partner} className="rounded-md border border-[var(--line)] bg-[var(--surface-strong)] px-4 py-3 text-sm font-semibold text-[var(--text)]">
                {partner}
              </div>
            ))}
          </div>
        </div>
      </section>

      {loginOpen && <LoginModal onClose={() => setLoginOpen(false)} />}
    </main>
  );
}

function MiniStat({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-md bg-[var(--surface-strong)] p-3">
      <p className="text-xs font-semibold uppercase tracking-[0.14em] text-[var(--muted)]">{label}</p>
      <p className="mt-1 text-2xl font-black text-[var(--text)]">{value}</p>
    </div>
  );
}

function LoginModal({ onClose }: { onClose: () => void }) {
  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    onClose();
  }

  return (
    <div className="fixed inset-0 z-50 grid place-items-center bg-black/45 px-4 backdrop-blur-sm">
      <section className="w-full max-w-md rounded-lg border border-[var(--line)] bg-[var(--surface)] p-5 shadow-soft">
        <div className="flex items-center justify-between gap-4">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[var(--accent)]">Login</p>
            <h2 className="mt-1 text-2xl font-black text-[var(--text)]">Login as user</h2>
          </div>
          <button type="button" onClick={onClose} aria-label="Close login" className="grid h-10 w-10 place-items-center rounded-md bg-[var(--surface-strong)] text-[var(--muted)]">
            <X aria-hidden className="h-5 w-5" />
          </button>
        </div>
        <form onSubmit={handleSubmit} className="mt-5 grid gap-4">
          <label className="grid gap-2 text-sm font-semibold text-[var(--text)]">
            Phone or email
            <input className="min-h-11 rounded-md border border-[var(--line)] bg-[var(--surface-strong)] px-3 outline-none focus:border-[var(--primary)]" placeholder="0812..." />
          </label>
          <button className="min-h-11 rounded-md bg-[var(--primary)] px-4 font-semibold text-white shadow-glow">
            Continue
          </button>
        </form>
      </section>
    </div>
  );
}
