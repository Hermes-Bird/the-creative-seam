import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { ProfileCard } from "@/components/ProfileCard";
import { professionals } from "@/data/professionals";
import { ArrowRight, Search, Sparkles, Globe2, Zap } from "lucide-react";
import logo from "@/assets/theseam-logo.png";
import hero2 from "@/assets/hero-2.jpg";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "The Seam — Connecting Creatives and Brands" },
      {
        name: "description",
        content:
          "A curated marketplace where emerging brands meet photographers, models, stylists and creators. Agency-quality content, without the agency cost.",
      },
      { property: "og:title", content: "The Seam — Connecting Creatives and Brands" },
      {
        property: "og:description",
        content:
          "A curated marketplace where emerging brands meet photographers, models, stylists and creators.",
      },
    ],
  }),
  component: Index,
});

function Index() {
  const featured = professionals.slice(0, 4);

  return (
    <div className="min-h-screen flex flex-col">
      <SiteHeader />

      <main className="flex-1">
        {/* HERO */}
        <section className="relative">
          <div className="mx-auto max-w-[1440px] px-6 lg:px-12 pt-16 pb-24 lg:pt-24 lg:pb-32 flex flex-col items-center gap-16 lg:gap-20">
            <div className="w-full max-w-3xl lg:max-w-4xl xl:max-w-5xl mx-auto text-center space-y-10 fade-up">
              <p className="label-eyebrow">Estd 2026 — A new kind of network</p>
              <h1 className="font-petit-cochon text-[10vw] sm:text-[8vw] lg:text-[5.5rem] xl:text-[6.5rem] leading-[0.9] tracking-tight">
                Agency-quality<br />
                content.<br />
                <span className="relative inline-block">
                  Without the
                  <span className="stitch-line absolute left-0 right-0 bottom-2" />
                </span>{" "}
                <em className="not-italic">cost.</em>
              </h1>
              <p className="mx-auto max-w-2xl text-base leading-relaxed text-muted-foreground">
                The Seam is a curated marketplace pairing emerging brands with photographers,
                models, stylists, MUAs, influencers and location scouts — direct, transparent,
                editorial.
              </p>

              <div className="w-full max-w-2xl lg:max-w-3xl mx-auto">
                <form className="editorial-search" onSubmit={(e) => e.preventDefault()}>
                  <Search className="size-4 text-muted-foreground" />
                  <input placeholder="Search photographers, models, stylists…" />
                  <Link to="/marketplace" className="btn-primary !py-2.5 !px-5">
                    Discover <ArrowRight className="size-3.5" />
                  </Link>
                </form>
                <div className="mt-5 flex flex-wrap justify-center gap-2">
                  {["Photographer", "Model", "Stylist", "MUA", "Influencer"].map((t) => (
                    <Link key={t} to="/marketplace" className="filter-pill">{t}</Link>
                  ))}
                </div>
              </div>
            </div>

            <div className="relative w-full max-w-sm md:max-w-md lg:max-w-lg">
              <div className="img-zoom">
                <img
                  src={logo}
                  alt="Editorial fashion portrait"
                  width={1080}
                  height={1350}
                  className="size-full object-cover"
                />
              </div>
              <div className="absolute -bottom-6 left-1/2 -translate-x-1/2 hidden md:block bg-background border border-foreground p-5 max-w-[220px]">
                <p className="label-eyebrow">Live now</p>
                <p className="font-display text-3xl mt-2 leading-none">2,481</p>
                <p className="label-tiny text-muted-foreground mt-1">creatives in 38 cities</p>
              </div>
            </div>
          </div>
        </section>

        {/* MARQUEE / TICKER */}
        <section className="border-y border-border">
          <div className="mx-auto max-w-[1440px] px-6 lg:px-12 py-5 flex items-center justify-between gap-6 overflow-hidden">
            {["Vogue Italia", "Numéro", "L'Officiel", "AnOther", "Highsnobiety", "Dazed", "i-D"].map((b) => (
              <span key={b} className="label-tiny text-muted-foreground whitespace-nowrap">
                {b}
              </span>
            ))}
          </div>
        </section>

        {/* HOW IT WORKS */}
        <section className="mx-auto max-w-[1440px] px-6 lg:px-12 py-28">
          <div className="grid lg:grid-cols-12 gap-12 mb-16">
            <div className="lg:col-span-4">
              <p className="label-eyebrow">How it works</p>
              <h2 className="font-display text-5xl lg:text-6xl mt-4 leading-[0.95]">
                Three steps,<br />
                no middleman.
              </h2>
            </div>
            <p className="lg:col-span-5 lg:col-start-8 text-base text-muted-foreground self-end leading-relaxed">
              From brief to delivery, every collaboration lives inside one elegant workspace —
              transparent pricing, direct messaging, shared moodboards.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              { n: "01", t: "Write a brief", d: "Define your vision, budget and required roles in our minimal campaign builder.", icon: Sparkles },
              { n: "02", t: "Discover talent", d: "Browse a curated network or let us match you with creatives ready in 48 hours.", icon: Globe2 },
              { n: "03", t: "Collaborate", d: "Move into a private collaboration room — chat, share files, deliver. Done.", icon: Zap },
            ].map(({ n, t, d, icon: Icon }) => (
              <div key={n} className="border-t border-foreground pt-6 group">
                <div className="flex items-start justify-between mb-10">
                  <span className="label-tiny">{n}</span>
                  <Icon className="size-5 text-muted-foreground group-hover:text-foreground transition" strokeWidth={1.25} />
                </div>
                <h3 className="font-display text-3xl leading-tight mb-3">{t}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed max-w-xs">{d}</p>
              </div>
            ))}
          </div>
        </section>

        {/* FEATURED CREATIVES */}
        <section className="bg-secondary">
          <div className="mx-auto max-w-[1440px] px-6 lg:px-12 py-28">
            <div className="flex items-end justify-between gap-8 mb-14">
              <div>
                <p className="label-eyebrow">In rotation</p>
                <h2 className="font-display text-5xl lg:text-6xl mt-4 leading-[0.95]">
                  Featured this week.
                </h2>
              </div>
              <Link to="/marketplace" className="hidden md:inline-flex items-center gap-2 label-tiny hover:gap-3 transition-all">
                See all <ArrowRight className="size-4" />
              </Link>
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-x-6 gap-y-14">
              {featured.map((p) => <ProfileCard key={p.id} p={p} />)}
            </div>
          </div>
        </section>

        {/* SPLIT EDITORIAL */}
        <section className="mx-auto max-w-[1440px] px-6 lg:px-12 py-28 grid lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-6 img-zoom aspect-[5/6] bg-secondary">
            <img src={hero2} alt="Behind the scenes" loading="lazy" width={1080} height={1296} className="size-full object-cover" />
          </div>
          <div className="lg:col-span-5 lg:col-start-8 space-y-8">
            <p className="label-eyebrow">For brands</p>
            <h2 className="font-display text-5xl lg:text-6xl leading-[0.95]">
              Cast a campaign in an afternoon.
            </h2>
            <p className="text-muted-foreground leading-relaxed">
              Browse verified creatives by role, location, rating and style. Send invites, review
              applications, and start collaborating — all without picking up the phone.
            </p>
            <div className="grid grid-cols-3 gap-6 pt-4 border-t border-border">
              {[
                ["48h", "Average time to cast"],
                ["–62%", "Vs. agency cost"],
                ["4.9", "Average rating"],
              ].map(([k, v]) => (
                <div key={v}>
                  <p className="font-display text-4xl leading-none">{k}</p>
                  <p className="label-tiny text-muted-foreground mt-2">{v}</p>
                </div>
              ))}
            </div>
            <div className="flex flex-wrap gap-3">
              <Link to="/campaigns/new" className="btn-primary">Start a project</Link>
              <Link to="/marketplace" className="btn-ghost">Browse talent</Link>
            </div>
          </div>
        </section>

        {/* CTA STITCH */}
        <section className="mx-auto max-w-[1440px] px-6 lg:px-12 pb-28">
          <div className="border border-foreground p-10 lg:p-16 text-center relative overflow-hidden">
            <div className="stitch-line absolute top-1/2 left-0 right-0" />
            <p className="label-eyebrow relative inline-block bg-background px-4">Join the seam</p>
            <h2 className="font-display text-5xl lg:text-7xl mt-6 leading-[0.95] relative inline-block bg-background px-6">
              Where brands meet<br />the people who shape them.
            </h2>
            <div className="mt-10 flex flex-wrap justify-center gap-3 relative">
              <Link to="/marketplace" className="btn-primary">I'm a brand</Link>
              <Link to="/dashboard" className="btn-ghost">I'm a creative</Link>
            </div>
          </div>
        </section>
      </main>

      <SiteFooter />
    </div>
  );
}
