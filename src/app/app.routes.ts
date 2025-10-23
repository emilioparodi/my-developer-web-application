import { Routes } from '@angular/router';
import { Home } from './home/home';
import { Certifications } from './certifications/certifications';
import { PrivacyAndCookiePolicy } from './privacy-and-cookie-policy/privacy-and-cookie-policy';

export const routes: Routes = [
  { path: "", component: Home },
  { path: "certifications", component: Certifications },
  { path:"privacy-and-cookie-policy", component: PrivacyAndCookiePolicy }
];
