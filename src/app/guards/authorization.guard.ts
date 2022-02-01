import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, CanLoad, Route, Router, RouterStateSnapshot, UrlSegment, UrlTree } from '@angular/router';
import { AuthenticatorService, Role, RoleType, User } from 'my-authenticator-lib';
import { Observable, of, switchMap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthorizationGuard implements CanActivate, CanLoad {

  constructor(private authenticatorService: AuthenticatorService,
              private router: Router) {

  }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      return this.checkRoles(rolesTypesFrom(route));
  }
  canLoad(
    route: Route,
    segments: UrlSegment[]): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      return this.checkRoles(rolesTypesFrom(route));
  }

  private checkRoles(rolesTypes: Array<RoleType>): Observable<boolean | UrlTree> | boolean {
    if (rolesTypes.length == 0) {
        return true;
    }
    return this.authenticatorService.currentUser()
               .pipe(switchMap((user: User | undefined) => {
                 if (!user || !user?.roles || user?.roles.length == 0) {
                    return of(false);
                 } else {
                    let result: boolean = this.allRoleTypesAreContainedIntoUserRole(rolesTypes, user.roles);
                    return result ? 
                      of(true) :
                      of(this.router.navigate(['/not-authorized']));
                 }
               })) as Observable<boolean | UrlTree>;
  }

  private allRoleTypesAreContainedIntoUserRole(rolesTypes: Array<RoleType>, rolesOfUser: Array<Role>): boolean {
    return rolesTypes.map(roleType => Role.contains(rolesOfUser, roleType)).reduce((a, b) => a && b, true);
  }
}

export const rolesTypesFrom = (route: ActivatedRouteSnapshot | Route): Array<RoleType> => {
  if (!route || !route.data || !route.data['roles']) {
      return [];
  }
  return route.data['roles'];
}
