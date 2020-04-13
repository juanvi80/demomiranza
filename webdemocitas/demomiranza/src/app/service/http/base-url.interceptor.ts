import { Injectable } from '@angular/core';
import {HttpHandler, HttpRequest, HttpInterceptor} from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { CacheLocalStorageResponse } from '../cache.service';

@Injectable({
  providedIn: 'root'
})
export class BaseURLInterceptor implements HttpInterceptor {
  urlbase: string;
  intercept(req: HttpRequest<any>, next: HttpHandler) {
    const tipocon: string = localStorage.getItem('TIPOCON');
    //console.log(tipocon);
    let hostname = environment.hostname;
    if(environment.production) {
      hostname = window.location.hostname;
    }
    if (tipocon && tipocon !== 'INTERNET') {
      this.urlbase = environment.protocol + '://' + hostname + ':' + environment.port + environment.baseURLIntranet;
    } else {
      this.urlbase = environment.protocol + '://' + hostname + ':' + environment.port + environment.baseURLInternet;
    }
    if (!req.url.match(/^http(s)?:\/\/(.*)$/)) {
      const url = `${this.urlbase}${req.url}`.replace(/([^:]\/)\/+/g, '$1');
      console.log(url);
      req = req.clone({ url });
    }
    return next.handle(req);
  }
}
