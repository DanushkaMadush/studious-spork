import { Routes } from "@angular/router";

export const TASK_ROUTES: Routes = [
    {
        path: '',
        loadComponent: () =>
            import('./pages/task-list/task-list').then((m) => m.TaskList)
    },
    {
        path: 'new',
        loadComponent: () =>
            import('./pages/task-form/task-form').then((m) => m.TaskForm)
    }
];