import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AirportsService } from './airports.service';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { API_URL } from '../app.config';
import { AirportComponent } from './airport/airport.component';
import { MostSearchedAirportsComponent } from './most-searched-airports/most-searched-airports.component';

@Component({
  selector: 'app-airports',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    RouterLink,
    AirportComponent,
    MostSearchedAirportsComponent,
  ],
  templateUrl: './airports.component.html',
})
export class AirportsComponent {
  private airportsService = inject(AirportsService);

  airports$ = this.airportsService.airports$;
  airportCount$ = this.airportsService.airportCount$;
  request = this.airportsService.request;

  searchAirports(value: string) {
    this.request.mutate(
      (req) => (
        (req.keyword = value), (req.link = `${API_URL}?subType=AIRPORT`)
      )
    );
  }

  onNext(next: string) {
    this.request.mutate((req) => (req.link = next));
  }

  onPrevious(prev: string) {
    this.request.mutate((req) => (req.link = prev));
  }
}
