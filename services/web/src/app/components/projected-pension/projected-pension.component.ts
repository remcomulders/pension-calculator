import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-projected-pension',
  templateUrl: './projected-pension.component.html',
  imports: [CommonModule],
  standalone: true,
})
export class ProjectedPensionComponent {
  @Input() value: number | null = null;
}
