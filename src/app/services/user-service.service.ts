import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { LoginModel, RegisterModel } from '../components/models/user';
import { TokenService } from './token.service';

@Injectable({
  providedIn: 'root'
})
export class UserServiceService {
  endpoint: string = 'https://api-final-angular.herokuapp.com/api/authmanagement/'

  constructor(private http: HttpClient) { }

  login (data: LoginModel) {
    let api = `${this.endpoint}login`
    return this.http.post(api, data)
    .pipe(
      map((res: any) => {
        localStorage.setItem('TOKEN_ACCESS',res.token)
        return res || {}
      }),
      catchError(this.handleError)
    )
  }

  register (data: RegisterModel) {
    let api = `${this.endpoint}register`
    return this.http.post(api, data)
    .pipe(map((res: any) => {
        return res || {}
      }),
      catchError(this.handleError)
    )
  }

  handleError (err: HttpErrorResponse) {
    return throwError(err)
  }
}
