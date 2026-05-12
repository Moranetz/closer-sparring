import type { Metadata } from "next";
import { Inter, Newsreader } from "next/font/google";
import Link from "next/link";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const newsreader = Newsreader({
  variable: "--font-newsreader",
  subsets: ["latin"],
  display: "swap",
  style: ["normal", "italic"],
});

export const metadata: Metadata = {
  title: "Closer Sparring",
  description:
    "Drill against 15 buyer personas using Atlas-governed sales techniques. Part of the Closer Foundation.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${newsreader.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <header className="hairline-b">
          <div className="max-w-6xl mx-auto px-6 py-5 flex items-center justify-between">
            <Link href="/" className="flex items-baseline gap-3 group">
              <span className="roman text-[0.65rem] tracking-[0.18em] text-[var(--cool)]">
                № 03
              </span>
              <span className="editorial text-xl tracking-tight">
                Closer Sparring
              </span>
              <span className="marginalia text-xs hidden sm:inline">
                a drill harness
              </span>
            </Link>
            <nav className="flex items-center gap-6 text-sm">
              <Link
                href="/about"
                className="text-[var(--ink-muted)] hover:text-[var(--ink)]"
              >
                About
              </Link>
              <a
                href="https://github.com/Moranetz/closer-curriculum"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[var(--ink-muted)] hover:text-[var(--warm)]"
              >
                Curriculum →
              </a>
            </nav>
          </div>
        </header>

        <main className="flex-1">{children}</main>

        <footer className="hairline-t mt-16">
          <div className="max-w-6xl mx-auto px-6 py-8 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 text-xs text-[var(--ink-soft)]">
            <span className="marginalia">
              Part of the Closer Foundation research program — drill harness for
              the Closer Curriculum.
            </span>
            <span>
              <span className="roman">v0.1</span>
              <span className="ml-3 text-[var(--ink-soft)]">
                LLM-driven · approximate · drilling ≠ live deal exposure
              </span>
            </span>
          </div>
        </footer>
      </body>
    </html>
  );
}
