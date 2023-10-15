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
import { AirportsResponse } from './models/airport.model';
import { API_URL } from '../app.config';

@Injectable({
  providedIn: 'root',
})
export class AirportsService {
  private http = inject(HttpClient);

  request = signal<AirportsRequest>({
    keyword: '',
    pageLimit: 5,
    link: API_URL,
  });

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
}
