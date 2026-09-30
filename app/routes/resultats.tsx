import { Form, Link, useSubmit } from "react-router";
import type { Route } from "./+types/resultats";
import { CriteriaChips, formatDate, Icon, ImportanceBadge, importanceStyles, Keywords, StatusBadges } from "~/components/badges";
import { categories, importanceLevels } from "~/data/taxonomy";
import {
  applyFilters,
  groupByCategory,
  levels,
  matchDocuments,
  readCriteria,
  readFilters,
  steps,
  toSearch,
  UNKNOWN,
  type Criteria,
  type Match,
} from "~/lib/search";

export function meta() {
  return [{ title: "Documents · HR Compass" }];
}

export function loader({ request }: Route.LoaderArgs) {
  const params = new URL(request.url).searchParams;
  const criteria = readCriteria(params);
  const filters = readFilters(params);
  const matches = matchDocuments(criteria);
  const filtered = applyFilters(matches, filters);
  return { criteria, filters, groups: groupByCategory(filtered), shown: filtered.length, total: matches.length };
}

const PREVIEW = 5;

const select =
  "h-10 rounded-lg border border-slate-200 bg-surface-container-lowest px-3 text-label-md text-on-surface hover:border-slate-300";

const phaseBars = ["bg-primary", "bg-secondary", "bg-on-tertiary-container", "bg-outline", "bg-outline-variant"];

export default function Resultats({ loaderData }: Route.ComponentProps) {
  const { criteria, filters, groups, shown, total } = loaderData;
  const submit = useSubmit();
  const filtering = Boolean(filters.q || filters.category || filters.level || filters.importance || filters.targeted || filters.sort);
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
          <h1 className="text-headline-md text-primary md:text-headline-lg">Documents for this job</h1>
          <p className="mt-1 text-on-surface-variant">
            {filtering ? `${shown} sur ${total} documents` : `${total} documents`}
          </p>
        </div>
        <Link
          to={`/recherche${search}`}
          className="inline-flex h-10 items-center gap-space-xs rounded-lg border border-slate-200 bg-surface-container-lowest px-space-md text-label-md text-on-surface transition-colors hover:border-slate-300 hover:bg-slate-50"
        >
          <Icon name="tune" size={16} />
          Change
        </Link>
      </div>

      {labels.length > 0 && (
        <div className="inline-flex flex-wrap items-center gap-space-xs rounded-lg border border-outline-variant/30 bg-surface-container px-3 py-1.5 text-label-md text-primary">
          <Icon name="alt_route" className="text-secondary" />
          {labels.join(" • ")}
        </div>
      )}

      {missing.length > 0 && (
        <p className="flex items-start gap-space-sm rounded-lg border border-amber-200 bg-amber-50 px-space-md py-2 text-body-sm text-amber-800">
          <Icon name="warning" size={18} />
          <span>
            Not specified: {missing.map((s) => s.question.replace(/ \?$/, "").toLowerCase()).join(", ")}.
          </span>
        </p>
      )}

      <Form
        method="get"
        onChange={(e) => {
          // Empty filters don't clutter the URL.
          const params = new URLSearchParams([...new FormData(e.currentTarget)].filter(([, v]) => v !== "") as [string, string][]);
          submit(params, { replace: true, preventScrollReset: true });
        }}
        className="flex flex-wrap items-center gap-space-sm rounded-xl border border-outline-variant/30 bg-surface-container-low p-space-sm"
      >
        {steps.map(({ key }) => criteria[key] && <input key={key} type="hidden" name={key} value={criteria[key]} />)}
        <label className="relative min-w-48 flex-1">
          <span className="sr-only">Search</span>
          <Icon name="search" className="absolute top-1/2 left-3 -translate-y-1/2 text-outline" />
          <input
            type="search"
            name="q"
            defaultValue={filters.q}
            placeholder="Filter by keyword"
            className={`${select} w-full pl-9`}
          />
        </label>
        <select name="cat" defaultValue={filters.category ?? ""} className={select} aria-label="Category">
          <option value="">All categories</option>
          {categories.map((c) => (
            <option key={c.id} value={c.id}>{c.label}</option>
          ))}
        </select>
        <select name="niveau" defaultValue={filters.level ?? ""} className={select} aria-label="Level">
          <option value="">All levels</option>
          {levels.map((l) => (
            <option key={l.id} value={l.id}>{l.label}</option>
          ))}
        </select>
        <select name="importance" defaultValue={filters.importance ?? ""} className={select} aria-label="Importance">
          <option value="">All importance</option>
          {Object.entries(importanceLevels).map(([id, { label }]) => (
            <option key={id} value={id}>{label}</option>
          ))}
        </select>
        <select name="tri" defaultValue={filters.sort ?? ""} className={select} aria-label="Sort">
          <option value="">Sort: Relevance</option>
          <option value="recent">Sort: Most recent</option>
        </select>
        <label className="inline-flex h-10 items-center gap-2 px-1 text-label-md text-on-surface">
          <input type="checkbox" name="cible" value="1" defaultChecked={filters.targeted} className="size-4 accent-secondary" />
          Targeted to this position
        </label>
        {filtering && (
          <Link to={`/resultats${search}`} className="px-1 text-label-md text-secondary hover:underline">
            Reset
          </Link>
        )}
      </Form>

      {shown === 0 && <p className="text-body-md text-on-surface-variant">No documents match these filters.</p>}

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
                    {group.matches.length} docs
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
                <span>{legal > 0 ? `${legal} requirement${legal > 1 ? "s" : ""}` : ""}</span>
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
              {group.matches.slice(0, filters.category ? undefined : PREVIEW).map((match, rank) => (
                <DocItem key={match.doc.id} match={match} rank={rank} search={search} criteria={criteria} />
              ))}
            </ol>
            {!filters.category && group.matches.length > PREVIEW && (
              <details className="group mt-space-sm">
                <summary className="flex h-12 cursor-pointer list-none items-center justify-center gap-space-xs rounded-xl border-2 border-dashed border-secondary/50 bg-surface-container-low text-label-md font-semibold text-secondary transition-colors hover:border-secondary hover:bg-surface-container [&::-webkit-details-marker]:hidden">
                  <Icon name="expand_more" className="transition-transform group-open:rotate-180" />
                  <span className="group-open:hidden">
                    See {group.matches.length - PREVIEW} other documents
                  </span>
                  <span className="hidden group-open:inline">Hide</span>
                </summary>
                <ol className="mt-space-sm space-y-space-sm">
                  {group.matches.slice(PREVIEW).map((match, rank) => (
                    <DocItem key={match.doc.id} match={match} rank={rank + PREVIEW} search={search} criteria={criteria} />
                  ))}
                </ol>
              </details>
            )}
          </section>
        ))}
      </div>
    </div>
  );
}

function DocItem({
  match: { doc, matched, imprecise },
  rank,
  search,
  criteria,
}: {
  match: Match;
  rank: number;
  search: string;
  criteria: Criteria;
}) {
  return (
    <li>
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
                {doc.source} · {doc.owner.name} · validated on {formatDate(doc.lastValidated)}
              </p>
              <div className="flex flex-wrap gap-space-xs">
                <CriteriaChips matched={matched} imprecise={imprecise} criteria={criteria} />
              </div>
            </div>
          </div>
          <div className="hidden max-w-44 sm:block">
            <Keywords keywords={doc.keywords} />
          </div>
        </div>
      </Link>
    </li>
  );
}
