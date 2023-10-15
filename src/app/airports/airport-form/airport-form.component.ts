import { Component, Input } from '@angular/core';
import { AirportData } from '../models/airport.model';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-airport-form',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './airport-form.component.html',
  styleUrls: ['./airport-form.component.scss'],
})
export class AirportFormComponent {
  @Input({ required: true }) airportDetails!: AirportData;
  airportDetailsForm!: FormGroup;

  ngOnInit() {
    this.airportDetailsForm = new FormGroup({
      address: new FormGroup({
        cityCode: new FormControl<string>(''),
        cityName: new FormControl<string>(''),
        countryCode: new FormControl<string>(''),
        countryName: new FormControl<string>(''),
        regionCode: new FormControl<string>(''),
      }),
      detailedName: new FormControl<string>(''),
      geoCode: new FormGroup({
        latitude: new FormControl<number | null>(null),
        longitude: new FormControl<number | null>(null),
      }),
      iataCode: new FormControl<string>(''),
      id: new FormControl<string>(''),
      name: new FormControl<string>(''),
    });

    this.airportDetailsForm.patchValue(this.airportDetails);
  }

  onSubmit() {
    localStorage.setItem(
      this.airportDetailsForm.controls['id'].value,
      JSON.stringify(this.airportDetailsForm.value)
    );
  }
}
