import { Link } from "react-router";
import type { Route } from "./+types/resultats";
import { formatDate, ImportanceBadge, Keywords, StatusBadges } from "~/components/badges";
import { groupByCategory, matchDocuments, readCriteria, steps, toSearch, UNKNOWN } from "~/lib/search";

export function meta() {
  return [{ title: "Documents · Boussole RH" }];
}

export function loader({ request }: Route.LoaderArgs) {
  const criteria = readCriteria(new URL(request.url).searchParams);
  const matches = matchDocuments(criteria);
  return { criteria, groups: groupByCategory(matches), total: matches.length };
}

export default function Resultats({ loaderData }: Route.ComponentProps) {
  const { criteria, groups, total } = loaderData;
  const search = toSearch(criteria);
  const missing = steps.filter((s) => !criteria[s.key] || criteria[s.key] === UNKNOWN);

  return (
    <div>
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold">Documents pour ce poste</h1>
          <p className="mt-1 text-slate-600">
            {total} documents, classés par catégorie puis par importance.
          </p>
        </div>
        <Link to={`/recherche${search}`} className="text-sm font-medium text-brand hover:underline">
          ← Modifier les critères
        </Link>
      </div>

      <div className="mt-4 flex flex-wrap gap-2">
        {steps.map((step) => {
          const value = criteria[step.key];
          if (!value || value === UNKNOWN) return null;
          const label = step.options.find((o) => o.id === value)?.label ?? value;
          return (
            <span key={step.key} className="rounded-full bg-brand-soft px-3 py-1 text-sm text-brand">
              {label}
            </span>
          );
        })}
      </div>

      {missing.length > 0 && (
        <p className="mt-4 rounded-lg bg-amber-50 px-4 py-2 text-sm text-amber-800">
          Critères non précisés : {missing.map((s) => s.question.replace(/ \?$/, "").toLowerCase()).join(", ")}. Certains
          documents peuvent ne pas s'appliquer.
        </p>
      )}

      <div className="mt-8 space-y-8">
        {groups.map((group) => (
          <section key={group.id}>
            <h2 className="text-lg font-semibold">{group.label}</h2>
            <p className="text-sm text-slate-500">{group.description}</p>
            <ol className="mt-3 space-y-3">
              {group.matches.map(({ doc, matched, imprecise }, rank) => (
                <li key={doc.id}>
                  <Link
                    to={`/documents/${doc.id}${search}`}
                    className={`block rounded-xl border bg-white p-4 hover:border-brand ${
                      doc.status === "obsolete" ? "border-slate-200 opacity-60" : "border-slate-200"
                    }`}
                  >
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex items-start gap-3">
                        <span className="mt-0.5 grid size-6 shrink-0 place-items-center rounded-full bg-slate-100 text-xs font-semibold text-slate-600">
                          {rank + 1}
                        </span>
                        <div>
                          <p className={`font-medium ${doc.status === "obsolete" ? "line-through" : ""}`}>{doc.title}</p>
                          <p className="mt-1 text-sm text-slate-600">{doc.summary}</p>
                          <div className="mt-2 flex flex-wrap items-center gap-1.5">
                            <ImportanceBadge importance={doc.importance} />
                            <StatusBadges doc={doc} />
                            <span className="text-xs text-slate-500">
                              {doc.owner.name} · validé le {formatDate(doc.lastValidated)}
                            </span>
                          </div>
                          {(matched.length > 0 || imprecise.length > 0) && (
                            <p className="mt-1 text-xs text-slate-500">
                              {matched.length > 0 && <>Ciblé sur : {matched.join(", ")}. </>}
                              {imprecise.length > 0 && <>Dépend de : {imprecise.join(", ")} (non précisé).</>}
                            </p>
                          )}
                        </div>
                      </div>
                      <div className="hidden max-w-40 sm:block">
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
