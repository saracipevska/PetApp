// Relative path: works in every environment because something in front of the
// Angular app (the `ng serve` dev proxy, or nginx in the Docker/K8s image)
// forwards /api/* to the backend service. No environment-specific rebuild needed.
export const environment = {
  apiUrl: '/api/pets'
};
