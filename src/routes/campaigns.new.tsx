import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { Check, Image as ImageIcon, Upload } from "lucide-react";

export const Route = createFileRoute("/campaigns/new")({
  head: () => ({
    meta: [
      { title: "New campaign — The Seam" },
      { name: "description", content: "Create a campaign brief in minutes — moodboards, roles, budget and dates." },
    ],
  }),
  component: NewCampaign,
});

const STEPS = ["Brief", "Roles", "Moodboard", "Review"] as const;

function NewCampaign() {
  const [step, setStep] = useState(0);

  return (
    <div className="min-h-screen flex flex-col">
      <SiteHeader />

      <main className="flex-1 mx-auto max-w-[1280px] px-6 lg:px-12 py-16 w-full">
        <div className="text-center mb-14">
          <p className="label-eyebrow">Campaign builder</p>
          <h1 className="text-6xl md:text-8xl mt-3 leading-[0.9]">Brief a project.</h1>
        </div>

        {/* Stepper */}
        <ol className="flex items-center justify-center gap-3 md:gap-5 mb-16">
          {STEPS.map((s, i) => (
            <li key={s} className="flex items-center gap-3">
              <button
                onClick={() => setStep(i)}
                className="flex items-center gap-3 group"
              >
                <span
                  className="size-8 rounded-full border flex items-center justify-center text-xs tabular-nums"
                  style={{
                    background: i <= step ? "var(--foreground)" : "transparent",
                    color: i <= step ? "var(--background)" : "var(--muted-foreground)",
                    borderColor: i <= step ? "var(--foreground)" : "var(--border)",
                  }}
                >
                  {i < step ? <Check className="size-3.5" /> : String(i + 1).padStart(2, "0")}
                </span>
                <span className="label-tiny" style={{ color: i === step ? "var(--foreground)" : "var(--muted-foreground)" }}>{s}</span>
              </button>
              {i < STEPS.length - 1 && <span className="w-8 h-px bg-border" />}
            </li>
          ))}
        </ol>

        <div className="grid lg:grid-cols-12 gap-10">
          <section className="lg:col-span-8 space-y-10">
            {step === 0 && <BriefStep />}
            {step === 1 && <RolesStep />}
            {step === 2 && <MoodboardStep />}
            {step === 3 && <ReviewStep />}
          </section>

          <aside className="lg:col-span-4 lg:sticky lg:top-28 self-start border border-border p-6 space-y-5">
            <p className="label-eyebrow">Summary</p>
            <div className="space-y-3 text-sm">
              <Row k="Project" v="—" />
              <Row k="Budget" v="€8,000" />
              <Row k="Dates" v="Apr 12 → Apr 18" />
              <Row k="Roles" v="Photographer · Model" />
              <Row k="Location" v="Milan" />
            </div>
            <div className="stitch-line" />
            <div className="flex gap-3">
              <button onClick={() => setStep(Math.max(0, step - 1))} className="btn-ghost flex-1 !py-2.5">Back</button>
              <button
                onClick={() => setStep(Math.min(STEPS.length - 1, step + 1))}
                className="btn-primary flex-1 !py-2.5"
              >
                {step === STEPS.length - 1 ? "Publish" : "Continue"}
              </button>
            </div>
          </aside>
        </div>
      </main>

      <SiteFooter />
    </div>
  );
}

function Row({ k, v }: { k: string; v: string }) {
  return (
    <div className="flex justify-between gap-4">
      <span className="label-tiny text-muted-foreground">{k}</span>
      <span className="text-right">{v}</span>
    </div>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <label className="block">
      <span className="label-eyebrow block mb-3">{label}</span>
      {children}
    </label>
  );
}

const inputCls =
  "w-full bg-transparent border-b border-foreground/40 focus:border-foreground outline-none py-3 text-base placeholder:text-muted-foreground/70 transition-colors";

function BriefStep() {
  return (
    <div className="space-y-10 fade-up">
      <Field label="Project name">
        <input className={inputCls} placeholder="e.g. SS27 — Linen Story" />
      </Field>
      <div className="grid md:grid-cols-2 gap-10">
        <Field label="Budget (€)">
          <input className={inputCls} type="number" placeholder="8000" />
        </Field>
        <Field label="Location">
          <input className={inputCls} placeholder="Milan, IT" />
        </Field>
        <Field label="Start date">
          <input className={inputCls} type="date" />
        </Field>
        <Field label="End date">
          <input className={inputCls} type="date" />
        </Field>
      </div>
      <Field label="Concept">
        <textarea className={inputCls + " resize-none"} rows={4} placeholder="Tell us about the world, mood and intention…" />
      </Field>
    </div>
  );
}

function RolesStep() {
  const roles = ["Photographer", "Model", "Stylist", "MUA", "Influencer", "Location scout"];
  const [picked, setPicked] = useState<string[]>(["Photographer", "Model"]);
  return (
    <div className="space-y-8 fade-up">
      <Field label="Required roles">
        <div className="flex flex-wrap gap-3 mt-2">
          {roles.map((r) => (
            <button
              key={r}
              type="button"
              data-active={picked.includes(r)}
              className="filter-pill"
              onClick={() =>
                setPicked((p) => (p.includes(r) ? p.filter((x) => x !== r) : [...p, r]))
              }
            >
              {r}
            </button>
          ))}
        </div>
      </Field>
      <div className="grid md:grid-cols-2 gap-10">
        <Field label="Experience level">
          <select className={inputCls}>
            <option>Editorial</option>
            <option>Established</option>
            <option>Emerging</option>
          </select>
        </Field>
        <Field label="Availability window">
          <select className={inputCls}>
            <option>Within 48 hours</option>
            <option>Within a week</option>
            <option>Flexible</option>
          </select>
        </Field>
      </div>
    </div>
  );
}

function MoodboardStep() {
  return (
    <div className="space-y-8 fade-up">
      <Field label="Visual references">
        <div className="border border-dashed border-foreground/40 rounded-sm p-10 text-center hover:border-foreground transition">
          <Upload className="size-6 mx-auto mb-4 text-muted-foreground" strokeWidth={1.25} />
          <p className="text-sm">Drag images, paste Pinterest links, or browse</p>
          <p className="label-tiny text-muted-foreground mt-2">PNG · JPG · up to 20 MB</p>
        </div>
      </Field>
      <div className="grid grid-cols-3 md:grid-cols-5 gap-3">
        {Array.from({ length: 10 }).map((_, i) => (
          <div key={i} className="aspect-square bg-secondary flex items-center justify-center">
            <ImageIcon className="size-5 text-muted-foreground" strokeWidth={1.25} />
          </div>
        ))}
      </div>
    </div>
  );
}

function ReviewStep() {
  return (
    <div className="space-y-6 fade-up">
      <h2 className="font-display text-4xl">Ready to publish.</h2>
      <p className="text-muted-foreground max-w-lg">
        Once published, your brief is shared with matched creatives. You'll receive proposals
        within hours.
      </p>
      <div className="border border-foreground p-8">
        <p className="label-eyebrow">Visibility</p>
        <p className="font-display text-3xl mt-3">Curated network — invite-only.</p>
        <p className="text-sm text-muted-foreground mt-3">
          We surface your brief to matching profiles and notify our editors.
        </p>
      </div>
    </div>
  );
}
