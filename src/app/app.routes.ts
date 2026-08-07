import { Routes } from '@angular/router';
import { MainLayout } from './layouts/main-layout/main-layout';

export const routes: Routes = [
  {
    path: 'auth',
    loadComponent: () => import('./layouts/auth-layout/auth-layout').then((m) => m.AuthLayout),
    children: [
      {
        path: 'login',
        loadChildren: () => import('./features/auth/auth.routes').then((m) => m.AUTH_ROUTES),
      },
    ],
  },
  {
    path: 'app',
    loadComponent: () =>
      // lazy load main layout as a component, then inside main lazy load other routes.
      import('./layouts/main-layout/main-layout').then((m) => m.MainLayout),
    children: [
      {
        path: 'dashboard',
        loadChildren: () =>
          import('./features/dashboard/dashboard.routes').then((m) => m.DASHBOARD_ROUTES),
      },
      {
        path: 'tasks',
        loadChildren: () => import('./features/tasks/tasks.routes').then((m) => m.TASK_ROUTES),
      },
      {
        path: 'admin',
        loadChildren: () => import('./features/admin/admin.routes').then((m) => m.ADMIN_ROUTES),
      },
    ],
  },
  {
    path: '',
    // represent application's root URL. if the route empty localhost:4200/ redirect to /app/dashboard.
    redirectTo: 'app/dashboard',
    pathMatch: 'full',
    // only redirect if the entire URL is empty. without pathmatch full angular will try to redirect all route app/dashboard and which creates redirect loop.
  },
  {
    // Wildcard route - **
    // this matches any URL that didnt match early routes.
    // Angular check routes from top to bottom and use the first match.
    path: '**',
    loadComponent: () => import('./shared/components/not-found/not-found').then((m) => m.NotFound),
  },
];

//-----------------------------------
// loadComponent vs loadChildren

// loadComponent
// - Lazy-loads a standalone component.
// - Use when a route displays a single standalone component.

// loadChildren
// - Lazy-loads a feature's route configuration.
// - Use when a feature contains multiple routes.
// - It downloads the child routes file first.

// If the child routes use `component`
// - All statically imported components in that feature are downloaded together
//   when `loadChildren` loads the feature.

// If the child routes use `loadComponent`
// - Only the activated component is downloaded.
// - Other components are downloaded only when their routes are visited.

// Best practice
// - Use `loadChildren` in `app.routes.ts` to split the application into feature-based route groups.
// - Inside each feature's routes, prefer `loadComponent` for standalone components to achieve proper lazy loading.

// import('./shared/components/not-found/not-found').then((m) => m.NotFound) -> m is the imported module object.
// import download the module. then m.NotFound extracts the exported NotFound component class from the module.
