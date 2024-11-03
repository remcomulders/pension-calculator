import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ParticipantProfile } from '../../types/participant.type';

@Injectable({
  providedIn: 'root',
})
export class PensionService {
  private readonly apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) {}

  getParticipantProfile(email: string): Observable<ParticipantProfile> {
    return this.http.get<ParticipantProfile>(
      `${this.apiUrl}/participant/${email}`
    );
  }

  calculatePension(email: string, retirementAge: number): Observable<number> {
    const params = new HttpParams().set(
      'retirementAge',
      retirementAge.toString()
    );
    return this.http.post<number>(
      `${this.apiUrl}/participant/${email}/calculate`,
      {},
      { params }
    );
  }
}
