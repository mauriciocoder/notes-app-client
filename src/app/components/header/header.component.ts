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
        if (authState.state === 'signedIn') {
          this.user = authState.user;
        }
        if (authState.state === 'signedOut') {
          console.log('Entrou aki!!');
          this.user = null;
        }
      });
  }

  async signOut() {
    await Auth.signOut();
    this.router.navigate(['/']);
  }
}
