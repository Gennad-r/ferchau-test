import {
  ChangeDetectorRef,
  Component,
  CUSTOM_ELEMENTS_SCHEMA,
  DebugElement,
} from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { RadioButtonGroupComponent } from '../radio-button-group/radio-button-group.component';

import { RadioButtonComponent } from './radio-button.component';

@Component({})
class FakeParent {
  _disabled = false;
  checkEventController(el: RadioButtonComponent): void {}
}

describe('RadioButtonComponent', () => {
  let component: RadioButtonComponent;
  let fixture: ComponentFixture<RadioButtonComponent>;
  const fakeCdr = jasmine.createSpyObj('fakeChangeDetectionRef', [
    'detectChanges',
  ]);
  let inputEl: DebugElement;
  let cdrSpy: jasmine.Spy;
  let checkEventControllerSpy: jasmine.Spy;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [RadioButtonComponent],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
      .overrideComponent(RadioButtonComponent, {
        add: {
          providers: [
            { provide: RadioButtonGroupComponent, useClass: FakeParent },
          ],
        },
      })
      .compileComponents();

    fixture = TestBed.createComponent(RadioButtonComponent);
    component = fixture.componentInstance;
    inputEl = fixture.debugElement.query(By.css('input'));
    component.value = 1;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('should work when selected', () => {
    beforeEach(() => {
      cdrSpy = spyOn(component, 'detectChanges');
      checkEventControllerSpy = spyOn(
        component['group'],
        'checkEventController'
      );
      component.inputChecked();
      fixture.detectChanges();
    });

    it('should call checkEventController', () => {
      expect(checkEventControllerSpy).toHaveBeenCalledTimes(1);
    });

    it('should call detectChanges', () => {
      expect(cdrSpy).toHaveBeenCalledTimes(1);
    });

    it('should change checked property to true', () => {
      expect(component.checked).toBeTrue();
    });
    it('should change input property to true', () => {
      expect(inputEl.nativeNode.checked).toBeTrue();
    });
  });

  describe('initial input state', () => {
    it('should not be disabled', () => {
      expect(inputEl.nativeNode.disabled).toBeFalse();
    });

    it('should be disabled', () => {
      component['group']._disabled = true;
      expect(inputEl.nativeNode.disabled).toBeFalse();
      component['group']._disabled = false;
    });
  });
});
