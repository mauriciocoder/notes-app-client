import { Component, OnInit } from '@angular/core';
import { HeaderComponent } from './../../components/header/header.component';
import { Auth } from 'aws-amplify';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {
  
  ngOnInit() {
  }

  constructor() {}
}
