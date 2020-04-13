import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { UsuariosWeb } from '../models/Usuariosweb';
import { Logincliente } from '../models/Logincliente';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root',
})
export class LoginService {
    constructor(private http: HttpClient) {}
    loginUsuario(usuario: string, pass: string): Observable<UsuariosWeb> {
        let usu: UsuariosWeb = new UsuariosWeb();
        usu.idUsuario = 0;
        usu.codigo = usuario;
        usu.password = pass;
        return this.http.post<UsuariosWeb>('/usuarios/login', usu);
     }
     loginUsuarioCliente(usuario: string, pass: string): Observable<Logincliente> {
        let usu: UsuariosWeb = new UsuariosWeb();
        usu.idUsuario = 0;
        usu.codigo = usuario;
        usu.password = pass;
        return this.http.post<Logincliente>('/usuarios/logincliente', usu);
     }
}
