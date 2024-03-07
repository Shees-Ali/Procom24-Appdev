import { Component, Injector, OnInit } from '@angular/core';
import { BasePage } from '../base/base';
import { FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-authentication',
  templateUrl: './authentication.page.html',
  styleUrls: ['./authentication.page.scss'],
})
export class AuthenticationPage extends BasePage implements OnInit {
  signUpForm: FormGroup<any>;
  constructor(injector: Injector) {
    super(injector);
    this.signUpForm = this.formBuilder.group({
      last_name: ['', Validators.required],
      first_name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      photoURL: [''],
      cnic: ['', Validators.required],
      country: ['', Validators.required],
      city: ['', Validators.required],
      age: ['', Validators.required],
    });
  }

  ngOnInit() {}

  onSubmit() {
    
  }
}
