import {
  AfterViewInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ContentChildren,
  forwardRef,
  Input,
  QueryList,
} from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import { RadioButtonComponent } from '../radio-button/radio-button.component';
import { ValueAccessorGroup } from './value-accessor.abstract.class';

@Component({
  selector: 'app-radio-button-group',
  templateUrl: './radio-button-group.component.html',
  styleUrls: ['./radio-button-group.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => RadioButtonGroupComponent),
      multi: true,
    },
  ],
})
export class RadioButtonGroupComponent
  extends ValueAccessorGroup
  implements AfterViewInit
{
  @Input() groupTitle?: string;
  @ContentChildren(RadioButtonComponent)
  buttons?: QueryList<RadioButtonComponent>;

  constructor(private cdr: ChangeDetectorRef) {
    super();
  }

  ngAfterViewInit(): void {
    const button = this.buttons?.find(({ value }) => value === this.value);
    this.markButton(button, true);
  }

  checkEventController(checkedButton: RadioButtonComponent): void {
    this.buttons?.forEach((button) => this.markButton(button, false));
    if (this._disabled) return;
    this.onChange(checkedButton.value);
  }

  private markButton(
    button: RadioButtonComponent | undefined,
    checked: boolean
  ): void {
    if (!button) return;
    button.ihputRef.nativeElement.checked = checked;
    button.checked = checked || undefined;
    button.detectChanges();
  }
}
