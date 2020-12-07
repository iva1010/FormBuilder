import { Component , OnInit} from '@angular/core';
import {AbstractControl, FormBuilder, FormGroup, ValidatorFn, Validators} from '@angular/forms';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'FormBuilder';
  form: FormGroup;

  private static checkPass(abstractControl: AbstractControl): ValidatorFn {
    const password: string = abstractControl.get('password').value;
    const doublePassword: string = abstractControl.get('doublePassword').value;

    if (password && doublePassword && password !== doublePassword) {
      abstractControl.get('doublePassword').setErrors({key: true});
    } else {
      return null;
    }
  }

  ngOnInit(): void {
    this.form = this.fb.group({
      name: [''],
      lastName: [''],
      email: ['', [
        Validators.required,
        Validators.email
      ]],
      password: ['', [
        Validators.required,
        Validators.minLength(6),
        Validators.pattern(/[a-zA-Z0-9]+/)]],
      doublePassword: ['', [
        Validators.required
      ]]
    }, {
      validator: AppComponent.checkPass
    });
  }


  submit(): void {
    if (this.form.valid) {
      alert('Регистрация прошла успешно');
    }
    console.log('Form: ', this.form);
    const  formData = {...this.form.value};
    console.log('Form Data: ', formData);
  }

  constructor(private fb: FormBuilder) {
  }
}
