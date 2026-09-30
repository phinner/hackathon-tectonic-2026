import { Form, Link } from "react-router";
import { Eyebrow, Icon } from "~/components/badges";

export function meta() {
  return [{ title: "HR Compass" }];
}

const examples = [
  "On cherche un expert-comptable dans la région de Namur à temps plein, quels sont les documents nécessaires ?",
  "Engager un cuisinier en CDD à Bruxelles",
  "Recruter une infirmière à mi-temps à Liège",
];

const flow = [
  {
    label: "Étape 01",
    icon: "pin_drop",
    title: "Votre situation",
    text: "Secteur, métier, région, régime, contrat, entreprise. En une phrase ou pas à pas.",
    tag: "Profil du poste",
  },
  {
    label: "Étape 02",
    icon: "explore",
    title: "Le tri HR Compass",
    text: "Seuls les documents dont la portée correspond au poste sont retenus, classés par importance.",
    tag: "Filtrage par portée",
    active: true,
  },
  {
    label: "Étape 03",
    icon: "verified",
    title: "Votre prochaine étape",
    text: "Chaque document indique sa source, son responsable et sa date de validation.",
    tag: "Traçabilité",
  },
];

const signals = [
  { icon: "account_balance", title: "Source", text: "Intranet, Teams, e-mail…" },
  { icon: "person", title: "Responsable", text: "Qui a validé le contenu" },
  { icon: "schedule", title: "Dernière validation", text: "Date de mise à jour" },
  { icon: "report_problem", title: "Alertes", text: "Obsolète, contradiction, à vérifier" },
];

