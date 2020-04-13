import { LoginComponent } from "../components/login/login.component";
import { environment } from '../../environments/environment';

export class UsuariosWeb{
    public idUsuario: number;
	public codigo: string;
    public password: string;
    public cliente: string;
     private loginTimeStamp: number;
     private static USER_CREDENTIALS_LS_KEY = 'credentials-user';
     public static save(userCredentials: UsuariosWeb) {
        userCredentials.loginTimeStamp = Date.now();
        localStorage.setItem(UsuariosWeb.USER_CREDENTIALS_LS_KEY, JSON.stringify(userCredentials));
    }
    public static checkUserLogin(): boolean {
      const userCredentials: UsuariosWeb = UsuariosWeb.load();
      if (!userCredentials || !userCredentials.getLoginTimeStamp()) {
          throw Error('You are not login in application.');
      } else {
          const timeDiff = Date.now() - userCredentials.getLoginTimeStamp();
          if (timeDiff > environment.apiMaxSessionTime) {
              return false;
          }
      }
      return true;
  }

    public static load(): UsuariosWeb {
        const userCredentialsString: string = localStorage.getItem(UsuariosWeb.USER_CREDENTIALS_LS_KEY);
        const userCredentials: UsuariosWeb = JSON.parse(userCredentialsString);
        if (userCredentials) {
            Object.setPrototypeOf(userCredentials, UsuariosWeb.prototype);
        }
        return userCredentials;
    }

    public static clear() {
        localStorage.removeItem(UsuariosWeb.USER_CREDENTIALS_LS_KEY);
    }

    public getLoginTimeStamp():number{
        return this.loginTimeStamp;

    }
}
