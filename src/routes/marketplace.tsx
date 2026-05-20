import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { ProfileCard } from "@/components/ProfileCard";
import { professionals } from "@/data/professionals";
import { Search, SlidersHorizontal } from "lucide-react";

export const Route = createFileRoute("/marketplace")({
  head: () => ({
    meta: [
      { title: "Marketplace — The Seam" },
      { name: "description", content: "Browse a curated network of photographers, models, stylists, MUAs and influencers ready to collaborate." },
      { property: "og:title", content: "Marketplace — The Seam" },
      { property: "og:description", content: "Browse a curated network of editorial creatives." },
    ],
  }),
  component: Marketplace,
});

const ROLES = ["All", "Photographer", "Model", "Stylist", "Makeup Artist", "Influencer"] as const;
const LOCATIONS = ["Anywhere", "Milan", "Paris", "London", "Berlin", "Rome", "Florence"] as const;

function Marketplace() {
  const [q, setQ] = useState("");
  const [role, setRole] = useState<typeof ROLES[number]>("All");
  const [loc, setLoc] = useState<typeof LOCATIONS[number]>("Anywhere");
  const [only48, setOnly48] = useState(false);

  const filtered = useMemo(() => {
    return professionals.filter((p) => {
      if (role !== "All" && p.role !== role) return false;
      if (loc !== "Anywhere" && !p.location.toLowerCase().includes(loc.toLowerCase())) return false;
      if (only48 && !p.available48h) return false;
      if (q && !`${p.name} ${p.role} ${p.location}`.toLowerCase().includes(q.toLowerCase())) return false;
      return true;
    });
  }, [q, role, loc, only48]);

  return (
    <div className="min-h-screen flex flex-col">
      <SiteHeader />

      <main className="flex-1">
        <section className="mx-auto max-w-[1440px] px-6 lg:px-12 pt-20 pb-12 text-center">
          <p className="label-eyebrow">The Marketplace</p>
          <h1 className="text-7xl md:text-9xl mt-5 leading-[0.9]">
            I'm a brand.
          </h1>
          <p className="mt-6 max-w-xl mx-auto text-muted-foreground">
            Cast a complete creative team in an afternoon. Verified talent, transparent pricing,
            response in hours.
          </p>

          <form
            onSubmit={(e) => e.preventDefault()}
            className="mt-10 max-w-2xl mx-auto editorial-search"
          >
            <Search className="size-4 text-muted-foreground" />
            <input
              value={q}
              onChange={(e) => setQ(e.target.value)}
              placeholder="Search by name, role or location"
            />
            <button className="btn-primary !py-2.5 !px-5" type="submit">Search</button>
          </form>
        </section>

        <section className="border-y border-border bg-secondary/40">
          <div className="mx-auto max-w-[1440px] px-6 lg:px-12 py-5 flex flex-wrap items-center gap-3">
            <span className="label-eyebrow flex items-center gap-2 mr-2">
              <SlidersHorizontal className="size-3" /> Filters
            </span>
            {ROLES.map((r) => (
              <button key={r} className="filter-pill" data-active={role === r} onClick={() => setRole(r)}>
                {r}
              </button>
            ))}
            <span className="mx-2 h-4 w-px bg-border" />
            {LOCATIONS.map((l) => (
              <button key={l} className="filter-pill" data-active={loc === l} onClick={() => setLoc(l)}>
                {l}
              </button>
            ))}
            <span className="mx-2 h-4 w-px bg-border" />
            <button className="filter-pill" data-active={only48} onClick={() => setOnly48((v) => !v)}>
              Available · 48h
            </button>
          </div>
        </section>

        <section className="mx-auto max-w-[1440px] px-6 lg:px-12 py-16">
          <div className="flex items-end justify-between mb-10">
            <p className="label-eyebrow">{filtered.length} results</p>
            <p className="label-eyebrow">Sorted — Editorial pick</p>
          </div>

          {filtered.length === 0 ? (
            <div className="py-32 text-center">
              <p className="font-display text-4xl">Nothing matches — yet.</p>
              <p className="text-muted-foreground mt-3">Try widening your filters.</p>
            </div>
          ) : (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-6 gap-y-16">
              {filtered.map((p) => <ProfileCard key={p.id} p={p} />)}
            </div>
          )}
        </section>
      </main>

      <SiteFooter />
    </div>
  );
}
