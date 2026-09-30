import { Link } from "react-router";
import type { Route } from "./+types/resultats";
import { Eyebrow, formatDate, Icon, ImportanceBadge, importanceStyles, Keywords, StatusBadges } from "~/components/badges";
import { groupByCategory, matchDocuments, readCriteria, steps, toSearch, UNKNOWN } from "~/lib/search";

export function meta() {
  return [{ title: "Documents · HR Compass" }];
}

export function loader({ request }: Route.LoaderArgs) {
  const criteria = readCriteria(new URL(request.url).searchParams);
  const matches = matchDocuments(criteria);
  return { criteria, groups: groupByCategory(matches), total: matches.length };
}

const phaseBars = ["bg-primary", "bg-secondary", "bg-on-tertiary-container", "bg-outline", "bg-outline-variant"];

export default function Resultats({ loaderData }: Route.ComponentProps) {
  const { criteria, groups, total } = loaderData;
  const search = toSearch(criteria);
  const missing = steps.filter((s) => !criteria[s.key] || criteria[s.key] === UNKNOWN);
  const labels = steps.flatMap((step) => {
    const value = criteria[step.key];
    if (!value || value === UNKNOWN) return [];
    return [step.options.find((o) => o.id === value)?.label ?? value];
  });

  return (
    <div className="space-y-space-lg">
      <div className="flex flex-col justify-between gap-space-sm md:flex-row md:items-end">
        <div>
          <Eyebrow>Synthèse</Eyebrow>
          <h1 className="mt-0.5 text-headline-md text-primary md:text-headline-lg">Documents pour ce poste</h1>
          <p className="mt-1 text-on-surface-variant">{total} documents, classés par catégorie puis par importance.</p>
        </div>
        <Link
          to={`/recherche${search}`}
          className="inline-flex h-10 items-center gap-space-xs rounded-lg border border-slate-200 bg-surface-container-lowest px-space-md text-label-md text-on-surface transition-colors hover:border-slate-300 hover:bg-slate-50"
        >
          <Icon name="tune" size={16} />
          Modifier les critères
        </Link>
      </div>

      {labels.length > 0 && (
        <div className="inline-flex flex-wrap items-center gap-space-xs rounded-lg border border-outline-variant/30 bg-surface-container px-3 py-1.5 text-label-md text-primary">
          <Icon name="alt_route" className="text-secondary" />
          Votre parcours : {labels.join(" • ")}
        </div>
      )}

      {missing.length > 0 && (
        <p className="flex items-start gap-space-sm rounded-lg border border-amber-200 bg-amber-50 px-space-md py-2 text-body-sm text-amber-800">
          <Icon name="warning" size={18} />
          <span>
            Critères non précisés : {missing.map((s) => s.question.replace(/ \?$/, "").toLowerCase()).join(", ")}. Certains
            documents peuvent ne pas s'appliquer.
          </span>
        </p>
      )}

      <div className="grid gap-space-md md:grid-cols-2 lg:grid-cols-4">
        {groups.map((group, i) => {
          const legal = group.matches.filter((m) => m.doc.importance === "legal").length;
          return (
            <a
              key={group.id}
              href={`#${group.id}`}
              className="relative flex flex-col justify-between overflow-hidden rounded-xl border border-outline-variant/30 bg-surface-container-lowest p-space-md shadow-sm transition-shadow hover:shadow-md"
            >
              <div className={`absolute inset-x-0 top-0 h-1 ${phaseBars[i % phaseBars.length]}`} />
              <div>
                <div className="mb-space-sm flex items-center justify-between pt-1">
                  <span className="text-label-sm font-semibold text-outline">{String(i + 1).padStart(2, "0")}</span>
                  <span className="rounded-lg bg-surface-container px-2 py-0.5 text-label-sm font-semibold text-on-surface-variant">
                    {group.matches.length} doc.
                  </span>
                </div>
                <h3 className="mb-2 text-title-md text-primary">{group.label}</h3>
                <ul className="space-y-1.5 text-body-sm text-on-surface-variant">
                  {group.matches.slice(0, 3).map(({ doc }) => (
                    <li key={doc.id} className="flex items-start gap-1.5">
                      <Icon
                        name={doc.importance === "legal" ? "check_circle" : "pending"}
                        size={16}
                        className={`mt-0.5 ${doc.importance === "legal" ? "text-on-tertiary-container" : "text-secondary"}`}
                      />
                      <span className="line-clamp-2">{doc.title}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="mt-space-md flex items-center justify-between border-t border-outline-variant/20 pt-space-xs text-label-sm text-on-surface-variant">
                <span>{legal > 0 ? `${legal} obligation${legal > 1 ? "s" : ""}` : "Pas d'obligation"}</span>
                <Icon name="south" size={14} className="text-secondary" />
              </div>
            </a>
          );
        })}
      </div>

      <div className="space-y-space-xl pt-space-md">
        {groups.map((group) => (
          <section key={group.id} id={group.id} className="scroll-mt-20">
            <h2 className="text-headline-sm text-primary">{group.label}</h2>
            <p className="text-body-sm text-on-surface-variant">{group.description}</p>
            <ol className="mt-space-md space-y-space-sm">
              {group.matches.map(({ doc, matched, imprecise }, rank) => (
                <li key={doc.id}>
                  <Link
                    to={`/documents/${doc.id}${search}`}
                    className={`block rounded-xl border border-l-4 border-outline-variant/40 bg-surface-container-lowest p-space-md shadow-sm transition-shadow hover:border-slate-300 hover:shadow-md ${
                      importanceStyles[doc.importance].bar
                    } ${doc.status === "obsolete" ? "opacity-60" : ""}`}
                  >
                    <div className="flex items-start justify-between gap-space-md">
                      <div className="flex items-start gap-3">
                        <span className="mt-0.5 grid size-6 shrink-0 place-items-center rounded-full bg-surface-container text-label-md text-primary">
                          {rank + 1}
                        </span>
                        <div className="space-y-2">
                          <div className="flex flex-wrap items-center gap-space-xs">
                            <ImportanceBadge importance={doc.importance} />
                            <StatusBadges doc={doc} />
                          </div>
                          <p className={`text-title-md text-primary ${doc.status === "obsolete" ? "line-through" : ""}`}>
                            {doc.title}
                          </p>
                          <p className="text-body-sm text-on-surface-variant">{doc.summary}</p>
                          <p className="flex items-center gap-1 text-label-sm text-outline">
                            <Icon name="verified_user" size={14} className="text-secondary" />
                            {doc.source} · {doc.owner.name} · validé le {formatDate(doc.lastValidated)}
                          </p>
                          {(matched.length > 0 || imprecise.length > 0) && (
                            <p className="text-label-sm text-outline italic">
                              {matched.length > 0 && <>Ciblé sur : {matched.join(", ")}. </>}
                              {imprecise.length > 0 && <>Dépend de : {imprecise.join(", ")} (non précisé).</>}
                            </p>
                          )}
                        </div>
                      </div>
                      <div className="hidden max-w-44 sm:block">
                        <Keywords keywords={doc.keywords} />
                      </div>
                    </div>
                  </Link>
                </li>
              ))}
            </ol>
          </section>
        ))}
      </div>
    </div>
  );
}
