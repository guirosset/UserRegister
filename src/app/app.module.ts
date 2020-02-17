import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { RouterModule } from '@angular/router';

import { JwtHelperService, JwtModule } from '@auth0/angular-jwt';
import { ToastrModule } from 'ng6-toastr-notifications';

import { AppComponent } from './app.component';
import { ROUTES } from './app.routes';
import { AuthService } from './security/auth.service';
import { LoginComponent } from './security/login/login.component';
import { environment } from 'src/environments/environment';
import { OrderUserComponent } from './user/order-user/order-user.component';
import { GroupService } from './group/group.service';
import { UserService } from './user/user.service';
import { FooterComponent } from './core/footer/footer.component';
import { HeaderComponent } from './core/header/header.component';
import { SidebarLeftComponent } from './core/sidebar-left/sidebar-left.component';
import { SidebarRightComponent } from './core/sidebar-right/sidebar-right.component';
import { InputContentComponent } from './shared/input-content/input-content.component';
import { InputRadioComponent } from './shared/input-radio/input-radio.component';
import { SearchUsersComponent } from './user/search-users/search-users.component';
import { ModalDeleteComponent } from './shared/modal-delete/modal-delete.component';
import { HttpErrorInterceptor } from './http-error.interceptor';
import { RegisterPersonComponent } from './register/register-person/register-person.component';
import { RegisterPersonService } from './register/register-person.service';

export function tokenGetter() {
  return localStorage.getItem('token');
}

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    OrderUserComponent,
    FooterComponent,
    HeaderComponent,
    SidebarLeftComponent,
    SidebarRightComponent,
    InputContentComponent,
    InputRadioComponent,
    SearchUsersComponent,
    ModalDeleteComponent,
    RegisterPersonComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    ToastrModule.forRoot(),
    ReactiveFormsModule,
    HttpClientModule,
    JwtModule.forRoot({
      config: {
        tokenGetter: tokenGetter,
        whitelistedDomains: environment.tokenWhitelistedDomains,
        blacklistedRoutes: environment.tokenBlacklistedRoutes
      }
    }),
    RouterModule.forRoot(ROUTES)
  ],
  providers: [
    GroupService, 
    UserService,
    RegisterPersonService,
    JwtHelperService, 
    AuthService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: HttpErrorInterceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
