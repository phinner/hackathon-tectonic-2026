import { Form, Link } from "react-router";

export function meta() {
  return [{ title: "Boussole RH" }];
}

const examples = [
  "On cherche un expert-comptable dans la région de Namur à temps plein, quels sont les documents nécessaires ?",
  "Engager un cuisinier en CDD à Bruxelles",
  "Recruter une infirmière à mi-temps à Liège",
];

export default function Home() {
  return (
    <div className="mx-auto max-w-2xl text-center">
      <h1 className="text-4xl font-bold tracking-tight">Ouvrir un poste, sans deviner les règles.</h1>
      <p className="mt-4 text-lg text-slate-600">
        Décrivez le poste. Boussole RH retrouve les documents qui s'appliquent à votre secteur, votre région et
        votre entreprise, triés par importance.
      </p>

      <Form method="get" action="/recherche" className="mt-10 text-left">
        <label htmlFor="q" className="text-sm font-medium text-slate-700">
          Votre question
        </label>
        <textarea
          id="q"
          name="q"
          rows={3}
          required
          placeholder="Ex. : on cherche un expert-comptable à Namur à temps plein…"
          className="mt-2 w-full rounded-xl border border-slate-300 bg-white p-4 shadow-sm outline-none focus:border-brand focus:ring-2 focus:ring-brand/20"
        />
        <div className="mt-4 flex flex-wrap items-center justify-between gap-3">
          <Link to="/recherche" className="text-sm font-medium text-brand hover:underline">
            Ou répondre aux questions pas à pas →
          </Link>
          <button type="submit" className="rounded-lg bg-brand px-5 py-2.5 font-medium text-white hover:bg-brand/90">
            Analyser
          </button>
        </div>
      </Form>

      <div className="mt-10 text-left">
        <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">Exemples</p>
        <ul className="mt-3 space-y-2">
          {examples.map((example) => (
            <li key={example}>
              <Link
                to={`/recherche?q=${encodeURIComponent(example)}`}
                className="block rounded-lg border border-slate-200 bg-white px-4 py-3 text-sm text-slate-700 hover:border-brand"
              >
                {example}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
