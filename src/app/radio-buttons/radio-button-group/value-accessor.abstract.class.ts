import { ControlValueAccessor } from '@angular/forms';

export abstract class ValueAccessorGroup implements ControlValueAccessor {
  value: any;
  _disabled = false;
  onChange!: (val: string | number) => void;
  onTouched!: () => void;
  writeValue(val: any): void {
    this.value = val;
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  setDisabledState?(isDisabled: boolean): void {
    this._disabled = isDisabled;
  }
}
