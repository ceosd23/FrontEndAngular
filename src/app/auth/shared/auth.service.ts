import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {SignupRequest} from '../../signUp/signupRequest';
import {Observable} from 'rxjs';
import {Loginrequest} from '../../login/loginrequest';
import {LoginResponse} from '../../login/loginResponse';
import {map, tap} from 'rxjs/operators';
import {LocalStorageService} from 'ngx-webstorage';

@Injectable({
  providedIn: 'root'
})

export class AuthService {
baseUrl = 'http://192.168.0.8:8080/api/auth';
  constructor(private httpClient: HttpClient,
              private  localStorage: LocalStorageService)
  { }
  signup(singupRequest: SignupRequest): Observable<any>
  {
    return this.httpClient.post(this.baseUrl + '/signup', singupRequest, { responseType: 'text' } );
  }
  login(loginrequest: Loginrequest): Observable< string >
  {
   return   this.httpClient.post<LoginResponse>(this.baseUrl + '/login', loginrequest)
      .pipe(map(data => {
        this.localStorage.store('authenticateToken', data.authenticateToken);
        this.localStorage.store('username' , data.username);
        this.localStorage.store('refreshToken' , data.refreshToken);
        this.localStorage.store('expiresAt' , data.expiresAt);
        return data.message;
      }));
  }
  getJwtToken(): string
  {
    return this.localStorage.retrieve('authenticateToken');
  }
  refreshToken(): Observable<LoginResponse>
  {
    const token =
      {
        refreshToken: this.getRefreshToken(),
        username: this.getUsername()
      };
    return this.httpClient.post<LoginResponse>( this.baseUrl + '/refresh/token', token)
       .pipe(tap( response => {
         this.localStorage.store('authenticateToken', response.authenticateToken);
         this.localStorage.store('expiresAt', response.expiresAt );
       }));
  }
  getUsername(): any
  {
    return this.localStorage.retrieve('username');
  }
  getRefreshToken(): any{
    return this.localStorage.retrieve( 'refreshToken');
  }

}
