import { type RouteConfig, index, route } from "@react-router/dev/routes";

export default [
  index("routes/home.tsx"),
  route("recherche", "routes/recherche.tsx"),
  route("resultats", "routes/resultats.tsx"),
  route("documents/:id", "routes/document.tsx"),
] satisfies RouteConfig;
