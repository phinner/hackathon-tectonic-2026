# syntax=docker/dockerfile:1@sha256:4edf897a3ffa55b89f906fc8cc78afdb3f1834cc9c7083565e611a8a7d5fe99e
# https://pnpm.io/docker

FROM docker.io/library/node:24.21.0-slim@sha256:0e0ff40c39bc087845bfb27465a0df4ea419520094bc35842ff83dd8cbe6f9b6 AS base
ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME/bin:$PATH"
WORKDIR /app
COPY package.json pnpm-lock.yaml ./
RUN corepack enable && corepack install && pnpm --version

FROM base AS prod-deps
RUN --mount=type=cache,id=pnpm,target=/pnpm/store pnpm install --prod --frozen-lockfile

FROM base AS build
RUN --mount=type=cache,id=pnpm,target=/pnpm/store pnpm install --frozen-lockfile
COPY . /app
RUN pnpm run build

FROM base AS runtime
ENV NODE_ENV=production
RUN groupadd --gid 1001 app && \
    useradd --uid 1001 --gid 1001 --home-dir /app --shell /usr/sbin/nologin app
COPY --from=prod-deps --chown=app:app /app/node_modules /app/node_modules
COPY --from=build --chown=app:app /app/build /app/build
USER app:app
EXPOSE 3000
CMD [ "./node_modules/.bin/react-router-serve", "./build/server/index.js" ]
