import { Component, OnInit } from '@angular/core';
import { AmplifyService } from 'aws-amplify-angular';
import { Auth } from 'aws-amplify';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  user: any

  constructor(private amplifyService: AmplifyService, private router: Router) {
    this.amplifyService.authStateChange$
      .subscribe(authState => {
        console.log('Auth state changed = ', authState);
        if (authState.state === 'signedIn') {
          this.user = authState.user;
          localStorage.setItem('username', this.user.username);
        }
        if (authState.state === 'signedOut') {
          this.user = null;
          localStorage.removeItem('username');
        }
      });
  }

  ngOnInit() {
    let username: String = localStorage.getItem('username')
    if (username) {
      this.user = {username: username}
    }
  }

  async signOut() {
    await Auth.signOut();
    this.router.navigate(['/']);
  }
}
