import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-error-message',
  template: `<p *ngIf="message" class="text-red-600">{{ message }}</p>`,
  imports: [CommonModule],
  standalone: true,
})
export class ErrorMessageComponent {
  @Input() message: string | null = null;
}
