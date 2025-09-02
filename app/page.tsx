
"use client";
import React, { useState } from "react";
import Chatbot from "../components/Chatbot";

export default function Page() {
  const year = new Date().getFullYear();

  return (
    <div>
      <section className="container pt-14 pb-10">
        <div className="grid items-center gap-8 md:grid-cols-2">
          <div className="space-y-6">
            <div className="inline-flex items-center gap-2 rounded-full bg-slate-100 px-3 py-1 text-xs font-medium text-slate-600 shadow-sm">
              Free CIO resource bundle
            </div>
            <h1 className="text-4xl font-bold leading-tight md:text-5xl">
              Cut Run-Costs. Scale Smart. <span className="text-slate-500">Ship Reliability.</span>
            </h1>
            <p className="max-w-xl text-muted">
              Practical playbooks, assessments, and case studies for CIOs and IT leaders in Telecom, High-Tech, Retail/CPG, BFSI & Semiconductor.
              Built by <strong>Binary Information Systems</strong> (34 years in global IT services).
            </p>
            <div className="flex flex-wrap gap-3">
              <a href="https://calendly.com/binary-infosystems/30min" target="_blank" className="btn-primary">
                Book a 30‑min consultation
              </a>
              <a href="/resources.zip" className="btn-outline">
                Download all (ZIP)
              </a>
            </div>
            <div className="flex items-center gap-3 text-sm text-muted">
              No spam. Unsubscribe anytime.
            </div>
          </div>

          <div className="card p-5 md:ml-auto">
            <h3 className="text-xl font-semibold">Get the bundle via email</h3>
            <p className="text-sm text-muted mb-3">We’ll send the 5 PDFs + optional follow‑up checklist.</p>
            <LeadForm />
          </div>
        </div>
      </section>

      <section className="container pb-6">
        <p className="mb-4 text-center text-xs uppercase tracking-wide text-muted">Experienced across</p>
        <div className="grid grid-cols-2 gap-6 opacity-70 sm:grid-cols-3 md:grid-cols-6">
          {["Telecom","Media","High‑Tech","Semiconductor","Retail/CPG","BFSI"].map((t)=> (
            <div key={t} className="rounded-xl bg-slate-100 py-3 text-center text-sm font-medium">{t}</div>
          ))}
        </div>
      </section>

      <Resources />

      <footer className="container mt-12 pb-10 text-center text-sm text-muted">
        © {year} Binary Information Systems • IT Consulting & Outsourcing • Bay Area & Hyderabad
      </footer>

      <Chatbot />
    </div>
  );
}

function LeadForm() {
  const [name, setName] = useState(""); const [email, setEmail] = useState(""); const [company, setCompany] = useState(""); const [message, setMessage] = useState(""); const [ok, setOk] = useState(""); 
  async function submit(e) {
    e.preventDefault();
    const res = await fetch("/api/leads", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ name, email, company, message, source: "landing-form" }) });
    const data = await res.json();
    setOk(data?.ok ? "Thanks! We'll reach out shortly." : (data?.message || "Submitted."));
  }
  return (
    <form onSubmit={submit} className="space-y-3">
      <input className="input" placeholder="Full name" value={name} onChange={e=>setName(e.target.value)} required />
      <input className="input" type="email" placeholder="Work email" value={email} onChange={e=>setEmail(e.target.value)} required />
      <input className="input" placeholder="Company" value={company} onChange={e=>setCompany(e.target.value)} />
      <textarea className="input" placeholder="Anything specific you want help with? (optional)" value={message} onChange={e=>setMessage(e.target.value)} rows={3} />
      <button type="submit" className="btn-primary w-full">Email me the bundle</button>
      {ok && <p className="text-sm text-green-700">{ok}</p>}
    </form>
  );
}

function Resources() {
  const items = [
    { title: "CIO Cost Optimization Playbook", file: "CIO_Cost_Optimization_Playbook.pdf", blurb: "10 ways to cut IT ops cost by 20% in 12 months." },
    { title: "AI Readiness Assessment for IT Ops", file: "AI_Readiness_Assessment_for_IT_Operations.pdf", blurb: "1-page maturity checklist for AIOps adoption." },
    { title: "Global Delivery Models Demystified", file: "Global_Delivery_Models_Demystified.pdf", blurb: "GCCs, nearshore and hybrid models—pros, cons, ROI." },
    { title: "Predictive Monitoring & AIOps Whitepaper", file: "Predictive_Monitoring_and_AIOps_Whitepaper.pdf", blurb: "From reactive to proactive ITSM with real ROI levers." },
    { title: "IT Transformation Case Study Pack", file: "IT_Transformation_Case_Study_Pack.pdf", blurb: "3 real stories—$50M+ savings, 30% infra cost down, 99.99% uptime." },
  ];
  return (
    <section className="container py-8">
      <h2 className="mb-6 text-2xl font-semibold">What you’ll get</h2>
      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {items.map((r)=> (
          <div key={r.title} className="card p-5 flex flex-col">
            <h3 className="text-lg font-semibold mb-1">{r.title}</h3>
            <p className="text-sm text-muted mb-4">{r.blurb}</p>
            <a className="btn btn-outline mt-auto" href={`/resources/${r.file}`} download>Download PDF</a>
          </div>
        ))}
      </div>
    </section>
  );
}
