import { Component, Input } from '@angular/core';
import { ParticipantProfile } from '../../../types/participant.type';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-profile-details',
  templateUrl: './profile-details.component.html',
  imports: [CommonModule],
  standalone: true,
})
export class ProfileDetailsComponent {
  @Input() profile: ParticipantProfile | null = null;
}
