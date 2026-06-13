import { createFileRoute, Link, useParams } from "@tanstack/react-router";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { RatingBadge } from "@/components/RatingBadge";
import { useProfessional } from "@/hooks/useProfessionals";
import { ArrowLeft, MapPin, Clock, CheckCircle2, MessageSquare, Send } from "lucide-react";

export const Route = createFileRoute("/professionals/$id")({
  head: () => ({
    meta: [{ title: "Profile · The Seam" }],
  }),
  notFoundComponent: () => (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center">
        <h1 className="font-display text-6xl">Not found</h1>
        <Link to="/marketplace" className="btn-primary mt-6 inline-flex">Back to marketplace</Link>
      </div>
    </div>
  ),
  errorComponent: ({ error }) => (
    <div className="min-h-screen flex items-center justify-center">
      <p>{error.message}</p>
    </div>
  ),
  component: ProfilePage,
});

function ProfilePage() {
  const { id } = useParams({ from: "/professionals/$id" });
  const { data: p, isLoading, error } = useProfessional(id);

  if (isLoading) {
    return (
      <div className="min-h-screen flex flex-col">
        <SiteHeader />
        <main className="flex-1 mx-auto max-w-[1440px] px-6 lg:px-12 pt-20 animate-pulse">
          <div className="h-4 bg-secondary rounded w-32 mb-10" />
          <div className="grid lg:grid-cols-12 gap-12">
            <div className="lg:col-span-6 aspect-[4/5] bg-secondary" />
            <div className="lg:col-span-6 space-y-6">
              <div className="h-4 bg-secondary rounded w-20" />
              <div className="h-14 bg-secondary rounded w-3/4" />
              <div className="h-4 bg-secondary rounded w-full" />
              <div className="h-4 bg-secondary rounded w-2/3" />
            </div>
          </div>
        </main>
        <SiteFooter />
      </div>
    );
  }

  if (error || !p) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="font-display text-6xl">Not found</h1>
          <Link to="/marketplace" className="btn-primary mt-6 inline-flex">Back to marketplace</Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      <SiteHeader />

      <main className="flex-1">
        <div className="mx-auto max-w-[1440px] px-6 lg:px-12 pt-10">
          <Link to="/marketplace" className="inline-flex items-center gap-2 label-tiny text-muted-foreground hover:text-foreground">
            <ArrowLeft className="size-3" /> Back to marketplace
          </Link>
        </div>

        <section className="mx-auto max-w-[1440px] px-6 lg:px-12 pt-10 pb-20 grid lg:grid-cols-12 gap-12">
          {/* LEFT: portrait */}
          <div className="lg:col-span-6 lg:sticky lg:top-28 self-start">
            <div className="img-zoom aspect-[4/5] bg-secondary rounded-md overflow-hidden">
              <img src={p.image_url} alt={p.name} width={1080} height={1350} className="size-full object-cover" />
            </div>
            <div className="mt-5 grid grid-cols-3 gap-3">
              {p.portfolio_urls.slice(0, 3).map((src, i) => (
                <div key={i} className="aspect-square bg-secondary rounded-sm overflow-hidden">
                  <img src={src} alt="portfolio thumb" loading="lazy" className="size-full object-cover" />
                </div>
              ))}
            </div>
          </div>

          {/* RIGHT: details */}
          <div className="lg:col-span-6 space-y-10">
            <div>
              <p className="label-eyebrow">{p.role}</p>
              <h1 className="text-6xl lg:text-7xl leading-[0.95] mt-4">{p.name}</h1>

              <div className="mt-6 flex flex-wrap items-center gap-x-6 gap-y-3">
                <RatingBadge rating={p.rating} reviews={p.reviews} size="md" />
                <span className="inline-flex items-center gap-1.5 text-sm text-muted-foreground">
                  <MapPin className="size-3.5" strokeWidth={1.5} /> {p.location}
                </span>
                <span className="inline-flex items-center gap-1.5 text-sm text-muted-foreground">
                  <Clock className="size-3.5" strokeWidth={1.5} /> Replies {p.response_time}
                </span>
                <span className="inline-flex items-center gap-1.5 text-sm">
                  <CheckCircle2 className="size-3.5" strokeWidth={1.5} style={{ color: "var(--accent)" }} />
                  Verified
                </span>
              </div>
            </div>

            <div className="border-t border-border pt-6">
              <p className="label-eyebrow">Bio</p>
              <p className="mt-4 text-base leading-relaxed text-foreground/90 max-w-xl">
                {p.bio}
              </p>
            </div>

            <div className="grid grid-cols-3 gap-6 border-t border-border pt-6">
              <div>
                <p className="label-tiny text-muted-foreground">Starts from</p>
                <p className="font-display text-3xl mt-2">€{p.starts_from.toLocaleString()}</p>
              </div>
              <div>
                <p className="label-tiny text-muted-foreground">Reviews</p>
                <p className="font-display text-3xl mt-2">{p.reviews}</p>
              </div>
              <div>
                <p className="label-tiny text-muted-foreground">Completed</p>
                <p className="font-display text-3xl mt-2">{Math.floor(p.reviews * 1.2)}</p>
              </div>
            </div>

            <div className="flex flex-wrap gap-3 pt-2">
              <button className="btn-primary"><Send className="size-3.5" /> Request collaboration</button>
              <button className="btn-ghost"><MessageSquare className="size-3.5" /> Invite to project</button>
            </div>

            <div className="border-t border-border pt-8">
              <div className="flex items-end justify-between mb-6">
                <div>
                  <p className="label-eyebrow">Portfolio</p>
                  <h2 className="font-display text-4xl mt-3">Selected work</h2>
                </div>
                <p className="label-tiny text-muted-foreground">{p.portfolio_urls.length} pieces</p>
              </div>
              <div className="columns-2 gap-4 [column-fill:_balance]">
                {p.portfolio_urls.map((src, i) => (
                  <div key={i} className="mb-4 break-inside-avoid img-zoom bg-secondary">
                    <img src={src} alt={`Portfolio ${i + 1}`} loading="lazy" className="w-full object-cover" />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
      </main>

      <SiteFooter />
    </div>
  );
}
