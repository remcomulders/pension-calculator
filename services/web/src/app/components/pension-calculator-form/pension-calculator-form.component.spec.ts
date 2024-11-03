import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PensionCalculatorFormComponent } from './pension-calculator-form.component';
import { FormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { InputNumberModule } from 'primeng/inputnumber';
import { By } from '@angular/platform-browser';

describe('PensionCalculatorFormComponent', () => {
  let component: PensionCalculatorFormComponent;
  let fixture: ComponentFixture<PensionCalculatorFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        PensionCalculatorFormComponent,
        FormsModule,
        ButtonModule,
        InputTextModule,
        InputNumberModule,
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(PensionCalculatorFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the form component', () => {
    expect(component).toBeTruthy();
  });

  it('should emit emailChange when email input changes', () => {
    spyOn(component.emailChange, 'emit');
    const input = fixture.debugElement.query(
      By.css('input#email')
    ).nativeElement;

    input.value = 'test@befrank.nl';
    input.dispatchEvent(new Event('input'));

    fixture.detectChanges();
    expect(component.emailChange.emit).toHaveBeenCalledWith('test@befrank.nl');
  });

  it('should emit retirementAgeChange when retirement age input changes', () => {
    spyOn(component.retirementAgeChange, 'emit');

    const retirementAgeInput = fixture.debugElement.query(
      By.css('p-inputNumber')
    );

    retirementAgeInput.triggerEventHandler('ngModelChange', 65);

    expect(component.retirementAgeChange.emit).toHaveBeenCalledWith(65);
  });

  it('should emit calculate on calculate button click', () => {
    spyOn(component.calculate, 'emit');

    const button = fixture.debugElement.query(By.css('button')).nativeElement;
    button.click();

    expect(component.calculate.emit).toHaveBeenCalled();
  });
});
