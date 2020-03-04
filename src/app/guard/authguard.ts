import { Injectable } from "@angular/core";
import { Router, CanActivate, ActivatedRouteSnapshot } from "@angular/router";

@Injectable({
  providedIn: "root"
})
export class AuthGuard implements CanActivate {
  constructor(private router: Router) { }

  canActivate(route: ActivatedRouteSnapshot): boolean {
    let username: any = localStorage.getItem('username');
    if (username == null) {
      this.router.navigate(['/']);
      return false;
    }
    return true;
  }
}