import {
  HttpErrorResponse,
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { TokenService } from '../services/token.service';
import { Router } from '@angular/router';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(
    private tokenService: TokenService,
    private router: Router
  ) { }

  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    if (request.url.includes('login')) {
      return next.handle(request);
    } else {
      if (this.tokenService.hasToken()) {
        const authToken = this.tokenService.getToken();
        const newRequest = request.clone({
          setHeaders: {
            'Authorization': `Bearer ${authToken}`,
          },
        });
        return next.handle(newRequest).pipe(tap(() => {},
        (err: any) => {
          if(err instanceof HttpErrorResponse) {
            if(err.status == 401) {
              this.router.navigateByUrl('/login')
            }
          }
        }
        ));
      }
      return next.handle(request);
    }
  }
}
