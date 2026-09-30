import {
  isRouteErrorResponse,
  Link,
  Links,
  Meta,
  NavLink,
  Outlet,
  Scripts,
  ScrollRestoration,
} from "react-router";

import type { Route } from "./+types/root";
import "./app.css";
import { Icon } from "./components/badges";

export const links: Route.LinksFunction = () => [
  { rel: "preconnect", href: "https://fonts.googleapis.com" },
  {
    rel: "preconnect",
    href: "https://fonts.gstatic.com",
    crossOrigin: "anonymous",
  },
  {
    rel: "stylesheet",
    href: "https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600&family=Manrope:wght@600;700&display=swap",
  },
  {
    rel: "stylesheet",
    href: "https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200&display=block",
  },
];

export function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fr">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <Meta />
        <Links />
      </head>
      <body>
        {children}
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  );
}

const navClass = ({ isActive }: { isActive: boolean }) =>
  `rounded-lg px-space-sm py-1.5 transition-colors ${
    isActive
      ? "bg-surface-container font-semibold text-on-surface"
      : "text-on-surface-variant hover:bg-surface-container-low hover:text-on-surface"
  }`;

export default function App() {
  return (
    <div className="flex min-h-screen flex-col">
      <header className="sticky top-0 z-50 w-full bg-surface-container-lowest/95 shadow-[0_1px_8px_rgba(0,0,0,0.04)] backdrop-blur-md">
        <div className="mx-auto flex h-16 max-w-[1360px] items-center justify-between gap-space-md px-gutter">
          <Link to="/" className="flex items-center gap-space-sm">
            <span className="grid size-8 place-items-center rounded-xl bg-primary-container text-on-primary">
              <Icon name="explore" size={20} />
            </span>
            <span className="font-display text-title-md tracking-tight text-primary">HR Compass</span>
          </Link>
          <nav className="hidden items-center gap-space-xs md:flex">
            <NavLink to="/" end className={navClass}>
              Accueil
            </NavLink>
            <NavLink to="/recherche" className={navClass}>
              Définir le poste
            </NavLink>
            <NavLink to="/resultats" className={navClass}>
              Documents
            </NavLink>
          </nav>
          <div className="flex items-center gap-space-sm">
            <div className="hidden items-center gap-space-xs rounded-lg bg-amber-50 px-2.5 py-1 text-label-sm text-amber-800 sm:flex">
              <span className="size-1.5 animate-pulse rounded-full bg-amber-500" />
              Démo
            </div>
            <Link
              to="/recherche"
              className="inline-flex h-10 items-center justify-center rounded-lg bg-primary-container px-space-md text-label-md text-on-primary transition-colors hover:bg-secondary"
            >
              Définir un poste
            </Link>
          </div>
        </div>
      </header>
      <main className="mx-auto w-full max-w-[1360px] flex-1 px-gutter py-space-xl">
        <Outlet />
      </main>
      <footer className="w-full bg-surface-container-lowest shadow-[0_-1px_6px_rgba(0,0,0,0.02)]">
        <div className="mx-auto flex max-w-[1360px] flex-col gap-space-md px-gutter py-space-lg">
          <p className="text-label-sm text-outline">
            Informations issues de sources officielles sélectionnées par HR Compass. © 2026 HR Compass
          </p>
        </div>
      </footer>
    </div>
  );
}

export function ErrorBoundary({ error }: Route.ErrorBoundaryProps) {
  let message = "Oops!";
  let details = "An unexpected error occurred.";
  let stack: string | undefined;

  if (isRouteErrorResponse(error)) {
    message = error.status === 404 ? "404" : "Error";
    details =
      error.status === 404
        ? "The requested page could not be found."
        : error.statusText || details;
  } else if (import.meta.env.DEV && error && error instanceof Error) {
    details = error.message;
    stack = error.stack;
  }

  return (
    <main className="pt-16 p-4 container mx-auto">
      <h1>{message}</h1>
      <p>{details}</p>
      {stack && (
        <pre className="w-full p-4 overflow-x-auto">
          <code>{stack}</code>
        </pre>
      )}
    </main>
  );
}
