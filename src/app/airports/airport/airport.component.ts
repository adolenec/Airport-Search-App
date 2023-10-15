import { Component, Input } from '@angular/core';
import { AirportData } from '../models/airport.model';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-airport',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './airport.component.html',
})
export class AirportComponent {
  @Input({ required: true }) airport!: AirportData;
}
