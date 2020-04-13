import { Logincliente } from './../../models/logincliente';
import { Subscription } from 'rxjs';
import { Component, OnInit, Inject, OnDestroy, Input } from '@angular/core';
import { Router } from '@angular/router';
import { DOCUMENT } from '@angular/common';
import { NgForm, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { LoginService } from '../../service/LoginService';
import { MaestroService } from '../../service/maestro.service';
import { UsuariosWeb } from 'src/app/models/Usuariosweb';



@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit, OnDestroy {

  public static LAST_USERNAME_STORAGE_KEY = 'lastUsername';
  private static TOAST_DURATION = 5000;
  usu: Logincliente;
  loginUser = {
    email: '',
    password: '',
    red: ''
  };

  mostrarLogin = false;
  version = '0.0.1';

  public logoUrl = 'assets/logo-miranza-300x59.png';
  public isLoginLoading = false;
  public isUnauthorized = false;
  captcha = false;
  acceptButton = false;
  showLeyenda = false;
  resetPasswordUrl: string;
  showDownloadAnchor = false;
  hrefDownloadAnchor = '';
  suslogin: Subscription;
  forma: FormGroup;
  private formSubmitAttempt: boolean;
  hide = true;

  private lastTimeClickVersion = null;
  private clicksNumberOnVersion = 0;
  private readonly sendReportErrorEmailContact: string = 'jvcarrasco@gmail.com';

  constructor(private fb: FormBuilder,
              @Inject(DOCUMENT) private document: Document,
              @Inject(Router) private router: Router,
              @Inject(LoginService) public loginService: LoginService,
              @Inject(MaestroService) public maestroService: MaestroService
              ) {

      let resetPasswordUrlBase: string;
      resetPasswordUrlBase += '/';
      this.resetPasswordUrl = resetPasswordUrlBase + 'login';

  }

  async ngOnInit() {
    console.log(window.location.hostname);

    console.log(window.location.origin);
    const lastUsername: string = localStorage.getItem(LoginComponent.LAST_USERNAME_STORAGE_KEY);
    this.forma = this.fb.group({
      userName: ['', Validators.required],
      password: ['', Validators.required]
    });
    if (lastUsername) {
      this.loginUser.email = lastUsername;
    }
    this.loginUser.red = 'INTERNET';
    const tipocon: string = localStorage.getItem('TIPOCON');
    if (tipocon) {
      this.loginUser.red = tipocon;
    } else {
      localStorage.setItem('TIPOCON', 'INTERNET');
    }
    this.mostrarLogin = true;
  }


  settipoCon() {
    localStorage.setItem('TIPOCON', this.loginUser.red);

    //this.loginUser.red =group.value;

  }
  ngOnDestroy() {
    if (this.suslogin) {
      this.suslogin.unsubscribe();
    }
  }
  onChangeEmailField() {
  }

  clickOnVersion() {
  }
  isFieldInvalid(field: string) { // {6}
    return (
      (!this.forma.get(field).valid && this.forma.get(field).touched) ||
      (this.forma.get(field).untouched && this.formSubmitAttempt)
    );
  }
  async login( fLogin: NgForm ) {
    if ( fLogin.invalid ) { return; }
    if ( this.isLoginLoading ) { return; } // Not multiple submit
    this.isLoginLoading = true;
    this.settipoCon();
    //this.suslogin = this.loginService.loginUsuarioCliente(this.loginUser.email, this.loginUser.password).subscribe(
    // data => {this.usu = data;
    let usuario = new UsuariosWeb();
    usuario.codigo = this.loginUser.email;
    usuario.idUsuario = 1;
    usuario.password = this.loginUser.password;
    localStorage.setItem(LoginComponent.LAST_USERNAME_STORAGE_KEY, this.loginUser.email);
    //UsuariosWeb.save(this.usu.usu);
    this.showLeyenda = false;
    //this.maestroService.setLCliente(this.usu);
    this.maestroService.getMaestros();
    console.log('hola');
    this.router.navigate(['/main']).finally(this.onFinishNavigateAfterLogin);
}

  onFinishNavigateAfterLogin = () => {
    this.resetLogin();
  }

  private resetLogin() {
    this.isLoginLoading = false;
    this.isUnauthorized = false;
    if (!this.isWeb()) {
      this.logoUrl = '';
      /*this.document.documentElement.style.cssText = this.themeInfo.cssText;*/
    }
  }

  isWeb(): boolean {
    //return this.platform.is('desktop') || this.platform.is('mobileweb');
    return true;
  }

  resetPassword() {}

  showAcceptButton(event) {
    this.acceptButton = event.showAcceptButton;
  }

  showCaptcha() {
    this.captcha = true;
    this.showLeyenda = false;
  }

  async changePassword() {}
}
