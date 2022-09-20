import { Component, DebugElement } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import {
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
} from '@angular/forms';
import { By } from '@angular/platform-browser';
import { RadioButtonsModule } from './radio-buttons.module';

@Component({
  template: `
    <form [formGroup]="form">
      <app-radio-button-group
        class="first"
        disabled-group
        formControlName="option"
        groupTitle="Disabled fieldset"
      >
        <app-radio-button disabled value="fakeValue1"
          >Option 1</app-radio-button
        >
        <app-radio-button value="fakeValue2">Option 2</app-radio-button>
        <app-radio-button value="fakeValue3">Option 2</app-radio-button>
      </app-radio-button-group>

      <app-radio-button-group
        class="second"
        formControlName="option1"
        groupTitle="Disabled fieldset"
      >
        <app-radio-button disabled value="einz">Option 1</app-radio-button>
        <app-radio-button attr-unchecked value="zwei"
          >Option 2</app-radio-button
        >
        <app-radio-button value="drei">Option 2</app-radio-button>
      </app-radio-button-group>
    </form>
  `,
})
class TestFormComponent {
  form: FormGroup = new FormGroup({
    option: new FormControl('fakeValue2'),
    option1: new FormControl('drei'),
  });
}

describe('Integration Radio Group', () => {
  let fixture: ComponentFixture<TestFormComponent>;
  let component: TestFormComponent;
  let componentEl: DebugElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TestFormComponent],
      imports: [FormsModule, ReactiveFormsModule, RadioButtonsModule],
    }).compileComponents();

    fixture = TestBed.createComponent(TestFormComponent);
    component = fixture.componentInstance;
    componentEl = fixture.debugElement.query(By.css('form'));
    fixture.detectChanges();
  });

  it('should create test component', () => {
    expect(component).toBeTruthy();
  });

  describe('First disabled group', () => {
    it('all inputs should be disabled', () => {
      let form = componentEl.queryAll(By.css('.first label'));
      form.forEach((el) => expect(el.nativeNode).toHaveClass('disabled'));
    });

    it('checked input has actual formgroup state', () => {
      let inputChecked = componentEl.query(
        By.css('.first label.checked input')
      );
      const comparsion =
        inputChecked.nativeNode.value === component.form.value.option;
      expect(comparsion).toBeTrue();
    });

    it('should not check input on disabled form', () => {
      let firstUnchecked = componentEl.query(
        By.css('.first label:not(.checked) input')
      );
      firstUnchecked.nativeElement.click();
      fixture.detectChanges();
      expect(firstUnchecked.nativeNode.checked).toBeFalse();
    });
  });

  describe('Second enabled group', () => {
    let form: DebugElement;
    beforeEach(() => {
      form = componentEl.query(By.css('.second'));
    });

    it('checked input has actual formgroup state', () => {
      let inputChecked = form.query(By.css('label.checked input'));
      const comparsion =
        inputChecked.nativeNode.value === component.form.value.option1;
      expect(comparsion).toBeTrue();
    });

    it('should check input and change form value', () => {
      let unchecked = form.query(
        By.css('app-radio-button[attr-unchecked] input')
      );
      unchecked.nativeElement.click();
      fixture.detectChanges();
      expect(unchecked.nativeNode.checked).toBeTrue();
      expect(component.form.value.option1).toBe('zwei');
    });

    it('disabled app-radio-button should have disabled input', () => {
      let disabledInput = form.query(
        By.css('app-radio-button[disabled] input')
      );
      expect(disabledInput.nativeNode.disabled).toBeTrue();
    });

    it('in disabled app-radio-button not possible check disabled input', () => {
      let disabledInput = form.query(
        By.css('app-radio-button[disabled] input')
      );
      disabledInput.nativeElement.click();
      fixture.detectChanges();
      expect(disabledInput.nativeNode.checked).toBeFalse();
    });
  });
});
