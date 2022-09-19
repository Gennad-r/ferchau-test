import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RadioButtonComponent } from './radio-button/radio-button.component';
import { RadioButtonGroupComponent } from './radio-button-group/radio-button-group.component';
import { DisabledDirective } from './disabled.directive';

@NgModule({
  declarations: [
    RadioButtonComponent,
    RadioButtonGroupComponent,
    DisabledDirective,
  ],
  imports: [CommonModule],
  exports: [RadioButtonComponent, RadioButtonGroupComponent, DisabledDirective],
})
export class RadioButtonsModule {}
