import { Injectable } from '@angular/core';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest, HttpErrorResponse } from '@angular/common/http';

import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

const HTTP_PATTERN = new RegExp('^(?:[a-z]+:)?//', 'i');

@Injectable()
export class RequestInterceptor implements HttpInterceptor {

    // private context: { [name: string]: string } = {
    //     'language': 'en',
    //     'UTC-offset': moment().format('Z'),
    //     'platform': 'consumer-portal',
    // };

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
            const url = environment.backendUrl + req.url;
            const setHeaders: { [name: string]: any } = {
            };
         req = req.clone({ url, setHeaders});
        return next.handle(req).pipe(
            catchError((error: HttpErrorResponse) => {
                if (error.status === 503) {
                    document.body.innerHTML = error.error['html_content'];
                }
                return throwError(error.error);
            })
        );
    }
}









