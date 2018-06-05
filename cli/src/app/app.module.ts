import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { LoginComponent } from './auth/login/login.component';
import { RegisterComponent } from './auth/register/register.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import {AppRoutingModule} from "./app.routes";
import {HomeComponent} from "./dashboard/home/home.component";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {AuthGuardService} from "./services/auth-guard.service";
import {HttpClientModule} from "@angular/common/http";
import { TrashComponent } from './dashboard/trash/trash.component';
import { ActiveFilesComponent } from './dashboard/active-files/active-files.component';
import {AuthService} from "./services/auth.service";
import {FileService} from "./services/file.service";
import {ModalService} from "./services/modal.service";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {MaterialDesign} from "./material.design";
import { FileModalComponent } from './modals/file-modal/file-modal.component';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    HomeComponent,
    DashboardComponent,
    TrashComponent,
    ActiveFilesComponent,
    FileModalComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MaterialDesign,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [
    AuthService,
    FileService,
    ModalService,
    AuthGuardService
  ],
  entryComponents: [FileModalComponent],
  bootstrap: [AppComponent]
})
export class AppModule { }
