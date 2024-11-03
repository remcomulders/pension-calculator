import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { PrimeNGConfig } from 'primeng/api';
import { PensionService } from './services/pension.service';
import { ParticipantProfile } from '../types/participant.type';
import { PensionCalculatorFormComponent } from './components/pension-calculator-form/pension-calculator-form.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  imports: [CommonModule, RouterModule, PensionCalculatorFormComponent],
  standalone: true,
})
export class AppComponent {
  email: string = '';
  retirementAge: number = 67;
  profile: ParticipantProfile | null = null;
  projectedValue: number | null = null;
  errorMessage: string | null = null;

  private readonly errorMessages = {
    profileLoad:
      'Er is een fout opgetreden bij het ophalen van uw profiel. Controleer uw e-mailadres en probeer het opnieuw.',
    pensionCalculation:
      'Er is een fout opgetreden bij het berekenen van de pensioenwaarde. Controleer uw gegevens en probeer het opnieuw.',
  };

  constructor(
    private primeengConfig: PrimeNGConfig,
    private pensionService: PensionService
  ) {
    this.primeengConfig.ripple = true;
  }

  onBlurEmail(): void {
    if (!this.email) {
      this.resetData();
      return;
    }

    this.pensionService.getParticipantProfile(this.email).subscribe({
      next: (profile) => {
        this.profile = profile;
        this.errorMessage = null;
      },
      error: (err) => this.handleError(err, 'profileLoad'),
    });
  }

  onCalculatePension(): void {
    this.resetCalculation();

    this.pensionService
      .calculatePension(this.email, this.retirementAge)
      .subscribe({
        next: (value) => (this.projectedValue = value),
        error: (err) => this.handleError(err, 'pensionCalculation'),
      });
  }

  private handleError(
    err: any,
    errorType: keyof typeof this.errorMessages
  ): void {
    console.error(`Error: ${this.errorMessages[errorType]}`, err);
    this.errorMessage = this.errorMessages[errorType];
  }

  private resetData(): void {
    this.profile = null;
    this.errorMessage = null;
    this.projectedValue = null;
  }

  private resetCalculation(): void {
    this.projectedValue = null;
    this.errorMessage = null;
  }
}
