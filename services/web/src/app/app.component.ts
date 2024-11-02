import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { PrimeNGConfig } from 'primeng/api';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { FormsModule } from '@angular/forms';
import { InputNumberModule } from 'primeng/inputnumber';
import { PensionService } from './pension.service';
import { ParticipantProfile } from '../types/participant.type';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  imports: [
    FormsModule,
    CommonModule,
    RouterModule,
    ButtonModule,
    InputTextModule,
    InputNumberModule,
  ],
  standalone: true,
})
export class AppComponent implements OnInit {
  email: string = '';
  retirementAge: number = 67;
  profile: ParticipantProfile | null = null;
  projectedValueInCents: number | null = null;
  errorMessage: string | null = null;

  constructor(
    private primeengConfig: PrimeNGConfig,
    private pensionService: PensionService
  ) {}

  ngOnInit(): void {
    this.primeengConfig.ripple = true;
  }

  onBlurEmail(): void {
    if (this.email) {
      this.pensionService.getParticipantProfile(this.email).subscribe({
        next: (profile) => {
          this.profile = profile;
          this.errorMessage = null;
        },
        error: (err) => {
          console.error('Error fetching profile:', err);
          this.errorMessage =
            'Er is een fout opgetreden bij het ophalen van uw profiel. Controleer uw e-mailadres en probeer het opnieuw.';
          this.profile = null;
        },
      });
    } else {
      this.profile = null;
      this.errorMessage = null;
      this.projectedValueInCents = null;
    }
  }

  onCalculatePension(): void {
    this.projectedValueInCents = null;
    this.errorMessage = null;

    this.pensionService
      .calculatePension(this.email, this.retirementAge)
      .subscribe({
        next: (value) => (this.projectedValueInCents = value),
        error: (err) => {
          console.error('Error calculating pension:', err);
          this.errorMessage =
            'Er is een fout opgetreden bij het berekenen van de pensioenwaarde. Controleer uw gegevens en probeer het opnieuw.';
        },
      });
  }
}
