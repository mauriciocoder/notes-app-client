import { Component, OnInit } from '@angular/core';
import { AmplifyService } from 'aws-amplify-angular';
import { Auth } from 'aws-amplify';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent {
  user: any

  constructor(private amplifyService: AmplifyService, private router: Router) {
    this.amplifyService.authStateChange$
      .subscribe(authState => {
        console.log('Auth state changed = ', authState);
        if (!authState.user) {
          this.user = null;
        } else {
          this.user = authState.user;
        }
      });
  }

  async signOut() {
    await Auth.signOut();
    this.router.navigate(['/']);
  }
}
