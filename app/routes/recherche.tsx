import { Link, redirect } from "react-router";
import type { Route } from "./+types/recherche";
import { Icon } from "~/components/badges";
import { regions, roles } from "~/data/taxonomy";
import { parseQuery, readCriteria, steps, toSearch, UNKNOWN, type Criteria, type CriteriaKey } from "~/lib/search";

export function meta() {
  return [{ title: "Define position · HR Compass" }];
}

export function loader({ request }: Route.LoaderArgs) {
  const url = new URL(request.url);
  const q = url.searchParams.get("q");
  // A free question is converted into criteria, which the user then verifies.
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
  // Changing sector invalidates the chosen job.
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
  if (value === UNKNOWN) return "I don't know";
  return step.options.find((o) => o.id === value)?.label ?? value;
}

export default function Recherche({ loaderData }: Route.ComponentProps) {
  const { criteria, from } = loaderData;
  const currentIndex = steps.findIndex((s) => !criteria[s.key]);
  const done = currentIndex === -1;

  return (
    <div className="mx-auto max-w-4xl">
      <h1 className="text-headline-md text-primary md:text-headline-lg">Define position</h1>

      <Stepper criteria={criteria} currentIndex={currentIndex} />

      {from && (
        <div className="mt-space-lg flex items-start gap-space-sm rounded-xl border border-outline-variant/30 bg-surface-container-low p-space-md">
          <Icon name="auto_awesome" size={20} className="text-secondary" />
          <div className="text-body-sm">
            <p className="text-label-md text-secondary">Pre-filled from your question</p>
            <p className="mt-1 text-on-surface italic">"{from}"</p>
          </div>
        </div>
      )}

      <ol className="mt-space-lg space-y-space-sm">
        {steps.map((step, i) => {
          const value = criteria[step.key];

          if (value) {
            return (
              <li
                key={step.key}
                className="flex items-center justify-between rounded-xl border border-outline-variant/40 bg-surface-container-lowest px-space-lg py-3 shadow-sm"
              >
                <div className="flex items-center gap-space-md">
                  <Icon
                    name={value === UNKNOWN ? "help" : "check_circle"}
                    size={20}
                    className={value === UNKNOWN ? "text-outline" : "text-on-tertiary-container"}
                  />
                  <div>
                    <p className="text-label-sm text-outline">{step.question}</p>
                    <p className={value === UNKNOWN ? "font-medium text-outline" : "font-semibold text-primary"}>
                      {labelOf(step, value)}
                    </p>
                  </div>
                </div>
                <Link to={withValue(criteria, from, step.key)} className="text-label-md text-secondary hover:underline">
                  Change
                </Link>
              </li>
            );
          }

          if (i !== currentIndex) {
            return (
              <li
                key={step.key}
                className="flex items-center gap-space-md rounded-xl border border-dashed border-outline-variant px-space-lg py-3 text-outline"
              >
                <span className="text-label-sm font-semibold">{String(i + 1).padStart(2, "0")}</span>
                {step.question}
              </li>
            );
          }

          return (
            <li key={step.key} className="rounded-xl border border-outline-variant/40 bg-surface-container-lowest p-space-lg shadow-md">
              <div className="flex items-center justify-between border-b border-outline-variant/20 pb-space-sm">
                <div>
                  <span className="text-label-sm font-semibold text-outline">{String(i + 1).padStart(2, "0")}</span>
                  <p className="font-display text-headline-sm text-primary">{step.question}</p>
                </div>
                <Icon name={stepIcons[step.key]} size={22} className="text-secondary" />
              </div>
              <StepOptions step={step} criteria={criteria} from={from} />
              <div className="mt-space-md flex justify-between border-t border-outline-variant/20 pt-space-sm text-body-sm">
                <Link to={withValue(criteria, from, step.key, UNKNOWN)} className="text-on-surface-variant hover:underline">
                  I don't know
                </Link>
                <Link to={`/resultats${toSearch(criteria)}`} className="font-medium text-secondary hover:underline">
                  See documents →
                </Link>
              </div>
            </li>
          );
        })}
      </ol>

      {done && (
        <div className="mt-space-lg flex flex-col items-center justify-between gap-space-md rounded-xl border border-outline-variant/40 bg-surface-container-lowest p-space-md shadow-sm sm:flex-row">
          <span />
          <Link
            to={`/resultats${toSearch(criteria)}`}
            className="inline-flex h-11 w-full items-center justify-center gap-2 rounded-lg bg-primary px-space-xl text-label-md text-on-primary shadow-md transition-all hover:bg-primary-container active:scale-95 sm:w-auto"
          >
            See documents
            <Icon name="arrow_forward" />
          </Link>
        </div>
      )}
    </div>
  );
}

