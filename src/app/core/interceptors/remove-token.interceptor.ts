import {
  HttpErrorResponse,
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, catchError } from 'rxjs';
import { TokenService } from '../services/token.service';

@Injectable()
export class RemoveTokenInterceptor implements HttpInterceptor {
  constructor(private tokenService: TokenService, private router: Router) { }

  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    if (request.url.includes('auth')) {
      return next.handle(request);
    } else {
      return next.handle(request).pipe(catchError((error: HttpErrorResponse) => {
        if (error.status === 401) {
          this.tokenService.removeToken();
          this.router.navigate(['']);
        }
        return next.handle(request);
      }))
    }
  }
}
