import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { LayoutModule } from '@angular/cdk/layout';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { RouterModule, Routes } from '@angular/router';
import {HttpClientModule} from "@angular/common/http";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {ConfirmationPopoverModule} from "angular-confirmation-popover";
import {OrderService} from './service/order.service';
import {OrderPage} from './order/order.component';
import {UserService} from './service/user.service';
import {HomePage} from './home/home.component';
import {OrderViewPage} from './order/order-view.component';
import { NgxLoadingModule } from 'ngx-loading';
import {LoginPage} from './login/login.component';
import {LocalStorageModule} from 'angular-2-local-storage';
import {OrderSettingPage} from './order/order-setting.component';

const appRoutes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'login', component: LoginPage },
  { path: 'home', component: HomePage },
  { path: 'order', component: OrderPage },
  { path: 'order/view/:orderId', component: OrderViewPage },
  { path: 'order/setting', component: OrderSettingPage },
];

@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    OrderPage,
    HomePage,
    OrderViewPage,
    LoginPage,
    OrderSettingPage
  ],
  imports: [
    BrowserModule,
    LayoutModule,
    BrowserAnimationsModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forRoot(appRoutes),
    FormsModule,
    ConfirmationPopoverModule.forRoot({
      confirmButtonType: 'danger' // set defaults here
    }),
    NgxLoadingModule.forRoot({}),
    LocalStorageModule.forRoot({
      prefix: 'setel',
      storageType: 'localStorage'
    }),
  ],
  providers: [
    OrderService,
    UserService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
