# syntax=docker/dockerfile:1
# check=error=true

FROM node:22.19.0-slim AS base
WORKDIR /app


FROM base AS packages-env
COPY ./package.json package-lock.json /app/
RUN npm ci --omit=dev


FROM base AS build-env
COPY ./package.json package-lock.json /app/
RUN npm ci

COPY . /app/
RUN npm run build


FROM base
COPY ./package.json package-lock.json /app/
COPY --from=packages-env /app/node_modules /app/node_modules
COPY --from=build-env /app/build /app/build

ENV PORT=80
CMD ["npm", "run", "start"]
