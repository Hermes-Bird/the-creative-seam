import { Link, useLocation } from "@tanstack/react-router";
import { Logo } from "./Logo";
import { Menu, X } from "lucide-react";
import { useState } from "react";

const links = [
  { to: "/marketplace", label: "Find a Professional" },
  { to: "/campaigns/new", label: "Projects" },
  { to: "/messages", label: "Support" },
  { to: "/dashboard", label: "My Profile" },
] as const;

export function SiteHeader() {
  const { pathname } = useLocation();
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 backdrop-blur-md bg-background/85 border-b border-border/60">
      <div className="mx-auto max-w-[1440px] px-6 lg:px-12 h-20 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-3" onClick={() => setOpen(false)}>
          <Logo className="h-12" />
        </Link>

        <nav className="hidden md:flex items-center gap-10">
          {links.map((l) => {
            const active = pathname === l.to || pathname.startsWith(l.to);
            return (
              <Link
                key={l.to}
                to={l.to}
                className="label-tiny relative py-1 transition-colors hover:text-foreground"
                style={{ color: active ? "var(--foreground)" : "var(--muted-foreground)" }}
              >
                {l.label}
                {active && (
                  <span className="stitch-line absolute -bottom-1 left-0 right-0" />
                )}
              </Link>
            );
          })}
        </nav>

        <div className="hidden md:flex items-center gap-4">
          <Link to="/marketplace" className="btn-primary">Get Started</Link>
        </div>

        <button
          className="md:hidden p-2 -mr-2"
          onClick={() => setOpen((o) => !o)}
          aria-label="Toggle navigation"
        >
          {open ? <X className="size-5" /> : <Menu className="size-5" />}
        </button>
      </div>

      {open && (
        <div className="md:hidden border-t border-border/60 bg-background">
          <div className="px-6 py-6 flex flex-col gap-5">
            {links.map((l) => (
              <Link
                key={l.to}
                to={l.to}
                onClick={() => setOpen(false)}
                className="label-tiny"
              >
                {l.label}
              </Link>
            ))}
            <Link to="/marketplace" onClick={() => setOpen(false)} className="btn-primary mt-2">
              Get Started
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