const stepIcons: Record<CriteriaKey, string> = {
  sector: "domain",
  role: "work",
  province: "location_on",
  workTime: "schedule",
  contract: "badge",
  company: "apartment",
};

const stepLabels: Record<CriteriaKey, string> = {
  sector: "Sector",
  role: "Job",
  province: "Region",
  workTime: "Working time",
  contract: "Contract",
  company: "Company",
};

/** Progress bar of the journey: completed steps, current, upcoming. */
function Stepper({ criteria, currentIndex }: { criteria: Criteria; currentIndex: number }) {
  return (
    <ol className="mt-space-lg flex items-start">
      {steps.map((step, i) => {
        const done = Boolean(criteria[step.key]);
        const current = i === currentIndex;
        return (
          <li key={step.key} className="flex flex-1 flex-col gap-space-xs last:flex-none">
            <div className="flex w-full items-center">
              <span
                className={`grid size-8 shrink-0 place-items-center rounded-full text-label-md ${
                  done
                    ? "bg-primary-container text-on-primary"
                    : current
                      ? "bg-surface-container-lowest text-secondary ring-2 ring-secondary ring-offset-2"
                      : "bg-slate-200 text-slate-400"
                }`}
              >
                {done ? <Icon name="check" size={18} /> : i + 1}
              </span>
              {i < steps.length - 1 && (
                <span
                  className={`mx-1 h-0 flex-1 border-t-2 ${done ? "border-primary-container" : "border-dashed border-slate-300"}`}
                />
              )}
            </div>
            <span
              className={`hidden w-8 justify-center self-start text-label-sm whitespace-nowrap sm:flex ${
                current ? "font-semibold text-on-surface" : "text-outline"
              }`}
            >
              {stepLabels[step.key]}
            </span>
          </li>
        );
      })}
    </ol>
  );
}

function StepOptions({ step, criteria, from }: { step: Step; criteria: Criteria; from: string | null }) {
  const options = optionsFor(step, criteria);
  const button = (option: StepOption) => (
    <Link
      key={option.id}
      to={withValue(criteria, from, step.key, option.id)}
      className="rounded-lg border border-outline-variant/30 bg-surface-container-lowest px-3 py-2 text-left text-body-sm text-on-surface transition-all hover:border-secondary/40 hover:bg-surface-container"
    >
      <span className="block font-semibold">{option.label}</span>
      {option.hint && <span className="block text-label-sm text-outline">{option.hint}</span>}
    </Link>
  );

  // Provinces are grouped by region.
  if (step.key === "province") {
    return (
      <div className="mt-space-md space-y-space-md">
        {regions.map((region) => (
          <div key={region.id} className="rounded-lg border border-outline-variant/30 bg-surface-container-low p-space-md">
            <p className="mb-space-sm text-title-md text-primary">{region.label}</p>
            <div className="grid grid-cols-2 gap-2 sm:grid-cols-3">
              {options.filter((o) => "region" in o && o.region === region.id).map(button)}
            </div>
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="mt-space-md grid grid-cols-2 gap-2 rounded-lg border border-outline-variant/30 bg-surface-container-low p-space-md sm:grid-cols-3">
      {options.map(button)}
    </div>
  );
}
