import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { useProfessionals } from "@/hooks/useProfessionals";
import { ArrowUpRight, Plus } from "lucide-react";

export const Route = createFileRoute("/dashboard")({
  head: () => ({
    meta: [
      { title: "Dashboard — The Seam" },
      { name: "description", content: "Manage active campaigns, proposals, saved professionals and messages." },
    ],
  }),
  component: Dashboard,
});

function Dashboard() {
  const { data: professionals = [] } = useProfessionals();
  const saved = professionals.slice(0, 4);

  return (
    <div className="min-h-screen flex flex-col">
      <SiteHeader />
      <main className="flex-1 mx-auto max-w-[1440px] px-6 lg:px-12 py-16 w-full">
        <div className="flex items-end justify-between mb-12 gap-6 flex-wrap">
          <div>
            <p className="label-eyebrow">Studio · Brand</p>
            <h1 className="text-6xl lg:text-7xl mt-3 leading-[0.95]">Good morning, Atelier.</h1>
          </div>
          <Link to="/campaigns/new" className="btn-primary"><Plus className="size-3.5" /> New campaign</Link>
        </div>

        <section className="grid grid-cols-2 lg:grid-cols-4 gap-px bg-border border border-border mb-16">
          {[
            ["03", "Active campaigns"],
            ["12", "Pending proposals"],
            ["28", "Saved professionals"],
            ["07", "Unread messages"],
          ].map(([k, v]) => (
            <div key={v} className="bg-background p-8">
              <p className="font-display text-5xl">{k}</p>
              <p className="label-tiny text-muted-foreground mt-3">{v}</p>
            </div>
          ))}
        </section>

        <div className="grid lg:grid-cols-12 gap-10">
          <section className="lg:col-span-7">
            <div className="flex items-end justify-between mb-6">
              <div>
                <p className="label-eyebrow">Active campaigns</p>
                <h2 className="font-display text-4xl mt-2">In production</h2>
              </div>
              <Link to="/campaigns/new" className="label-tiny inline-flex items-center gap-1.5 hover:gap-2.5 transition-all">
                New <ArrowUpRight className="size-3.5" />
              </Link>
            </div>
            <div className="space-y-4">
              {[
                { name: "SS27 — Linen Story", roles: "Photographer · Model · MUA", status: "Casting", count: 8 },
                { name: "Editorial — Soft Power", roles: "2 Models · Stylist", status: "Shooting", count: 4 },
                { name: "Campaign — North Light", roles: "Photographer · Location", status: "Drafting", count: 0 },
              ].map((c) => (
                <article key={c.name} className="border border-border p-6 hover:border-foreground transition group">
                  <div className="flex items-start justify-between gap-6">
                    <div>
                      <p className="label-tiny text-muted-foreground">{c.status}</p>
                      <h3 className="font-display text-2xl mt-2">{c.name}</h3>
                      <p className="text-sm text-muted-foreground mt-1.5">{c.roles}</p>
                    </div>
                    <div className="text-right">
                      <p className="font-display text-3xl">{c.count}</p>
                      <p className="label-tiny text-muted-foreground mt-1">applicants</p>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </section>

          <section className="lg:col-span-5">
            <div className="flex items-end justify-between mb-6">
              <div>
                <p className="label-eyebrow">Saved</p>
                <h2 className="font-display text-4xl mt-2">Your shortlist</h2>
              </div>
              <Link to="/marketplace" className="label-tiny">Browse</Link>
            </div>
            <div className="grid grid-cols-2 gap-4">
              {saved.map((p) => (
                <Link key={p.id} to="/professionals/$id" params={{ id: p.id }} className="img-zoom relative aspect-[4/5] bg-secondary group">
                  <img src={p.image_url} alt={p.name} loading="lazy" className="size-full object-cover" />
                  <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/70 to-transparent p-3">
                    <p className="text-background text-sm font-medium">{p.name}</p>
                    <p className="label-tiny text-background/80">{p.role}</p>
                  </div>
                </Link>
              ))}
            </div>

            <div className="mt-10 border border-border p-6">
              <p className="label-eyebrow">Recent messages</p>
              <ul className="mt-4 divide-y divide-border">
                {[
                  ["Elena Rossi", "Sounds great — sending availability now."],
                  ["Marco Bianchi", "Attaching the test shots from yesterday."],
                  ["Sofia Leone", "Confirmed for Tuesday's call."],
                ].map(([n, m]) => (
                  <li key={n} className="py-3 flex items-baseline justify-between gap-4">
                    <div>
                      <p className="text-sm font-medium">{n}</p>
                      <p className="text-sm text-muted-foreground line-clamp-1">{m}</p>
                    </div>
                    <span className="label-tiny text-muted-foreground shrink-0">2h</span>
                  </li>
                ))}
              </ul>
              <Link to="/messages" className="btn-ghost w-full mt-5 !py-2.5">Open inbox</Link>
            </div>
          </section>
        </div>
      </main>
      <SiteFooter />
    </div>
  );
}
