import { inject } from '@angular/core';
import {
  HttpRequest,
  HttpEvent,
  HttpHandlerFn,
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { TokenStorageService } from '../services/token-storage.service';

const TOKEN_HEADER_KEY = 'Authorization';

export function AuthInterceptor(
  req: HttpRequest<unknown>,
  next: HttpHandlerFn
): Observable<HttpEvent<unknown>> {

  const tokenService = inject(TokenStorageService);
  const token = tokenService.getToken();

  const clonedRequest = token
    ? req.clone({
      setHeaders: {
        [TOKEN_HEADER_KEY]: `Bearer ${token}`,
      },
    })
    : req;

  return next(clonedRequest);
}
