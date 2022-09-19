import { Component, DebugElement } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DisabledDirective } from './disabled.directive';
import { RadioButtonGroupComponent } from './radio-button-group/radio-button-group.component';

@Component({
  template: '<app-radio-button-group disabled-group></app-radio-button-group>',
})
class FakeRadioButtonGroupComponent {
  _disabled = false;
}
describe('RadioButtonGroupComponent with disabled-group directive', () => {
  let fixture: ComponentFixture<FakeRadioButtonGroupComponent>;
  let groupWrapperEl: DebugElement;
  let component: FakeRadioButtonGroupComponent;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [FakeRadioButtonGroupComponent, DisabledDirective],
      providers: [
        {
          provide: RadioButtonGroupComponent,
          useClass: FakeRadioButtonGroupComponent,
        },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(FakeRadioButtonGroupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();

    groupWrapperEl = fixture.debugElement.query(
      By.css('app-radio-button-group[disabled-group]')
    );
  });

  it('should have class disabled', () => {
    expect(groupWrapperEl.nativeNode.classList).toContain('disabled');
  });
});
