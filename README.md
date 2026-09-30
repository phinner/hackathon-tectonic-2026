# HR Compass

Our solution to the SD Worx challenge at the Tectonic Hackathon 2026.

Before opening a position, HR teams have to work out which laws, salary grids and procedures apply to it. HR Compass asks for the job, sector, location, working time, contract and company. You can answer in one sentence or step by step. It then shows only the documents that apply to that position, sorted by importance. Each document shows its source, owner and last validation date, and is flagged when it is outdated or contradicts another one.

Built with React Router and Tailwind CSS.

## Local development

Requires Node 24 and pnpm (`corepack enable`).

```sh
pnpm install
pnpm dev
```

The app runs at http://localhost:5173.

## Production

With Docker:

```sh
docker build -t hr-compass .
docker run -p 3000:3000 hr-compass
```

Or without Docker:

```sh
pnpm install
pnpm build
pnpm start
```

The app is served on port 3000 (set `PORT` to change it).
