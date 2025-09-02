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
              Cut Run-Costs. Scale Smart. <span className="text-slate-500">Ship Reliability.</span>
            </h1>
            <p className="muted max-w-xl">
              Practical playbooks, assessments, and case studies for CIOs in Telecom, High-Tech, Retail/CPG, BFSI & Semiconductor.
              Built by <strong>Binary Information Systems</strong> (34 years in global IT services).
            </p>
            <div className="flex flex-wrap gap-3">
              <a href="https://calendly.com/binary-infosystems/30min" target="_blank" className="btn-primary">
                Book a 30-min consultation
              </a>
              <a href="/resources.zip" className="btn-outline">Download all (ZIP)</a>
            </div>
            <div className="grid grid-cols-3 gap-3 pt-6 text-center text-xs text-slate-500 md:max-w-md">
              <div className="stat">20–40%<br/>Run-cost reduction</div>
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
          {["Telecom","Media","High-Tech","Semiconductor","Retail/CPG","BFSI"].map((t)=> (
            <div key={t} className="rounded-xl bg-white/60 py-3 text-center text-sm font-medium shadow-sm ring-1 ring-slate-200">
              {t}
            </div>
          ))}
        </div>
      </section>

      <footer className="container mt-10 pb-10 text-center text-sm text-slate-500">
        © {year} Binary Information Systems • IT Consulting & Outsourcing • Bay Area & Hyderabad
      </footer>
    </div>
  );
}
