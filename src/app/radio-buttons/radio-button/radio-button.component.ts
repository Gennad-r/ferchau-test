import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ElementRef,
  Host,
  Input,
  OnInit,
  ViewChild,
} from '@angular/core';
import { RadioButtonGroupComponent } from '../radio-button-group/radio-button-group.component';

@Component({
  selector: 'app-radio-button[value]',
  templateUrl: './radio-button.component.html',
  styleUrls: ['./radio-button.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RadioButtonComponent implements OnInit {
  id = Math.random().toString(8).replace(/\./, '');
  @ViewChild('inputRef') input!: ElementRef;
  @Input() value?: any;
  checked = false;
  @Input() disabled: unknown = undefined;

  constructor(
    @Host() private readonly group: RadioButtonGroupComponent,
    private cdr: ChangeDetectorRef
  ) {}

  get isDisabled(): boolean {
    return this.disabled === undefined;
  }

  inputChecked(): void {
    this.group.checkEventController(this);
    this.checked = true;
    this.input.nativeElement.checked = this.checked;
    this.detectChanges();
  }

  detectChanges(): void {
    this.cdr.detectChanges();
  }

  ngOnInit(): void {
    if (this.group._disabled) this.disabled = this.group._disabled;
  }
}
