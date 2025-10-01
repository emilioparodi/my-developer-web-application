import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { About } from '../about/about';
import { Skills } from '../skills/skills';
import { Experience } from "../experience/experience";
import { Portfolio } from "../portfolio/portfolio";
import { ContactForm } from "../contact-form/contact-form";
import { ScrollTopButton } from "../scroll-top-button/scroll-top-button";

@Component({
  selector: 'app-home',
  imports: [About, Skills, Experience, Portfolio, ContactForm, ScrollTopButton],
  templateUrl: './home.html',
  styleUrl: './home.css'
})
export class Home {

}
