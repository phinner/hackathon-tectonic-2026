import { data, Link } from "react-router";
import type { Route } from "./+types/document";
import { formatDate, ImportanceBadge, Keywords, StatusBadges } from "~/components/badges";
import { getDocument } from "~/data/documents";
import { categories, companies, contractTypes, provinces, regions, roles, sectors, workTimes } from "~/data/taxonomy";
import { matchDocuments, readCriteria, toSearch } from "~/lib/search";

export function meta({ loaderData }: Route.MetaArgs) {
  return [{ title: `${loaderData?.doc.title ?? "Document"} · Boussole RH` }];
}

export function loader({ request, params }: Route.LoaderArgs) {
  const doc = getDocument(params.id);
  if (!doc) throw data("Document introuvable", { status: 404 });
  const criteria = readCriteria(new URL(request.url).searchParams);
  const match = matchDocuments(criteria).find((m) => m.doc.id === doc.id);
  const related = (ids?: string[]) => (ids ?? []).map(getDocument).filter((d) => d !== undefined);
  return {
    doc,
    search: toSearch(criteria),
    match: match ? { matched: match.matched, imprecise: match.imprecise } : null,
    conflicts: related(doc.conflictsWith),
    replacedBy: related(doc.replacedBy ? [doc.replacedBy] : undefined)[0],
  };
}

const labels = (list: { id: string; label: string }[], ids?: string[]) =>
  ids?.map((id) => list.find((o) => o.id === id)?.label ?? id).join(", ");

export default function Document({ loaderData }: Route.ComponentProps) {
  const { doc, search, match, conflicts, replacedBy } = loaderData;
  const category = categories.find((c) => c.id === doc.category);
  const scope = [
    ["Secteurs", labels(sectors, doc.scope.sectors)],
    ["Métiers", labels(roles, doc.scope.roles)],
    ["Régions", labels(regions, doc.scope.regions)],
    ["Provinces", labels(provinces, doc.scope.provinces)],
    ["Régime", labels(workTimes, doc.scope.workTimes)],
    ["Contrats", labels(contractTypes, doc.scope.contractTypes)],
    ["Entreprises", labels(companies, doc.scope.companies)],
  ].filter(([, value]) => value);

  return (
    <div>
      <Link to={`/resultats${search}`} className="text-sm font-medium text-brand hover:underline">
        ← Retour aux documents
      </Link>

      <div className="mt-4 grid gap-6 lg:grid-cols-[1fr_300px]">
        <article className="rounded-xl border border-slate-200 bg-white p-6">
          <div className="flex items-start justify-between gap-4">
            <p className="text-sm text-slate-500">{category?.label}</p>
            <Keywords keywords={doc.keywords} />
          </div>
          <h1 className="mt-1 text-2xl font-bold">{doc.title}</h1>
          <div className="mt-3 flex flex-wrap gap-1.5">
            <ImportanceBadge importance={doc.importance} />
            <StatusBadges doc={doc} />
          </div>

          {replacedBy && (
            <div className="mt-4 rounded-lg bg-slate-100 p-3 text-sm">
              Ce document est obsolète. Version en vigueur :{" "}
              <Link to={`/documents/${replacedBy.id}${search}`} className="font-medium text-brand hover:underline">
                {replacedBy.title}
              </Link>
            </div>
          )}
          {conflicts.length > 0 && (
            <div className="mt-4 rounded-lg bg-orange-50 p-3 text-sm text-orange-900">
              ⚠ Ce document contredit :{" "}
              {conflicts.map((c) => (
                <Link key={c.id} to={`/documents/${c.id}${search}`} className="font-medium underline">
                  {c.title}
                </Link>
              ))}
            </div>
          )}

          <p className="mt-6 text-lg text-slate-700">{doc.summary}</p>
          <div className="mt-4 space-y-3 text-slate-700">
            {doc.body.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </div>
        </article>

        <aside className="space-y-4">
          <div className="rounded-xl border border-slate-200 bg-white p-5 text-sm">
            <h2 className="font-semibold">Provenance</h2>
            <dl className="mt-3 space-y-2">
              <div>
                <dt className="text-slate-500">Source</dt>
                <dd>{doc.source}</dd>
              </div>
              <div>
                <dt className="text-slate-500">Responsable</dt>
                <dd>
                  {doc.owner.name}
                  <span className="block text-slate-500">{doc.owner.team}</span>
                </dd>
              </div>
              <div>
                <dt className="text-slate-500">Dernière validation</dt>
                <dd>{formatDate(doc.lastValidated)}</dd>
              </div>
            </dl>
          </div>

          <div className="rounded-xl border border-slate-200 bg-white p-5 text-sm">
            <h2 className="font-semibold">Portée</h2>
            {scope.length === 0 ? (
              <p className="mt-2 text-slate-600">S'applique à tous les postes.</p>
            ) : (
              <dl className="mt-3 space-y-2">
                {scope.map(([label, value]) => (
                  <div key={label}>
                    <dt className="text-slate-500">{label}</dt>
                    <dd>{value}</dd>
                  </div>
                ))}
              </dl>
            )}
            {match && (match.matched.length > 0 || match.imprecise.length > 0) && (
              <p className="mt-3 border-t border-slate-100 pt-3 text-slate-600">
                {match.matched.length > 0 && <>Correspond à votre {match.matched.join(", ")}. </>}
                {match.imprecise.length > 0 && <>À confirmer : {match.imprecise.join(", ")}.</>}
              </p>
            )}
          </div>
        </aside>
      </div>
    </div>
  );
}
