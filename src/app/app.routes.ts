import { Routes } from '@angular/router';
import { PrivacyAndCookiePolicy } from './privacy-and-cookie-policy/privacy-and-cookie-policy';
import { Home } from './home/home';

export const routes: Routes = [
  { path: "", component: Home },
  { path:"privacy-and-cookie-policy", component: PrivacyAndCookiePolicy }
];
