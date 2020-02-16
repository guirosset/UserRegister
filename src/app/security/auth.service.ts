import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable, pipe } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  url: string;
  jwtPayload: any;

  constructor(
    private http: HttpClient,
    private jwtHelper: JwtHelperService
  ) {
    this.url = `${environment.apiUrl}/oauth/token`
    this.tokenLoad()
  }

  login(username: string, password: string): Observable<void> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/x-www-form-urlencoded',
      'Authorization': 'Basic dGVzdGp3dGNsaWVudGlkOlhZN2ttem9OemwxMDA='
    });

    const body = `username=${username}&password=${password}&grant_type=password`;

    return this.http.post<any>(`${this.url}`, body, { headers, withCredentials: true })
      .pipe(map(response => {
        this.tokenStorage(response.access_token)
    }))

  }

  removeAccessToken() {
    localStorage.removeItem('token');
    this.jwtPayload = null;
  }

  tokenStorage(token: string) {
    this.jwtPayload = this.jwtHelper.decodeToken(token);
    localStorage.setItem('token', token)
  }

  tokenLoad() {
    const token = localStorage.getItem('token');

    if(token) {
      this.tokenStorage(token);
    }
  }

}
