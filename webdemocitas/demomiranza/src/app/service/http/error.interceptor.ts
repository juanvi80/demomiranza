import { Injectable, Inject } from '@angular/core';
import {HttpHandler, HttpRequest, HttpInterceptor} from '@angular/common/http';
import {throwError} from 'rxjs';
import {catchError} from 'rxjs/internal/operators';
import { ErrorService } from '../error.service';

@Injectable({
  providedIn: 'root'
})
export class HttpErrorInterceptor implements HttpInterceptor {

  constructor(public errorService: ErrorService) {}

  intercept(req: HttpRequest<any>, next: HttpHandler) {
    return next.handle(req).pipe(
      catchError(error => {
        let errorMessage = '';
        if (error instanceof ErrorEvent) {
          // client-side error
          errorMessage = 'Error de cliente: ${error.error.message}';
        } else {
          // backend error
          if (error.error) {
            errorMessage = 'Error de servidor: ' +  error.error.message;
          } else {
            errorMessage = 'Error de servidor: ' + error.status + ':' + error.message;
          }

        }
        console.log(JSON.stringify(error));
        console.log(errorMessage);
        // aquí podrías agregar código que muestre el error en alguna parte fija de la pantalla.
        this.errorService.show(errorMessage);
        return throwError(errorMessage);
      })
    );
  }
}
