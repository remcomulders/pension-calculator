import { TestBed } from '@angular/core/testing';
import {
  HttpTestingController,
  provideHttpClientTesting,
} from '@angular/common/http/testing';
import { PensionService } from './pension.service';
import { environment } from '../../environments/environment';
import { mockProfile } from '../../mocks/participant.mock';
import { provideHttpClient } from '@angular/common/http';

describe('PensionService', () => {
  let service: PensionService;
  let httpTestingController: HttpTestingController;

  const mockProjectedValue = 10480268;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        PensionService,
        provideHttpClient(),
        provideHttpClientTesting(),
      ],
    });
    service = TestBed.inject(PensionService);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpTestingController.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('#getParticipantProfile', () => {
    it('should retrieve the participant profile by email', () => {
      const email = 'johndoe@befrank.nl';
      service.getParticipantProfile(email).subscribe((profile) => {
        expect(profile).toEqual(mockProfile);
      });

      const req = httpTestingController.expectOne(
        `${environment.apiUrl}/participant/${email}`
      );
      expect(req.request.method).toEqual('GET');
      req.flush(mockProfile);
    });

    it('should handle 404 error when profile is not found', () => {
      const email = 'nonexistent@befrank.nl';
      service.getParticipantProfile(email).subscribe({
        next: () => fail('Expected error, but got a response'),
        error: (error) => {
          expect(error.status).toEqual(404);
        },
      });

      const req = httpTestingController.expectOne(
        `${environment.apiUrl}/participant/${email}`
      );
      expect(req.request.method).toEqual('GET');
      req.flush('Profile not found', { status: 404, statusText: 'Not Found' });
    });
  });

  describe('#calculatePension', () => {
    it('should calculate the projected pension value by email and retirement age', () => {
      const email = 'johndoe@befrank.nl';
      const retirementAge = 65;

      service.calculatePension(email, retirementAge).subscribe((value) => {
        expect(value).toEqual(mockProjectedValue);
      });

      const req = httpTestingController.expectOne(
        `${environment.apiUrl}/participant/${email}/calculate?retirementAge=${retirementAge}`
      );
      expect(req.request.method).toEqual('POST');
      req.flush(mockProjectedValue);
    });

    it('should handle server error during pension calculation', () => {
      const email = 'johndoe@befrank.nl';
      const retirementAge = 65;

      service.calculatePension(email, retirementAge).subscribe({
        next: () => fail('Expected error, but got a response'),
        error: (error) => {
          expect(error.status).toEqual(500);
        },
      });

      const req = httpTestingController.expectOne(
        `${environment.apiUrl}/participant/${email}/calculate?retirementAge=${retirementAge}`
      );
      expect(req.request.method).toEqual('POST');
      req.flush('Server error', {
        status: 500,
        statusText: 'Internal Server Error',
      });
    });
  });
});
