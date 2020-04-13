import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LoginComponent } from './components/login/login.component';
import { HomeComponent } from './components/home/home.component';
import { LoginGuard } from './guards/login.guard';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { AuthInterceptor } from './service/http/auth.interceptor';
import { BaseURLInterceptor } from './service/http/base-url.interceptor';
import { HttpErrorInterceptor } from './service/http/error.interceptor';
import { ErrorService } from './service/error.service';
import { CommonModule } from '@angular/common';
import { PerfilComponent } from './components/perfil/perfil.component';
import { IntroComponent } from './components/intro/intro.component';
import { FlexLayoutModule } from '@angular/flex-layout';
import { ChartsModule } from 'ng2-charts';
import { ScrollingModule } from '@angular/cdk/scrolling';
import {TableModule} from 'primeng/table';
import {DropdownModule} from 'primeng/dropdown';
import { MessageService } from 'primeng/api';
import { EstadoPipe } from './pipes/estado.pipe';
import { NumberFormatPipe } from './pipes/decimal.pipe';
import { ConfirmationDialogComponent } from './components/confirmation-dialog/confirmation-dialog.component';
import { CentrosComponent } from './components/centos/centros.component';
import { AgendaCitasComponent } from './components/agendacitas/agendacitas.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HomeComponent,
    CentrosComponent,
    PerfilComponent,
    IntroComponent,
    AgendaCitasComponent,
    EstadoPipe,
    NumberFormatPipe,
    ConfirmationDialogComponent
  ],
  imports: [
    CommonModule,
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
    FlexLayoutModule,
    ChartsModule,
    ScrollingModule,
    HttpClientModule,
    TableModule,
    DropdownModule

  ],
  entryComponents: [

  ],
  providers: [LoginGuard, MessageService,
    [ { provide: HTTP_INTERCEPTORS, useClass:
      AuthInterceptor, multi: true },
      { provide: HTTP_INTERCEPTORS, useClass: BaseURLInterceptor, multi: true },
      { provide: HTTP_INTERCEPTORS, useClass: HttpErrorInterceptor, deps: [ErrorService], multi: true } ]],
  bootstrap: [AppComponent],

})
export class AppModule { }
