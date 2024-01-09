import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
} from '@angular/common/http';
import { Observable,throwError } from 'rxjs';
import { catchError,finalize } from 'rxjs/operators';

import { IsLoadingService } from '../Preloader/is-loading.service';
/**
 * We intercept every api call to setup the spinner
 */
@Injectable()
export class Aq54HttpInterceptor implements HttpInterceptor {

  constructor(public loader:IsLoadingService) {}
/**
 ** intercept
 is an implementation of
 ** HttpInterceptor fron Angular common http
 we intercept every request and decide wether to enable spinner or not
 * @param request
 * @param next
 * @returns
 */
  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
   if(request.url.includes('getRange')||request.url.includes('getSessionInfo')){
      this.loader.setLoading(true)
      return next.handle(request).pipe(
        finalize(()=>{
            this.loader.setLoading(false);
        }),
        catchError((error:any)=>{
          this.loader.setLoading(false);
          //console.log(error)
          return throwError(error)
        })
        )
   }else{
    return next.handle(request)
   }

  }
}


