import { environment } from './../environments/environment';
import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, of } from "rxjs";
import { map, catchError } from "rxjs/operators";
import { throwError } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class ApiService {
  [x: string]: any;

  httpHeaders = new HttpHeaders();
  constructor(private http: HttpClient) {
    this.httpHeaders = this.httpHeaders.set("Content-Type", "application/json");
  }
  public static apiList = {
    //POST API's
    getToken:'/token',
    findVehcle:'/find',
    //GET API's
    planets:'/planets',
    vehcles:'/vehicles'
  };


  headerOptions(){
    let localvariable = "";
    if (localStorage.getItem("authToken")) {
      localvariable = localStorage.getItem("authToken");
    }
    let headerJson = {
      "Content-Type": "application/json",
      "Accept" : "application/json",
    };
    const httpOptions = {
      headers: new HttpHeaders(headerJson)
    };
    return httpOptions
  }
  get_service(url) {
    return this.http.get(environment.backendUrl + url, this.headerOptions()).pipe(
      map((response: any) => {
        return response;
      }),
      catchError(error => this.handleError(error))
    );
  }
  post_service(url, data) {
    return this.http.post(environment.backendUrl + url, data, this.headerOptions()).pipe(
        map((response: any) => {
          return response;
        }),
        catchError(error => this.handleError(error))
      );
  }
  private handleError(errorObj: HttpErrorResponse | any) {
    const _self = this;
    let errorMessage: string;
    let body: any;
    if (errorObj instanceof HttpErrorResponse) {
      if (errorObj.status === 401 || errorObj.status === 403) {
        errorMessage = "Session Expired";
      } else if (errorObj.ok === false && errorObj.status === 0) {
        errorMessage =
          "No internet connection or server might be unreachable. Please try again after sometime.";
      } else {
        body = errorObj.error || "";
        errorMessage = body.message;
      }
    }
    return throwError(errorMessage);
  }
}

