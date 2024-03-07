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
  signInForm: FormGroup<any>;
  isSignUp: boolean = false;
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
      password: ['', Validators.required],
    });
    this.signInForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
    });
  }

  ngOnInit() {}

  switchLogin() {
    this.isSignUp = !this.isSignUp;
  }

  onSubmit() {
    this.utility.showLoader();
    if (this.signUpForm.invalid) {
      this.utility.hideLoader();
      this.utility.presentFailureToast('Sign Up Form InValid !');
      return;
    }

    this.authService
      .signUp(this.signUpForm.value)
      .then((res) => {
        if (res) {
          this.utility.presentSuccessToast('Account Creation Success');
          this.switchLogin();
          this.utility.hideLoader();
        }
      })
      .catch((err) => {
        if (err.code == 'auth/email-already-in-use') {
          this.utility.presentFailureToast('Email Already In Use');
        }
        this.utility.hideLoader();
      });
  }

  onLogin() {
    this.utility.showLoader();
    if (this.signInForm.invalid) {
      this.utility.hideLoader();
      this.utility.presentFailureToast('Login Form InValid !');
      return;
    }
    const formValue = this.signInForm.value;
    console.log(formValue);
    this.authService
      .signIn(formValue.email, formValue.password)
      .then(async (res) => {
        const user = await this.userService.getUserData(res?.uid);
        console.log(user);
        if (user) {
          this.utility.hideLoader();
          this.nav.navigateTo("dashboard");
        }
      })
      .catch((err) => {
        if (err.code == 'auth/user-not-found') {
          this.utility.presentFailureToast("User Doesn't Exist");
        } else if (err.code == 'auth/wrong-password') {
          this.utility.presentFailureToast('Wrong Password');
        }
        this.utility.hideLoader();
      });
  }

  signInWithGoogle() {

  }
}
