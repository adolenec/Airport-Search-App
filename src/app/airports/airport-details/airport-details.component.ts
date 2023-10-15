import { Component, Input, inject } from '@angular/core';
import { AsyncPipe, NgIf } from '@angular/common';
import { RouterLink } from '@angular/router';
import { AirportsService } from '../airports.service';
import { AirportFormComponent } from '../airport-form/airport-form.component';

@Component({
  selector: 'app-airport-details',
  standalone: true,
  imports: [NgIf, AsyncPipe, RouterLink, AirportFormComponent],
  templateUrl: './airport-details.component.html',
})
export class AirportDetailsComponent {
  //route parameter
  @Input() id = '';

  private airportsService = inject(AirportsService);
  private airportId = this.airportsService.airportId;
  airportDetails$ = this.airportsService.airportDetails$;

  ngOnInit() {
    if (this.id) this.airportId.set(this.id);
  }
}
