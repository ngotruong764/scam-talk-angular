import { Routes } from '@angular/router';
import {AuthenticationComponent} from "./features/authentication/authentication/authentication.component";
import {LandingComponent} from "./features/landing/landing.component";

export const routes: Routes = [
  {
    path: '',
    component: LandingComponent,
  },
  {
    path: 'auth',
    component: AuthenticationComponent,
  },
  {
    path: '**',
    component: LandingComponent,
  },
];
