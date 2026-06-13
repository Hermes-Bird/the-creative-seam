import { Link } from "@tanstack/react-router";
import type { Professional } from "@/data/professionals";
import { RatingBadge } from "./RatingBadge";

export function ProfileCard({ p }: { p: Professional }) {
  return (
    <Link
      to="/professionals/$id"
      params={{ id: p.id }}
      className="group block fade-up"
    >
      <div className="img-zoom relative aspect-[4/5] bg-secondary mb-5">
        <img
          src={p.image_url}
          alt={`${p.name} — ${p.role}`}
          loading="lazy"
          width={800}
          height={1000}
          className="absolute inset-0 size-full object-cover"
        />
        {p.available_48h && (
          <span className="absolute top-4 left-4 label-tiny bg-background/90 backdrop-blur px-3 py-1.5">
            Available · 48h
          </span>
        )}
      </div>
      <div className="flex items-start justify-between gap-4">
        <div className="space-y-1.5">
          <p className="label-tiny text-muted-foreground">{p.role} — {p.location}</p>
          <h3 className="text-2xl leading-none">{p.name}</h3>
        </div>
        <RatingBadge rating={p.rating} reviews={p.reviews} />
      </div>
      <div className="mt-3 flex items-center justify-between">
        <p className="label-tiny text-muted-foreground">Starts from</p>
        <p className="text-sm font-medium tabular-nums">€{p.starts_from.toLocaleString()}</p>
      </div>
    </Link>
  );
}
