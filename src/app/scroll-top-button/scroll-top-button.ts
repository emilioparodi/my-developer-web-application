import { Component, HostListener, signal } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-scroll-top-button',
  imports: [CommonModule],
  templateUrl: './scroll-top-button.html',
  styleUrl: './scroll-top-button.css'
})
export class ScrollTopButton {
    showButton = signal(false);

    // Mostra/Nascondi il pulsante in base alla posizione di scroll
    @HostListener('window:scroll')
    onWindowScroll() {
        if (window.scrollY > 300) {
            this.showButton.set(true);
        } else {
            this.showButton.set(false);
        }
    }

    // Funzione per scorrere all'inizio della pagina
    scrollToTop() {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }
}
