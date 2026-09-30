// Search criteria taxonomy.

export type Option = { id: string; label: string; hint?: string };

export const sectors: (Option & { committee: string })[] = [
  { id: "finance", label: "Accounting & Finance", committee: "CP 200", hint: "Audit firms, accounting firms, financial services" },
  { id: "it", label: "IT & Telecoms", committee: "CP 200", hint: "Software publishers, IT consultancies, systems integrators" },
  { id: "construction", label: "Construction", committee: "CP 124", hint: "General construction, finishing work" },
  { id: "sante", label: "Healthcare", committee: "CP 330", hint: "Hospitals, care homes" },
  { id: "commerce", label: "Retail", committee: "CP 201 / 311", hint: "Retail stores, supermarkets" },
  { id: "horeca", label: "Hospitality", committee: "CP 302", hint: "Hotels, restaurants, cafés" },
  { id: "logistique", label: "Transport & Logistics", committee: "CP 140.03 / 226", hint: "Road transport, warehouses" },
  { id: "industrie", label: "Advanced Manufacturing", committee: "CP 111 / 209", hint: "Metal, fabrication, maintenance" },
  { id: "nettoyage", label: "Cleaning", committee: "CP 121", hint: "Office cleaning, industrial site maintenance" },
];

export const roles: (Option & { sector: string; keywords: string[] })[] = [
  { id: "expert-comptable", sector: "finance", label: "Chartered Accountant", keywords: ["expert comptable", "expert-comptable", "chartered accountant"] },
  { id: "comptable", sector: "finance", label: "Accountant", keywords: ["comptable", "accountant"] },
  { id: "controleur-gestion", sector: "finance", label: "Management Accountant", keywords: ["controleur de gestion", "contrôleur de gestion", "management accountant"] },
  { id: "gestionnaire-paie", sector: "finance", label: "Payroll Manager", keywords: ["gestionnaire de paie", "payroll", "paie"] },
  { id: "developpeur", sector: "it", label: "Developer", keywords: ["developpeur", "développeur", "developpeuse", "dev", "developer"] },
  { id: "admin-systeme", sector: "it", label: "Systems Administrator", keywords: ["admin systeme", "administrateur systeme", "sysadmin", "systems administrator"] },
  { id: "analyste-fonctionnel", sector: "it", label: "Business Analyst", keywords: ["analyste fonctionnel", "business analyst"] },
  { id: "technicien-helpdesk", sector: "it", label: "Helpdesk Technician", keywords: ["helpdesk", "support informatique", "technicien support", "helpdesk technician"] },
  { id: "chef-chantier", sector: "construction", label: "Site Manager", keywords: ["chef de chantier", "site manager"] },
  { id: "macon", sector: "construction", label: "Mason", keywords: ["macon", "maçon", "mason"] },
  { id: "couvreur", sector: "construction", label: "Roofer", keywords: ["couvreur", "toiture", "roofer"] },
  { id: "conducteur-engins", sector: "construction", label: "Equipment Operator", keywords: ["conducteur d'engins", "grutier", "machiniste", "equipment operator"] },
  { id: "infirmier", sector: "sante", label: "Nurse", keywords: ["infirmier", "infirmiere", "infirmière", "nurse"] },
  { id: "aide-soignant", sector: "sante", label: "Healthcare Assistant", keywords: ["aide soignant", "aide-soignant", "healthcare assistant"] },
  { id: "kinesitherapeute", sector: "sante", label: "Physiotherapist", keywords: ["kine", "kiné", "kinesitherapeute", "kinésithérapeute", "physiotherapist"] },
  { id: "educateur", sector: "sante", label: "Educator", keywords: ["educateur", "éducateur", "educatrice", "educator"] },
  { id: "vendeur", sector: "commerce", label: "Sales Associate", keywords: ["vendeur", "vendeuse", "sales associate", "sales"] },
  { id: "caissier", sector: "commerce", label: "Cashier", keywords: ["caissier", "caissiere", "caissière", "cashier"] },
  { id: "gerant-magasin", sector: "commerce", label: "Store Manager", keywords: ["gerant", "gérant", "store manager"] },
  { id: "reassortisseur", sector: "commerce", label: "Stock Replenisher", keywords: ["reassort", "réassort", "reassortisseur", "stock replenisher"] },
  { id: "cuisinier", sector: "horeca", label: "Chef", keywords: ["cuisinier", "cuisiniere", "chef cuisinier", "chef"] },
  { id: "serveur", sector: "horeca", label: "Server", keywords: ["serveur", "serveuse", "server"] },
  { id: "receptionniste", sector: "horeca", label: "Hotel Receptionist", keywords: ["receptionniste", "réceptionniste", "hotel receptionist"] },
  { id: "plongeur", sector: "horeca", label: "Dishwasher", keywords: ["plongeur", "plongeuse", "dishwasher"] },
  { id: "chauffeur-poids-lourd", sector: "logistique", label: "HGV Driver", keywords: ["chauffeur", "camionneur", "poids lourd", "permis c", "hgv driver"] },
  { id: "magasinier", sector: "logistique", label: "Warehouse Assistant", keywords: ["magasinier", "magasiniere", "préparateur de commandes", "preparateur de commandes", "warehouse assistant"] },
  { id: "cariste", sector: "logistique", label: "Forklift Operator", keywords: ["cariste", "chariot elevateur", "clark", "forklift operator"] },
  { id: "soudeur", sector: "industrie", label: "Welder", keywords: ["soudeur", "soudeuse", "welder"] },
  { id: "operateur-production", sector: "industrie", label: "Production Operator", keywords: ["operateur de production", "opérateur de production", "operateur", "production operator"] },
  { id: "technicien-maintenance", sector: "industrie", label: "Maintenance Technician", keywords: ["technicien de maintenance", "maintenance", "maintenance technician"] },
  { id: "agent-entretien", sector: "nettoyage", label: "Facilities Cleaner", keywords: ["agent d'entretien", "nettoyeur", "technicien de surface", "facilities cleaner"] },
  { id: "laveur-vitres", sector: "nettoyage", label: "Window Cleaner", keywords: ["laveur de vitres", "vitres", "window cleaner"] },
  { id: "chef-equipe-nettoyage", sector: "nettoyage", label: "Cleaning Supervisor", keywords: ["chef d'equipe", "chef d'équipe", "cleaning supervisor"] },
];

