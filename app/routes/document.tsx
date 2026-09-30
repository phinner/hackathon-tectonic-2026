import { data, Link } from "react-router";
import type { Route } from "./+types/document";
import { Eyebrow, formatDate, Icon, ImportanceBadge, importanceStyles, Keywords, StatusBadges } from "~/components/badges";
import { getDocument } from "~/data/documents";
import { categories, companies, contractTypes, provinces, regions, roles, sectors, workTimes } from "~/data/taxonomy";
import { matchDocuments, readCriteria, toSearch } from "~/lib/search";

export function meta({ loaderData }: Route.MetaArgs) {
  return [{ title: `${loaderData?.doc.title ?? "Document"} · HR Compass` }];
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

  const provenance = [
    { icon: "account_balance", label: "Source", value: doc.source },
    { icon: "person", label: "Responsable", value: doc.owner.name, detail: doc.owner.team },
    { icon: "schedule", label: "Validé le", value: formatDate(doc.lastValidated) },
  ];

  return (
    <div>
      <Link to={`/resultats${search}`} className="inline-flex items-center gap-1 text-label-md text-secondary hover:underline">
        <Icon name="arrow_back" size={16} />
        Documents
      </Link>

      <div className="mt-space-md grid gap-space-lg lg:grid-cols-[1fr_320px]">
        <article
          className={`rounded-xl border border-l-4 border-outline-variant/40 bg-surface-container-lowest p-space-lg shadow-md md:p-space-xl ${
            importanceStyles[doc.importance].bar
          }`}
        >
          <div className="flex items-start justify-between gap-space-md">
            <Eyebrow>{category?.label}</Eyebrow>
            <Keywords keywords={doc.keywords} />
          </div>
          <h1 className="mt-space-sm text-headline-md text-primary">{doc.title}</h1>
          <div className="mt-space-sm flex flex-wrap gap-space-xs">
            <ImportanceBadge importance={doc.importance} />
            <StatusBadges doc={doc} />
          </div>

          {replacedBy && (
            <div className="mt-space-md flex items-start gap-space-sm rounded-lg border border-slate-200 bg-slate-100 p-3 text-body-sm">
              <Icon name="history" className="text-slate-500" />
              <p>
                Obsolète. Version en vigueur :{" "}
                <Link to={`/documents/${replacedBy.id}${search}`} className="font-semibold text-secondary hover:underline">
                  {replacedBy.title}
                </Link>
              </p>
            </div>
          )}
          {conflicts.length > 0 && (
            <div className="mt-space-md flex items-start gap-space-sm rounded-lg border border-red-200 bg-error-container p-3 text-body-sm text-on-error-container">
              <Icon name="report_problem" />
              <p>
                Contredit :{" "}
                {conflicts.map((c) => (
                  <Link key={c.id} to={`/documents/${c.id}${search}`} className="font-semibold underline">
                    {c.title}
                  </Link>
                ))}
              </p>
            </div>
          )}

          <p className="mt-space-lg text-body-lg font-medium text-on-surface">{doc.summary}</p>
          <div className="mt-space-md space-y-3 text-body-lg text-on-surface-variant">
            {doc.body.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </div>
        </article>

        <aside className="space-y-space-md">
          <div className="rounded-xl border border-outline-variant/40 bg-surface-container-lowest p-space-lg shadow-sm">
            <div className="flex items-center justify-between">
              <h2 className="text-title-md text-primary">Provenance</h2>
              <Icon name="verified_user" size={20} className="text-secondary" />
            </div>
            <dl className="mt-space-md space-y-3">
              {provenance.map((item) => (
                <div key={item.label} className="flex items-start gap-space-sm">
                  <Icon name={item.icon} className="mt-0.5 text-outline" />
                  <div>
                    <dt className="text-label-sm text-outline">{item.label}</dt>
                    <dd className="text-body-sm font-medium text-on-surface">
                      {item.value}
                      {item.detail && <span className="block font-normal text-on-surface-variant">{item.detail}</span>}
                    </dd>
                  </div>
                </div>
              ))}
            </dl>
            {doc.url && (
              <a
                href={doc.url}
                target="_blank"
                rel="noreferrer"
                className="mt-space-md inline-flex items-center gap-1 text-label-md text-secondary hover:underline"
              >
                Consulter la source
                <Icon name="open_in_new" size={16} />
              </a>
            )}
          </div>

          <div className="rounded-xl border border-outline-variant/40 bg-surface-container-lowest p-space-lg shadow-sm">
            <div className="flex items-center justify-between">
              <h2 className="text-title-md text-primary">Portée</h2>
              <Icon name="alt_route" size={20} className="text-secondary" />
            </div>
            {scope.length === 0 ? (
              <p className="mt-space-sm text-body-sm text-on-surface-variant">S'applique à tous les postes.</p>
            ) : (
              <dl className="mt-space-md divide-y divide-slate-100 text-body-sm">
                {scope.map(([label, value]) => (
                  <div key={label} className="flex justify-between gap-space-md py-2">
                    <dt className="text-outline">{label}</dt>
                    <dd className="text-right font-medium text-on-surface">{value}</dd>
                  </div>
                ))}
              </dl>
            )}
            {match && (match.matched.length > 0 || match.imprecise.length > 0) && (
              <p className="mt-space-sm rounded-lg bg-surface-container-low p-3 text-body-sm text-on-surface-variant">
                {match.matched.length > 0 && <>Correspond : {match.matched.join(", ")}. </>}
                {match.imprecise.length > 0 && <>À confirmer : {match.imprecise.join(", ")}.</>}
              </p>
            )}
          </div>
        </aside>
      </div>
    </div>
  );
}
