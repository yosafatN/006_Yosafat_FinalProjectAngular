import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { PaymentModel, ResponseModel } from '../components/models/user';
import { catchError, map } from 'rxjs/operators';
import { TokenService } from './token.service';
import { throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PaymentServiceService {
  endpoint: string = 'https://api-final-angular.herokuapp.com/api/payment/'
  
  headers = new HttpHeaders({
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Access-Control-Allow-Methods': 'GET,POST,OPTIONS,DELETE,PUT',
    'Authorization': 'Bearer '+ this.tokenService.getToken()
  })

  dataSource: PaymentModel[] = []

  constructor(private http: HttpClient, private tokenService: TokenService) { }

  getAllPayment () {
    let api = `${this.endpoint}`
    return this.http.get<ResponseModel>(api, {headers: this.headers})
    .pipe(
      map((res: ResponseModel) => {
        this.dataSource = res.data
        return res
      }),
      catchError(this.handleError)
    )
  }

  addPayment (data: PaymentModel) {
    let api = `${this.endpoint}`

    return this.http.post<ResponseModel>(api, data,  {headers: this.headers})
    .pipe(
      map((res: ResponseModel) => {
        return res
      }),
      catchError(this.handleError)
    )
  }

  editPayment (data: PaymentModel) {
    let api = `${this.endpoint}` + data.paymentDetailId

    return this.http.put<ResponseModel>(api, data,  {headers: this.headers})
    .pipe(
      map((res: ResponseModel) => {
        return res
      }),
      catchError(this.handleError)
    )
  }

  deletePayment (id: number) {
    let api = `${this.endpoint}` + id

    return this.http.delete<ResponseModel>(api, {headers: this.headers})
    .pipe(
      map((res: ResponseModel) => {
        return res
      }),
      catchError(this.handleError)
    )
  }

  getPaymentById (id: number): PaymentModel {
    return this.dataSource.find(x => x.paymentDetailId == id)!
  }

  handleError (err: HttpErrorResponse) {
    let msg = ''
    if (err.error instanceof ErrorEvent) {
      msg = err.error.message
    }
    else {
      msg = `Error Code: ${err.error.status}\nMessage: ${err.message}`
    }
    return throwError(msg)
  }

  logout() {
    this.tokenService.logout()
  }
}
