# Deploying PetApp to a local Kubernetes cluster

These manifests assume a **local** cluster (minikube) and images published to
**GitHub Container Registry** (`ghcr.io/saracipevska/...`) by the GitHub Actions
workflow in `.github/workflows/cd.yml`.

Resources: a `petapp` Namespace, a Postgres **StatefulSet** (headless Service +
`volumeClaimTemplates`, so storage is provisioned per-pod the StatefulSet way)
with its ConfigMap/Secret, a backend Deployment/Service with its own
ConfigMap/Secret, a frontend Deployment/Service, and an **Ingress** that routes
`/api` to the backend and everything else to the frontend.

## 1. Start a local cluster with an Ingress controller

```bash
minikube start
minikube addons enable ingress
```

(If you're using `kind` instead, you'll need to install the ingress-nginx
controller manually with the `kind`-specific manifest — see the ingress-nginx
docs for kind. minikube's addon is the simpler path.)

## 2. Make the images pullable

The workflow pushes to `ghcr.io/saracipevska/angularwebapplication-frontend` and
`...-backend`. By default GitHub Container Registry packages are **private**, and a
local cluster has no credentials to pull a private image, so do ONE of:

- Easiest: after the first successful push, open the package on GitHub
  (github.com/saracipevska?tab=packages) -> Package settings -> change visibility to
  **Public**.
- Or create a pull secret and reference it from the Deployments:
  ```bash
  kubectl -n petapp create secret docker-registry ghcr-pull-secret \
    --docker-server=ghcr.io \
    --docker-username=<your-github-username> \
    --docker-password=<a GitHub PAT with read:packages> \
    --docker-email=you@example.com
  ```
  then add `imagePullSecrets: [{name: ghcr-pull-secret}]` under `spec.template.spec`
  in `backend-deployment.yaml` and `frontend-deployment.yaml`.

## 3. Apply the manifests

```bash
kubectl apply -k k8s/
kubectl -n petapp get pods -w   # wait for everything to be Running/Ready
kubectl -n petapp get statefulset,pvc   # confirm Postgres got its own PVC
```

## 4. Point a hostname at the Ingress and open the app

The Ingress routes on `Host: petapp.local`, so point that hostname at minikube's IP.

On Windows, edit `C:\Windows\System32\drivers\etc\hosts` **as Administrator**
(Notepad -> right-click -> Run as administrator, then open the file) and add a line:

```
<output of `minikube ip`>   petapp.local
```

Then open **http://petapp.local** in your browser. Check the API is reachable
too: **http://petapp.local/api/pets/adoption** should return `[]` (or your data)
as JSON, not a 404.

If you'd rather not edit `hosts`, `minikube tunnel` (run in its own terminal,
needs admin) plus `curl -H "Host: petapp.local" http://127.0.0.1/` also works
for a quick check, but editing `hosts` is the more normal demo setup.

## 5. Pick up a new image after CI/CD publishes one

The workflow tags images with both `:latest` and `:<git-sha>`. To roll out a specific
build without editing YAML:

```bash
kubectl -n petapp set image deployment/backend  backend=ghcr.io/saracipevska/angularwebapplication-backend:<sha>
kubectl -n petapp set image deployment/frontend frontend=ghcr.io/saracipevska/angularwebapplication-frontend:<sha>
```

Or, if you're happy tracking `:latest`, just force a re-pull:

```bash
kubectl -n petapp rollout restart deployment/backend deployment/frontend
```

## 6. Tear down

```bash
kubectl delete -k k8s/
```
