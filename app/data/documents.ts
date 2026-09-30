// Documents de référence : sources publiques (sources.ts, générées par .research/merge.py)
// et règles internes des clients, fictives pour la démo.

import { sourceDocuments } from "./sources";
import type { CategoryId, Importance, RegionId } from "./taxonomy";

export type Doc = {
  id: string;
  title: string;
  category: CategoryId;
  importance: Importance;
  summary: string;
  body: string[];
  keywords: string[];
  // Portée : un champ absent signifie « s'applique à tous ».
  scope: {
    sectors?: string[];
    roles?: string[];
    regions?: RegionId[];
    provinces?: string[];
    workTimes?: string[];
    contractTypes?: string[];
    companies?: string[];
  };
  // Signaux de confiance
  source: string;
  url?: string;
  owner: { name: string; team: string };
  lastValidated: string; // ISO date
  status: "valide" | "obsolete" | "a-verifier";
  replacedBy?: string;
  conflictsWith?: string[];
};

const internalDocuments: Doc[] = [
  // --- Règles internes -----------------------------------------------------
  {
    id: "interne-fiduciaire-meuse-grille",
    title: "Fiduciaire Meuse : grille salariale interne",
    category: "interne",
    importance: "policy",
    summary: "Le client paie 5 % au-dessus du barème sectoriel pour les profils certifiés.",
    body: ["Politique convenue avec le client en 2025 : barème CP 200 + 5 % pour les experts-comptables inscrits."],
    keywords: ["grille interne", "client"],
    scope: { companies: ["fiduciaire-meuse"] },
    source: "E-mail client · dossier Fiduciaire Meuse",
    owner: { name: "Thomas Leroy", team: "Payroll Consultant Namur" },
    lastValidated: "2025-08-22",
    status: "valide",
  },
  {
    id: "interne-fiduciaire-meuse-teletravail",
    title: "Fiduciaire Meuse : politique de télétravail",
    category: "interne",
    importance: "policy",
    summary: "2 jours de télétravail par semaine après la période d'intégration de 3 mois.",
    body: ["À mentionner dans l'annonce : c'est un argument d'attractivité validé par le client."],
    keywords: ["télétravail"],
    scope: { companies: ["fiduciaire-meuse"] },
    source: "SharePoint · Clients/Fiduciaire Meuse",
    owner: { name: "Thomas Leroy", team: "Payroll Consultant Namur" },
    lastValidated: "2026-02-10",
    status: "valide",
  },
  {
    id: "interne-bricoplus-recrutement",
    title: "BricoPlus : processus de validation des recrutements",
    category: "interne",
    importance: "policy",
    summary: "Toute ouverture de poste passe par la validation du directeur régional.",
    body: ["Le gérant de magasin soumet la demande ; le directeur régional valide sous 5 jours."],
    keywords: ["validation", "processus"],
    scope: { companies: ["brico-plus"] },
    source: "SharePoint · Clients/BricoPlus",
    owner: { name: "An Peeters", team: "Key Account Retail" },
    lastValidated: "2026-03-15",
    status: "valide",
  },
  {
    id: "interne-sdworx-mobilite",
    title: "SD Worx : priorité à la mobilité interne",
    category: "interne",
    importance: "policy",
    summary: "Les postes sont publiés en interne 10 jours avant toute diffusion externe.",
    body: ["Publier d'abord sur le portail carrière interne, puis sur les canaux externes."],
    keywords: ["mobilité interne"],
    scope: { companies: ["sdworx"] },
    source: "Intranet · People & Culture",
    owner: { name: "Nadia Benali", team: "Talent Acquisition" },
    lastValidated: "2026-01-20",
    status: "valide",
  },

  {
    id: "demarche-namur-permanence",
    title: "Permanence juridique : bureau de Namur",
    category: "demarches",
    importance: "guidance",
    summary: "Le bureau de Namur tient une permanence le jeudi pour les questions d'embauche.",
    body: ["Contact : Thomas Leroy. Réponse sous 24 h pour les dossiers urgents."],
    keywords: ["permanence", "contact", "expert"],
    scope: { provinces: ["namur"] },
    source: "Teams · #bureau-namur",
    owner: { name: "Thomas Leroy", team: "Payroll Consultant Namur" },
    lastValidated: "2026-09-01",
    status: "valide",
  },
];

export const documents: Doc[] = [...sourceDocuments, ...internalDocuments];

export const getDocument = (id: string) => documents.find((d) => d.id === id);
