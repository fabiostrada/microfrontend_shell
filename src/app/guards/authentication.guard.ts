import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, CanLoad, Route, Router, RouterStateSnapshot, UrlSegment, UrlTree } from '@angular/router';
import { AuthenticatorService, User } from 'my-authenticator-lib';
import { Observable, of, switchMap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationGuard implements CanActivate, CanLoad {

  constructor(private authenticatorService: AuthenticatorService,
              private router: Router) {}


  public canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return this.isAuthenticate();
  }

  public canLoad(
    route: Route,
    segments: UrlSegment[]): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return this.isAuthenticate();
  }

  private isAuthenticate(): Observable<boolean | UrlTree> {
    return this.authenticatorService.currentUser()
      .pipe(switchMap((user: User | undefined) => {
        if (!!user) {
            return of(true)
        } else {
            let urlTreeLogin: UrlTree = this.router.createUrlTree(['/login/login-page']);
            return of(urlTreeLogin);
        }
      })) as Observable<boolean | UrlTree>;
  }
}
