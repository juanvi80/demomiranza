import { Component, Optional, OnInit, AfterViewInit, ViewChild } from '@angular/core';
import { UsuariosWeb } from '../../models/Usuariosweb';
import { Router } from '@angular/router';
import { MatSidenav } from '@angular/material/sidenav';
import { CacheLocalStorageResponse } from '../../service/cache.service';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements AfterViewInit  {
  isDarkTheme = false;
  lastDialogResult: string;
  mode: string;
  value: number;
  usulogin: boolean;
  @ViewChild('sidenav', {static: false}) sidenav: MatSidenav;
  ngAfterViewInit() {
    this.usulogin = UsuariosWeb && UsuariosWeb.checkUserLogin();
  }
  public onClickLink(url: string){
    this.sidenav.close();
    this.router.navigate([url]);
  }
  onProfile() {
    this.router.navigate(['main/perifl']);
  }
  logout() {
    localStorage.removeItem('usuarioLogin');
    CacheLocalStorageResponse.clearCaches();
    this.router.navigate(['/login'], { replaceUrl: true });
  }
  constructor(public router: Router) {

  }


}

