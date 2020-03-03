import { Component, OnInit } from '@angular/core';
import { HeaderComponent } from './../../components/header/header.component';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Auth } from 'aws-amplify';
import { Router } from '@angular/router';
import { LoadingController } from '@ionic/angular';


@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  loginForm: FormGroup;

  constructor(private router: Router, private loadingController: LoadingController) {
  }

  ngOnInit() {
    this.loginForm = new FormGroup({
      email: new FormControl('', Validators.compose([
        Validators.required,
        Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$')
      ])),
      password: new FormControl('', Validators.required)
    });
  }

  async onSubmit() {
    if (this.loginForm.valid) {
      const loading = await this.loadingController.create({
        message: 'Please wait...'
      });
      loading.present();
      let email = this.loginForm.value.email;
      let password = this.loginForm.value.password;
      try {
        await Auth.signIn(email, password);
        loading.dismiss();
        this.router.navigate(['/']);
      } catch (e) {
        alert(e.message);
      }
    }
  }
}