export default function Home() {
  return (
    <div className="space-y-space-xl">
      <section className="mx-auto flex max-w-4xl flex-col items-center space-y-space-md text-center">
        <div className="inline-flex items-center gap-space-xs rounded-full border border-outline-variant/30 bg-surface-container px-3.5 py-1.5 text-label-md text-on-surface-variant shadow-sm">
          <Icon name="explore" size={16} className="text-secondary" />
          Les règles qui s'appliquent à votre recrutement
        </div>
        <h1 className="max-w-3xl text-[30px] leading-[38px] font-bold tracking-tight text-primary md:text-headline-xl">
          Ouvrir un poste, sans deviner les règles.
        </h1>
        <p className="max-w-2xl text-body-lg text-on-surface-variant">
          Décrivez le poste. HR Compass retrouve les documents qui s'appliquent à votre secteur, votre région et votre
          entreprise, triés par importance.
        </p>
        <div className="inline-flex items-center gap-space-sm rounded-lg bg-surface-container-low px-space-md py-2 text-label-md text-secondary shadow-sm">
          <Icon name="verified" />
          « On ne vous demande pas de nous croire. On vous montre où vérifier. »
        </div>
      </section>

      <section className="rounded-xl border border-outline-variant/40 bg-surface-container-lowest p-space-lg shadow-md md:p-space-xl">
        <div className="mb-space-lg flex flex-col justify-between gap-space-md border-b border-outline-variant/20 pb-space-md md:flex-row md:items-end">
          <div>
            <Eyebrow>Votre recrutement</Eyebrow>
            <h2 className="mt-1 text-headline-md text-primary">Quel poste préparez-vous ?</h2>
            <p className="mt-1 text-on-surface-variant">Décrivez-le en une phrase, nous pré-remplissons les critères.</p>
          </div>
          <Link
            to="/recherche"
            className="inline-flex items-center gap-space-xs rounded-lg bg-surface-container px-3 py-1.5 text-label-md text-on-surface-variant hover:bg-surface-container-high"
          >
            <Icon name="tune" size={16} className="text-secondary" />
            Répondre pas à pas
          </Link>
        </div>

        <Form method="get" action="/recherche">
          <label htmlFor="q" className="text-label-md text-on-surface">
            Votre question
          </label>
          <textarea
            id="q"
            name="q"
            rows={3}
            required
            placeholder="Ex. : on cherche un expert-comptable à Namur à temps plein…"
            className="mt-space-sm w-full rounded-lg border border-slate-300 bg-surface-container-lowest p-space-md text-body-lg outline-none focus:border-secondary focus:ring-2 focus:ring-secondary/25"
          />

          <div className="mt-space-md grid gap-space-sm md:grid-cols-3">
            {examples.map((example) => (
              <Link
                key={example}
                to={`/recherche?q=${encodeURIComponent(example)}`}
                className="flex items-start gap-space-sm rounded-lg border border-outline-variant/30 bg-surface-container-low p-3 text-body-sm text-on-surface-variant transition-colors hover:bg-surface-container hover:text-on-surface"
              >
                <Icon name="north_east" size={16} className="mt-0.5 text-secondary" />
                {example}
              </Link>
            ))}
          </div>

          <div className="mt-space-lg flex flex-col items-center justify-between gap-space-md border-t border-outline-variant/20 pt-space-md sm:flex-row">
            <p className="flex items-center gap-space-xs text-body-sm text-on-surface-variant">
              <span className="size-2 rounded-full bg-on-tertiary-container" />
              Vous pourrez vérifier et corriger chaque critère détecté.
            </p>
            <button
              type="submit"
              className="inline-flex h-11 w-full items-center justify-center gap-2 rounded-lg bg-primary px-space-xl text-label-md text-on-primary shadow-md transition-all hover:bg-primary-container active:scale-95 sm:w-auto"
            >
              Analyser
              <Icon name="arrow_forward" />
            </button>
          </div>
        </Form>
      </section>

      <section>
        <div className="mx-auto mb-space-lg max-w-3xl space-y-space-sm text-center">
          <Eyebrow>Comment ça marche</Eyebrow>
          <h2 className="text-headline-md text-primary md:text-headline-lg">
            Transformez votre recrutement en parcours sur mesure
          </h2>
        </div>
        <div className="grid gap-space-md md:grid-cols-3">
          {flow.map((step) => (
            <div
              key={step.label}
              className={`flex flex-col justify-between rounded-xl border p-space-lg ${
                step.active
                  ? "border-secondary/40 bg-surface-container shadow-md"
                  : "border-outline-variant/30 bg-surface-container-lowest shadow-sm"
              }`}
            >
              <div>
                <div className="mb-space-sm flex items-center justify-between">
                  <span className="text-label-sm font-semibold text-outline uppercase">{step.label}</span>
                  <Icon name={step.icon} size={22} className="text-secondary" />
                </div>
                <h3 className="text-headline-sm text-primary">{step.title}</h3>
                <p className="mt-2 text-body-sm text-on-surface-variant">{step.text}</p>
              </div>
              <span
                className={`mt-space-md w-fit rounded-lg px-2 py-0.5 text-label-sm font-semibold ${
                  step.active ? "bg-primary-container text-on-primary" : "bg-surface-container-low text-on-surface-variant"
                }`}
              >
                {step.tag}
              </span>
            </div>
          ))}
        </div>
        <div className="mt-space-md flex items-start gap-space-md rounded-xl border border-outline-variant/30 bg-surface-container-low p-space-md">
          <Icon name="explore" size={22} className="text-secondary" />
          <div>
            <h4 className="text-title-md text-primary">Les documents pertinents pour votre situation, pas un verdict juridique</h4>
            <p className="mt-1 text-body-sm text-on-surface-variant">
              HR Compass structure l'information pour que vous ne ratiez aucun point important. Il ne remplace ni votre
              service juridique ni votre secrétariat social.
            </p>
          </div>
        </div>
      </section>

      <section className="rounded-xl bg-primary p-space-lg text-on-primary shadow-xl md:p-space-xl">
        <div className="mb-space-lg max-w-3xl space-y-space-sm">
          <Eyebrow className="text-secondary-fixed">Traçabilité</Eyebrow>
          <h2 className="text-headline-md text-on-primary md:text-headline-lg">Chaque réponse montre d'où elle vient</h2>
          <p className="text-body-lg text-on-primary-container">
            Pas de réponse sortie de nulle part : chaque document affiche sa provenance et son état, pour que vous
            puissiez le vérifier vous-même.
          </p>
        </div>
        <div className="my-space-lg rounded-lg border border-outline-variant/20 bg-primary-container p-space-md">
          <p className="text-headline-sm text-secondary-fixed italic">« Ne nous croyez pas sur parole. Vérifiez. »</p>
        </div>
        <div className="grid gap-space-sm sm:grid-cols-2 lg:grid-cols-4">
          {signals.map((signal) => (
            <div key={signal.title} className="flex items-center gap-space-sm rounded-lg border border-white/10 bg-white/5 p-3">
              <Icon name={signal.icon} size={22} className="text-secondary-fixed-dim" />
              <div>
                <p className="text-label-md text-on-primary">{signal.title}</p>
                <p className="text-label-sm text-on-primary-container">{signal.text}</p>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
