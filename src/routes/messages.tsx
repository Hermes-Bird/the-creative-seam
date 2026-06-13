import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { SiteHeader } from "@/components/SiteHeader";
import { useProfessionals } from "@/hooks/useProfessionals";
import { Send, Paperclip, Search } from "lucide-react";

export const Route = createFileRoute("/messages")({
  head: () => ({
    meta: [
      { title: "Messages — The Seam" },
      { name: "description", content: "Collaboration rooms with creatives and brands." },
    ],
  }),
  component: Messages,
});

const LAST_MESSAGES = [
  "Sounds great — sending availability now.",
  "Attaching the test shots from yesterday.",
  "Confirmed for Tuesday's call.",
  "Let's review the mood once more.",
  "Yes, the studio is booked.",
  "Final files coming through tonight.",
];
const TIMES = ["2h", "5h", "1d", "1d", "2d", "3d"];

function Messages() {
  const { data: professionals = [] } = useProfessionals();

  const conversations = useMemo(
    () =>
      professionals.map((p, i) => ({
        ...p,
        last: LAST_MESSAGES[i % 6],
        time: TIMES[i % 6],
        unread: i < 2,
      })),
    [professionals]
  );

  const [active, setActive] = useState(() => conversations[0]);

  const activeConv = active ?? conversations[0];

  return (
    <div className="h-screen flex flex-col">
      <SiteHeader />
      <main className="flex-1 grid md:grid-cols-[360px_1fr] border-t border-border overflow-hidden">
        {/* Sidebar */}
        <aside className="border-r border-border flex flex-col overflow-hidden">
          <div className="p-5 border-b border-border">
            <p className="label-eyebrow">Inbox</p>
            <div className="editorial-search mt-3 !py-2 !pl-4">
              <Search className="size-3.5 text-muted-foreground" />
              <input placeholder="Search" />
            </div>
          </div>
          <ul className="flex-1 overflow-y-auto">
            {conversations.map((c) => (
              <li key={c.id}>
                <button
                  onClick={() => setActive(c)}
                  className="w-full text-left p-5 border-b border-border flex gap-4 items-start hover:bg-secondary/50 transition"
                  style={{ background: activeConv?.id === c.id ? "var(--secondary)" : undefined }}
                >
                  <div className="size-12 rounded-full overflow-hidden bg-secondary shrink-0">
                    <img src={c.image_url} alt={c.name} className="size-full object-cover" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="flex items-baseline justify-between gap-2">
                      <p className="text-sm font-medium truncate">{c.name}</p>
                      <span className="label-tiny text-muted-foreground shrink-0">{c.time}</span>
                    </div>
                    <p className="label-tiny text-muted-foreground mt-0.5">{c.role}</p>
                    <p className="text-sm text-muted-foreground mt-2 line-clamp-1">{c.last}</p>
                  </div>
                  {c.unread && <span className="size-2 rounded-full bg-accent mt-2" />}
                </button>
              </li>
            ))}
          </ul>
        </aside>

        {/* Active conversation */}
        {activeConv && (
          <section className="flex flex-col overflow-hidden">
            <header className="p-5 border-b border-border flex items-center justify-between gap-4">
              <div className="flex items-center gap-4">
                <div className="size-10 rounded-full overflow-hidden bg-secondary">
                  <img src={activeConv.image_url} alt={activeConv.name} className="size-full object-cover" />
                </div>
                <div>
                  <p className="text-sm font-medium">{activeConv.name}</p>
                  <p className="label-tiny text-muted-foreground">{activeConv.role} · {activeConv.location}</p>
                </div>
              </div>
              <button className="btn-ghost !py-2 !px-4">View profile</button>
            </header>

            <div className="flex-1 overflow-y-auto p-8 space-y-6 bg-secondary/30">
              <Bubble who="them" text="Hi — saw your brief for the SS27 linen story. The references look beautiful." />
              <Bubble who="me" text="Thank you. We'd love to work with you. Are you available the week of the 12th?" />
              <Bubble who="them" text={activeConv.last} />
              <Bubble who="me" text="Sending the production deck across now — let me know what you think." />
            </div>

            <form className="p-5 border-t border-border flex items-center gap-3" onSubmit={(e) => e.preventDefault()}>
              <button type="button" className="p-2 text-muted-foreground hover:text-foreground"><Paperclip className="size-4" /></button>
              <input
                className="flex-1 bg-transparent outline-none text-sm py-2"
                placeholder="Write a message…"
              />
              <button className="btn-primary !py-2.5 !px-5"><Send className="size-3.5" /> Send</button>
            </form>
          </section>
        )}
      </main>
    </div>
  );
}

function Bubble({ who, text }: { who: "me" | "them"; text: string }) {
  const isMe = who === "me";
  return (
    <div className={`flex ${isMe ? "justify-end" : "justify-start"}`}>
      <div
        className="max-w-md px-5 py-3 text-sm leading-relaxed"
        style={{
          background: isMe ? "var(--foreground)" : "var(--background)",
          color: isMe ? "var(--background)" : "var(--foreground)",
          border: isMe ? "none" : "1px solid var(--border)",
        }}
      >
        {text}
      </div>
    </div>
  );
}
