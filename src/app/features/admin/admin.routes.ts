import { Routes } from "@angular/router";

export const ADMIN_ROUTES: Routes = [
    {
        path: 'users',
        loadComponent: () =>
            import('./pages/user-management/user-management').then((m) => m.UserManagement)
    }
];