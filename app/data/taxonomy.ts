// Données fictives pour la démo. Aucune valeur n'est juridiquement vérifiée.

export type Option = { id: string; label: string; hint?: string };

export const sectors: (Option & { committee: string })[] = [
  { id: "finance", label: "Comptabilité & finance", committee: "CP 200", hint: "Fiduciaires, cabinets, services financiers" },
  { id: "it", label: "IT & télécoms", committee: "CP 200", hint: "Éditeurs, ESN, intégrateurs" },
  { id: "construction", label: "Construction", committee: "CP 124", hint: "Gros œuvre, parachèvement" },
  { id: "sante", label: "Soins de santé", committee: "CP 330", hint: "Hôpitaux, maisons de repos" },
  { id: "commerce", label: "Commerce de détail", committee: "CP 311", hint: "Magasins, grande distribution" },
  { id: "horeca", label: "Horeca", committee: "CP 302", hint: "Hôtels, restaurants, cafés" },
];

export const roles: (Option & { sector: string; keywords: string[] })[] = [
  { id: "expert-comptable", sector: "finance", label: "Expert-comptable", keywords: ["expert comptable", "expert-comptable"] },
  { id: "comptable", sector: "finance", label: "Comptable", keywords: ["comptable"] },
  { id: "controleur-gestion", sector: "finance", label: "Contrôleur de gestion", keywords: ["controleur de gestion", "contrôleur de gestion"] },
  { id: "developpeur", sector: "it", label: "Développeur·euse", keywords: ["developpeur", "développeur", "developpeuse", "dev"] },
  { id: "admin-systeme", sector: "it", label: "Administrateur·rice système", keywords: ["admin systeme", "administrateur systeme", "sysadmin"] },
  { id: "chef-chantier", sector: "construction", label: "Chef de chantier", keywords: ["chef de chantier"] },
  { id: "macon", sector: "construction", label: "Maçon", keywords: ["macon", "maçon"] },
  { id: "infirmier", sector: "sante", label: "Infirmier·ère", keywords: ["infirmier", "infirmiere", "infirmière"] },
  { id: "aide-soignant", sector: "sante", label: "Aide-soignant·e", keywords: ["aide soignant", "aide-soignant"] },
  { id: "vendeur", sector: "commerce", label: "Vendeur·euse", keywords: ["vendeur", "vendeuse"] },
  { id: "gerant-magasin", sector: "commerce", label: "Gérant·e de magasin", keywords: ["gerant", "gérant"] },
  { id: "cuisinier", sector: "horeca", label: "Cuisinier·ère", keywords: ["cuisinier", "cuisiniere", "chef cuisinier"] },
  { id: "serveur", sector: "horeca", label: "Serveur·euse", keywords: ["serveur", "serveuse"] },
];

export type RegionId = "wallonie" | "flandre" | "bruxelles";

export const regions: (Option & { id: RegionId; language: string })[] = [
  { id: "wallonie", label: "Wallonie", language: "français" },
  { id: "flandre", label: "Flandre", language: "néerlandais" },
  { id: "bruxelles", label: "Bruxelles-Capitale", language: "français / néerlandais" },
];

export const provinces: (Option & { region: RegionId; keywords: string[] })[] = [
  { id: "namur", region: "wallonie", label: "Namur", keywords: ["namur"] },
  { id: "liege", region: "wallonie", label: "Liège", keywords: ["liege", "liège"] },
  { id: "hainaut", region: "wallonie", label: "Hainaut", keywords: ["hainaut", "mons", "charleroi"] },
  { id: "luxembourg", region: "wallonie", label: "Luxembourg", keywords: ["arlon", "province de luxembourg"] },
  { id: "brabant-wallon", region: "wallonie", label: "Brabant wallon", keywords: ["brabant wallon", "wavre", "louvain-la-neuve"] },
  { id: "bruxelles", region: "bruxelles", label: "Bruxelles", keywords: ["bruxelles", "brussel", "brussels"] },
  { id: "anvers", region: "flandre", label: "Anvers", keywords: ["anvers", "antwerpen"] },
  { id: "flandre-orientale", region: "flandre", label: "Flandre-Orientale", keywords: ["gand", "gent", "flandre orientale"] },
  { id: "flandre-occidentale", region: "flandre", label: "Flandre-Occidentale", keywords: ["bruges", "brugge", "flandre occidentale"] },
  { id: "brabant-flamand", region: "flandre", label: "Brabant flamand", keywords: ["louvain", "leuven", "brabant flamand"] },
  { id: "limbourg", region: "flandre", label: "Limbourg", keywords: ["hasselt", "limbourg"] },
];

export const workTimes: (Option & { keywords: string[] })[] = [
  { id: "temps-plein", label: "Temps plein", keywords: ["temps plein", "temps-plein", "full time"] },
  { id: "temps-partiel", label: "Temps partiel", keywords: ["temps partiel", "mi-temps", "4/5", "part time"] },
];

export const contractTypes: (Option & { keywords: string[] })[] = [
  { id: "cdi", label: "CDI", hint: "Durée indéterminée", keywords: ["cdi", "duree indeterminee"] },
  { id: "cdd", label: "CDD", hint: "Durée déterminée", keywords: ["cdd", "duree determinee"] },
  { id: "etudiant", label: "Étudiant", hint: "Contrat d'occupation étudiant", keywords: ["etudiant", "jobiste"] },
];

export const companies: Option[] = [
  { id: "fiduciaire-meuse", label: "Fiduciaire Meuse SRL", hint: "Client · 45 employés · Namur" },
  { id: "brico-plus", label: "BricoPlus SA", hint: "Client · 1 200 employés · national" },
  { id: "sdworx", label: "SD Worx (interne)", hint: "Recrutement interne" },
];

export const categories = [
  { id: "offre", label: "Contenu de l'offre d'emploi", description: "Ce que l'annonce doit contenir ou éviter." },
  { id: "restrictions", label: "Restrictions & conditions d'accès", description: "Diplômes, agréments, interdictions." },
  { id: "contrat", label: "Contrat & rémunération", description: "Barèmes, clauses, durée du travail." },
  { id: "interne", label: "Règles internes de l'entreprise", description: "Politiques propres à l'employeur." },
  { id: "demarches", label: "Démarches & aides", description: "Formalités et aides à l'embauche." },
] as const;

export type CategoryId = (typeof categories)[number]["id"];

export const importanceLevels = {
  legal: { label: "Obligation légale", weight: 3 },
  policy: { label: "Politique interne", weight: 2 },
  guidance: { label: "Recommandation", weight: 1 },
} as const;

export type Importance = keyof typeof importanceLevels;

export const byId = <T extends Option>(list: T[], id?: string | null) =>
  list.find((o) => o.id === id);
