import { DebugElement } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';
import { runOnPushChangeDetection } from '../tests.helpers';

import { RadioButtonGroupComponent } from './radio-button-group.component';

describe('RadioButtonGroupComponent', () => {
  let component: RadioButtonGroupComponent;
  let fixture: ComponentFixture<RadioButtonGroupComponent>;
  let el: DebugElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [RadioButtonGroupComponent],
      imports: [ReactiveFormsModule],
    }).compileComponents();

    fixture = TestBed.createComponent(RadioButtonGroupComponent);
    component = fixture.componentInstance;
    el = fixture.debugElement;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('input title', () => {
    it('should not dysplay title', () => {
      const title = el.query(By.css('.group-title'));
      expect(title).toBeNull();
    });

    it('should dysplay title', async () => {
      const fakeTitle = 'fake text';
      component.groupTitle = fakeTitle;
      await runOnPushChangeDetection(fixture);
      const title = el.query(By.css('.group-title')).nativeNode.innerText;
      expect(title).toContain(fakeTitle);
    });
  });
});
