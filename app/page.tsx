Below are drop‑in replacements/new files to make the site look elegant and convert better. Copy them into your repo exactly at the paths shown, commit, and redeploy.

---

## 1) `/components/LeadForm.tsx` (new)

```tsx
"use client";
import React, { useState } from "react";

function scoreLead({ email, interest, timeline, message }: { email: string; interest: string; timeline: string; message: string; }) {
  let s = 0;
  const t = (message || "").toLowerCase();
  if (!/(gmail|yahoo|outlook|hotmail)\./i.test(email)) s += 10; // work email
  if (/\$|usd|million|budget|po|rfp|pilot|poc/i.test(message)) s += 10;
  if (/aiops|observability|cloud|migration|gcc|sre|devops/i.test([interest, message].join(" "))) s += 10;
  if (/(now|1–3 months|1-3 months)/i.test(timeline)) s += 10;
  return s;
}

export default function LeadForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [company, setCompany] = useState("");
  const [interest, setInterest] = useState("AIOps & Predictive Monitoring");
  const [timeline, setTimeline] = useState("1–3 months");
  const [message, setMessage] = useState("");
  const [consent, setConsent] = useState(false);
  const [loading, setLoading] = useState(false);
  const [done, setDone] = useState<string | null>(null);
  // Honeypot
  const [website, setWebsite] = useState("");

  const validEmail = /.+@.+\..+/.test(email);
  const canSubmit = name && validEmail && consent && !loading;

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    if (!canSubmit) return;
    if (website) return; // bot
    setLoading(true);
    try {
      const score = scoreLead({ email, interest, timeline, message });
      const res = await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, company, interest, timeline, message, score, source: "lead-form" })
      });
      const data = await res.json();
      setDone(data?.ok ? "Thanks! We’ll email you and follow up shortly." : "Submitted. We’ll be in touch.");
      setName(""); setEmail(""); setCompany(""); setMessage("");
    } catch (e) {
      setDone("Thanks! We’ll be in touch shortly.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <form onSubmit={submit} className="space-y-3">
      <div className="grid gap-3 sm:grid-cols-2">
        <div>
          <label className="label">Full name</label>
          <input className="input" value={name} onChange={e=>setName(e.target.value)} required />
        </div>
        <div>
          <label className="label">Work email</label>
          <input className="input" type="email" value={email} onChange={e=>setEmail(e.target.value)} required />
        </div>
        <div>
          <label className="label">Company</label>
          <input className="input" value={company} onChange={e=>setCompany(e.target.value)} />
        </div>
        <div>
          <label className="label">Interest</label>
          <select className="input" value={interest} onChange={e=>setInterest(e.target.value)}>
            <option>AIOps & Predictive Monitoring</option>
            <option>Cloud Migration / Modernization</option>
            <option>Managed Services & SRE</option>
            <option>Global Capability Center (GCC)</option>
            <option>Other / Not sure</option>
          </select>
        </div>
        <div>
          <label className="label">Timeline</label>
          <select className="input" value={timeline} onChange={e=>setTimeline(e.target.value)}>
            <option>Now</option>
            <option>1–3 months</option>
            <option>3–6 months</option>
            <option>Exploring</option>
          </select>
        </div>
        <div className="sm:col-span-2">
          <label className="label">What problem are you trying to solve?</label>
          <textarea className="input" rows={3} value={message} onChange={e=>setMessage(e.target.value)} placeholder="e.g., Reduce MTTR by 30%, migrate 80 services to Azure, set up GCC in Hyderabad…" />
        </div>
      </div>

      {/* Honeypot */}
      <input className="hidden" autoComplete="off" value={website} onChange={e=>setWebsite(e.target.value)} name="website" tabIndex={-1} />

      <label className="text-xs text-slate-600 flex items-start gap-2">
        <input type="checkbox" checked={consent} onChange={e=>setConsent(e.target.checked)} className="mt-1" />
        I agree to be contacted and accept the <a className="underline" href="/privacy" target="_blank">Privacy Policy</a>.
      </label>

      <button disabled={!canSubmit} className={`btn-primary w-full ${!canSubmit ? "opacity-60 cursor-not-allowed" : ""}`}>
        {loading ? "Sending…" : "Get the bundle & talk to an expert"}
      </button>
      {done && <p className="text-sm text-green-700">{done}</p>}
    </form>
  );
}
```

---

## 2) `/app/page.tsx` (replace)

