import { documents, type Doc } from "~/data/documents";
import {
  byId,
  categories,
  companies,
  contractTypes,
  importanceLevels,
  provinces,
  roles,
  sectors,
  workTimes,
  type CategoryId,
} from "~/data/taxonomy";

export const UNKNOWN = "inconnu";

export const steps = [
  { key: "sector", question: "Dans quel secteur ?", options: sectors },
  { key: "role", question: "Quel métier ?", options: roles },
  { key: "province", question: "Quelle zone géographique ?", options: provinces },
  { key: "workTime", question: "Quel régime de travail ?", options: workTimes },
  { key: "contract", question: "Quel type de contrat ?", options: contractTypes },
  { key: "company", question: "Pour quelle entreprise ?", options: companies },
] as const;

export type CriteriaKey = (typeof steps)[number]["key"];
export type Criteria = Partial<Record<CriteriaKey, string>>;

export function readCriteria(params: URLSearchParams): Criteria {
  const criteria: Criteria = {};
  for (const { key } of steps) {
    const value = params.get(key);
    if (value) criteria[key] = value;
  }
  // Le métier détermine le secteur quand celui-ci n'est pas connu.
  const role = byId(roles, criteria.role);
  if (role && (!criteria.sector || criteria.sector === UNKNOWN)) criteria.sector = role.sector;
  return criteria;
}

export function toSearch(criteria: Criteria) {
  const params = new URLSearchParams();
  for (const { key } of steps) {
    const value = criteria[key];
    if (value) params.set(key, value);
  }
  return `?${params}`;
}

const normalize = (s: string) =>
  s.toLowerCase().normalize("NFD").replace(/[̀-ͯ]/g, "").replace(/-/g, " ");

const mentions = (text: string, keywords: string[]) =>
  keywords.some((k) => new RegExp(`\\b${normalize(k)}\\b`).test(text));

/** Pré-remplit les critères à partir d'une question en langage naturel. */
export function parseQuery(query: string): Criteria {
  const text = normalize(query);
  const criteria: Criteria = {};

  // Les mots-clés les plus longs d'abord : « expert comptable » avant « comptable ».
  const role = [...roles]
    .sort((a, b) => Math.max(...b.keywords.map((k) => k.length)) - Math.max(...a.keywords.map((k) => k.length)))
    .find((r) => mentions(text, r.keywords));
  if (role) {
    criteria.role = role.id;
    criteria.sector = role.sector;
  }

  const province = provinces.find((p) => mentions(text, [p.label, ...p.keywords]));
  if (province) criteria.province = province.id;

  const workTime = workTimes.find((w) => mentions(text, w.keywords));
  if (workTime) criteria.workTime = workTime.id;

  const contract = contractTypes.find((c) => mentions(text, c.keywords));
  if (contract) criteria.contract = contract.id;

  return criteria;
}

export type Match = {
  doc: Doc;
  score: number;
  matched: string[]; // critères qui ciblent précisément ce document
  imprecise: string[]; // critères inconnus : pertinence non garantie
};

export function matchDocuments(criteria: Criteria): Match[] {
  const province = byId(provinces, criteria.province);
  const results: Match[] = [];

  for (const doc of documents) {
    const { scope } = doc;
    const checks: [label: string, allowed: string[] | undefined, value: string | undefined][] = [
      ["secteur", scope.sectors, criteria.sector],
      ["métier", scope.roles, criteria.role],
      ["région", scope.regions, province?.region ?? criteria.province],
      ["province", scope.provinces, criteria.province],
      ["régime", scope.workTimes, criteria.workTime],
      ["contrat", scope.contractTypes, criteria.contract],
      ["entreprise", scope.companies, criteria.company],
    ];

    const matched: string[] = [];
    const imprecise: string[] = [];
    let excluded = false;

    for (const [label, allowed, value] of checks) {
      if (!allowed) continue;
      if (!value || value === UNKNOWN) imprecise.push(label);
      else if (allowed.includes(value)) matched.push(label);
      else excluded = true;
    }
    if (excluded) continue;

    const score =
      importanceLevels[doc.importance].weight * 10 +
      matched.length * 2 -
      imprecise.length * 3 -
      (doc.status === "obsolete" ? 100 : 0);

    results.push({ doc, score, matched, imprecise });
  }

  return results.sort((a, b) => b.score - a.score);
}

export function groupByCategory(matches: Match[]) {
  return categories
    .map((category) => ({
      ...category,
      matches: matches.filter((m) => m.doc.category === (category.id as CategoryId)),
    }))
    .filter((group) => group.matches.length > 0);
}
