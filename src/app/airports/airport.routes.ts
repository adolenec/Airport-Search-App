import { Routes } from '@angular/router';
import { AirportDetailsComponent } from './airport-details/airport-details.component';
import { AirportsComponent } from './airports.component';

export const AIRPORT_ROUTES: Routes = [
  {
    path: '',
    component: AirportsComponent,
  },
  { path: ':id', component: AirportDetailsComponent },
];
