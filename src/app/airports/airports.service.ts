import { Injectable, inject, signal } from '@angular/core';
import { AirportsRequest } from './models/airports-request.model';
import { HttpClient, HttpParams } from '@angular/common/http';
import {
  Observable,
  catchError,
  debounceTime,
  map,
  of,
  startWith,
  switchMap,
} from 'rxjs';
import { toObservable } from '@angular/core/rxjs-interop';
import { HttpResponseState } from '../core/models/http-response-state.model';
import {
  AirportData,
  AirportDetailsResponse,
  AirportsResponse,
} from './models/airport.model';
import { API_URL } from '../app.config';

@Injectable({
  providedIn: 'root',
})
export class AirportsService {
  private http = inject(HttpClient);

  request = signal<AirportsRequest>({
    keyword: '',
    pageLimit: 5,
    link: `${API_URL}?subType=AIRPORT`,
  });
  airportId = signal('');

  airports$: Observable<HttpResponseState<AirportsResponse>> = toObservable(
    this.request
  ).pipe(
    debounceTime(300),
    switchMap((req) => {
      const params = new HttpParams()
        .append('keyword', req.keyword)
        .append('page[limit]', req.pageLimit);
      return this.http.get<AirportsResponse>(req.link, { params }).pipe(
        map((value) => ({ isLoading: false, value })),
        catchError((error) => of({ isLoading: false, error }))
      );
    }),
    startWith({ isLoading: true })
  );

  airportDetails$: Observable<HttpResponseState<AirportData>> = toObservable(
    this.airportId
  ).pipe(
    switchMap((id) =>
      localStorage.getItem(id)
        ? of({
            value: {
              ...JSON.parse(localStorage.getItem(id) as string),
            },
            isLoading: false,
          } as HttpResponseState<AirportData>)
        : this.http.get<AirportDetailsResponse>(`${API_URL}/${id}`).pipe(
            map((value) => ({ isLoading: false, value: value.data })),
            catchError((error) => of({ isLoading: false, error }))
          )
    ),
    startWith({ isLoading: true })
  );
}
