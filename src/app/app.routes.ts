import { Routes } from '@angular/router';
import { PageNotFoundComponent } from './core/components/page-not-found/page-not-found.component';

export const APP_ROUTES: Routes = [
  {
    path: 'airports',
    loadChildren: () =>
      import('./airports/airport.routes').then((r) => r.AIRPORT_ROUTES),
  },
  { path: '', redirectTo: 'airports', pathMatch: 'full' },
  { path: '**', component: PageNotFoundComponent },
];
