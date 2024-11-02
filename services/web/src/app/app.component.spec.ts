import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { PensionService } from './pension.service';
import { PrimeNGConfig } from 'primeng/api';
import { of, throwError } from 'rxjs';
import { FormsModule } from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';
import { InputNumberModule } from 'primeng/inputnumber';
import { ButtonModule } from 'primeng/button';
import { ParticipantProfile } from '../types/participant.type';

describe('AppComponent', () => {
  let component: AppComponent;
  let fixture: ComponentFixture<AppComponent>;
  let pensionService: jasmine.SpyObj<PensionService>;
  let primeNGConfig: jasmine.SpyObj<PrimeNGConfig>;

  const mockProfile: ParticipantProfile = {
    name: 'John Doe',
    birthDate: '1964-05-10',
    email: 'johndoe@befrank.nl',
    fullTimeSalary: 6000000,
    partTimePercentage: 0.8,
    employed: true,
    pensionAccountId: 1,
  };

  const mockProjectedValue = 10480268;

  beforeEach(async () => {
    const pensionServiceSpy = jasmine.createSpyObj('PensionService', [
      'getParticipantProfile',
      'calculatePension',
    ]);
    const primeNGConfigSpy = jasmine.createSpyObj('PrimeNGConfig', ['']);

    await TestBed.configureTestingModule({
      imports: [
        FormsModule,
        InputTextModule,
        InputNumberModule,
        ButtonModule,
        AppComponent,
      ],
      providers: [
        { provide: PensionService, useValue: pensionServiceSpy },
        { provide: PrimeNGConfig, useValue: primeNGConfigSpy },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;
    pensionService = TestBed.inject(
      PensionService
    ) as jasmine.SpyObj<PensionService>;
    primeNGConfig = TestBed.inject(
      PrimeNGConfig
    ) as jasmine.SpyObj<PrimeNGConfig>;
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize PrimeNG ripple effect', () => {
    component.ngOnInit();
    expect(primeNGConfig.ripple).toBeTrue();
  });

  describe('#onBlurEmail', () => {
    it('should fetch participant profile successfully', () => {
      pensionService.getParticipantProfile.and.returnValue(of(mockProfile));
      component.email = 'johndoe@befrank.nl';

      component.onBlurEmail();

      expect(pensionService.getParticipantProfile).toHaveBeenCalledWith(
        'johndoe@befrank.nl'
      );
      expect(component.profile).toEqual(mockProfile);
      expect(component.errorMessage).toBeNull();
    });

    it('should set error message if profile fetch fails', () => {
      pensionService.getParticipantProfile.and.returnValue(
        throwError({ status: 404 })
      );
      component.email = 'johndoe@befrank.nl';

      component.onBlurEmail();

      expect(pensionService.getParticipantProfile).toHaveBeenCalledWith(
        'johndoe@befrank.nl'
      );
      expect(component.profile).toBeNull();
      expect(component.errorMessage).toBe(
        'Er is een fout opgetreden bij het ophalen van uw profiel. Controleer uw e-mailadres en probeer het opnieuw.'
      );
    });

    it('should clear profile and errorMessage if email is empty', () => {
      component.email = '';
      component.profile = mockProfile;
      component.errorMessage = 'Previous error';

      component.onBlurEmail();

      expect(component.profile).toBeNull();
      expect(component.errorMessage).toBeNull();
      expect(component.projectedValueInCents).toBeNull();
    });
  });

  describe('#onCalculatePension', () => {
    it('should calculate projected pension value successfully', () => {
      pensionService.calculatePension.and.returnValue(of(mockProjectedValue));
      component.email = 'johndoe@befrank.nl';
      component.retirementAge = 65;

      component.onCalculatePension();

      expect(pensionService.calculatePension).toHaveBeenCalledWith(
        'johndoe@befrank.nl',
        65
      );
      expect(component.projectedValueInCents).toEqual(mockProjectedValue);
      expect(component.errorMessage).toBeNull();
    });

    it('should set error message if pension calculation fails', () => {
      pensionService.calculatePension.and.returnValue(
        throwError({ status: 500 })
      );
      component.email = 'johndoe@befrank.nl';
      component.retirementAge = 65;

      component.onCalculatePension();

      expect(pensionService.calculatePension).toHaveBeenCalledWith(
        'johndoe@befrank.nl',
        65
      );
      expect(component.projectedValueInCents).toBeNull();
      expect(component.errorMessage).toBe(
        'Er is een fout opgetreden bij het berekenen van de pensioenwaarde. Controleer uw gegevens en probeer het opnieuw.'
      );
    });
  });
});
