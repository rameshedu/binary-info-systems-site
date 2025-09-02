
# Binary Information Systems — Website

A lightweight Next.js + Tailwind site with a downloadable resource bundle and a built‑in FAQ chatbot + lead capture.

## What's inside
- Landing page with downloads (5 PDFs in `public/resources/`)
- Floating chatbot with FAQ and lead scoring
- Lead form posting to `/api/leads` (emails via Resend if configured)
- Ready for deploy on Vercel or Netlify

## Quick start
npm i
npm run dev  # open http://localhost:3000

## Deploy (Vercel)
1) Push to a GitHub repo, import in Vercel.
2) Optional env vars for emailing leads:
   - RESEND_API_KEY = your Resend key
   - SALES_EMAIL = sales@binaryinfosystems.com
3) Deploy.

## Customize
- Update Calendly link in `app/page.tsx`.
- Edit FAQ in `components/Chatbot.tsx`.
- Swap branding/logo by editing layout and CSS.

© 2025 Binary Information Systems
