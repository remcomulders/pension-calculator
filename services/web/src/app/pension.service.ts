import { Injectable } from '@angular/core';
import { environment } from '../environments/environment';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ParticipantProfile } from '../types/participant.type';

@Injectable({
  providedIn: 'root',
})
export class PensionService {
  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) {}

  getParticipantProfile(email: string): Observable<ParticipantProfile> {
    const url = `${this.apiUrl}/participant/${email}`;
    return this.http.get<ParticipantProfile>(url);
  }

  calculatePension(email: string, retirementAge: number): Observable<number> {
    const url = `${this.apiUrl}/participant/${email}/calculate`;
    const params = new HttpParams().set(
      'retirementAge',
      retirementAge.toString()
    );
    return this.http.post<number>(url, {}, { params });
  }
}
