"use client";

import type { ChangeEventHandler, FocusEventHandler } from "react";
import { Formik } from "formik";
import { CalendarCheck, Clock3, ShieldCheck, UsersRound } from "lucide-react";
import { AppShell } from "@/components/app-shell";
import { useQueue } from "@/components/queue-provider";
import { reservationSchema } from "@/lib/queue-store";

const initialValues = {
  name: "",
  phone: "",
  partySize: 2,
  seating: "Any" as const,
  notes: ""
};

export default function UserPage() {
  const { guests, addGuest } = useQueue();
  const waiting = guests.filter((guest) => guest.status === "Waiting");
  const currentEstimate = waiting.length
    ? Math.max(...waiting.map((guest) => guest.quotedMinutes))
    : 0;

  return (
    <AppShell>
      <div className="grid gap-6 lg:grid-cols-[0.9fr_1.1fr]">
        <section className="rounded-lg border border-[var(--line)] bg-[var(--surface)] p-5 shadow-soft sm:p-6">
          <div className="mb-5 flex items-center gap-3">
            <div className="rounded-md bg-[color-mix(in_srgb,var(--primary)_12%,transparent)] p-2 text-[var(--primary)]">
              <CalendarCheck aria-hidden className="h-5 w-5" />
            </div>
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[var(--accent)]">Guest</p>
              <h2 className="text-xl font-semibold text-[var(--text)]">Online Reservation</h2>
              <p className="text-sm text-[var(--muted)]">Join the waitlist before coming to the restaurant.</p>
            </div>
          </div>

          <Formik
            initialValues={initialValues}
            validate={(values) => {
              const result = reservationSchema.safeParse(values);
              if (result.success) return {};
              return result.error.issues.reduce<Record<string, string>>((errors, issue) => {
                const key = issue.path[0];
                if (key) errors[String(key)] = issue.message;
                return errors;
              }, {});
            }}
            onSubmit={(values, helpers) => {
              addGuest(values);
              helpers.resetForm();
            }}
          >
            {({ values, errors, touched, handleChange, handleBlur, handleSubmit, isSubmitting }) => (
              <form onSubmit={handleSubmit} className="grid gap-4">
                <Field label="Name" name="name" value={values.name} error={touched.name ? errors.name : undefined} onChange={handleChange} onBlur={handleBlur} />
                <Field label="Phone" name="phone" value={values.phone} error={touched.phone ? errors.phone : undefined} onChange={handleChange} onBlur={handleBlur} />
                <div className="grid gap-4 sm:grid-cols-2">
                  <Field label="Party Size" name="partySize" type="number" value={values.partySize} error={touched.partySize ? errors.partySize : undefined} onChange={handleChange} onBlur={handleBlur} />
                  <label className="grid gap-2 text-sm font-medium text-[var(--text)]">
                    Seating
                    <select name="seating" value={values.seating} onChange={handleChange} onBlur={handleBlur} className="min-h-11 rounded-md border border-[var(--line)] bg-[var(--surface-strong)] px-3 text-[var(--text)] outline-none focus:border-[var(--primary)]">
                      <option>Any</option>
                      <option>Indoor</option>
                      <option>Outdoor</option>
                    </select>
                  </label>
                </div>
                <label className="grid gap-2 text-sm font-medium text-[var(--text)]">
                  Notes
                  <textarea name="notes" value={values.notes} onChange={handleChange} onBlur={handleBlur} rows={3} className="rounded-md border border-[var(--line)] bg-[var(--surface-strong)] px-3 py-2 text-[var(--text)] outline-none focus:border-[var(--primary)]" />
                </label>
                <button disabled={isSubmitting} className="min-h-11 rounded-md bg-[var(--primary)] px-4 font-semibold text-white shadow-glow transition hover:bg-[var(--primary-strong)] disabled:cursor-not-allowed disabled:opacity-60">
                  Join Waiting List
                </button>
              </form>
            )}
          </Formik>
        </section>

        <section className="rounded-lg border border-[var(--line)] bg-[var(--surface)] p-5 shadow-soft sm:p-6">
          <div className="flex items-start justify-between gap-4">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[var(--accent)]">Wait Snapshot</p>
              <h2 className="mt-1 text-xl font-semibold text-[var(--text)]">Current estimate</h2>
              <p className="mt-2 text-sm leading-6 text-[var(--muted)]">
                Guest names are hidden here. You only see the public queue condition and timing estimate.
              </p>
            </div>
            <div className="rounded-md bg-[color-mix(in_srgb,var(--accent)_14%,transparent)] p-2">
              <ShieldCheck aria-hidden className="h-5 w-5 text-[var(--accent)]" />
            </div>
          </div>

          <div className="mt-5 grid gap-3 sm:grid-cols-3">
            <div className="rounded-lg bg-[var(--surface-strong)] p-4">
              <Clock3 aria-hidden className="h-5 w-5 text-[var(--primary)]" />
              <p className="mt-3 text-sm text-[var(--muted)]">Estimated wait</p>
              <p className="mt-1 text-2xl font-semibold text-[var(--text)]">
                {currentEstimate ? `${currentEstimate}m` : "Now"}
              </p>
            </div>
            <div className="rounded-lg bg-[var(--surface-strong)] p-4">
              <UsersRound aria-hidden className="h-5 w-5 text-[var(--primary)]" />
              <p className="mt-3 text-sm text-[var(--muted)]">Parties ahead</p>
              <p className="mt-1 text-2xl font-semibold text-[var(--text)]">{waiting.length}</p>
            </div>
            <div className="rounded-lg bg-[var(--surface-strong)] p-4">
              <CalendarCheck aria-hidden className="h-5 w-5 text-[var(--primary)]" />
              <p className="mt-3 text-sm text-[var(--muted)]">Table hold</p>
              <p className="mt-1 text-2xl font-semibold text-[var(--text)]">10m</p>
            </div>
          </div>

          <div className="mt-5 rounded-lg border border-[var(--line)] bg-[var(--surface-strong)] p-4">
            <div className="flex items-center justify-between gap-3 text-sm font-semibold text-[var(--text)]">
              <span>Public queue</span>
              <span>{waiting.length} waiting</span>
            </div>
            <div className="mt-4 grid gap-2">
              {waiting.length ? (
                waiting.map((guest, index) => (
                  <div key={guest.id} className="flex items-center justify-between rounded-md bg-[var(--surface)] px-3 py-3 text-sm">
                    <span className="font-medium text-[var(--text)]">Queue No. {guest.queueNumber}</span>
                    <span className="text-[var(--muted)]">{guest.partySize} guests - ETA {guest.quotedMinutes}m</span>
                  </div>
                ))
              ) : (
                <p className="rounded-md bg-[var(--surface)] px-3 py-3 text-sm text-[var(--muted)]">No waiting parties right now.</p>
              )}
            </div>
          </div>
        </section>
      </div>
    </AppShell>
  );
}

function Field({
  label,
  name,
  value,
  error,
  type = "text",
  onChange,
  onBlur
}: {
  label: string;
  name: string;
  value: string | number;
  error?: string;
  type?: string;
  onChange: ChangeEventHandler<HTMLInputElement>;
  onBlur: FocusEventHandler<HTMLInputElement>;
}) {
  return (
    <label className="grid gap-2 text-sm font-medium text-[var(--text)]">
      {label}
      <input
        name={name}
        type={type}
        value={value}
        onChange={onChange}
        onBlur={onBlur}
        className="min-h-11 rounded-md border border-[var(--line)] bg-[var(--surface-strong)] px-3 text-[var(--text)] outline-none focus:border-[var(--primary)]"
      />
      {error && <span className="text-xs font-semibold text-[var(--danger)]">{error}</span>}
    </label>
  );
}

