import {Injectable} from '@angular/core';
import {HttpEvent, HttpHandler, HttpInterceptor, HttpHeaders} from '@angular/common/http';
import {HttpRequest} from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
    constructor() {
    }
    intercept(req: HttpRequest<any>,
              next: HttpHandler): Observable<HttpEvent<any>> {
                const headers = new HttpHeaders({
                    'Accept': '*/*',
                    'Content-Type': 'application/json',
                    'Authorization': 'Basic ' + btoa('admin:xxxasdrfaefasdfADADFADFA')
                });
                const clonedRequest = req.clone({ headers: headers });
                return next.handle(clonedRequest);
    }
}
