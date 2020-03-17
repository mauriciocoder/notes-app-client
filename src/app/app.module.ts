import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';

// Angular
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AmplifyService } from 'aws-amplify-angular';
import { FileUploadModule } from 'ng2-file-upload';
// pages
import { HomePage } from './pages/home/home.page';
import { NotFoundPage } from './pages/notfound/notfound.page';
import { LoginPage } from './pages/login/login.page';
import { SignupPage } from './pages/signup/signup.page';
import { NoteCreatePage } from './pages/note/note.create.page';
// components
import { HeaderComponent } from './components/header/header.component';

@NgModule({
  declarations: [
    AppComponent,
    HomePage,
    NotFoundPage,
    LoginPage,
    HeaderComponent,
    SignupPage,
    NoteCreatePage
  ],
  entryComponents: [],
  imports: [
    BrowserModule, 
    IonicModule.forRoot(), 
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    FileUploadModule
  ],
  providers: [
    StatusBar,
    SplashScreen,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    AmplifyService
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
