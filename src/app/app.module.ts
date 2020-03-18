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
import { HomePage } from './pages/home/home';
import { NotFoundPage } from './pages/notfound/notfound';
import { LoginPage } from './pages/login/login';
import { SignupPage } from './pages/signup/signup';
import { NoteCreatePage } from './pages/note/create/create';
import { NoteListPage } from './pages/note/list/list';
import { NoteUpdatePage } from './pages/note/update/update';
// components
import { HeaderComponent } from './components/header/header';

@NgModule({
  declarations: [
    AppComponent,
    HomePage,
    NotFoundPage,
    LoginPage,
    HeaderComponent,
    SignupPage,
    NoteCreatePage,
    NoteListPage,
    NoteUpdatePage
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
