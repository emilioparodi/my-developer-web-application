import { Component, OnInit, signal, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-contact-form',
  imports: [CommonModule, RouterLink, RouterLinkActive],
  templateUrl: './contact-form.html',
  styleUrl: './contact-form.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ContactForm implements OnInit {
  // Stato del form gestito tramite segnale
  public formStatus = signal<'idle' | 'sending' | 'success' | 'error'>('idle');
  public captchaQuestion = signal<string>('');
  private correctAnswer: number = 0;

  // URL Formspree fornito dall'utente (xyznjybe)
  private formspreeUrl: string = 'https://formspree.io/f/xyznjybe';

  constructor(private cdr: ChangeDetectorRef) {}

  ngOnInit(): void {
    // Generazione iniziale del CAPTCHA all'avvio
    this.generateCaptcha();
  }

  /**
   * Genera l'operazione matematica casuale per il CAPTCHA.
   */
  generateCaptcha(): void {
    const num1 = Math.floor(Math.random() * 10) + 1;
    const num2 = Math.floor(Math.random() * 10) + 1;
    this.correctAnswer = num1 + num2;
    this.captchaQuestion.set(`How much is  ${num1} + ${num2}?`);
  }

  /**
   * Aggiorna lo stato del form e gestisce il timeout di successo.
   * @param newStatus Nuovo stato del form
   * @param form Riferimento al form HTML per il reset
   */
  public updateStatus(newStatus: 'idle' | 'success' | 'error', form?: HTMLFormElement): void {
      this.formStatus.set(newStatus);
      // Forza il Change Detection per aggiornare la UI immediatamente
      this.cdr.detectChanges();

      if (newStatus === 'success' && form) {
          form.reset();
          this.generateCaptcha(); // Rigenera il CAPTCHA

          // Ritorna a 'idle' dopo 5 secondi
          setTimeout(() => {
              this.formStatus.set('idle');
              this.cdr.detectChanges();
          }, 5000);
      }
  }

  /**
   * Validazione locale (CAPTCHA, Privacy, Campi vuoti) prima dell'invio via Fetch.
   * @param event Evento di submit
   */
  validateForm(event: Event): void {
    event.preventDefault();

    // Riferimenti agli elementi DOM (per la validazione imperativa)
    const captchaInput = document.getElementById('captchaInput') as HTMLInputElement;
    const privacyCheck = document.getElementById('privacyCheck') as HTMLInputElement;
    const errorMessage = document.getElementById('error-message') as HTMLElement;
    const contactForm = document.getElementById('contactForm') as HTMLFormElement;

    // Assicurati che l'errore sia nascosto prima di rivalutare
    errorMessage.style.display = 'none';

    // 1. Check CAPTCHA
    const userAnswer = parseInt(captchaInput.value, 10);
    const isCaptchaCorrect = userAnswer === this.correctAnswer;

    // 2. Check Privacy
    const isPrivacyChecked = privacyCheck.checked;

    // 3. Check Campi obbligatori (controllo aggiuntivo)
    const nameValue = (document.getElementById('name') as HTMLInputElement)?.value.trim();
    const emailValue = (document.getElementById('email') as HTMLInputElement)?.value.trim();
    const messageValue = (document.getElementById('message') as HTMLTextAreaElement)?.value.trim();

    const areFieldsFilled = nameValue !== '' && emailValue !== '' && messageValue !== '';

    if (isCaptchaCorrect && isPrivacyChecked && areFieldsFilled) {
        this.submitForm(contactForm);
    } else {
        // Logica errore di validazione locale
        errorMessage.style.display = 'block';

        // Se il captcha è sbagliato, puliamo il campo e rigeneriamo la domanda
        if (!isCaptchaCorrect) {
          captchaInput.value = '';
          this.generateCaptcha();
        }

        this.cdr.detectChanges(); // Aggiorna la UI per mostrare l'errore
    }
  }

  /**
   * Invia i dati a Formspree utilizzando l'API Fetch (AJAX).
   * @param form Riferimento al form HTML.
   */
  private submitForm(form: HTMLFormElement): void {
    this.formStatus.set('sending');
    this.cdr.detectChanges(); // Forza: Mostra 'Invio in corso...'

    const data = new FormData(form);

    fetch(this.formspreeUrl, {
        method: form.method,
        body: data,
        headers: { 'Accept': 'application/json' }
    })
    .then(response => {
        if (response.ok) {
            this.updateStatus('success', form);
        } else {
            // Risposta OK dal server, ma il contenuto potrebbe non essere quello atteso
            this.updateStatus('error');
        }
    })
    .catch(error => {
        // Errore di rete
        console.error('Fetch error:', error);
        this.updateStatus('error');
    });
  }
}
