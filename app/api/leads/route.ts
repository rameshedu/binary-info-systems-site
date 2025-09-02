
import { NextResponse } from "next/server";

export async function POST(request) {
  try {
    const body = await request.json();
    const { name, email, company, message, score, source } = body || {};

    const RESEND_API_KEY = process.env.RESEND_API_KEY;
    const SALES_EMAIL = process.env.SALES_EMAIL;
    if (RESEND_API_KEY && SALES_EMAIL) {
      const subject = `New lead from ${source || 'site'}${score ? ` (score ${score})` : ''}`;
      const content = `Name: ${name || ''}\nEmail: ${email || ''}\nCompany: ${company || ''}\nMessage: ${message || ''}\nScore: ${score || ''}`;
      const res = await fetch("https://api.resend.com/emails", {
        method: "POST",
        headers: { "Content-Type": "application/json", "Authorization": `Bearer ${RESEND_API_KEY}` },
        body: JSON.stringify({ from: "noreply@binaryinfosystems.example", to: [SALES_EMAIL], subject, text: content })
      });
      if (!res.ok) {
        const txt = await res.text();
        console.error("Resend error:", txt);
      }
    } else {
      console.log("Lead received (set RESEND_API_KEY & SALES_EMAIL to auto-email):", body);
    }

    return NextResponse.json({ ok: true });
  } catch (e) {
    console.error(e);
    return NextResponse.json({ ok: false, message: "Failed to submit" }, { status: 500 });
  }
}
