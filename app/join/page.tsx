"use client";

import { FormEvent, useMemo, useState } from "react";
import Link from "next/link";
import { ArrowLeft, Building2, CheckCircle2 } from "lucide-react";

type JoinStatus = "idle" | "loading" | "success" | "error";

export default function JoinPage() {
  const [companyName, setCompanyName] = useState("");
  const [slug, setSlug] = useState("");
  const [address, setAddress] = useState("");
  const [companyPhone, setCompanyPhone] = useState("");
  const [ownerName, setOwnerName] = useState("");
  const [ownerEmail, setOwnerEmail] = useState("");
  const [status, setStatus] = useState<JoinStatus>("idle");
  const [message, setMessage] = useState("");

  const suggestedSlug = useMemo(
    () =>
      companyName
        .toLowerCase()
        .trim()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/^-|-$/g, ""),
    [companyName]
  );

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus("loading");
    setMessage("");

    const response = await fetch("/api/join", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        companyName,
        slug: slug || suggestedSlug,
        address: address || undefined,
        companyPhone: companyPhone || undefined,
        ownerName,
        ownerEmail
      })
    });

    if (response.ok) {
      setStatus("success");
      setMessage("Company created. Owner admin is ready.");
      return;
    }

    const error = await response.json().catch(() => null);
    setStatus("error");
    setMessage(error?.message ?? "Failed to create company.");
  }

  return (
    <main className="min-h-screen px-4 py-6 text-[var(--text)] sm:px-6 lg:px-8">
      <div className="mx-auto max-w-4xl">
        <Link href="/" className="inline-flex min-h-11 items-center gap-2 rounded-lg border border-[var(--line)] bg-[var(--surface)] px-4 text-sm font-semibold text-[var(--text)] shadow-soft">
          <ArrowLeft aria-hidden className="h-4 w-4" />
          Back to landing
        </Link>

        <section className="mt-6 grid gap-6 lg:grid-cols-[0.8fr_1.2fr]">
          <div className="rounded-lg border border-[var(--line)] bg-[var(--primary)] p-6 text-white shadow-glow">
            <Building2 aria-hidden className="h-8 w-8" />
            <h1 className="mt-6 text-4xl font-black">Join DineQ</h1>
            <p className="mt-4 text-sm leading-6 text-white/75">
              Create your restaurant company profile and first owner admin account. Later, this owner can invite staff and manage queue settings.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="rounded-lg border border-[var(--line)] bg-[var(--surface)] p-5 shadow-soft sm:p-6">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[var(--accent)]">Company</p>
              <h2 className="mt-1 text-2xl font-black text-[var(--text)]">Create company and owner</h2>
            </div>

            <div className="mt-5 grid gap-4">
              <Field label="Company name" value={companyName} onChange={setCompanyName} placeholder="DineQ Central AYCE" />
              <Field label="Company slug" value={slug} onChange={setSlug} placeholder={suggestedSlug || "dineq-central-ayce"} />
              <Field label="Address" value={address} onChange={setAddress} placeholder="Jl. Sudirman No. 18" optional />
              <Field label="Company phone" value={companyPhone} onChange={setCompanyPhone} placeholder="021-5550-1001" optional />
              <div className="grid gap-4 sm:grid-cols-2">
                <Field label="Owner name" value={ownerName} onChange={setOwnerName} placeholder="Ari Wibowo" />
                <Field label="Owner email" value={ownerEmail} onChange={setOwnerEmail} placeholder="owner@restaurant.com" type="email" />
              </div>
            </div>

            {message && (
              <div className={`mt-4 rounded-md p-3 text-sm font-semibold ${status === "success" ? "bg-[color-mix(in_srgb,var(--accent)_14%,transparent)] text-[var(--accent)]" : "bg-[color-mix(in_srgb,var(--danger)_14%,transparent)] text-[var(--danger)]"}`}>
                {message}
              </div>
            )}

            <button disabled={status === "loading"} className="mt-5 flex min-h-11 w-full items-center justify-center gap-2 rounded-md bg-[var(--primary)] px-4 font-semibold text-white shadow-glow disabled:cursor-not-allowed disabled:opacity-60">
              {status === "success" ? <CheckCircle2 aria-hidden className="h-4 w-4" /> : null}
              {status === "loading" ? "Creating..." : "Create company"}
            </button>
          </form>
        </section>
      </div>
    </main>
  );
}

function Field({
  label,
  value,
  onChange,
  placeholder,
  type = "text",
  optional = false
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  placeholder: string;
  type?: string;
  optional?: boolean;
}) {
  return (
    <label className="grid gap-2 text-sm font-semibold text-[var(--text)]">
      <span>
        {label} {optional && <span className="font-normal text-[var(--muted)]">(optional)</span>}
      </span>
      <input
        required={!optional}
        type={type}
        value={value}
        onChange={(event) => onChange(event.target.value)}
        placeholder={placeholder}
        className="min-h-11 rounded-md border border-[var(--line)] bg-[var(--surface-strong)] px-3 outline-none focus:border-[var(--primary)]"
      />
    </label>
  );
}
