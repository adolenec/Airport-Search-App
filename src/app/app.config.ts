import { APP_INITIALIZER, ApplicationConfig } from '@angular/core';
import { provideRouter, withComponentInputBinding } from '@angular/router';
import {
  HTTP_INTERCEPTORS,
  HttpClient,
  HttpHeaders,
  provideHttpClient,
  withInterceptorsFromDi,
} from '@angular/common/http';

import { APP_ROUTES } from './app.routes';
import { Observable, tap } from 'rxjs';
import { AuthInterceptor } from './core/interceptors/auth.interceptor';
import { Token } from './core/models/token.model';

function initializeAppFactory(httpClient: HttpClient): () => Observable<any> {
  const clientId = 'V8lZuAMnhgSzQvF18xVB5cOWrhZS8qKo';
  const clientSecret = 'A1xQrybJjVub8pRx';
  const token = localStorage.getItem('token');
  if (token) localStorage.removeItem('token');

  const headers = new HttpHeaders({
    'Content-Type': 'application/x-www-form-urlencoded',
  });

  const body = `grant_type=client_credentials&client_id=${clientId}&client_secret=${clientSecret}`;

  return () =>
    httpClient
      .post<Token>(
        'https://test.api.amadeus.com/v1/security/oauth2/token',
        body,
        {
          headers,
        }
      )
      .pipe(
        tap((res) => {
          localStorage.setItem('token', JSON.stringify(res));
        })
      );
}

export const appConfig: ApplicationConfig = {
  providers: [
    {
      provide: APP_INITIALIZER,
      useFactory: initializeAppFactory,
      deps: [HttpClient],
      multi: true,
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true,
    },
    provideRouter(APP_ROUTES, withComponentInputBinding()),
    provideHttpClient(withInterceptorsFromDi()),
  ],
};
