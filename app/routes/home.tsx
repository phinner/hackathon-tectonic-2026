import { Link } from "react-router";
import { Icon } from "~/components/badges";

export function meta() {
  return [{ title: "HR Compass" }];
}

const flow = [
  { icon: "pin_drop", title: "Décrivez le poste", text: "Secteur, métier, région, régime, contrat. Six questions, une minute." },
  { icon: "verified", title: "Des sources de confiance", text: "Nous sélectionnons uniquement des sources officielles : EUR-Lex, SPF Emploi, ONSS, régions, secteurs." },
  { icon: "task_alt", title: "Vous agissez", text: "Vous recevez les règles qui s'appliquent au poste, de la plus à la moins pertinente, prêtes à l'emploi." },
];

const sources = ["Union européenne", "Fédéral", "Wallonie", "Flandre", "Bruxelles", "Commissions paritaires"];

export default function Home() {
  return (
    <div className="space-y-space-xl">
      <section className="mx-auto flex max-w-3xl flex-col items-center space-y-space-md py-space-lg text-center">
        <div className="inline-flex items-center gap-space-xs rounded-full border border-outline-variant/30 bg-surface-container px-3.5 py-1.5 text-label-md text-on-surface-variant shadow-sm">
          <Icon name="explore" size={16} className="text-secondary" />
          Recrutement en Belgique
        </div>
        <h1 className="text-[30px] leading-[38px] font-bold tracking-tight text-primary md:text-headline-xl">
          Ouvrir un poste, sans deviner les règles.
        </h1>
        <p className="max-w-2xl text-body-lg text-on-surface-variant">
          Des lois, barèmes et démarches issus de sources officielles, sélectionnés pour votre poste. Une information fiable, sans recherche.
        </p>
        <Link
          to="/recherche"
          className="inline-flex h-12 items-center gap-2 rounded-lg bg-primary px-space-xl text-label-md text-on-primary shadow-md transition-all hover:bg-primary-container active:scale-95"
        >
          Définir le poste
          <Icon name="arrow_forward" />
        </Link>
      </section>

      <section className="grid gap-space-md md:grid-cols-3">
        {flow.map((step, i) => (
          <div
            key={step.title}
            className="rounded-xl border border-outline-variant/30 bg-surface-container-lowest p-space-lg shadow-sm"
          >
            <div className="mb-space-sm flex items-center justify-between">
              <span className="text-label-sm font-semibold text-outline">{String(i + 1).padStart(2, "0")}</span>
              <Icon name={step.icon} size={22} className="text-secondary" />
            </div>
            <h2 className="text-headline-sm text-primary">{step.title}</h2>
            <p className="mt-2 text-body-sm text-on-surface-variant">{step.text}</p>
          </div>
        ))}
      </section>

      <section className="flex flex-col items-center gap-space-sm text-center">
        <p className="text-label-md text-outline">Uniquement des sources officielles</p>
        <div className="flex flex-wrap justify-center gap-space-xs">
          {sources.map((source) => (
            <span
              key={source}
              className="rounded-lg border border-outline-variant/30 bg-surface-container-low px-3 py-1 text-label-md text-on-surface-variant"
            >
              {source}
            </span>
          ))}
        </div>
      </section>
    </div>
  );
}
