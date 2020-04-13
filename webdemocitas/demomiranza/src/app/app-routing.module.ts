import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { LoginGuard } from './guards/login.guard';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { PerfilComponent } from './components/perfil/perfil.component';
import { IntroComponent } from './components/intro/intro.component';
import { CentrosComponent } from './components/centos/centros.component';
import { AgendaCitasComponent } from './components/agendacitas/agendacitas.component';

const routes: Routes = [ { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'main', component: HomeComponent, canActivate: [LoginGuard],
    children: [
      { path: '', redirectTo: 'home', pathMatch: 'full' },
      { path: 'home', component: IntroComponent },
      { path: 'centros', component: CentrosComponent },
      { path: 'citas', component: AgendaCitasComponent },
      { path: 'perfil', component: PerfilComponent },
      { path: 'intro', component: IntroComponent }
    ]
  } ,
  { path: 'login', component: LoginComponent },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes)
  ],
  providers: [LoginGuard],
  exports: [RouterModule]
})
export class AppRoutingModule { }