export type RegionId = "wallonie" | "flandre" | "bruxelles";

export const regions: (Option & { id: RegionId; language: string })[] = [
  { id: "wallonie", label: "Wallonia", language: "French" },
  { id: "flandre", label: "Flanders", language: "Dutch" },
  { id: "bruxelles", label: "Brussels-Capital", language: "French / Dutch" },
];

export const provinces: (Option & { region: RegionId; keywords: string[] })[] = [
  { id: "namur", region: "wallonie", label: "Namur", keywords: ["namur"] },
  { id: "liege", region: "wallonie", label: "Liège", keywords: ["liege", "liège"] },
  { id: "hainaut", region: "wallonie", label: "Hainaut", keywords: ["hainaut", "mons", "charleroi"] },
  { id: "luxembourg", region: "wallonie", label: "Luxembourg", keywords: ["arlon", "luxembourg province"] },
  { id: "brabant-wallon", region: "wallonie", label: "Walloon Brabant", keywords: ["walloon brabant", "wavre", "louvain-la-neuve"] },
  { id: "bruxelles", region: "bruxelles", label: "Brussels", keywords: ["bruxelles", "brussel", "brussels"] },
  { id: "anvers", region: "flandre", label: "Antwerp", keywords: ["anvers", "antwerpen"] },
  { id: "flandre-orientale", region: "flandre", label: "East Flanders", keywords: ["gand", "gent", "east flanders"] },
  { id: "flandre-occidentale", region: "flandre", label: "West Flanders", keywords: ["bruges", "brugge", "west flanders"] },
  { id: "brabant-flamand", region: "flandre", label: "Flemish Brabant", keywords: ["louvain", "leuven", "flemish brabant"] },
  { id: "limbourg", region: "flandre", label: "Limburg", keywords: ["hasselt", "limbourg", "limburg"] },
];

export const workTimes: (Option & { keywords: string[] })[] = [
  { id: "temps-plein", label: "Full-time", keywords: ["temps plein", "temps-plein", "full time", "full-time"] },
  { id: "temps-partiel", label: "Part-time", keywords: ["temps partiel", "mi-temps", "4/5", "part time", "part-time"] },
];

export const contractTypes: (Option & { keywords: string[] })[] = [
  { id: "cdi", label: "Permanent", hint: "Indefinite duration", keywords: ["cdi", "duree indeterminee", "permanent", "indefinite"] },
  { id: "cdd", label: "Fixed-term", hint: "Fixed duration", keywords: ["cdd", "duree determinee", "fixed-term", "fixed term"] },
  { id: "etudiant", label: "Student", hint: "Student employment contract", keywords: ["etudiant", "étudiant", "jobiste", "job etudiant", "student"] },
  { id: "flexi-job", label: "Flexi-job", hint: "Flexi-job framework contract", keywords: ["flexi job", "flexi-job", "flexijob"] },
  { id: "interim", label: "Temporary", hint: "Temporary work", keywords: ["interim", "intérim", "interimaire", "temporary"] },
];

export const companies: Option[] = [
  { id: "fiduciaire-meuse", label: "Fiduciaire Meuse SRL", hint: "Client · 45 employees · Namur" },
  { id: "brico-plus", label: "BricoPlus SA", hint: "Client · 1,200 employees · nationwide" },
  { id: "sdworx", label: "SD Worx (internal)", hint: "Internal recruitment" },
];

export const categories = [
  { id: "offre", label: "Job posting content", description: "What the posting should include or avoid." },
  { id: "restrictions", label: "Access restrictions & requirements", description: "Qualifications, certifications, prohibitions." },
  { id: "contrat", label: "Contract & compensation", description: "Salary scales, clauses, working hours." },
  { id: "interne", label: "Company internal policies", description: "Employer-specific policies." },
  { id: "demarches", label: "Procedures & support", description: "Hiring procedures and support." },
] as const;

export type CategoryId = (typeof categories)[number]["id"];

export const importanceLevels = {
  legal: { label: "Legal obligation", weight: 3 },
  policy: { label: "Internal policy", weight: 2 },
  guidance: { label: "Recommendation", weight: 1 },
} as const;

export type Importance = keyof typeof importanceLevels;

export const byId = <T extends Option>(list: T[], id?: string | null) =>
  list.find((o) => o.id === id);
