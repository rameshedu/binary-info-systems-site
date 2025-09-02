
import "./globals.css";

export const metadata = {
  title: "Binary Information Systems — IT Consulting & Outsourcing",
  description: "Practical playbooks, assessments, and case studies for CIOs and IT leaders. Built by Binary Information Systems (34 years in global IT services).",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
