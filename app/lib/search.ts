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
  { key: "sector", question: "Which sector?", options: sectors },
  { key: "role", question: "Which job?", options: roles },
  { key: "province", question: "Which region?", options: provinces },
  { key: "workTime", question: "Which working time?", options: workTimes },
  { key: "contract", question: "Which contract?", options: contractTypes },
  { key: "company", question: "Which company?", options: companies },
] as const;

export type CriteriaKey = (typeof steps)[number]["key"];
export type Criteria = Partial<Record<CriteriaKey, string>>;

export function readCriteria(params: URLSearchParams): Criteria {
  const criteria: Criteria = {};
  for (const { key } of steps) {
    const value = params.get(key);
    if (value) criteria[key] = value;
  }
  // Job determines sector when it is not known.
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

/** Pre-fills criteria from a natural language question. */
export function parseQuery(query: string): Criteria {
  const text = normalize(query);
  const criteria: Criteria = {};

  // Longest keywords first: "accountancy expert" before "accountant".
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
  matched: string[]; // criteria that precisely target this document
  imprecise: string[]; // unknown criteria: relevance not guaranteed
};

// A document targeted to a job is more relevant than a document targeted to a region, etc.
const criterionWeight = { job: 6, company: 6, sector: 4, contract: 4, province: 3, region: 3, "working time": 2 };

export function matchDocuments(criteria: Criteria): Match[] {
  const province = byId(provinces, criteria.province);
  const results: Match[] = [];

  for (const doc of documents) {
    const { scope } = doc;
    const checks: [label: keyof typeof criterionWeight, allowed: string[] | undefined, value: string | undefined][] = [
      ["sector", scope.sectors, criteria.sector],
      ["job", scope.roles, criteria.role],
      ["region", scope.regions, province?.region ?? criteria.province],
      ["province", scope.provinces, criteria.province],
      ["working time", scope.workTimes, criteria.workTime],
      ["contract", scope.contractTypes, criteria.contract],
      ["company", scope.companies, criteria.company],
    ];

    const matched: string[] = [];
    const imprecise: string[] = [];
    let excluded = false;
    let score = 0;

    for (const [label, allowed, value] of checks) {
      if (!allowed) continue;
      if (!value || value === UNKNOWN) imprecise.push(label);
      else if (allowed.includes(value)) {
        matched.push(label);
        score += criterionWeight[label];
      } else excluded = true;
    }
    if (excluded) continue;

    if (doc.status === "a-verifier") score -= 3;

    results.push({ doc, score, matched, imprecise });
  }

  // Obsolete last, then most targeted criteria, then fewest criteria to confirm,
  // then criterion weight, importance and freshness.
  return results.sort(
    (a, b) =>
      Number(a.doc.status === "obsolete") - Number(b.doc.status === "obsolete") ||
      b.matched.length - a.matched.length ||
      a.imprecise.length - b.imprecise.length ||
      b.score - a.score ||
      importanceLevels[b.doc.importance].weight - importanceLevels[a.doc.importance].weight ||
      b.doc.lastValidated.localeCompare(a.doc.lastValidated),
  );
}

export const levels = [
  { id: "ue", label: "European Union" },
  { id: "federal", label: "Federal" },
  { id: "regional", label: "Regional" },
  { id: "secteur", label: "Sector" },
  { id: "interne", label: "Internal" },
] as const;

export type LevelId = (typeof levels)[number]["id"];

export function levelOf(doc: Doc): LevelId {
  if (!doc.url) return "interne";
  if (doc.owner.team.includes("Union")) return "ue";
  if (/Region|Community|Région|Communauté/.test(doc.owner.team) || doc.scope.regions) return "regional";
  if (/^(Sector|Secteur)/.test(doc.owner.team) || doc.scope.sectors || doc.scope.roles) return "secteur";
  return "federal";
}

export type Filters = { q?: string; category?: string; level?: string; importance?: string; targeted?: boolean; sort?: "recent" };

export function readFilters(params: URLSearchParams): Filters {
  return {
    q: params.get("q")?.trim() || undefined,
    category: params.get("cat") || undefined,
    level: params.get("niveau") || undefined,
    importance: params.get("importance") || undefined,
    targeted: params.get("cible") === "1",
    sort: params.get("tri") === "recent" ? "recent" : undefined,
  };
}

export function applyFilters(matches: Match[], filters: Filters): Match[] {
  const words = filters.q ? normalize(filters.q).split(/\s+/) : [];
  const result = matches.filter(({ doc, matched }) => {
    if (filters.category && doc.category !== filters.category) return false;
    if (filters.level && levelOf(doc) !== filters.level) return false;
    if (filters.importance && doc.importance !== filters.importance) return false;
    if (filters.targeted && matched.length === 0) return false;
    if (words.length) {
      const text = normalize([doc.title, doc.summary, doc.source, ...doc.keywords].join(" "));
      if (!words.every((w) => text.includes(w))) return false;
    }
    return true;
  });
  if (filters.sort === "recent") result.sort((a, b) => b.doc.lastValidated.localeCompare(a.doc.lastValidated));
  return result;
}

export function groupByCategory(matches: Match[]) {
  return categories
    .map((category) => ({
      ...category,
      matches: matches.filter((m) => m.doc.category === (category.id as CategoryId)),
    }))
    .filter((group) => group.matches.length > 0);
}
