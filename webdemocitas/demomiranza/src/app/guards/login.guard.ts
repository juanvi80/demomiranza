import { Injectable, Inject } from '@angular/core';
import { CanLoad, Router, CanActivate } from '@angular/router';
import { Observable } from 'rxjs';
import { LoginComponent } from '../components/login/login.component';
import { LoginService } from '../service/LoginService';
import { UsuariosWeb } from '../models/Usuariosweb';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class LoginGuard implements CanLoad, CanActivate {
    loginUser: UsuariosWeb;
  constructor(
    private router: Router,
    @Inject(LoginService) public loginService: LoginService,
  ) { }
  private checkUserLogin(): boolean {
    /*const userCredentials: UsuariosWeb = UsuariosWeb.load();
    if (!userCredentials || !userCredentials.getLoginTimeStamp()) {
        throw Error('You are not login in application.');
    } else {
        const timeDiff = Date.now() - userCredentials.getLoginTimeStamp();
        if (timeDiff > environment.apiMaxSessionTime) {
            UsuariosWeb.clear();
            this.router.navigate(['login'], { replaceUrl: true }).finally(() => {
             });
            return false;
        }
    }*/
    return true;
}


  canActivate(): Observable<boolean> | Promise<boolean> | boolean  {
    try {
      // TODO: redireccionar al loading cuando se carga por primera vez
      /*this.loginUser = localStorage.getItem('lastUsername');*/

      //return true;
      if (!this.checkUserLogin() ) {
        this.router.navigate(['login'], { replaceUrl: true });
        return false;
      }
      //this.router.navigate(['main'], { replaceUrl: true });
      return true;
    } catch (error) {
      this.router.navigate(['login'], { replaceUrl: true });
      return false;
    }
  }
  canLoad(): Observable<boolean> | Promise<boolean> | boolean  {
    try {
      // TODO: redireccionar al loading cuando se carga por primera vez
      /*this.loginUser = localStorage.getItem('lastUsername');*/

      //return false;
      if (!this.checkUserLogin() ) {
        this.router.navigate(['login'], { replaceUrl: true });
        return false;
      }
      //this.router.navigate(['main'], { replaceUrl: true });
      return true;
    } catch (error) {
      this.router.navigate(['login'], { replaceUrl: true });
      return false;
    }
  }
}
