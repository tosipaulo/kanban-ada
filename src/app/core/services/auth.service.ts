import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { AuthUserModel } from './models/auth.model';
import { environment } from 'src/environments/environment';
import { TokenService } from './token.service';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient, private tokenService: TokenService) { }

  authenticate(data: AuthUserModel): Observable<string> {
    return this.http.post<string>(`${environment.api}/login`, data).pipe(
      map((token) => {
        this.tokenService.setToken(token);
        return token;
      })
    );
  }

}
