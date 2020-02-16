import { Routes } from '@angular/router';
import { AppComponent } from './app.component';

import { LoginComponent } from './security/login/login.component';
import { OrderUserComponent } from './user/order-user/order-user.component';
import { SearchUsersComponent } from './user/search-users/search-users.component';

export const ROUTES: Routes = [ 
    { path: '', component: AppComponent },
    { path: 'login', component: LoginComponent },
    { path: 'users/novo', component: OrderUserComponent },
    { path: 'users/:id', component: OrderUserComponent },
    { path: 'users', component: SearchUsersComponent }
    
]