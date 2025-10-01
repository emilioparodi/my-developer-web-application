import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { NgbCollapseModule } from '@ng-bootstrap/ng-bootstrap';


@Component({
  selector: 'app-navbar',
  imports: [RouterLink, NgbCollapseModule],
  templateUrl: './navbar.html',
  styleUrl: './navbar.css'
})
export class Navbar {
    isMenuCollapsed = true;
    constructor(private router: Router) {}

    // Gestisce lo scroll: Naviga a '/' se non ci sei, altrimenti scrolla.
    scrollToElement(fragment: string): void {
        const currentUrl = this.router.url.split('#')[0];

        if (currentUrl === '/') {
            // Se siamo in Home, usiamo lo scroll nativo dopo un breve ritardo
            setTimeout(() => {
                document.getElementById(fragment)?.scrollIntoView({ behavior: 'smooth' });
            }, 50);
        } else {
            // Se siamo altrove (es. Privacy), naviga alla Home con il fragment.
            this.router.navigate(['/'], { fragment: fragment });
        }
    }

    scrollToTop(): void {
        this.router.navigate(['/']);
        setTimeout(() => {
             window.scrollTo({ top: 0, behavior: 'smooth' });
        }, 50);
    }
}
