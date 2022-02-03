import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, CanDeactivate, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { RoutingService } from '../services/routing.service';

@Injectable({
  providedIn: 'root'
})
export class OnlyOneGuard implements CanActivate, CanDeactivate<unknown> {
  
  constructor(private routingService: RoutingService) {}

  public canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {    
    let isOnlyOneOpened: boolean = this.routingService.onlyOneIsAlreadyOpened();
    if (isOnlyOneOpened) {
      return false;
    }
    this.routingService.openOnlyOne();
    return true;
  }

  public canDeactivate(
    component: unknown,
    currentRoute: ActivatedRouteSnapshot,
    currentState: RouterStateSnapshot,
    nextState?: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {    
    this.routingService.closeOnlyOne();
    return true;
  }
  
}
