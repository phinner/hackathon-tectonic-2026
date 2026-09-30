import type { Doc } from "~/data/documents";
import { importanceLevels, type Importance } from "~/data/taxonomy";

const importanceStyles: Record<Importance, string> = {
  legal: "bg-red-50 text-red-700 ring-red-200",
  policy: "bg-violet-50 text-violet-700 ring-violet-200",
  guidance: "bg-slate-100 text-slate-600 ring-slate-200",
};

const pill = "inline-flex items-center rounded-full px-2 py-0.5 text-xs font-medium ring-1 ring-inset";

export function ImportanceBadge({ importance }: { importance: Importance }) {
  return <span className={`${pill} ${importanceStyles[importance]}`}>{importanceLevels[importance].label}</span>;
}

export function StatusBadges({ doc }: { doc: Doc }) {
  return (
    <>
      {doc.status === "obsolete" && <span className={`${pill} bg-slate-200 text-slate-600 ring-slate-300`}>Obsolète</span>}
      {doc.status === "a-verifier" && <span className={`${pill} bg-amber-50 text-amber-700 ring-amber-200`}>À vérifier</span>}
      {doc.conflictsWith?.length ? <span className={`${pill} bg-orange-50 text-orange-700 ring-orange-200`}>⚠ Contradiction</span> : null}
    </>
  );
}

export function Keywords({ keywords }: { keywords: string[] }) {
  return (
    <div className="flex flex-wrap gap-1">
      {keywords.map((k) => (
        <span key={k} className="rounded border border-brand/30 px-1.5 py-0.5 text-[11px] text-brand">
          {k}
        </span>
      ))}
    </div>
  );
}

export const formatDate = (iso: string) =>
  new Date(iso).toLocaleDateString("fr-BE", { day: "numeric", month: "short", year: "numeric" });
