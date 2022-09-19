import { Directive, HostBinding } from '@angular/core';
import { RadioButtonGroupComponent } from './radio-button-group/radio-button-group.component';

@Directive({
  selector: 'app-radio-button-group[disabled-group]',
})
export class DisabledDirective {
  @HostBinding('class') class = 'disabled';
  constructor(private host: RadioButtonGroupComponent) {
    host._disabled = true;
  }
}
