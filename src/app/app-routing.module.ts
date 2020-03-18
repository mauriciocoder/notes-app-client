import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { HomePage } from './pages/home/home';
import { NotFoundPage } from './pages/notfound/notfound';
import { LoginPage } from './pages/login/login';
import { SignupPage } from './pages/signup/signup';
import { NoteCreatePage } from './pages/note/create/create';
import { NoteListPage } from './pages/note/list/list';
import { NoteUpdatePage } from './pages/note/update/update';
import { AuthGuard } from './guard/authguard';

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', component: HomePage },
  { path: 'login', component: LoginPage },
  { path: 'signup', component: SignupPage },
  { path: 'note/create', component: NoteCreatePage, canActivate: [AuthGuard] },
  { path: 'note/list', component: NoteListPage, canActivate: [AuthGuard] },
  { path: 'note/update/:noteId', component: NoteUpdatePage, canActivate: [AuthGuard] },
  { path: '**', component: NotFoundPage }  
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
