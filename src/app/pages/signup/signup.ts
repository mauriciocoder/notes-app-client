import { Component, OnInit } from '@angular/core';
import { HeaderComponent } from '../../components/header/header';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Auth } from 'aws-amplify';
import { Router } from '@angular/router';
import { LoadingController } from '@ionic/angular';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.html',
  styleUrls: ['./signup.scss'],
})
export class SignupPage implements OnInit {
  signupForm: FormGroup;
  confirmationCodeForm: FormGroup;
  firstStep: boolean

  constructor(private router: Router, private loadingController: LoadingController) {
  }

  ngOnInit() {
    this.firstStep = true
    this.signupForm = new FormGroup({
      fullName: new FormControl('', Validators.required),
      email: new FormControl('', Validators.compose([
        Validators.required,
        Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$')
      ])),
      password: new FormControl('', Validators.required)
    });
    this.confirmationCodeForm = new FormGroup({
      confirmationCode: new FormControl('', Validators.required)
    });
  }

  async onSignupFormSubmit() {
    if (this.signupForm.valid) {
      const loading = await this.loadingController.create({
        message: 'Please wait...'
      });
      loading.present();
      let fullName = this.signupForm.value.fullName;
      let email = this.signupForm.value.email;
      let password = this.signupForm.value.password;
      try {
        console.log('fullName = ', fullName)
        console.log('email = ', email)
        console.log('password = ', password)
        await Auth.signUp({
          username: email,
          password: password
        });
        this.firstStep = false
      } catch (e) {
        alert(e.message);
      }
      loading.dismiss();
    }
  }

  async onConfirmationCodeFormSubmit() {
    if (this.confirmationCodeForm.valid) {
      const loading = await this.loadingController.create({
        message: 'Please wait...'
      });
      loading.present();
      try {
        let confirmationCode = this.confirmationCodeForm.value.confirmationCode;
        let email = this.signupForm.value.email;
        let password = this.signupForm.value.password;
        await Auth.confirmSignUp(email, confirmationCode);
        await Auth.signIn(email, password);
        loading.dismiss();
        this.router.navigate(['/note/list']);
      } catch (e) {
        alert(e.message);
      }
      loading.dismiss();
    }
  }

}
