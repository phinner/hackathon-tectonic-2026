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
  { key: "sector", question: "Quel secteur ?", options: sectors },
  { key: "role", question: "Quel métier ?", options: roles },
  { key: "province", question: "Quelle zone ?", options: provinces },
  { key: "workTime", question: "Quel régime ?", options: workTimes },
  { key: "contract", question: "Quel contrat ?", options: contractTypes },
  { key: "company", question: "Quelle entreprise ?", options: companies },
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

// Un document ciblé sur le métier est plus pertinent qu'un document ciblé sur la région, etc.
const criterionWeight = { métier: 6, entreprise: 6, secteur: 4, contrat: 4, province: 3, région: 3, régime: 2 };

export function matchDocuments(criteria: Criteria): Match[] {
  const province = byId(provinces, criteria.province);
  const results: Match[] = [];

  for (const doc of documents) {
    const { scope } = doc;
    const checks: [label: keyof typeof criterionWeight, allowed: string[] | undefined, value: string | undefined][] = [
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
    let score = importanceLevels[doc.importance].weight * 2;

    for (const [label, allowed, value] of checks) {
      if (!allowed) continue;
      if (!value || value === UNKNOWN) {
        imprecise.push(label);
        score -= 2;
      } else if (allowed.includes(value)) {
        matched.push(label);
        score += criterionWeight[label];
      } else excluded = true;
    }
    if (excluded) continue;

    if (doc.status === "obsolete") score -= 100;
    if (doc.status === "a-verifier") score -= 3;

    results.push({ doc, score, matched, imprecise });
  }

  return results.sort((a, b) => b.score - a.score || b.doc.lastValidated.localeCompare(a.doc.lastValidated));
}

export const levels = [
  { id: "ue", label: "Union européenne" },
  { id: "federal", label: "Fédéral" },
  { id: "regional", label: "Régional" },
  { id: "secteur", label: "Secteur" },
  { id: "interne", label: "Interne" },
] as const;

export type LevelId = (typeof levels)[number]["id"];

export function levelOf(doc: Doc): LevelId {
  if (!doc.url) return "interne";
  if (doc.owner.team.includes("Union")) return "ue";
  if (/Région|Communauté/.test(doc.owner.team) || doc.scope.regions) return "regional";
  if (doc.owner.team.startsWith("Secteur") || doc.scope.sectors || doc.scope.roles) return "secteur";
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
