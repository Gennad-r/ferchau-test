import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class AppComponent implements OnInit {
  form: FormGroup = this.fb.group({
    email: ['', [Validators.email, Validators.required]],
    option: [3],
    variant: [],
  });
  selected: any;

  formValue$!: Observable<any>;
  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.formValue$ = this.form.valueChanges;
  }
}
