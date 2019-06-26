import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ValidationErrors } from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  registerForm: FormGroup;
  loginFrm: FormGroup;
  outputMsg = '';
  submitted = false;

  constructor(private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.initLoginView();
    this.initRegisterView();
  }

  onSubmit() {
    this.submitted = true;

    // stop the process here if form is invalid
    if (this.registerForm.invalid) {
      return;
    }

    this.register();
  }

  //#region private methods

  initLoginView() {
    this.loginFrm = this.formBuilder.group({
      email: ['', Validators.required],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  initRegisterView() {
    this.registerForm = this.formBuilder.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      password: ['', [Validators.required, Validators.minLength(6)]],
      email: ['', [Validators.required, Validators.email]],
      birthDate: ['', [Validators.pattern('\d+-\d+-\d+')]],
      gender: [''],
    });
  }

  logIn() {
    if (!this.loginFrm.valid) {
      this.displayErrors();
      return;
    }
    this.outputMsg = 'SUCCESS: ' + JSON.stringify(this.loginFrm.value);
  }

  register() {
    // TODO: Implement the code to call API to save the data
    alert('SUCCESS!!');
  }

  displayErrors() {
    this.outputMsg = 'InValid';
    Object.keys(this.loginFrm.controls).forEach(key => {
      const controlErrors: ValidationErrors = this.loginFrm.get(key).errors;
      if (controlErrors != null) {
        Object.keys(controlErrors).forEach(keyError => {
          this.outputMsg += '\n\nKey control: ' + key + ', keyError: ' + keyError + ', err value: ', controlErrors[keyError] + '\n\n';
        });
      }
    });
  //#endregion
}
