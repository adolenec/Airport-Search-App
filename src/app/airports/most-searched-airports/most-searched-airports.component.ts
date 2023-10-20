import { Component, Input } from '@angular/core';
import { NgFor, NgIf } from '@angular/common';
import { AirportOccurances } from '../models/airport.model';

@Component({
  selector: 'app-most-searched-airports',
  standalone: true,
  imports: [NgIf, NgFor],
  templateUrl: './most-searched-airports.component.html',
})
export class MostSearchedAirportsComponent {
  @Input({required: true}) airports!: AirportOccurances[];
}
