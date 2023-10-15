import { HttpErrorResponse } from '@angular/common/http';

export interface HttpResponseState<T> {
  isLoading: boolean;
  value?: T;
  error?: HttpErrorResponse | Error;
}
