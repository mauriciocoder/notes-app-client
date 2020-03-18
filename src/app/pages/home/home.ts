import { Component, OnInit } from '@angular/core';
import { HeaderComponent } from '../../components/header/header';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.html',
  styleUrls: ['./home.scss'],
})
export class HomePage implements OnInit {
  constructor(private router: Router) {}
  
  ngOnInit() {
    let username = localStorage.getItem('username');
    if (username) {
      this.router.navigate(['/note/list']);
    }
  }
}