```tsx
"use client";
import LeadForm from "../components/LeadForm";

export default function Page() {
  const year = new Date().getFullYear();
  return (
    <div className="relative">
      {/* decorative gradient */}
      <div className="pointer-events-none absolute inset-0 -z-10 bg-gradient-to-br from-indigo-600/15 via-sky-400/10 to-emerald-400/15 blur-2xl" />

      <section className="container pt-14 pb-12">
        <div className="grid items-center gap-10 md:grid-cols-2">
          {/* Left copy */}
          <div className="space-y-6">
            <span className="badge">Free CIO resource bundle</span>
            <h1 className="title">
              Cut Run‑Costs. Scale Smart. <span className="text-slate-500">Ship Reliability.</span>
            </h1>
            <p className="muted max-w-xl">
              Practical playbooks, assessments, and case studies for CIOs in Telecom, High‑Tech, Retail/CPG, BFSI & Semiconductor.
              Built by <strong>Binary Information Systems</strong> (34 years in global IT services).
            </p>
            <div className="flex flex-wrap gap-3">
              <a href="https://calendly.com/binary-infosystems/30min" target="_blank" className="btn-primary">Book a 30‑min consultation</a>
              <a href="/resources.zip" className="btn-outline">Download all (ZIP)</a>
            </div>
            <div className="grid grid-cols-3 gap-3 pt-6 text-center text-xs text-slate-500 md:max-w-md">
              <div className="stat">20–40%<br/>Run‑cost reduction</div>
              <div className="stat">25–40%<br/>Less downtime</div>
              <div className="stat">30–50%<br/>Faster MTTR</div>
            </div>
          </div>

          {/* Right: form card */}
          <div className="card p-5 md:ml-auto">
            <h3 className="text-xl font-semibold">Get the bundle via email</h3>
            <p className="text-sm text-slate-600 mb-3">We’ll also share 2–3 quick wins for your environment.</p>
            <LeadForm />
          </div>
        </div>
      </section>

      {/* Logos / industries */}
      <section className="container pb-8">
        <p className="mb-4 text-center text-xs uppercase tracking-wide text-slate-500">Experienced across</p>
        <div className="grid grid-cols-2 gap-6 opacity-80 sm:grid-cols-3 md:grid-cols-6">
          {["Telecom","Media","High‑Tech","Semiconductor","Retail/CPG","BFSI"].map((t)=> (
            <div key={t} className="rounded-xl bg-white/60 py-3 text-center text-sm font-medium shadow-sm ring-1 ring-slate-200">{t}</div>
          ))}
        </div>
      </section>

      <footer className="container mt-10 pb-10 text-center text-sm text-slate-500">
        © {year} Binary Information Systems • IT Consulting & Outsourcing • Bay Area & Hyderabad
      </footer>
    </div>
  );
}
```

---

## 3) `/app/globals.css` (replace)

```css
@tailwind base;
@tailwind components;
@tailwind utilities;

:root { color-scheme: light; }
body { @apply bg-slate-50 text-slate-900 antialiased; }
.container { @apply mx-auto max-w-6xl px-6; }
.card { @apply rounded-2xl border border-slate-200 bg-white shadow-sm; }
.btn { @apply inline-flex items-center justify-center rounded-2xl px-4 py-2 text-sm font-medium transition; }
.btn-primary { @apply btn bg-slate-900 text-white hover:bg-slate-800 active:scale-[.99]; }
.btn-outline { @apply btn border border-slate-300 bg-white text-slate-900 hover:bg-slate-100; }
.input { @apply w-full rounded-xl border border-slate-300 bg-white px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-slate-400; }
.label { @apply mb-1 block text-xs font-medium text-slate-600; }
.badge { @apply inline-flex items-center gap-2 rounded-full bg-white/70 px-3 py-1 text-xs font-semibold text-slate-700 ring-1 ring-slate-200 shadow-sm; }
.title { @apply text-4xl font-bold leading-tight md:text-5xl; }
.muted { @apply text-slate-600; }
.stat { @apply rounded-xl bg-white/70 p-3 shadow-sm ring-1 ring-slate-200; }
```

---

## 4) Tailwind config (only if you don’t have these yet)

### `/tailwind.config.js`

```js
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./app/**/*.{js,ts,jsx,tsx}", "./components/**/*.{js,ts,jsx,tsx}"],
  theme: { extend: {} },
  plugins: [],
};
```

### `/postcss.config.js`

```js
module.exports = { plugins: { tailwindcss: {}, autoprefixer: {} } }
```

---

## 5) Notes

* The form posts to `/api/leads` you already have; set `RESEND_API_KEY` and `SALES_EMAIL` in Vercel to receive emails.
* The button stays disabled until **name + valid email + consent** are provided.
* Basic bot protection: hidden honeypot field (`website`).
* CTA copy and the stats are easily editable in `app/page.tsx`.
* Add your PDFs later to `public/resources/` and an optional `public/resources.zip` for the bundle button.

```
```
