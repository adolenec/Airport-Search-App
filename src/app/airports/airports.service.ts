import { Injectable, inject, signal } from '@angular/core';
import { AirportsRequest } from './models/airports-request.model';
import { HttpClient, HttpParams } from '@angular/common/http';
import {
  Observable,
  catchError,
  debounceTime,
  map,
  of,
  scan,
  startWith,
  switchMap,
} from 'rxjs';
import { toObservable } from '@angular/core/rxjs-interop';
import { HttpResponseState } from '../core/models/http-response-state.model';
import {
  AirportData,
  AirportDetailsResponse,
  AirportOccurances,
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
      return req.keyword
        ? this.http
            .get<AirportsResponse>(req.link, {
              params: new HttpParams()
                .append('keyword', req.keyword)
                .append('page[limit]', req.pageLimit),
            })
            .pipe(
              map((value) => ({ isLoading: false, value })),
              catchError((error) => of({ isLoading: false, error }))
            )
        : of({ isLoading: false });
    }),
    startWith({ isLoading: true })
  );

  private storedData = localStorage.getItem('airportCountsData');

  airportCount$: Observable<AirportOccurances[]> = this.airports$.pipe(
    map((response) => response.value?.data || []),
    scan((acc, curr) => {
      for (const airport of curr) {
        acc[airport.id] = {
          id: airport.id,
          name: airport.name,
          count: (acc[airport.id]?.count || 0) + 1,
        };
      }
      localStorage.setItem('airportCountsData', JSON.stringify(acc));
      return acc;
    }, JSON.parse(this.storedData as string) || {}),
    map((counts: { id: AirportOccurances }) =>
      Object.values(counts)
        .sort((a, b) => b.count - a.count)
        .slice(0, 10)
    )
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
