# PetApp (PawPaw)

A pet adoption / lost-and-found / pet-shop web app.

- **Frontend**: Angular 21, Bootstrap, Leaflet (`/` - this repo's root)
- **Backend**: Node.js + Express REST API (`/backend`)
- **Database**: PostgreSQL

## Architecture

```
 Browser
   |
   v
 [frontend] nginx serving the built Angular app
   | /api/*  (reverse-proxied)
   v
 [backend] Express API  --->  [db] PostgreSQL
```

The Angular app always calls a relative `/api/pets/...` URL (see
`src/environments/environment.ts`). Whatever sits in front of it - the
`ng serve` dev proxy (`proxy.conf.json`) or nginx (`nginx.conf`, baked into the
frontend Docker image) - forwards that to the backend. This means the same
build works unchanged in local dev, Docker Compose, and Kubernetes.

## Running locally without Docker

Terminal 1 - database (or install Postgres locally and load `backend/src/db/init.sql`):
```bash
docker run --rm -p 5432:5432 \
  -e POSTGRES_USER=petapp -e POSTGRES_PASSWORD=petapp -e POSTGRES_DB=petapp \
  -v "$PWD/backend/src/db/init.sql:/docker-entrypoint-initdb.d/init.sql" \
  postgres:16-alpine
```

Terminal 2 - backend:
```bash
cd backend
cp .env.example .env
npm install
npm run dev        # http://localhost:8081
```

Terminal 3 - frontend:
```bash
npm install
npm start           # http://localhost:4200, proxies /api to :8081
```

## Running everything with Docker Compose

```bash
docker compose up --build
```
- Frontend: http://localhost:8080
- Backend: http://localhost:8081
- Postgres: localhost:5432 (user/password/db: `petapp`)

## Tests

```bash
npm test                 # frontend (Vitest via Angular CLI)
cd backend && npm test   # backend (Jest + Supertest, needs a reachable Postgres)
```

## CI/CD

- `.github/workflows/ci.yml` - runs on every push/PR: frontend tests + build,
  backend tests (against a real Postgres service container), and a
  build-only check of both Dockerfiles.
- `.github/workflows/cd.yml` - runs on push to `master`/`main`: builds both
  Docker images and pushes them to GitHub Container Registry, tagged
  `:latest` and `:<commit-sha>`.

## Deploying to Kubernetes

Manifests live in `k8s/` (namespace, Postgres with a PVC, backend, frontend -
tied together with `kustomization.yaml`). See **[k8s/README.md](k8s/README.md)**
for step-by-step instructions for a local minikube/kind cluster, including how
to make the GHCR images pullable and how to roll out a newly-published image.

Quick start once a cluster is running:
```bash
kubectl apply -k k8s/
minikube service frontend -n petapp --url
```

## Notes on the current state

This project started as a frontend-only prototype (the API calls existed in
`pet.ts` before there was anything to call). Known gaps worth knowing about:

- Sales pages (food/clothing/supplements/accessories) and the vet page still
  use hardcoded in-component data - no backend endpoints exist for them yet.
- The lost-pet "found" flow (`found.ts`) doesn't call the backend yet either;
  only `lost.ts` and the adoption forms are wired up.
- No auth - anyone can post a listing or read the adoption-requests list.
  Fine for a demo/local deployment; add authentication before exposing this
  publicly.
- Pet photos are uploaded as base64 data URLs and stored directly in the
  `pets.image` column. Works, but will bloat the database fast - swapping to
  object storage (e.g. S3-compatible) is a natural next improvement.
