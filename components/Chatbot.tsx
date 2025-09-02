
"use client";
import React, { useRef, useState } from "react";

const FAQ = [
  { q: "What services do you offer?", a: "Cost optimization, AIOps & predictive monitoring, cloud migration, managed services, and GCC/nearshore setup." },
  { q: "Which industries do you specialize in?", a: "Telecom, Media, High‑Tech, Semiconductor, Retail/CPG, and BFSI." },
  { q: "How do we start?", a: "We begin with a 30‑minute discovery call and a quick assessment to identify 2–3 high‑ROI initiatives." },
  { q: "What engagement models are available?", a: "Fixed‑scope transformations, managed services, and hybrid teams with onshore/nearshore/offshore support." },
  { q: "Can you share ROI examples?", a: "Examples include 20–40% run‑cost reduction, 25–40% downtime reduction, and 30–50% faster MTTR." },
];

function scoreLead(text) {
  const signals = ["budget","timeline","deadline","RFP","POC","pilot","migration","MTTR","AIOps","SLA","India","GCC"];
  let score = 0; const lower = text.toLowerCase();
  for (const s of signals) if (lower.includes(s.toLowerCase())) score += 10;
  if (lower.includes("@")) score += 5;
  if (lower.includes("million") || lower.includes("$")) score += 10;
  return score;
}

export default function Chatbot() {
  const [open, setOpen] = useState(true);
  const [messages, setMessages] = useState([{ role: "bot", text: "Hi! I’m the Binary Info Systems assistant. Ask me about services, ROI, or delivery models. If you leave contact details, our team will follow up." }]);
  const [input, setInput] = useState(""); const inputRef = useRef(null);

  function reply(userText) {
    const match = FAQ.find(({ q }) => userText.toLowerCase().includes(q.toLowerCase().slice(0, 8)));
    let text = match ? match.a : "Thanks for your question! We typically help with cost optimization, AIOps, cloud, and GCC setups. Can you share your use case, timeline, and an email? I’ll also pass this to our team.";

    const s = scoreLead(userText);
    if (s >= 20) {
      text += " (Looks like a high‑priority inquiry—I'll flag this for our sales team.)";
      fetch('/api/leads', { method:'POST', headers:{'Content-Type':'application/json'}, body: JSON.stringify({ message: userText, score: s, source: 'chatbot' }) }).catch(()=>{});
    }
    setMessages(m => [...m, { role: "bot", text }]);
  }

  function send() {
    if (!input.trim()) return;
    const text = input.trim();
    setMessages(m => [...m, { role: "user", text }]);
    setInput(""); reply(text); inputRef.current?.focus();
  }

  return (
    <div className="fixed bottom-5 right-5 z-50 w-80">
      <div className="card overflow-hidden">
        <div className="flex items-center justify-between bg-slate-900 px-4 py-2 text-white">
          <span className="text-sm font-semibold">Chat with us</span>
          <button onClick={() => setOpen(!open)} className="text-xs opacity-80 hover:opacity-100">{open ? "–" : "+"}</button>
        </div>
        {open && (
          <div className="flex flex-col max-h-96">
            <div className="flex-1 space-y-2 overflow-y-auto p-3">
              {messages.map((m, i) => (
                <div key={i} className={m.role === "bot" ? "text-sm" : "text-sm text-right"}>
                  <div className={m.role === "bot" ? "inline-block rounded-2xl bg-slate-100 px-3 py-2" : "inline-block rounded-2xl bg-slate-900 px-3 py-2 text-white"}>
                    {m.text}
                  </div>
                </div>
              ))}
            </div>
            <div className="flex items-center gap-2 border-t border-slate-200 p-2">
              <input ref={inputRef} value={input} onChange={e=>setInput(e.target.value)} onKeyDown={e=> e.key==='Enter' && send()} className="input" placeholder="Type your question…" />
              <button onClick={send} className="btn-primary">Send</button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
