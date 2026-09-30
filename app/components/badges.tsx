import type { Doc } from "~/data/documents";
import { importanceLevels, type Importance } from "~/data/taxonomy";

/** Icône Material Symbols. La taille passe par `style` : la feuille de Google Fonts l'emporterait sur une classe Tailwind. */
export function Icon({ name, size = 18, className = "" }: { name: string; size?: number; className?: string }) {
  return (
    <span aria-hidden className={`material-symbols-outlined shrink-0 select-none ${className}`} style={{ fontSize: size }}>
      {name}
    </span>
  );
}

const chip = "inline-flex h-[22px] items-center gap-1 rounded-lg border px-2 text-label-sm font-semibold whitespace-nowrap";

export const importanceStyles: Record<Importance, { chip: string; bar: string; icon: string }> = {
  legal: { chip: "border-primary-fixed bg-primary-fixed/60 text-on-primary-fixed-variant", bar: "border-l-primary-container", icon: "gavel" },
  policy: { chip: "border-secondary-fixed bg-secondary-fixed/50 text-on-secondary-fixed-variant", bar: "border-l-secondary", icon: "domain" },
  guidance: { chip: "border-slate-200 bg-slate-100 text-slate-600", bar: "border-l-outline-variant", icon: "lightbulb" },
};

export function ImportanceBadge({ importance }: { importance: Importance }) {
  const style = importanceStyles[importance];
  return (
    <span className={`${chip} ${style.chip}`}>
      <Icon name={style.icon} size={14} />
      {importanceLevels[importance].label}
    </span>
  );
}

export function StatusBadges({ doc }: { doc: Doc }) {
  return (
    <>
      {doc.status === "valide" && (
        <span className={`${chip} border-emerald-200 bg-emerald-50 text-emerald-800`}>
          <Icon name="verified_user" size={14} />
          Validé
        </span>
      )}
      {doc.status === "obsolete" && (
        <span className={`${chip} border-slate-300 bg-slate-200 text-slate-600`}>
          <Icon name="history" size={14} />
          Obsolète
        </span>
      )}
      {doc.status === "a-verifier" && (
        <span className={`${chip} border-amber-200 bg-amber-50 text-amber-800`}>
          <Icon name="pending" size={14} />
          À vérifier
        </span>
      )}
      {doc.conflictsWith?.length ? (
        <span className={`${chip} border-red-200 bg-error-container text-on-error-container`}>
          <Icon name="report_problem" size={14} />
          Contradiction
        </span>
      ) : null}
    </>
  );
}

export function Keywords({ keywords }: { keywords: string[] }) {
  return (
    <div className="flex flex-wrap gap-1">
      {keywords.map((k) => (
        <span key={k} className="rounded-lg border border-slate-200 bg-slate-100 px-1.5 py-0.5 text-label-sm text-slate-600">
          {k}
        </span>
      ))}
    </div>
  );
}

/** Petit titre en capitales au-dessus des titres de section. */
export function Eyebrow({ children, className = "text-secondary" }: { children: React.ReactNode; className?: string }) {
  return <span className={`text-label-sm font-semibold tracking-wider uppercase ${className}`}>{children}</span>;
}

export const formatDate = (iso: string) =>
  new Date(iso).toLocaleDateString("fr-BE", { day: "numeric", month: "short", year: "numeric" });
