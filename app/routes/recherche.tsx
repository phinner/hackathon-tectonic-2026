import { Link, redirect } from "react-router";
import type { Route } from "./+types/recherche";
import { regions, roles } from "~/data/taxonomy";
import { parseQuery, readCriteria, steps, toSearch, UNKNOWN, type Criteria, type CriteriaKey } from "~/lib/search";

export function meta() {
  return [{ title: "Définir le poste · Boussole RH" }];
}

export function loader({ request }: Route.LoaderArgs) {
  const url = new URL(request.url);
  const q = url.searchParams.get("q");
  // Une question libre est convertie en critères, puis l'utilisateur les vérifie.
  if (q) {
    const params = new URLSearchParams(toSearch(parseQuery(q)));
    params.set("from", q);
    throw redirect(`/recherche?${params}`);
  }
  return { criteria: readCriteria(url.searchParams), from: url.searchParams.get("from") };
}

type Step = (typeof steps)[number];
type StepOption = Step["options"][number];

function withValue(criteria: Criteria, from: string | null, key: CriteriaKey, value?: string) {
  const next: Criteria = { ...criteria, [key]: value };
  // Changer de secteur invalide le métier choisi.
  if (key === "sector") delete next.role;
  const params = new URLSearchParams(toSearch(next));
  if (from) params.set("from", from);
  return `/recherche?${params}`;
}

function optionsFor(step: Step, criteria: Criteria): StepOption[] {
  if (step.key === "role" && criteria.sector && criteria.sector !== UNKNOWN) {
    return roles.filter((r) => r.sector === criteria.sector);
  }
  return [...step.options];
}

function labelOf(step: Step, value: string) {
  if (value === UNKNOWN) return "Je ne sais pas";
  return step.options.find((o) => o.id === value)?.label ?? value;
}

export default function Recherche({ loaderData }: Route.ComponentProps) {
  const { criteria, from } = loaderData;
  const currentIndex = steps.findIndex((s) => !criteria[s.key]);
  const done = currentIndex === -1;

  return (
    <div className="mx-auto max-w-2xl">
      <h1 className="text-2xl font-bold">Définir le poste à ouvrir</h1>
      <p className="mt-1 text-slate-600">Chaque réponse affine les règles qui s'appliquent.</p>

      {from && (
        <div className="mt-6 rounded-xl border border-brand/20 bg-brand-soft p-4 text-sm">
          <p className="font-medium text-brand">Pré-rempli depuis votre question</p>
          <p className="mt-1 italic text-slate-700">« {from} »</p>
          <p className="mt-1 text-slate-600">Vérifiez les réponses et complétez celles qui manquent.</p>
        </div>
      )}

      <ol className="mt-8 space-y-3">
        {steps.map((step, i) => {
          const value = criteria[step.key];

          if (value) {
            return (
              <li key={step.key} className="flex items-center justify-between rounded-xl border border-slate-200 bg-white px-5 py-3">
                <div>
                  <p className="text-xs text-slate-500">{step.question}</p>
                  <p className={value === UNKNOWN ? "font-medium text-slate-400" : "font-medium"}>{labelOf(step, value)}</p>
                </div>
                <Link to={withValue(criteria, from, step.key)} className="text-sm text-brand hover:underline">
                  Modifier
                </Link>
              </li>
            );
          }

          if (i !== currentIndex) {
            return (
              <li key={step.key} className="rounded-xl border border-dashed border-slate-200 px-5 py-3 text-slate-400">
                {step.question}
              </li>
            );
          }

          return (
            <li key={step.key} className="rounded-xl border-2 border-brand bg-white p-5 shadow-sm">
              <p className="font-semibold">{step.question}</p>
              <StepOptions step={step} criteria={criteria} from={from} />
              <div className="mt-4 flex justify-between text-sm">
                <Link to={withValue(criteria, from, step.key, UNKNOWN)} className="text-slate-500 hover:underline">
                  Je ne sais pas
                </Link>
                <Link to={`/resultats${toSearch(criteria)}`} className="text-slate-500 hover:underline">
                  Voir les documents maintenant →
                </Link>
              </div>
            </li>
          );
        })}
      </ol>

      {done && (
        <div className="mt-8 flex justify-end">
          <Link to={`/resultats${toSearch(criteria)}`} className="rounded-lg bg-brand px-5 py-2.5 font-medium text-white hover:bg-brand/90">
            Voir les documents
          </Link>
        </div>
      )}
    </div>
  );
}

function StepOptions({ step, criteria, from }: { step: Step; criteria: Criteria; from: string | null }) {
  const options = optionsFor(step, criteria);
  const button = (option: StepOption) => (
    <Link
      key={option.id}
      to={withValue(criteria, from, step.key, option.id)}
      className="rounded-lg border border-slate-200 px-3 py-2 text-left hover:border-brand hover:bg-brand-soft"
    >
      <span className="block font-medium">{option.label}</span>
      {option.hint && <span className="block text-xs text-slate-500">{option.hint}</span>}
    </Link>
  );

  // Les provinces sont regroupées par région.
  if (step.key === "province") {
    return (
      <div className="mt-3 space-y-3">
        {regions.map((region) => (
          <div key={region.id}>
            <p className="mb-1 text-xs font-semibold uppercase tracking-wide text-slate-500">{region.label}</p>
            <div className="grid grid-cols-2 gap-2 sm:grid-cols-3">
              {options.filter((o) => "region" in o && o.region === region.id).map(button)}
            </div>
          </div>
        ))}
      </div>
    );
  }

  return <div className="mt-3 grid grid-cols-2 gap-2 sm:grid-cols-3">{options.map(button)}</div>;
}
