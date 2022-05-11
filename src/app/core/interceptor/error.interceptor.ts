import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { AuthenticationService } from '../services/authentication.service';
import { NotifierService } from 'angular-notifier';


@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
    private notifier: NotifierService;

    constructor(
      private authenticationService: AuthenticationService,
      private notifierService: NotifierService
      ) {
        this.notifier = notifierService;
       }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        return next.handle(request).pipe(
          tap(success => {
            // this.notifier.notify('success', 'Operação realizada com sucesso.');
          }),
          catchError(err => {
            if ([401, 403].includes(err.status) && this.authenticationService.userValue || !this.authenticationService.userValue) {
                // auto logout if 401 or 403 response returned from api
                this.authenticationService.logout();
            }

            const error = (err && err.error && err.error.message) || err.statusText;
            // this.notifier.notify('error', err.error.message || err.statusText);
            return throwError(error);
        }))
    }
}
