import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { InputNumberModule } from 'primeng/inputnumber';
import { InputTextModule } from 'primeng/inputtext';
import { ErrorMessageComponent } from '../error-message/error-message.component';
import { ProjectedPensionComponent } from '../projected-pension/projected-pension.component';
import { ProfileDetailsComponent } from '../profile-details/profile-details.component';
import { ParticipantProfile } from '../../../types/participant.type';

@Component({
  selector: 'app-pension-calculator-form',
  templateUrl: './pension-calculator-form.component.html',
  imports: [
    FormsModule,
    CommonModule,
    ButtonModule,
    InputTextModule,
    InputNumberModule,
    ProfileDetailsComponent,
    ErrorMessageComponent,
    ProjectedPensionComponent,
  ],
  standalone: true,
})
export class PensionCalculatorFormComponent {
  @Input() email: string = '';
  @Output() emailChange = new EventEmitter<string>();

  @Input() retirementAge: number = 67;
  @Output() retirementAgeChange = new EventEmitter<number>();

  @Input() profile: ParticipantProfile | null = null;
  @Input() errorMessage: string | null = null;
  @Input() projectedValue: number | null = null;

  @Output() emailBlur = new EventEmitter<void>();
  @Output() calculate = new EventEmitter<void>();

  onBlurEmail(): void {
    this.emailBlur.emit();
  }

  onCalculate(): void {
    this.calculate.emit();
  }

  onEmailInputChange(value: string): void {
    this.email = value;
    this.emailChange.emit(value);
  }

  onRetirementAgeInputChange(value: number): void {
    this.retirementAge = value;
    this.retirementAgeChange.emit(value);
  }
}
